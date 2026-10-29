import type { Metadata } from 'next'
import OpenProjectButton from '@/components/OpenProjectButton'
import PageHead from '@/components/PageHead'
import ProjectsView from '@/components/ProjectsView'
import { getProject } from '@/lib/projects'

export const metadata: Metadata = { title: 'Projects | Alex Waweru' }

export default function Projects() {
  const nexus = getProject('platform')
  return (
    <>
      <PageHead eyebrow="Projects" lead="Agent platforms and machine learning from my work at AICE Africa, plus earlier analytics projects. Each one says what I personally built.">
        AI systems in production, and the <span className="grad">numbers behind them</span>.
      </PageHead>
      <div className="wrap" style={{ paddingBottom: 80 }}>
        <article className="flag">
          <div className="flag-copy">
            <p className="eyebrow">Flagship · 2025 to now</p>
            <h2>AICE Nexus</h2>
            <div className="chips"><span className="badge">Lead architect</span><span className="chip">MVP · pilot clients</span></div>
            <p>AI services for your product, run from one console: Agent Platform, Knowledge, Crawler, Data Brain, Recommendation and Sandbox, with typed SDKs and live playgrounds. Each service works alone or plugs into agents through MCP.</p>
            <p>I wrote about 70 of the platform&apos;s 100 commits, including the agent runtime, crawler, data gateway and sandbox, and built the console end to end. Tenants are isolated with Postgres row-level security.</p>
            <div className="row">
              {nexus?.live && <a className="btn primary" href={nexus.live} target="_blank" rel="noopener noreferrer">Visit the console ↗</a>}
              <OpenProjectButton id="platform">Read more →</OpenProjectButton>
            </div>
          </div>
          <div className="arch" aria-label="Services connect to the agent runtime over MCP and REST, inside a tenant boundary">
            <div className="svcs"><span>Knowledge</span><span>Crawler</span><span>Data Brain</span><span>Recommendation</span><span>Sandbox</span></div>
            <div className="bus">MCP · REST</div>
            <div className="box"><b>Agent Platform</b><small>LangGraph · 24-slot middleware · audit log · human approval</small></div>
            <div className="tenant">Tenant boundary · Postgres RLS</div>
          </div>
          <div className="kpis">
            <div><strong>−67–79%</strong><span>fixed agent prompt</span></div>
            <div><strong>24</strong><span>middleware slots</span></div>
            <div><strong>~790</strong><span>runtime tests</span></div>
            <div><strong>9</strong><span>services</span></div>
          </div>
        </article>
        <ProjectsView />
      </div>
    </>
  )
}
