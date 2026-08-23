import { FaCode, FaUsers, FaRocket } from "react-icons/fa";

const About = () => {
  const cards = [
    { icon: <FaCode />, title: "Full-stack ownership", text: "I work across responsive interfaces, APIs, authentication, relational data, testing, and deployment instead of treating them as isolated exercises." },
    { icon: <FaRocket />, title: "Ship-focused", text: "I like taking software beyond local development: documented, secured, tested, responsive, and deployed where someone else can actually use it." },
    { icon: <FaUsers />, title: "User perspective", text: "My background in technical support, customer service, and operations helps me troubleshoot clearly and think about software from the end user's side." },
  ];

  return (
    <section id="about" className="py-24 px-6 bg-white dark:bg-dark">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[.9fr_1.1fr] gap-12 items-start">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] text-gray-500 dark:text-gray-400">ABOUT</span>
            <h2 className="text-4xl font-bold mt-3 mb-5 text-textMain dark:text-white">I build across the whole application.</h2>
            <div className="space-y-4 text-textSubtle dark:text-gray-300 leading-relaxed">
              <p>I’m a Full Stack Software Engineer focused on React, TypeScript, Python, Flask, PostgreSQL, Firebase, and REST APIs.</p>
              <p>My recent work includes Ledgerly, a deployed multi-user personal-finance application, and a deployed Flask service API with PostgreSQL persistence, Swagger documentation, automated tests, and CI/CD.</p>
              <p>I completed full-stack software engineering training through Coding Temple and continue building projects that force me to solve the parts that happen after the tutorial ends: ownership boundaries, validation, debugging, deployment, and maintainability.</p>
            </div>
          </div>
          <div className="grid gap-4">
            {cards.map((card) => (
              <article key={card.title} className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-6">
                <div className="flex items-center gap-3 mb-2 text-textMain dark:text-white font-semibold">{card.icon}<h3>{card.title}</h3></div>
                <p className="text-sm leading-relaxed text-textSubtle dark:text-gray-300">{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
