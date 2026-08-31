import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import "./spacing-fix.css";
import "./modal-fit.css";
import { ThemeProvider } from "./context/ThemeProvider";

const normalizeResumeText = () => {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();

  while (node) {
    const value = node.nodeValue;
    if (value) {
      const normalized = value
        .replaceAll("CONTACT + RÉSUMÉ", "CONTACT + RESUME")
        .replaceAll("CONTACT + Résumé", "CONTACT + RESUME")
        .replaceAll("CONTACT + Resume", "CONTACT + RESUME")
        .replaceAll("Download résumé", "Download Resume")
        .replaceAll("Download resume", "Download Resume")
        .replaceAll("Résumé", "Resume")
        .replaceAll("résumé", "resume");

      if (normalized !== value) {
        node.nodeValue = normalized;
      }
    }
    node = walker.nextNode();
  }
};

const resumeTextObserver = new MutationObserver(() => normalizeResumeText());
resumeTextObserver.observe(document.body, {
  childList: true,
  subtree: true,
  characterData: true,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);

queueMicrotask(normalizeResumeText);
