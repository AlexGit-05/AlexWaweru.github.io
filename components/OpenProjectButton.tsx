'use client'

import { openProject } from '@/lib/ui-events'

export default function OpenProjectButton({ id, className = 'btn', children }: { id: string; className?: string; children: React.ReactNode }) {
  return <button className={className} type="button" onClick={() => openProject(id)}>{children}</button>
}
