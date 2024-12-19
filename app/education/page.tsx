import { GraduationCap, Calendar } from 'lucide-react'

const educationData = [
  {
    degree: "B.S. Applied Statistics with Computing",
    institution: "Moi University",
    year: "2018 - 2023",
    description: "Majored in Data Science and Artificial Intelligence. Participated in a team project on time series analysis, which involved predicting air quality using the VAR model (implemented in R)"
  },
  {
    degree: "Certified Public Accounts (CPA)",
    institution: "",
    year: "2018",
    description: "Completed Part 1, Section I, which covered units such as Financial Accounting, Business Law, and Entrepreneurship."
  },
  {
    degree: "Kenya Certificate of Secondary Education (KCSE)",
    institution: "Githiga Boys High School",
    year: "2014 - 2017",
    description: "Grade: B"
  }
]

export default function Education() {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold mb-12 text-center">Education</h1>
        <div className="space-y-12">
          {educationData.map((edu, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <GraduationCap className="mr-2 h-6 w-6 text-blue-400" />
                <h2 className="text-2xl font-semibold">{edu.degree}</h2>
              </div>
              <p className="text-xl mb-2">{edu.institution}</p>
              <div className="flex items-center text-gray-400 mb-4">
                <Calendar className="mr-2 h-5 w-5" />
                <span>{edu.year}</span>
              </div>
              <p className="text-gray-300">{edu.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

