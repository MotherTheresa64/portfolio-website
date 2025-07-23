import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = ["About", "Skills", "Projects", "Contact"];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white dark:bg-dark shadow-sm z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center text-sm text-gray-800 dark:text-white">
        {/* Logo / Name */}
        <h1 className="font-semibold text-lg">Noah Ragan</h1>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-6 font-medium items-center">
          {navItems.map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="hover:text-black dark:hover:text-white transition-colors"
              >
                {item}
              </a>
            </li>
          ))}
          <li>
            <ThemeToggle />
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="ml-4 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-6">
          <ul className="flex flex-col gap-4 mt-2 font-medium text-gray-800 dark:text-white">
            {navItems.map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  className="block hover:text-black dark:hover:text-white transition-colors"
                >
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
