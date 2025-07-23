import { useTheme } from "../hooks/useTheme";
import { FaRegSun, FaMoon } from "react-icons/fa";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="border border-gray-400 text-gray-800 dark:text-white p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? <FaRegSun size={14} /> : <FaMoon size={14} />}
    </button>
  );
};

export default ThemeToggle;
