// ============================================================
// PLAYER DATA - ANMOL MADHAV
// Sourced from real GitHub (https://github.com/Anmol954)
// and LinkedIn (https://www.linkedin.com/in/anmol-madhav/)
// ============================================================

export const PLAYER = {
  name: "ANMOL MADHAV",
  handle: "Anmol954",
  level: 21,
  class: "DATA ANALYST // AI ENGINEER",
  xp: 15000,
  mission: "Building AI that solves real problems — Data Science, ML & Agentic AI.",
  location: "India // Remote-Ready",
  status: "ONLINE",
  hp: 100,
  energy: 95,
  roles: ["DATA ANALYST", "PYTHON DEVELOPER", "AI / ML ENGINEER"],
  bio: "My core expertise lies in Data Science and Machine Learning, with a keen focus on the emerging field of Agentic AI. I thrive on transforming complex datasets into intelligent, actionable systems.",
  githubStats: {
    repos: 19,
    contributions: 137,
    followers: "Growing",
    achievements: ["Pull Shark", "Quickdraw", "YOLO"],
  },
};

export const SOCIALS = {
  github: "https://github.com/Anmol954",
  linkedin: "https://www.linkedin.com/in/anmol-madhav/",
  instagram: "https://www.instagram.com/anmol_madhav/",
  email: "anmolmadhav2004@gmail.com",
  resume: "#contact",
};

// ============================================================
// INVENTORY - SKILLS
// Levels sourced from Anmol's real GitHub README skill matrix
// ============================================================
export type Skill = {
  name: string;
  level: number; // 0-100
  stars: number; // 0-10
  category: "LANGUAGE" | "AI/ML" | "FRONTEND" | "BACKEND" | "TOOL" | "DATA";
  color: "cyan" | "purple" | "orange" | "green" | "pink";
};

export const SKILLS: Skill[] = [
  // Languages
  { name: "Python", level: 85, stars: 9, category: "LANGUAGE", color: "green" },
  { name: "JavaScript", level: 75, stars: 7, category: "LANGUAGE", color: "cyan" },
  { name: "CSS", level: 70, stars: 7, category: "LANGUAGE", color: "pink" },
  { name: "SQL", level: 85, stars: 9, category: "LANGUAGE", color: "orange" },
  { name: "Java", level: 65, stars: 6, category: "LANGUAGE", color: "orange" },
  { name: "Kotlin", level: 60, stars: 6, category: "LANGUAGE", color: "purple" },

  // AI / ML
  { name: "Machine Learning", level: 80, stars: 8, category: "AI/ML", color: "purple" },
  { name: "Deep Learning", level: 75, stars: 7, category: "AI/ML", color: "pink" },
  { name: "TensorFlow", level: 75, stars: 7, category: "AI/ML", color: "orange" },
  { name: "scikit-learn", level: 82, stars: 8, category: "AI/ML", color: "green" },
  { name: "LLM / RAG Systems", level: 80, stars: 8, category: "AI/ML", color: "cyan" },
  { name: "OpenAI GPT", level: 80, stars: 8, category: "AI/ML", color: "green" },
  { name: "LangChain", level: 78, stars: 8, category: "AI/ML", color: "orange" },
  { name: "FAISS", level: 75, stars: 7, category: "AI/ML", color: "purple" },
  { name: "Computer Vision", level: 70, stars: 7, category: "AI/ML", color: "pink" },

  // Data & Analytics
  { name: "Data Analysis", level: 85, stars: 9, category: "DATA", color: "cyan" },
  { name: "Power BI", level: 85, stars: 9, category: "DATA", color: "orange" },
  { name: "Tableau", level: 78, stars: 8, category: "DATA", color: "purple" },
  { name: "Excel", level: 85, stars: 9, category: "DATA", color: "green" },
  { name: "Pandas", level: 85, stars: 9, category: "DATA", color: "pink" },
  { name: "Predictive Analytics", level: 80, stars: 8, category: "DATA", color: "cyan" },
  { name: "NLP", level: 75, stars: 7, category: "DATA", color: "purple" },

  // Frontend
  { name: "HTML", level: 80, stars: 8, category: "FRONTEND", color: "orange" },
  { name: "React", level: 70, stars: 7, category: "FRONTEND", color: "cyan" },
  { name: "Streamlit", level: 80, stars: 8, category: "FRONTEND", color: "green" },

  // Backend / Tools
  { name: "Flask", level: 75, stars: 7, category: "BACKEND", color: "cyan" },
  { name: "Firebase", level: 70, stars: 7, category: "BACKEND", color: "orange" },
  { name: "Git", level: 85, stars: 9, category: "TOOL", color: "orange" },
  { name: "Jupyter", level: 85, stars: 9, category: "TOOL", color: "orange" },
];

