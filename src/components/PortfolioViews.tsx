import { useState } from "react";
import {
  FiArrowRight,
  FiCheckCircle,
  FiExternalLink,
  FiGithub,
  FiLayers,
  FiServer,
  FiShield,
  FiZap,
} from "react-icons/fi";
import { ContactPanel } from "./ContactPanel";
import { aegis, otherRepos, products, skillGroups } from "../portfolio-data";
import type { ViewId } from "../portfolio-data";
import { getDirectionalCopy } from "../challenge-engine";

// Free-tier Render services spin down after inactivity, so a reviewer needs to
// know the first load can pause before anything appears.
const FREE_HOST_NOTE = "Free host — the first load can take up to 30 seconds while the service wakes.";
const SLOW_HOSTS = new Set([
  "https://planora-zlxv.onrender.com",
  "https://threadline-ga8w.onrender.com",
  "https://wanderline-s1yv.onrender.com",
]);

// The ten systems libraries were built as one deliberate fundamentals drill, and
// saying so is more credible than presenting them as ten separate products.
const AEGIS_ARCHITECTURE =
  "https://github.com/MotherTheresa64/Aegis/blob/main/docs/architecture.md";

const SYSTEMS_DRILL = {
  title: "Ten systems libraries, built as one deliberate drill",
  body:
    "These ten repositories were written in a single focused session on 7 November 2026, and each implements a systems primitive from scratch with no runtime dependencies: token-bucket rate limiting, BM25 full-text search, scrypt and TOTP authentication, HMAC-signed webhook delivery with replay windows, event-sourced documents, a durable job queue, feature-flag bucketing, a metrics registry, a hand-written expression parser, and an immutable double-entry ledger. The goal was to write the algorithms rather than import them — every library has its own tests, a CI run, a deployed demo, and a small enough surface to read end to end. They sit beside the product work rather than competing with it.",
  link: "https://github.com/MotherTheresa64/ten-demos",
  linkLabel: "Open the ten-demo index",
} as const;

export function PortfolioView({ view, compact }: { view: ViewId; compact: boolean }) {
  if (view === "skills") return <SkillsView />;
  if (view === "project-list") return <RepositoryView />;
  if (view === "projects-root") return <ProjectsRootView compact={compact} />;
  if (view === "top-projects") return <ProductsView />;
  if (view === "aegis") return <AegisView />;
  return <ContactPanel />;
}

function SkillsView() {
  return (
    <div className="skills-detail-grid">
      {skillGroups.map((group) => (
        <article key={group.title}>
          <h3>{group.title}</h3>
          <div>{group.items.map((item) => <span key={item}>{item}</span>)}</div>
        </article>
      ))}
    </div>
  );
}

function RepositoryView() {
  return (
    <div>
      <section className="drill-note">
        <b>{SYSTEMS_DRILL.title}</b>
        <p>{SYSTEMS_DRILL.body}</p>
        <a href={SYSTEMS_DRILL.link} target="_blank" rel="noreferrer">{SYSTEMS_DRILL.linkLabel} <FiExternalLink aria-hidden="true" /></a>
      </section>
      <div className="repo-summary">
        <div><FiGithub aria-hidden="true" /><span><strong>MotherTheresa64</strong><small>{otherRepos.length} additional public repositories</small></span></div>
        <a href="https://github.com/MotherTheresa64?tab=repositories" target="_blank" rel="noreferrer">Open all on GitHub <FiExternalLink aria-hidden="true" /></a>
      </div>
      <div className="repo-grid">
        {otherRepos.map((repo) => (
          <article key={repo.name}>
            <div className="repo-title"><FiLayers aria-hidden="true" /><span><strong>{repo.name}</strong><small>{repo.kind}</small></span></div>
            <a href={repo.url} target="_blank" rel="noreferrer" aria-label={`Open ${repo.name} source on GitHub`}>Source <FiGithub aria-hidden="true" /></a>
          </article>
        ))}
      </div>
    </div>
  );
}

function ProjectsRootView({ compact }: { compact: boolean }) {
  const directions = getDirectionalCopy(compact);
  return (
    <div className="root-guide-grid">
      <article><span>{directions.list}</span><h3>More repositories</h3><p>Browse the wider public project and coursework archive without mixing it into the strongest recruiter-facing work.</p></article>
      <article><span>{directions.highlights}</span><h3>Featured products</h3><p>Planora, Threadline, Wanderline, and Ledgerly each demonstrate a different product and engineering problem.</p></article>
      <article className="flagship-guide"><span>{directions.aegis}</span><h3>Aegis flagship</h3><p>The deepest systems project gets its own path and hierarchy rather than competing with smaller applications in a generic grid.</p></article>
    </div>
  );
}

