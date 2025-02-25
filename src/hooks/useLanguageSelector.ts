import { Currency, Language, Region } from "@/types/public";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface LanguageState {
  regions: Region[];
  languages: Language[];
  currencies: Currency[];
}

interface UseLanguageSelectorReturn {
  regions: Region[];
  languages: Language[];
  currencies: Currency[];
  selectedRegion?: string;
  selectedLanguage?: string;
  selectedCurrency?: string;
  flagSrc: string;
  setSelectedRegion: React.Dispatch<React.SetStateAction<string | undefined>>;
  setSelectedLanguage: React.Dispatch<React.SetStateAction<string | undefined>>;
  setSelectedCurrency: React.Dispatch<React.SetStateAction<string | undefined>>;
  handleSave: () => void;
}

const useLanguageSelector = ({
  onClose,
}: {
  onClose: () => void;
}): UseLanguageSelectorReturn => {
  const { regions, languages, currencies } = useSelector(
    (state: { language: LanguageState }) => state.language
  );

  const [selectedRegion, setSelectedRegion] = useState<string>();
  const [selectedLanguage, setSelectedLanguage] = useState<string>();
  const [selectedCurrency, setSelectedCurrency] = useState<string>();
  const [flagSrc, setFlagSrc] = useState<string>("");

  useEffect(() => {
    const savedRegion = Cookies.get("region");
    const savedLanguage = Cookies.get("locale");
    const savedCurrency = Cookies.get("currency");

    setSelectedRegion(savedRegion ? savedRegion.toUpperCase() : "MX");
    setSelectedLanguage(savedLanguage || "en");
    setSelectedCurrency(savedCurrency || "USD");

    if (!savedRegion) Cookies.set("region", "MX", { expires: 365 });
    if (!savedLanguage) Cookies.set("locale", "en", { expires: 365 });
    if (!savedCurrency) Cookies.set("currency", "USD", { expires: 365 });
  }, []);

  useEffect(() => {
    if (selectedRegion) {
      const loadFlag = async () => {
        try {
          const flagModule = await import(
            `/src/assets/flags/1x1/${selectedRegion.toLowerCase()}.svg`
          );
          setFlagSrc(flagModule.default);
        } catch (error) {
          console.error("Error loading flag:", error);
        }
      };
      loadFlag();
    }
  }, [selectedRegion]);

  const handleSave = () => {
    if (selectedRegion && selectedLanguage && selectedCurrency) {
      Cookies.set("region", selectedRegion.toLowerCase(), { expires: 365 });
      Cookies.set("locale", selectedLanguage, { expires: 365 });
      Cookies.set("currency", selectedCurrency, { expires: 365 });
      onClose();
    }
  };

  return {
    regions,
    languages,
    currencies,
    selectedRegion,
    selectedLanguage,
    selectedCurrency,
    flagSrc,
    setSelectedRegion,
    setSelectedLanguage,
    setSelectedCurrency,
    handleSave,
  };
};

export default useLanguageSelector;
