import { FaChartLine, FaDatabase, FaGithub, FaArrowUpRightFromSquare } from "react-icons/fa6";

const productProjects = [
  {
    name: "Planora",
    category: "PROJECT PLANNING / SAAS-STYLE PRODUCT",
    description: "A project-planning workspace with multi-project Kanban boards, task and project creation, a rolling calendar, derived analytics, global search, assignee views, responsive mobile workflows, and four persistent themes.",
    note: "The live demo is intentionally local-first today, with Firebase Authentication already isolated for the final per-user hosted-data integration.",
    tags: ["React 19", "TypeScript", "Express 5", "Kanban", "Analytics", "Firebase-ready", "Responsive UI", "GitHub Actions", "Render"],
    live: "https://planora-zlxv.onrender.com",
    source: "https://github.com/MotherTheresa64/Planora",
  },
  {
    name: "Threadline",
    category: "COLLABORATION / KNOWLEDGE WORKSPACE",
    description: "A discussion workspace designed to turn team questions and decisions into searchable knowledge through channels, filters, deep-linked threads, replies, reactions, bookmarks, resolution workflows, and keyboard-driven navigation.",
    note: "Thread data currently persists per browser so the complete product can be reviewed without credentials; the auth and hosted-persistence boundaries are already separated for the next phase.",
    tags: ["React 19", "TypeScript", "Express 5", "Search", "Deep Links", "Accessibility", "Firebase-ready", "GitHub Actions", "Render"],
    live: "https://threadline-ga8w.onrender.com",
    source: "https://github.com/MotherTheresa64/Threadline",
  },
  {
    name: "Wanderline",
    category: "CONSUMER TRAVEL PRODUCT",
    description: "A travel planner for day-by-day itineraries, budget tracking, packing, saved places, trip progress, live weather, map handoff, sharing, search, and editable trip details in a fully responsive travel-focused interface.",
    note: "Open-Meteo and OpenStreetMap provide useful live integrations without exposed secrets, while itinerary and budget changes remain local-first until account-level storage is wired in.",
    tags: ["React 19", "TypeScript", "Express 5", "Open-Meteo", "OpenStreetMap", "Web Share", "Firebase-ready", "GitHub Actions", "Render"],
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
          <p className="text-textSubtle dark:text-gray-300 text-lg">I’m building beyond isolated exercises: live interfaces, real workflows, persistence boundaries, authentication hooks, responsive states, deployment checks, and source code that shows how each product is structured.</p>
        </div>

        <article className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark p-7 sm:p-9 mb-8 shadow-sm">
          <div className="grid lg:grid-cols-[1fr_.9fr] gap-10">
            <div>
              <div className="flex items-center gap-3 mb-4"><FaChartLine /><span className="text-xs font-bold tracking-[0.16em] text-gray-500 dark:text-gray-400">FLAGSHIP FULL-STACK PROJECT</span></div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <h3 className="text-4xl font-bold text-textMain dark:text-white">Ledgerly</h3>
                <span className="text-[11px] font-bold tracking-[0.12em] px-2.5 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">LIVE</span>
              </div>
              <p className="text-textSubtle dark:text-gray-300 leading-relaxed mb-6">A deployed multi-user personal-finance application for transactions, monthly budgets, savings goals, cash-flow analytics, and data portability. Firebase handles identity while the Flask API verifies tokens and PostgreSQL stores each user’s financial records behind strict ownership checks.</p>
              <div className="flex flex-wrap gap-2 mb-7">{["React", "TypeScript", "Python", "Flask", "PostgreSQL", "Firebase Auth", "Pytest", "GitHub Actions", "Render"].map(tag => <span key={tag} className="px-2.5 py-1.5 rounded-lg text-xs border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300">{tag}</span>)}</div>
              <div className="flex flex-wrap gap-3">
                <a className="btn" href="https://ledgerly-web-knmt.onrender.com" target="_blank" rel="noopener noreferrer">Launch app <FaArrowUpRightFromSquare /></a>
                <a className="btn" href="https://github.com/MotherTheresa64/Ledgerly" target="_blank" rel="noopener noreferrer"><FaGithub /> Source code</a>
              </div>
            </div>
            <div className="grid gap-3">
              {[['Identity','Firebase registration, email verification, password recovery, protected API access.'],['Isolation','Transactions, budgets, and goals are scoped to the authenticated user throughout the API.'],['Product features','Search/filtering, CSV import/export, budgeting, savings goals, analytics, themes, and mobile UX.'],['Delivery','Automated backend tests, GitHub Actions CI, PostgreSQL production data, and Render deployment.']].map(([title, text]) => <div key={title} className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-5"><strong className="block mb-1 text-textMain dark:text-white">{title}</strong><p className="text-sm text-textSubtle dark:text-gray-300 leading-relaxed">{text}</p></div>)}
            </div>
          </div>
        </article>

        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] text-gray-500 dark:text-gray-400">CURRENT PRODUCT SUITE</span>
            <h3 className="text-2xl sm:text-3xl font-bold mt-2 text-textMain dark:text-white">Three distinct products, three different problem spaces.</h3>
          </div>
          <span className="text-xs text-textSubtle dark:text-gray-400">Live demos · active development</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {productProjects.map((project) => (
            <article key={project.name} className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark p-7 flex flex-col">
              <span className="text-[11px] font-bold tracking-[0.14em] text-gray-500 dark:text-gray-400">{project.category}</span>
              <h3 className="text-3xl font-bold mt-3 mb-3 text-textMain dark:text-white">{project.name}</h3>
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