function ProductsView() {
  const [activeName, setActiveName] = useState(products[0]?.name ?? "");
  const product = products.find((item) => item.name === activeName) ?? products[0];

  if (!product) return null;

  return (
    <div className="products-view">
      <div className="product-switcher" role="tablist" aria-label="Featured product case studies">
        {products.map((item) => {
          const active = item.name === product.name;
          return (
            <button
              key={item.name}
              type="button"
              role="tab"
              aria-selected={active}
              className={active ? "is-active" : ""}
              onClick={() => setActiveName(item.name)}
            >
              <span>{item.name}</span>
              <small>{item.category}</small>
            </button>
          );
        })}
      </div>

      <article className="product-case-study" aria-live="polite">
        <header className="product-case-header">
          <div>
            <span>{product.category}</span>
            <h3>{product.name}</h3>
          </div>
          <em>{product.status}</em>
        </header>

        <div className="product-case-intro">
          <p className="product-lead">{product.description}</p>
          <p>{product.detail}</p>
        </div>

        <div className="reality-note product-reality">
          <FiCheckCircle aria-hidden="true" />
          <span><strong>Current implementation</strong>{product.reality}</span>
        </div>

        <div className="product-case-body">
          <section className="product-engineering" aria-label={`${product.name} engineering highlights`}>
            <h4>Engineering highlights</h4>
            <ul className="engineering-list">
              {product.engineering.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>

          <aside className="product-context-rail" aria-label={`${product.name} technical context`}>
            <section>
              <h4>Architecture</h4>
              <p>{product.architecture}</p>
            </section>
            <section>
              <h4>Quality + validation</h4>
              <p>{product.quality}</p>
            </section>
            <section>
              <h4>Important tradeoff</h4>
              <p>{product.tradeoff}</p>
            </section>
          </aside>
        </div>

        <footer className="product-case-footer">
          <div className="tag-row">{product.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          <div className="card-actions">
            <a href={product.live} target="_blank" rel="noreferrer">Live demo <FiExternalLink aria-hidden="true" /></a>
            <a href={product.source} target="_blank" rel="noreferrer">Source <FiGithub aria-hidden="true" /></a>
            {SLOW_HOSTS.has(product.live) && <small className="wake-note">{FREE_HOST_NOTE}</small>}
          </div>
        </footer>
      </article>
    </div>
  );
}

function AegisView() {
  const icons = [FiServer, FiShield, FiZap, FiLayers];
  return (
    <div className="aegis-view">
      <div className="flagship-banner">
        <span>FLAGSHIP / CAPSTONE</span>
        <strong>{aegis.status}</strong>
        <p>{aegis.summary}</p>
      </div>

      <div className="aegis-pillars">
        {aegis.pillars.map((pillar, index) => {
          const Icon = icons[index] ?? FiZap;
          return <article key={pillar.title}><Icon aria-hidden="true" /><h3>{pillar.title}</h3><p>{pillar.text}</p></article>;
        })}
      </div>

      <div className="architecture-callout">
        <strong>Architecture and system shape</strong>
        <p>{aegis.architecture}</p>
      </div>

      <div className="case-study-grid">
        <section className="case-study-section" aria-label="Aegis engineering decisions">
          <h4>Engineering decisions worth inspecting</h4>
          <ul className="engineering-list">
            {aegis.decisions.map((decision) => <li key={decision}>{decision}</li>)}
          </ul>
        </section>
        <section className="case-study-section" aria-label="Aegis quality and operations">
          <h4>Quality + operations</h4>
          <p>{aegis.quality}</p>
        </section>
      </div>

      <div className="tag-row large">{aegis.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
      <div className="card-actions flagship-actions">
        <a href={aegis.live} target="_blank" rel="noreferrer">Open live Aegis <FiArrowRight aria-hidden="true" /></a>
        <a href={aegis.source} target="_blank" rel="noreferrer">Source <FiGithub aria-hidden="true" /></a>
        <a href={AEGIS_ARCHITECTURE} target="_blank" rel="noreferrer">Architecture notes <FiExternalLink aria-hidden="true" /></a>
      </div>
    </div>
  );
}
