export type Job = {
  now?: boolean
  promo?: boolean
  title: string
  org: string
  when: string
  meta: string
  pts: string[]
  stack: string[]
}

export const jobs: Job[] = [
  {
    "now": true,
    "title": "Senior AI Engineer",
    "org": "AICE Africa",
    "when": "Jan 2026 – Present",
    "meta": "Nairobi",
    "promo": true,
    "pts": [
      "Lead the architecture of AICE Nexus: agents, knowledge, crawler, Data Brain, recommendations and a sandbox, each usable alone or through MCP.",
      "Moved the agents from conditional routing to dynamic ReAct agents with tools, and from static to dynamic graphs, on a LangGraph runtime with a 24-slot middleware stack and ~790 tests.",
      "Added long-term (semantic), episodic and in-context memory, gVisor sandboxing and an agent test harness.",
      "Built Agent Studio, which lets teams design and build agents graphically in Nexus, with skills.",
      "Built a hybrid recommendation engine, a custom web-search crawler and Data Brain, a data-source control layer with 10+ connectors including S3.",
      "Improved the knowledge base (RAG) with BM25 hybrid search, cross-encoder re-ranking and relevance scores from semantic distance, and built the customer and staff console."
    ],
    "stack": [
      "LangGraph",
      "ReAct agents",
      "Agent memory",
      "MCP",
      "gVisor",
      "BM25 + cross-encoder",
      "pgvector",
      "Next.js"
    ]
  },
  {
    "title": "Junior AI Engineer",
    "org": "AICE Africa",
    "when": "May – Dec 2025",
    "meta": "Nairobi",
    "pts": [
      "Built the data analyst agent for a health research institute.",
      "Built agents with LangGraph, LangChain and FastAPI, MCP for tools, human-in-the-loop through LangGraph interrupts, short-term memory and Supabase.",
      "Built a RAG system in LangGraph, with linear nodes and conditional routers that hand off to subagents.",
      "Set up a Docker container sandbox for generated code, and model configuration.",
      "Worked on an onboarding agent system that completes forms.",
      "Cut the agent's fixed prompt by 67–79% with tool search."
    ],
    "stack": [
      "LangGraph",
      "LangChain",
      "FastAPI",
      "MCP",
      "Human-in-the-loop",
      "RAG",
      "Supabase",
      "Docker"
    ]
  },
  {
    "title": "Data Scientist (Freelance)",
    "org": "Independent",
    "when": "Aug 2020 – Present",
    "meta": "Remote",
    "pts": [
      "PJM energy price forecasting and procurement platform (Apr – Jul 2026): 72-hour LightGBM quantile forecasts, VAR component decomposition, 36-month forward curves with Monte Carlo bands and a six-factor buy-signal engine.",
      "Audio transcription with speaker diarization (pyannote + Whisper), and contradiction detection with Mixtral-8x7B-Instruct fine-tuned using QLoRA, built with LangChain (first half of 2024).",
      "Power BI dashboards for service KPIs and revenue, and econometric models of market volatility."
    ],
    "stack": [
      "Python",
      "LightGBM",
      "statsmodels",
      "LangChain",
      "Mixtral",
      "QLoRA",
      "Whisper",
      "Power BI"
    ]
  },
  {
    "title": "Data Scientist Intern",
    "org": "KenGen",
    "when": "Jul – Dec 2024",
    "meta": "Nairobi",
    "pts": [
      "Built the Energy Sector Data Automation system: the proof of concept in R, then the MVP in Python as a Dash app on MySQL.",
      "Cut reconciliation to a single upload and download: the system processes, analyses and visualises the data, automating the whole computation.",
      "Processing a period's data now takes as little as 2 seconds.",
      "Power BI dashboards, and a scraper that alerts staff to new gazette notices."
    ],
    "stack": [
      "R",
      "Python",
      "Dash",
      "MySQL",
      "Power BI"
    ]
  },
  {
    "title": "Data Scientist / AI Trainer",
    "org": "AICE Africa",
    "when": "Mar – May 2024",
    "meta": "Remote",
    "pts": [
      "Trained learners in Python, machine learning, evaluation, deployment and data storytelling."
    ],
    "stack": [
      "Python",
      "scikit-learn"
    ]
  },
  {
    "title": "Data Analyst Intern",
    "org": "Samchi Telecommunication",
    "when": "May – Jul 2022",
    "meta": "Nairobi",
    "pts": [
      "Cut manual reporting effort by 80% with an R workflow that merges internal and Safaricom reports."
    ],
    "stack": [
      "R"
    ]
  },
  {
    "title": "Data Analyst",
    "org": "DATIM",
    "when": "Jun – Nov 2020",
    "meta": "Remote",
    "pts": [
      "Analysed HIV/AIDS programme data and automated the analysis in R."
    ],
    "stack": [
      "R"
    ]
  }
]
