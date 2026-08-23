import { FaChartLine, FaDatabase, FaGithub, FaArrowUpRightFromSquare } from "react-icons/fa6";

const Projects = () => {
  return (
    <section id="projects" className="py-24 px-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl mb-10">
          <span className="text-xs font-bold tracking-[0.2em] text-gray-500 dark:text-gray-400">SELECTED WORK</span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-3 mb-4 text-textMain dark:text-white">Deployed work you can inspect.</h2>
          <p className="text-textSubtle dark:text-gray-300 text-lg">Live applications, source code, backend architecture, authentication, data modeling, testing, and deployment—not placeholder cards.</p>
        </div>

        <article className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark p-7 sm:p-9 mb-6 shadow-sm">
          <div className="grid lg:grid-cols-[1fr_.9fr] gap-10">
            <div>
              <div className="flex items-center gap-3 mb-4"><FaChartLine /><span className="text-xs font-bold tracking-[0.16em] text-gray-500 dark:text-gray-400">FLAGSHIP FULL-STACK PROJECT</span></div>
              <h3 className="text-4xl font-bold mb-4 text-textMain dark:text-white">Ledgerly</h3>
              <p className="text-textSubtle dark:text-gray-300 leading-relaxed mb-6">A deployed personal-finance application for transactions, monthly budgets, savings goals, cash-flow analytics, and data portability. Firebase handles identity while the Flask API verifies tokens and PostgreSQL stores each user's financial records behind strict ownership checks.</p>
              <div className="flex flex-wrap gap-2 mb-7">{["React", "TypeScript", "Python", "Flask", "PostgreSQL", "Firebase Auth", "Pytest", "GitHub Actions", "Render"].map(tag => <span key={tag} className="px-2.5 py-1.5 rounded-lg text-xs border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300">{tag}</span>)}</div>
              <div className="flex flex-wrap gap-3">
                <a className="btn" href="https://ledgerly-web-knmt.onrender.com" target="_blank" rel="noopener noreferrer">Launch app <FaArrowUpRightFromSquare /></a>
                <a className="btn" href="https://github.com/MotherTheresa64/Ledgerly" target="_blank" rel="noopener noreferrer"><FaGithub /> Source code</a>
              </div>
            </div>
            <div className="grid gap-3">
              {[['Identity','Firebase registration, email verification, password recovery, protected API access.'],['Isolation','Transactions, budgets, and goals are scoped to the authenticated user throughout the API.'],['Product features','Search/filtering, CSV import/export, budgeting, savings goals, analytics, themes, and mobile UX.'],['Delivery','Automated backend tests, GitHub Actions CI, PostgreSQL production data, and Render deployment.']].map(([title, text]) => <div key={title} className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-5"><strong className="block mb-1 text-textMain dark:text-white">{title}</strong><p className="text-sm text-textSubtle dark:text-gray-300 leading-relaxed">{text}</p></div>)}
            </div>
          </div>
        </article>

        <div className="grid md:grid-cols-2 gap-6">
          <article className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark p-7">
            <div className="flex items-center gap-3 mb-4"><FaDatabase /><span className="text-xs font-bold tracking-[0.16em] text-gray-500 dark:text-gray-400">BACKEND / API</span></div>
            <h3 className="text-2xl font-bold mb-3 text-textMain dark:text-white">Advanced Service API</h3>
            <p className="text-sm leading-relaxed text-textSubtle dark:text-gray-300 mb-5">A deployed Flask REST API for mechanics and service tickets with PostgreSQL, SQLAlchemy, Marshmallow serialization, Swagger/OpenAPI documentation, pytest coverage, Gunicorn, and CI/CD.</p>
            <div className="flex flex-wrap gap-3"><a className="btn" href="https://advanced-api-final.onrender.com/apidocs/" target="_blank" rel="noopener noreferrer">Swagger docs <FaArrowUpRightFromSquare /></a><a className="btn" href="https://github.com/MotherTheresa64/Advanced-API-Final" target="_blank" rel="noopener noreferrer"><FaGithub /> Source</a></div>
          </article>

          <article className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark p-7">
            <div className="flex items-center gap-3 mb-4"><FaGithub /><span className="text-xs font-bold tracking-[0.16em] text-gray-500 dark:text-gray-400">MORE CODE</span></div>
            <h3 className="text-2xl font-bold mb-3 text-textMain dark:text-white">GitHub profile</h3>
            <p className="text-sm leading-relaxed text-textSubtle dark:text-gray-300 mb-5">Additional coursework, experiments, and earlier project iterations are public so you can inspect how my work has progressed over time.</p>
            <a className="btn" href="https://github.com/MotherTheresa64" target="_blank" rel="noopener noreferrer"><FaGithub /> View GitHub</a>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Projects;
