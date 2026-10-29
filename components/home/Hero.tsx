'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Download, Github, Linkedin, Mail } from 'lucide-react'
import { BASE, site } from '@/lib/site'
import { prefersReducedMotion } from '@/lib/ui-events'

const ROLES = ['Senior AI Engineer · Data Scientist', 'Machine Learning Engineer', 'Data Analyst', 'Applied Statistician']
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*+<>/'

// push-in from the full-length photo to the close-up
const ZOOM = 2.0, TX = -47.6, TY = -6.75
const clamp = (v: number) => Math.max(0, Math.min(1, v))
const easeInOut = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2)

// the name decodes like model output: glyphs flicker, then lock in left to right
function decodeName(el: HTMLElement, final: string) {
  const t0 = performance.now()
  const tick = (now: number) => {
    const elapsed = now - t0
    let out = '', done = true
    for (let i = 0; i < final.length; i++) {
      const ch = final[i]
      if (ch === ' ' || elapsed >= 150 + i * 60) { out += ch; continue }
      done = false
      out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
    }
    el.textContent = out
    if (!done) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

// the title streams in like an LLM reply, then rotates through the roles
function roleStream(el: HTMLElement, typeFirst: boolean, reduced: boolean) {
  const text = document.createElement('span'), caret = document.createElement('span')
  caret.className = 'caret'
  caret.setAttribute('aria-hidden', 'true')
  el.textContent = ''
  el.append(text, caret)
  let r = 0, c = typeFirst ? 0 : ROLES[0].length, deleting = false
  text.textContent = ROLES[0].slice(0, c)
  if (reduced) { text.textContent = ROLES[0]; return () => {} }
  let timer = 0
  const tick = () => {
    const word = ROLES[r]
    if (!deleting && c === word.length) { deleting = true; timer = window.setTimeout(tick, 3200); return }
    if (deleting && c === 0) { deleting = false; r = (r + 1) % ROLES.length; timer = window.setTimeout(tick, 250); return }
    c += deleting ? -1 : 1
    text.textContent = ROLES[r].slice(0, c)
    timer = window.setTimeout(tick, deleting ? 16 : 28)
  }
  timer = window.setTimeout(tick, typeFirst ? 900 : 3200)
  return () => window.clearTimeout(timer)
}

// the intro sentence arrives word by word, like streamed tokens
function streamWords(el: HTMLElement, start: number, gap: number) {
  let i = 0
  const walk = (node: Node) => [...node.childNodes].forEach((ch) => {
    if (ch.nodeType === Node.TEXT_NODE) {
      const frag = document.createDocumentFragment()
      ;(ch.textContent ?? '').split(/(\s+)/).forEach((part) => {
        if (!part) return
        if (/^\s+$/.test(part)) { frag.append(part); return }
        const s = document.createElement('span')
        s.className = 'w'
        s.textContent = part
        s.style.animationDelay = `${(start + i++ * gap).toFixed(3)}s`
        frag.append(s)
      })
      ch.replaceWith(frag)
    } else if (ch.nodeType === Node.ELEMENT_NODE) walk(ch)
  })
  walk(el)
}

export default function Hero() {
  useEffect(() => {
    const $ = (id: string) => document.getElementById(id) as HTMLElement
    const reduced = prefersReducedMotion()
    const stage = $('stage'), full = $('shot-full'), close = $('shot-close'), scan = $('scan'), detP = $('det-person'), detF = $('det-face')
    const timers: number[] = []
    let raf = 0, dead = false

    const setDolly = (p: number) => {
      const q = easeInOut(clamp(p)), c = clamp((p - 0.55) / 0.35)
      full.style.transform = `translate(${TX * q}%, ${TY * q}%) scale(${1 + (ZOOM - 1) * q})`
      full.style.filter = c ? `blur(${(c * 4).toFixed(2)}px)` : ''
      close.style.opacity = String(c)
      close.style.transform = `scale(${(1.04 - 0.04 * c).toFixed(4)})`
    }
    const finish = () => {
      setDolly(1)
      full.style.opacity = '0'
      detP.classList.remove('on')
      detF.classList.add('on')
      stage.classList.add('done', 'idle')
    }
    const runIntro = () => {
      if (reduced) { finish(); return }
      const go = () => {
        const t0 = performance.now()
        const frame = (now: number) => {
          if (dead) return
          const t = (now - t0) / 1000, s = clamp((t - 0.2) / 1.0)
          scan.style.top = `${s * 100}%`
          scan.style.opacity = s > 0 && s < 1 ? '1' : '0'
          setDolly((t - 1.4) / 2.0)
          detP.classList.toggle('on', t > 0.8 && t < 1.6)
          if (t > 3.3) detF.classList.add('on')
          if (t < 3.5) raf = requestAnimationFrame(frame); else finish()
        }
        raf = requestAnimationFrame(frame)
      }
      const img = close as HTMLImageElement
      if (img.complete) go(); else img.addEventListener('load', go, { once: true })
    }

    // the page builds itself on every load: name, role, lead, buttons and socials all animate in
    const stopRole = roleStream($('hero-role'), !reduced, reduced)
    if (!reduced) {
      document.documentElement.classList.add('build')
      decodeName($('hero-name'), 'Alex Waweru')
      streamWords($('hero-lead'), 1.0, 0.022)
      $('hero-ctas').style.animationDelay = '1.7s'
      $('hero-socials').style.animationDelay = '1.85s'
      timers.push(window.setTimeout(() => $('cta-main').classList.add('pulse'), 2400))
    }
    runIntro()
    return () => {
      dead = true
      cancelAnimationFrame(raf)
      timers.forEach(clearTimeout)
      stopRole()
      document.documentElement.classList.remove('build')
    }
  }, [])

  return (
    <section className="hero" id="hero">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <span className="pill rise d1"><i /><span><b>Senior AI Engineer at AICE Africa</b> · open to new opportunities</span></span>
          <h1 className="rise d2" aria-label="Alex Waweru"><span className="grad" id="hero-name" aria-hidden="true">Alex Waweru</span></h1>
          <p className="role rise d2" id="hero-role">Senior AI Engineer · Data Scientist</p>
          <p className="lead rise d3" id="hero-lead">I build production AI: <b style={{ color: 'var(--fg)', fontWeight: 500 }}>LLM agent platforms</b> with LangGraph and MCP, <b style={{ color: 'var(--fg)', fontWeight: 500 }}>machine learning models</b>, and the <b style={{ color: 'var(--fg)', fontWeight: 500 }}>analytics</b> that teams use to make decisions.</p>
          <div className="row rise d4" id="hero-ctas">
            <Link className="btn primary" href="/projects" id="cta-main">View projects →</Link>
            <a className="btn" href={site.cv} download><Download />Download CV</a>
            <Link className="btn ghost" href="/contact">Get in touch</Link>
          </div>
          <div className="socials rise d4" id="hero-socials">
            <a href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github /></a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin /></a>
            <a href={`mailto:${site.email}`} aria-label="Email"><Mail /></a>
            <span>{site.location}</span>
          </div>
        </div>
        <div className="stage" id="stage">
          <div className="frame" id="hero-portrait">
            {/* eslint-disable @next/next/no-img-element */}
            <img className="shot" id="shot-full" src={`${BASE}/images/shot2.webp`} alt="Alex Waweru, full-length studio portrait" width={900} height={1200} />
            <img className="shot" id="shot-close" src={`${BASE}/images/shot3.webp`} alt="Alex Waweru, three-quarter studio portrait" width={900} height={1200} />
            {/* eslint-enable @next/next/no-img-element */}
            <div className="scan" id="scan" aria-hidden="true" />
          </div>
          <div className="dets" id="dets" aria-hidden="true">
            <div className="det" id="det-person"><i /><em>person · alex_waweru</em></div>
            <div className="det" id="det-face"><i /><em>senior_ai_engineer · nairobi</em></div>
          </div>
          <div className="float f1" aria-hidden="true"><small>Building</small><span>Multi-tenant agent platforms</span></div>
          <div className="float f2" aria-hidden="true"><small>Modelling</small><span>Vision · forecasting</span></div>
        </div>
      </div>
      <a className="hero-cue" href="#sec-about" onClick={(e) => { e.preventDefault(); document.getElementById('sec-about')?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' }) }}><i />scroll</a>
    </section>
  )
}
