'use client'

import type { Project } from '@/lib/projects'
import { openProject } from '@/lib/ui-events'

// Opens the shared project drawer. `variant` picks the card style: `card` on the Projects page, `pcard` on the home orbit.
export default function ProjectCard({ project: p, variant = 'card', className = '' }: { project: Project; variant?: 'card' | 'pcard'; className?: string }) {
  return (
    <button className={`${variant} ${className}`.trim()} type="button" onClick={() => openProject(p.id)}>
      <div className="cover">
        {p.img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.img} alt="" loading="lazy" draggable={false} />
        ) : (
          <div className="metric"><strong>{p.big?.[0]}</strong><span>{p.big?.[1]}</span></div>
        )}
      </div>
      <div className="body">
        <span className="badge" style={{ justifySelf: 'start' }}>{p.role}</span>
        <h3>{p.title}</h3>
        <p>{p.desc}</p>
      </div>
      <div className="foot">
        <span>{p.stack.slice(0, 3).join(' · ')}</span>
        <span>{p.live ? 'Live · details →' : 'Details →'}</span>
      </div>
    </button>
  )
}