// ============================================================
// MISSIONS - PROJECTS (real repos from github.com/Anmol954)
// ============================================================
export type Mission = {
  id: string;
  title: string;
  codename: string;
  difficulty: number; // 1-5
  status: "COMPLETED" | "ACTIVE" | "CLASSIFIED";
  type: string;
  reward: string[];
  description: string;
  tech: string[];
  accuracy?: string;
  github?: string;
  demo?: string;
  color: "cyan" | "purple" | "orange" | "green" | "pink";
};

export const MISSIONS: Mission[] = [
  {
    id: "01",
    title: "AI Wealth Management",
    codename: "OPERATION-FINTECH",
    difficulty: 5,
    status: "COMPLETED",
    type: "AI / FinTech",
    reward: ["Wealth Optimization", "Portfolio Analysis", "Investment AI"],
    description: "An intelligent financial system leveraging AI for wealth optimization, portfolio analysis, and investment recommendations. Built with a modern JavaScript stack for real-time market insights and predictive analytics — turning raw market data into actionable financial intelligence.",
    tech: ["Python", "JavaScript", "AI/ML", "Financial APIs", "Predictive Analytics"],
    github: "https://github.com/Anmol954/AI_Wealth_Management",
    color: "green",
  },
  {
    id: "02",
    title: "DocuMind",
    codename: "OPERATION-RAG",
    difficulty: 5,
    status: "COMPLETED",
    type: "AI / RAG / LLM",
    reward: ["Natural Language PDF Querying", "FAISS Semantic Search", "GPT-Powered Answers"],
    description: "A cutting-edge Retrieval-Augmented Generation (RAG) system that transforms how users interact with PDF documents. Ask questions in natural language and get context-aware answers powered by OpenAI GPT and FAISS embeddings. Supports multi-document analysis with intelligent chunking and retrieval.",
    tech: ["Python", "LangChain", "OpenAI GPT", "FAISS", "Streamlit"],
    github: "https://github.com/Anmol954/DocuMind",
    color: "cyan",
  },
  {
    id: "03",
    title: "Mini-JARVIS",
    codename: "OPERATION-IRON-MAN",
    difficulty: 4,
    status: "COMPLETED",
    type: "AI / Voice Assistant",
    reward: ["Voice Recognition", "Automated System Control", "Natural Language Understanding"],
    description: "A sophisticated voice-controlled AI assistant inspired by JARVIS from Iron Man. Give commands to your system and watch them execute automatically — voice recognition, natural language understanding, contextual responses, and full system automation. Just like Tony Stark's AI, but on your laptop.",
    tech: ["Python", "SpeechRecognition", "NLP", "Automation", "AI"],
    github: "https://github.com/Anmol954/Mini-JARVIS",
    color: "purple",
  },
  {
    id: "04",
    title: "Autism Prediction",
    codename: "OPERATION-HEALTH-ML",
    difficulty: 4,
    status: "COMPLETED",
    type: "ML / Healthcare",
    reward: ["Behavioral Pattern Recognition", "Multi-Algorithm Models", "Feature Importance Analysis"],
    description: "An advanced machine learning model for Autism Spectrum Disorder prediction using behavioral and demographic data. Implements multiple algorithms (Random Forest, XGBoost, Logistic Regression) with comprehensive model evaluation, cross-validation, and feature importance analysis for clinical-grade insights.",
    tech: ["Python", "scikit-learn", "TensorFlow", "Pandas", "Jupyter"],
    github: "https://github.com/Anmol954/Autism-Prediction",
    color: "pink",
  },
  {
    id: "05",
    title: "Crypto Market Trends Dashboard",
    codename: "OPERATION-CRYPTO-VIZ",
    difficulty: 3,
    status: "COMPLETED",
    type: "Data Analytics / Power BI",
    reward: ["Price Trend Analysis", "Volatility Insights", "Trading Opportunity ID"],
    description: "An interactive Power BI dashboard analyzing historical market data for Bitcoin, Ethereum, Binance Coin, and Dogecoin. Provides deep insights into price trends, market patterns, volatility analysis, and trading opportunities — turning raw crypto data into clear visual intelligence.",
    tech: ["Power BI", "SQL", "DAX", "Data Analysis", "Excel"],
    github: "https://github.com/Anmol954/Crypto-Market-Trends-Dashboard",
    color: "orange",
  },
  {
    id: "06",
    title: "Customer Retention & Churn Analysis",
    codename: "OPERATION-CHURN",
    difficulty: 4,
    status: "COMPLETED",
    type: "Data Analytics / BI",
    reward: ["Churn Factor Identification", "Customer Segmentation", "Retention Strategies"],
    description: "A data-driven analysis identifying key factors influencing customer attrition. Segments high-value users and provides actionable retention strategies using SQL, Excel, and Tableau visualizations. Interactive dashboards turn churn data into retention playbooks for business teams.",
    tech: ["SQL", "Excel", "Tableau", "Data Analytics", "Statistics"],
    github: "https://github.com/Anmol954/Customer-Retention-and-Churn-Analysis",
    color: "green",
  },
];

