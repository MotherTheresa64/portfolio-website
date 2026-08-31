import { FaArrowUpRightFromSquare, FaBolt, FaCodeBranch, FaDatabase, FaGithub, FaShieldHalved } from "react-icons/fa6";
import { motion } from "framer-motion";

const pillars = [
  {
    icon: <FaBolt />,
    title: "Realtime + asynchronous systems",
    desc: "WebSocket incident updates, Redis-backed event fanout, and Celery workers create meaningful concurrency, retry, and failure-handling problems beyond ordinary request/response CRUD.",
  },
  {
    icon: <FaShieldHalved />,
    title: "Multi-tenant security",
    desc: "Organizations, memberships, RBAC, audit history, API keys, and organization-scoped authorization make security boundaries part of the architecture instead of a UI afterthought.",
  },
  {
    icon: <FaDatabase />,
    title: "Production data design",
    desc: "PostgreSQL remains authoritative while Redis is deliberately limited to ephemeral cache, queue, rate-limit, and fanout state, preserving durable business records through infrastructure failures.",
  },
  {
    icon: <FaCodeBranch />,
    title: "Production engineering",
    desc: "Dockerized local infrastructure, CI/CD, documented architectural decisions, observability-ready instrumentation, background workers, and a Terraform deployment path make the repository reviewable as a real system.",
  },
];

const Flagship = () => (
  <section id="capstone" className="px-6 py-24 bg-section dark:bg-dark">
    <div className="max-w-6xl mx-auto">
      <div className="max-w-3xl mb-10">
        <span className="text-xs font-bold tracking-[0.2em] text-gray-500 dark:text-gray-400">FLAGSHIP / CAPSTONE</span>
        <h2 className="text-4xl sm:text-5xl font-bold mt-3 mb-4 text-textMain dark:text-white">Aegis raises the engineering ceiling.</h2>
        <p className="text-lg leading-relaxed text-textSubtle dark:text-gray-300">
          Aegis is a production-oriented real-time incident operations platform for engineering teams. It combines service health, alert ingestion, incident coordination, realtime collaboration, public status communication, audit history, and postmortem workflows in one multi-tenant system.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1.05fr_.95fr] gap-10 items-stretch">
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-7 sm:p-9 flex flex-col"
        >
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="inline-flex items-center rounded-full border border-gray-200 dark:border-gray-700 px-3 py-1 text-xs font-semibold tracking-wide text-textSubtle dark:text-gray-300">AEGIS</span>
            <span className="text-[11px] font-bold tracking-[0.12em] px-2.5 py-1 rounded-full border border-amber-300/60 dark:border-amber-700 text-amber-700 dark:text-amber-300">ACTIVE DEVELOPMENT</span>
          </div>

          <h3 className="text-3xl sm:text-4xl font-bold text-textMain dark:text-white mb-4">Real-Time Incident Operations Platform</h3>
          <p className="text-base leading-relaxed text-textSubtle dark:text-gray-300 mb-5">
            The architecture starts as a modular FastAPI monolith with an independently scalable Celery worker: explicit service boundaries without premature microservice overhead. PostgreSQL is the source of truth; Redis handles queues, cache, rate limits, and realtime fanout; WebSocket clients subscribe to organization-scoped channels.
          </p>
          <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400 mb-6">
            This is the capstone because it forces deeper engineering decisions across tenancy, RBAC, alert normalization and deduplication, realtime state, asynchronous delivery, dependency-aware service health, public status pages, auditability, postmortems, observability, containerization, CI/CD, and infrastructure design. It is designed to be discussable as a system, not just demoed as a UI.
          </p>

          <div className="flex flex-wrap gap-2 mb-7">
            {["React", "TypeScript", "FastAPI", "Python", "PostgreSQL", "SQLAlchemy", "Redis", "WebSockets", "Celery", "Docker", "GitHub Actions"].map((tag) => (
              <span key={tag} className="px-2.5 py-1.5 rounded-lg text-xs border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300">{tag}</span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mt-auto">
            <a className="btn" href="https://github.com/MotherTheresa64/Aegis" target="_blank" rel="noopener noreferrer"><FaGithub /> Source code</a>
            <a className="btn" href="https://github.com/MotherTheresa64/Aegis/tree/build/foundation" target="_blank" rel="noopener noreferrer">Foundation branch <FaArrowUpRightFromSquare /></a>
          </div>
        </motion.article>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="grid sm:grid-cols-2 gap-4"
        >
          {pillars.map((item) => (
            <article key={item.title} className="rounded-2xl border border-borderLight dark:border-gray-700 bg-white dark:bg-gray-900 p-6">
              <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4 text-textMain dark:text-white">{item.icon}</div>
              <h3 className="font-semibold text-textMain dark:text-white mb-2">{item.title}</h3>
              <p className="text-sm leading-relaxed text-textSubtle dark:text-gray-300">{item.desc}</p>
            </article>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

export default Flagship;
