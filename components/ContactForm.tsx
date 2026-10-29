'use client'

import { useState } from 'react'
import { site } from '@/lib/site'

type Fields = { name: string; email: string; message: string }
const validate = (f: Fields): Partial<Fields> => ({
  ...(f.name.trim() ? {} : { name: 'Add your name.' }),
  ...(/^\S+@\S+\.\S+$/.test(f.email.trim()) ? {} : { email: 'Enter an email like you@company.com so I can reply.' }),
  ...(f.message.trim().length >= 10 ? {} : { message: 'Write at least a sentence about what you need.' }),
})

// There is no server: a valid message opens the visitor's email app, addressed to site.email
export default function ContactForm() {
  const [f, setF] = useState<Fields>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Partial<Fields>>({})
  const [sent, setSent] = useState(false)
  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value })

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate(f)
    setErrors(errs)
    if (Object.keys(errs).length) return
    const subject = encodeURIComponent(`Portfolio message from ${f.name.trim()}`)
    const body = encodeURIComponent(`${f.message.trim()}\n\n${f.name.trim()}\n${f.email.trim()}`)
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  if (sent) {
    return (
      <div className="sent">
        <b>Your email app should be open</b>
        <span>Send the message from there. If nothing opened, write to <a href={`mailto:${site.email}`}>{site.email}</a>.</span>
      </div>
    )
  }

  return (
    <form onSubmit={submit} noValidate>
      <div className="two">
        <div className="field">
          <label htmlFor="f-name">Name</label>
          <input id="f-name" autoComplete="name" value={f.name} onChange={set('name')} aria-invalid={!!errors.name} />
          <span className="err">{errors.name}</span>
        </div>
        <div className="field">
          <label htmlFor="f-email">Email</label>
          <input id="f-email" type="email" autoComplete="email" value={f.email} onChange={set('email')} aria-invalid={!!errors.email} />
          <span className="err">{errors.email}</span>
        </div>
      </div>
      <div className="field">
        <label htmlFor="f-msg">Message</label>
        <textarea id="f-msg" placeholder="What are you building, and where could I help?" value={f.message} onChange={set('message')} aria-invalid={!!errors.message} />
        <span className="err">{errors.message}</span>
      </div>
      <button className="btn primary" type="submit" style={{ justifySelf: 'start' }}>Send message</button>
    </form>
  )
}
