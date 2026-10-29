// Project content. Images live in public/images and carry the base path (static export, unoptimized images).
export type Area = 'agents' | 'ml' | 'analytics'

export type Project = {
  id: string
  area: Area
  title: string
  role: string
  img?: string
  credit?: [author: string, license: string, url: string]
  live?: string
  link?: string
  big?: [string, string]
  metrics: [label: string, value: string][]
  stack: string[]
  desc: string
  what?: string
  how?: string
  mine?: string
  note?: string
}

export const areas: { id: 'all' | Area; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'agents', label: 'Agents & LLMs' },
  { id: 'ml', label: 'Machine learning' },
  { id: 'analytics', label: 'Analytics' },
]

export const projects: Project[] = [
  {
    "id": "platform",
    "area": "agents",
    "title": "AICE Nexus",
    "role": "Lead architect",
    "img": "/AlexWaweru.github.io/images/nexus.gif",
    "live": "https://console.aiceafrica.com/",
    "big": [
      "−79%",
      "fixed agent prompt"
    ],
    "metrics": [
      [
        "fixed prompt",
        "−67–79%"
      ],
      [
        "runtime tests",
        "~790"
      ],
      [
        "console tests",
        "~1,200"
      ],
      [
        "data connectors",
        "10+"
      ]
    ],
    "stack": [
      "LangGraph",
      "MCP",
      "FastAPI",
      "Postgres RLS",
      "pgvector",
      "Next.js"
    ],
    "desc": "AI services for your product, run from one console: agents, knowledge, crawler, data brain, recommendations and a sandbox.",
    "what": "AICE Nexus is AICE Africa's AI services platform, run from one console: Agent Platform, Knowledge, Crawler, Data Brain, Recommendation and Sandbox, with typed SDKs and live playgrounds. Each service works alone or plugs into agents through MCP, with Postgres row-level security as the tenant boundary.",
    "mine": "About 70 of ~100 commits. I wrote the agent runtime (24-slot middleware with guardrails, audit log and human approval), crawler, data gateway, sandbox and deepfake model, and designed the tool search that cut the fixed prompt by 67–79%. As the platform grew I moved it to dynamic ReAct agents with semantic, episodic and in-context memory, built Agent Studio for designing agents graphically, a hybrid recommender, a web-search crawler, Data Brain (10+ data-source connectors including S3), and hybrid BM25 + cross-encoder retrieval for the knowledge base. I also built the console end to end: customer and staff consoles, Agent Studio, keys, quotas and budgets, and a 52-page docs site, with MFA, a hash-chained audit log and ~1,200 backend tests."
  },
  {
    "id": "health",
    "area": "agents",
    "img": "/AlexWaweru.github.io/images/proj-health.jpg",
    "credit": [
      "Florence Nightingale, 1858",
      "Public domain",
      "https://commons.wikimedia.org/wiki/File:Nightingale-mortality.jpg"
    ],
    "title": "Data Analyst Agent for a health research institute",
    "role": "Sole author · backend",
    "big": [
      "~100",
      "MCP recipes"
    ],
    "metrics": [
      [
        "recipes",
        "~100"
      ],
      [
        "chart types",
        "42"
      ],
      [
        "subagents",
        "3"
      ]
    ],
    "stack": [
      "LangChain",
      "LangGraph",
      "Gemini",
      "PostgreSQL",
      "Docker"
    ],
    "desc": "Ask questions in plain language and get indicators, charts and forecasts from a multi-agent \"lead data scientist\".",
    "what": "A main agent delegates to data-engineer, data-analyst and ML-engineer subagents. Six MCP servers provide about 100 recipes: demographic indicators, 42 chart types, statistical tests and forecasting. Generated Python runs in a Docker sandbox, and the model only sees the schema and a short preview.",
    "mine": "I wrote the agent backend: the middleware (summarisation, retries, call limits), prompts, a SQL confirmation step, token quotas and most of the sandbox hardening."
  },
  {
    "id": "ce",
    "area": "agents",
    "title": "Conversation Engine",
    "role": "Top contributor",
    "img": "/AlexWaweru.github.io/images/conversation-engine.gif",
    "live": "https://conversationengine.ai/support",
    "big": [
      "39/108",
      "commits"
    ],
    "metrics": [
      [
        "commits",
        "39 of 108"
      ],
      [
        "LLM providers",
        "4"
      ]
    ],
    "stack": [
      "FastAPI",
      "LangChain",
      "Supabase",
      "Next.js"
    ],
    "desc": "A multi-tenant AI CRM: an agent follows configurable workflows, answers from a knowledge base and hands off to humans.",
    "what": "Customers chat with an agent that runs onboarding, claims and loan workflows, answers from a tenant knowledge base and can hand off to a person. It is built on AICE Nexus: it uses Nexus AI services as tools, and its agents are designed in the Nexus Agent Studio.",
    "mine": "I built workflow-as-skill generation, the multi-tenant knowledge base and crawler, PII hashing before data reaches the LLM, and authenticated MCP servers."
  },
  {
    "id": "datainviz",
    "area": "agents",
    "title": "DataInViz",
    "role": "Contributor · agent skills",
    "img": "/AlexWaweru.github.io/images/datainviz.gif",
    "big": [
      "On demand",
      "skills loaded by search"
    ],
    "metrics": [
      [
        "my commits",
        "7"
      ],
      [
        "platform commits",
        "~1,900"
      ],
      [
        "joined",
        "Jul 2026"
      ]
    ],
    "stack": [
      "TypeScript",
      "DeepAgents",
      "Tool search"
    ],
    "desc": "Agent skills for a data-visualisation platform: skills are found and loaded on demand, so the system prompt stays small.",
    "what": "DataInViz is a data-visualisation and analytics platform with an AI chat agent, charts and data connectors, built by a larger team (about 1,900 commits). I joined in July 2026 and worked on its LLM controller, a TypeScript service built on DeepAgents.",
    "mine": "A focused contribution: researching and implementing optimisation techniques for the agent. I built the skills layer, with on-demand skills in SKILL.md directories found through search tools and loaded with load_skill, which cut the system prompt's token cost. I also added per-agent tool scoping, member-created skills saved per workspace, a chart-config skill for LLM-driven charting, and date-agnostic time axes. I did not build the platform, its charting library or its connectors.",
    "note": "Team platform. The code is private; I'm happy to walk through my part on a call."
  },
  {
    "id": "deepfake",
    "area": "ml",
    "img": "/AlexWaweru.github.io/images/proj-deepfake.jpg",
    "credit": [
      "Vahan03",
      "Public domain",
      "https://commons.wikimedia.org/wiki/File:Male_and_female_deepfake.jpg"
    ],
    "title": "Deepfake image detector",
    "role": "Sole author",
    "big": [
      "0.994",
      "AUC on 17k images"
    ],
    "metrics": [
      [
        "accuracy",
        "0.970"
      ],
      [
        "AUC",
        "0.994"
      ],
      [
        "images",
        "17k"
      ]
    ],
    "stack": [
      "PyTorch",
      "Swin",
      "MLflow"
    ],
    "desc": "A Swin Transformer that separates real from generated images, checked for shortcut learning.",
    "what": "A Swin Transformer trained on 17k deduplicated images and tracked with ZenML and MLflow.",
    "mine": "I built the model and a leakage audit that caught two shortcut-prone sources, which I removed before reporting results."
  },
  {
    "id": "gpt",
    "area": "ml",
    "img": "/AlexWaweru.github.io/images/proj-gpt.jpg",
    "credit": [
      "Brandenads, from work by Willi Heidelbach",
      "CC BY 3.0",
      "https://commons.wikimedia.org/wiki/File:MetalTypeZoomIn.JPG"
    ],
    "title": "GPT from scratch",
    "role": "Sole author",
    "big": [
      "25.7",
      "validation perplexity"
    ],
    "metrics": [
      [
        "perplexity",
        "25.7"
      ],
      [
        "top-1",
        "0.465"
      ],
      [
        "PDFs",
        "103"
      ]
    ],
    "stack": [
      "PyTorch",
      "BPE",
      "RoPE"
    ],
    "desc": "An LLM pretraining pipeline with a custom tokenizer and LLaMA-style model, trained on Kenya Gazette PDFs.",
    "what": "A custom BPE tokenizer, dense and LLaMA-style models (RoPE, RMSNorm, SwiGLU), and a trainer with warmup, cosine schedule and evaluation.",
    "mine": "Built end to end. The recorded run on 103 Kenya Gazette PDFs reached perplexity 25.7."
  },
  {
    "id": "sickle",
    "area": "ml",
    "img": "/AlexWaweru.github.io/images/proj-sickle.jpg",
    "credit": [
      "Ed Uthman",
      "CC BY 2.0",
      "https://commons.wikimedia.org/wiki/File:Sickle_Cell_Anemia_(5610746554).jpg"
    ],
    "title": "Sickle cell image classification",
    "role": "Team project",
    "big": [
      "0.994",
      "F1, Swin"
    ],
    "metrics": [
      [
        "Swin accuracy",
        "0.991"
      ],
      [
        "YOLOv8 F1",
        "0.887"
      ]
    ],
    "stack": [
      "Swin",
      "YOLOv8",
      "GradCAM"
    ],
    "desc": "Classifying sickle cell disease from blood-smear images, comparing YOLO detectors with a Swin Transformer.",
    "what": "Team project on 569 blood-smear images, with GradCAM, ROC analysis and 5-fold cross-validation.",
    "mine": "I trained and evaluated the YOLO and Swin models, ran the analysis, and wrote the report and slides. Results come from one test split of about 114 images."
  },
  {
    "id": "kengen",
    "area": "analytics",
    "title": "Energy Sector Data Automation Dashboard",
    "role": "Built at KenGen",
    "img": "/AlexWaweru.github.io/images/mvp.gif",
    "metrics": [
      [
        "processing",
        "~2 s per period"
      ],
      [
        "proof of concept",
        "R"
      ],
      [
        "MVP",
        "Python · Dash"
      ],
      [
        "year",
        "2024"
      ]
    ],
    "stack": [
      "Python",
      "Dash",
      "MySQL"
    ],
    "desc": "A Dash app for revenue tracking, energy dispatch analysis and tariff modelling, replacing spreadsheet workflows.",
    "what": "Built during my internship at KenGen in 2024. Reconciliation used to be a manual spreadsheet process; now staff upload the data once and download the results, while the system processes, analyses and visualises it.",
    "mine": "I built the proof of concept in R, then the MVP in Python as a Dash app on MySQL. Automating the whole computation process cut processing for a period's data to as little as 2 seconds."
  },
  {
    "id": "air",
    "area": "analytics",
    "title": "Air Pollution Trends in Nairobi",
    "role": "Final-year project",
    "img": "/AlexWaweru.github.io/images/air-pollution.jpg",
    "link": "https://github.com/AlexGit-05/Final-Year-Project",
    "metrics": [
      [
        "locations",
        "58"
      ],
      [
        "period",
        "Jan 2018 – Feb 2023"
      ],
      [
        "model",
        "VAR(1)"
      ]
    ],
    "stack": [
      "R",
      "VAR",
      "vars",
      "tidyverse"
    ],
    "desc": "PM2.5 and PM10 against temperature and humidity across 58 locations, modelled with Vector Autoregression.",
    "what": "My BSc final-year project. Hourly PM2.5, PM10, temperature and humidity readings from 58 locations across Nairobi (January 2018 to February 2023) were cleaned and aggregated in R, explored for trends and seasonal patterns, then modelled to learn how weather drives pollution and to forecast it.",
    "how": "A Vector Autoregression (VAR) treats the four series as one system. Each variable is predicted from its own past values and from the past values of all the others, so the model captures feedback between them, such as humidity affecting PM2.5 and PM2.5 moving with PM10. A VAR(p) writes today's vector of values as a constant plus p coefficient matrices applied to the previous p vectors, plus noise. It needs stationary series, so each one is checked with the Augmented Dickey–Fuller test and differenced if needed. Granger causality tests ask whether one series' past improves the forecast of another, and the residuals are checked for leftover autocorrelation (Portmanteau test) and changing variance (ARCH test) before the model is used to forecast.",
    "mine": "I built the R pipeline that imports the monthly CSV files, filters and aggregates the readings, groups the sensors into regions and imputes gaps. I then ran ADF tests and differencing, Granger causality tests between temperature, humidity, PM2.5 and PM10, and fitted VAR(1) models per region with a constant and 12-period seasonal dummies (vars package), checked them with serial-correlation and ARCH tests, and produced 30-step forecasts."
  },
  {
    "id": "recon",
    "area": "analytics",
    "title": "Reconciliation Automation App",
    "role": "Built at Samchi",
    "img": "/AlexWaweru.github.io/images/auto.jpg",
    "link": "https://github.com/AlexGit-05/Samchi-Reconciliation-app/tree/main",
    "metrics": [
      [
        "manual work",
        "−80%"
      ]
    ],
    "stack": [
      "R"
    ],
    "desc": "Merges and reconciles two reports, flags discrepancies and produces the reconciliation report automatically."
  },
  {
    "id": "audio",
    "area": "ml",
    "title": "Audio Transcription and Speaker Diarization",
    "role": "Freelance · 2024",
    "img": "/AlexWaweru.github.io/images/audio.jpg",
    "link": "https://github.com/AlexGit-05/LLM/tree/main/audio%20transcription",
    "metrics": [
      [
        "diarization",
        "pyannote"
      ],
      [
        "transcription",
        "Whisper"
      ],
      [
        "year",
        "H1 2024"
      ]
    ],
    "stack": [
      "Python",
      "pyannote",
      "Whisper",
      "LangChain",
      "Mixtral 8x7B"
    ],
    "desc": "Turns multi-speaker audio into a dialogue of who said what: diarization splits the audio, Whisper transcribes each turn.",
    "what": "A freelance project from the first half of 2024, built with LangChain and Mixtral 8x7B from Hugging Face.",
    "mine": "I split each recording into chunks at speaker changes using pyannote diarization, transcribed every chunk with Whisper, and stitched the results into a timestamped dialogue showing what was said and by whom."
  },
  {
    "id": "contradiction",
    "area": "ml",
    "img": "/AlexWaweru.github.io/images/proj-contradiction.jpg",
    "credit": [
      "Heptagon",
      "Public domain",
      "https://commons.wikimedia.org/wiki/File:Magnifying_glass2.jpg"
    ],
    "title": "Contradiction detection with a fine-tuned Mixtral",
    "role": "Freelance · 2024",
    "big": [
      "QLoRA",
      "fine-tuned Mixtral-8x7B"
    ],
    "metrics": [
      [
        "base model",
        "Mixtral-8x7B-Instruct"
      ],
      [
        "method",
        "QLoRA"
      ],
      [
        "year",
        "H1 2024"
      ]
    ],
    "stack": [
      "Mixtral-8x7B-Instruct",
      "QLoRA",
      "LangChain",
      "Hugging Face"
    ],
    "desc": "A system that detects contradictions in documents, using Mixtral-8x7B-Instruct fine-tuned with QLoRA.",
    "what": "Part of the same 2024 freelance work as the audio transcription system: a model that flags statements in documents that contradict each other.",
    "mine": "We fine-tuned mistralai/Mixtral-8x7B-Instruct-v0.1 with QLoRA and built the detection pipeline around it with LangChain.",
    "note": "Client project. The code is private; I'm happy to walk through it on a call."
  },
  {
    "id": "energy",
    "area": "ml",
    "img": "/AlexWaweru.github.io/images/proj-energy.jpg",
    "credit": [
      "Novoklimov",
      "CC0",
      "https://commons.wikimedia.org/wiki/File:Anchor_pylon_of_high-voltage_overhead_power_line_750_kV.jpg"
    ],
    "title": "PJM Energy Price Forecasting and Procurement",
    "role": "Freelance · 2026",
    "big": [
      "72 h · 36 mo",
      "price forecasts"
    ],
    "metrics": [
      [
        "PJM zones",
        "21"
      ],
      [
        "short term",
        "0–72 h quantiles"
      ],
      [
        "long term",
        "1–36 months"
      ],
      [
        "my commits",
        "24 of 33"
      ]
    ],
    "stack": [
      "LightGBM",
      "statsmodels VAR",
      "FastAPI",
      "Celery",
      "Supabase",
      "Next.js"
    ],
    "desc": "Forecasts PJM wholesale electricity prices and turns them into buy or wait procurement signals on a real-time dashboard.",
    "what": "A monorepo for a client buying power in the PJM market (21 zones). Five FastAPI engines (ingestion, scoring, alerting, procurement, jobs) share one Postgres database; Celery workers run ingestion and training, pg_cron runs nightly and monthly pipelines, and a Next.js dashboard behind Kong updates live through Supabase Realtime.",
    "how": "Three model families per zone. A direct multi-horizon LightGBM quantile regression gives p10–p90 prices for the next 72 hours, and the buy probability P(price ≤ P33) is read off the quantile curve. A VAR splits the price into its energy, congestion and loss components. A gas × heat-rate model builds 36-month forward curves: NYMEX futures, then the EIA outlook, then mean reversion for gas, times a seasonal heat rate, with 2,000 Monte Carlo paths for the bands and rolling-origin backtests. A signal engine weighs six factors (forward percentile, trend, volatility, gas–power alignment, hedge coverage, delivery urgency) into six actions, from Buy 50% to Wait.",
    "mine": "Freelance build from April to July 2026. I wrote 24 of the repository's 33 commits, across the AI service, its models and the pipelines.",
    "note": "Client project. The code is private; I'm happy to walk through it on a call."
  }
]

// the six projects on the home orbit, in ring order
export const ORBIT_IDS = ['platform', 'ce', 'datainviz', 'gpt', 'audio', 'air']

export const getProject = (id: string) => projects.find((p) => p.id === id)
