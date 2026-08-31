import { useMemo, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiAward,
  FiCheck,
  FiChevronRight,
  FiCode,
  FiDownload,
  FiExternalLink,
  FiFolder,
  FiGithub,
  FiHome,
  FiLinkedin,
  FiList,
  FiLock,
  FiMail,
  FiTerminal,
  FiX,
  FiZap,
} from "react-icons/fi";
import "./map-v2.css";

type GateId = "skills" | "projects" | "list" | "highlights" | "aegis" | "contact";
type Mode = "intro" | "challenge" | "revealed";
type ViewId = "skills" | "project-list" | "projects-root" | "top-projects" | "aegis" | "contact" | null;

type Challenge = {
  id: GateId;
  label: string;
  file: string;
  language: string;
  prompt: string;
  snippet: string;
  hint: string;
  answer: string;
  accepted: string[];
  targetId: string;
  placeholder: string;
};

type Product = {
  name: string;
  category: string;
  status: string;
  description: string;
  note: string;
  tags: string[];
  live: string;
  source: string;
};

type Repo = {
  name: string;
  kind: string;
  url: string;
};

const challenges: Challenge[] = [
  {
    id: "skills",
    label: "CSS reveal",
    file: "skills.css",
    language: "CSS",
    prompt: "Fill the blank so the hidden skills list becomes fully visible.",
    snippet: `.skills-list {\n  opacity: 0;\n  visibility: hidden;\n}\n\n.skills-list.is-revealed {\n  opacity: ___;\n  visibility: visible;\n}`,
    hint: "CSS opacity uses a value between 0 and 1. You want fully visible.",
    answer: "1",
    accepted: ["1", "opacity: 1", "opacity:1", "opacity: 1;", "opacity:1;"],
    targetId: "gate-projects",
    placeholder: "value",
  },
  {
    id: "projects",
    label: "Root condition",
    file: "root.ts",
    language: "TypeScript",
    prompt: "Complete the condition that opens the project root.",
    snippet: `const skillsUnlocked = true;\nconst wantsProjects = true;\n\nif (skillsUnlocked && ________) {\n  openRoute(\"/projects\");\n}`,
    hint: "The missing identifier is already declared directly above the if statement.",
    answer: "wantsProjects",
    accepted: ["wantsprojects", "wantsProjects"],
    targetId: "projects-root",
    placeholder: "identifier",
  },
  {
    id: "list",
    label: "Git branch",
    file: "repos.sh",
    language: "Shell",
    prompt: "Complete the command so Git lists both local and remote branches.",
    snippet: `# show every branch\ngit branch ____`,
    hint: "The short flag means “all.”",
    answer: "-a",
    accepted: ["-a", "--all", "git branch -a", "git branch --all"],
    targetId: "project-list-node",
    placeholder: "flag",
  },
  {
    id: "highlights",
    label: "Featured filter",
    file: "featured.ts",
    language: "TypeScript",
    prompt: "Fill the blank so only featured projects are returned.",
    snippet: `const topFour = projects.filter((project) => {\n  return project.featured === ____;\n});`,
    hint: "featured is a boolean property and the filter should keep enabled items.",
    answer: "true",
    accepted: ["true", "boolean true"],
    targetId: "top-projects-node",
    placeholder: "boolean",
  },
  {
    id: "aegis",
    label: "Flagship route",
    file: "route.ts",
    language: "TypeScript",
    prompt: "Complete the route assertion that points south to the flagship.",
    snippet: `const path = [\"projects\", \"flagship\"];\n\npath.at(-1) === \"________\";`,
    hint: "The answer is the final string already present in the path array.",
    answer: "flagship",
    accepted: ["flagship", "\"flagship\"", "'flagship'"],
    targetId: "aegis-node",
    placeholder: "route",
  },
  {
    id: "contact",
    label: "Contact route",
    file: "contact.tsx",
    language: "TSX",
    prompt: "Complete the destination that opens the final contact node.",
    snippet: `if (formIsReady) {\n  navigate(\"/________\");\n}`,
    hint: "The final node contains email, LinkedIn, GitHub, and the résumé.",
    answer: "contact",
    accepted: ["contact", "/contact", "\"contact\"", "'contact'"],
    targetId: "contact-node",
    placeholder: "route",
  },
];

