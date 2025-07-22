import {
  FaCode,
  FaServer,
  FaTools,
  FaShieldAlt,
  FaVial,
} from "react-icons/fa";

const skills = [
  {
    category: "Frontend",
    icon: <FaCode />,
    items: [
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
    category: "Backend",
    icon: <FaServer />,
    items: [
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
    category: "Tools & DevOps",
    icon: <FaTools />,
    items: [
      "Git + GitHub",
      "Postman",
      "Vercel",
      "Render",
      "GitHub Actions (CI/CD)",
      "Prentus",
    ],
  },
  {
    category: "Authentication",
    icon: <FaShieldAlt />,
    items: ["Auth0", "Firebase Auth", "JWT", "Context API"],
  },
  {
    category: "Testing",
    icon: <FaVial />,
    items: ["Vitest", "Jest", "React Testing Library", "Pytest"],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-2 text-textMain">
          Skills & Technologies
        </h2>
        <p className="text-sm text-textSubtle mb-10">
          A comprehensive toolkit for building modern, scalable web applications from frontend to backend.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map(({ category, icon, items }) => (
            <div
              key={category}
              className="bg-white border border-borderLight p-5 rounded-xl text-left shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-200"
            >
              <div className="flex items-center gap-2 text-textMain font-semibold mb-4">
                <span className="text-lg">{icon}</span>
                {category}
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                {items.map((item) => (
                  <span
                    key={item}
                    className="px-2 py-1 rounded border border-gray-200 bg-white text-gray-700 hover:bg-black hover:text-white transition-colors duration-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
