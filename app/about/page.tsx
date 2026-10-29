import type { Metadata } from 'next'
import Link from 'next/link'
import { Download } from 'lucide-react'
import { BASE, site } from '@/lib/site'

export const metadata: Metadata = { title: 'About | Alex Waweru' }

const facts = [
  ['Role', 'Senior AI Engineer, AICE Africa'],
  ['Based in', site.location],
  ['Degree', 'BSc Applied Statistics with Computing'],
  ['Experience', '7+ years in data and AI'],
]

const trio = [
  ['01 · Agents', 'Agent platforms', 'Runtimes that plan, call tools and recover from errors, with guardrails, audit logs and human approval built in.'],
  ['02 · Models', 'Applied machine learning', 'Vision models, recommenders and LLM pretraining, evaluated honestly against baselines and leakage.'],
  ['03 · Analytics', 'Forecasting and analytics', 'Time-series and econometric models, and dashboards that finance and operations teams use every week.'],
]

export default function About() {
  return (
    <>
      <div className="wrap about-grid">
        <div className="portrait">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${BASE}/images/alex-waweru.jpg`} alt="Alex Waweru standing against a teal studio backdrop" width={981} height={1280} />
        </div>
        <div className="about-copy">
          <p className="eyebrow">About</p>
          <h1>I build AI that works in production, and the <span className="grad">statistics that prove it</span>.</h1>
          <p className="lead">I&apos;m a Senior AI Engineer at AICE Africa in Nairobi. I lead the architecture of a multi-tenant AI platform: an agent runtime built on LangGraph and MCP, with retrieval, recommendations, a sandbox for generated code and the console around them.</p>
          <p className="lead">My background is applied statistics. Since 2020 I&apos;ve built forecasting models, automated reporting for KenGen and telecoms, and trained new data scientists. I care about systems people can trust and measure.</p>
          <div className="facts">{facts.map(([k, v]) => <div key={k}><small>{k}</small><span>{v}</span></div>)}</div>
          <div className="row">
            <a className="btn primary" href={site.cv} download><Download />Download CV</a>
            <Link className="btn" href="/experience">See my experience</Link>
          </div>
        </div>
      </div>
      <div className="wrap" style={{ paddingBottom: 80 }}>
        <div className="trio">{trio.map(([eb, h, p]) => <div key={h}><p className="eyebrow">{eb}</p><h3>{h}</h3><p>{p}</p></div>)}</div>
      </div>
    </>
  )
}
