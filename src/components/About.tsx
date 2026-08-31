import { FaCode, FaUsers, FaRocket } from "react-icons/fa";

const About = () => {
  const cards = [
    { icon: <FaCode />, title: "Full-stack ownership", text: "I work across responsive interfaces, APIs, authentication, relational data, local-first persistence, testing, and deployment instead of treating them as isolated exercises." },
    { icon: <FaRocket />, title: "Ship-focused", text: "I like taking software beyond local development: documented, secured, tested, responsive, deployed, and easy for another person to open and review." },
    { icon: <FaUsers />, title: "Product perspective", text: "My support and operations background keeps me focused on clear workflows, useful states, resilient error handling, accessibility, and what the product feels like to the person using it." },
  ];

  return (
    <section id="about" className="py-24 px-6 bg-white dark:bg-dark">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[.9fr_1.1fr] gap-12 items-start">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] text-gray-500 dark:text-gray-400">ABOUT</span>
            <h2 className="text-4xl font-bold mt-3 mb-5 text-textMain dark:text-white">I build across the whole application.</h2>
            <div className="space-y-4 text-textSubtle dark:text-gray-300 leading-relaxed">
              <p>I’m a Full Stack Software Engineer focused on React, TypeScript, Python, Flask, Node/Express, PostgreSQL, Firebase, and production-minded delivery.</p>
              <p>My recent work includes Ledgerly, a deployed multi-user finance application, plus Planora, Threadline, and Wanderline: three live products exploring project planning, durable team knowledge, and consumer travel planning with very different interaction models.</p>
              <p>I intentionally structure the newer demos so they remain fully reviewable without credentials while authentication and persistence boundaries stay isolated for the final per-user hosted-data phase. That lets me demonstrate product UX, state modeling, responsiveness, accessibility, integrations, deployment, and architecture now without pretending unfinished infrastructure is already finished.</p>
              <p>I completed full-stack software engineering training through Coding Temple and continue building projects that strengthen my work in authorization, validation, debugging, data modeling, mobile product design, maintainability, and cloud deployment.</p>
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
