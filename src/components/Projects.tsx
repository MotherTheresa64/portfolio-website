import { FaShoppingCart, FaDatabase, FaBriefcase, FaGithub } from "react-icons/fa";

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
  return (
    <section id="projects" className="py-24 px-6 bg-sectionBg">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-2 text-textMain">Featured Projects</h2>
        <p className="text-sm text-textSubtle mb-10">
          A showcase of applications I’ve built using modern web technologies and best practices.
        </p>

        <div className="grid md:grid-cols-2 gap-6 text-left">
          {projects.map((project) => (
            <div
              key={project.title}
              className="rounded-xl bg-white p-6 shadow hover:shadow-md transition border border-borderLight"
            >
              <div className="flex items-center gap-2 text-lg font-semibold mb-2 text-textMain">
                {project.icon}
                {project.title}
              </div>
              <p className="text-sm text-textSubtle mb-4">{project.desc}</p>

              <div className="flex flex-wrap gap-2 text-xs mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-700 px-2 py-1 rounded border border-gray-200"
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
                  className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800 transition"
                >
                  🔗 Live Demo
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-3 py-1 border rounded hover:bg-gray-100 transition"
                >
                  <FaGithub /> GitHub Repo
                </a>
              </div>
            </div>
          ))}
        </div>

        <a
          href="https://github.com/noahragan"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-2 text-sm px-4 py-2 border rounded hover:bg-gray-100 transition"
        >
          <FaGithub /> View More on GitHub
        </a>
      </div>
    </section>
  );
};

export default Projects;
