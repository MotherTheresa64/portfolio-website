import { FaCode, FaServer, FaDatabase, FaLock, FaTools } from "react-icons/fa";

const skillGroups = [
  { title: "Frontend", icon: <FaCode />, tags: ["React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Vite", "Responsive Design"] },
  { title: "Backend & Realtime", icon: <FaServer />, tags: ["Python", "FastAPI", "Flask", "Node.js", "Express", "REST APIs", "WebSockets", "Celery", "SQLAlchemy"] },
  { title: "Data & Messaging", icon: <FaDatabase />, tags: ["PostgreSQL", "SQL", "Redis", "SQLite", "Relational Modeling", "Event Fanout", "Caching"] },
  { title: "Security & Quality", icon: <FaLock />, tags: ["RBAC", "Multi-tenant Authorization", "Firebase Authentication", "Validation", "Pytest", "Audit Trails", "User-scoped Data"] },
  { title: "Delivery & Operations", icon: <FaTools />, tags: ["Git", "GitHub", "Docker", "Docker Compose", "GitHub Actions", "CI/CD", "Render", "Vercel", "Swagger / OpenAPI", "Postman"] },
];

const Skills = () => (
  <section id="skills" className="py-24 px-6 bg-gray-50 dark:bg-gray-900">
    <div className="max-w-6xl mx-auto">
      <div className="max-w-2xl mb-10">
        <span className="text-xs font-bold tracking-[0.2em] text-gray-500 dark:text-gray-400">CAPABILITIES</span>
        <h2 className="text-4xl font-bold mt-3 mb-3 text-textMain dark:text-white">Tools I use to build, ship, and operate software.</h2>
        <p className="text-textSubtle dark:text-gray-300">A mix of product engineering and systems work: interfaces, APIs, realtime communication, relational data, authorization, asynchronous processing, testing, containers, and delivery.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {skillGroups.map((group) => (
          <article key={group.title} className="rounded-2xl bg-white dark:bg-dark border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center gap-3 font-semibold text-lg mb-4 text-textMain dark:text-white">{group.icon}<h3>{group.title}</h3></div>
            <div className="flex flex-wrap gap-2">
              {group.tags.map((tag) => <span key={tag} className="px-2.5 py-1.5 rounded-lg text-xs border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300">{tag}</span>)}
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Skills;
