import { Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const ThemeControlPanel = () => {
  const [theme, setTheme] = useState("light");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      updateTheme(savedTheme);
    } else {
      updateTheme("light"); // Default to light theme
    }
  }, []);

  const handleSystemTheme = () => {
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    document.documentElement.classList.toggle("dark", systemDark);
  };

  const updateTheme = (newTheme: string) => {
    if (newTheme === "system") {
      handleSystemTheme();
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", handleSystemTheme);
    } else {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", handleSystemTheme);
      document.documentElement.classList.toggle("dark", newTheme === "dark");
    }
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <div
      className={`fixed right-0 top-1/2 -translate-y-1/2 transition-transform duration-300 z-50 
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 
          bg-gray-200 dark:bg-gray-800 p-2 rounded-l-lg shadow-lg
          hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
        aria-label="Toggle theme panel">
        {theme === "dark" ? (
          <Moon className="h-5 w-5" />
        ) : theme === "light" ? (
          <Sun className="h-5 w-5" />
        ) : theme === "system" ? (
          <Monitor className="h-5 w-5" />
        ) : null}
      </button>

      {/* Theme Panel */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-l-lg shadow-lg">
        <h3 className="text-xs font-semibold mb-4">Theme Settings</h3>

        <div className="space-y-1">
          <button
            onClick={() => updateTheme("light")}
            className={`flex items-center w-full p-2 rounded-lg transition-colors
              ${
                theme === "light"
                  ? "bg-blue-100 dark:bg-blue-900"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}>
            <Sun className="h-3 w-3 mr-2" />
            <span className="text-[10px]">Light</span>
          </button>

          <button
            onClick={() => updateTheme("dark")}
            className={`flex items-center w-full p-2 rounded-lg transition-colors
              ${
                theme === "dark"
                  ? "bg-blue-100 dark:bg-blue-900"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}>
            <Moon className="h-3 w-3 mr-2" />
            <span className="text-[10px]">Dark</span>
          </button>

          <button
            onClick={() => updateTheme("system")}
            className={`flex items-center w-full p-2 rounded-lg transition-colors
              ${
                theme === "system"
                  ? "bg-blue-100 dark:bg-blue-900"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}>
            <Monitor className="h-3 w-3 mr-2" />
            <span className="text-[10px]">System</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThemeControlPanel;
