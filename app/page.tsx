'use client'

import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useMemo } from 'react'

export default function Home() {
  const controls = useAnimation()
  const [isHovered, setIsHovered] = useState(false)
  const [isClient, setIsClient] = useState(false)
  
  const nodePositions = useMemo(() => 
    Array(20).fill(0).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100
    })), []
  )

  const particlePositions = useMemo(() => 
    Array(15).fill(0).map(() => ({
      left: Math.random() * 100
    })), []
  )

  useEffect(() => {
    setIsClient(true)
    controls.start('visible')
  }, [controls])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const logoVariants = {
    hidden: { 
      scale: 0.8, 
      opacity: 0, 
      y: 50,
      rotateY: 180
    },
    visible: { 
      scale: 1, 
      opacity: 1,
      y: 0,
      rotateY: 0,
      transition: {
        duration: 2,
        ease: "easeOut",
        times: [0, 0.4, 0.8, 1],
        scale: {
          times: [0, 0.4, 0.8, 1],
          values: [0.8, 1.1, 0.95, 1]
        },
        opacity: {
          times: [0, 0.4, 1],
          values: [0, 1, 1]
        },
        y: {
          times: [0, 0.4, 0.8, 1],
          values: [50, -20, 10, 0]
        },
        rotateY: {
          times: [0, 0.4, 1],
          values: [180, -15, 0]
        }
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  }

  const nodeVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 0.6,
      scale: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  const particleVariants = {
    animate: {
      y: [-400, 0],
      opacity: [0, 1, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "linear",
        times: [0, 0.5, 1]
      }
    }
  }

  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.3, 0.6, 0.3],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {isClient && (
        <>
          <div className="absolute inset-0 opacity-20">
            {nodePositions.map((pos, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-blue-400 rounded-full"
                style={{
                  left: `${pos.left}%`,
                  top: `${pos.top}%`
                }}
                variants={nodeVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: i * 0.1 }}
              />
            ))}
          </div>

          <div className="absolute inset-0 overflow-hidden">
            <AnimatePresence>
              {particlePositions.map((pos, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-blue-300 rounded-full"
                  style={{
                    left: `${pos.left}%`,
                    bottom: -10
                  }}
                  variants={particleVariants}
                  animate="animate"
                  custom={i}
                />
              ))}
            </AnimatePresence>
          </div>
        </>
      )}

      <motion.div 
        className="max-w-4xl relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <motion.div 
          className="mb-12 relative w-72 h-72 mx-auto"
          variants={logoVariants}
          whileHover="hover"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <motion.div
            className="absolute inset-0 bg-blue-400/30 rounded-full filter blur-xl"
            variants={pulseVariants}
            animate="animate"
          />
          
          <motion.div 
            className="absolute inset-0"
            animate={{
              rotate: 360,
              transition: {
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }
            }}
          >
            <div className="absolute inset-0 border border-blue-300/30 rounded-full" />
            <div className="absolute inset-4 border border-blue-300/20 rounded-full" />
            <div className="absolute inset-8 border border-blue-300/10 rounded-full" />
          </motion.div>

          {isClient && ['ML', 'AI', 'DL'].map((tech, index) => (
            <motion.div
              key={tech}
              className={`absolute ${
                index === 0 ? '-right-8 top-1/4' :
                index === 1 ? '-left-8 top-1/2' :
                '-right-8 bottom-1/4'
              }`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                y: [0, -10, 0],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut"
                }
              }}
            >
              <div className="w-8 h-8 bg-blue-400/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span className="text-xs font-semibold">{tech}</span>
              </div>
            </motion.div>
          ))}

          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src="/AlexWaweru.github.io/images/logo.png"
              alt="AW Data Scientist Logo"
              width={240}
              height={240}
              className="relative z-10 rounded-full border-4 border-blue-400 shadow-lg"
              priority
            />
          </div>

          {isClient && isHovered && (
            <motion.div
              className="absolute inset-0 border-2 border-blue-400 rounded-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </motion.div>
        
        <motion.h1 
          className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600"
          variants={itemVariants}
        >
          Alex Waweru
        </motion.h1>
        
        <motion.h2 
          className="text-3xl mb-6 text-gray-200"
          variants={itemVariants}
        >
          Data Scientist & AI Engineer
        </motion.h2>
        
        <motion.p 
          className="mb-8 text-lg text-gray-300"
          variants={itemVariants}
        >
          Leveraging advanced analytics, machine learning, and AI to transform complex data into actionable insights and innovative solutions. With expertise in statistical analysis, algorithm development, and deep learning, I specialize in creating impactful solutions across various domains.
        </motion.p>
        
        <motion.div 
          className="flex justify-center space-x-4"
          variants={itemVariants}
        >
          <Button asChild className="relative overflow-hidden">
            <Link href="/projects" className="group">
              <motion.span
                className="absolute inset-0 bg-blue-400/20"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              />
              View Projects <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button variant="outline" asChild className="relative overflow-hidden">
            <Link href="/contact" className="group">
              <motion.span
                className="absolute inset-0 bg-blue-400/10"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
              Get in Touch
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}

