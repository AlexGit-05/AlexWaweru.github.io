'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from 'framer-motion'

const projects = [
  {
    title: "Energy Sector Data Automation and Analytics Dashboard",
    description: "A robust Python Dash application developed to enhance data analysis and automate workflows within the energy sector.",
    image: "/images/mvp.gif",
    link: "https://github.com/AlexGit-05/KenGen",
    category: "Data Analytics"
  },
  {
    title: "Sentiment Analysis of Twitter Data: Qatar World Cup 2022",
    description: "Analyzed tweets to understand public perceptions about women's dress codes during the 2022 Qatar World Cup.",
    image: "/images/qatar.webp",
    link: "https://github.com/AlexGit-05/NLP/tree/main/Sentimental%20Analysis",
    category: "NLP"
  },
  {
    title: "Financial Market Dynamics: Crisis Volatility and Co-Dependence",
    description: "Explored co-dependence between global financial market segments and oil prices during the COVID-19 pandemic.",
    image: "/images/financial-growth.avif",
    link: "https://github.com/AlexGit-05/Data-Mining/tree/main/GARCH%20ARDL%20AND%20EWMA",
    category: "Financial Analysis"
  },
  // Add more projects here...
]

const categories = ["All", "Data Analytics", "NLP", "Financial Analysis", "Machine Learning"]

export default function Projects() {
  const [filter, setFilter] = useState("All")

  const filteredProjects = projects.filter(project => 
    filter === "All" || project.category === filter
  )

  return (
    <section id="projects" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 text-center">Projects</h2>
        <div className="flex justify-center space-x-4 mb-8">
          {categories.map(category => (
            <Button
              key={category}
              onClick={() => setFilter(category)}
              variant={filter === category ? "default" : "outline"}
              className="mb-2"
            >
              {category}
            </Button>
          ))}
        </div>
        <AnimatePresence>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <Image src={project.image} alt={project.title} width={400} height={200} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <Button asChild>
                    <a href={project.link} target="_blank" rel="noopener noreferrer">View Project</a>
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

