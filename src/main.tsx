import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import "./spacing-fix.css";
import { ThemeProvider } from "./context/ThemeProvider";

const normalizeResumeText = () => {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();

  while (node) {
    const value = node.nodeValue;
    if (value && (value.includes("Résumé") || value.includes("résumé"))) {
      node.nodeValue = value.replaceAll("Résumé", "Resume").replaceAll("résumé", "resume");
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
