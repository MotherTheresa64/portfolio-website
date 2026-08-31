import { useMemo, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiAward,
  FiBookOpen,
  FiCheck,
  FiChevronRight,
  FiCode,
  FiDownload,
  FiExternalLink,
  FiFolder,
  FiGithub,
  FiHome,
  FiImage,
  FiLinkedin,
  FiList,
  FiLock,
  FiMail,
  FiMap,
  FiTerminal,
  FiUser,
  FiX,
  FiZap,
} from "react-icons/fi";

type GateId = "skills" | "projects" | "list" | "highlights" | "gallery" | "contact";
type Mode = "intro" | "challenge" | "revealed";
type ViewId = "profile" | "skills" | "project-list" | "projects-root" | "highlights" | "gallery" | "aegis" | "contact" | null;

type Challenge = {
  id: GateId;
  label: string;
  prompt: string;
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

const challenges: Challenge[] = [
  {
    id: "skills",
    label: "CSS gate",
    prompt: "Hide an element and remove it from layout. Enter the CSS declaration.",
    answer: "display: none;",
    accepted: ["display:none", "display: none", "display:none;", "display: none;", "none"],
    targetId: "skills-node",
    placeholder: "display: ...",
  },
  {
    id: "projects",
    label: "Logic gate",
    prompt: "In JavaScript, what does true && true evaluate to?",
    answer: "true",
    accepted: ["true", "boolean true"],
    targetId: "projects-root",
    placeholder: "true / false",
  },
  {
    id: "list",
    label: "Git gate",
    prompt: "Which Git command lists local and remote branches?",
    answer: "git branch -a",
    accepted: ["git branch -a", "git branch --all"],
    targetId: "project-list-node",
    placeholder: "git ...",
  },
  {
    id: "highlights",
    label: "JS gate",
    prompt: "What does 2 ** 5 evaluate to in JavaScript?",
    answer: "32",
    accepted: ["32"],
    targetId: "highlight-node",
    placeholder: "number",
  },
  {
    id: "gallery",
    label: "SQL gate",
    prompt: "Write the SQL statement that selects every row from projects.",
    answer: "SELECT * FROM projects;",
    accepted: ["select * from projects", "select * from projects;"],
    targetId: "gallery-node",
    placeholder: "SELECT ...",
  },
  {
    id: "contact",
    label: "HTTP gate",
    prompt: "Which HTTP status code means OK?",
    answer: "200",
    accepted: ["200", "200 ok", "ok 200"],
    targetId: "contact-node",
    placeholder: "status code",
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
  const [view, setView] = useState<ViewId>(null);
  const [selectedProduct, setSelectedProduct] = useState(0);
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
    window.setTimeout(() => document.getElementById("gate-skills")?.scrollIntoView({ behavior: "smooth", block: "center" }), 280);
  };

  const revealAll = () => {
    setShowRevealConfirm(false);
    setMode("revealed");
    setSolved(challenges.map((challenge) => challenge.id));
  };

  const completeGate = (id: GateId) => {
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
    window.setTimeout(() => completeGate(id), 650);
  };

  const nextGate = challenges.find((challenge) => {
    if (has(challenge.id)) return false;
    if (challenge.id === "skills") return challengeMode;
    if (challenge.id === "projects") return has("skills");
    if (["list", "highlights", "gallery"].includes(challenge.id)) return has("projects");
    if (challenge.id === "contact") return has("gallery");
    return false;
  });

  const pulseToNext = () => {
    if (!nextGate) return;
    setPulseGate(nextGate.id);
    document.getElementById(`gate-${nextGate.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => setPulseGate(null), 900);
  };

  const navUnlocked = {
    skills: has("skills"),
    projects: has("projects"),
    capstone: has("highlights"),
    contact: has("contact"),
  };

  return (
    <div className={`portfolio-app mode-${mode}`}>
      <AnimatePresence>{mapVisible && <Sidebar mode={mode} openView={setView} unlocked={navUnlocked} />}</AnimatePresence>

      <main className="portfolio-main">
        <section className="map-canvas" aria-label="Interactive portfolio map">
          <HeroCard
            mode={mode}
            showRevealConfirm={showRevealConfirm}
            setShowRevealConfirm={setShowRevealConfirm}
            revealAll={revealAll}
            openChallengeMode={openChallengeMode}
            openProfile={() => mapVisible && setView("profile")}
          />

          {mode === "intro" ? (
            <button className="intro-node" type="button" onClick={openChallengeMode} aria-label="Start challenge mode">
              <span />
              <small>start</small>
            </button>
          ) : (
            <>
              <VerticalGate
                challenge={challenges[0]}
                active={challengeMode && !has("skills")}
                completed={has("skills")}
                bypassed={mode === "revealed"}
                answerRevealed={revealedAnswers.includes("skills")}
                pulse={pulseGate === "skills"}
                onSolved={completeGate}
                onReveal={revealAnswer}
              />

              <AnimatePresence>
                {has("skills") && (
                  <motion.section
                    id="skills-node"
                    className="map-card skills-split"
                    initial={{ opacity: 0, y: -12, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.45 }}
                  >
                    <button className="split-panel" type="button" onClick={() => setView("skills")}>
                      <FiList />
                      <strong>Skills List</strong>
                      <span>Browse the stack I use to build, ship, and operate software.</span>
                      <em>View skills <FiChevronRight /></em>
                    </button>
                    <button className="split-panel terminal-side" type="button" onClick={() => setView("skills")}>
                      <FiTerminal />
                      <strong>CSS Terminal</strong>
                      <span className="code-copy">.skills &#123; display: grid; &#125;</span>
                      <em>Inspect stack <FiChevronRight /></em>
                    </button>
                  </motion.section>
                )}
              </AnimatePresence>

              {has("skills") && (
                <VerticalGate
                  challenge={challenges[1]}
                  active={challengeMode && !has("projects")}
                  completed={has("projects")}
                  bypassed={mode === "revealed"}
                  answerRevealed={revealedAnswers.includes("projects")}
                  pulse={pulseGate === "projects"}
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
                        onSolved={completeGate}
                        onReveal={revealAnswer}
                      >
                        <SectionCard
                          id="project-list-node"
                          icon={<FiGithub />}
                          title="Project List"
                          description="GitHub-style visual navigation for the complete project catalog."
                          action="Browse projects"
                          onClick={() => setView("project-list")}
                        />
                      </BranchZone>

                      <SectionCard
                        id="projects-root"
                        icon={<FiFolder />}
                        title="Projects Root"
                        description="The central hub for shipped products, systems work, experiments, and source."
                        action="Open root"
                        emphasis
                        onClick={() => setView("projects-root")}
                      />

                      <BranchZone
                        side="right"
                        challenge={challenges[3]}
                        destinationVisible={has("highlights")}
                        bypassed={mode === "revealed"}
                        answerRevealed={revealedAnswers.includes("highlights")}
                        pulse={pulseGate === "highlights"}
                        onSolved={completeGate}
                        onReveal={revealAnswer}
                      >
                        <SectionCard
                          id="highlight-node"
                          icon={<FiAward />}
                          title="Highlighted Projects"
                          description="Aegis and the strongest product work, with deeper engineering context."
                          action="View highlights"
                          onClick={() => setView("highlights")}
                        />
                      </BranchZone>
                    </div>

                    <div className="downstream">
                      <VerticalGate
                        challenge={challenges[4]}
                        active={challengeMode && !has("gallery")}
                        completed={has("gallery")}
                        bypassed={mode === "revealed"}
                        answerRevealed={revealedAnswers.includes("gallery")}
                        pulse={pulseGate === "gallery"}
                        onSolved={completeGate}
                        onReveal={revealAnswer}
                      />

                      <AnimatePresence>
                        {has("gallery") && (
                          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}>
                            <SectionCard
                              id="gallery-node"
                              icon={<FiImage />}
                              title="Project Gallery"
                              description="Built-in previews for the four finished products and the active capstone."
                              action="Open gallery"
                              wide
                              onClick={() => setView("gallery")}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {has("gallery") && (
                        <VerticalGate
                          challenge={challenges[5]}
                          active={challengeMode && !has("contact")}
                          completed={has("contact")}
                          bypassed={mode === "revealed"}
                          answerRevealed={revealedAnswers.includes("contact")}
                          pulse={pulseGate === "contact"}
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
                              title="Contact Info"
                              description="Let’s connect and build something useful."
                              action="Get in touch"
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
          openProjects={() => navUnlocked.projects && setView("project-list")}
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
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
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
  openProfile,
}: {
  mode: Mode;
  showRevealConfirm: boolean;
  setShowRevealConfirm: (value: boolean) => void;
  revealAll: () => void;
  openChallengeMode: () => void;
  openProfile: () => void;
}) {
  return (
    <motion.header
      className={`hero-node map-card ${mode !== "intro" ? "is-interactive" : ""}`}
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      onDoubleClick={openProfile}
    >
      <div className="hero-copy">
        <p className="eyebrow">ROOT / NOAH</p>
        <h1>Noah Ragan</h1>
        <h2>Software Engineer</h2>
        <p className="hero-instructions">
          {mode === "intro"
            ? "Navigate by solving the terminal gates. Select the node below to begin, or reveal the full portfolio instantly."
            : "Solve each terminal to extend the path. Every revealed section opens into the full portfolio content."}
        </p>
      </div>
      <div className="hero-actions">
        {mode !== "intro" && <button type="button" className="text-button" onClick={openProfile}>Profile</button>}
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
            <p>This bypasses every challenge and reveals all sections, connections, and project details.</p>
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

function VerticalGate({
  challenge,
  active,
  completed,
  bypassed,
  answerRevealed,
  pulse,
  onSolved,
  onReveal,
}: {
  challenge: Challenge;
  active: boolean;
  completed: boolean;
  bypassed: boolean;
  answerRevealed: boolean;
  pulse: boolean;
  onSolved: (id: GateId) => void;
  onReveal: (id: GateId) => void;
}) {
  return (
    <div className={`vertical-gate ${completed ? "is-complete" : ""}`} id={`gate-${challenge.id}`}>
      <motion.div className="connector vertical" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.6 }} />
      <button className={`node-dot ${active || pulse ? "is-active" : ""} ${completed ? "is-complete" : ""}`} type="button" aria-label={`${challenge.label} node`}>
        {completed ? <FiCheck /> : <span />}
      </button>
      <AnimatePresence>
        {(active || bypassed || completed) && (
          <ChallengeTerminal
            challenge={challenge}
            bypassed={bypassed}
            completed={completed}
            answerRevealed={answerRevealed}
            onSolved={onSolved}
            onReveal={onReveal}
          />
        )}
      </AnimatePresence>
      {pulse && <motion.span className="travel-pulse vertical-pulse" initial={{ y: -32, opacity: 0 }} animate={{ y: 36, opacity: [0, 1, 0] }} transition={{ duration: 0.7 }} />}
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
  onSolved: (id: GateId) => void;
  onReveal: (id: GateId) => void;
  children: ReactNode;
}) {
  return (
    <div className={`branch-zone branch-${side}`}>
      <div className="branch-gate" id={`gate-${challenge.id}`}>
        <motion.div className="connector horizontal" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.55 }} />
        <button className={`node-dot ${destinationVisible ? "is-complete" : "is-active"}`} type="button" aria-label={`${challenge.label} node`}>
          {destinationVisible ? <FiCheck /> : <span />}
        </button>
        <ChallengeTerminal
          challenge={challenge}
          bypassed={bypassed}
          completed={destinationVisible}
          answerRevealed={answerRevealed}
          onSolved={onSolved}
          onReveal={onReveal}
          branch={side}
        />
        {pulse && <motion.span className={`travel-pulse branch-pulse ${side}`} initial={{ x: 0, opacity: 0 }} animate={{ x: side === "left" ? -78 : 78, opacity: [0, 1, 0] }} transition={{ duration: 0.7 }} />}
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
  onSolved,
  onReveal,
  branch,
}: {
  challenge: Challenge;
  bypassed: boolean;
  completed: boolean;
  answerRevealed: boolean;
  onSolved: (id: GateId) => void;
  onReveal: (id: GateId) => void;
  branch?: "left" | "right";
}) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (completed || bypassed) return;
    const normalized = normalize(value);
    const valid = challenge.accepted.some((answer) => normalize(answer) === normalized);
    if (valid) {
      setError("");
      onSolved(challenge.id);
    } else {
      setError("Not quite — try again or reveal the answer.");
    }
  };

  return (
    <motion.form
      onSubmit={submit}
      className={`challenge-terminal ${branch ? `terminal-${branch}` : ""} ${completed ? "is-complete" : ""}`}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="terminal-head">
        <span><FiTerminal /> {challenge.label}</span>
        <i>{bypassed ? "BYPASSED" : completed ? "SOLVED" : "ACTIVE"}</i>
      </div>
      <p>{challenge.prompt}</p>
      {!bypassed && !completed && (
        <div className="terminal-input-row">
          <span>&gt;</span>
          <input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder={challenge.placeholder}
            aria-label={`${challenge.label} answer`}
            autoCapitalize="none"
            autoCorrect="off"
          />
          <button type="submit">Solve</button>
        </div>
      )}
      {answerRevealed && <code className="revealed-answer">{challenge.answer}</code>}
      {error && <small className="terminal-error">{error}</small>}
      <div className="terminal-foot">
        {!bypassed && !completed && <button type="button" onClick={() => onReveal(challenge.id)}>Reveal answer</button>}
        {(bypassed || completed) && <span><FiCheck /> Path open</span>}
      </div>
    </motion.form>
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
    { label: "Projects", icon: <FiFolder />, unlocked: unlocked.projects, action: () => openView("project-list") },
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
      <button type="button" onClick={openProjects} disabled={!projectsUnlocked}><FiFolder /><span>Projects</span></button>
      <button className="signal-button" type="button" onClick={onPulse} disabled={!nextGate} aria-label="Jump to next challenge">
        <span className="signal-ring"><FiZap /></span>
        <small>{nextGate ? `Next: ${nextGate}` : `${progress}% complete`}</small>
      </button>
      <button type="button" onClick={openContact} disabled={!contactUnlocked}><FiMail /><span>Contact</span></button>
    </div>
  );
}

function DetailModal({
  view,
  onClose,
  products,
  selectedProduct,
  setSelectedProduct,
}: {
  view: Exclude<ViewId, null>;
  onClose: () => void;
  products: Product[];
  selectedProduct: number;
  setSelectedProduct: (index: number) => void;
}) {
  return (
    <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <motion.section className="detail-modal" initial={{ opacity: 0, y: 26, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18 }}>
        <button className="modal-close" type="button" onClick={onClose} aria-label="Close details"><FiX /></button>
        {view === "profile" && <ProfileView />}
        {view === "skills" && <SkillsView />}
        {view === "project-list" && <ProjectListView products={products} />}
        {view === "projects-root" && <ProjectsRootView products={products} />}
        {view === "highlights" && <HighlightsView products={products} onOpenAegis={() => {}} />}
        {view === "gallery" && <GalleryView products={products} selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} />}
        {view === "aegis" && <AegisView />}
        {view === "contact" && <ContactView />}
      </motion.section>
    </motion.div>
  );
}

function ModalHeading({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return <header className="modal-heading"><span>{eyebrow}</span><h2>{title}</h2>{children && <p>{children}</p>}</header>;
}

function ProfileView() {
  return (
    <div>
      <ModalHeading eyebrow="PROFILE" title="Noah Ragan">Full Stack Software Engineer focused on product-minded interfaces, APIs, realtime systems, relational data, testing, and cloud delivery.</ModalHeading>
      <div className="profile-grid">
        <article><FiUser /><h3>Current focus</h3><p>Building Aegis as a production-oriented realtime incident operations capstone while keeping four finished product applications recruiter-ready.</p></article>
        <article><FiBookOpen /><h3>Training</h3><p>Coding Temple — Software Engineer Apprenticeship / Full-Stack Development, 2026.</p></article>
        <article><FiMap /><h3>Experience</h3><p>Enterprise Mobility — Reservation Specialist, remote (Sep 2024 – Mar 2025). Tractor Supply Company — Team Member (May 2026 – Aug 2026).</p></article>
        <article><FiCode /><h3>Education</h3><p>Union Adventist University — Computer Science & Mathematics coursework.</p></article>
      </div>
      <div className="modal-actions"><a href="/Noah_Ragan_Software_Engineer_Resume.pdf" target="_blank" rel="noreferrer"><FiDownload /> Resume</a><a href="https://github.com/MotherTheresa64" target="_blank" rel="noreferrer"><FiGithub /> GitHub</a><a href="https://www.linkedin.com/in/njragandev/" target="_blank" rel="noreferrer"><FiLinkedin /> LinkedIn</a></div>
    </div>
  );
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

function ProjectListView({ products }: { products: Product[] }) {
  return (
    <div>
      <ModalHeading eyebrow="PROJECT LIST" title="Repository browser">A simple GitHub-style index for the work behind the portfolio.</ModalHeading>
      <div className="repo-browser">
        {[...products, {
          name: "Aegis", category: "CAPSTONE / SYSTEMS", status: "ACTIVE DEVELOPMENT", description: "Realtime incident operations platform.", note: "FastAPI, PostgreSQL, Redis, WebSockets, Celery, Docker, CI/CD.", tags: ["React", "TypeScript", "FastAPI", "PostgreSQL", "Redis"], live: "", source: "https://github.com/MotherTheresa64/Aegis"
        }].map((project) => (
          <article key={project.name}>
            <div><FiFolder /><span><strong>{project.name}</strong><small>{project.category}</small></span></div>
            <p>{project.description}</p>
            <span className="status-chip">{project.status}</span>
            <div className="repo-links">{project.live && <a href={project.live} target="_blank" rel="noreferrer">Live <FiExternalLink /></a>}<a href={project.source} target="_blank" rel="noreferrer">Source <FiGithub /></a></div>
          </article>
        ))}
      </div>
    </div>
  );
}

function ProjectsRootView({ products }: { products: Product[] }) {
  return (
    <div>
      <ModalHeading eyebrow="PROJECTS ROOT" title="Five substantial builds, four product-complete." />
      <div className="root-stats"><article><b>4</b><span>Product-complete apps</span></article><article><b>1</b><span>Active capstone</span></article><article><b>Full stack</b><span>Frontend → API → data → delivery</span></article></div>
      <div className="root-list">{products.map((product) => <a key={product.name} href={product.live} target="_blank" rel="noreferrer"><span>{product.name}</span><small>{product.category}</small><FiExternalLink /></a>)}</div>
    </div>
  );
}

function HighlightsView({ products }: { products: Product[]; onOpenAegis: () => void }) {
  return (
    <div>
      <ModalHeading eyebrow="HIGHLIGHTS" title="The work I want reviewed first." />
      <article className="aegis-highlight">
        <div><span>AEGIS · ACTIVE DEVELOPMENT</span><h3>Real-Time Incident Operations Platform</h3><p>Multi-tenant incident operations with realtime collaboration, asynchronous workers, PostgreSQL as the source of truth, Redis for ephemeral state, auditability, service health, status pages, and production engineering discipline.</p></div>
        <a href="https://github.com/MotherTheresa64/Aegis" target="_blank" rel="noreferrer">Source <FiExternalLink /></a>
      </article>
      <div className="highlight-grid">{products.map((product) => <article key={product.name}><span>{product.status}</span><h3>{product.name}</h3><p>{product.description}</p><a href={product.live} target="_blank" rel="noreferrer">Live demo <FiExternalLink /></a></article>)}</div>
    </div>
  );
}

function GalleryView({ products, selectedProduct, setSelectedProduct }: { products: Product[]; selectedProduct: number; setSelectedProduct: (index: number) => void }) {
  const items = [{
    name: "Aegis", category: "CAPSTONE / ACTIVE DEVELOPMENT", status: "SYSTEMS CAPSTONE", description: "A production-oriented realtime incident operations platform.", note: "Organizations, RBAC, alert normalization, incident coordination, WebSockets, Celery, Redis, PostgreSQL, observability, Docker, CI/CD, and Terraform path.", tags: ["React", "TypeScript", "FastAPI", "PostgreSQL", "Redis", "WebSockets", "Celery", "Docker"], live: "", source: "https://github.com/MotherTheresa64/Aegis"
  }, ...products];
  const item = items[selectedProduct % items.length];
  return (
    <div>
      <ModalHeading eyebrow="PROJECT GALLERY" title="Browse the portfolio without leaving the map." />
      <div className="gallery-tabs">{items.map((project, index) => <button type="button" key={project.name} className={index === selectedProduct ? "active" : ""} onClick={() => setSelectedProduct(index)}>{project.name}</button>)}</div>
      <motion.article key={item.name} className="gallery-stage" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}>
        <div className="gallery-window"><span>{item.category}</span><h3>{item.name}</h3><p>{item.description}</p><p className="gallery-note">{item.note}</p><div className="tag-row">{item.tags.map((tag) => <i key={tag}>{tag}</i>)}</div></div>
        <div className="gallery-actions">{item.live && <a href={item.live} target="_blank" rel="noreferrer">Open live <FiExternalLink /></a>}<a href={item.source} target="_blank" rel="noreferrer">Source <FiGithub /></a></div>
      </motion.article>
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
      <ModalHeading eyebrow="CONTACT" title="Let’s build something useful.">Open to remote Full Stack, Frontend, Backend, and Software Engineer opportunities.</ModalHeading>
      <div className="contact-grid">
        <div className="contact-links"><a href="mailto:noah.j.ragan@gmail.com"><FiMail /> noah.j.ragan@gmail.com</a><a href="https://www.linkedin.com/in/njragandev/" target="_blank" rel="noreferrer"><FiLinkedin /> LinkedIn</a><a href="https://github.com/MotherTheresa64" target="_blank" rel="noreferrer"><FiGithub /> GitHub</a><a href="/Noah_Ragan_Software_Engineer_Resume.pdf" target="_blank" rel="noreferrer"><FiDownload /> Resume</a></div>
        <form onSubmit={handleSubmit}><label>Name<input required value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} /></label><label>Email<input required type="email" value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} /></label><label>Message<textarea required rows={5} value={formData.message} onChange={(event) => setFormData({ ...formData, message: event.target.value })} /></label><button type="submit" className="primary-button" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send message"}</button>{status === "sent" && <p className="form-success">Message sent. Thanks!</p>}{status === "error" && <p className="form-error">That didn’t send. Email me directly instead.</p>}</form>
      </div>
    </div>
  );
}

export default App;
