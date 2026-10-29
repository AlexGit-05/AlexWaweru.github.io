'use client'

import { useEffect } from 'react'
import { BASE } from '@/lib/site'

// The 3D layers of the home page: `#gl` holds the Living AI Core and the Data River, `#scene` the hero photo
// shatter. Three.js is loaded on demand and everything is torn down when the visitor leaves home.
export default function Background() {
  useEffect(() => {
    let destroyed = false
    const cleanups: (() => void)[] = []
    ;(async () => {
      const [bg, scene] = await Promise.all([import('@/lib/fx/background'), import('@/lib/fx/scene')])
      if (destroyed) return
      cleanups.push(bg.initBackground())
      const stop = await scene.initScene(`${BASE}/images/shot3.webp`)
      if (destroyed) stop(); else cleanups.push(stop)
    })()
    return () => { destroyed = true; cleanups.forEach((fn) => fn()) }
  }, [])

  return (
    <>
      <canvas id="gl" aria-hidden="true" />
      <canvas id="scene" aria-hidden="true" />
      <div className="veil" aria-hidden="true" />
    </>
  )
}
