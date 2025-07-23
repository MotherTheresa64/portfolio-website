import { FaEnvelope } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const About = () => {
  const controlsLeft = useAnimation();
  const controlsRight = useAnimation();

  const [refLeft, inViewLeft] = useInView({ triggerOnce: true, threshold: 0.15 });
  const [refRight, inViewRight] = useInView({ triggerOnce: true, threshold: 0.15 });

  useEffect(() => {
    if (inViewLeft) controlsLeft.start("visible");
    if (inViewRight) controlsRight.start("visible");
  }, [controlsLeft, controlsRight, inViewLeft, inViewRight]);

  return (
    <section id="about" className="py-24 px-6 bg-section dark:bg-dark">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-textMain dark:text-white">
          About Me
        </h2>

        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          {/* Left Text */}
          <motion.div
            ref={refLeft}
            initial="hidden"
            animate={controlsLeft}
            variants={{
              hidden: { opacity: 0, x: -40 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="md:w-1/2 text-sm leading-relaxed text-textSubtle dark:text-gray-300"
          >
            <p className="mb-4">
              I'm Noah Ragan, a full stack software engineer with hands-on
              experience building modern web applications using technologies
              like React, TypeScript, Flask, and SQL. I’ve completed a
              comprehensive full-stack bootcamp at Coding Temple, where I built
              real-world projects and developed skills in REST APIs,
              authentication, CI/CD, testing, and responsive design.
            </p>
            <p>
              I’m passionate about crafting scalable applications, clean code,
              and learning new technologies to solve real-world problems.
              Whether it’s building elegant UIs or designing robust backend
              systems, I love turning ideas into functional, user-friendly
              applications.
            </p>

            <a
              href="#contact"
              className="mt-6 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded transition-transform hover:-translate-y-1 hover:shadow-md
                         bg-black text-white dark:bg-white dark:text-black"
            >
              <FaEnvelope size={14} className="text-white dark:text-black" />
              <span className="text-white dark:text-black">Let’s Work Together</span>
            </a>
          </motion.div>

          {/* Right Cards */}
          <motion.div
            ref={refRight}
            initial="hidden"
            animate={controlsRight}
            variants={{
              hidden: { opacity: 0, x: 40 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="grid grid-cols-1 gap-4 md:w-1/2"
          >
            {[
              {
                title: "Education",
                desc: "Full-Stack Development Bootcamp at Coding Temple, where I mastered modern web development technologies and best practices.",
              },
              {
                title: "Expertise",
                desc: "Specializing in React, TypeScript, Python, and Flask to build scalable web apps with clean, maintainable code.",
              },
              {
                title: "Passion",
                desc: "Creating innovative solutions, learning cutting-edge technologies, and delivering exceptional user experiences.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-lg p-4 bg-white dark:bg-accent hover:shadow-md transition border border-borderLight dark:border-gray-700"
              >
                <h3 className="font-semibold text-md mb-1 text-textMain dark:text-white">
                  {card.title}
                </h3>
                <p className="text-xs text-textSubtle dark:text-gray-300">
                  {card.desc}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
