'use client'

import { useEffect } from 'react'
import { prefersReducedMotion } from '@/lib/ui-events'

// numbers count up from zero
function countUp(el: HTMLElement, ms = 1100) {
  const m = (el.textContent ?? '').trim().match(/^(\D*)(\d+)(.*)$/)
  if (!m) return
  const [, pre, num, post] = m, end = +num, t0 = performance.now()
  const tick = (now: number) => {
    const p = Math.min(1, (now - t0) / ms)
    el.textContent = pre + Math.round(end * (1 - Math.pow(1 - p, 3))) + post
    if (p < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

// the eyebrow types itself, then the heading rises in
function typeHeading(head: Element) {
  const eb = head.querySelector<HTMLElement>('.eyebrow'), hd = head.querySelector<HTMLElement>('h1, h2')
  if (!eb) return
  const full = eb.textContent ?? ''
  eb.textContent = ''
  let i = 0
  const step = () => { eb.textContent = full.slice(0, ++i); if (i < full.length) window.setTimeout(step, 38) }
  step()
  if (hd) {
    hd.style.setProperty('--hd', `${full.length * 38 + 60}ms`)
    hd.classList.add('h-in')
    hd.addEventListener('animationend', () => hd.classList.remove('h-in'), { once: true })
  }
}

// Scroll-triggered build-up for the home sections (no markup of its own)
export default function FlowEffects() {
  useEffect(() => {
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) return
    const stats = document.querySelector('.fl-stats')
    const countIO = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (!en.isIntersecting) return
      countIO.unobserve(en.target)
      en.target.querySelectorAll<HTMLElement>('strong:not(.sm)').forEach((el) => countUp(el))
    }), { rootMargin: '0px 0px 80px 0px' })
    if (stats) countIO.observe(stats)
    const headIO = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (!en.isIntersecting) return
      headIO.unobserve(en.target)
      typeHeading(en.target)
    }), { rootMargin: '0px 0px 60px 0px' })
    document.querySelectorAll('.fl-head').forEach((el) => headIO.observe(el))
    return () => { countIO.disconnect(); headIO.disconnect() }
  }, [])
  return null
}
