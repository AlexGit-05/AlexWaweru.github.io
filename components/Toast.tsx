'use client'

import { useEffect, useState } from 'react'

// Shows the message sent by say() in lib/ui-events.ts for a couple of seconds
export default function Toast() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    let timer: number
    const show = (e: Event) => {
      setMessage((e as CustomEvent<string>).detail)
      window.clearTimeout(timer)
      timer = window.setTimeout(() => setMessage(''), 2600)
    }
    window.addEventListener('toast', show)
    return () => { window.removeEventListener('toast', show); window.clearTimeout(timer) }
  }, [])

  return <div className="toast" role="status" hidden={!message}>{message}</div>
}