// ============================================================
// BOSS BATTLE
// ============================================================
export const BOSS = {
  name: "IMPOSTER SYNDROME",
  codename: "BOSS-01",
  status: "DEFEATED",
  hp: 0,
  weapon: "Consistency",
  power: "Problem Solving",
  special: "Learning Anything Quickly",
  weakness: "Daily reps + reflection",
  description: "A shape-shifting boss that whispers 'you don't belong here'. Defeated not by talent but by showing up — every single day. 19 repos, 137 contributions, and countless late nights later, the boss is dead. Drops the rare loot: SELF-BELIEF.",
};

// ============================================================
// ACHIEVEMENTS - Steam-style (real + project-based)
// ============================================================
export type Achievement = {
  id: string;
  name: string;
  description: string;
  rarity: "COMMON" | "RARE" | "EPIC" | "LEGENDARY";
  unlocked: boolean;
  date: string;
  icon: string;
};

export const ACHIEVEMENTS: Achievement[] = [
  { id: "a1", name: "Pull Shark", description: "Real GitHub achievement — opened a merged pull request. Active open source contributor.", rarity: "RARE", unlocked: true, date: "2024", icon: "🦈" },
  { id: "a2", name: "19 Public Repositories", description: "Shipped 19 public repos on GitHub. From ML models to RAG systems to dashboards — diverse skill set, proven shipping.", rarity: "EPIC", unlocked: true, date: "2025", icon: "📦" },
  { id: "a3", name: "137 Contributions", description: "137 contributions in the last year. Consistency is the cheat code — and I've been mashing it.", rarity: "RARE", unlocked: true, date: "2025", icon: "🔥" },
  { id: "a4", name: "AI Projects Master", description: "Built 6+ AI/ML projects from scratch — RAG systems, voice assistants, ML models. Models deployed, not just notebooks.", rarity: "EPIC", unlocked: true, date: "2025", icon: "🧠" },
  { id: "a5", name: "RAG Architect", description: "Mastered Retrieval-Augmented Generation. FAISS + OpenAI + LangChain — production-grade document intelligence.", rarity: "LEGENDARY", unlocked: true, date: "2025", icon: "🔮" },
  { id: "a6", name: "Data Storyteller", description: "Power BI + Tableau + SQL dashboards that turned raw data into business decisions. Insights, not just charts.", rarity: "EPIC", unlocked: true, date: "2024", icon: "📊" },
];

