import type { Metadata } from 'next'
import PageHead from '@/components/PageHead'
import SkillOrbs from '@/components/SkillOrbs'
import { coreSkills, skillGroups } from '@/lib/skills'

export const metadata: Metadata = { title: 'Skills | Alex Waweru' }

export default function Skills() {
  return (
    <>
      <PageHead eyebrow="Skills" lead="Highlighted skills are the ones I use every week.">
        The tools I use to <span className="grad">ship AI</span>.
      </PageHead>
      <SkillOrbs />
      <div className="wrap skills">
        {skillGroups.map(([title, items]) => (
          <article className="tile" key={title}>
            <h4>{title}</h4>
            <div className="chips">{items.map((s) => <span className={coreSkills.has(s) ? 'chip core' : 'chip'} key={s}>{s}</span>)}</div>
          </article>
        ))}
      </div>
    </>
  )
}
