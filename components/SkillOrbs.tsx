'use client'

import { useEffect } from 'react'

const ORB_SKILLS = ['Python', 'SQL', 'R', 'TypeScript', 'LangGraph', 'LangChain', 'MCP', 'RAG', 'PyTorch', 'FastAPI', 'PostgreSQL', 'Docker', 'OpenTelemetry', 'Power BI']
const FALLBACK = [['Python', true], ['SQL', true], ['LangGraph', true], ['MCP', true], ['PyTorch', true], ['FastAPI', false], ['PostgreSQL', false], ['Docker', false]] as const

// Skill orbs you can throw around; touch devices and reduced motion get the plain chips
export default function SkillOrbs() {
  useEffect(() => {
    let stop: (() => void) | undefined
    let cancelled = false
    import('@/lib/fx/orbs').then((m) => {
      if (!cancelled) stop = m.initOrbs({ stage: 'sk-orb-stage', canvas: 'sk-orbs', labels: 'sk-orb-labels', hint: 'sk-orb-hint', skills: ORB_SKILLS })
    })
    return () => { cancelled = true; stop?.() }
  }, [])

  return (
    <div className="wrap" style={{ paddingBottom: 28 }}>
      <div className="sec-head" style={{ marginBottom: 14 }}>
        <div><p className="eyebrow">Core stack</p></div>
        <span className="orb-hint" id="sk-orb-hint">Drag and throw the orbs</span>
      </div>
      <div className="orb-stage" id="sk-orb-stage" aria-label={`Core stack: ${ORB_SKILLS.join(', ')}`}>
        <canvas id="sk-orbs" aria-hidden="true" />
        <div className="orb-labels" id="sk-orb-labels" aria-hidden="true" />
        <div className="orb-fallback chips">{FALLBACK.map(([s, core]) => <span key={s} className={core ? 'chip core' : 'chip'}>{s}</span>)}</div>
      </div>
    </div>
  )
}
