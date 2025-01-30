import { useState } from "react";
import { Layout } from "lucide-react";
import { useHero } from "@/contexts/HeroContext";

const HeroSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentHero, setCurrentHero } = useHero();

  return (
    <div
      className={`fixed left-0 top-2/3 -translate-y-1/2 transition-transform duration-300 z-50 
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute right-0 top-1/2 translate-x-full -translate-y-1/2 
          bg-gray-200 dark:bg-gray-800 p-2 rounded-r-lg shadow-lg
          hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
        aria-label="Toggle hero switcher">
        <Layout className="h-5 w-5" />
      </button>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-r-lg shadow-lg">
        <h3 className="text-xs font-semibold mb-4">Layout Settings</h3>

        <div className="space-y-1">
          {[
            { id: "hero", label: "Default Hero" },
            { id: "hero1", label: "Hero 1" },
            { id: "hero2", label: "Hero 2" },
            { id: "hero3", label: "Hero 3" },
            { id: "hero4", label: "Hero 4" },
          ].map((hero) => (
            <button
              key={hero.id}
              onClick={() => setCurrentHero(hero.id)}
              className={`flex items-center w-full p-2 rounded-lg transition-colors
                ${
                  currentHero === hero.id
                    ? "bg-blue-100 dark:bg-blue-900"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}>
              <span className="text-[10px]">{hero.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSwitcher;
