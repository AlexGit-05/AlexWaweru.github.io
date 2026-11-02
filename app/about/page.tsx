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
          <h1>I engineer intelligent systems <span className="grad">grounded in data science</span> and built for production.</h1>
          <p className="lead">I&apos;m a Senior AI Engineer at AICE Africa, where I lead the architecture of Nexus, a multi-tenant AI Platform-as-a-Service (AI PaaS) that unifies specialized AI and machine learning capabilities through a common developer ecosystem of APIs, SDKs, and agent orchestration tools. Its ecosystem includes agent runtimes powered by LangGraph and MCP, knowledge retrieval, recommendation systems, secure code execution, and a developer-facing control plane.</p>
          <p className="lead">My foundation is in Applied Statistics, with professional experience dating back to 2020 across machine learning, statistical analysis, data modelling, and data-driven automation. I&apos;ve contributed to reporting automation initiatives for organizations including KenGen and telecommunications companies, while also mentoring and training emerging data scientists.</p>
          <p className="lead">I work across the full intelligence lifecycle, from statistical modelling and machine learning to agentic AI, platform architecture, and production deployment. My focus is building intelligent systems that are not only technically capable, but also secure, measurable, reliable, and useful in real-world environments.</p>
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
