'use client'

import { say } from '@/lib/ui-events'

export default function CopyButton({ value, what, className = 'btn primary', children }: { value: string; what: string; className?: string; children: React.ReactNode }) {
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      say(`${what} copied`)
    } catch {
      say(`Select the ${what.toLowerCase()} and press Ctrl+C`)
    }
  }
  return <button type="button" className={className} onClick={copy}>{children}</button>
}
