'use client'

import { useState } from 'react'
import { Briefcase, Calendar, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from "@/components/ui/button"

const experiences = [
  {
    "title": "Junior AI Engineer",
    "company": "AICE",
    "location": "Nairobi, Kenya",
    "period": "May 2025 - Present",
    "responsibilities": [
      "Designed multi-step prompts to enhance reasoning, planning, and execution capabilities of autonomous AI agents using state-of-the-art prompting strategies.",
      "Built modular agent workflows leveraging LangChain, LangGraph, and MCP to ensure flexible and scalable problem-solving architectures.",
      "Integrated memory modules, decision-making loops, and tool usage to create dynamic, context-aware AI agent behaviors that adapt to evolving tasks.",
      "Developed robust API connections and tool integrations including web-based tools and code interpreters utilizing Python and OpenAI Function Calling.",
      "Collaborated with cross-functional teams to deploy, test, and iterate on LLM-powered systems, improving reliability and accuracy of AI applications."
    ]
  },
  {
    title: "Data Scientist/ Data Analyst",
    company: "FREELANCE DATA SCIENCE AND DATA ANALYSIS",
    location: "Remote",
    period: "August 2020 - Current",
    responsibilities: [
      "Development of Web Applications: Actively collaborated with a team of data scientists and web developers in creating a web application. Focused on fine-tuning Large Language Models (LLMs) and developing sophisticated algorithms to transcribe videos to text and detect contradictions in text documents using Python.",
      "Advanced Data Processing and Algorithm Development: Demonstrated expertise in developing algorithms and machine learning models for AI data manipulation. Utilized Python and GitHub for version control, ensuring efficient project management and collaboration.",
      "Data Extraction and Analysis Expertise: Skilled in web scraping techniques using Python and R, efficiently extracting and analyzing data from various sources. Conducted comprehensive geospatial analysis using ArcGIS and financial analysis using R, showcasing versatility in handling diverse data types.",
      "Data Storytelling and Visualization: Proficient in transforming complex data into compelling narratives using visualization tools such as Power BI and Tableau. This skill has been instrumental in delivering insightful data-driven stories for a wide range of audiences.",
      "Project Diversity and Technical Proficiency: Engaged in a variety of projects including mini-projects in Excel, showcasing adaptability across different platforms and tools. Excelled in leveraging general AI techniques for data manipulation, further enhancing the effectiveness of machine learning models.",
      "Staying updated on industry trends, new technologies, and advancements in data science to enhance skills and methodologies.",
      "Applying analytical and problem-solving skills to address complex business challenges using data-driven approaches."
    ]
  },
  {
    title: "Applied Statistician/ Data Scientist Intern",
    company: "KENYA ELECTRICITY GENERATING COMPANY (KenGen)",
    location: "Nairobi, Kenya",
    period: "July 2024 - December 2024",
    responsibilities: [
      "Revenue Performance Analysis: Conducted in-depth analysis of KenGen's revenue streams using Excel to assess performance trends and financial health. Later advanced to using statistical tools such R and Python.",
      "Economic Data Analysis: Analyzed key economic indicators such as exchange rates and inflation using Excel and R to provide insights on their impact on energy pricing and revenue.",
      "Energy Dispatch Analysis: Performed analysis on energy dispatch operations using Excel to monitor energy distribution and performance tracking.",
      "Dashboard Creation: Built dynamic dashboards using Power BI and Python to visualize key metrics and enhance decision-making processes.",
      "Algorithm Development: Developed algorithms in R and Python to automate energy dispatch and revenue performance analysis, significantly enhancing operational efficiency. Additionally, created an algorithm to streamline the ETL (Extract, Transform, Load) process for data, optimizing data processing workflows.",
      "Database Management: Contributed to building a robust data management system using MySQL for improved data organization and access.",
      "Automated System: Developed an algorithm to scrape the Kenya Law website and notify recipients via email whenever a new gazette was uploaded.", 
      "Web Development: Designed and implemented a user-friendly web application using Dash to automate tasks and provide an interactive dashboard for data visualization and insights.",
      "Tariff Model Development: Developing tariff models for pricing strategies, focusing on load factor and energy demand. Gaining expertise in financial concepts like PMT for loan calculations and accrued interest. Involved in updating cash books, Balance Sheets (BS) and Profit & Loss (P&L) statements."
    ]
  },
  {
    title: "Data Scientist/ AI Trainer",
    company: "AICE",
    location: "Nairobi, Kenya",
    period: "March 2024 - May 2024",
    responsibilities: [
      "Expertise in Python and Data Analysis Tools: Demonstrated proficiency in teaching Python programming, with a focus on data structures, control flow, and advanced features such as lambda functions and decorators. Trained participants in data manipulation and visualization using pandas, NumPy, Matplotlib, and Seaborn.",
      "Practical Application and Project Guidance: Directed hands-on sessions with real datasets, guiding learners through exploratory data analysis, model building, and validation. Supervised project work, fostering practical application of concepts in AI and machine learning, including ensemble methods and neural network models.",
      "Version Control and Database Management: Educated learners on version control using Git and database management fundamentals, including SQL operations and Python-Database connectivity, emphasizing the importance of these skills in collaborative and scalable data science projects.",
      "Model Deployment and Maintenance: Guided learners on strategies for deploying machine learning models, including the use of cloud services. Emphasized the importance of model monitoring and maintenance, teaching best practices to ensure model performance and reliability over time.",
      "Soft Skills and Career Development Coaching: Integrated soft skills training and career development into the curriculum, covering communication, problem-solving, and job search strategies. Facilitated final project presentations, offering critical feedback and encouraging reflection on the learning journey.",
      "Advanced Machine Learning Techniques: Taught advanced machine learning concepts such as ensemble methods, deep learning, and natural language processing. Provided practical examples and case studies to illustrate the application of these advanced techniques in solving real-world problems."
    ]
  },
  {
    title: "Data Analyst",
    company: "SAMCHI TELECOMMUNICATION",
    location: "Nairobi, Kenya",
    period: "May 2022 - Jul 2022",
    responsibilities: [
      "Building an algorithm using R that merged the data and compiled a report. This reduced the workload by 80% and increased accuracy and efficiency by 100%.",
      "Recording every sale made on a daily basis in an Excel",
      "Merging internal report with Safaricom reports, analyzing the data and compiling a report.",
      "Identify and resolve discrepancies in revenue streams, ensuring that financial transactions are correctly recorded.",
      "Collaborate with cross-functional teams to address issues and implement solutions this includes the sales team.",
      "Also assisted in data reconciliation in the accounts department."
    ]
  },
  {
    title: "Data Analyst",
    company: "DATIM",
    location: "Remote",
    period: "June 2020 - November 2020",
    responsibilities: [
      "Data entry",
      "Analyzing data within DATIM to extract insights, identify trends, and provide recommendations.",
      "Creating reports and visualizations to communicate findings to stakeholders.",
      "Utilizing DATIM data to assess the impact of HIV/AIDS programs.",
      "Developing algorithms with R programming to run analysis."
    ]
  }
];

export default function Experience() {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold mb-12 text-center">Professional Experience</h1>
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} experience={exp} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ExperienceCard({ experience }: { experience: typeof experiences[0] }) {
  const [showAll, setShowAll] = useState(false)
  const visibleResponsibilities = showAll ? experience.responsibilities : experience.responsibilities.slice(0, 3)

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="flex items-center mb-4">
        <Briefcase className="mr-2 h-6 w-6 text-blue-400" />
        <h2 className="text-2xl font-semibold">{experience.title}</h2>
      </div>
      <p className="text-xl mb-2">{experience.company}</p>
      <div className="flex items-center text-gray-400 mb-4">
        <Calendar className="mr-2 h-5 w-5" />
        <span>{experience.period}</span>
      </div>
      <ul className="list-disc list-inside space-y-2 text-gray-300">
        {visibleResponsibilities.map((resp, idx) => (
          <li key={idx}>{resp}</li>
        ))}
      </ul>
      {experience.responsibilities.length > 3 && (
        <Button
          variant="ghost"
          className="mt-4 text-blue-400 hover:text-blue-300"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? (
            <>
              Hide <ChevronUp className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              Show More <ChevronDown className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      )}
    </div>
  )
}

