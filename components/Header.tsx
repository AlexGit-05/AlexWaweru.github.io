'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import Logo from '@/components/Logo'
import { prefersReducedMotion } from '@/lib/ui-events'

// `id` is the home section to scroll to (#sec-<id>); `path` is the page it opens from any inner page
const navItems = [
  { id: 'about', name: 'About', path: '/about' },
  { id: 'work', name: 'Work', path: '/projects' },
  { id: 'experience', name: 'Experience', path: '/experience' },
  { id: 'education', name: 'Education', path: '/education' },
  { id: 'skills', name: 'Skills', path: '/skills' },
  { id: 'contact', name: 'Contact', path: '/contact' },
]

export default function Header() {
  const pathname = usePathname()
  const onHome = pathname === '/'
  const [open, setOpen] = useState(false)
  const [section, setSection] = useState('')

  useEffect(() => setOpen(false), [pathname])

  // on the home page the nav marks the section in view
  useEffect(() => {
    if (!onHome) { setSection(''); return }
    const spy = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) setSection(en.target.id.replace('sec-', ''))
    }), { rootMargin: '-45% 0px -50% 0px' })
    document.querySelectorAll('#hero, .fl-sec').forEach((el) => spy.observe(el))
    return () => spy.disconnect()
  }, [onHome])

  const current = (item: (typeof navItems)[number]) => (onHome ? section === item.id : pathname === item.path)

  const links = navItems.map((item) => (
    <li key={item.id}>
      {onHome ? (
        <a
          href={`#sec-${item.id}`}
          aria-current={current(item) ? 'page' : undefined}
          onClick={(e) => {
            e.preventDefault()
            setOpen(false)
            document.getElementById(`sec-${item.id}`)?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
          }}
        >
          {item.name}
        </a>
      ) : (
        <Link href={item.path} aria-current={current(item) ? 'page' : undefined}>{item.name}</Link>
      )}
    </li>
  ))

  return (
    <header className="site-header">
      <div className="wrap">
        <nav className="nav" aria-label="Main">
          <Link className="brand" href="/"><Logo />Alex Waweru</Link>
          <ul className="links">{links}</ul>
          <button className="menu-btn" type="button" aria-expanded={open} aria-controls="mobile" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
        <div className="mobile" id="mobile" hidden={!open}><ul>{links}</ul></div>
      </div>
    </header>
  )
}
