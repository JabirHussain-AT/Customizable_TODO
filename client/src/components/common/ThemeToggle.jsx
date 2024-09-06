import { useContext } from "react";
import ThemeContext from "../../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className="flex font-serif  flex-col p-3 gap-2 dark:text-white ">
      <button
        onClick={() => setTheme("light")}
        className={`${
          theme === "light" ? "font-bold " : ""
        } hover:bg-gray-100 dark:hover:bg-gray-700  p-2`}
      >
        Light
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`${
          theme === "dark" ? "font-bold" : ""
        } hover:bg-gray-100 dark:hover:bg-gray-700 p-2`}
      >
        Dark
      </button>
      <button
        onClick={() => setTheme("system")}
        className={`${
          theme === "system" ? "font-bold" : ""
        } hover:bg-gray-100 dark:hover:bg-gray-700 p-2`}
      >
        System
      </button>
    </div>
  );
};

export default ThemeToggle;
