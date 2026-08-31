import { FaCode, FaUsers, FaRocket } from "react-icons/fa";

const About = () => {
  const cards = [
    { icon: <FaCode />, title: "Full-stack ownership", text: "I work across responsive interfaces, APIs, relational data, authentication and authorization, realtime communication, background processing, testing, and deployment instead of treating them as isolated exercises." },
    { icon: <FaRocket />, title: "Production-minded", text: "Aegis pushes that further into containerized infrastructure, asynchronous workers, Redis-backed realtime fanout, auditability, observability, documented architecture, and CI/CD." },
    { icon: <FaUsers />, title: "Product perspective", text: "My support and operations background keeps me focused on clear workflows, resilient error handling, useful states, accessibility, and what a system feels like when people have to rely on it." },
  ];

  return (
    <section id="about" className="py-24 px-6 bg-white dark:bg-dark">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[.9fr_1.1fr] gap-12 items-start">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] text-gray-500 dark:text-gray-400">ABOUT</span>
            <h2 className="text-4xl font-bold mt-3 mb-5 text-textMain dark:text-white">Product breadth. Systems depth.</h2>
            <div className="space-y-4 text-textSubtle dark:text-gray-300 leading-relaxed">
              <p>I’m a Full Stack Software Engineer focused on building complete, reviewable software across React, TypeScript, Python, FastAPI/Flask, Node/Express, PostgreSQL, Redis, Firebase, testing, and production delivery.</p>
              <p>Aegis is my capstone: a real-time incident operations platform designed around multi-tenant organizations, RBAC, service health, alert ingestion and deduplication, incident timelines, WebSockets, Redis event fanout, Celery workers, audit history, public status communication, postmortems, and production observability.</p>
              <p>Planora, Threadline, Wanderline, and Ledgerly form the supporting product portfolio. Together they demonstrate product design, responsive UX, complex application state, search, collaboration models, external APIs, persistence, REST services, testing, CI/CD, and deployment across four different domains.</p>
              <p>I completed full-stack software engineering training through Coding Temple and continue building projects that strengthen the areas entry-level engineers are expected to grow into quickly: architecture, authorization, validation, debugging, data modeling, maintainability, collaboration, and reliable delivery.</p>
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
