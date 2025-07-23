import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
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
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center pt-24 pb-16 sm:pb-10 bg-white dark:bg-dark transition-colors"
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        {/* Left Text */}
        <div className="text-left max-w-xl w-full">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-bold text-textMain dark:text-white mb-2"
          >
            Noah Ragan
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-xl sm:text-2xl font-medium text-textSubtle dark:text-gray-300 mb-4"
          >
            Full Stack Software Developer
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-wrap gap-2 mb-5"
          >
            {["React", "TypeScript", "Flask", "Python", "SQL", "Firebase"].map(
              (tech) => (
                <span
                  key={tech}
                  className="bg-gray-100 text-textSubtle dark:bg-gray-800 dark:text-gray-300 px-3 py-1 rounded-full text-xs font-medium hover:-translate-y-1 hover:shadow-md transition-transform"
                >
                  {tech}
                </span>
              )
            )}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-textSubtle dark:text-gray-300 text-sm leading-relaxed mb-6"
          >
            I’m a full stack software engineer with hands-on experience building
            modern web applications. I craft scalable applications with clean
            code and love learning new technologies to solve real-world
            problems.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-wrap items-center gap-3"
          >
            <a href="#contact" className="btn">
              <FaEnvelope size={14} />
              Get In Touch
            </a>

            <a
              href="https://github.com/MotherTheresa64"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-icon"
            >
              <FaGithub size={18} />
            </a>

            <a
              href="https://www.linkedin.com/in/noah-ragan-48b893372/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-icon"
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
          className="relative w-full flex justify-center md:justify-end"
        >
          <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-gradient-to-br from-gray-800 to-gray-300 dark:from-gray-700 dark:to-gray-400 flex items-center justify-center text-white text-3xl sm:text-4xl font-bold shadow-lg hover:scale-105 transition relative">
            NR
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/30 to-cyan-400/30 blur-2xl animate-pulse z-[-1]" />
          </div>
          <div className="absolute -top-4 -right-4 w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center shadow-md">
            <span className="text-xs sm:text-sm text-gray-600 dark:text-white">&lt;/&gt;</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`mt-16 sm:mt-20 flex flex-col items-center transition-opacity duration-500 ${
          hideScroll ? "opacity-0" : "opacity-100"
        }`}
      >
        <p className="text-sm text-textSubtle dark:text-gray-300 mb-2">
          Scroll to learn more
        </p>
        <div className="w-5 h-9 border-2 border-textSubtle dark:border-gray-400 rounded-full flex items-start justify-center relative overflow-hidden">
          <div className="w-[4px] h-2.5 bg-textSubtle dark:bg-gray-400 rounded-full absolute top-1 animate-scroll-bar" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
