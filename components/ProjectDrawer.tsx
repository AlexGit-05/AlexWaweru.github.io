'use client'

import { useEffect, useRef, useState } from 'react'
import { getProject, type Project } from '@/lib/projects'

// One drawer for the whole site: any card calls openProject(id) from lib/ui-events.ts
export default function ProjectDrawer() {
  const dialog = useRef<HTMLDialogElement>(null)
  const [p, setP] = useState<Project | null>(null)

  useEffect(() => {
    const open = (e: Event) => {
      const project = getProject((e as CustomEvent<string>).detail)
      if (!project) return
      setP(project)
      if (!dialog.current?.open) dialog.current?.showModal()
    }
    window.addEventListener('open-project', open)
    return () => window.removeEventListener('open-project', open)
  }, [])

  return (
    <dialog className="drawer" ref={dialog} aria-labelledby="d-title" onClick={(e) => { if (e.target === dialog.current) dialog.current?.close() }}>
      {p && (
        <div className="d-in" key={p.id}>
          <div className="d-top">
            <div style={{ display: 'grid', gap: 10 }}>
              <span className="badge" style={{ justifySelf: 'start' }}>{p.role}</span>
              <h2 id="d-title">{p.title}</h2>
            </div>
            <button className="d-close" type="button" aria-label="Close" onClick={() => dialog.current?.close()}>✕</button>
          </div>
          {p.img && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.img} alt="" style={{ borderRadius: 12, border: '1px solid var(--line)', aspectRatio: '16/9', objectFit: 'cover', width: '100%' }} />
          )}
          {p.credit && (
            <p className="note" style={{ marginTop: -10 }}>
              Image: <a href={p.credit[2]} target="_blank" rel="noopener noreferrer">{p.credit[0]}</a> · {p.credit[1]} · Wikimedia Commons
            </p>
          )}
          <div className="d-kpis">{p.metrics.map(([k, v]) => <div key={k}><strong>{v}</strong><span>{k}</span></div>)}</div>
          <div><h4>What it is</h4><p>{p.what || p.desc}</p></div>
          {p.how && <div><h4>How the model works</h4><p>{p.how}</p></div>}
          {p.mine && <div><h4>What I built</h4><p>{p.mine}</p></div>}
          <div className="chips">{p.stack.map((s) => <span className="chip" key={s}>{s}</span>)}</div>
          {p.live ? (
            <>
              <a className="btn primary" style={{ justifySelf: 'start' }} href={p.live} target="_blank" rel="noopener noreferrer">Visit {new URL(p.live).hostname} ↗</a>
              <p className="note">The code is private. I&apos;m happy to walk through it on a call.</p>
            </>
          ) : p.link ? (
            <a className="btn primary" style={{ justifySelf: 'start' }} href={p.link} target="_blank" rel="noopener noreferrer">View code on GitHub ↗</a>
          ) : (
            <p className="note">{p.note || "Private repository. I'm happy to walk through it on a call."}</p>
          )}
        </div>
      )}
    </dialog>
  )
}
