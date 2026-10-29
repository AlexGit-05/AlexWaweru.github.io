import type { Metadata } from 'next'
import { JetBrains_Mono, Space_Grotesk } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageTransition from '@/components/PageTransition'
import Interactions from '@/components/home/Interactions'
import ProjectDrawer from '@/components/ProjectDrawer'
import Toast from '@/components/Toast'
import './globals.css'
import './site.css'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'Alex Waweru | AI Engineer & Data Scientist',
  description: 'Alex Waweru - AI Engineer & Data Scientist building LLM agents, forecasting models and analytics platforms with Python, R and SQL',
  icons: {
    icon: [
      { url: "/AlexWaweru.github.io/images/favicon.svg", type: "image/svg+xml" }
    ]
  }

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
        <Header />
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
        <Footer />
        <ProjectDrawer />
        <Toast />
        <Interactions />
      </body>
    </html>
  )
}
