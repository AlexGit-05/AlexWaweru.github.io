import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './globals.css'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Alex Waweru | Data Scientist & ML Engineer Portfolio',
  description: 'Alex Waweru - Data Scientist & ML Engineer specializing in advanced analytics, machine learning, and AI-driven solutions using Python, R, and SQL',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${spaceGrotesk.className} bg-gray-900 text-white`}>
        <Header />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

