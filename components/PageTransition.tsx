'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { prefersReducedMotion } from '@/lib/ui-events'

// blocks that enter with a staggered 3D tilt when an inner page opens
const ENTER_SEL = '.page-head > :not(.eyebrow):not(h1), .about-grid > *, .trio > div, .flag, .filters, .cards > *, .job, .edu > *, .skills > *, .channels > *, form'

// Marks the current view on <html> (the 3D layers hide on inner pages) and plays the page-change effect
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const wipe = useRef<HTMLDivElement>(null)
  const first = useRef(true)

  useEffect(() => {
    const home = pathname === '/'
    document.documentElement.dataset.view = home ? 'home' : 'inner'
    window.scrollTo(0, 0)
    if (first.current) { first.current = false; return }
    if (prefersReducedMotion()) return
    const w = wipe.current
    if (w) { w.classList.remove('run'); void w.offsetWidth; w.classList.add('run') }
    if (home) return
    ;[...document.querySelectorAll<HTMLElement>(ENTER_SEL)].slice(0, 14).forEach((n, i) => {
      n.style.setProperty('--i', String(i))
      n.classList.add('enter3d')
      n.addEventListener('animationend', () => n.classList.remove('enter3d'), { once: true })
    })
  }, [pathname])

  return (
    <>
      {children}
      <div className="wipe" ref={wipe} aria-hidden="true" />
    </>
  )
}
