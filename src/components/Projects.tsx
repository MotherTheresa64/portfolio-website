import { FaChartLine, FaDatabase, FaGithub, FaArrowUpRightFromSquare } from "react-icons/fa6";

const productProjects = [
  {
    name: "Ledgerly",
    category: "PERSONAL FINANCE / FULL-STACK PRODUCT",
    status: "LIVE",
    description: "A secure personal-finance application for understanding spending, managing transactions and budgets, tracking savings goals, and turning raw financial activity into useful cash-flow insight.",
    note: "The deployed product uses React/TypeScript, a Flask REST API, PostgreSQL, Firebase Authentication, user-scoped ownership checks, automated tests, CSV portability, CI/CD, and Render.",
    tags: ["React", "TypeScript", "Python", "Flask", "PostgreSQL", "Firebase Auth", "Pytest", "GitHub Actions", "Render"],
    live: "https://ledgerly-web-knmt.onrender.com",
    source: "https://github.com/MotherTheresa64/Ledgerly",
  },
  {
    name: "Planora",
    category: "INTELLIGENT PLANNING / PRODUCTIVITY",
    status: "ACTIVE DEVELOPMENT",
    description: "A planning and project-management product built around the goal → plan → milestones → tasks → schedule → progress lifecycle instead of stopping at a generic to-do list.",
    note: "The live demo already includes multi-project Kanban, task/project creation, calendar views, derived analytics, search, assignee workflows, responsive layouts, persistent themes, and isolated auth/persistence boundaries. The roadmap adds AI-assisted plan generation, milestones, and smart scheduling.",
    tags: ["React 19", "TypeScript", "Express 5", "Kanban", "Analytics", "Firebase-ready", "Responsive UI", "GitHub Actions", "Render"],
    live: "https://planora-zlxv.onrender.com",
    source: "https://github.com/MotherTheresa64/Planora",
  },
  {
    name: "Threadline",
    category: "TEAM KNOWLEDGE / COLLABORATION",
    status: "ACTIVE DEVELOPMENT",
    description: "A collaborative knowledge workspace designed to keep discussions connected to decisions and documentation so important context remains searchable instead of disappearing into a chat feed.",
    note: "The live demo includes channels, search, deep-linked threads, replies, reactions, bookmarks, resolution workflows, keyboard navigation, and durable browser persistence. The next phase moves those workflows into true account-backed shared workspaces with permissions and hosted data.",
    tags: ["React 19", "TypeScript", "Express 5", "Search", "Deep Links", "Accessibility", "Firebase-ready", "GitHub Actions", "Render"],
    live: "https://threadline-ga8w.onrender.com",
    source: "https://github.com/MotherTheresa64/Threadline",
  },
  {
    name: "Wanderline",
    category: "COLLABORATIVE TRAVEL PLANNING",
    status: "ACTIVE DEVELOPMENT",
    description: "A travel-planning application intended to become one shared source of truth for a trip: travelers, places, itinerary, lodging, transportation, reservations, budget, packing, notes, weather, and group decisions.",
    note: "The live demo currently includes editable itineraries, USD budget tracking, packing, saved places, live weather, sharing, search, themes, and mobile layouts. The active roadmap adds persistent shared trips, traveler roles/permissions, reservations, and Google Maps / Places integration as the primary mapping direction.",
    tags: ["React 19", "TypeScript", "Express 5", "Open-Meteo", "Google Maps roadmap", "Collaboration", "Firebase-ready", "GitHub Actions", "Render"],
    live: "https://wanderline-s1yv.onrender.com",
    source: "https://github.com/MotherTheresa64/Wanderline",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-24 px-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl mb-10">
          <span className="text-xs font-bold tracking-[0.2em] text-gray-500 dark:text-gray-400">SELECTED WORK</span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-3 mb-4 text-textMain dark:text-white">Products you can open, use, and inspect.</h2>
          <p className="text-textSubtle dark:text-gray-300 text-lg">These are active reference projects across different problem spaces. I’m keeping the flagship label open until a separate project earns that position instead of assigning it to the most mature app by default.</p>
        </div>

        <article className="rounded-3xl border border-dashed border-gray-300 dark:border-gray-600 bg-white/70 dark:bg-dark/70 p-7 sm:p-9 mb-8">
          <div className="grid md:grid-cols-[auto_1fr] gap-5 items-start">
            <div className="w-12 h-12 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-textMain dark:text-white">
              <FaChartLine />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="text-xs font-bold tracking-[0.16em] text-gray-500 dark:text-gray-400">FLAGSHIP PROJECT</span>
                <span className="text-[11px] font-bold tracking-[0.12em] px-2.5 py-1 rounded-full border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300">IN DEVELOPMENT</span>
              </div>
              <h3 className="text-3xl font-bold text-textMain dark:text-white mb-3">Reserved for what comes next.</h3>
              <p className="text-textSubtle dark:text-gray-300 leading-relaxed max-w-3xl">I’m deliberately leaving this slot open while I design the project that will represent my strongest end-to-end engineering work. Ledgerly, Planora, Threadline, and Wanderline stay visible below as substantial references without being forced into a hierarchy that no longer reflects how I want to present my portfolio.</p>
            </div>
          </div>
        </article>

        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] text-gray-500 dark:text-gray-400">CURRENT PRODUCT SUITE</span>
            <h3 className="text-2xl sm:text-3xl font-bold mt-2 text-textMain dark:text-white">Four products, four different problem spaces.</h3>
          </div>
          <span className="text-xs text-textSubtle dark:text-gray-400">Live references · ongoing development</span>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {productProjects.map((project) => (
            <article key={project.name} className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark p-7 flex flex-col">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-bold tracking-[0.14em] text-gray-500 dark:text-gray-400">{project.category}</span>
                <span className="text-[10px] font-bold tracking-[0.1em] px-2.5 py-1 rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300">{project.status}</span>
              </div>
              <h3 className="text-3xl font-bold mb-3 text-textMain dark:text-white">{project.name}</h3>
              <p className="text-sm leading-relaxed text-textSubtle dark:text-gray-300 mb-4">{project.description}</p>
              <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400 mb-5">{project.note}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => <span key={tag} className="px-2.5 py-1.5 rounded-lg text-xs border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300">{tag}</span>)}
              </div>
              <div className="flex flex-wrap gap-3 mt-auto">
                <a className="btn" href={project.live} target="_blank" rel="noopener noreferrer">Live demo <FaArrowUpRightFromSquare /></a>
                <a className="btn" href={project.source} target="_blank" rel="noopener noreferrer"><FaGithub /> Source</a>
              </div>
            </article>
          ))}
        </div>

        <div className="grid md:grid-cols-[1.35fr_.65fr] gap-6">
          <article className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark p-7">
            <div className="flex items-center gap-3 mb-4"><FaDatabase /><span className="text-xs font-bold tracking-[0.16em] text-gray-500 dark:text-gray-400">BACKEND DEPTH</span></div>
            <h3 className="text-2xl font-bold mb-3 text-textMain dark:text-white">Advanced Service API</h3>
            <p className="text-sm leading-relaxed text-textSubtle dark:text-gray-300 mb-5">A deployed Flask REST API for mechanics and service tickets with relational PostgreSQL models, SQLAlchemy, Marshmallow serialization, Swagger/OpenAPI documentation, pytest coverage, Gunicorn, and CI/CD.</p>
            <div className="flex flex-wrap gap-3"><a className="btn" href="https://advanced-api-final.onrender.com/apidocs/" target="_blank" rel="noopener noreferrer">Swagger docs <FaArrowUpRightFromSquare /></a><a className="btn" href="https://github.com/MotherTheresa64/Advanced-API-Final" target="_blank" rel="noopener noreferrer"><FaGithub /> Source</a></div>
          </article>

          <article className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark p-7">
            <div className="flex items-center gap-3 mb-4"><FaGithub /><span className="text-xs font-bold tracking-[0.16em] text-gray-500 dark:text-gray-400">MORE WORK</span></div>
            <h3 className="text-2xl font-bold mb-3 text-textMain dark:text-white">GitHub</h3>
            <p className="text-sm leading-relaxed text-textSubtle dark:text-gray-300 mb-5">More coursework, APIs, experiments, and mobile work are public, including Bottom Dollar, my React Native / Expo progression game.</p>
            <a className="btn" href="https://github.com/MotherTheresa64" target="_blank" rel="noopener noreferrer"><FaGithub /> View profile</a>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Projects;
