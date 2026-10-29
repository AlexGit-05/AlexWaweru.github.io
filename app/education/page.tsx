import type { Metadata } from 'next'
import PageHead from '@/components/PageHead'
import { education } from '@/lib/education'

export const metadata: Metadata = { title: 'Education | Alex Waweru' }

export default function Education() {
  return (
    <>
      <PageHead eyebrow="Education">Grounded in <span className="grad">statistics</span>.</PageHead>
      <div className="wrap edu">
        {education.map((e) => (
          <article className="tile" key={e.title}>
            <span className="meta">{e.meta}</span>
            <h3>{e.title}</h3>
            <p>{e.text}</p>
            {e.chips && <div className="chips">{e.chips.map((c) => <span className="chip" key={c}>{c}</span>)}</div>}
          </article>
        ))}
      </div>
    </>
  )
}
