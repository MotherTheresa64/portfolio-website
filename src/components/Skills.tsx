import { FaCode, FaServer, FaLock, FaBug, FaTools } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const skills = [
  {
    title: "Frontend",
    icon: <FaCode />,
    tags: [
      "React",
      "TypeScript",
      "JavaScript (ES6+)",
      "Tailwind CSS",
      "Bootstrap",
      "HTML5",
      "CSS3",
      "React Router",
      "Redux Toolkit",
      "React Query",
    ],
  },
  {
    title: "Backend",
    icon: <FaServer />,
    tags: [
      "Python",
      "Flask",
      "SQLAlchemy",
      "MySQL",
      "Marshmallow",
      "Flask Blueprints",
      "Token-Based Auth",
      "Flask-Limiter",
      "Flask-Caching",
    ],
  },
  {
    title: "Authentication",
    icon: <FaLock />,
    tags: ["Auth0", "Firebase Auth", "JWT", "Context API"],
  },
  {
    title: "Testing",
    icon: <FaBug />,
    tags: ["Vitest", "Jest", "React Testing Library", "Pytest"],
  },
  {
    title: "Tools & DevOps",
    icon: <FaTools />,
    tags: [
      "Git + GitHub",
      "Postman",
      "Vercel",
      "Render",
      "GitHub Actions (CI/CD)",
      "Prentus",
    ],
  },
];

const Skills = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  return (
    <section id="skills" className="py-24 px-6 bg-main">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-2 text-textMain dark:text-white">
          Skills & Technologies
        </h2>
        <p className="text-sm text-textSubtle dark:text-gray-300 mb-10">
          A comprehensive toolkit for building modern, scalable web applications
          from frontend to backend.
        </p>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-left"
        >
          {skills.map((section) => (
            <motion.div
              key={section.title}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="rounded-xl bg-white dark:bg-dark border border-borderLight dark:border-gray-700 p-6 cursor-default"
            >
              <div className="flex items-center gap-2 text-lg font-semibold mb-3 text-textMain dark:text-white">
                {section.icon}
                {section.title}
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                {section.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 rounded border border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
