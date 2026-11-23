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
  architecture: string;
  engineering: string[];
  quality: string;
  tradeoff: string;
  tags: string[];
  /** Real screenshot of the running app, served from public/projects. */
  image?: string;
  imageAlt?: string;
  live?: string;
  /** Shown instead of a live link when there is no hosted demo. */
  liveNote?: string;
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
    snippet: `const skillsUnlocked = true;\nconst wantsProjects = true;\n\nif (skillsUnlocked && ________) {\n  openRoute("/projects");\n}`,
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
    snippet: `const path = ["projects", "flagship"];\n\npath.at(-1) === "________";`,
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
    snippet: `if (formIsReady) {\n  navigate("/________");\n}`,
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
    name: "Ledgerly",
    category: "PERSONAL FINANCE",
    status: "Consumer v1 scope implemented",
    description: "A full-stack finance application for accounts, transactions, budgets, savings goals, analytics, imports/exports, and user-scoped data.",
    detail: "Ledgerly combines a React/TypeScript client with Flask, SQLAlchemy, PostgreSQL, pytest coverage, CSV workflows, responsive themes, and a finance-domain API.",
    reality: "Firebase Authentication owns credentials. The Flask API verifies Firebase ID tokens, maps Firebase UID to Ledgerly users, requires verified sessions for protected resources, and keeps PostgreSQL authoritative for finance data.",
    architecture: "The browser authenticates with Firebase and sends its ID token to a Flask API. Firebase Admin verifies identity server-side, the API maps that UID to Ledgerly's user model, and PostgreSQL remains authoritative for transactions, budgets, goals, and account data rather than putting financial records in the identity provider.",
    engineering: [
      "Enforces user ownership on protected finance resources after server-side Firebase ID-token verification rather than trusting client identity.",
      "Supports validated, atomic CSV imports of up to 1,000 transactions plus exports and destructive data-control workflows.",
      "Keeps signed transaction storage details behind explicit Income/Expense UI so normal users do not need to reason about negative-number conventions.",
      "Stores money as exact NUMERIC(12,2) decimals rounded half-up, with a startup migration that converts older float columns on PostgreSQL, so balances never drift by floating-point cents.",
      "Links a Firebase sign-in to an existing account by email only when the token's email is verified, closing an account-takeover path, and survives concurrent first sign-ins without duplicate users.",
    ],
    quality: "Pytest covers the Flask backend while frontend type/build checks, GitHub Actions, dependency auditing, responsive states, semantic labels, and explicit loading/empty/error/success handling protect finance workflows.",
    tradeoff: "Using managed Firebase identity avoids owning password storage and reset flows, while PostgreSQL keeps finance data in an application-controlled relational model. The tradeoff is additional deployment configuration and dependence on Firebase availability for authenticated entry.",
    tags: ["React", "TypeScript", "Python", "Flask", "PostgreSQL", "Firebase Auth", "Firebase Admin", "Pytest"],
    image: "/projects/ledgerly.jpg",
    imageAlt: "Ledgerly overview: tracked balance, monthly income and expenses, six-month cash-flow chart and insights (fictional data, local run)",
    live: "https://ledgerly-web-knmt.onrender.com",
    liveNote: "The live demo has no guest mode: sign-up with an email is required to explore it.",
    source: "https://github.com/MotherTheresa64/Ledgerly",
  },
  {
    name: "NestWise",
    category: "OFFLINE-FIRST CARE",
    status: "Development milestone · not deployed",
    description: "A shared family-care log for feeds, sleep, diapers and reminders that keeps working offline and syncs every caregiver in the household.",
    detail: "NestWise pairs an Expo / React Native app (web, Android and iOS targets) with a Fastify API on PostgreSQL. Caregivers log care events, manage children, recurring and snoozed reminders, reports with PDF export, and household invitations, with live updates over authorized WebSockets.",
    reality: "It runs locally against PostgreSQL and is not deployed; the README states it is not ready for production family health data. Email delivery is not configured, and accepting an invitation requires a verified email, so invitations need a mail provider before real use. Native device features still need on-device verification.",
    architecture: "The app writes changes to a local offline mutation queue and replays them to the API, which validates each mutation with shared zod schemas, applies it in a PostgreSQL transaction with version checks, and records it in a change feed. Clients catch up through incremental sync and receive realtime nudges over authenticated WebSockets.",
    engineering: [
      "Offline mutation log with versioned records: a stale edit comes back as a conflict instead of silently overwriting another caregiver's change.",
      "Invitation acceptance checks for a verified email inside the same transaction that adds the member, so a link cannot be redeemed by an unverified account.",
      "Reminder creation locks the household row (SELECT ... FOR UPDATE) so concurrent requests are serialized instead of interleaving.",
      "Shared zod schemas reject a sync mutation whose event id does not match its payload, so one record cannot overwrite another.",
    ],
    quality: "API integration tests run against a real PostgreSQL 17 service in GitHub Actions, alongside Playwright end-to-end specs for realtime updates, reports and privacy flows, plus a written production security review.",
    tradeoff: "Offline-first makes conflict handling, versioning and replay core logic rather than an add-on, which is more code than a plain request/response app. The payoff is that logging care with no signal still works and syncs later.",
    tags: ["Expo", "React Native", "TypeScript", "Fastify", "PostgreSQL", "WebSockets", "Offline sync", "zod", "Playwright"],
    image: "/projects/nestwise.jpg",
    imageAlt: "NestWise overview for a fictional household: per-child quick log buttons, reminders and shared rhythms (local run)",
    liveNote: "No hosted demo: runs locally with PostgreSQL (setup in the README).",
    source: "https://github.com/MotherTheresa64/NestWise",
  },
  {
    name: "Threadline",
    category: "TEAM KNOWLEDGE",
    status: "Deployed · local demo mode live",
    description: "A team workspace that connects discussions to decisions and durable, versioned knowledge instead of losing context in chat history.",
    detail: "Threadline includes isolated workspaces, roles, channels, searchable discussions, replies and reactions, resolutions, knowledge documents, version history, notifications, activity, board views, and deep links.",
    reality: "When Firebase is configured, authenticated members receive shared workspaces through Firestore onSnapshot subscriptions and security rules enforce membership and role boundaries. The public deployment has no Firebase project configured, so it runs the credential-free local demo and live Google sign-in is not verified there. A workspace is stored as one document, an intentional simplification whose limits are documented.",
    architecture: "A React 19/TypeScript client runs either a credential-free local demo or an authenticated Firebase mode. Firebase Authentication establishes identity, Firestore stores and streams shared workspace snapshots, security rules own the hosted authorization boundary, and Express 5 provides the production host and health surface.",
    engineering: [
      "Models the durable workflow Workspace → Channel → Discussion → Resolution → Knowledge so decisions remain connected to their source context.",
      "Uses Firestore onSnapshot subscriptions for signed-in shared workspaces while preserving a reliable local demo fallback for portfolio review.",
      "Enforces owner/admin/member/guest boundaries in Firestore rules: admins cannot take or remove the owner, guests are read-only, and content lists are type-checked and size-bounded. Nine emulator tests cover the rules.",
      "Saves through a Firestore transaction that re-reads the workspace and applies the change, so two members editing at once both keep their updates; an emulator test races two saves to prove it.",
      "Supports stable deep links, document version restoration, global search, inbox/activity state, mentions, and responsive detail/navigation overlays.",
    ],
    quality: "Strict TypeScript, pinned dependencies, GitHub Actions verification, production-server checks, keyboard shortcuts, visible focus treatment, and responsive overlays cover the recruiter-facing critical paths.",
    tradeoff: "Storing an entire workspace in one Firestore document keeps the realtime model understandable, but every save contends on that document (transactions retry rather than lose data) and rules cannot authorize individual records. The documented production evolution is subcollections with record-level authorization.",
    tags: ["React 19", "TypeScript", "Firestore", "Firebase Auth", "Realtime", "Security Rules", "Knowledge Base", "Express 5"],
    image: "/projects/threadline.jpg",
    imageAlt: "Threadline demo workspace: channels, members, recent discussions with resolved decisions",
    live: "https://threadline-ga8w.onrender.com",
    source: "https://github.com/MotherTheresa64/Threadline",
  },
  {
    name: "Planora",
    category: "STRUCTURED PLANNING",
    status: "Deployed · local-first workspace",
    description: "A planning workspace that turns goals into projects, task workflows, calendar work, roadmaps, analytics, and focused daily execution.",
    detail: "Planora models project progress from real task state, supports multi-project Kanban workflows, search, calendar and analytics views, persisted themes, destructive-action cleanup, and mobile-specific workflow layouts.",
    reality: "The workspace is a typed, versioned document saved in the browser, so the app is fully usable without credentials. When Firebase is configured, Google sign-in syncs that document to one per-user Firestore record, and cloud writes wait until the cloud copy has loaded so an empty local state cannot overwrite saved data. The public deployment has no Firebase project configured, so it runs local-only and live sign-in is not verified there.",
    architecture: "React 19 and TypeScript own the planning domain and derived UI state, with isolated storage/auth/theme modules on the client. An Express 5 production host serves the SPA plus health/config endpoints, while the persistence boundary is intentionally shaped so a hosted per-user store can replace browser storage without a UI rewrite.",
    engineering: [
      "Derives completion, workload, priority, and focus metrics from real task and project state instead of static dashboard numbers.",
      "Recovers gracefully from malformed or unavailable browser storage and provides an intentional sample-workspace reset path.",
      "Reformats Kanban and calendar interactions for narrow screens rather than shrinking desktop columns until they become unusable.",
      "Keeps global search, keyboard focus shortcuts, destructive cleanup, and project/task relationships inside a typed domain model.",
    ],
    quality: "Strict TypeScript, GitHub Actions, production artifact verification, reduced-motion/focus handling, and a compiled Express smoke test keep local, CI, and deployment checks aligned.",
    tradeoff: "Saving the whole workspace as one document keeps sync simple and the demo credential-free, but the last write wins between two devices editing at once, and the document will need splitting as plans grow. That limit is documented rather than hidden.",
    tags: ["React 19", "TypeScript", "Local-first state", "Optional Firestore sync", "Express 5", "Kanban", "Analytics", "CI"],
    image: "/projects/planora.jpg",
    imageAlt: "Planora dashboard: overall progress, due-today count, active plans with progress bars",
    live: "https://planora-zlxv.onrender.com",
    source: "https://github.com/MotherTheresa64/Planora",
  },
  {
    name: "Wanderline",
    category: "GROUP TRAVEL",
    status: "Deployed · local collaboration model",
    description: "A consumer travel workspace for itinerary planning, group ideas and voting, travelers, shared expenses, packing, bookings, places, weather, and maps.",
    detail: "Wanderline models owner/editor/viewer roles, itinerary and idea workflows, settlement calculations, custom expense splits, packing responsibility, saved places, reservations, Open-Meteo weather, and Google Maps handoff.",
    reality: "The live app is credential-free and stores trips in the browser. Optional Google sign-in exists in code but is not configured on the public deployment, and there is no shared database yet, so collaboration and roles are modelled locally rather than synchronized across devices. Sharing sends only a trip summary, never the stored trip data.",
    architecture: "React 19 and TypeScript own a typed, versioned collaborative trip workspace in the browser. An Express 5 production host exposes health/config endpoints, Open-Meteo provides keyless weather data, Google Maps universal links handle location actions without billing credentials, and Firebase/Firestore remain an explicit hosted-collaboration seam.",
    engineering: [
      "Models solo and group trips with owner/editor/viewer roles, invitation state, activity history, ideas, votes, and itinerary attendance (roles are enforced in the UI only until a shared backend exists).",
      "Calculates equal, personal, and custom expense shares with participant validation, per-traveler balances, and settlement suggestions.",
      "Integrates destination weather and Google Maps actions without requiring exposed provider secrets or a paid Maps API in the public demo.",
      "Reformats the itinerary, forms, navigation, and detail surfaces for phone portrait/landscape rather than relying on desktop-width scrolling.",
    ],
    quality: "Strict TypeScript, GitHub Actions, compiled-server smoke testing, defensive storage recovery, reduced-motion support, visible keyboard focus, and responsive acceptance checks protect the public demo experience.",
    tradeoff: "The credential-free local model keeps the product instantly reviewable and avoids fake collaboration, but pending invitations and role changes do not synchronize across devices until the planned authenticated Firestore boundary is connected.",
    tags: ["React 19", "TypeScript", "Travel UX", "Expense Splits", "Open-Meteo", "Google Maps", "Optional Firebase Auth", "Express 5"],
    image: "/projects/wanderline.jpg",
    imageAlt: "Wanderline trip overview: Barcelona sample trip with budget, packing, ideas and itinerary",
    live: "https://wanderline-s1yv.onrender.com",
    source: "https://github.com/MotherTheresa64/Wanderline",
  },
  {
    name: "RoleFinder",
    category: "JOB SEARCH TOOLING",
    status: "Deployed · refreshed daily",
    description: "A personal job-search tool that pulls real postings from public company job boards, ranks them against my stack, and tracks where I applied.",
    detail: "RoleFinder ingests Greenhouse, Lever and Ashby boards for a configured list of companies, stores them in SQLite, scores each role against a weighted skills profile, and hides anything already applied to. A scheduled GitHub Action rebuilds a static snapshot every day.",
    reality: "The deployed site is a static daily snapshot ranked for one person's profile, and it says so on first visit. Application status is saved in the visitor's browser only; the local Node server stores it in SQLite instead. It does not submit applications.",
    architecture: "Plain Node 24 ESM with zero runtime dependencies: built-in fetch for ingestion, node:sqlite for storage, node:http for the local JSON API, and a static build step that exports the ranked jobs for Vercel and Firebase Hosting.",
    engineering: [
      "Whole-word term matching with alphanumeric lookarounds, so \"git\" does not match \"Digital\" and terms like \"c++\" still work; title matches weigh double.",
      "Drops third-party job links that are not http(s) at ingest and again in the UI, so a hostile board entry cannot inject a javascript: link.",
      "Status updates require a JSON content type, so a cross-site form post cannot change data without a CORS preflight the server never grants.",
      "Static file serving resolves paths inside the public directory with a separator-aware guard to block path traversal.",
    ],
    quality: "Node's built-in test runner covers scoring and the SQLite layer in GitHub Actions; the HTTP server and board adapters are not yet under automated test, which the README states.",
    tradeoff: "A daily static snapshot is free to host and fast, but new postings appear only on the next run and status cannot sync across devices on the public site.",
    tags: ["Node.js 24", "node:sqlite", "Zero dependencies", "GitHub Actions", "Vercel", "Security"],
    image: "/projects/rolefinder.jpg",
    imageAlt: "RoleFinder: strong matches ranked from thousands of open roles with filters and application status",
    live: "https://rolefinder-xi.vercel.app",
    source: "https://github.com/MotherTheresa64/RoleFinder",
  },
];

