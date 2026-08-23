import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => (
  <footer className="px-6 py-10 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 items-center justify-between text-sm text-textSubtle dark:text-gray-300">
      <div className="text-center md:text-left"><p className="font-semibold text-textMain dark:text-white">Noah Ragan</p><p className="text-xs">Full Stack Software Engineer</p></div>
      <div className="flex gap-3">
        <a aria-label="GitHub" className="btn-icon" href="https://github.com/MotherTheresa64" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
        <a aria-label="LinkedIn" className="btn-icon" href="https://www.linkedin.com/in/njragandev/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
        <a aria-label="Email" className="btn-icon" href="mailto:noah.j.ragan@gmail.com"><FaEnvelope /></a>
      </div>
      <div className="text-center md:text-right text-xs"><p>© {new Date().getFullYear()} Noah Ragan</p><p>Built with React, TypeScript, Vite & Tailwind CSS.</p></div>
    </div>
  </footer>
);

export default Footer;
