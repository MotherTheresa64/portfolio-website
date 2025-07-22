import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-footerBg pt-10 pb-12 px-6 text-sm text-textSubtle border-t border-borderLight shadow-inner">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Name & Role */}
        <div className="text-center md:text-left">
          <p className="font-semibold text-textMain">Noah Ragan</p>
          <p className="text-xs">Full Stack Software Developer</p>
        </div>

        {/* Middle: Icons */}
        <div className="flex gap-4">
          <a
            href="https://github.com/noahragan"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 border rounded hover:bg-gray-100"
          >
            <FaGithub size={16} />
          </a>
          <a
            href="https://linkedin.com/in/noahragan"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 border rounded hover:bg-gray-100"
          >
            <FaLinkedin size={16} />
          </a>
          <a
            href="mailto:noah.j.ragan@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 border rounded hover:bg-gray-100"
          >
            <FaEnvelope size={16} />
          </a>
        </div>

        {/* Right: Credits */}
        <div className="text-center md:text-right text-xs">
          <p>
            © {new Date().getFullYear()} Noah Ragan.{" "}
            <span className="text-textMain">
              Made <span className="text-red-500">♥</span> with{" "}
              <span className="font-medium">React</span> &{" "}
              <span className="font-medium">Next.js</span>
            </span>
          </p>
        </div>
      </div>

      {/* Bottom: Disclaimer */}
      <p className="text-center text-xs mt-6 text-gray-500">
        All rights reserved. This website showcases my skills and projects in web development.
      </p>
    </footer>
  );
};

export default Footer;
