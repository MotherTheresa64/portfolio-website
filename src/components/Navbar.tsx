import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = ["Projects", "About", "Skills", "Contact"];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/90 dark:bg-dark/90 backdrop-blur border-b border-gray-200 dark:border-gray-800 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center text-sm text-gray-800 dark:text-white">
        <a href="#home" className="font-bold text-lg tracking-tight">Noah Ragan</a>

        <ul className="hidden md:flex space-x-6 font-medium items-center">
          {navItems.map((item) => (
            <li key={item}>
              <a href={`#${item.toLowerCase()}`} className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">
                {item}
              </a>
            </li>
          ))}
          <li><ThemeToggle /></li>
        </ul>

        <div className="md:hidden flex items-center">
          <ThemeToggle />
          <button onClick={() => setIsOpen(!isOpen)} className="ml-4 focus:outline-none" aria-label="Toggle menu">
            {isOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-6 pb-6 bg-white dark:bg-dark border-t border-gray-100 dark:border-gray-800">
          <ul className="flex flex-col gap-4 mt-4 font-medium text-gray-800 dark:text-white">
            {navItems.map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`} onClick={() => setIsOpen(false)} className="block">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
