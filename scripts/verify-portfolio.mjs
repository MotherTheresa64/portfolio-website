import { readFile } from "node:fs/promises";

const files = {
  main: await readFile(new URL("../src/main.tsx", import.meta.url), "utf8"),
  app: await readFile(new URL("../src/App.tsx", import.meta.url), "utf8"),
  challenge: await readFile(new URL("../src/components/ChallengeCard.tsx", import.meta.url), "utf8"),
  dialog: await readFile(new URL("../src/components/DetailDialog.tsx", import.meta.url), "utf8"),
  views: await readFile(new URL("../src/components/PortfolioViews.tsx", import.meta.url), "utf8"),
  contact: await readFile(new URL("../src/components/ContactPanel.tsx", import.meta.url), "utf8"),
  compactHook: await readFile(new URL("../src/hooks/useCompactLayout.ts", import.meta.url), "utf8"),
  data: await readFile(new URL("../src/portfolio-data.ts", import.meta.url), "utf8"),
  css: await readFile(new URL("../src/styles.css", import.meta.url), "utf8"),
  html: await readFile(new URL("../index.html", import.meta.url), "utf8"),
};

const all = Object.values(files).join("\n");
const failures = [];
const expect = (condition, message) => { if (!condition) failures.push(message); };

expect(!all.includes("MutationObserver"), "DOM MutationObserver hacks must stay removed");
expect(!files.main.includes("portfolio-enhancements"), "main.tsx must not import portfolio-enhancements");
expect(!files.challenge.includes("<input"), "challenge answers must not use typed inputs");
expect(files.challenge.includes("choice-button"), "challenge must render React-controlled choice buttons");
expect(files.challenge.includes('aria-live="polite"'), "challenge feedback needs an aria-live region");
expect(files.challenge.includes("challenge-continue"), "a second miss must reveal the answer and offer an explicit continue action");
expect(files.dialog.includes('role="dialog"'), "detail overlay must use dialog semantics");
expect(files.dialog.includes('aria-modal="true"'), "detail overlay must be modal to assistive technology");
expect(files.dialog.includes('event.key === "Escape"'), "dialog must close on Escape");
expect(files.dialog.includes("trapFocus"), "dialog must trap keyboard focus");
expect(files.dialog.includes("scrollPositionRef"), "detail views must restore the prior page scroll position when closed");
expect(files.dialog.includes("dialog-back-icon"), "mobile detail views need an explicit Back affordance");
expect(files.contact.includes("formspree.io"), "contact form must keep Formspree delivery");
expect(files.contact.includes("mailto:"), "contact form needs a direct email fallback");
expect(files.contact.includes('status === "sending"'), "contact form needs a sending state");
expect(files.contact.includes('status === "error"'), "contact form needs an error state");
expect(files.css.includes("--accent:"), "portfolio CSS must expose the lilac accent as a reusable design token");
expect(!/--amber|#dba13e|#f0bc5e|219\s*,\s*161\s*,\s*62|240\s*,\s*188\s*,\s*94/i.test(files.css), "legacy amber/gold portfolio palette must stay removed");
expect(files.css.includes("prefers-reduced-motion"), "CSS must respect reduced motion");
expect(files.css.includes("max-width: 370px"), "CSS must include a narrow-phone pass");
expect(files.css.includes("orientation: landscape"), "CSS must include a phone-landscape pass");
expect(files.css.includes("env(safe-area-inset-bottom)"), "mobile fixed UI must account for device safe areas");
expect(files.css.includes(".resume-fab { display: none !important; }"), "mobile must remove the floating resume FAB instead of collapsing it to an icon");
expect(files.css.includes(".mobile-dock.is-hidden"), "mobile dock must support auto-hiding while scrolling");
expect(files.css.includes(".mobile-dock.is-direct"), "direct mode must use a four-item mobile jump dock without fake completion progress");
expect(files.css.includes("height: 100dvh"), "mobile detail views must use the full viewport rather than a nested desktop-sized modal");
expect(files.compactHook.includes("pointer: coarse"), "mobile guidance must adapt to touch/coarse-pointer input as well as width");
expect(files.app.includes("DirectPortfolio"), "direct recruiter mode must render a dedicated non-challenge portfolio flow");
expect(!files.app.includes("Direct recruiter view"), "direct mode must not render fake completed-gate status chrome");
expect(files.app.includes("gestureRef"), "mobile dock must distinguish a scroll/drag gesture from a deliberate tap");
expect(files.app.includes('mode === "challenge" &&'), "challenge progress/navigation chrome must be challenge-mode specific");
expect(files.views.includes("Architecture"), "featured product views must expose architecture context");
expect(files.views.includes("Engineering highlights"), "featured product views must expose engineering highlights");
expect(files.views.includes("Important tradeoff"), "featured product views must expose explicit tradeoffs");
expect(!all.match(/PRODUCT COMPLETE/i), "portfolio must not make blanket PRODUCT COMPLETE claims");
expect(!all.includes("build/foundation"), "portfolio must not link to the stale Aegis foundation branch");
expect(!all.match(/Terraform/i), "portfolio must not make an unsupported Terraform claim");
expect(!files.data.match(/cloud sync implemented|Firestore load\/save/i), "Planora copy must not claim hosted cloud persistence that its current repository does not support");
expect(!files.html.includes("motion-v3.css"), "old public motion override should be removed from index.html");
expect(files.html.includes("social-card.png"), "social metadata should use the lightweight social card");
expect(files.app.includes("View everything now"), "hero must expose an obvious direct recruiter route");
expect(files.app.includes("Interactive challenge mode"), "hero must expose challenge mode as an equal choice");

if (failures.length) {
  console.error("Portfolio verification failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Portfolio verification passed (${Object.keys(files).length} source surfaces checked).`);
