'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Here you would typically send the form data to a server
    console.log('Form submitted:', formData)
    // Reset form after submission
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold mb-12 text-center">Get in Touch</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-blue-400">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <MapPin className="mr-4 h-6 w-6 text-blue-400" />
                <p>P.O. Box 519, Ruiru - 00232, Kenya</p>
              </div>
              <div className="flex items-center">
                <Phone className="mr-4 h-6 w-6 text-blue-400" />
                <a href="tel:+254790212472">(+254) 790-212-472</a>
              </div>
              <div className="flex items-center">
                <Mail className="mr-4 h-6 w-6 text-blue-400" />
                <a href="mailto:alexwawerugit@gmail.com">alexwawerugit@gmail.com</a>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Connect with me</h3>
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/in/alex-wanjai-048211269/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                  <Linkedin size={24} />
                </a>
                <a href="https://github.com/AlexGit-05" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                  <Github size={24} />
                </a>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-blue-400">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full"
                  rows={4}
                />
              </div>
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

