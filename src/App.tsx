import { useEffect, useRef, useState } from "react";
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

  const has = (id: GateId) => mode === "revealed" || completed.has(id);
  const progress = getProgress(completed, mode, challenges.length);
  const nextGate = getNextGate(completed, mode);

  const scrollToId = (id: string, block: ScrollLogicalPosition = "start") => {
    document.getElementById(id)?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block,
    });
  };

  const openChallengeMode = () => {
    setMode("challenge");
    setCompleted(new Set());
    setOpenGate(null);
    window.setTimeout(() => scrollToId("skills-node", "center"), 120);
  };

  const revealEverything = () => {
    setMode("revealed");
    setOpenGate(null);
    window.setTimeout(() => scrollToId(compact ? "direct-projects" : "projects-root"), 120);
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
        () => scrollToId(challenge.targetId, "center"),
        reduceMotion ? 50 : 320,
      );
    }
  };

  const jumpToNext = () => {
    if (!nextGate) return;
    if (nextGate !== "skills") setOpenGate(nextGate);
    const id = nextGate === "skills" ? "skills-node" : `gate-${nextGate}`;
    scrollToId(id, "center");
  };

  const nav = [
    { label: "Skills", view: "skills" as const, unlocked: has("skills"), icon: <FiCode /> },
    { label: "Projects", view: "projects-root" as const, unlocked: has("projects"), icon: <FiFolder /> },
    { label: "Aegis", view: "aegis" as const, unlocked: has("aegis"), icon: <FiAward /> },
    { label: "Contact", view: "contact" as const, unlocked: true, icon: <FiMail /> },
  ];

  return (
    <div className={`portfolio-shell mode-${mode}`}>
      <a className="skip-link" href="#portfolio-content">Skip to portfolio content</a>

      <a className="resume-fab" href={RESUME_URL} target="_blank" rel="noreferrer">
        <FiDownload aria-hidden="true" /><span>Resume</span>
      </a>

      {mode !== "intro" && (
        <DesktopNavigation mode={mode} nav={nav} onOpen={setView} progress={progress} />
      )}

      <main id="portfolio-content" className="portfolio-main">
        <Hero
          mode={mode}
          onChallenge={openChallengeMode}
          onReveal={revealEverything}
          onOpenAegis={() => setView("aegis")}
          onOpenContact={() => setView("contact")}
        />

        {mode === "intro" && (
          <RecruiterPreview
            onChallenge={openChallengeMode}
            onReveal={revealEverything}
            onOpenAegis={() => setView("aegis")}
          />
        )}

        {mode === "revealed" && (
          compact ? (
            <DirectPortfolio onOpen={setView} />
          ) : (
            <PortfolioMap
              mode="revealed"
              compact={compact}
              reduceMotion={reduceMotion}
              completed={completed}
              openGate={openGate}
              onOpenGate={setOpenGate}
              onComplete={completeGate}
              onOpenView={setView}
            />
          )
        )}

        {mode === "challenge" && (
          <PortfolioMap
            mode="challenge"
            compact={compact}
            reduceMotion={reduceMotion}
            completed={completed}
            openGate={openGate}
            onOpenGate={setOpenGate}
            onComplete={completeGate}
            onOpenView={setView}
          />
        )}
      </main>

      {mode !== "intro" && (
        <MobileDock
          mode={mode}
          progress={progress}
          nextGate={nextGate}
          onNext={jumpToNext}
          projectsUnlocked={mode === "revealed" || has("projects")}
          aegisUnlocked={mode === "revealed" || has("aegis")}
          contactUnlocked={mode === "revealed" || has("contact")}
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

function PortfolioMap({
  mode,
  compact,
  reduceMotion,
  completed,
  openGate,
  onOpenGate,
  onComplete,
  onOpenView,
}: {
  mode: "challenge" | "revealed";
  compact: boolean;
  reduceMotion: boolean | null;
  completed: Set<GateId>;
  openGate: GateId | null;
  onOpenGate: (gate: GateId | null) => void;
  onComplete: (id: GateId) => void;
  onOpenView: (view: ViewId) => void;
}) {
  const directions = getDirectionalCopy(compact);
  const bypassed = mode === "revealed";
  const has = (id: GateId) => bypassed || completed.has(id);
  const progress = getProgress(completed, mode, challenges.length);
  const completedCount = bypassed ? challenges.length : completed.size;

  return (
    <section className={`map-canvas ${bypassed ? "direct-map" : "challenge-map"}`} aria-label={bypassed ? "Direct recruiter portfolio map" : "Interactive portfolio route"}>
      <div className="route-status" aria-live="polite">
        <span>{bypassed ? "Direct recruiter view" : "Interactive challenge mode"}</span>
        <div className="progress-track" aria-hidden="true"><i style={{ width: `${progress}%` }} /></div>
        <strong>{completedCount}/{challenges.length} gates</strong>
      </div>

      <SkillsNode
        completed={has("skills")}
        bypassed={bypassed}
        onComplete={onComplete}
        onOpen={() => onOpenView("skills")}
      />

      {has("skills") && (
        <GateNode
          challengeId="projects"
          completed={has("projects")}
          bypassed={bypassed}
          open={openGate === "projects"}
          onOpen={() => onOpenGate("projects")}
          onClose={() => onOpenGate(null)}
          onComplete={onComplete}
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
            <ProjectRoot
              compact={compact}
              onOpen={compact ? undefined : () => onOpenView("projects-root")}
            />

            <div className="branch-grid">
              <BranchPath
                side="left"
                label={directions.list}
                challengeId="list"
                destinationVisible={has("list")}
                bypassed={bypassed}
                open={openGate === "list"}
                onOpenGate={() => onOpenGate("list")}
                onCloseGate={() => onOpenGate(null)}
                onComplete={onComplete}
              >
                <DestinationCard
                  id="project-list-node"
                  icon={<FiList />}
                  eyebrow="BREADTH"
                  title="More Projects"
                  description="Browse the wider GitHub archive without burying the strongest work."
                  action="Browse repositories"
                  onClick={() => onOpenView("project-list")}
                />
              </BranchPath>

              <BranchPath
                side="right"
                label={directions.highlights}
                challengeId="highlights"
                destinationVisible={has("highlights")}
                bypassed={bypassed}
                open={openGate === "highlights"}
                onOpenGate={() => onOpenGate("highlights")}
                onCloseGate={() => onOpenGate(null)}
                onComplete={onComplete}
              >
                <DestinationCard
                  id="top-projects-node"
                  icon={<FiFolder />}
                  eyebrow="PRODUCT WORK"
                  title="Featured Products"
                  description="Planora, Threadline, Wanderline, and Ledgerly — each with a distinct engineering story."
                  action="Review featured products"
                  onClick={() => onOpenView("top-projects")}
                />
              </BranchPath>
            </div>

            <div className="flagship-path" data-route-label={directions.aegis}>
              <GateNode
                challengeId="aegis"
                completed={has("aegis")}
                bypassed={bypassed}
                open={openGate === "aegis"}
                onOpen={() => onOpenGate("aegis")}
                onClose={() => onOpenGate(null)}
                onComplete={onComplete}
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
                      onClick={() => onOpenView("aegis")}
                      flagship
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {has("aegis") && (
                <GateNode
                  challengeId="contact"
                  completed={has("contact")}
                  bypassed={bypassed}
                  open={openGate === "contact"}
                  onOpen={() => onOpenGate("contact")}
                  onClose={() => onOpenGate(null)}
                  onComplete={onComplete}
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
                      onClick={() => onOpenView("contact")}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </section>
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
            <FiTerminal aria-hidden="true" /> {mode === "challenge" ? "Restart challenge mode" : "Interactive challenge mode"}
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

function DirectPortfolio({ onOpen }: { onOpen: (view: ViewId) => void }) {
  return (
    <section className="direct-flow" aria-label="Direct recruiter portfolio">
      <motion.section id="direct-skills" className="direct-section direct-skills" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }}>
        <div className="direct-heading">
          <p className="eyebrow">SKILLS SNAPSHOT</p>
          <h2>The stack represented in the work</h2>
          <p>Grouped for quick scanning instead of compressing the entire toolset into one dense line.</p>
        </div>
        <div className="direct-skill-grid">
          {skillGroups.map((group) => (
            <article key={group.title}>
              <h3>{group.title}</h3>
              <div>{group.items.map((item) => <span key={item}>{item}</span>)}</div>
            </article>
          ))}
        </div>
        <button className="inline-action" type="button" onClick={() => onOpen("skills")}>Open full skills view <FiArrowRight aria-hidden="true" /></button>
      </motion.section>

      <motion.section id="direct-projects" className="direct-section" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }}>
        <div className="direct-heading">
          <p className="eyebrow">PROJECT WORK</p>
          <h2>Choose the level of depth you want</h2>
          <p>Browse the wider archive or inspect the four featured products as engineering case studies.</p>
        </div>
        <div className="direct-card-grid">
          <DestinationCard id="direct-more-projects" icon={<FiList />} eyebrow="BREADTH" title="More Projects" description="Browse the wider GitHub archive without burying the strongest work." action="Browse repositories" onClick={() => onOpen("project-list")} />
          <DestinationCard id="direct-featured-products" icon={<FiFolder />} eyebrow="FEATURED PRODUCTS" title="Planora · Threadline · Wanderline · Ledgerly" description="Four distinct product problems with architecture, current implementation, tradeoffs, quality notes, demos, and source." action="Review featured products" onClick={() => onOpen("top-projects")} />
        </div>
      </motion.section>

      <motion.section id="direct-aegis" className="direct-section direct-flagship" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }}>
        <DestinationCard id="direct-aegis-card" icon={<FiZap />} eyebrow="FLAGSHIP / CAPSTONE" title="Aegis" description="A deployed, production-oriented incident operations platform with the deepest backend, security, realtime, async, observability, and operations work in the portfolio." action="View Aegis case study" onClick={() => onOpen("aegis")} flagship />
      </motion.section>

      <motion.section id="direct-contact" className="direct-section direct-contact" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }}>
        <DestinationCard id="direct-contact-card" icon={<FiMail />} eyebrow="NEXT STEP" title="Contact + Resume" description="Resume, email, LinkedIn, GitHub, and an optional message form are one deliberate tap away." action="Open contact options" onClick={() => onOpen("contact")} />
      </motion.section>
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
        <ChallengeCard challenge={challenges[0]} completed={completed} bypassed={bypassed} expanded onExpand={() => undefined} onCollapse={() => undefined} onComplete={onComplete} embedded />
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
      <ChallengeCard challenge={challenge} completed={completed} bypassed={bypassed} expanded={open} onExpand={onOpen} onCollapse={onClose} onComplete={onComplete} />
    </div>
  );
}

function ProjectRoot({ compact, onOpen }: { compact: boolean; onOpen?: () => void }) {
  const directions = getDirectionalCopy(compact);
  const content = (
    <>
      <span className="section-icon"><FiFolder aria-hidden="true" /></span>
      <div><p className="eyebrow">PROJECTS ROOT</p><h2>Choose what you want to evaluate</h2><p>{directions.intro}</p></div>
      {!compact && <div className="root-route-labels"><span>{directions.list}</span><span>{directions.highlights}</span><span>{directions.aegis}</span></div>}
      {!compact && <em>{directions.action} <FiArrowRight aria-hidden="true" /></em>}
    </>
  );

  if (compact || !onOpen) return <section className="project-root map-card is-static">{content}</section>;
  return <button className="project-root map-card" type="button" onClick={onOpen}>{content}</button>;
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
      <GateNode challengeId={challengeId} completed={destinationVisible} bypassed={bypassed} open={open} onOpen={onOpenGate} onClose={onCloseGate} onComplete={onComplete} />
      <AnimatePresence>{destinationVisible && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{children}</motion.div>}</AnimatePresence>
    </div>
  );
}

