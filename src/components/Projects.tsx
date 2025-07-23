import { FaShoppingCart, FaDatabase, FaBriefcase, FaGithub } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const projects = [
  {
    title: "E-Commerce App",
    icon: <FaShoppingCart />,
    desc: "A React + Firebase + TypeScript web store with cart, checkout, and admin features.",
    tags: ["React", "Redux Toolkit", "Firebase", "Tailwind"],
    live: "#",
    github: "#",
  },
  {
    title: "Flask Service API",
    icon: <FaDatabase />,
    desc: "REST API built with Flask, MySQL, Marshmallow, Blueprints, and token authentication.",
    tags: ["Flask", "SQLAlchemy", "JWT", "Pytest"],
    live: "#",
    github: "#",
  },
  {
    title: "PositionPro",
    icon: <FaBriefcase />,
    desc: "A modern, mobile-responsive Kanban-style job-application tracker built with React, TypeScript, Tailwind CSS & Vite, powered by @dnd-kit drag-and-drop, Firebase Authentication & Firestore backend.",
    tags: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Vite",
      "@dnd-kit",
      "Firebase Auth",
      "Firestore",
      "lucide-react",
      "react-hot-toast",
    ],
    live: "#",
    github: "#",
  },
];

const Projects = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  return (
    <section id="projects" className="py-24 px-6 bg-section dark:bg-dark">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-2 text-textMain dark:text-white">
          Featured Projects
        </h2>
        <p className="text-sm text-textSubtle dark:text-gray-300 mb-10">
          A showcase of applications I’ve built using modern web technologies and best practices.
        </p>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid md:grid-cols-2 gap-6 text-left"
        >
          {projects.map((project) => (
            <div
              key={project.title}
              className="rounded-xl bg-white dark:bg-dark border border-borderLight dark:border-gray-700 p-6 transition-transform duration-300 transform hover:scale-[1.02] hover:shadow-lg"
            >
              <div className="flex items-center gap-2 text-lg font-semibold mb-2 text-textMain dark:text-white">
                {project.icon}
                {project.title}
              </div>
              <p className="text-sm text-textSubtle dark:text-gray-300 mb-4">
                {project.desc}
              </p>

              <div className="flex flex-wrap gap-2 text-xs mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 rounded border border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:-translate-y-1 hover:shadow-md transition-transform"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-2 text-sm">
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                >
                  🔗 Live Demo
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                >
                  <FaGithub /> GitHub Repo
                </a>
              </div>
            </div>
          ))}
        </motion.div>

        <a
          href="https://github.com/noahragan"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 btn"
        >
          <FaGithub /> View More on GitHub
        </a>
      </div>
    </section>
  );
};

export default Projects;
