// Ported from the approved mockup (docs/design-system.md). Plain JS on purpose: it is shader and canvas code
// that reads DOM ids the React components render. Every listener is tied to one AbortController so the
// returned destroy() removes them all.
import * as THREE from 'three'

  /* ---------- throwable skill orbs ---------- */
export function initOrbs(cfg) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
  const coarse = matchMedia('(pointer: coarse)').matches
  const ac = new AbortController()
  const listen = (target, type, fn, opts = {}) => target.addEventListener(type, fn, typeof opts === 'boolean' ? { capture: opts, signal: ac.signal } : { ...opts, signal: ac.signal })

    const stageEl = document.getElementById(cfg.stage);
    if (!stageEl || coarse || reduced) return;
    const TINTS = [[0.38, 0.65, 0.98], [0.13, 0.83, 0.93], [0.55, 0.6, 0.98]];
    const labelsEl = document.getElementById(cfg.labels), oc = document.getElementById(cfg.canvas);
    const bodies = cfg.skills.map((s, i) => ({ s, r: Math.max(40, Math.min(66, 34 + s.length * 3.4)), x: 0, y: 0, vx: 0, vy: 0, tint: TINTS[i % 3] }));
    labelsEl.innerHTML = bodies.map((b) => `<span>${b.s}</span>`).join('');
    const spans = [...labelsEl.children];
    let r2 = null, cam2, meshes = [], W = 0, H = 0, spawned = false, loop = 0, still = 0, grab = null;
    const G = 1900, E = 0.55;

    const glassVert = `varying vec3 vN; void main() { vN = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;
    const glassFrag = `uniform vec3 uTint; varying vec3 vN;
      void main() {
        vec3 n = normalize(vN); float fres = pow(1.0 - abs(n.z), 2.2);
        vec3 base = mix(vec3(0.04, 0.07, 0.16), uTint * 0.55, 0.35 + 0.35 * n.y);
        float spec = pow(max(dot(n, normalize(vec3(-0.45, 0.6, 0.7))), 0.0), 40.0);
        vec3 c = base + uTint * fres * 0.9 + vec3(1.0) * spec * 0.8;
        gl_FragColor = vec4(c, 0.55 + fres * 0.4);
      }`;
    function create() {
      const r = stageEl.getBoundingClientRect(); W = r.width; H = r.height;
      r2 = new THREE.WebGLRenderer({ canvas: oc, antialias: true, alpha: true });
      r2.setPixelRatio(Math.min(devicePixelRatio || 1, 2)); r2.setSize(W, H, false);
      cam2 = new THREE.OrthographicCamera(0, W, 0, -H, -500, 500);
      const sc = new THREE.Scene(), geo = new THREE.SphereGeometry(1, 40, 28);
      meshes = bodies.map((b) => {
        const m = new THREE.Mesh(geo, new THREE.ShaderMaterial({ uniforms: { uTint: { value: new THREE.Vector3(...b.tint) } }, vertexShader: glassVert, fragmentShader: glassFrag, transparent: true }));
        m.scale.setScalar(b.r); sc.add(m); return m;
      });
      r2.__scene = sc;
      stageEl.classList.add('live');
      if (!spawned) {
        spawned = true;
        bodies.forEach((b, i) => { b.x = b.r + Math.random() * (W - 2 * b.r); b.y = -b.r - i * 70 - Math.random() * 60; b.vx = (Math.random() - 0.5) * 300; b.vy = 0; });
      }
      wake();
    }
    function destroy() {
      cancelAnimationFrame(loop); loop = 0;
      if (!r2) return;
      meshes.forEach((m) => m.material.dispose()); meshes[0]?.geometry.dispose();
      r2.dispose(); r2 = null; meshes = [];
    }
    function step(dt) {
      for (const b of bodies) {
        if (b === grab) continue;
        b.vy += G * dt; b.vx *= 0.999; b.x += b.vx * dt; b.y += b.vy * dt;
        if (b.x < b.r) { b.x = b.r; b.vx = -b.vx * E; }
        if (b.x > W - b.r) { b.x = W - b.r; b.vx = -b.vx * E; }
        if (b.y > H - b.r) { b.y = H - b.r; b.vy = -b.vy * E; b.vx *= 0.97; if (Math.abs(b.vy) < 30) b.vy = 0; }
      }
      for (let it = 0; it < 3; it++) for (let i = 0; i < bodies.length; i++) for (let j = i + 1; j < bodies.length; j++) {
        const a = bodies[i], c = bodies[j], dx = c.x - a.x, dy = c.y - a.y, d = Math.hypot(dx, dy) || 0.01, ov = a.r + c.r - d;
        if (ov <= 0) continue;
        const nx = dx / d, ny = dy / d, ma = a === grab ? 0 : a.r * a.r, mc = c === grab ? 0 : c.r * c.r, mt = ma + mc || 1;
        a.x -= nx * ov * (ma / mt); a.y -= ny * ov * (ma / mt); c.x += nx * ov * (mc / mt); c.y += ny * ov * (mc / mt);
        const vn = (c.vx - a.vx) * nx + (c.vy - a.vy) * ny;
        if (vn < 0) {
          const j = -(1 + E) * vn, ia = ma / mt, ic = mc / mt;
          a.vx -= j * nx * ia; a.vy -= j * ny * ia; c.vx += j * nx * ic; c.vy += j * ny * ic;
        }
      }
    }
    let lastT = 0;
    function tick(t) {
      const dt = Math.min(1 / 30, (t - (lastT || t)) / 1000); lastT = t;
      step(dt / 2); step(dt / 2);
      bodies.forEach((b, i) => { meshes[i].position.set(b.x, -b.y, 0); spans[i].style.transform = `translate(${b.x}px, ${b.y}px) translate(-50%, -50%)`; });
      r2.render(r2.__scene, cam2);
      const moving = grab || bodies.some((b) => Math.abs(b.vx) > 6 || Math.abs(b.vy) > 6 || b.y < 0);
      still = moving ? 0 : still + 1;
      loop = still > 40 ? 0 : requestAnimationFrame(tick);
    }
    const wake = () => { still = 0; if (!loop && r2) { lastT = 0; loop = requestAnimationFrame(tick); } };
    let px = 0, py = 0, pt = 0, offX = 0, offY = 0;
    listen(stageEl, 'pointerdown', (e) => {
      const r = stageEl.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
      grab = bodies.find((b) => Math.hypot(b.x - x, b.y - y) < b.r) || null;
      if (!grab) return;
      stageEl.setPointerCapture(e.pointerId); stageEl.classList.add('grabbing');
      offX = grab.x - x; offY = grab.y - y; px = x; py = y; pt = performance.now(); grab.vx = grab.vy = 0;
      document.getElementById(cfg.hint)?.classList.add('used'); wake();
    });
    listen(stageEl, 'pointermove', (e) => {
      if (!grab) return;
      const r = stageEl.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top, now = performance.now(), dt = Math.max(1, now - pt) / 1000;
      grab.vx = (x - px) / dt; grab.vy = (y - py) / dt;
      grab.x = Math.max(grab.r, Math.min(W - grab.r, x + offX)); grab.y = Math.min(H - grab.r, y + offY);
      px = x; py = y; pt = now; wake();
    });
    const release = () => {
      if (!grab) return;
      const cap = 2600, sp = Math.hypot(grab.vx, grab.vy);
      if (sp > cap) { grab.vx *= cap / sp; grab.vy *= cap / sp; }
      grab = null; stageEl.classList.remove('grabbing'); wake();
    };
    listen(stageEl, 'pointerup', release); listen(stageEl, 'pointercancel', release);
    new IntersectionObserver(([en]) => (en.isIntersecting ? (r2 || create()) : destroy()), { rootMargin: '100px' }).observe(stageEl);
    listen(window, 'resize', () => { if (r2) { destroy(); create(); } });
  return () => { ac.abort(); cancelAnimationFrame(loop); destroy() }
}
