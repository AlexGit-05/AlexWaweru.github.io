import Link from 'next/link'
import ProjectOrbit from '@/components/home/ProjectOrbit'
import ContactPanel from '@/components/home/ContactPanel'
import { aboutStats, homeJobs, homeSkills } from '@/lib/home'
import { education } from '@/lib/education'

const Chips = ({ items }: { items: string[] }) => <div className="chips">{items.map((s) => <span className="chip" key={s}>{s}</span>)}</div>

// The scrolling sections under the hero. Panels marked `.depth` drift in from the Data River as they enter.
export default function HomeFlow() {
  return (
    <div className="flow wrap" id="flow">
      <section className="fl-sec" id="sec-about" aria-label="About">
        <Link className="fl-panel fl-about depth" href="/about">
          <div className="fl-head"><p className="eyebrow">About</p><h2>From data science to AI engineering</h2></div>
          <p>I&apos;m a Senior AI Engineer at AICE Africa in Nairobi. I joined in May 2025 and was promoted in January 2026. I lead the architecture of AICE Nexus, a multi-tenant AI platform: agents, a knowledge base, a crawler, data access and a code sandbox.</p>
          <p>Before that I spent years as a data scientist building pipelines, dashboards and econometric models, which is why I care about clean data and results people can check.</p>
          <div className="fl-stats">
            {aboutStats.map((s) => <div key={s.label}><strong className={s.small ? 'sm' : undefined}>{s.value}</strong><span>{s.label}</span></div>)}
          </div>
          <span className="fl-go">More about me →</span>
        </Link>
      </section>

      <section className="fl-sec fl-wide" id="sec-work" aria-label="Selected work">
        <div className="fl-head depth"><p className="eyebrow">Selected work</p><h2>Systems in production</h2><p className="hint">Drag or swipe to spin · click a project for details</p></div>
        <ProjectOrbit />
      </section>

      <section className="fl-sec" id="sec-experience" aria-label="Experience">
        <div className="fl-head depth"><p className="eyebrow">Experience</p><h2>Where I&apos;ve worked</h2></div>
        <div className="fl-jobs">
          {homeJobs.map((j) => (
            <article className="fl-panel fl-job depth" key={j.title}>
              <div className="when">{j.when}{j.current && <span className="badge">Current</span>}</div>
              <div>
                <h3>{j.title}</h3><p className="org">{j.org}</p>
                <ul>{j.pts.map((t) => <li key={t}>{t}</li>)}</ul>
                <Chips items={j.stack} />
              </div>
            </article>
          ))}
        </div>
        <Link className="btn fl-more" href="/experience">More experience →</Link>
      </section>

      <section className="fl-sec" id="sec-education" aria-label="Education">
        <div className="fl-head depth"><p className="eyebrow">Education</p><h2>Grounded in statistics</h2></div>
        <div className="fl-panel fl-edu depth">
          {education.map((e) => <div key={e.title}><span className="meta">{e.meta}</span><h3>{e.title}</h3><p>{e.short}</p></div>)}
        </div>
        <Link className="btn fl-more" href="/education">More →</Link>
      </section>

      <section className="fl-sec" id="sec-skills" aria-label="Skills">
        <div className="fl-head depth"><p className="eyebrow">Skills</p><h2>Core stack</h2></div>
        <Link className="fl-panel fl-skills depth" href="/skills">
          {homeSkills.map(([title, items]) => <div key={title}><h3>{title}</h3><Chips items={items} /></div>)}
          <span className="fl-go" style={{ marginTop: 0 }}>All skills →</span>
        </Link>
      </section>

      <section className="fl-sec" id="sec-contact" aria-label="Contact">
        <ContactPanel />
      </section>
    </div>
  )
}
