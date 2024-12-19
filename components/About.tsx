'use client'

import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

export default function About() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const stats = [
    { value: 5, label: 'Years Experience' },
    { value: 15, label: 'Projects Completed' },
    { value: 0, label: 'Publications' },
  ]

  return (
    <section id="about" className="py-20 bg-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-8 text-center">About Me</h2>
        <div className="max-w-3xl mx-auto text-center">
          <p className="mb-6">
            As a Data Scientist and Machine Learning Engineer, I specialize in developing innovative solutions that bridge the gap between complex data and actionable business insights. With a strong foundation in statistical analysis, machine learning, and AI, I've successfully completed projects across various domains including energy sector optimization, environmental modeling, and financial market analysis.
          </p>
          <p className="mb-8">
            My expertise lies in leveraging cutting-edge technologies and methodologies to solve real-world problems, always with a focus on delivering measurable impact and driving data-informed decision-making.
          </p>
        </div>
        <div ref={ref} className="flex justify-center space-x-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <motion.div
                className="text-4xl font-bold text-blue-400"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {inView ? <Counter from={0} to={stat.value} /> : 0}
                {stat.value === 5 && '+'}
              </motion.div>
              <div className="text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Counter({ from, to }: { from: number; to: number }) {
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

