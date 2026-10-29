// Ported from the approved mockup (docs/design-system.md). Plain JS on purpose: it is shader and canvas code
// that reads DOM ids the React components render. Every listener is tied to one AbortController so the
// returned destroy() removes them all.
import * as THREE from 'three'

export function initBackground() {
  const ac = new AbortController()
  const listen = (target, type, fn, opts = {}) => target.addEventListener(type, fn, typeof opts === 'boolean' ? { capture: opts, signal: ac.signal } : { ...opts, signal: ac.signal })
  const $ = (id) => document.getElementById(id);
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const smooth = (a, b, v) => { const t = clamp((v - a) / (b - a)); return t * t * (3 - 2 * t); };
  const coarse = matchMedia('(pointer: coarse)').matches;
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canvas = $('gl');
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: !coarse, powerPreference: 'high-performance' }); }
  catch { canvas.hidden = true; return () => {} }
  renderer.setPixelRatio(Math.min(devicePixelRatio, coarse ? 1.5 : 2));
  renderer.setClearColor(0x0a1020, 1); renderer.autoClear = false;

  const ptr = { x: innerWidth * .6, y: innerHeight * .4, moved: 0 };
  listen(window, 'pointermove', (e) => { ptr.x = e.clientX; ptr.y = e.clientY; ptr.moved = performance.now(); }, { passive: true });
  let W = innerWidth, H = innerHeight, sy = scrollY, ssy = scrollY;

  const NOISE = `
  vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
  vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
  vec4 permute(vec4 x){return mod289(((x*34.)+1.)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-.85373472095314*r;}
  float snoise(vec3 v){const vec2 C=vec2(1./6.,1./3.);const vec4 D=vec4(0.,.5,1.,2.);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.-g;
  vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
  i=mod289(i);vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
  float n_=.142857142857;vec3 ns=n_*D.wyz-D.xzx;vec4 j=p-49.*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.*x_);
  vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.-abs(x)-abs(y);vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.+1.;vec4 s1=floor(b1)*2.+1.;vec4 sh=-step(h,vec4(0.));vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);m=m*m;
  return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));}`;

  const secY = (id) => { const r = $(id).getBoundingClientRect(); return (r.top + r.height / 2 - H / 2) / H; };
  const heroOut = () => clamp(ssy / Math.max(1, $('hero').offsetHeight * 0.9));

  function core() {
    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(35, W / H, .1, 100); cam.position.z = 9;
    const group = new THREE.Group(); scene.add(group);
    const R = 1, TR = .28;
    const torusOf = (x, y, z) => { const n = Math.hypot(x, y, z) || 1; const u = Math.atan2(z / n, x / n), v = Math.acos(clamp(y / n, -1, 1)) * 2; return [(R + TR * Math.cos(v)) * Math.cos(u), TR * Math.sin(v), (R + TR * Math.cos(v)) * Math.sin(u)]; };
    const withTorus = (g) => { const p = g.attributes.position, a = new Float32Array(p.count * 3); for (let i = 0; i < p.count; i++) a.set(torusOf(p.getX(i), p.getY(i), p.getZ(i)), i * 3); g.setAttribute('aTorus', new THREE.BufferAttribute(a, 3)); return g; };

    const U = { uTime: { value: 0 }, uTorus: { value: 0 }, uAmp: { value: 1 }, uBulge: { value: 0 }, uDir: { value: new THREE.Vector3(0, 0, 1) }, uMesh: { value: 1 }, uNet: { value: 0 }, uSize: { value: 1 } };
    const DEFORM = `${NOISE}
      attribute vec3 aTorus; uniform float uTime, uTorus, uAmp, uBulge; uniform vec3 uDir;
      vec3 deform(vec3 p){
        vec3 n = normalize(p);
        float d = (snoise(n*1.5 + vec3(0., 0., uTime*.22))*.2 + snoise(n*3.4 - uTime*.13)*.06) * uAmp;
        d += uBulge * pow(max(dot(n, uDir), 0.), 6.) * .42;
        return mix(n*(1. + d), aTorus*(1. + d*.35), uTorus);
      }`;
    const mesh = new THREE.Mesh(withTorus(new THREE.SphereGeometry(1, coarse ? 96 : 180, coarse ? 72 : 130)), new THREE.ShaderMaterial({
      uniforms: U, transparent: true, depthWrite: false,
      vertexShader: `${DEFORM} varying vec3 vPos; void main(){ vec4 w = modelMatrix * vec4(deform(position), 1.); vPos = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`,
      fragmentShader: `uniform float uMesh, uTime; varying vec3 vPos;
        void main(){
          vec3 N = normalize(cross(dFdx(vPos), dFdy(vPos)));
          vec3 V = normalize(cameraPosition - vPos);
          float fr = pow(1. - abs(dot(N, V)), 2.2);
          vec3 irid = .55 + .45*cos(6.2831*(vec3(.0, .12, .3) + fr*.7 + N.y*.25 + uTime*.03));
          vec3 base = mix(vec3(.03, .06, .16), vec3(.1, .3, .85), .35 + .4*N.y);
          vec3 col = mix(base, irid * vec3(.45, .8, 1.), fr);
          col += vec3(.5, .85, 1.) * pow(fr, 4.) * .5;
          gl_FragColor = vec4(col, uMesh * (.75 + .25*fr));
        }`,
    }));
    group.add(mesh);

    // network: fibonacci nodes + nearest-neighbour edges, deformed by the same field
    const N = coarse ? 220 : 380, nodes = [];
    for (let i = 0; i < N; i++) { const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = i * 2.39996; nodes.push([Math.cos(th) * r, y, Math.sin(th) * r]); }
    const ptsG = withTorus(new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(new Float32Array(nodes.flat()), 3)));
    const seg = [];
    nodes.forEach((a, i) => { nodes.map((b, j) => [j, (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2]).filter(([j]) => j > i).sort((x, y) => x[1] - y[1]).slice(0, 2).forEach(([j]) => seg.push(...a, ...nodes[j])); });
    const lineG = withTorus(new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(new Float32Array(seg), 3)));
    const netV = `${DEFORM} uniform float uSize; void main(){ vec4 mv = modelViewMatrix * vec4(deform(position) * 1.04, 1.); gl_PointSize = uSize * 60. / -mv.z; gl_Position = projectionMatrix * mv; }`;
    const pts = new THREE.Points(ptsG, new THREE.ShaderMaterial({ uniforms: U, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, vertexShader: netV,
      fragmentShader: 'uniform float uNet; void main(){ float d = length(gl_PointCoord - .5); gl_FragColor = vec4(.4, .9, 1., uNet * smoothstep(.5, .1, d)); }' }));
    const lines = new THREE.LineSegments(lineG, new THREE.ShaderMaterial({ uniforms: U, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, vertexShader: netV,
      fragmentShader: 'uniform float uNet; void main(){ gl_FragColor = vec4(.35, .6, 1., uNet * .45); }' }));
    group.add(pts, lines);

    const perPx = () => 2 * cam.position.z * Math.tan(cam.fov * Math.PI / 360) / H;
    const toWorld = (x, y) => { const k = perPx(); return [(x - W / 2) * k, -(y - H / 2) * k]; };
    let bulge = 0, s = { x: 0, y: 0, sc: 1, torus: 0, net: 0 }, ready = false;
    return {
      scene, cam,
      resize() { cam.aspect = W / H; cam.updateProjectionMatrix(); },
      frame(t) {
        const k = perPx(), mobile = W < 880, h = smooth(0, 1, heroOut());
        // behind the photo, then beside the content, then inside the project ring
        const r = $('stage').getBoundingClientRect();
        let x = r.left + r.width / 2, y = r.top + r.height * .45;
        x += ((mobile ? W * .5 : W * .74) - x) * h; y += (H * .5 - y) * h;
        let sc = (r.height * .5 * k) * (1 - h) + (mobile ? 1.3 : 1.6) * h;
        const rs = $('ring-stage').getBoundingClientRect();
        const wv = 1 - smooth(.12, .5, Math.abs((rs.top + rs.height / 2 - H / 2) / H));
        x += (rs.left + rs.width / 2 - x) * wv; y += (rs.top + rs.height / 2 - y) * wv; sc += ((mobile ? .7 : .95) - sc) * wv;
        const [wx, wy] = toWorld(x, y);
        // network → ring morph runs slowly across the page: starts with Experience centred, completes with Contact centred
        const ex = secY('sec-experience'), co = secY('sec-contact');
        const ring = Math.pow(clamp(-ex / Math.max(.01, co - ex)), 1.8);
        const tgt = {
          x: wx, y: wy, sc,
          net: smooth(.7, .1, secY('sec-work')) * (1 - smooth(.75, 1, ring)),
          torus: ring,
        };
        for (const key in s) s[key] += (tgt[key] - s[key]) * (still || !ready ? 1 : .07);
        ready = true;
        group.position.set(s.x, s.y, 0); group.scale.setScalar(s.sc);
        group.rotation.y = still ? .3 : t * .12; group.rotation.x = .25 + s.torus * .9;
        U.uNet.value = s.net + s.torus * .6; U.uMesh.value = clamp(1 - s.net * 1.1) * (mobile && h > .5 && wv < .5 ? .55 : 1) + s.torus * .6;
        U.uTorus.value = s.torus; U.uAmp.value = 1 - s.torus * .6 - s.net * .3; U.uSize.value = 1.2 + s.torus;
        U.uTime.value = still ? 4 : t;
        // the core bulges toward the cursor
        const [px, py] = toWorld(ptr.x, ptr.y);
        const dist = Math.hypot(px - s.x, py - s.y) / s.sc;
        bulge += ((performance.now() - ptr.moved < 900 && dist < 2.4 ? 1 - dist / 2.4 : 0) - bulge) * .08;
        U.uBulge.value = bulge;
        U.uDir.value.set(px - s.x, py - s.y, s.sc * 1.2).normalize().applyQuaternion(group.quaternion.clone().invert());
      },
    };
  }

  function river() {
    const scene = new THREE.Scene(); scene.fog = new THREE.FogExp2(0x0a1020, .022);
    const cam = new THREE.PerspectiveCamera(60, W / H, .1, 200); cam.position.z = 8;
    const LEN = 160, N = coarse ? 2000 : 5200;
    const pos = new Float32Array(N * 3), seed = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      const a = Math.random() * Math.PI * 2, r = 3.2 + Math.random() ** .6 * 7;
      pos.set([Math.cos(a) * r, Math.sin(a) * r * .75, 6 - Math.random() * LEN], i * 3); seed[i] = Math.random();
    }
    const ng = new THREE.BufferGeometry(); ng.setAttribute('position', new THREE.BufferAttribute(pos, 3)); ng.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
    const U = { uTime: { value: 0 }, uPx: { value: H / (2 * Math.tan(30 * Math.PI / 180)) } };
    const nodes = new THREE.Points(ng, new THREE.ShaderMaterial({
      uniforms: U, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      vertexShader: 'attribute float aSeed; uniform float uTime, uPx; varying float vA; void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.); gl_PointSize = (.05 + aSeed*.07) * uPx / -mv.z; vA = (.5 + .7*aSeed) * (.6 + .4*sin(uTime*1.5 + aSeed*40.)) * smoothstep(90., 10., -mv.z); gl_Position = projectionMatrix * mv; }',
      fragmentShader: 'varying float vA; void main(){ float d = length(gl_PointCoord - .5); gl_FragColor = vec4(.45, .75, 1., vA * smoothstep(.5, .05, d)); }',
    }));
    // edges between close nodes
    const seg = [];
    for (let i = 0; i < N; i++) for (let k = 0; k < 14; k++) {
      const j = (Math.random() * N) | 0; const dx = pos[i * 3] - pos[j * 3], dy = pos[i * 3 + 1] - pos[j * 3 + 1], dz = pos[i * 3 + 2] - pos[j * 3 + 2];
      if (i !== j && dx * dx + dy * dy + dz * dz < 9) { seg.push(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2], pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]); break; }
    }
    const eg = new THREE.BufferGeometry(); eg.setAttribute('position', new THREE.BufferAttribute(new Float32Array(seg), 3));
    const edges = new THREE.LineSegments(eg, new THREE.LineBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: .22, blending: THREE.AdditiveBlending, depthWrite: false }));
    // signals racing toward the viewer
    const S = 140, sgp = new Float32Array(S * 3), ss = new Float32Array(S);
    for (let i = 0; i < S; i++) { const a = Math.random() * Math.PI * 2, r = 3 + Math.random() * 6; sgp.set([Math.cos(a) * r, Math.sin(a) * r * .75, 0], i * 3); ss[i] = Math.random(); }
    const sg = new THREE.BufferGeometry(); sg.setAttribute('position', new THREE.BufferAttribute(sgp, 3)); sg.setAttribute('aSeed', new THREE.BufferAttribute(ss, 1));
    const signals = new THREE.Points(sg, new THREE.ShaderMaterial({
      uniforms: U, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      vertexShader: `attribute float aSeed; uniform float uTime, uPx; varying float vA; void main(){ vec3 p = position; p.z = 6. - mod(aSeed*${LEN}. - uTime*(6. + aSeed*10.), ${LEN}.); vec4 mv = modelViewMatrix * vec4(p, 1.); gl_PointSize = .16 * uPx / -mv.z; vA = smoothstep(80., 8., -mv.z); gl_Position = projectionMatrix * mv; }`,
      fragmentShader: 'varying float vA; void main(){ float d = length(gl_PointCoord - .5); gl_FragColor = vec4(.3, .95, 1., vA * smoothstep(.5, 0., d)); }',
    }));
    scene.add(nodes, edges, signals);

    const depth = [...document.querySelectorAll('.depth')].map((el) => ({ el, z: 0, rx: 0, o: 1 }));
    let camZ = 8, sway = { x: 0, y: 0 };
    return {
      scene, cam,
      resize() { cam.aspect = W / H; cam.updateProjectionMatrix(); U.uPx.value = H / (2 * Math.tan(30 * Math.PI / 180)) * renderer.getPixelRatio(); },
      frame(t) {
        U.uTime.value = still ? 3 : t;
        const heroH = $('hero').offsetHeight;
        const tz = 8 - Math.max(0, ssy - heroH * .5) * .045;
        camZ += (tz - camZ) * (still ? 1 : .08); cam.position.z = camZ;
        sway.x += (((ptr.x / W) - .5) * .8 - sway.x) * .04; sway.y += ((.5 - (ptr.y / H)) * .5 - sway.y) * .04;
        cam.position.x = sway.x; cam.position.y = sway.y; cam.lookAt(sway.x * .3, sway.y * .3, camZ - 10); cam.rotation.z = Math.sin(camZ * .03) * .05;

        // sections drift in from depth and settle at the centre of the screen
        for (const d of depth) {
          const r = d.el.getBoundingClientRect();
          const off = clamp((r.top + r.height / 2 - H / 2) / H, -1.2, 1.2);
          const tz = still ? 0 : -Math.abs(off) * 320, trx = still ? 0 : off * 14, to = still ? 1 : 1 - smooth(.35, 1.1, Math.abs(off)) * .75;
          d.z += (tz - d.z) * .12; d.rx += (trx - d.rx) * .12; d.o += (to - d.o) * .12;
          d.el.style.transform = `translateZ(${d.z.toFixed(1)}px) rotateX(${d.rx.toFixed(2)}deg)`; d.el.style.opacity = d.o.toFixed(3);
        }
      },
    };
  }


  const C = core(), R = river();
  const resize = () => { W = innerWidth; H = innerHeight; renderer.setSize(W, H, false); C.resize(); R.resize(); };
  listen(window, 'resize', resize); resize();

  const clock = new THREE.Clock();
  const loop = () => {
    // the page can unmount a frame before destroy() runs
    if (!$('hero')) return;
    sy = scrollY; ssy += (sy - ssy) * (still ? 1 : .14);
    const t = clock.getElapsedTime();
    C.frame(t); R.frame(t);
    renderer.clear(); renderer.render(C.scene, C.cam);
    renderer.clearDepth(); renderer.render(R.scene, R.cam);
  };
  let on = true;
  const apply = () => { const run = on && !document.hidden; canvas.hidden = !on; if (run) { sy = ssy = scrollY; } renderer.setAnimationLoop(run ? loop : null); };
  listen(document, 'visibilitychange', apply)
  apply()
  return () => { ac.abort(); renderer.setAnimationLoop(null); renderer.dispose() }
}
