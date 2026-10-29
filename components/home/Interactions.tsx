'use client'

import { useEffect } from 'react'

// Card tilt and magnetic buttons, on every page
export default function Interactions() {
  useEffect(() => {
    let stop: (() => void) | undefined
    let cancelled = false
    import('@/lib/fx/interactions').then((m) => { if (!cancelled) stop = m.initInteractions() })
    return () => { cancelled = true; stop?.() }
  }, [])
  return null
}
