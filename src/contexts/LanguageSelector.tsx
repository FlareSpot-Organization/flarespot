import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { Currency, Language, Region } from "@/types/public";

interface LanguageContextType {
  regions: Region[];
  languages: Language[];
  currencies: Currency[];
  isLanguageModalOpen: boolean;
  setIsLanguageModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedRegion: string;
  selectedLanguage: string;
  selectedCurrency: string;
  flagSrc: string;
  setSelectedRegion: (region: string) => void;
  setSelectedLanguage: (language: string) => void;
  setSelectedCurrency: (currency: string) => void;
}

interface LanguageState {
  regions: Region[];
  languages: Language[];
  currencies: Currency[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLanguageModalOpen, setIsLanguageModalOpen] =
    useState<boolean>(false);
  const { regions, languages, currencies } = useSelector(
    (state: { language: LanguageState }) => state.language
  );

  const [selectedRegion, setSelectedRegion] = useState<string>(
    Cookies.get("region") || "ch"
  );
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    Cookies.get("locale") || "English"
  );
  const [selectedCurrency, setSelectedCurrency] = useState<string>(
    Cookies.get("currency") || "USD"
  );

  const [flagSrc, setFlagSrc] = useState<string>("");
  console.log(selectedRegion);

  // Load flag dynamically based on selectedRegion
  useEffect(() => {
    const loadFlag = (region: string) => {
      const flagPath = `/flags/1x1/${region.toLowerCase()}.svg`;
      setFlagSrc(flagPath);
    };
    if (selectedRegion) {
      loadFlag(selectedRegion);
    }
  }, [selectedRegion]);

  // Update cookies when region, language, or currency changes
  useEffect(() => {
    Cookies.set("region", selectedRegion, { expires: 365 });
  }, [selectedRegion]);

  useEffect(() => {
    Cookies.set("locale", selectedLanguage, { expires: 365 });
  }, [selectedLanguage]);

  useEffect(() => {
    Cookies.set("currency", selectedCurrency, { expires: 365 });
  }, [selectedCurrency]);

  return (
    <LanguageContext.Provider
      value={{
        regions,
        languages,
        currencies,
        isLanguageModalOpen,
        setIsLanguageModalOpen,
        selectedRegion,
        selectedLanguage,
        selectedCurrency,
        flagSrc,
        setSelectedRegion,
        setSelectedLanguage,
        setSelectedCurrency,
      }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = ({
  onClose,
}: {
  onClose: () => void;
}): LanguageContextType & { handleSave: () => void } => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  const handleSave = () => {
    if (
      context.selectedRegion &&
      context.selectedLanguage &&
      context.selectedCurrency
    ) {
      Cookies.set("region", context.selectedRegion.toLowerCase(), {
        expires: 365,
      });
      Cookies.set("locale", context.selectedLanguage, { expires: 365 });
      Cookies.set("currency", context.selectedCurrency, { expires: 365 });
      onClose(); // Close modal after saving
    }
  };

  return { ...context, handleSave };
};
