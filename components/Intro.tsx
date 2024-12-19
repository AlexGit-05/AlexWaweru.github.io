'use client'

import { useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Download } from 'lucide-react'

export default function Intro() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Particle[] = []
    const particleCount = 100

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 5 + 1
        this.speedX = Math.random() * 3 - 1.5
        this.speedY = Math.random() * 3 - 1.5
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.size > 0.2) this.size -= 0.1
      }

      draw() {
        ctx.fillStyle = 'rgba(0, 150, 255, 0.8)'
        ctx.strokeStyle = 'rgba(0, 150, 255, 0.8)'
        ctx.lineWidth = 2

        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
      }
    }

    function init() {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()

        if (particles[i].size <= 0.2) {
          particles.splice(i, 1)
          i--
        }
      }
      requestAnimationFrame(animate)
    }

    init()
    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <section id="intro" className="relative flex flex-col items-center justify-center min-h-screen text-center p-6">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      <div className="relative z-10 bg-gray-900 bg-opacity-80 p-8 rounded-lg backdrop-blur-sm">
        <h1 className="text-5xl font-bold mb-4 text-blue-400">Alex Waweru</h1>
        <h2 className="text-3xl mb-4">Data Scientist & ML Engineer</h2>
        <p className="mb-6 max-w-2xl">
          Leveraging advanced analytics, machine learning, and AI to transform complex data into actionable insights and innovative solutions
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Core Competencies</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {["Statistical Analysis", "Machine Learning", "Algorithm Development", "Deep Learning", "NLP", "Time Series Analysis"].map((skill) => (
                <span key={skill} className="bg-blue-600 px-3 py-1 rounded-full text-sm">{skill}</span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Technologies & Tools</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {["Python", "R", "SQL", "TensorFlow", "Scikit-learn", "Tableau", "Power BI", "Git"].map((tech) => (
                <span key={tech} className="bg-green-600 px-3 py-1 rounded-full text-sm">{tech}</span>
              ))}
            </div>
          </div>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Download className="mr-2 h-4 w-4" /> Download CV
        </Button>
      </div>
    </section>
  )
}