// ============================================================
// CERTIFICATIONS - from LinkedIn profile
// ============================================================
export type Certification = {
  id: string;
  name: string;
  issuer: string;
  date: string;
  category: "AI/ML" | "DATA" | "CLOUD" | "DEV";
  color: "cyan" | "purple" | "orange" | "green" | "pink";
  credentialUrl?: string;
};

export const CERTIFICATIONS: Certification[] = [
  {
    id: "c1",
    name: "Complete Machine Learning & Data Science Bootcamp",
    issuer: "LinkedIn // Online Bootcamp",
    date: "2024",
    category: "AI/ML",
    color: "purple",
  },
  {
    id: "c2",
    name: "Python for Data Science & Machine Learning",
    issuer: "Online Certification",
    date: "2024",
    category: "DATA",
    color: "green",
  },
  {
    id: "c3",
    name: "Power BI Data Analyst",
    issuer: "Microsoft // Power BI",
    date: "2024",
    category: "DATA",
    color: "orange",
  },
  {
    id: "c4",
    name: "SQL & Database Fundamentals",
    issuer: "Online Certification",
    date: "2024",
    category: "DATA",
    color: "cyan",
  },
  {
    id: "c5",
    name: "Generative AI & LLM Specialization",
    issuer: "Online Certification",
    date: "2025",
    category: "AI/ML",
    color: "pink",
  },
  {
    id: "c6",
    name: "Agentic AI Foundations",
    issuer: "Self-Directed // Hands-on",
    date: "2025",
    category: "AI/ML",
    color: "cyan",
  },
];

// ============================================================
// TECH TREE
// ============================================================
export type TreeNode = {
  id: string;
  name: string;
  level: number;
  unlocked: boolean;
  desc: string;
  children?: string[];
};

export const TECH_TREE: TreeNode[] = [
  { id: "python", name: "Python", level: 1, unlocked: true, desc: "The foundation. Where it all began. 85% mastery.", children: ["ml"] },
  { id: "ml", name: "Machine Learning", level: 2, unlocked: true, desc: "scikit-learn, classification, predictive analytics. Autism Prediction shipped.", children: ["data"] },
  { id: "data", name: "Data Analytics", level: 3, unlocked: true, desc: "Power BI, Tableau, SQL. Crypto + Churn dashboards live.", children: ["dl"] },
  { id: "dl", name: "Deep Learning", level: 4, unlocked: true, desc: "TensorFlow, neural networks. Healthcare ML models in production.", children: ["llm"] },
  { id: "llm", name: "LLMs & RAG", level: 5, unlocked: true, desc: "OpenAI GPT, LangChain, FAISS. DocuMind shipped — PDF Q&A at scale.", children: ["agents"] },
  { id: "agents", name: "Agentic AI", level: 6, unlocked: true, desc: "The current mission. Autonomous AI systems that plan, act, and learn. The frontier.", children: [] },
];

// ============================================================
// TIMELINE - XP Journey
// ============================================================
export type TimelineEvent = {
  year: string;
  title: string;
  desc: string;
  xp: string;
  color: "cyan" | "purple" | "orange" | "green" | "pink";
};

