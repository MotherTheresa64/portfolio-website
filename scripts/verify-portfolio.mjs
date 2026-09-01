import { readFile } from "node:fs/promises";

const files = {
  main: await readFile(new URL("../src/main.tsx", import.meta.url), "utf8"),
  app: await readFile(new URL("../src/App.tsx", import.meta.url), "utf8"),
  challenge: await readFile(new URL("../src/components/ChallengeCard.tsx", import.meta.url), "utf8"),
  dialog: await readFile(new URL("../src/components/DetailDialog.tsx", import.meta.url), "utf8"),
  contact: await readFile(new URL("../src/components/ContactPanel.tsx", import.meta.url), "utf8"),
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
expect(files.dialog.includes('role="dialog"'), "detail overlay must use dialog semantics");
expect(files.dialog.includes('aria-modal="true"'), "detail overlay must be modal to assistive technology");
expect(files.dialog.includes('event.key === "Escape"'), "dialog must close on Escape");
expect(files.dialog.includes("trapFocus"), "dialog must trap keyboard focus");
expect(files.contact.includes("formspree.io"), "contact form must keep Formspree delivery");
expect(files.contact.includes("mailto:"), "contact form needs a direct email fallback");
expect(files.contact.includes('status === "sending"'), "contact form needs a sending state");
expect(files.contact.includes('status === "error"'), "contact form needs an error state");
expect(files.css.includes("prefers-reduced-motion"), "CSS must respect reduced motion");
expect(files.css.includes("max-width: 370px"), "CSS must include a narrow-phone pass");
expect(files.css.includes("orientation: landscape"), "CSS must include a phone-landscape pass");
expect(!all.match(/PRODUCT COMPLETE/i), "portfolio must not make blanket PRODUCT COMPLETE claims");
expect(!all.includes("build/foundation"), "portfolio must not link to the stale Aegis foundation branch");
expect(!all.match(/Terraform/i), "portfolio must not make an unsupported Terraform claim");
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
