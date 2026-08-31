import { FaCodeBranch, FaDatabase, FaMobileScreenButton, FaShieldHalved } from "react-icons/fa6";
import { motion } from "framer-motion";

const principles = [
  {
    icon: <FaMobileScreenButton />,
    title: "End-to-end scope",
    desc: "The eventual flagship should demonstrate product UX, application architecture, data, auth, testing, and deployment together.",
  },
  {
    icon: <FaShieldHalved />,
    title: "Clear product identity",
    desc: "It should solve a specific problem strongly enough to stand on its own instead of being selected only because it is already mature.",
  },
  {
    icon: <FaDatabase />,
    title: "Engineering depth",
    desc: "The code should provide meaningful examples of architecture, state, validation, security boundaries, testing, and maintainability.",
  },
  {
    icon: <FaCodeBranch />,
    title: "Actually shipped",
    desc: "The finished project should be reviewable as a real deployed product with a clean path from source code to production.",
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
          className="rounded-3xl border border-dashed border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 p-7 sm:p-9 flex flex-col justify-between"
        >
          <div>
            <span className="inline-flex items-center rounded-full border border-gray-200 dark:border-gray-700 px-3 py-1 text-xs font-semibold tracking-wide text-textSubtle dark:text-gray-300 mb-5">
              FLAGSHIP PROJECT · IN DEVELOPMENT
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-textMain dark:text-white mb-4">Reserved for what comes next.</h2>
            <p className="text-base sm:text-lg leading-relaxed text-textSubtle dark:text-gray-300 mb-6">
              I’m intentionally leaving the flagship position open until I finish the project that best represents my strongest end-to-end engineering work. The projects elsewhere on this portfolio remain active references without being forced into that role.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="grid sm:grid-cols-2 gap-4"
        >
          {principles.map((item) => (
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
