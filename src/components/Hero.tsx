import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

const Hero = () => {
  const [hideScroll, setHideScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHideScroll(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="home" className="h-screen flex flex-col justify-center pt-24 pb-10 bg-white">
      <div className="max-w-6xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        {/* Left Text */}
        <div className="text-left max-w-xl">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-bold text-textMain mb-2"
          >
            Noah Ragan
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-2xl font-medium text-textSubtle mb-4"
          >
            Full Stack Software Developer
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-wrap gap-2 mb-5"
          >
            {["React", "TypeScript", "Flask", "Python", "SQL", "Firebase"].map((tech) => (
              <span
                key={tech}
                className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium text-textSubtle hover:bg-black hover:text-white transition"
              >
                {tech}
              </span>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-textSubtle text-sm leading-relaxed mb-6"
          >
            I’m a full stack software engineer with hands-on experience building modern web applications.
            I craft scalable applications with clean code and love learning new technologies to solve real-world problems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <a
              href="#contact"
              className="bg-black text-white px-4 py-2 text-sm rounded hover:bg-neutral-900 transition"
            >
              ✉️ Get In Touch
            </a>
            <a
              href="https://github.com/MotherTheresa64"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-100 p-2 rounded hover:bg-gray-200 transition"
            >
              <FaGithub size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/noah-ragan-48b893372/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-100 p-2 rounded hover:bg-gray-200 transition"
            >
              <FaLinkedin size={18} />
            </a>
          </motion.div>
        </div>

        {/* Avatar with Glow */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="relative"
        >
          <div className="w-52 h-52 rounded-full bg-gradient-to-br from-gray-800 to-gray-300 flex items-center justify-center text-white text-4xl font-bold shadow-lg hover:scale-105 transition relative">
            NR
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/30 to-cyan-400/30 blur-2xl animate-pulse z-[-1]" />
          </div>
          <div className="absolute -top-4 -right-4 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center shadow-md">
            <span className="text-sm text-gray-600">&lt;/&gt;</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`mt-16 flex flex-col items-center transition-opacity duration-500 ${
          hideScroll ? "opacity-0" : "opacity-100"
        }`}
      >
        <p className="text-sm text-textSubtle mb-2">Scroll to learn more</p>
        <div className="w-5 h-9 border-2 border-textSubtle rounded-full flex items-start justify-center relative overflow-hidden">
          <div className="w-[4px] h-2.5 bg-textSubtle rounded-full absolute top-1 animate-scroll-bar" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
