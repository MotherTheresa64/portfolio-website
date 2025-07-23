import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "./context/ThemeProvider"; // ✅ Import the provider

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider> {/* ✅ Wrap App here */}
      <App />
    </ThemeProvider>
  </StrictMode>
);
