'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import ProjectCard from '@/components/ProjectCard'
import { ORBIT_IDS, getProject, type Project } from '@/lib/projects'
import { prefersReducedMotion } from '@/lib/ui-events'

const items = ORBIT_IDS.map(getProject).filter((p): p is Project => !!p)
const STEP = (Math.PI * 2) / items.length
const wrap = (a: number) => Math.atan2(Math.sin(a), Math.cos(a))

// The six top projects circle the core. Drag to throw the ring, it coasts back to a slow spin; a drag never opens a card.
export default function ProjectOrbit() {
  const stageRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const rs = useRef({ ang: 0, vel: 0.16, R: 460, target: null as number | null, drag: null as null | { x: number; ang: number; lx: number; lt: number }, hover: false, moved: false })

  const turn = (by: number) => { rs.current.target = -(Math.round(-rs.current.ang / STEP) + by) * STEP }

  useEffect(() => {
    const stage = stageRef.current, ring = ringRef.current
    if (!stage || !ring) return
    const s = rs.current, reduced = prefersReducedMotion()
    const cards = [...ring.children] as HTMLElement[]

    const layout = () => {
      const cw = innerWidth < 640 ? 200 : 230
      s.R = Math.max(cw * (innerWidth < 640 ? 1.25 : 1.6), ((cw + 26) * cards.length) / (Math.PI * 2))
      stage.style.setProperty('--cw', `${cw}px`)
      cards.forEach((el, i) => { el.style.transform = `rotateY(${i * STEP}rad) translateZ(${s.R}px)` })
    }
    const frame = (dt: number) => {
      if (!s.drag) {
        if (s.target !== null) {
          const d = wrap(s.target - s.ang)
          s.vel = d * 6
          if (Math.abs(d) < 0.002) s.target = null
        } else s.vel += ((reduced || s.hover ? 0 : 0.16) - s.vel) * Math.min(1, dt * 1.2)
        s.ang += s.vel * dt
      }
      ring.style.transform = `translateZ(${-s.R}px) rotateX(-6deg) rotateY(${s.ang}rad)`
      cards.forEach((el, i) => {
        const c = Math.cos(i * STEP + s.ang)
        el.style.opacity = (0.18 + 0.82 * Math.max(0, Math.min(1, (c + 0.4) / 1.4))).toFixed(3)
        el.style.pointerEvents = c > 0.35 ? '' : 'none'
        el.tabIndex = c > 0.35 ? 0 : -1
      })
    }

    const ac = new AbortController()
    const on = <T extends EventTarget>(t: T, type: string, fn: (e: never) => void, opts: AddEventListenerOptions = {}) =>
      t.addEventListener(type, fn as EventListener, { ...opts, signal: ac.signal })
    on(window, 'resize', layout)
    on(stage, 'pointerenter', () => { s.hover = true })
    on(stage, 'pointerleave', () => { s.hover = false })
    on(stage, 'pointerdown', (e: PointerEvent) => {
      s.drag = { x: e.clientX, ang: s.ang, lx: e.clientX, lt: performance.now() }
      s.moved = false
      s.target = null
      stage.classList.add('drag')
    })
    on(window, 'pointermove', (e: PointerEvent) => {
      const d = s.drag
      if (!d) return
      if (Math.abs(e.clientX - d.x) > 6) s.moved = true
      s.ang = d.ang + ((e.clientX - d.x) / s.R) * 1.4
      const now = performance.now(), dtm = Math.max(1, now - d.lt)
      s.vel = s.vel * 0.6 + (((e.clientX - d.lx) / s.R) * 1.4 / (dtm / 1000)) * 0.4
      d.lx = e.clientX
      d.lt = now
    }, { passive: true })
    on(window, 'pointerup', () => {
      if (!s.drag) return
      s.drag = null
      stage.classList.remove('drag')
      s.vel = Math.max(-6, Math.min(6, s.vel))
    })
    // bring a focused card to the front
    on(ring, 'focusin', (e: FocusEvent) => {
      const i = cards.indexOf((e.target as HTMLElement).closest('.rcard') as HTMLElement)
      if (i >= 0) s.target = s.ang + wrap(-i * STEP - s.ang)
    })
    // a drag that ends on a card spins the ring, it does not open the card
    stage.addEventListener('click', (e) => { if (s.moved) { e.stopPropagation(); e.preventDefault(); s.moved = false } }, { capture: true, signal: ac.signal })

    layout()
    let raf = 0, last = 0
    const tick = (t: number) => {
      const dt = Math.min(0.05, (t - (last || t)) / 1000)
      last = t
      frame(dt)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => { ac.abort(); cancelAnimationFrame(raf) }
  }, [])

  return (
    <>
      <div className="ring-stage" id="ring-stage" ref={stageRef} role="group" aria-label="Six projects in a rotating ring">
        <div className="ring" id="ring" ref={ringRef}>
          {items.map((p) => <ProjectCard key={p.id} project={p} variant="pcard" className="rcard" />)}
        </div>
      </div>
      <div className="row ring-cta">
        <button className="btn" type="button" aria-label="Previous project" onClick={() => turn(-1)}>←</button>
        <Link className="btn primary" href="/projects">More projects →</Link>
        <button className="btn" type="button" aria-label="Next project" onClick={() => turn(1)}>→</button>
      </div>
    </>
  )
}
