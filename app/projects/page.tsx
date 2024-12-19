'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from 'framer-motion'

const projects = [
  {
    title: "Energy Sector Data Automation and Analytics Dashboard",
    description: "Developed a robust Python Dash application to enhance data analysis and automate workflows within the energy sector. The dashboard integrates key functionalities such as real-time revenue performance tracking, in-depth energy dispatch analysis, and customizable tariff model design.",
    image: "/AlexWaweru.github.io/images/mvp.gif",
    link: "https://github.com/AlexGit-05/KenGen",
    category: "Data Analytics"
  },
  {
    title: "Time Series Forecasting Models for Norwegian Krone Exchange Rates",
    description: "Analyzed the exchange rate of the Norwegian Krone (NOK) against the Euro (EUR) from 1999 to 2024, focusing on trends and structural breakpoints caused by economic events like financial crises and shifts in Norway's oil economy. Evaluated forecasting models, including Naïve, ETS, ARIMA and hybrid model (ARIMA and Exponential Smoothing), using RMSE for comparison.",
    image: "/AlexWaweru.github.io/images/exchange-rate.jpg",
    link: "https://github.com/AlexGit-05/Data-Mining/tree/main/Norwegian%20Krone%20Exchange%20Rates",
    category: "Time Series"
  },
  {
    title: "Modeling Air Pollution Trends in Nairobi",
    description: "Analyzed the relationship between air pollution (PM2.5 and PM10) and meteorological factors such as temperature and humidity in Nairobi, Kenya. By utilizing time-series data from 58 locations, we applied ETL processes, conducted Exploratory Data Analysis (EDA), and implemented the Vector Autoregressive (VAR) model in R to uncover key insights.",
    image: "/AlexWaweru.github.io/images/Air-Quality.jpg",
    link: "https://github.com/AlexGit-05/Final-Year-Project",
    category: "Machine Learning"
  },
  {
    title: "Sentiment Analysis of Twitter Data: Qatar World Cup 2022",
    description: "Analyzed tweets to understand public perceptions about women's dress codes during the 2022 Qatar World Cup. The project involved cleaning tweets, applying sentiment analysis, and visualizing emotional tones to uncover insights into social attitudes.",
    image: "/AlexWaweru.github.io/images/qatar.webp",
    link: "https://github.com/AlexGit-05/NLP/tree/main/Sentimental%20Analysis",
    category: "NLP"
  },
  {
    title: "Reconciliation Automation App",
    description: "Developed a Reconciliation App using R and Shiny framework to automate and simplify the process of merging and reconciling two reports. The app offers an interactive interface that identifies discrepancies and generates a comprehensive reconciliation report, streamlining the reconciliation workflow and reducing the risk of human error.",
    image: "/AlexWaweru.github.io/images/auto.jpg",
    link: "https://github.com/AlexGit-05/Samchi-Reconciliation-app/tree/main",
    category: "Data Analytics"
  },
  {
    title: "Assessing ESG Impact on Equity Performance",
    description: "Investigated the influence of Environmental, Social, and Governance (ESG) components on equity performance across different indexes and sectors. Using regression analysis in R, examined the relationship between ESG factors and market returns, identifying sectoral variations and index-specific trends.",
    image: "/AlexWaweru.github.io/images/ESG.jpeg",
    link: "https://github.com/AlexGit-05/Data-Mining/tree/main/Regression%20in%20R%20Finance",
    category: "Financial Analysis"
  },
  {
    title: "Financial Market Dynamics: Crisis Volatility and Co-Dependence",
    description: "Explored co-dependence between global financial market segments and oil prices during the COVID-19 pandemic, comparing it to historic crises. Used econometric models such as GARCH, ARDL, and EWMA to capture volatility, long-term equilibrium, and short-term dynamics between stock indices and oil prices.",
    image: "/AlexWaweru.github.io/images/financial-growth.avif",
    link: "https://github.com/AlexGit-05/Data-Mining/tree/main/GARCH%20ARDL%20AND%20EWMA",
    category: "Financial Analysis"
  },
  {
    title: "Optimizing Sales Performance with Machine Learning",
    description: "Applied advanced machine learning algorithms to optimize the performance of a sales site by analyzing customer behavior, resource usage, and operational efficiency. The solution improved hardware resource distribution and minimized response times during peak and low-demand periods.",
    image: "/AlexWaweru.github.io/images/Sales-Performance.webp",
    link: "https://github.com/AlexGit-05/Data-Mining/tree/main/Machine%20Learning%20Optimization%20(Sales%20Data)",
    category: "Machine Learning"
  },
  {
    title: "Unemployment Trends: Time Series Forecasting",
    description: "Applied Holt-Winters Exponential Smoothing and SARIMA models to analyze and predict unemployment trends. By uncovering labor market patterns and generating accurate forecasts, the analysis provides a data-driven foundation for understanding employment dynamics and supporting effective economic planning.",
    image: "/AlexWaweru.github.io/images/time series.jpg",
    link: "https://github.com/AlexGit-05/Data-Mining/tree/main/Time%20series%20Unemployment",
    category: "Time Series"
  },
  {
    title: "US Housing Market Forecasting",
    description: "Analyzed trends in the US housing market using predictive modeling to forecast price movements and market behavior. By examining historical data, key factors influencing the housing sector were identified, providing actionable insights for stakeholders, including investors, policymakers, and real estate professionals.",
    image: "/AlexWaweru.github.io/images/housemarket.jpg",
    link: "https://github.com/AlexGit-05/Data-Mining/tree/main/US%20Housing",
    category: "Time Series"
  },
  {
    title: "ETL and Web Scraping Projects for Data Extraction and Transformation",
    description: "Created a series of projects focused on automating the extraction, transformation, and loading (ETL) of data. Including Python notebooks for extracting structured data from PDF documents, R scripts for cleaning manager history data, and web scraping rental property data from BuyRentKenya.",
    image: "/AlexWaweru.github.io/images/etl.jpeg",
    link: "https://github.com/AlexGit-05/ETL",
    category: "Data Engineering"
  },
  {
    title: "AI-Powered Audio Transcription and Speaker Diarization",
    description: "Utilized AI-driven models, including PyAnnote Audio and Whisper, to perform speaker diarization and transcription on audio data. The project generates accurate, timestamped transcripts with speaker identification, enhancing the efficiency of processing multi-speaker conversations.",
    image: "/AlexWaweru.github.io/images/audio_text.jpg",
    link: "https://github.com/AlexGit-05/LLM/tree/main/audio%20transcription",
    category: "AI"
  }
];

const categories = ["All", "Data Analytics", "NLP", "Financial Analysis", "Machine Learning", "Time Series", "Data Engineering", "AI"]

export default function Projects() {
  const [filter, setFilter] = useState("All")

  const filteredProjects = projects.filter(project => 
    filter === "All" || project.category === filter
  )

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold mb-12 text-center">Projects</h1>
        <div className="flex flex-wrap justify-center space-x-2 space-y-2 mb-8">
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

