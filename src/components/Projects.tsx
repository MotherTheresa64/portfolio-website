import { FaChartLine, FaDatabase, FaCode, FaGithub } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const projects = [
  {
    title: "Ledgerly",
    icon: <FaChartLine />,
    desc: "A deployed full-stack personal finance application with Firebase authentication, PostgreSQL-backed per-user data isolation, transaction tracking, monthly budgets, savings goals, CSV import/export, analytics, and responsive mobile UX.",
    tags: ["React", "TypeScript", "Python", "Flask", "PostgreSQL", "Firebase", "Render", "Pytest"],
    live: "https://ledgerly-web-knmt.onrender.com",
    github: "https://github.com/MotherTheresa64/Ledgerly",
  },
  {
    title: "Advanced Service API",
    icon: <FaDatabase />,
    desc: "A deployed Flask REST API for managing mechanics and service tickets, with PostgreSQL persistence, SQLAlchemy models, Marshmallow serialization, Swagger documentation, automated tests, and CI/CD deployment.",
    tags: ["Python", "Flask", "SQLAlchemy", "PostgreSQL", "Marshmallow", "Swagger", "Pytest", "CI/CD"],
    live: "https://advanced-api-final.onrender.com/apidocs/",
    github: "https://github.com/MotherTheresa64/Advanced-API-Final",
  },
  {
    title: "Developer Portfolio",
    icon: <FaCode />,
    desc: "The responsive portfolio site you are viewing now, built with React and TypeScript to showcase production-style projects, technical skills, and deployed work across frontend and backend development.",
    tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion", "Responsive Design"],
    live: "#home",
    github: "https://github.com/MotherTheresa64/portfolio-website",
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
          Deployed applications and APIs built with modern frontend, backend, database, authentication, testing, and deployment workflows.
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

              <div className="flex gap-2 text-sm flex-wrap">
                <a
                  href={project.live}
                  target={project.live.startsWith("http") ? "_blank" : undefined}
                  rel={project.live.startsWith("http") ? "noopener noreferrer" : undefined}
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
          href="https://github.com/MotherTheresa64"
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
