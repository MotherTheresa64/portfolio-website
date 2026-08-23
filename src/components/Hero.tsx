import { FaArrowDown, FaGithub, FaLinkedin } from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center bg-white dark:bg-dark transition-colors pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-[1.1fr_.9fr] gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-gray-700 px-3 py-1.5 text-xs font-semibold text-textSubtle dark:text-gray-300 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-green-500" />
              OPEN TO REMOTE SOFTWARE ENGINEERING ROLES
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.55 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-textMain dark:text-white leading-[1.02] mb-5"
            >
              I build full-stack products that actually ship.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16, duration: 0.5 }}
              className="text-lg sm:text-xl text-textSubtle dark:text-gray-300 leading-relaxed max-w-2xl mb-7"
            >
              I’m Noah Ragan, a Full Stack Software Engineer working across React, TypeScript, Python, Flask, PostgreSQL, Firebase, testing, and cloud deployment. I care about the entire path from idea to a secure, responsive application people can use.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.24, duration: 0.5 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {["React", "TypeScript", "Python", "Flask", "PostgreSQL", "Firebase", "REST APIs", "CI/CD"].map((tech) => (
                <span key={tech} className="bg-gray-100 dark:bg-gray-800 text-textSubtle dark:text-gray-200 px-3 py-1.5 rounded-full text-xs font-medium border border-gray-200 dark:border-gray-700">
                  {tech}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.5 }}
              className="flex flex-wrap items-center gap-3"
            >
              <a href="https://ledgerly-web-knmt.onrender.com" target="_blank" rel="noopener noreferrer" className="btn">
                Launch Ledgerly <FaArrowUpRightFromSquare />
              </a>
              <a href="#projects" className="btn">View Projects <FaArrowDown /></a>
              <a href="https://github.com/MotherTheresa64" target="_blank" rel="noopener noreferrer" className="btn-icon" aria-label="GitHub">
                <FaGithub size={18} />
              </a>
              <a href="https://www.linkedin.com/in/njragandev/" target="_blank" rel="noopener noreferrer" className="btn-icon" aria-label="LinkedIn">
                <FaLinkedin size={18} />
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.55 }}
            className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-6 sm:p-8 shadow-xl"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">Current flagship</span>
                <h2 className="text-3xl font-bold text-textMain dark:text-white mt-2">Ledgerly</h2>
              </div>
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">LIVE</span>
            </div>

            <div className="space-y-4 text-sm text-textSubtle dark:text-gray-300">
              <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-dark"><strong className="block text-textMain dark:text-white mb-1">Authentication</strong>Firebase email/password auth, verification, recovery, and protected API access.</div>
              <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-dark"><strong className="block text-textMain dark:text-white mb-1">Data</strong>PostgreSQL-backed transactions, budgets, goals, and strict user-scoped ownership.</div>
              <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-dark"><strong className="block text-textMain dark:text-white mb-1">Production</strong>Responsive React UI, Flask API, automated tests, CI/CD, and Render deployment.</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
