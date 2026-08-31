import { FaArrowDown, FaFilePdf, FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center bg-white dark:bg-dark transition-colors pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-[1.05fr_.95fr] gap-12 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-gray-700 px-3 py-1.5 text-xs font-semibold text-textSubtle dark:text-gray-300 mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              OPEN TO REMOTE SOFTWARE ENGINEERING ROLES
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.55 }} className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-textMain dark:text-white leading-[1.02] mb-5">
              I build full-stack products and the systems behind them.
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16, duration: 0.5 }} className="text-lg sm:text-xl text-textSubtle dark:text-gray-300 leading-relaxed max-w-2xl mb-7">
              I’m Noah Ragan, a Full Stack Software Engineer working across React, TypeScript, Python, FastAPI/Flask, PostgreSQL, Redis, realtime systems, testing, and cloud delivery. My capstone, Aegis, is a production-oriented incident operations platform; four additional product-complete applications demonstrate breadth across planning, collaboration, travel, and finance.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.24, duration: 0.5 }} className="flex flex-wrap gap-2 mb-8">
              {["React", "TypeScript", "Python", "FastAPI / Flask", "PostgreSQL", "Redis", "WebSockets", "Docker", "CI/CD"].map((tech) => (
                <span key={tech} className="bg-gray-100 dark:bg-gray-800 text-textSubtle dark:text-gray-200 px-3 py-1.5 rounded-full text-xs font-medium border border-gray-200 dark:border-gray-700">{tech}</span>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32, duration: 0.5 }} className="flex flex-wrap items-center gap-3">
              <a href="#capstone" className="btn">Explore Aegis <FaArrowDown /></a>
              <a href="#projects" className="btn">View Product Work <FaArrowDown /></a>
              <a href="/Noah_Ragan_Software_Engineer_Resume.pdf" target="_blank" rel="noopener noreferrer" className="btn">Resume <FaFilePdf /></a>
              <a href="https://github.com/MotherTheresa64" target="_blank" rel="noopener noreferrer" className="btn-icon" aria-label="GitHub"><FaGithub size={18} /></a>
              <a href="https://www.linkedin.com/in/njragandev/" target="_blank" rel="noopener noreferrer" className="btn-icon" aria-label="LinkedIn"><FaLinkedin size={18} /></a>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.96, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.55 }} className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4 sm:p-5 shadow-xl">
            <div className="relative overflow-hidden rounded-[1.35rem] bg-gray-200 dark:bg-gray-800">
              <img src="/noah-ragan-profile.jpg" alt="Noah Ragan" className="w-full aspect-square object-cover" loading="eager" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent px-5 pb-5 pt-16 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/75">Put a face to the code</p>
                <h2 className="text-2xl font-bold mt-1">Noah Ragan</h2>
                <p className="text-sm text-white/85 mt-1">Full Stack Software Engineer · Willow Springs, Missouri</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 mt-4">
              <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark p-4">
                <span className="text-xs uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">Flagship / capstone</span>
                <strong className="block text-textMain dark:text-white mt-1">Aegis</strong>
                <p className="text-xs text-textSubtle dark:text-gray-400 mt-2">Realtime incident operations, multi-tenancy, RBAC, async workers, Redis fanout, auditability, observability, and production infrastructure.</p>
              </div>
              <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark p-4">
                <span className="text-xs uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">Selected product work</span>
                <strong className="block text-textMain dark:text-white mt-1">Planora · Threadline · Wanderline · Ledgerly</strong>
                <p className="text-xs text-textSubtle dark:text-gray-400 mt-2">Four product-complete builds that demonstrate range in UX, state, APIs, persistence, integrations, responsive design, testing, and deployment.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