const repoCatalog: Array<[string, string]> = [
  ["bottom-dollar", "Mobile life-sim money game"],
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
  architecture:
    "React and TypeScript provide the operator UI over a FastAPI API. PostgreSQL is authoritative domain storage; Redis is reserved for ephemeral state such as realtime tickets, rate limiting, and worker infrastructure; Celery runs asynchronous work such as webhook delivery. The system stays a modular monolith with an independently scalable worker instead of manufacturing microservices without a concrete need.",
  decisions: [
    "Tenant membership and RBAC are enforced on the server so changing a client-side organization identifier cannot grant access to another workspace.",
    "Authenticated WebSockets use short-lived, one-time Redis-backed tickets rather than putting a long-lived bearer token directly into the connection URL.",
    "PostgreSQL remains the source of truth while Redis handles responsibilities that are intentionally ephemeral and recoverable.",
    "API keys are hashed, outbound webhooks are signed, security-sensitive actions create audit events, and readiness checks distinguish process health from dependency readiness.",
  ],
  quality:
    "Alembic migrations, Docker Compose, GitHub Actions, API tests/linting, frontend typecheck/build, Prometheus request metrics, structured request logging, and PostgreSQL/Redis readiness checks make the operational story inspectable instead of hiding it behind UI polish.",
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
