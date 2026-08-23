import { FaArrowUpRightFromSquare, FaGithub, FaShieldHalved, FaDatabase, FaMobileScreenButton, FaCodeBranch } from "react-icons/fa6";
import { motion } from "framer-motion";

const highlights = [
  {
    icon: <FaShieldHalved />,
    title: "Secure multi-user auth",
    desc: "Firebase Authentication with verified sessions and user-scoped access across financial resources.",
  },
  {
    icon: <FaDatabase />,
    title: "Persistent finance data",
    desc: "PostgreSQL-backed transactions, monthly budgets, savings goals, and dashboard analytics.",
  },
  {
    icon: <FaMobileScreenButton />,
    title: "Responsive product UX",
    desc: "React + TypeScript interface built for desktop and native-width mobile use without pinch-zooming.",
  },
  {
    icon: <FaCodeBranch />,
    title: "Tested & deployed",
    desc: "pytest coverage, GitHub Actions CI, and separate frontend/API deployments on Render.",
  },
];

const Flagship = () => (
  <section id="flagship" className="px-6 py-24 bg-section dark:bg-dark">
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-[1.05fr_.95fr] gap-10 items-stretch">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="rounded-3xl border border-borderLight dark:border-gray-700 bg-white dark:bg-gray-900 p-7 sm:p-9 flex flex-col justify-between"
        >
          <div>
            <span className="inline-flex items-center rounded-full border border-gray-200 dark:border-gray-700 px-3 py-1 text-xs font-semibold tracking-wide text-textSubtle dark:text-gray-300 mb-5">
              FLAGSHIP PROJECT
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-textMain dark:text-white mb-4">Ledgerly</h2>
            <p className="text-base sm:text-lg leading-relaxed text-textSubtle dark:text-gray-300 mb-6">
              A deployed full-stack personal finance application built as a real multi-user product — not a static demo. Ledgerly handles authentication, user-owned financial data, transactions, budgets, goals, analytics, CSV portability, and account lifecycle controls.
            </p>

            <div className="flex flex-wrap gap-2 mb-7">
              {["React", "TypeScript", "Python", "Flask", "PostgreSQL", "Firebase Auth", "SQLAlchemy", "pytest", "GitHub Actions", "Render"].map((tech) => (
                <span key={tech} className="px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <a href="https://ledgerly-web-knmt.onrender.com" target="_blank" rel="noopener noreferrer" className="btn">
              Launch Ledgerly <FaArrowUpRightFromSquare />
            </a>
            <a href="https://github.com/MotherTheresa64/Ledgerly" target="_blank" rel="noopener noreferrer" className="btn">
              <FaGithub /> View Source
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="grid sm:grid-cols-2 gap-4"
        >
          {highlights.map((item) => (
            <article key={item.title} className="rounded-2xl border border-borderLight dark:border-gray-700 bg-white dark:bg-gray-900 p-6">
              <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4 text-textMain dark:text-white">
                {item.icon}
              </div>
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
