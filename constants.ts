import { Job, Education, SkillCategory } from './types';

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
    projects: [
      {
        title: "LLM-Based Workflow Automation",
        description: [
          "Built and deployed a scalable LLM solution with LangChain and LangFuse to parse unstructured data (emails, images, tables) via preprocessing pipelines that extract key information, automate database queries, and categorize content.",
          "Implemented an embedding-based RAG pipeline with Maximum Marginal Relevance (MMR) to enhance LLM accuracy by retrieving relevant and diverse historical samples, adapting to varied input patterns."
        ]
      },
      {
        title: "Copilot for Business Strategy and Knowledge Management",
        description: [
          "Built a LangGraph-based LLM pipeline to extract and organize domain-specific knowledge from presentation slides.",
          "Utilized GraphRAG to structure extracted knowledge, enhancing LLM outputs with relevant, context-specific information.",
          "Developed a standalone knowledge base with a Streamlit UI for business user CRUD operations, backed by PostgreSQL with Pgvector for embedding storage, and an MCP server for relevant data queries."
        ]
      },
      {
        title: "Operational Optimization",
        description: [
          "Developed linear programming models to optimize operational planning processes, improving efficiency through data-driven decision-making.",
          "Maintained automated data preprocessing pipelines to clean and prepare historical data for analytical tasks.",
          "Built evaluation pipelines to assess and refine planning strategies.",
          "Applied stochastic optimization techniques to address uncertainty in operational data, incorporating hard and soft constraints with dynamic penalty mechanisms to model user behavior accurately."
        ]
      },
      {
        title: "Conversational Analytics Platform",
        description: [
          "Joined an existing conversational analytics platform team to enhance data integration, enabling natural language queries for business intelligence without SQL or manual reporting.",
          "Built automated data pipelines using Scala and Spark to transform raw market data into standardized formats.",
          "Led POC implementation of semantic layer technology to replace complex SQL generation, enabling large language models to generate analytical queries through simplified parameter interfaces."
        ]
      },
      {
        title: "Logistics Simulation System",
        description: [
          "Developed a simulation system to model complex operational workflows, predict key performance metrics, and evaluate diverse operational scenarios.",
          "Built and validated predictive models and probabilistic allocation algorithms using statistical weight functions, mapping aggregate predictions to granular flows and refining accuracy through statistical analysis, enabling data-driven planning and resource optimization."
        ]
      }
    ]
  },
  {
    title: "Research Intern (AI Music)",
    company: "Huawei",
    period: "Feb 2023 - July 2023",
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

export const SKILLS: SkillCategory[] = [
  {
    category: "Multi-Agent Systems & LLMs",
    skills: ["LangGraph", "LangChain"]
  },
  {
    category: "Deep Learning & Machine Learning",
    skills: ["PyTorch", "scikit-learn", "Librosa"]
  },
  {
    category: "Data Analytics & Processing",
    skills: ["Pandas", "NumPy", "BeautifulSoup"]
  },
  {
    category: "Big Data & Databases",
    skills: ["Apache Spark (PySpark & Scala)", "PostgreSQL (pgvector)", "MongoDB", "MySQL", "SQL", "DBeaver"]
  },
  {
    category: "BI & Data Visualization",
    skills: ["Tableau", "Vividime"]
  },
  {
    category: "Visualization Libraries",
    skills: ["Matplotlib", "Seaborn"]
  },
  {
    category: "Programming Languages",
    skills: ["Python", "Scala", "JavaScript", "C", "Prolog"]
  },
  {
    category: "Web Development",
    skills: ["React.js", "Node.js", "Express.js", "Mongoose", "Bootstrap"]
  },
  {
    category: "Spoken Languages",
    skills: ["English (Fluent)", "Cantonese (Native)"]
  }
];