import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  FiArrowRight,
  FiAward,
  FiCheck,
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
  FiPlay,
  FiTerminal,
  FiZap,
} from "react-icons/fi";
import type { ReactNode } from "react";
import { ChallengeCard } from "./components/ChallengeCard";
import { DetailDialog } from "./components/DetailDialog";
import { PortfolioView } from "./components/PortfolioViews";
import { getDirectionalCopy, getNextGate, getProgress } from "./challenge-engine";
import {
  GITHUB_URL,
  LINKEDIN_URL,
  RESUME_URL,
  challenges,
  products,
  skillGroups,
} from "./portfolio-data";
import type { GateId, PortfolioMode, ViewId } from "./portfolio-data";
import { useCompactLayout } from "./hooks/useCompactLayout";

const ALL_GATES = challenges.map((challenge) => challenge.id);

const viewMeta: Record<ViewId, { eyebrow: string; title: string; description: string }> = {
  skills: {
    eyebrow: "SKILLS",
    title: "Tools I use to build and ship software",
    description: "A compact view of the frontend, backend, data, security, and delivery stack represented across the projects.",
  },
  "project-list": {
    eyebrow: "MORE PROJECTS",
    title: "The broader GitHub archive",
    description: "Additional public repositories stay available for breadth without diluting the strongest recruiter-facing work.",
  },
  "projects-root": {
    eyebrow: "PROJECT ROUTES",
    title: "Three paths, three different signals",
    description: "The portfolio separates breadth, featured product work, and the Aegis flagship so the hierarchy stays obvious.",
  },
  "top-projects": {
    eyebrow: "FEATURED PRODUCTS",
    title: "Four substantial products with distinct engineering identities",
    description: "The status and implementation notes below deliberately distinguish what is live today from what is still an integration boundary.",
  },
  aegis: {
    eyebrow: "AEGIS · FLAGSHIP",
    title: "Real-Time Incident Operations Platform",
    description: "The systems-focused capstone: multi-tenant incident operations, realtime collaboration, async work, security controls, observability, and production deployment concerns.",
  },
  contact: {
    eyebrow: "CONTACT + RESUME",
    title: "A direct path to the next conversation",
    description: "Resume, email, LinkedIn, GitHub, and a contact form remain reachable without solving a challenge.",
  },
};

