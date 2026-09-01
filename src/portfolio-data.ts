export type GateId = "skills" | "projects" | "list" | "highlights" | "aegis" | "contact";
export type ViewId = "skills" | "project-list" | "projects-root" | "top-projects" | "aegis" | "contact";
export type PortfolioMode = "intro" | "challenge" | "revealed";

export type ChallengeChoice = {
  label: string;
  value: string;
};

export type ChallengeDefinition = {
  id: GateId;
  label: string;
  file: string;
  language: string;
  prompt: string;
  snippet: string;
  hint: string;
  answer: string;
  explanation: string;
  targetId: string;
  choices: ChallengeChoice[];
};

export type Product = {
  name: string;
  category: string;
  status: string;
  description: string;
  detail: string;
  reality: string;
  tags: string[];
  live: string;
  source: string;
};

export type Repo = {
  name: string;
  kind: string;
  url: string;
};

export const RESUME_URL = "/Noah_Ragan_Software_Engineer_Resume.pdf";
export const GITHUB_URL = "https://github.com/MotherTheresa64";
export const LINKEDIN_URL = "https://www.linkedin.com/in/njragandev/";
export const EMAIL = "noah.j.ragan@gmail.com";
export const PORTFOLIO_URL = "https://noahragan-portfolio.vercel.app/";

export const challenges: ChallengeDefinition[] = [
  {
    id: "skills",
    label: "CSS reveal",
    file: "skills.css",
    language: "CSS",
    prompt: "Choose the missing value that makes the skills panel fully visible.",
    snippet: `.skills-list {\n  opacity: 0;\n  visibility: hidden;\n}\n\n.skills-list.is-revealed {\n  opacity: ___;\n  visibility: visible;\n}`,
    hint: "Opacity runs from fully transparent to fully opaque. Choose the value at the visible end of that range.",
    answer: "1",
    explanation: "CSS opacity uses 0 for fully transparent and 1 for fully opaque, so opacity: 1 reveals the panel.",
    targetId: "projects-gate",
    choices: [
      { label: "0", value: "0" },
      { label: "1", value: "1" },
      { label: "auto", value: "auto" },
      { label: "inherit", value: "inherit" },
    ],
  },
  {
    id: "projects",
    label: "Root condition",
    file: "root.ts",
    language: "TypeScript",
    prompt: "Choose the identifier that completes the condition for opening the projects route.",
    snippet: `const skillsUnlocked = true;\nconst wantsProjects = true;\n\nif (skillsUnlocked && ________) {\n  openRoute(\"/projects\");\n}`,
    hint: "The missing condition represents the visitor choosing to continue, not the boolean that records prior progress.",
    answer: "wantsProjects",
    explanation: "skillsUnlocked is already checked. The second condition must be wantsProjects, the declared boolean representing the visitor's choice.",
    targetId: "projects-root",
    choices: [
      { label: "skillsUnlocked", value: "skillsUnlocked" },
      { label: "wantsProjects", value: "wantsProjects" },
      { label: "openRoute", value: "openRoute" },
      { label: "true", value: "true" },
    ],
  },
  {
    id: "list",
    label: "Repository branch",
    file: "repos.sh",
    language: "Shell",
    prompt: "Choose the flag that lists both local and remote Git branches.",
    snippet: `# show every branch\ngit branch ____`,
    hint: "Use the short option whose meaning is to include every branch scope, including remotes.",
    answer: "-a",
    explanation: "git branch -a is shorthand for --all, so Git lists both local branches and remote-tracking branches.",
    targetId: "project-list-node",
    choices: [
      { label: "-r", value: "-r" },
      { label: "-a", value: "-a" },
      { label: "-v", value: "-v" },
      { label: "--merged", value: "--merged" },
    ],
  },
  {
    id: "highlights",
    label: "Featured filter",
    file: "featured.ts",
    language: "TypeScript",
    prompt: "Choose the boolean that keeps only featured projects.",
    snippet: `const selected = projects.filter((project) => {\n  return project.featured === ____;\n});`,
    hint: "The filter should keep projects whose featured switch is enabled.",
    answer: "true",
    explanation: "A featured project has project.featured set to true, so strict equality should compare against true.",
    targetId: "top-projects-node",
    choices: [
      { label: "false", value: "false" },
      { label: "true", value: "true" },
      { label: "null", value: "null" },
      { label: "undefined", value: "undefined" },
    ],
  },
  {
    id: "aegis",
    label: "Flagship route",
    file: "route.ts",
    language: "TypeScript",
    prompt: "Choose the string that matches the final route segment.",
    snippet: `const path = [\"projects\", \"flagship\"];\n\npath.at(-1) === \"________\";`,
    hint: "path.at(-1) reads the final member of the array. Match the assertion to that value.",
    answer: "flagship",
    explanation: "The last array item is flagship, so path.at(-1) evaluates to that string.",
    targetId: "aegis-node",
    choices: [
      { label: "projects", value: "projects" },
      { label: "contact", value: "contact" },
      { label: "flagship", value: "flagship" },
      { label: "south", value: "south" },
    ],
  },
  {
    id: "contact",
    label: "Contact route",
    file: "contact.tsx",
    language: "TSX",
    prompt: "Choose the final destination that opens contact details.",
    snippet: `if (formIsReady) {\n  navigate(\"/________\");\n}`,
    hint: "Choose the route for the section that gathers the ways a visitor can reach me.",
    answer: "contact",
    explanation: "The final section is the contact destination, so navigate(\"/contact\") is the intended route.",
    targetId: "contact-node",
    choices: [
      { label: "profile", value: "profile" },
      { label: "resume", value: "resume" },
      { label: "projects", value: "projects" },
      { label: "contact", value: "contact" },
    ],
  },
];