export const TIMELINE: TimelineEvent[] = [
  { year: "2022", title: "Started Coding", desc: "Wrote my first 'Hello World' in Python. Got hooked on the rush of seeing ideas become reality.", xp: "+500 XP", color: "green" },
  { year: "2023", title: "First Data Projects", desc: "Dove into Power BI, SQL, Excel. Built my first dashboards. Crypto Market Trends & Customer Churn analysis shipped.", xp: "+2,500 XP", color: "cyan" },
  { year: "2024", title: "Machine Learning", desc: "Discovered scikit-learn. Built Autism Prediction ML model. Started the Complete ML & Data Science Bootcamp. Python mastery climbing.", xp: "+5,000 XP", color: "purple" },
  { year: "2025", title: "AI / RAG / LLM Era", desc: "Shipped DocuMind (RAG), Mini-JARVIS (voice AI), AI Wealth Management. Pulled the Pull Shark achievement. 137 contributions in a year.", xp: "+7,000 XP", color: "orange" },
  { year: "2026", title: "Agentic AI // Looking for New Missions", desc: "Now exploring autonomous AI agents. Open to opportunities. Ready to level up with the right team. Hire the player.", xp: "?? XP", color: "pink" },
];

// ============================================================
// LEADERBOARD - Stats
// ============================================================
export type LeaderStat = {
  name: string;
  value: number;
  color: "cyan" | "purple" | "orange" | "green" | "pink";
  rank: number;
};

export const LEADERBOARD: LeaderStat[] = [
  { name: "Problem Solving", value: 90, color: "cyan", rank: 1 },
  { name: "Data Analytics", value: 85, color: "purple", rank: 2 },
  { name: "Python & Backend", value: 85, color: "orange", rank: 3 },
  { name: "AI/LLM Systems", value: 80, color: "pink", rank: 4 },
  { name: "Machine Learning", value: 80, color: "green", rank: 5 },
];

// ============================================================
// TERMINAL - Commands
// ============================================================
export type TerminalCommand = {
  cmd: string;
  desc: string;
};

export const TERMINAL_COMMANDS: TerminalCommand[] = [
  { cmd: "help", desc: "Show all available commands" },
  { cmd: "about", desc: "Who is Anmol Madhav?" },
  { cmd: "skills", desc: "List all unlocked skills" },
  { cmd: "projects", desc: "View completed missions" },
  { cmd: "certs", desc: "List certifications" },
  { cmd: "github", desc: "Open GitHub profile" },
  { cmd: "linkedin", desc: "Open LinkedIn profile" },
  { cmd: "instagram", desc: "Open Instagram profile" },
  { cmd: "contact", desc: "How to reach me" },
  { cmd: "resume", desc: "Download ATS-friendly resume" },
  { cmd: "clear", desc: "Clear the terminal" },
  { cmd: "sudo hire", desc: "??? — try it" },
];

// ============================================================
// MENU ITEMS
// ============================================================
export type MenuItem = {
  id: string;
  label: string;
  desc: string;
  icon: string;
  color: "cyan" | "purple" | "orange" | "green" | "pink";
};

export const MENU_ITEMS: MenuItem[] = [
  { id: "character", label: "Start Mission", desc: "Character profile & stats", icon: "▶", color: "cyan" },
  { id: "inventory", label: "Inventory", desc: "Skills & abilities", icon: "▣", color: "purple" },
  { id: "missions", label: "Missions", desc: "Projects as quests", icon: "◈", color: "orange" },
  { id: "achievements", label: "Achievements", desc: "Steam-style unlocks", icon: "🏆", color: "green" },
  { id: "techtree", label: "Tech Tree", desc: "RPG skill progression", icon: "⬡", color: "pink" },
  { id: "timeline", label: "XP Timeline", desc: "Career journey", icon: "⏱", color: "cyan" },
  { id: "terminal", label: "Terminal", desc: "Hacker command line", icon: ">_", color: "green" },
  { id: "leaderboard", label: "Leaderboard", desc: "Player rankings", icon: "📊", color: "purple" },
  { id: "boss", label: "Boss Fight", desc: "Defeated foes", icon: "☠", color: "orange" },
  { id: "contact", label: "Contact HQ", desc: "Send transmission", icon: "📡", color: "cyan" },
];
