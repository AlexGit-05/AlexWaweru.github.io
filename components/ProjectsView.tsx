'use client'

import { useState } from 'react'
import ProjectCard from '@/components/ProjectCard'
import { areas, projects, type Area } from '@/lib/projects'
import { prefersReducedMotion } from '@/lib/ui-events'

// Filter bar and card grid; the flagship (AICE Nexus) has its own block above and is left out of the grid
export default function ProjectsView() {
  const [area, setArea] = useState<'all' | Area>('all')
  const shown = projects.filter((p) => p.id !== 'platform' && (area === 'all' || p.area === area))
  const animate = (el: HTMLDivElement | null) => {
    if (!el || prefersReducedMotion()) return
    ;[...el.children].forEach((n, i) => {
      const c = n as HTMLElement
      c.style.setProperty('--i', String(i))
      c.classList.remove('enter3d')
      void c.offsetWidth
      c.classList.add('enter3d')
      c.addEventListener('animationend', () => c.classList.remove('enter3d'), { once: true })
    })
  }

  return (
    <>
      <div className="filters" role="group" aria-label="Filter projects">
        {areas.map((a) => <button key={a.id} type="button" aria-pressed={area === a.id} onClick={() => setArea(a.id)}>{a.label}</button>)}
      </div>
      <div className="cards" key={area} ref={animate}>
        {shown.map((p) => <ProjectCard key={p.id} project={p} />)}
      </div>
    </>
  )
}
