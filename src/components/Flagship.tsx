import { FaCodeBranch, FaDatabase, FaNetworkWired, FaShieldHalved } from "react-icons/fa6";
import { motion } from "framer-motion";

const principles = [
  {
    icon: <FaNetworkWired />,
    title: "Larger systems scope",
    desc: "The flagship should go beyond a polished interface and force meaningful decisions across services, data flow, background work, integrations, and failure handling.",
  },
  {
    icon: <FaShieldHalved />,
    title: "Real multi-user behavior",
    desc: "Identity, permissions, shared state, security boundaries, and durable account-backed data should be fundamental to the product rather than demo-layer decoration.",
  },
  {
    icon: <FaDatabase />,
    title: "Engineering depth",
    desc: "The project should expose substantial architecture, data modeling, validation, observability, testing, performance, and maintainability decisions that are worth discussing in an interview.",
  },
  {
    icon: <FaCodeBranch />,
    title: "Production discipline",
    desc: "It should be reviewable end to end: source, CI/CD, deployment, real integrations, useful documentation, and a product identity strong enough to stand on its own.",
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
              NEXT FLAGSHIP BUILD · RESERVED
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-textMain dark:text-white mb-4">The next one has to raise the ceiling.</h2>
            <p className="text-base sm:text-lg leading-relaxed text-textSubtle dark:text-gray-300 mb-6">
              Planora, Threadline, Wanderline, and Ledgerly already demonstrate range across four distinct products. I’m intentionally reserving the flagship position for something more ambitious: a larger systems problem with deeper backend architecture, real multi-user behavior, richer data flows, external integrations, production-grade testing, and enough technical surface area to anchor an engineering interview by itself.
            </p>
            <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              Until that project earns the position, none of the current four is artificially labeled as the flagship.
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
