// heroContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";

interface HeroContextType {
  currentHero: string;
  setCurrentHero: (theme: string) => void;
}

const HeroContext = createContext<HeroContextType | undefined>(undefined);

export const HeroProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentHero, setCurrentHero] = useState("default");

  useEffect(() => {
    const savedHero = localStorage.getItem("heroTheme");
    if (savedHero) {
      setCurrentHero(savedHero);
    }
  }, []);

  const updateHero = (theme: string) => {
    setCurrentHero(theme);
    localStorage.setItem("heroTheme", theme);
  };

  return (
    <HeroContext.Provider value={{ currentHero, setCurrentHero: updateHero }}>
      {children}
    </HeroContext.Provider>
  );
};

export const useHero = () => {
  const context = useContext(HeroContext);
  if (context === undefined) {
    throw new Error("useHero must be used within a HeroProvider");
  }
  return context;
};
