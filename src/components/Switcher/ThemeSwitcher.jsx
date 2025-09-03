import { useContext } from "react";

import { FaSun, FaMoon } from "react-icons/fa";
import { ThemeContext } from "../../Context/ThemeContext";

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div
      onClick={toggleTheme}
      role="button"
      aria-label="Toggle theme"
      title="Toggle light/dark mode"
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer transition-colors duration-300"
    >
      {theme === "dark" ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
    </div>
  );
};


export default ThemeSwitcher;
