// Ported from the approved mockup (docs/design-system.md). Plain JS on purpose: it is shader and canvas code
// that reads DOM ids the React components render. Every listener is tied to one AbortController so the
// returned destroy() removes them all.
export function initInteractions() {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
  const coarse = matchMedia('(pointer: coarse)').matches
  const ac = new AbortController()
  const listen = (target, type, fn, opts = {}) => target.addEventListener(type, fn, typeof opts === 'boolean' ? { capture: opts, signal: ac.signal } : { ...opts, signal: ac.signal })
  /* ---------- 3D tilt with spring physics, on cards across every page ---------- */
  function initTilt() {
    if (coarse || reduced) return;
    const SEL = '.card, .flag, .tile, .job article, .portrait, .chan', K = 150, C = 15, state = new WeakMap();
    const get = (el) => {
      let s = state.get(el);
      if (!s) {
        const big = el.matches('.flag, .job article, .chan');
        s = { el, rx: 0, ry: 0, vx: 0, vy: 0, tx: 0, ty: 0, amp: big ? 4 : el.matches('.portrait') ? 8 : 10, raf: 0, lt: 0 };
        el.classList.add('tilt'); state.set(el, s);
      }
      return s;
    };
    const tick = (s) => (t) => {
      const dt = Math.min(0.033, (t - (s.lt || t)) / 1000); s.lt = t;
      s.vx += (K * (s.tx - s.rx) - C * s.vx) * dt; s.vy += (K * (s.ty - s.ry) - C * s.vy) * dt;
      s.rx += s.vx * dt; s.ry += s.vy * dt;
      s.el.style.transform = `perspective(900px) rotateX(${s.rx.toFixed(2)}deg) rotateY(${s.ry.toFixed(2)}deg)`;
      const done = Math.abs(s.tx - s.rx) < 0.02 && Math.abs(s.ty - s.ry) < 0.02 && Math.abs(s.vx) < 0.05 && Math.abs(s.vy) < 0.05;
      if (done && !s.tx && !s.ty) s.el.style.transform = '';
      s.raf = done ? 0 : requestAnimationFrame(tick(s));
    };
    const kick = (s) => { if (!s.raf) { s.lt = 0; s.raf = requestAnimationFrame(tick(s)); } };
    let current = null;
    listen(document, 'pointermove', (e) => {
      const el = e.target.closest && e.target.closest(SEL);
      if (current && current.el !== el) { current.tx = current.ty = 0; kick(current); current = null; }
      if (!el || el.closest('[hidden]')) return;
      const s = get(el), r = el.getBoundingClientRect(), u = (e.clientX - r.left) / r.width, v = (e.clientY - r.top) / r.height;
      s.tx = (0.5 - v) * s.amp; s.ty = (u - 0.5) * s.amp * 1.2;
      el.style.setProperty('--sx', `${u * 100}%`); el.style.setProperty('--sy', `${v * 100}%`); el.style.setProperty('--gx', `${u * 100}%`);
      current = s; kick(s);
    }, { passive: true });
    listen(document, 'pointerleave', () => { if (current) { current.tx = current.ty = 0; kick(current); current = null; } });
  }

  /* ---------- magnetic buttons: pulled toward the cursor, spring back on leave ---------- */
  function initMagnetic() {
    if (coarse || reduced) return;
    listen(document, 'pointermove', (e) => {
      document.querySelectorAll('.btn.mag').forEach((b) => { if (!b.contains(e.target)) { b.classList.remove('mag'); b.style.translate = ''; } });
      const b = e.target.closest && e.target.closest('.btn.primary, .btn');
      if (!b || b.closest('[hidden]') || b.closest('.drawer')) return;
      const r = b.getBoundingClientRect(), dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
      b.classList.add('mag'); b.style.translate = `${(dx * 0.22).toFixed(1)}px ${(dy * 0.3).toFixed(1)}px`;
    }, { passive: true });
  }
  initTilt()
  initMagnetic()
  return () => ac.abort()
}
