const About = () => {
  return (
    <section id="about" className="py-24 px-6 bg-sectionBg">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-textMain">
          About Me
        </h2>

        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          {/* Left Text */}
          <div className="md:w-1/2 text-textSubtle text-sm leading-relaxed">
            <p className="mb-4">
              I'm Noah Ragan, a full stack software engineer with hands-on experience building modern web applications using technologies like React, TypeScript, Flask, and SQL. I’ve completed a comprehensive full-stack bootcamp at Coding Temple, where I built real-world projects and developed skills in REST APIs, authentication, CI/CD, testing, and responsive design.
            </p>
            <p>
              I’m passionate about crafting scalable applications, clean code, and learning new technologies to solve real-world problems. Whether it’s building elegant UIs or designing robust backend systems, I love turning ideas into functional, user-friendly applications.
            </p>

            <a
              href="#contact"
              className="mt-6 inline-block bg-accent text-white px-4 py-2 rounded hover:bg-neutral-900 transition text-sm"
            >
              ⚡ Let’s Work Together
            </a>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 gap-4 md:w-1/2">
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
                className="rounded-lg p-4 bg-white hover:shadow-md transition border border-borderLight"
              >
                <h3 className="font-semibold text-md mb-1 text-textMain">
                  {card.title}
                </h3>
                <p className="text-xs text-textSubtle">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
