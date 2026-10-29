import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'
import CopyButton from '@/components/CopyButton'
import PageHead from '@/components/PageHead'
import { site } from '@/lib/site'

export const metadata: Metadata = { title: 'Contact | Alex Waweru' }

const handle = (url: string) => url.replace(/\/$/, '').split('/').pop()

export default function Contact() {
  return (
    <>
      <PageHead eyebrow="Contact">Have something to build? <span className="grad">Let&apos;s talk.</span></PageHead>
      <div className="wrap contact">
        <div className="channels">
          <div className="avail"><b>Open to new opportunities.</b> Full-time roles, contracts and collaborations. I reply within a day.</div>
          <div className="chan"><small>Email</small><a href={`mailto:${site.email}`}>{site.email}</a><CopyButton className="act" value={site.email} what="Email">Copy</CopyButton></div>
          <div className="chan"><small>Phone · WhatsApp</small><a href={`tel:${site.phone}`}>{site.phoneLabel}</a><CopyButton className="act" value={site.phone} what="Phone number">Copy</CopyButton></div>
          <div className="chan"><small>LinkedIn</small><span>{handle(site.linkedin)}</span><a className="act" href={site.linkedin} target="_blank" rel="noopener noreferrer">Open ↗</a></div>
          <div className="chan"><small>GitHub</small><span>{handle(site.github)}</span><a className="act" href={site.github} target="_blank" rel="noopener noreferrer">Open ↗</a></div>
        </div>
        <ContactForm />
      </div>
    </>
  )
}
