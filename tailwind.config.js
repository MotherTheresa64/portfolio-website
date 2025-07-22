// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#0f0f0f",
        light: "#ffffff",
        surface: "#f9f9fb",
        section: "#f5f5f5", // ✅ updated to your lighter background
        accent: "#1a1a1a",
        textMain: "#1c1c1e",
        textSubtle: "#4b4b4b",
        borderLight: "#e5e7eb",
      },
    },
  },
  plugins: [],
};
