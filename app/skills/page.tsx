import { CheckCircle } from 'lucide-react'

const skills = {
  "Core Competencies": [
    "Statistical Analysis",
    "Machine Learning",
    "Algorithm Development",
    "Deep Learning",
    "Natural Language Processing",
    "Time Series Analysis",
    "Web scrapping",
    "Database Management Systems",
    "Large Language Models (LLM)"
  ],
  "Technologies & Tools": [
    "Python",
    "R",
    "SQL",
    "TensorFlow",
    "Scikit-learn",
    "Tableau",
    "Power BI",
    "Git",
    "Microsoft Excel"
  ],
  "Soft Skills": [
    "Problem Solving",
    "Data Visualization",
    "Project Management",
    "Team Collaboration",
    "Technical Writing",
    "Presentation Skills",
    "Critical thinking",
    "Communication"
  ]
}

export default function Skills() {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold mb-12 text-center">Skills & Expertise</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(skills).map(([category, skillList]) => (
            <div key={category} className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 text-blue-400">{category}</h2>
              <ul className="space-y-2">
                {skillList.map((skill) => (
                  <li key={skill} className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

