import type { Metadata } from 'next'
import PageHead from '@/components/PageHead'
import { jobs } from '@/lib/experience'

export const metadata: Metadata = { title: 'Experience | Alex Waweru' }

export default function Experience() {
  return (
    <>
      <PageHead eyebrow="Experience" lead="From R reporting automation to leading the architecture of a multi-tenant AI platform. Freelance work has run alongside since 2020.">
        Seven years of shipping <span className="grad">data and AI systems</span>.
      </PageHead>
      <div className="wrap timeline">
        {jobs.map((j) => (
          <div className={`job${j.now ? ' now' : ''}`} key={`${j.title}-${j.when}`}>
            <div className="when"><b>{j.when}</b><span>{j.meta}</span></div>
            <div className="rail"><i /></div>
            <article>
              <div className="top">
                <div><h3>{j.title}</h3><div className="org">{j.org}</div></div>
                {j.now && <span className="badge">Current</span>}
              </div>
              {j.promo && <div className="promo"><b>PROMOTED</b>Joined as Junior AI Engineer in May 2025 · Senior AI Engineer since January 2026</div>}
              <ul>{j.pts.map((t) => <li key={t}><span>{t}</span></li>)}</ul>
              <div className="chips">{j.stack.map((s) => <span className="chip" key={s}>{s}</span>)}</div>
            </article>
          </div>
        ))}
      </div>
    </>
  )
}
