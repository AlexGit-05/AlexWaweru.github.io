'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import CopyButton from '@/components/CopyButton'
import { site } from '@/lib/site'

// The whole panel opens the Contact page, except clicks on its own buttons and links
export default function ContactPanel() {
  const router = useRouter()
  return (
    <div className="fl-panel fl-contact depth" data-href="contact" onClick={(e) => { if (!(e.target as HTMLElement).closest('a, button')) router.push('/contact') }}>
      <p className="eyebrow">Contact</p>
      <h2>Let&apos;s build something <span className="grad">useful</span>.</h2>
      <a className="mail" href={`mailto:${site.email}`}>{site.email}</a>
      <div className="row">
        <CopyButton value={site.email} what="Email">Copy email</CopyButton>
        <Link className="btn" href="/contact">All contact options →</Link>
      </div>
    </div>
  )
}
