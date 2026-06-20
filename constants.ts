import { Job, Education } from './types';

export const PERSONAL_INFO = {
  name: "Kenneth Wan",
  fullName: "Yee Ki Wan (Kenneth)",
  role: "Data Scientist & AI Engineer",
  headline: "Turning data into meaningful insights through AI, LLMs, and optimization.",
  location: "Hong Kong",
  email: "yeekiiiiii@protonmail.com",
  linkedin: "https://www.linkedin.com/in/yee-ki-wan/",
  github: "https://github.com/kenneth2001",
};

export const EXPERIENCES: Job[] = [
  {
    title: "Associate Data Scientist",
    company: "OOCL",
    period: "September 2024 - Current",
    categorySkills: {
      "LLM & Applied Generative AI": ["LangChain", "LangGraph", "GraphRAG", "RAG", "Multi-Agent System", "Spark", "Scala"],
      "Optimization & Operations Research": ["Stochastic Optimization", "Google OR-Tools", "PySpark"],
      "Simulation & Predictive Modeling": ["SimPy (Discrete Event Simulation)", "PowerBI"]
    },
    projects: [
      {
        title: "Workflow Automation",
        category: "LLM & Applied Generative AI",
        description: [
          "Architected a scalable LLM solution (LangChain, LangFuse) with preprocessing pipelines to parse unstructured data (emails, images, tables), extract key information, automate database queries, and categorize content; designed an embedding-based RAG pipeline with MMR retrieval to improve accuracy across diverse input patterns"
        ]
      },
      {
        title: "Knowledge Management Copilot",
        category: "LLM & Applied Generative AI",
        description: [
          "Built a LangGraph-based pipeline extracting domain knowledge from presentation slides, structured via GraphRAG; delivered a standalone knowledge base (Streamlit UI, PostgreSQL + Pgvector, MCP server) for business-user CRUD and semantic queries"
        ]
      },
      {
        title: "Conversational Analytics",
        category: "LLM & Applied Generative AI",
        description: [
          "Contributed to a conversational BI platform enabling natural-language queries without SQL; built Spark/Scala pipelines transforming raw market data, and led POC of a cube.js semantic layer replacing complex SQL generation, enabling LLMs to emit analytical queries via simplified parameter interfaces"
        ]
      },
      {
        title: "Operational Planning Optimization",
        category: "Optimization & Operations Research",
        description: [
          "Developed linear and stochastic programming models with hard/soft constraints and dynamic penalty mechanisms modeling user behavior under uncertainty; built PySpark data preprocessing pipelines to prepare optimization inputs"
        ]
      },
      {
        title: "Scheduling Optimization",
        category: "Optimization & Operations Research",
        description: [
          "Built a resource-scheduling engine in Google OR-Tools — a mixed-integer programming (MIP) formulation encoding asset attributes, facility compatibility, dimensional and equipment constraints, and arrival-time uncertainty"
        ]
      },
      {
        title: "Logistics Simulation",
        category: "Simulation & Predictive Modeling",
        description: [
          "Developed a simulation system modeling complex operational workflows to predict KPIs and evaluate scenarios; built predictive models and probabilistic allocation algorithms with statistical weight functions, mapping aggregate forecasts to granular flows for data-driven resource optimization"
        ]
      }
    ]
  },
  {
    title: "Research Intern (AI Music)",
    company: "Huawei",
    period: "Feb 2023 - July 2023",
    skills: ["Deep Learning", "Music Generation", "PyTorch", "Stochastic Weight Averaging"],
    description: [
      "Conducted in-depth research on music generation and music-related classification tasks.",
      "Developed deep learning models for music classification using Stochastic Weight Averaging, mix-up, and gradient clipping, surpassing state-of-the-art benchmarks.",
      "Contributed to the development of content generation algorithms."
    ]
  },
  {
    title: "QA Engineer Intern",
    company: "Viu",
    period: "Jun 2021 - Sep 2021",
    skills: ["Data Engineering", "DBT", "Databricks", "Spark", "Redshift", "Tableau"],
    highlight: "Job duty was mainly focused on Data Engineering",
    description: [
      "Conducted quality assurance (QA) on mobile applications / web pages to ensure data accuracy",
      "Tracked and processed data using various tools such as DBT, Databricks, DBeaver, and Spark",
      "Queried data from Redshift and S3 to extract insights and create reports",
      "Built interactive Tableau dashboards to visualize and analyze data",
      "Used Atlassian tools (Jira, Confluence, and BitBucket) for project management / collaboration"
    ]
  }
];

export const EDUCATIONS: Education[] = [
  {
    school: "Imperial College London",
    degree: "MSc in Computing (AI and Machine Learning)",
    period: "Sep 2023 - Sep 2024",
    honors: ["Graduated with Distinction"],
    details: [
      "MSc Project: Data mining medical records of cannabis therapy in the UK"
    ]
  },
  {
    school: "The Chinese University of Hong Kong (CUHK)",
    degree: "BSc in Computer Science",
    period: "Aug 2019 - July 2023",
    honors: [
      "First Class Honours",
      "Dean’s List (2021-2022, 2022-2023)"
    ],
    details: [
      "Minor in Data Analytics and Informatics",
      "Stream: Database and Information Systems",
      "Final Year Project: Music Chord Detection"
    ]
  }
];