const products: Product[] = [
  {
    name: "Planora",
    category: "INTELLIGENT PLANNING / PRODUCTIVITY",
    status: "PRODUCT COMPLETE",
    description: "A planning and execution product built around the goal → plan → milestones → tasks → schedule → progress lifecycle.",
    note: "Structured plans, milestones, task management, Kanban workflows, scheduling and calendar views, Today-focused execution, search, progress analytics, resources, responsive layouts, persistent local data, and Firebase-ready per-user synchronization boundaries.",
    tags: ["React 19", "TypeScript", "Express 5", "Kanban", "Calendar", "Analytics", "Firebase-ready", "Render"],
    live: "https://planora-zlxv.onrender.com",
    source: "https://github.com/MotherTheresa64/Planora",
  },
  {
    name: "Threadline",
    category: "TEAM KNOWLEDGE / COLLABORATION",
    status: "PRODUCT COMPLETE",
    description: "A collaborative knowledge workspace that keeps conversations connected to decisions and durable documentation.",
    note: "Multi-workspace flows, channels, structured discussions, deep-linked threads, replies and reactions, bookmarks, resolutions, searchable knowledge documents, version history, board/timeline views, inbox/activity workflows, and optional Firestore-backed shared workspaces.",
    tags: ["React 19", "TypeScript", "Express 5", "Search", "Knowledge Base", "Version History", "Firestore-ready", "Render"],
    live: "https://threadline-ga8w.onrender.com",
    source: "https://github.com/MotherTheresa64/Threadline",
  },
  {
    name: "Wanderline",
    category: "COLLABORATIVE TRAVEL PLANNING",
    status: "PRODUCT COMPLETE",
    description: "A collaborative travel-planning application built as one shared source of truth for a trip.",
    note: "Travelers, itinerary workflows, lodging and reservation details, budgets and expenses, packing, saved places, live weather, sharing, privacy-safe demo content, mobile-first navigation, and Google Maps integration.",
    tags: ["React 19", "TypeScript", "Express 5", "Open-Meteo", "Google Maps", "Collaboration", "Firebase-ready", "Render"],
    live: "https://wanderline-s1yv.onrender.com",
    source: "https://github.com/MotherTheresa64/Wanderline",
  },
  {
    name: "Ledgerly",
    category: "PERSONAL FINANCE / FULL-STACK PRODUCT",
    status: "PRODUCT COMPLETE",
    description: "A personal-finance application for accounts, transactions, budgets, savings goals, reports, and cash-flow insight.",
    note: "Financial accounts, transfers, richer transaction models, budgets and goals, reports, CSV import/export with safer partial imports, responsive dark themes, mobile navigation, a Flask REST API, PostgreSQL models, automated tests, and Firebase-ready user-scoped architecture.",
    tags: ["React", "TypeScript", "Python", "Flask", "PostgreSQL", "Firebase-ready", "Pytest", "Render"],
    live: "https://ledgerly-web-knmt.onrender.com",
    source: "https://github.com/MotherTheresa64/Ledgerly",
  },
];

const otherRepos: Repo[] = [
  ["portfolio-website", "Interactive portfolio"],
  ["bottom-dollar", "Mobile savings app"],
  ["Advanced-API-Final", "Deployed Flask API"],
  ["Achievements", "GitHub achievement lab"],
  ["Advanced-Ecommerce-App-Firebase", "Firebase ecommerce"],
  ["Advanced-Ecommerce-App", "Advanced ecommerce"],
  ["Pipeline-Ecommerce", "CI/CD ecommerce"],
  ["Ecommerce-API", "Backend API"],
  ["Advanced-Api-Project", "API project"],
  ["RateLimiting_Caching_API", "API infrastructure"],
  ["Service-Center-CI-CD", "CI/CD exercise"],
  ["Service-Center-Lesson-5", "Service center API"],
  ["Documentation-Testing", "Testing + documentation"],
  ["Task-Manager-Typescript", "TypeScript app"],
  ["Marvel-Character-Fullstack-App", "Full-stack app"],
  ["Pokeapi-Integration-App", "API integration"],
  ["Spotify-Recreate", "Frontend recreation"],
  ["Trivia-Quiz-App", "Interactive quiz"],
  ["Ecom-Product-App", "Product UI"],
  ["Frontend-Specialization-Modules", "Frontend coursework"],
  ["Core-Modules", "Core coursework"],
  ["Defeat-The-Evil-Wizard", "Python exercise"],
  ["Module4-Html-Knowledge-Check", "HTML coursework"],
  ["To-Do-Application", "Frontend exercise"],
  ["Bootstrap-Forms-Utilities", "Bootstrap coursework"],
  ["Event-Center-Website", "Frontend website"],
  ["vercel-deployment-project", "Deployment exercise"],
].map(([name, kind]) => ({ name, kind, url: `https://github.com/MotherTheresa64/${name}` }));

const skillGroups = [
  { title: "Frontend", items: ["React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Vite", "Responsive Design"] },
  { title: "Backend & realtime", items: ["Python", "FastAPI", "Flask", "Node.js", "Express", "REST APIs", "WebSockets", "Celery", "SQLAlchemy"] },
  { title: "Data & messaging", items: ["PostgreSQL", "SQL", "Redis", "SQLite", "Relational Modeling", "Event Fanout", "Caching"] },
  { title: "Security & quality", items: ["RBAC", "Multi-tenant Authorization", "Firebase Authentication", "Validation", "Pytest", "Audit Trails", "User-scoped Data"] },
  { title: "Delivery & operations", items: ["Git", "GitHub", "Docker", "Docker Compose", "GitHub Actions", "CI/CD", "Render", "Vercel", "Swagger / OpenAPI", "Postman"] },
];

const normalize = (value: string) => value.trim().toLowerCase().replace(/\s+/g, " ");

