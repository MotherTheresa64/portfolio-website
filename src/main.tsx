import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import "./spacing-fix.css";
import "./modal-fit.css";
import "./lilac-motion.css";
import { ThemeProvider } from "./context/ThemeProvider";

const normalizeTextNode = (node: Node) => {
  const value = node.nodeValue;
  if (!value) return;

  const normalized = value
    .replaceAll("CONTACT + RÉSUMÉ", "CONTACT + RESUME")
    .replaceAll("CONTACT + Résumé", "CONTACT + RESUME")
    .replaceAll("CONTACT + Resume", "CONTACT + RESUME")
    .replaceAll("Download résumé", "Download Resume")
    .replaceAll("Download resume", "Download Resume")
    .replaceAll("Résumé", "Resume")
    .replaceAll("résumé", "resume");

  if (normalized !== value) node.nodeValue = normalized;
};

const normalizeResumeText = (root: Node) => {
  if (root.nodeType === Node.TEXT_NODE) {
    normalizeTextNode(root);
    return;
  }

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();
  while (node) {
    normalizeTextNode(node);
    node = walker.nextNode();
  }
};

const resumeTextObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => normalizeResumeText(node));
  });
});

resumeTextObserver.observe(document.body, { childList: true, subtree: true });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);

queueMicrotask(() => normalizeResumeText(document.body));
