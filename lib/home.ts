// Condensed content for the home page sections (the full versions live in experience.ts, education.ts and skills.ts)
export const aboutStats = [
  { value: '7+', label: 'years in data and AI' },
  { value: '9', label: 'AI systems built' },
  { value: '−79%', label: 'agent prompt cost, via tool search' },
  { value: 'Senior AI Engineer', label: 'AICE Africa · since Jan 2026', small: true },
]

export const homeJobs = [
  {
    when: 'Jan 2026 – Present', current: true, title: 'Senior AI Engineer', org: 'AICE Africa · Nairobi · promoted Jan 2026',
    pts: ['Lead the architecture of AICE Nexus, usable alone or through MCP.', 'Moved to dynamic ReAct agents with semantic, episodic and in-context memory.', 'Built Agent Studio for designing agents graphically, plus Data Brain with 10+ data connectors.'],
    stack: ['LangGraph', 'ReAct agents', 'Agent memory', 'MCP', 'gVisor', 'BM25 + cross-encoder'],
  },
  {
    when: 'May – Dec 2025', title: 'Junior AI Engineer', org: 'AICE Africa · Nairobi',
    pts: ['Built the data analyst agent for a health research institute.', 'Agents with LangGraph, LangChain, FastAPI and MCP tools, with human-in-the-loop interrupts.', "Cut the agent's fixed prompt by 67–79% with tool search."],
    stack: ['LangGraph', 'LangChain', 'FastAPI', 'MCP', 'RAG', 'Supabase', 'Docker'],
  },
  {
    when: 'Jul – Dec 2024', title: 'Data Scientist Intern', org: 'KenGen · Nairobi',
    pts: ['Proof of concept in R, then the MVP in Python: reconciliation cut to a single upload and download.', 'A Dash app on MySQL that processes a period of data in as little as 2 seconds.'],
    stack: ['Python', 'R', 'Dash', 'MySQL', 'Power BI'],
  },
]

export const homeSkills: [title: string, items: string[]][] = [
  ['AI engineering', ['LangGraph', 'MCP', 'RAG', 'PyTorch']],
  ['Backend and data', ['FastAPI', 'PostgreSQL', 'Docker', 'SQL']],
  ['Analytics', ['Python', 'R', 'Power BI', 'Dash']],
]