function App() {
  const [mode, setMode] = useState<Mode>("intro");
  const [showRevealConfirm, setShowRevealConfirm] = useState(false);
  const [solved, setSolved] = useState<GateId[]>([]);
  const [revealedAnswers, setRevealedAnswers] = useState<GateId[]>([]);
  const [openGate, setOpenGate] = useState<GateId | null>(null);
  const [view, setView] = useState<ViewId>(null);
  const [pulseGate, setPulseGate] = useState<GateId | null>(null);

  const has = (id: GateId) => mode === "revealed" || solved.includes(id);
  const challengeMode = mode === "challenge";
  const mapVisible = mode !== "intro";

  const progress = useMemo(() => {
    if (mode === "revealed") return 100;
    return Math.round((solved.length / challenges.length) * 100);
  }, [mode, solved.length]);

  const openChallengeMode = () => {
    setShowRevealConfirm(false);
    setMode("challenge");
    window.setTimeout(() => document.getElementById("skills-node")?.scrollIntoView({ behavior: "smooth", block: "center" }), 280);
  };

  const revealAll = () => {
    setShowRevealConfirm(false);
    setOpenGate(null);
    setMode("revealed");
    setSolved(challenges.map((challenge) => challenge.id));
  };

  const completeGate = (id: GateId) => {
    setOpenGate(null);
    setSolved((current) => (current.includes(id) ? current : [...current, id]));
    setPulseGate(id);
    const challenge = challenges.find((item) => item.id === id);
    window.setTimeout(() => {
      if (challenge) document.getElementById(challenge.targetId)?.scrollIntoView({ behavior: "smooth", block: "center" });
      setPulseGate(null);
    }, 720);
  };

  const revealAnswer = (id: GateId) => {
    setRevealedAnswers((current) => (current.includes(id) ? current : [...current, id]));
    window.setTimeout(() => completeGate(id), 1100);
  };

  const nextGate = challenges.find((challenge) => {
    if (has(challenge.id)) return false;
    if (challenge.id === "skills") return challengeMode;
    if (challenge.id === "projects") return has("skills");
    if (["list", "highlights", "aegis"].includes(challenge.id)) return has("projects");
    if (challenge.id === "contact") return has("aegis");
    return false;
  });

  const pulseToNext = () => {
    if (!nextGate) return;
    setPulseGate(nextGate.id);
    if (nextGate.id !== "skills") setOpenGate(nextGate.id);
    const target = nextGate.id === "skills" ? "skills-node" : `gate-${nextGate.id}`;
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => setPulseGate(null), 900);
  };

  const navUnlocked = {
    skills: has("skills"),
    projects: has("projects"),
    capstone: has("aegis"),
    contact: has("contact"),
  };

  return (
    <div className={`portfolio-app mode-${mode}`}>
      <a className="resume-fab" href="/Noah_Ragan_Software_Engineer_Resume.pdf" target="_blank" rel="noreferrer"><FiDownload /><span>Résumé</span></a>

      <AnimatePresence>{mapVisible && <Sidebar mode={mode} openView={setView} unlocked={navUnlocked} />}</AnimatePresence>

      <main className="portfolio-main">
        <section className="map-canvas" aria-label="Interactive portfolio map">
          <HeroCard
            mode={mode}
            showRevealConfirm={showRevealConfirm}
            setShowRevealConfirm={setShowRevealConfirm}
            revealAll={revealAll}
            openChallengeMode={openChallengeMode}
          />

          {mode === "intro" ? (
            <button className="intro-node" type="button" onClick={openChallengeMode} aria-label="Start challenge mode">
              <span />
              <small>start</small>
            </button>
          ) : (
            <>
              <SkillsWorkbench
                unlocked={has("skills")}
                bypassed={mode === "revealed"}
                answerRevealed={revealedAnswers.includes("skills")}
                pulse={pulseGate === "skills"}
                onSolved={completeGate}
                onReveal={revealAnswer}
                onOpenSkills={() => setView("skills")}
              />

              {has("skills") && (
                <VerticalGate
                  challenge={challenges[1]}
                  active={challengeMode && !has("projects")}
                  completed={has("projects")}
                  bypassed={mode === "revealed"}
                  answerRevealed={revealedAnswers.includes("projects")}
                  pulse={pulseGate === "projects"}
                  isOpen={openGate === "projects"}
                  onOpen={() => setOpenGate("projects")}
                  onClose={() => setOpenGate(null)}
                  onSolved={completeGate}
                  onReveal={revealAnswer}
                />
              )}

              <AnimatePresence>
                {has("projects") && (
                  <motion.section
                    className="projects-map"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                  >
                    <div className="project-cross-row">
                      <BranchZone
                        side="left"
                        challenge={challenges[2]}
                        destinationVisible={has("list")}
                        bypassed={mode === "revealed"}
                        answerRevealed={revealedAnswers.includes("list")}
                        pulse={pulseGate === "list"}
                        isOpen={openGate === "list"}
                        onOpen={() => setOpenGate("list")}
                        onClose={() => setOpenGate(null)}
                        onSolved={completeGate}
                        onReveal={revealAnswer}
                      >
                        <SectionCard
                          id="project-list-node"
                          icon={<FiGithub />}
                          title="Other Projects"
                          description="GitHub-style browsing for every other public project outside the Top 4 and Aegis."
                          action="Browse repositories"
                          onClick={() => setView("project-list")}
                        />
                      </BranchZone>

                      <ProjectRootCard onClick={() => setView("projects-root")} />

                      <BranchZone
                        side="right"
                        challenge={challenges[3]}
                        destinationVisible={has("highlights")}
                        bypassed={mode === "revealed"}
                        answerRevealed={revealedAnswers.includes("highlights")}
                        pulse={pulseGate === "highlights"}
                        isOpen={openGate === "highlights"}
                        onOpen={() => setOpenGate("highlights")}
                        onClose={() => setOpenGate(null)}
                        onSolved={completeGate}
                        onReveal={revealAnswer}
                      >
                        <SectionCard
                          id="top-projects-node"
                          icon={<FiAward />}
                          title="Top 4 Projects"
                          description="Planora, Threadline, Wanderline, and Ledgerly — the four finished product builds."
                          action="View Top 4"
                          onClick={() => setView("top-projects")}
                        />
                      </BranchZone>
                    </div>

                    <div className="downstream">
                      <VerticalGate
                        challenge={challenges[4]}
                        active={challengeMode && !has("aegis")}
                        completed={has("aegis")}
                        bypassed={mode === "revealed"}
                        answerRevealed={revealedAnswers.includes("aegis")}
                        pulse={pulseGate === "aegis"}
                        isOpen={openGate === "aegis"}
                        onOpen={() => setOpenGate("aegis")}
                        onClose={() => setOpenGate(null)}
                        onSolved={completeGate}
                        onReveal={revealAnswer}
                      />

                      <AnimatePresence>
                        {has("aegis") && (
                          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}>
                            <SectionCard
                              id="aegis-node"
                              icon={<FiZap />}
                              title="Aegis — Flagship"
                              description="The capstone: a production-oriented real-time incident operations platform in active development."
                              action="Open flagship showcase"
                              wide
                              emphasis
                              onClick={() => setView("aegis")}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {has("aegis") && (
                        <VerticalGate
                          challenge={challenges[5]}
                          active={challengeMode && !has("contact")}
                          completed={has("contact")}
                          bypassed={mode === "revealed"}
                          answerRevealed={revealedAnswers.includes("contact")}
                          pulse={pulseGate === "contact"}
                          isOpen={openGate === "contact"}
                          onOpen={() => setOpenGate("contact")}
                          onClose={() => setOpenGate(null)}
                          onSolved={completeGate}
                          onReveal={revealAnswer}
                        />
                      )}

                      <AnimatePresence>
                        {has("contact") && (
                          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
                            <SectionCard
                              id="contact-node"
                              icon={<FiMail />}
                              title="Contact + Résumé"
                              description="Email, LinkedIn, GitHub, résumé, and a direct contact form."
                              action="Open contact info"
                              onClick={() => setView("contact")}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.section>
                )}
              </AnimatePresence>
            </>
          )}
        </section>

        {mapVisible && (
          <div className="map-progress" aria-label={`Portfolio progress ${progress}%`}>
            <span>{mode === "revealed" ? "Full page revealed" : "Challenge progress"}</span>
            <div><i style={{ width: `${progress}%` }} /></div>
            <b>{progress}%</b>
          </div>
        )}
      </main>

      {mapVisible && (
        <MobileDock
          progress={progress}
          nextGate={nextGate?.label}
          onPulse={pulseToNext}
          openProjects={() => navUnlocked.projects && setView("projects-root")}
          openContact={() => navUnlocked.contact && setView("contact")}
          projectsUnlocked={navUnlocked.projects}
          contactUnlocked={navUnlocked.contact}
        />
      )}

      <AnimatePresence>
        {view && (
          <DetailModal
            view={view}
            onClose={() => setView(null)}
            products={products}
            repos={otherRepos}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function HeroCard({
  mode,
  showRevealConfirm,
  setShowRevealConfirm,
  revealAll,
  openChallengeMode,
}: {
  mode: Mode;
  showRevealConfirm: boolean;
  setShowRevealConfirm: (value: boolean) => void;
  revealAll: () => void;
  openChallengeMode: () => void;
}) {
  return (
    <motion.header
      className="hero-node map-card"
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
    >
      <div className="hero-copy">
        <p className="eyebrow">ROOT / NOAH</p>
        <h1>Noah Ragan</h1>
        <h2>Software Engineer</h2>
        <p className="hero-instructions">
          {mode === "intro"
            ? "Solve each code gate to grow the portfolio path, or reveal the full page immediately."
            : "Solve, request a hint, or reveal an answer. Each completed code gate extends the map to the next section."}
        </p>
      </div>
      <div className="hero-actions">
        <button type="button" className="outline-button" onClick={() => setShowRevealConfirm(true)}>Reveal all</button>
      </div>

      <AnimatePresence>
        {showRevealConfirm && (
          <motion.div
            className="reveal-popover"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6 }}
          >
            <button className="popover-close" onClick={() => setShowRevealConfirm(false)} aria-label="Close"><FiX /></button>
            <h3>Reveal the full page?</h3>
            <p>This bypasses every challenge and reveals the complete map, every section, and every connection.</p>
            <div className="popover-actions">
              <button className="primary-button" type="button" onClick={revealAll}>Reveal all</button>
              <button className="text-button" type="button" onClick={openChallengeMode}>Stay in challenge mode</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function SkillsWorkbench({
  unlocked,
  bypassed,
  answerRevealed,
  pulse,
  onSolved,
  onReveal,
  onOpenSkills,
}: {
  unlocked: boolean;
  bypassed: boolean;
  answerRevealed: boolean;
  pulse: boolean;
  onSolved: (id: GateId) => void;
  onReveal: (id: GateId) => void;
  onOpenSkills: () => void;
}) {
  return (
    <motion.section id="skills-node" className="skills-workbench map-card" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
      <div className={`skills-list-panel ${unlocked ? "is-revealed" : "is-hidden"}`}>
        <div className="workbench-heading"><FiList /><span><strong>Skills List</strong><small>Actual stack</small></span></div>
        <div className="skills-compact">
          {skillGroups.map((group) => (
            <div key={group.title}><b>{group.title}</b><p>{group.items.join(" · ")}</p></div>
          ))}
        </div>
        {!unlocked && <div className="skills-lock-cover"><FiLock /><strong>Skills hidden</strong><span>Repair the CSS on the right to reveal the list.</span></div>}
        {unlocked && <button className="inline-link" type="button" onClick={onOpenSkills}>Open full skills view <FiChevronRight /></button>}
      </div>
      <div className="skills-terminal-panel">
        <div className="workbench-heading"><FiTerminal /><span><strong>CSS Terminal</strong><small>skills.css</small></span></div>
        <ChallengeTerminal
          challenge={challenges[0]}
          bypassed={bypassed}
          completed={unlocked}
          answerRevealed={answerRevealed}
          isOpen
          embedded
          onOpen={() => undefined}
          onClose={() => undefined}
          onSolved={onSolved}
          onReveal={onReveal}
        />
      </div>
      {pulse && <motion.span className="skills-reveal-pulse" initial={{ x: 120, opacity: 0 }} animate={{ x: -120, opacity: [0, 1, 0] }} transition={{ duration: 0.8 }} />}
    </motion.section>
  );
}

function VerticalGate({
  challenge,
  active,
  completed,
  bypassed,
  answerRevealed,
  pulse,
  isOpen,
  onOpen,
  onClose,
  onSolved,
  onReveal,
}: {
  challenge: Challenge;
  active: boolean;
  completed: boolean;
  bypassed: boolean;
  answerRevealed: boolean;
  pulse: boolean;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSolved: (id: GateId) => void;
  onReveal: (id: GateId) => void;
}) {
  return (
    <div className={`vertical-gate ${completed ? "is-complete" : ""}`} id={`gate-${challenge.id}`}>
      <motion.div className="connector vertical" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.6 }} />
      <button className={`node-dot ${active || pulse ? "is-active" : ""} ${completed ? "is-complete" : ""}`} type="button" onClick={onOpen} aria-label={`${challenge.label} node`}>
        {completed ? <FiCheck /> : <span />}
      </button>
      <ChallengeTerminal
        challenge={challenge}
        bypassed={bypassed}
        completed={completed}
        answerRevealed={answerRevealed}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        onSolved={onSolved}
        onReveal={onReveal}
      />
      {pulse && <motion.span className="travel-pulse vertical-pulse" initial={{ y: -45, opacity: 0 }} animate={{ y: 52, opacity: [0, 1, 0] }} transition={{ duration: 0.7 }} />}
    </div>
  );
}

function BranchZone({
  side,
  challenge,
  destinationVisible,
  bypassed,
  answerRevealed,
  pulse,
  isOpen,
  onOpen,
  onClose,
  onSolved,
  onReveal,
  children,
}: {
  side: "left" | "right";
  challenge: Challenge;
  destinationVisible: boolean;
  bypassed: boolean;
  answerRevealed: boolean;
  pulse: boolean;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSolved: (id: GateId) => void;
  onReveal: (id: GateId) => void;
  children: ReactNode;
}) {
  return (
    <div className={`branch-zone branch-${side}`}>
      <div className="branch-gate" id={`gate-${challenge.id}`}>
        <motion.div className="connector horizontal" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.55 }} />
        <button className={`node-dot ${destinationVisible ? "is-complete" : "is-active"}`} type="button" onClick={onOpen} aria-label={`${challenge.label} node`}>
          {destinationVisible ? <FiCheck /> : <span />}
        </button>
        <ChallengeTerminal
          challenge={challenge}
          bypassed={bypassed}
          completed={destinationVisible}
          answerRevealed={answerRevealed}
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          onSolved={onSolved}
          onReveal={onReveal}
          branch={side}
        />
        {pulse && <motion.span className={`travel-pulse branch-pulse ${side}`} initial={{ x: 0, opacity: 0 }} animate={{ x: side === "left" ? -88 : 88, opacity: [0, 1, 0] }} transition={{ duration: 0.7 }} />}
      </div>
      <AnimatePresence>
        {destinationVisible && (
          <motion.div className="branch-destination" initial={{ opacity: 0, x: side === "left" ? 18 : -18 }} animate={{ opacity: 1, x: 0 }}>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ChallengeTerminal({
  challenge,
  bypassed,
  completed,
  answerRevealed,
  isOpen,
  onOpen,
  onClose,
  onSolved,
  onReveal,
  branch,
  embedded,
}: {
  challenge: Challenge;
  bypassed: boolean;
  completed: boolean;
  answerRevealed: boolean;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSolved: (id: GateId) => void;
  onReveal: (id: GateId) => void;
  branch?: "left" | "right";
  embedded?: boolean;
}) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [showHint, setShowHint] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (completed || bypassed) return;
    const normalized = normalize(value);
    const valid = challenge.accepted.some((answer) => normalize(answer) === normalized);
    if (valid) {
      setError("");
      onSolved(challenge.id);
    } else {
      setError("Not quite. Use Hint, try again, or reveal the answer.");
    }
  };

  if (bypassed) {
    if (!embedded) return null;
    return <div className="terminal-inline-complete"><FiCheck /><span><b>{challenge.file}</b><small>Reveal-all bypass active</small></span></div>;
  }

  if (completed && !isOpen && !embedded) {
    return <button className="terminal-collapsed" type="button" onClick={onOpen}><FiCheck /><span>{challenge.file}</span><small>Solved</small></button>;
  }

  if (!isOpen && !embedded) {
    return <button className="terminal-launcher" type="button" onClick={onOpen}><FiTerminal /><span><b>{challenge.file}</b><small>Open code challenge</small></span></button>;
  }

  if (completed && embedded) {
    return <div className="terminal-inline-complete"><FiCheck /><span><b>{challenge.file}</b><small>Skills revealed · answer: {challenge.answer}</small></span></div>;
  }

  return (
    <motion.form
      onSubmit={submit}
      className={`challenge-terminal vscode-terminal ${branch ? `terminal-${branch}` : ""} ${embedded ? "embedded-terminal" : ""} ${completed ? "is-complete" : ""}`}
      initial={{ opacity: 0, scale: 0.97, y: 5 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
    >
      <div className="editor-titlebar">
        <span className="editor-dots"><i /><i /><i /></span>
        <span className="editor-file"><FiCode /> {challenge.file}</span>
        <span className="editor-language">{challenge.language}</span>
        {!embedded && <button type="button" className="editor-close" onClick={onClose} aria-label="Close challenge"><FiX /></button>}
      </div>
      <div className="editor-body">
        <p className="editor-prompt"><b>{challenge.label}</b> — {challenge.prompt}</p>
        <pre><code>{challenge.snippet}</code></pre>
        {showHint && <div className="editor-hint"><span>Hint</span>{challenge.hint}</div>}
        {answerRevealed && <div className="editor-answer"><span>Answer</span><code>{challenge.answer}</code></div>}
        {error && <small className="terminal-error">{error}</small>}
        <div className="editor-answer-row">
          <span>&gt;</span>
          <input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder={challenge.placeholder}
            aria-label={`${challenge.label} answer`}
            autoCapitalize="none"
            autoCorrect="off"
            disabled={completed}
          />
        </div>
      </div>
      <div className="editor-actions">
        {!completed && <button className="editor-solve" type="submit">Solve</button>}
        <button type="button" onClick={() => setShowHint((current) => !current)}>{showHint ? "Hide hint" : "Hint"}</button>
        {!completed && <button type="button" onClick={() => onReveal(challenge.id)}>Reveal answer</button>}
        {completed && <button type="button" onClick={onClose}>Close</button>}
      </div>
    </motion.form>
  );
}

function ProjectRootCard({ onClick }: { onClick: () => void }) {
  return (
    <motion.button id="projects-root" type="button" className="project-root-card map-card" onClick={onClick} whileHover={{ y: -3 }} whileTap={{ scale: 0.99 }}>
      <span className="section-icon"><FiFolder /></span>
      <strong>Projects Root</strong>
      <p>Choose a direction. Each path has a different purpose.</p>
      <div className="root-directions-mini">
        <span><b>← LEFT</b><small>Other GitHub projects</small></span>
        <span><b>RIGHT →</b><small>Top 4 finished apps</small></span>
        <span><b>↓ SOUTH</b><small>Aegis flagship</small></span>
      </div>
      <em>Open map guide <FiChevronRight /></em>
    </motion.button>
  );
}

function SectionCard({
  id,
  icon,
  title,
  description,
  action,
  onClick,
  emphasis,
  wide,
}: {
  id: string;
  icon: ReactNode;
  title: string;
  description: string;
  action: string;
  onClick: () => void;
  emphasis?: boolean;
  wide?: boolean;
}) {
  return (
    <motion.button
      id={id}
      type="button"
      className={`section-card map-card ${emphasis ? "emphasis" : ""} ${wide ? "wide" : ""}`}
      onClick={onClick}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.99 }}
    >
      <span className="section-icon">{icon}</span>
      <strong>{title}</strong>
      <p>{description}</p>
      <em>{action} <FiChevronRight /></em>
    </motion.button>
  );
}

function Sidebar({
  mode,
  openView,
  unlocked,
}: {
  mode: Mode;
  openView: (view: ViewId) => void;
  unlocked: { skills: boolean; projects: boolean; capstone: boolean; contact: boolean };
}) {
  const items = [
    { label: "Home", icon: <FiHome />, unlocked: true, action: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
    { label: "Skills", icon: <FiCode />, unlocked: unlocked.skills, action: () => openView("skills") },
    { label: "Projects", icon: <FiFolder />, unlocked: unlocked.projects, action: () => openView("projects-root") },
    { label: "Capstone", icon: <FiAward />, unlocked: unlocked.capstone, action: () => openView("aegis") },
    { label: "Contact", icon: <FiMail />, unlocked: unlocked.contact, action: () => openView("contact") },
  ];

  return (
    <motion.aside className="sidebar" initial={{ x: -90, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -90, opacity: 0 }}>
      <button className="brand-mark" type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>NR</button>
      <nav>
        {items.map((item) => (
          <button key={item.label} type="button" onClick={item.action} disabled={!item.unlocked} title={item.unlocked ? item.label : `${item.label} is still locked`}>
            {item.icon}<span>{item.label}</span>{!item.unlocked && <FiLock className="nav-lock" />}
          </button>
        ))}
      </nav>
      <a className="sidebar-resume" href="/Noah_Ragan_Software_Engineer_Resume.pdf" target="_blank" rel="noreferrer"><FiDownload /><span>Résumé</span></a>
      <div className="sidebar-mode"><FiZap /><span>{mode === "revealed" ? "REVEALED" : "CHALLENGE"}<small>MODE</small></span></div>
    </motion.aside>
  );
}

function MobileDock({
  progress,
  nextGate,
  onPulse,
  openProjects,
  openContact,
  projectsUnlocked,
  contactUnlocked,
}: {
  progress: number;
  nextGate?: string;
  onPulse: () => void;
  openProjects: () => void;
  openContact: () => void;
  projectsUnlocked: boolean;
  contactUnlocked: boolean;
}) {
  return (
    <div className="mobile-dock">
      <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><FiHome /><span>Home</span></button>
      <button type="button" onClick={openProjects} disabled={!projectsUnlocked}><FiFolder /><span>Root</span></button>
      <button className="signal-button" type="button" onClick={onPulse} disabled={!nextGate} aria-label="Jump to next challenge">
        <span className="signal-ring"><FiZap /></span>
        <small>{nextGate ? `Next: ${nextGate}` : `${progress}% complete`}</small>
      </button>
      <a href="/Noah_Ragan_Software_Engineer_Resume.pdf" target="_blank" rel="noreferrer"><FiDownload /><span>Résumé</span></a>
      <button type="button" onClick={openContact} disabled={!contactUnlocked}><FiMail /><span>Contact</span></button>
    </div>
  );
}

function DetailModal({
  view,
  onClose,
  products,
  repos,
}: {
  view: Exclude<ViewId, null>;
  onClose: () => void;
  products: Product[];
  repos: Repo[];
}) {
  return (
    <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <motion.section className="detail-modal" initial={{ opacity: 0, y: 26, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18 }}>
        <button className="modal-close" type="button" onClick={onClose} aria-label="Close details"><FiX /></button>
        {view === "skills" && <SkillsView />}
        {view === "project-list" && <ProjectListView repos={repos} />}
        {view === "projects-root" && <ProjectsRootView />}
        {view === "top-projects" && <TopProjectsView products={products} />}
        {view === "aegis" && <AegisView />}
        {view === "contact" && <ContactView />}
      </motion.section>
    </motion.div>
  );
}

function ModalHeading({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return <header className="modal-heading"><span>{eyebrow}</span><h2>{title}</h2>{children && <p>{children}</p>}</header>;
}

function SkillsView() {
  return (
    <div>
      <ModalHeading eyebrow="SKILLS" title="Tools I use to build, ship, and operate software." />
      <div className="skills-grid">
        {skillGroups.map((group) => <article key={group.title}><h3>{group.title}</h3><div>{group.items.map((item) => <span key={item}>{item}</span>)}</div></article>)}
      </div>
    </div>
  );
}

function ProjectListView({ repos }: { repos: Repo[] }) {
  return (
    <div>
      <ModalHeading eyebrow="OTHER PROJECTS" title="GitHub-style repository browser">Everything outside the Top 4 and Aegis lives on this branch.</ModalHeading>
      <div className="repo-browser-head"><span><FiGithub /> MotherTheresa64</span><b>{repos.length} repositories</b><a href="https://github.com/MotherTheresa64?tab=repositories" target="_blank" rel="noreferrer">Open GitHub <FiExternalLink /></a></div>
      <div className="repo-browser compact-repos">
        {repos.map((repo) => (
          <article key={repo.name}>
            <div><FiFolder /><span><strong>{repo.name}</strong><small>{repo.kind}</small></span></div>
            <p>Public repository in the broader project and coursework archive.</p>
            <span className="status-chip">PUBLIC</span>
            <div className="repo-links"><a href={repo.url} target="_blank" rel="noreferrer">Source <FiGithub /></a></div>
          </article>
        ))}
      </div>
    </div>
  );
}

function ProjectsRootView() {
  return (
    <div>
      <ModalHeading eyebrow="PROJECTS ROOT" title="Three directions, three different views of the work.">The map intentionally separates breadth, finished product work, and the flagship system instead of putting everything in one project grid.</ModalHeading>
      <div className="root-directions">
        <article><span>← LEFT</span><h3>Other Projects</h3><p>A GitHub-style repository browser containing the rest of the public project archive, excluding the Top 4 and Aegis.</p></article>
        <article><span>RIGHT →</span><h3>Top 4 Products</h3><p>Planora, Threadline, Wanderline, and Ledgerly — four product-complete applications with live demos and source.</p></article>
        <article><span>↓ SOUTH</span><h3>Aegis Flagship</h3><p>The capstone path leads into Aegis, then continues one final node south into contact information and the résumé.</p></article>
      </div>
    </div>
  );
}

function TopProjectsView({ products }: { products: Product[] }) {
  return (
    <div>
      <ModalHeading eyebrow="TOP 4 · PRODUCT COMPLETE" title="The four finished applications I want reviewed first." />
      <div className="highlight-grid top-four-grid">
        {products.map((product) => (
          <article key={product.name}>
            <span>{product.status}</span>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className="project-detail-note">{product.note}</p>
            <div className="tag-row">{product.tags.map((tag) => <i key={tag}>{tag}</i>)}</div>
            <div className="project-card-actions"><a href={product.live} target="_blank" rel="noreferrer">Live demo <FiExternalLink /></a><a href={product.source} target="_blank" rel="noreferrer">Source <FiGithub /></a></div>
          </article>
        ))}
      </div>
    </div>
  );
}

function AegisView() {
  const pillars = [
    ["Realtime + async", "WebSockets, Redis-backed fanout, Celery workers, retries, and failure handling."],
    ["Multi-tenant security", "Organizations, memberships, RBAC, audit history, API keys, and organization-scoped authorization."],
    ["Production data", "PostgreSQL remains authoritative while Redis is limited to cache, queue, rate-limit, and fanout state."],
    ["Production engineering", "Dockerized infrastructure, CI/CD, observability-ready instrumentation, workers, and a Terraform deployment path."],
  ];
  return (
    <div>
      <ModalHeading eyebrow="AEGIS · FLAGSHIP / CAPSTONE" title="Real-Time Incident Operations Platform">Aegis is the systems-focused capstone: a multi-tenant platform for service health, alert ingestion, incident coordination, realtime collaboration, public status communication, audit history, and postmortems.</ModalHeading>
      <div className="aegis-grid">{pillars.map(([title, text]) => <article key={title}><FiZap /><h3>{title}</h3><p>{text}</p></article>)}</div>
      <div className="tag-row large">{["React", "TypeScript", "FastAPI", "Python", "PostgreSQL", "SQLAlchemy", "Redis", "WebSockets", "Celery", "Docker", "GitHub Actions"].map((tag) => <i key={tag}>{tag}</i>)}</div>
      <div className="modal-actions"><a href="https://github.com/MotherTheresa64/Aegis" target="_blank" rel="noreferrer"><FiGithub /> Source code</a><a href="https://github.com/MotherTheresa64/Aegis/tree/build/foundation" target="_blank" rel="noreferrer">Foundation branch <FiExternalLink /></a></div>
    </div>
  );
}

function ContactView() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    try {
      const response = await fetch("https://formspree.io/f/mrbkdgvz", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Unable to send message");
      setFormData({ name: "", email: "", message: "" });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };
  return (
    <div>
      <ModalHeading eyebrow="CONTACT + RÉSUMÉ" title="The final node.">Email, professional profiles, the current résumé, and a direct contact form all live here.</ModalHeading>
      <div className="contact-grid">
        <div className="contact-links">
          <a className="resume-contact-link" href="/Noah_Ragan_Software_Engineer_Resume.pdf" target="_blank" rel="noreferrer"><FiDownload /> Download résumé</a>
          <a href="mailto:noah.j.ragan@gmail.com"><FiMail /> noah.j.ragan@gmail.com</a>
          <a href="https://www.linkedin.com/in/njragandev/" target="_blank" rel="noreferrer"><FiLinkedin /> LinkedIn</a>
          <a href="https://github.com/MotherTheresa64" target="_blank" rel="noreferrer"><FiGithub /> GitHub</a>
        </div>
        <form onSubmit={handleSubmit}>
          <label>Name<input required value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} /></label>
          <label>Email<input required type="email" value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} /></label>
          <label>Message<textarea required rows={5} value={formData.message} onChange={(event) => setFormData({ ...formData, message: event.target.value })} /></label>
          <button type="submit" className="primary-button" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send message"}</button>
          {status === "sent" && <p className="form-success">Message sent. Thanks!</p>}
          {status === "error" && <p className="form-error">That didn’t send. Email me directly instead.</p>}
        </form>
      </div>
    </div>
  );
}

export default App;