function DestinationCard({ id, icon, eyebrow, title, description, action, onClick, flagship = false }: { id: string; icon: ReactNode; eyebrow: string; title: string; description: string; action: string; onClick: () => void; flagship?: boolean }) {
  return (
    <button id={id} className={`destination-card map-card ${flagship ? "is-flagship" : ""}`} type="button" onClick={onClick}>
      <span className="section-icon">{icon}</span>
      <span><small>{eyebrow}</small><strong>{title}</strong><p>{description}</p><em>{action} <FiArrowRight aria-hidden="true" /></em></span>
    </button>
  );
}

function DesktopNavigation({ mode, nav, onOpen, progress }: { mode: PortfolioMode; nav: Array<{ label: string; view: ViewId; unlocked: boolean; icon: ReactNode }>; onOpen: (view: ViewId) => void; progress: number }) {
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
      <div className="nav-mode"><FiZap aria-hidden="true" /><span>{mode === "revealed" ? "DIRECT" : "CHALLENGE"}<small>{mode === "revealed" ? "OPEN" : `${progress}%`}</small></span></div>
    </aside>
  );
}

type DockSection = "home" | "projects" | "aegis" | "contact";

function MobileDock({ mode, progress, nextGate, onNext, projectsUnlocked, aegisUnlocked, contactUnlocked }: { mode: PortfolioMode; progress: number; nextGate: GateId | null; onNext: () => void; projectsUnlocked: boolean; aegisUnlocked: boolean; contactUnlocked: boolean }) {
  const [hidden, setHidden] = useState(true);
  const [active, setActive] = useState<DockSection>("home");
  const gestureRef = useRef({ x: 0, y: 0, moved: false });

  const targets = mode === "revealed"
    ? { projects: "direct-projects", aegis: "direct-aegis", contact: "direct-contact" }
    : { projects: "projects-root", aegis: "aegis-node", contact: "contact-node" };

  useEffect(() => {
    let lastY = window.scrollY;
    let idleTimer: number | undefined;

    const updateActive = () => {
      const probe = window.scrollY + window.innerHeight * 0.36;
      let nextActive: DockSection = "home";
      const sections: Array<{ key: DockSection; id: string; enabled: boolean }> = [
        { key: "projects", id: targets.projects, enabled: projectsUnlocked },
        { key: "aegis", id: targets.aegis, enabled: aegisUnlocked },
        { key: "contact", id: targets.contact, enabled: contactUnlocked },
      ];
      for (const section of sections) {
        const element = section.enabled ? document.getElementById(section.id) : null;
        if (element && probe >= element.offsetTop) nextActive = section.key;
      }
      setActive(nextActive);
    };

    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastY;
      if (currentY < 180) setHidden(true);
      else if (delta > 6) setHidden(true);
      else if (delta < -6) setHidden(false);
      updateActive();
      lastY = currentY;
      if (idleTimer !== undefined) window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        if (window.scrollY >= 180) setHidden(false);
      }, 420);
    };

    updateActive();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateActive);
      if (idleTimer !== undefined) window.clearTimeout(idleTimer);
    };
  }, [targets.projects, targets.aegis, targets.contact, projectsUnlocked, aegisUnlocked, contactUnlocked]);

  const jump = (section: DockSection, id?: string) => {
    setActive(section);
    if (section === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      className={`mobile-dock ${mode === "revealed" ? "is-direct" : "is-challenge"} ${hidden ? "is-hidden" : ""}`}
      aria-label="Mobile portfolio navigation"
      onPointerDownCapture={(event) => { gestureRef.current = { x: event.clientX, y: event.clientY, moved: false }; }}
      onPointerMoveCapture={(event) => {
        const dx = Math.abs(event.clientX - gestureRef.current.x);
        const dy = Math.abs(event.clientY - gestureRef.current.y);
        if (dx > 10 || dy > 10) gestureRef.current.moved = true;
      }}
      onClickCapture={(event) => {
        if (gestureRef.current.moved) {
          event.preventDefault();
          event.stopPropagation();
        }
        gestureRef.current.moved = false;
      }}
    >
      <button type="button" onClick={() => jump("home")} aria-current={active === "home" ? "page" : undefined}><FiHome aria-hidden="true" /><span>Home</span></button>
      <button type="button" onClick={() => jump("projects", targets.projects)} disabled={!projectsUnlocked} aria-current={active === "projects" ? "page" : undefined}><FiFolder aria-hidden="true" /><span>Projects</span></button>
      {mode === "challenge" && (
        <button className="next-dock" type="button" onClick={onNext} disabled={!nextGate} aria-label={nextGate ? `Continue to ${nextGate} challenge` : `Challenge route ${progress}% complete`}>
          <span><FiZap aria-hidden="true" /></span><small>{nextGate ? "Next" : "Done"}</small>
        </button>
      )}
      <button type="button" onClick={() => jump("aegis", targets.aegis)} disabled={!aegisUnlocked} aria-current={active === "aegis" ? "page" : undefined}><FiAward aria-hidden="true" /><span>Aegis</span></button>
      <button type="button" onClick={() => jump("contact", targets.contact)} disabled={!contactUnlocked} aria-current={active === "contact" ? "page" : undefined}><FiMail aria-hidden="true" /><span>Contact</span></button>
    </nav>
  );
}

export default App;
