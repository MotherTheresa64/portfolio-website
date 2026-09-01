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
  return (
    <div className="product-grid">
      {products.map((product) => (
        <article key={product.name} className="product-card">
          <div className="product-card-top"><span>{product.category}</span><em>{product.status}</em></div>
          <h3>{product.name}</h3>
          <p className="product-lead">{product.description}</p>
          <p>{product.detail}</p>
          <div className="reality-note"><FiCheckCircle aria-hidden="true" /><span><strong>Current implementation</strong>{product.reality}</span></div>
          <div className="tag-row">{product.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          <div className="card-actions">
            <a href={product.live} target="_blank" rel="noreferrer">Live demo <FiExternalLink aria-hidden="true" /></a>
            <a href={product.source} target="_blank" rel="noreferrer">Source <FiGithub aria-hidden="true" /></a>
          </div>
        </article>
      ))}
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
      <div className="tag-row large">{aegis.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
      <div className="card-actions flagship-actions">
        <a href={aegis.live} target="_blank" rel="noreferrer">Open live Aegis <FiArrowRight aria-hidden="true" /></a>
        <a href={aegis.source} target="_blank" rel="noreferrer">Source <FiGithub aria-hidden="true" /></a>
        <a href={aegis.docs} target="_blank" rel="noreferrer">API docs <FiExternalLink aria-hidden="true" /></a>
      </div>
    </div>
  );
}
