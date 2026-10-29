// Ported from the approved mockup (docs/design-system.md). Plain JS on purpose: it is shader and canvas code
// that reads DOM ids the React components render. Every listener is tied to one AbortController so the
// returned destroy() removes them all.
import * as THREE from 'three'

export async function initScene(photoSrc) {
  const ac = new AbortController()
  const listen = (target, type, fn, opts = {}) => target.addEventListener(type, fn, typeof opts === 'boolean' ? { capture: opts, signal: ac.signal } : { ...opts, signal: ac.signal })

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse = matchMedia('(pointer: coarse)').matches;
  let light = coarse || (navigator.deviceMemory && navigator.deviceMemory <= 4) || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
  const slot = document.getElementById('hero-portrait');
  const dets = document.getElementById('dets');
  const canvas = document.getElementById('scene');
  const fallback = () => {};

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'high-performance' });
  } catch { return () => {} }
  const DPR = () => Math.min(devicePixelRatio || 1, light ? 1.5 : 2);
  renderer.setPixelRatio(DPR());
  renderer.setSize(innerWidth, innerHeight, false);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.1, 200);
  camera.position.set(0, 0, 10);
  scene.add(camera);

  /* ---------- shared vertex logic: drift + magnetic cursor in screen space ---------- */
  const common = {
    uTime: { value: 0 }, uMouse: { value: new THREE.Vector2(0, 0) }, uMouseOn: { value: 0 },
    uAspect: { value: innerWidth / innerHeight }, uPR: { value: DPR() },
  };

  /* ---------- photo shatter: the hero photo breaks into its own pixels on scroll, rebuilds on return ---------- */
  const holo = new THREE.Group();
  camera.add(holo);
  let shardMat = null, rows = 1;
  const loadImg = (src) => new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; });
  async function buildShatter() {
    const photo = await loadImg(photoSrc);
    const cols = light ? 90 : 150; rows = Math.round(cols * 4 / 3);
    const c = document.createElement('canvas'); c.width = cols; c.height = rows;
    const x = c.getContext('2d', { willReadFrequently: true });
    x.drawImage(photo, 0, 0, cols, rows); const pd = x.getImageData(0, 0, cols, rows).data;
    const pos = [], col = [], dir = [], rnd = [], uvs = [];
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
      const k = (j * cols + i) * 4, u = (i + 0.5) / cols, v = (j + 0.5) / rows;
      pos.push((u - 0.5) * 0.75, 0.5 - v, 0);
      col.push(pd[k] / 255, pd[k + 1] / 255, pd[k + 2] / 255);
      // outward from the centre, with some lift and depth, so it bursts rather than slides
      const ox = u - 0.5, oy = 0.5 - v, a = Math.random() * Math.PI * 2;
      dir.push(ox * 1.1 + Math.cos(a) * 0.35, oy * 0.8 + Math.sin(a) * 0.35 + 0.15, (Math.random() - 0.3) * 1.2);
      rnd.push(Math.random()); uvs.push(u, v);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute('aColor', new THREE.Float32BufferAttribute(col, 3));
    geo.setAttribute('aDir', new THREE.Float32BufferAttribute(dir, 3));
    geo.setAttribute('aRand', new THREE.Float32BufferAttribute(rnd, 1));
    geo.setAttribute('aUv', new THREE.Float32BufferAttribute(uvs, 2));
    shardMat = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false,
      uniforms: { uTime: common.uTime, uOut: { value: 0 }, uPointPx: { value: 2 } },
      vertexShader: `uniform float uTime, uOut, uPointPx;
        attribute vec3 aColor, aDir; attribute float aRand; attribute vec2 aUv;
        varying vec3 vColor; varying float vEdge, vOut;
        void main() {
          float o = smoothstep(0.0, 1.0, clamp(uOut * (0.75 + aRand * 0.5), 0.0, 1.0));
          vec3 p = position + aDir * o * (0.5 + aRand * 0.7);
          float ang = o * (aRand - 0.5) * 1.4;
          p.xz = mat2(cos(ang), -sin(ang), sin(ang), cos(ang)) * p.xz;
          p.y += sin(uTime * 1.3 + aRand * 6.283) * 0.02 * o;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
          gl_PointSize = uPointPx * (1.0 + o * 0.4);
          vColor = aColor; vOut = o;
          // same soft edges as the photo's CSS mask
          vEdge = smoothstep(0.0, 0.06, 1.0 - aUv.y) * (1.0 - smoothstep(0.8, 0.99, aUv.y))
                * smoothstep(0.0, 0.12, aUv.x) * (1.0 - smoothstep(0.88, 1.0, aUv.x));
        }`,
      fragmentShader: `varying vec3 vColor; varying float vEdge, vOut;
        void main() {
          float r = length(gl_PointCoord - 0.5);
          if (vOut > 0.12 && r > 0.5) discard;
          float a = vEdge * (1.0 - smoothstep(0.35, 0.9, vOut));
          gl_FragColor = vec4(vColor + vec3(0.05, 0.2, 0.25) * vOut, a);
        }`,
    });
    holo.add(new THREE.Points(geo, shardMat));
    holo.visible = false;
  }

  // glue the particles to the photo's slot; the photo hands over to them as you scroll
  const mouse = { x: 0, y: 0, tx: 0, ty: 0, on: 0, ton: 0 };
  function placeHologram() {
    if (!shardMat) return;
    const r = slot.getBoundingClientRect(), D = 6;
    const out = Math.min(1, Math.max(0, scrollY / (r.height * 1.3)));
    slot.style.opacity = String(1 - Math.min(1, out / 0.04));
    dets.style.opacity = slot.style.opacity;
    holo.visible = out > 0.002 && out < 1;
    if (!holo.visible) return;
    const hView = 2 * D * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const cx = ((r.left + r.width / 2) / innerWidth) * 2 - 1, cy = -(((r.top + r.height / 2) / innerHeight) * 2 - 1);
    holo.position.set(cx * hView * camera.aspect / 2, cy * hView / 2, -D);
    holo.scale.setScalar((r.height / innerHeight) * hView);
    holo.rotation.set(Math.atan2(holo.position.y, D) - mouse.y * 0.15 * out, Math.atan2(-holo.position.x, D) + mouse.x * 0.3 * out, 0);
    shardMat.uniforms.uOut.value = out;
    shardMat.uniforms.uPointPx.value = (r.height / rows) * 1.15 * renderer.getPixelRatio();
  }

  /* ---------- input, scroll camera, quality ---------- */
  listen(window, 'pointermove', (e) => { mouse.tx = (e.clientX / innerWidth) * 2 - 1; mouse.ty = -((e.clientY / innerHeight) * 2 - 1); mouse.ton = 1; }, { passive: true });
  listen(document, 'pointerleave', () => (mouse.ton = 0));
  listen(window, 'blur', () => (mouse.ton = 0));
  const cam = { z: 10, y: 0, rx: 0 };
  function scrollTarget() {
    const h = document.documentElement.scrollHeight - innerHeight, p = h > 0 ? scrollY / h : 0;
    return { z: 10 - p * 28, y: -p * 7, rx: p * 0.12 };
  }
  let fpsT0 = 0, fpsFrames = 0, fpsDone = false;
  function startFpsSample(t) { fpsT0 = t; fpsFrames = 0; }
  function checkFps(t) {
    if (fpsDone || !fpsT0) return;
    fpsFrames++;
    if (t - fpsT0 < 2000) return;
    fpsDone = true;
    if (fpsFrames / ((t - fpsT0) / 1000) < 45 && !light) {
      light = true; renderer.setPixelRatio(DPR()); common.uPR.value = DPR();
    }
  }
  listen(window, 'resize', () => {
    renderer.setPixelRatio(DPR()); renderer.setSize(innerWidth, innerHeight, false);
    camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix();
    common.uAspect.value = camera.aspect; common.uPR.value = DPR();
    if (!running) renderer.render(scene, camera);
  });

  let drewEmpty = false, running = false, raf = 0, active = true;
  function frame(t) {
    common.uTime.value = t / 1000;
    mouse.x += (mouse.tx - mouse.x) * 0.08; mouse.y += (mouse.ty - mouse.y) * 0.08; mouse.on += (mouse.ton - mouse.on) * 0.05;
    common.uMouse.value.set(mouse.x, mouse.y); common.uMouseOn.value = mouse.on;
    const st = scrollTarget();
    cam.z += (st.z - cam.z) * 0.07; cam.y += (st.y - cam.y) * 0.07; cam.rx += (st.rx - cam.rx) * 0.07;
    camera.position.set(mouse.x * 0.4, cam.y + mouse.y * 0.25, cam.z); camera.rotation.x = cam.rx;
    placeHologram(); checkFps(t);
    if (!fpsT0 && t > 4000) startFpsSample(t);
    // only draw while the photo is breaking apart; clear once when it is whole again
    if (holo.visible) { renderer.render(scene, camera); drewEmpty = false; }
    else if (!drewEmpty) { renderer.render(scene, camera); drewEmpty = true; }
    raf = requestAnimationFrame(frame);
  }
  const start = () => { if (running || reduced || !active || document.hidden) return; running = true; raf = requestAnimationFrame(frame); };
  const stop = () => { running = false; cancelAnimationFrame(raf); };
  listen(document, 'visibilitychange', () => (document.hidden ? stop() : start()));
  canvas.hidden = !active;

  if (reduced) { renderer.render(scene, camera); fallback(); }
  else {
    try { await buildShatter(); } catch { /* the photo stays as is */ }
    if (!ac.signal.aborted) start();
  }
  return () => { ac.abort(); stop(); renderer.dispose() }
}