export const skillGroups = [
  { title: "Frontend", items: ["React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Vite", "Responsive UI"] },
  { title: "Backend & APIs", items: ["Python", "FastAPI", "Flask", "Node.js", "Express", "REST APIs", "WebSockets", "Celery", "SQLAlchemy"] },
  { title: "Data & realtime", items: ["PostgreSQL", "SQL", "Redis", "Firestore", "SQLite", "Relational Modeling", "Realtime Subscriptions"] },
  { title: "Security & quality", items: ["RBAC", "Tenant Isolation", "Firebase Authentication", "Validation", "Pytest", "Audit Trails", "CI Quality Gates"] },
  { title: "Delivery", items: ["Git", "GitHub", "Docker", "Docker Compose", "GitHub Actions", "CI/CD", "Render", "Vercel", "OpenAPI", "Postman"] },
] as const;

export const products: Product[] = [
  {
    name: "Planora",
    category: "STRUCTURED PLANNING",
    status: "Deployed · cloud sync implemented",
    description: "A planning workspace that turns goals into plans, milestones, tasks, roadmaps, calendar work, resources, and measurable progress.",
    detail: "Planora models plan health, milestone dependencies, task workflow, Today-focused execution, roadmap/calendar views, analytics, search, export/reset flows, and responsive themes.",
    reality: "The client now implements optional Google authentication plus per-user Firestore load/save when Firebase is configured, while preserving a local workspace fallback. The repository README still describes an older local-first boundary, so the portfolio reflects the current source implementation rather than that stale wording.",
    tags: ["React 19", "TypeScript", "Firestore", "Firebase Auth", "Express 5", "Kanban", "Roadmap", "Analytics"],
    live: "https://planora-zlxv.onrender.com",
    source: "https://github.com/MotherTheresa64/Planora",
  },
  {
    name: "Threadline",
    category: "COLLABORATION + KNOWLEDGE",
    status: "Deployed · realtime Firestore mode",
    description: "A team workspace that connects discussions to decisions and durable, versioned knowledge instead of losing context in chat history.",
    detail: "Threadline includes isolated workspaces, roles, channels, searchable discussions, replies/reactions, resolutions, knowledge documents, version history, notifications, activity, board views, and deep links.",
    reality: "When Firebase is configured, authenticated members receive shared workspaces through Firestore onSnapshot subscriptions and server-side rules enforce workspace membership/role boundaries. The current portfolio-scale model stores a workspace as one snapshot document, which limits per-record authorization granularity and is documented as an intentional scaling tradeoff.",
    tags: ["React 19", "TypeScript", "Firestore", "Firebase Auth", "Realtime", "Security Rules", "Knowledge Base", "Express 5"],
    live: "https://threadline-ga8w.onrender.com",
    source: "https://github.com/MotherTheresa64/Threadline",
  },
  {
    name: "Wanderline",
    category: "GROUP TRAVEL",
    status: "Deployed · local collaboration model",
    description: "A consumer travel workspace for itinerary planning, ideas and voting, travelers, shared expenses, packing, bookings, places, weather, and maps.",
    detail: "Wanderline models owner/editor/viewer roles, shared activity history, itinerary workflows, settlement calculations, custom expense splits, packing responsibility, saved places, Open-Meteo weather, and Google Maps handoff.",
    reality: "The live app is intentionally credential-free and local-first today. Google/Firebase authentication is scaffolded, but shared Firestore persistence and real cross-device collaboration remain a final integration step and are not presented as complete.",
    tags: ["React 19", "TypeScript", "Travel UX", "Expense Splits", "Open-Meteo", "Google Maps", "Firebase Scaffold", "Express 5"],
    live: "https://wanderline-s1yv.onrender.com",
    source: "https://github.com/MotherTheresa64/Wanderline",
  },
  {
    name: "Ledgerly",
    category: "FULL-STACK PERSONAL FINANCE",
    status: "Consumer v1 scope implemented",
    description: "A full-stack finance application for accounts, transactions, budgets, savings goals, analytics, imports/exports, and user-scoped data.",
    detail: "Ledgerly combines a React/TypeScript client with Flask, SQLAlchemy, PostgreSQL, pytest coverage, data controls, CSV workflows, responsive themes, and a finance-domain API.",
    reality: "Firebase Authentication owns credentials. The Flask API verifies Firebase ID tokens, maps Firebase UID to Ledgerly users, requires verified sessions for protected resources, and keeps PostgreSQL authoritative for finance data.",
    tags: ["React", "TypeScript", "Python", "Flask", "PostgreSQL", "Firebase Auth", "Firebase Admin", "Pytest"],
    live: "https://ledgerly-web-knmt.onrender.com",
    source: "https://github.com/MotherTheresa64/Ledgerly",
  },
];

