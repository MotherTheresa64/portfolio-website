import { FaDatabase, FaGithub, FaArrowUpRightFromSquare } from "react-icons/fa6";

const productProjects = [
  {
    name: "Planora",
    category: "INTELLIGENT PLANNING / PRODUCTIVITY",
    status: "PRODUCT COMPLETE",
    description: "A planning and execution product built around the goal → plan → milestones → tasks → schedule → progress lifecycle, turning broad goals into structured work instead of stopping at a generic to-do list.",
    note: "Includes structured plans, milestones, task management, Kanban workflows, scheduling and calendar views, Today-focused execution, search, progress analytics, resources, responsive layouts, persistent local data, and Firebase-ready per-user synchronization boundaries.",
    tags: ["React 19", "TypeScript", "Express 5", "Kanban", "Calendar", "Analytics", "Firebase-ready", "Responsive UI", "GitHub Actions", "Render"],
    live: "https://planora-zlxv.onrender.com",
    source: "https://github.com/MotherTheresa64/Planora",
  },
  {
    name: "Threadline",
    category: "TEAM KNOWLEDGE / COLLABORATION",
    status: "PRODUCT COMPLETE",
    description: "A collaborative knowledge workspace that keeps conversations connected to decisions and durable documentation so important context stays searchable instead of disappearing into a chat feed.",
    note: "Includes multi-workspace flows, channels, structured discussions, deep-linked threads, replies and reactions, bookmarks, resolutions, searchable knowledge documents, version history, board/timeline views, inbox/activity workflows, responsive navigation, and optional Firestore-backed shared workspaces with role-aware security rules.",
    tags: ["React 19", "TypeScript", "Express 5", "Search", "Knowledge Base", "Version History", "Firestore-ready", "Accessibility", "GitHub Actions", "Render"],
    live: "https://threadline-ga8w.onrender.com",
    source: "https://github.com/MotherTheresa64/Threadline",
  },
  {
    name: "Wanderline",
    category: "COLLABORATIVE TRAVEL PLANNING",
    status: "PRODUCT COMPLETE",
    description: "A collaborative travel-planning application built as one shared source of truth for a trip: travelers, places, itinerary, logistics, budget, packing, notes, weather, and group decisions.",
    note: "Includes trip creation and editing, collaborative traveler data, itinerary workflows, lodging and reservation details, budgets and expenses, packing, saved places, live weather, sharing, privacy-safe demo content, mobile-first navigation, and Google Maps integration through universal links and service configuration.",
    tags: ["React 19", "TypeScript", "Express 5", "Open-Meteo", "Google Maps", "Collaboration", "Responsive PWA", "Firebase-ready", "GitHub Actions", "Render"],
    live: "https://wanderline-s1yv.onrender.com",
    source: "https://github.com/MotherTheresa64/Wanderline",
  },
  {
    name: "Ledgerly",
    category: "PERSONAL FINANCE / FULL-STACK PRODUCT",
    status: "PRODUCT COMPLETE",
    description: "A personal-finance application for understanding spending, managing financial accounts and transactions, building budgets, tracking savings goals, and turning raw activity into useful cash-flow insight.",
    note: "Includes financial accounts, transfers, richer transaction models, budgets and goals, reports, CSV import/export with safer partial imports, responsive dark themes, mobile navigation, a Flask REST API, PostgreSQL models, automated tests, and user-scoped architecture prepared for finalized Firebase identity configuration.",
    tags: ["React", "TypeScript", "Python", "Flask", "PostgreSQL", "Firebase-ready", "Pytest", "GitHub Actions", "Render"],
    live: "https://ledgerly-web-knmt.onrender.com",
    source: "https://github.com/MotherTheresa64/Ledgerly",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-24 px-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl mb-10">
          <span className="text-xs font-bold tracking-[0.2em] text-gray-500 dark:text-gray-400">SELECTED PRODUCT WORK</span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-3 mb-4 text-textMain dark:text-white">Breadth behind the capstone.</h2>
          <p className="text-textSubtle dark:text-gray-300 text-lg">Aegis is the systems-focused capstone. These four product-complete applications show that the same engineering work translates across very different user problems: planning, collaboration, travel, and personal finance.</p>
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
            <div className="flex items-center gap-3 mb-4"><FaDatabase /><span className="text-xs font-bold tracking-[0.16em] text-gray-500 dark:text-gray-400">ADDITIONAL BACKEND WORK</span></div>
            <h3 className="text-2xl font-bold mb-3 text-textMain dark:text-white">Advanced Service API</h3>
            <p className="text-sm leading-relaxed text-textSubtle dark:text-gray-300 mb-5">A deployed Flask REST API for mechanics and service tickets with relational PostgreSQL models, SQLAlchemy, Marshmallow serialization, Swagger/OpenAPI documentation, pytest coverage, Gunicorn, and CI/CD.</p>
            <div className="flex flex-wrap gap-3"><a className="btn" href="https://advanced-api-final.onrender.com/apidocs/" target="_blank" rel="noopener noreferrer">Swagger docs <FaArrowUpRightFromSquare /></a><a className="btn" href="https://github.com/MotherTheresa64/Advanced-API-Final" target="_blank" rel="noopener noreferrer"><FaGithub /> Source</a></div>
          </article>

          <article className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark p-7">
            <div className="flex items-center gap-3 mb-4"><FaGithub /><span className="text-xs font-bold tracking-[0.16em] text-gray-500 dark:text-gray-400">MORE ENGINEERING</span></div>
            <h3 className="text-2xl font-bold mb-3 text-textMain dark:text-white">GitHub</h3>
            <p className="text-sm leading-relaxed text-textSubtle dark:text-gray-300 mb-5">Coursework, APIs, experiments, mobile work, and repository history provide additional examples of how I build, iterate, document, and ship software.</p>
            <a className="btn" href="https://github.com/MotherTheresa64" target="_blank" rel="noopener noreferrer"><FaGithub /> View profile</a>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Projects;
