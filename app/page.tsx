import Background from '@/components/home/Background'
import FlowEffects from '@/components/home/FlowEffects'
import Hero from '@/components/home/Hero'
import HomeFlow from '@/components/home/HomeFlow'

export default function Home() {
  return (
    <>
      {/* first in the DOM so the canvases paint behind the content that follows */}
      <Background />
      <Hero />
      <HomeFlow />
      <FlowEffects />
    </>
  )
}