function App() {
  const [mode, setMode] = useState<PortfolioMode>("intro");
  const [completed, setCompleted] = useState<Set<GateId>>(() => new Set());
  const [openGate, setOpenGate] = useState<GateId | null>(null);
  const [view, setView] = useState<ViewId | null>(null);
  const compact = useCompactLayout();
  const reduceMotion = useReducedMotion();
  const directions = getDirectionalCopy(compact);

  const has = (id: GateId) => mode === "revealed" || completed.has(id);
  const progress = getProgress(completed, mode, challenges.length);
  const nextGate = getNextGate(completed, mode);

  const completedCount = mode === "revealed" ? challenges.length : completed.size;
  const nav = [
    { label: "Skills", view: "skills" as const, unlocked: has("skills"), icon: <FiCode /> },
    { label: "Projects", view: "projects-root" as const, unlocked: has("projects"), icon: <FiFolder /> },
    { label: "Aegis", view: "aegis" as const, unlocked: has("aegis"), icon: <FiAward /> },
    { label: "Contact", view: "contact" as const, unlocked: true, icon: <FiMail /> },
  ];

  const openChallengeMode = () => {
    setMode("challenge");
    setOpenGate(null);
    window.setTimeout(() => document.getElementById("skills-node")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" }), 120);
  };

  const revealEverything = () => {
    setMode("revealed");
    setCompleted(new Set(ALL_GATES));
    setOpenGate(null);
    window.setTimeout(() => document.getElementById("projects-root")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" }), 120);
  };

  const completeGate = (id: GateId) => {
    setCompleted((current) => {
      if (current.has(id)) return current;
      const next = new Set(current);
      next.add(id);
      return next;
    });
    setOpenGate(null);
    const challenge = challenges.find((item) => item.id === id);
    if (challenge) {
      window.setTimeout(
        () => document.getElementById(challenge.targetId)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" }),
        reduceMotion ? 50 : 320,
      );
    }
  };

  const jumpToNext = () => {
    if (!nextGate) return;
    if (nextGate !== "skills") setOpenGate(nextGate);
    const id = nextGate === "skills" ? "skills-node" : `gate-${nextGate}`;
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
  };

  return (
    <div className={`portfolio-shell mode-${mode}`}>
      <a className="skip-link" href="#portfolio-content">Skip to portfolio content</a>

      <a className="resume-fab" href={RESUME_URL} target="_blank" rel="noreferrer">
        <FiDownload aria-hidden="true" /><span>Resume</span>
      </a>

      {mode !== "intro" && (
        <DesktopNavigation
          mode={mode}
          nav={nav}
          onOpen={setView}
          progress={progress}
        />
      )}

      <main id="portfolio-content" className="portfolio-main">
        <Hero
          mode={mode}
          onChallenge={openChallengeMode}
          onReveal={revealEverything}
          onOpenAegis={() => setView("aegis")}
          onOpenContact={() => setView("contact")}
        />

        {mode === "intro" ? (
          <RecruiterPreview onChallenge={openChallengeMode} onReveal={revealEverything} onOpenAegis={() => setView("aegis")} />
        ) : (
          <section className="map-canvas" aria-label="Interactive portfolio route">
            <div className="route-status" aria-live="polite">
              <span>{mode === "revealed" ? "Direct recruiter view" : "Interactive challenge mode"}</span>
              <div className="progress-track" aria-hidden="true"><i style={{ width: `${progress}%` }} /></div>
              <strong>{completedCount}/{challenges.length} gates</strong>
            </div>

            <SkillsNode
              completed={has("skills")}
              bypassed={mode === "revealed"}
              onComplete={completeGate}
              onOpen={() => setView("skills")}
            />

            {has("skills") && (
              <GateNode
                challengeId="projects"
                completed={has("projects")}
                bypassed={mode === "revealed"}
                open={openGate === "projects"}
                onOpen={() => setOpenGate("projects")}
                onClose={() => setOpenGate(null)}
                onComplete={completeGate}
              />
            )}

            <AnimatePresence>
              {has("projects") && (
                <motion.section
                  className="projects-map"
                  id="projects-root"
                  initial={reduceMotion ? false : { opacity: 0, y: -14 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <ProjectRoot compact={compact} onOpen={() => setView("projects-root")} />

                  <div className="branch-grid">
                    <BranchPath
                      side="left"
                      label={directions.list}
                      challengeId="list"
                      destinationVisible={has("list")}
                      bypassed={mode === "revealed"}
                      open={openGate === "list"}
                      onOpenGate={() => setOpenGate("list")}
                      onCloseGate={() => setOpenGate(null)}
                      onComplete={completeGate}
                    >
                      <DestinationCard
                        id="project-list-node"
                        icon={<FiList />}
                        eyebrow="BREADTH"
                        title="More Projects"
                        description="Browse the wider GitHub archive without burying the strongest work."
                        action="Browse repositories"
                        onClick={() => setView("project-list")}
                      />
                    </BranchPath>

                    <BranchPath
                      side="right"
                      label={directions.highlights}
                      challengeId="highlights"
                      destinationVisible={has("highlights")}
                      bypassed={mode === "revealed"}
                      open={openGate === "highlights"}
                      onOpenGate={() => setOpenGate("highlights")}
                      onCloseGate={() => setOpenGate(null)}
                      onComplete={completeGate}
                    >
                      <DestinationCard
                        id="top-projects-node"
                        icon={<FiFolder />}
                        eyebrow="PRODUCT WORK"
                        title="Featured Products"
                        description="Planora, Threadline, Wanderline, and Ledgerly — each with a distinct engineering story."
                        action="Review featured products"
                        onClick={() => setView("top-projects")}
                      />
                    </BranchPath>
                  </div>

                  <div className="flagship-path" data-route-label={directions.aegis}>
                    <GateNode
                      challengeId="aegis"
                      completed={has("aegis")}
                      bypassed={mode === "revealed"}
                      open={openGate === "aegis"}
                      onOpen={() => setOpenGate("aegis")}
                      onClose={() => setOpenGate(null)}
                      onComplete={completeGate}
                    />

                    <AnimatePresence>
                      {has("aegis") && (
                        <motion.div initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
                          <DestinationCard
                            id="aegis-node"
                            icon={<FiZap />}
                            eyebrow="FLAGSHIP / CAPSTONE"
                            title="Aegis"
                            description="A deployed, production-oriented incident operations platform with the deepest backend, security, realtime, and operations work in the portfolio."
                            action="Open Aegis showcase"
                            onClick={() => setView("aegis")}
                            flagship
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {has("aegis") && (
                      <GateNode
                        challengeId="contact"
                        completed={has("contact")}
                        bypassed={mode === "revealed"}
                        open={openGate === "contact"}
                        onOpen={() => setOpenGate("contact")}
                        onClose={() => setOpenGate(null)}
                        onComplete={completeGate}
                      />
                    )}

                    <AnimatePresence>
                      {has("contact") && (
                        <motion.div initial={reduceMotion ? false : { opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
                          <DestinationCard
                            id="contact-node"
                            icon={<FiMail />}
                            eyebrow="NEXT STEP"
                            title="Contact + Resume"
                            description="Email, LinkedIn, GitHub, the current resume, and a resilient contact form."
                            action="Open contact options"
                            onClick={() => setView("contact")}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.section>
              )}
            </AnimatePresence>
          </section>
        )}
      </main>

      {mode !== "intro" && (
        <MobileDock
          progress={progress}
          nextGate={nextGate}
          onNext={jumpToNext}
          onProjects={() => has("projects") && setView("projects-root")}
          onAegis={() => has("aegis") && setView("aegis")}
          onContact={() => setView("contact")}
          projectsUnlocked={has("projects")}
          aegisUnlocked={has("aegis")}
        />
      )}

      <AnimatePresence>
        {view && (
          <DetailDialog
            eyebrow={viewMeta[view].eyebrow}
            title={viewMeta[view].title}
            description={viewMeta[view].description}
            onClose={() => setView(null)}
          >
            <PortfolioView view={view} compact={compact} />
          </DetailDialog>
        )}
      </AnimatePresence>
    </div>
  );
}

function Hero({
  mode,
  onChallenge,
  onReveal,
  onOpenAegis,
  onOpenContact,
}: {
  mode: PortfolioMode;
  onChallenge: () => void;
  onReveal: () => void;
  onOpenAegis: () => void;
  onOpenContact: () => void;
}) {
  return (
    <header className="hero-section">
      <div className="hero-copy">
        <p className="eyebrow"><span className="status-dot" /> SOFTWARE ENGINEER · FULL-STACK + SYSTEMS</p>
        <h1>Noah Ragan</h1>
        <p className="hero-lead">I build polished software products and production-minded systems—then make the engineering decisions visible enough to evaluate.</p>
        <div className="hero-flagship-callout">
          <FiZap aria-hidden="true" />
          <div><span>FLAGSHIP PROJECT</span><strong>Aegis · Real-Time Incident Operations</strong><p>FastAPI, PostgreSQL, Redis, WebSockets, Celery, tenant/RBAC security, observability, CI, and a deployed React frontend.</p></div>
          <button type="button" onClick={onOpenAegis}>View Aegis <FiExternalLink aria-hidden="true" /></button>
        </div>

        <div className="hero-choice" aria-label="Choose portfolio experience">
          <button className="primary-button" type="button" onClick={onChallenge}>
            <FiTerminal aria-hidden="true" /> {mode === "challenge" ? "Continue challenge mode" : "Interactive challenge mode"}
          </button>
          <button className="secondary-button" type="button" onClick={onReveal}>
            <FiPlay aria-hidden="true" /> View everything now
          </button>
        </div>
        <p className="choice-note">Both routes show the same work. Challenge mode is the playful layer; direct view is the recruiter shortcut.</p>

        <nav className="hero-links" aria-label="Primary profile links">
          <a href={RESUME_URL} target="_blank" rel="noreferrer"><FiDownload aria-hidden="true" /> Resume</a>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer"><FiGithub aria-hidden="true" /> GitHub</a>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer"><FiLinkedin aria-hidden="true" /> LinkedIn</a>
          <button type="button" onClick={onOpenContact}><FiMail aria-hidden="true" /> Contact</button>
        </nav>
      </div>

      <div className="hero-profile" aria-label="Profile summary">
        <div className="profile-frame">
          <img src="/noah-ragan-profile.jpg" alt="Noah Ragan" width="520" height="520" fetchPriority="high" />
          <span className="profile-scan" aria-hidden="true" />
        </div>
        <div className="profile-stats">
          <span><strong>1</strong><small>flagship system</small></span>
          <span><strong>{products.length}</strong><small>featured products</small></span>
          <span><strong>27+</strong><small>additional repos</small></span>
        </div>
        <div className="profile-terminal" aria-label="Portfolio status">
          <span>$ portfolio --status</span>
          <p><i>✓</i> Aegis deployed</p>
          <p><i>✓</i> Featured product demos</p>
          <p><i>✓</i> Resume + contact ready</p>
        </div>
      </div>
    </header>
  );
}

function RecruiterPreview({ onChallenge, onReveal, onOpenAegis }: { onChallenge: () => void; onReveal: () => void; onOpenAegis: () => void }) {
  return (
    <section className="recruiter-preview" aria-labelledby="preview-title">
      <div className="preview-heading">
        <div><p className="eyebrow">START HERE</p><h2 id="preview-title">The engineering story in 30 seconds</h2></div>
        <p>No challenge is required to understand the portfolio. Aegis is the capstone; four other applications show product range.</p>
      </div>
      <div className="preview-grid">
        <button className="preview-card flagship-preview" type="button" onClick={onOpenAegis}>
          <FiZap aria-hidden="true" /><span><small>FLAGSHIP</small><strong>Aegis</strong><p>Multi-tenant incident operations, realtime collaboration, async workers, security, observability, and deployment.</p></span><FiArrowRight aria-hidden="true" />
        </button>
        <div className="preview-products">
          {products.map((product) => <article key={product.name}><span>{product.category}</span><strong>{product.name}</strong><small>{product.status}</small></article>)}
        </div>
      </div>
      <div className="preview-actions">
        <button className="primary-button" type="button" onClick={onChallenge}><FiTerminal aria-hidden="true" /> Play the interactive route</button>
        <button className="secondary-button" type="button" onClick={onReveal}><FiPlay aria-hidden="true" /> Open the full map</button>
      </div>
    </section>
  );
}

function SkillsNode({ completed, bypassed, onComplete, onOpen }: { completed: boolean; bypassed: boolean; onComplete: (id: GateId) => void; onOpen: () => void }) {
  return (
    <section id="skills-node" className="skills-node map-card">
      <div className={`skills-panel ${completed ? "is-revealed" : "is-hidden"}`}>
        <div className="node-heading"><FiCode aria-hidden="true" /><span><strong>Skills Snapshot</strong><small>Actual stack represented in the work</small></span></div>
        <div className="skills-mini">
          {skillGroups.map((group) => <div key={group.title}><strong>{group.title}</strong><p>{group.items.join(" · ")}</p></div>)}
        </div>
        {!completed && <div className="skills-lock"><FiLock aria-hidden="true" /><strong>Skills obscured</strong><span>Solve the first code gate to reveal this panel.</span></div>}
        {completed && <button type="button" className="inline-action" onClick={onOpen}>Open full skills view <FiArrowRight aria-hidden="true" /></button>}
      </div>
      <div className="skills-challenge">
        <ChallengeCard
          challenge={challenges[0]}
          completed={completed}
          bypassed={bypassed}
          expanded
          onExpand={() => undefined}
          onCollapse={() => undefined}
          onComplete={onComplete}
          embedded
        />
      </div>
    </section>
  );
}

function GateNode({
  challengeId,
  completed,
  bypassed,
  open,
  onOpen,
  onClose,
  onComplete,
}: {
  challengeId: GateId;
  completed: boolean;
  bypassed: boolean;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onComplete: (id: GateId) => void;
}) {
  const challenge = challenges.find((item) => item.id === challengeId);
  if (!challenge) return null;
  return (
    <div id={`gate-${challengeId}`} className={`gate-node ${completed ? "is-complete" : ""}`}>
      <span className="route-line vertical" aria-hidden="true" />
      <button className={`map-dot ${completed ? "is-complete" : "is-active"}`} type="button" onClick={onOpen} aria-label={`${challenge.label}: ${completed ? "completed" : "open challenge"}`}>
        {completed ? <FiCheck aria-hidden="true" /> : <span aria-hidden="true" />}
      </button>
      <ChallengeCard
        challenge={challenge}
        completed={completed}
        bypassed={bypassed}
        expanded={open}
        onExpand={onOpen}
        onCollapse={onClose}
        onComplete={onComplete}
      />
    </div>
  );
}

function ProjectRoot({ compact, onOpen }: { compact: boolean; onOpen: () => void }) {
  const directions = getDirectionalCopy(compact);
  return (
    <button className="project-root map-card" type="button" onClick={onOpen}>
      <span className="section-icon"><FiFolder aria-hidden="true" /></span>
      <div><p className="eyebrow">PROJECTS ROOT</p><h2>Choose what you want to evaluate</h2><p>{directions.intro}</p></div>
      <div className="root-route-labels">
        <span>{directions.list}</span><span>{directions.highlights}</span><span>{directions.aegis}</span>
      </div>
      <em>{directions.action} <FiArrowRight aria-hidden="true" /></em>
    </button>
  );
}

function BranchPath({
  side,
  label,
  challengeId,
  destinationVisible,
  bypassed,
  open,
  onOpenGate,
  onCloseGate,
  onComplete,
  children,
}: {
  side: "left" | "right";
  label: string;
  challengeId: GateId;
  destinationVisible: boolean;
  bypassed: boolean;
  open: boolean;
  onOpenGate: () => void;
  onCloseGate: () => void;
  onComplete: (id: GateId) => void;
  children: ReactNode;
}) {
  return (
    <div className={`branch-path branch-${side}`} data-route-label={label}>
      <span className="route-line horizontal" aria-hidden="true" />
      <GateNode
        challengeId={challengeId}
        completed={destinationVisible}
        bypassed={bypassed}
        open={open}
        onOpen={onOpenGate}
        onClose={onCloseGate}
        onComplete={onComplete}
      />
      <AnimatePresence>{destinationVisible && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{children}</motion.div>}</AnimatePresence>
    </div>
  );
}

function DestinationCard({
  id,
  icon,
  eyebrow,
  title,
  description,
  action,
  onClick,
  flagship = false,
}: {
  id: string;
  icon: ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  action: string;
  onClick: () => void;
  flagship?: boolean;
}) {
  return (
    <button id={id} className={`destination-card map-card ${flagship ? "is-flagship" : ""}`} type="button" onClick={onClick}>
      <span className="section-icon">{icon}</span>
      <span><small>{eyebrow}</small><strong>{title}</strong><p>{description}</p><em>{action} <FiArrowRight aria-hidden="true" /></em></span>
    </button>
  );
}

function DesktopNavigation({
  mode,
  nav,
  onOpen,
  progress,
}: {
  mode: PortfolioMode;
  nav: Array<{ label: string; view: ViewId; unlocked: boolean; icon: ReactNode }>;
  onOpen: (view: ViewId) => void;
  progress: number;
}) {
  return (
    <aside className="desktop-nav" aria-label="Portfolio navigation">
      <button className="brand-mark" type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>NR</button>
      <nav>
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><FiHome aria-hidden="true" /><span>Home</span></button>
        {nav.map((item) => (
          <button key={item.label} type="button" onClick={() => onOpen(item.view)} disabled={!item.unlocked} aria-label={`${item.label}${item.unlocked ? "" : " locked"}`}>
            {item.icon}<span>{item.label}</span>{!item.unlocked && <FiLock className="nav-lock" aria-hidden="true" />}
          </button>
        ))}
      </nav>
      <a href={RESUME_URL} target="_blank" rel="noreferrer"><FiDownload aria-hidden="true" /><span>Resume</span></a>
      <div className="nav-mode"><FiZap aria-hidden="true" /><span>{mode === "revealed" ? "DIRECT" : "CHALLENGE"}<small>{progress}%</small></span></div>
    </aside>
  );
}

function MobileDock({
  progress,
  nextGate,
  onNext,
  onProjects,
  onAegis,
  onContact,
  projectsUnlocked,
  aegisUnlocked,
}: {
  progress: number;
  nextGate: GateId | null;
  onNext: () => void;
  onProjects: () => void;
  onAegis: () => void;
  onContact: () => void;
  projectsUnlocked: boolean;
  aegisUnlocked: boolean;
}) {
  return (
    <nav className="mobile-dock" aria-label="Mobile portfolio navigation">
      <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><FiHome aria-hidden="true" /><span>Home</span></button>
      <button type="button" onClick={onProjects} disabled={!projectsUnlocked}><FiFolder aria-hidden="true" /><span>Projects</span></button>
      <button className="next-dock" type="button" onClick={onNext} disabled={!nextGate} aria-label={nextGate ? `Continue to ${nextGate} challenge` : `Portfolio ${progress}% complete`}>
        <span><FiZap aria-hidden="true" /></span><small>{nextGate ? "Next" : `${progress}%`}</small>
      </button>
      <button type="button" onClick={onAegis} disabled={!aegisUnlocked}><FiAward aria-hidden="true" /><span>Aegis</span></button>
      <button type="button" onClick={onContact}><FiMail aria-hidden="true" /><span>Contact</span></button>
    </nav>
  );
}

export default App;