const repoCatalog: Array<[string, string]> = [
  ["bottom-dollar", "Mobile savings app"],
  ["Advanced-API-Final", "Flask API project"],
  ["Achievements", "GitHub achievement lab"],
  ["Advanced-Ecommerce-App-Firebase", "Firebase ecommerce"],
  ["Advanced-Ecommerce-App", "Advanced ecommerce"],
  ["Pipeline-Ecommerce", "CI/CD ecommerce"],
  ["Ecommerce-API", "Backend API"],
  ["Advanced-Api-Project", "API project"],
  ["RateLimiting_Caching_API", "API infrastructure"],
  ["Service-Center-CI-CD", "CI/CD exercise"],
  ["Service-Center-Lesson-5", "Service center API"],
  ["Documentation-Testing", "Testing + documentation"],
  ["Task-Manager-Typescript", "TypeScript app"],
  ["Marvel-Character-Fullstack-App", "Full-stack app"],
  ["Pokeapi-Integration-App", "API integration"],
  ["Spotify-Recreate", "Frontend recreation"],
  ["Trivia-Quiz-App", "Interactive quiz"],
  ["Ecom-Product-App", "Product UI"],
  ["Frontend-Specialization-Modules", "Frontend coursework"],
  ["Core-Modules", "Core coursework"],
  ["Defeat-The-Evil-Wizard", "Python exercise"],
  ["Module4-Html-Knowledge-Check", "HTML coursework"],
  ["To-Do-Application", "Frontend exercise"],
  ["Bootstrap-Forms-Utilities", "Bootstrap coursework"],
  ["Event-Center-Website", "Frontend website"],
  ["vercel-deployment-project", "Deployment exercise"],
  ["portfolio-website", "This interactive portfolio"],
];

export const otherRepos: Repo[] = repoCatalog.map(([name, kind]) => ({
  name,
  kind,
  url: `https://github.com/MotherTheresa64/${name}`,
}));

export const aegis = {
  status: "Active · deployed",
  live: "https://aegis-web-jvlk.onrender.com",
  api: "https://aegis-api-l8f8.onrender.com",
  docs: "https://aegis-api-l8f8.onrender.com/docs",
  source: "https://github.com/MotherTheresa64/Aegis",
  summary:
    "A production-oriented, multi-tenant incident operations platform for service health, alert ingestion, incident coordination, realtime updates, dependencies, public status communication, audit history, webhooks, analytics, and postmortems.",
  pillars: [
    {
      title: "Incident domain",
      text: "Service catalogs and dependencies, alert fingerprinting/deduplication, automatic incident creation, lifecycle state, response tasks, timelines, status pages, and postmortems.",
    },
    {
      title: "Tenant + security model",
      text: "Server-enforced organization membership/RBAC, JWT sessions, hashed API keys, signed webhooks, audit events, rate limiting, security headers, and organization-scoped authorization.",
    },
    {
      title: "Realtime + async",
      text: "Authenticated WebSockets use short-lived one-time Redis tickets. Celery handles asynchronous work such as webhook delivery, with PostgreSQL remaining authoritative domain storage.",
    },
    {
      title: "Operations",
      text: "Alembic migrations, Docker Compose, GitHub Actions, Render deployment, Prometheus request metrics, structured request logging, and PostgreSQL/Redis readiness checks.",
    },
  ],
  tags: ["React", "TypeScript", "FastAPI", "Python", "PostgreSQL", "SQLAlchemy", "Redis", "WebSockets", "Celery", "Alembic", "Docker", "GitHub Actions", "Prometheus"],
} as const;
