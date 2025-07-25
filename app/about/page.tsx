'use client'

import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Download } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

export default function AboutMe() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const stats = [
    { value: 4, label: 'Years Experience' },
    { value: 15, label: 'Projects Completed' }
  ]

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold mb-12 text-center">About Me</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <Image
              src="/AlexWaweru.github.io/images/alex-waweru.jpg"
              alt="Alex Waweru"
              width={400}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">Alex Waweru</h2>
            <h3 className="text-xl mb-4">Data Scientist & AI Engineer</h3>
            <p className="mb-6">
              With over 4 years of hands-on experience in data science and machine learning, I specialize in transforming raw data into meaningful insights and intelligent solutions. My work is driven by a deep curiosity to uncover patterns and a commitment to building technologies that create measurable impact.
            </p>
            <p className="mb-6">
              I’ve contributed to projects across diverse domains including energy optimization, environmental forecasting, and financial analytics developing predictive models, automating workflows, and building interactive data visualization tools to support strategic decision-making.
            </p>
            <p className="mb-6">
              Continuously exploring advancements in AI, I focus on integrating cutting-edge technologies such as large language models (LLMs), computer vision, agentic AI, and natural language processing (NLP) to solve real-world challenges. I’m passionate about using data-driven innovation to drive growth, efficiency, and sustainability.
            </p>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <a href="/AlexWaweru.github.io/file/alex-waweru-cv.pdf" download>
                <Download className="mr-2 h-4 w-4" /> Download CV
              </a>
            </Button>
          </div>
        </div>
        <div ref={ref} className="flex justify-center space-x-8 mt-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <motion.div
                className="text-4xl font-bold text-blue-400"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {inView ? <Counter from={0} to={stat.value} /> : 0}
                {stat.value === 4 && '+'}
              </motion.div>
              <div className="text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Counter({ to }: { from: number; to: number }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {to}
    </motion.span>
  )
}

