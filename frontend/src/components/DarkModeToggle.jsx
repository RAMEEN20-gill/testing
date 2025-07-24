import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem("theme");
    return stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches);
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode((prev) => !prev)}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
      aria-label="Toggle Dark Mode"
    >
      {darkMode ? <Sun className="text-yellow-500 w-5 h-5" /> : <Moon className="text-gray-800 w-5 h-5" />}
    </button>
  );
};

export default DarkModeToggle;
