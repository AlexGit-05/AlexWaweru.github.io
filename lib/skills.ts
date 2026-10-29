export const coreSkills = new Set<string>([
  "Python",
  "SQL",
  "LangGraph",
  "LangChain",
  "MCP",
  "RAG",
  "FastAPI",
  "PostgreSQL (RLS, pgvector)",
  "PyTorch",
  "Docker"
])

export const skillGroups: [title: string, items: string[]][] = [
  [
    "Languages",
    [
      "Python",
      "SQL",
      "R",
      "TypeScript"
    ]
  ],
  [
    "Agentic AI",
    [
      "LangGraph",
      "LangChain",
      "MCP",
      "Agent Protocol",
      "Multi-agent workflows",
      "Tool calling",
      "Human-in-the-loop",
      "Guardrails"
    ]
  ],
  [
    "LLMs & retrieval",
    [
      "Gemini",
      "OpenAI",
      "Anthropic",
      "Open-weight LLMs",
      "RAG",
      "Hybrid search",
      "Embeddings",
      "LLM evaluation"
    ]
  ],
  [
    "Machine learning",
    [
      "PyTorch",
      "scikit-learn",
      "LightGBM / XGBoost",
      "CNN, ViT, Swin, YOLO",
      "Recommender systems",
      "Forecasting",
      "Econometrics"
    ]
  ],
  [
    "Backend & data",
    [
      "FastAPI",
      "REST",
      "Microservices",
      "Celery",
      "Next.js / React",
      "PostgreSQL (RLS, pgvector)",
      "DuckDB",
      "MySQL",
      "Redis",
      "Supabase"
    ]
  ],
  [
    "Security, cloud & BI",
    [
      "Tenant isolation",
      "JWT / JWKS",
      "gVisor sandboxing",
      "Docker",
      "GitHub Actions",
      "Google Cloud",
      "OpenTelemetry",
      "Power BI",
      "Dash"
    ]
  ]
]
