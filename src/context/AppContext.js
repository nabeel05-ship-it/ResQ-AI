import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import { getTranslation, TRANSLATIONS, SUPPORTED_LANGUAGES } from "../i18n/translations";

const Ctx = createContext();

// Backward compatibility exports
export const UI_TRANSLATIONS = TRANSLATIONS;
export const getT = (lang) => getTranslation(lang);

// Helper to validate and normalize a language to a supported language entry
export const normalizeLanguage = (langInput) => {
  if (!langInput) return SUPPORTED_LANGUAGES[0]; // English
  const str = String(langInput).trim().toLowerCase();
  const match = SUPPORTED_LANGUAGES.find(
    (l) => l.name.toLowerCase() === str || l.code.toLowerCase() === str
  );
  return match || SUPPORTED_LANGUAGES[0];
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [language, setLanguageState] = useState("English");
  const [showGuide, setShowGuide] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [emergencyContacts, setEmergencyContacts] = useState([]);

  // Apply HTML lang and dir attributes whenever language changes
  const applyHtmlAttributes = useCallback((langObj) => {
    try {
      if (typeof document !== "undefined") {
        document.documentElement.lang = langObj.code;
        document.documentElement.dir = langObj.dir || "ltr";
      }
    } catch (e) {
      console.warn("Could not set document lang/dir:", e);
    }
  }, []);

  // Initialize from localStorage
  useEffect(() => {
    try {
      const u = localStorage.getItem("er_user");
      const savedSingleLang = localStorage.getItem("er_lang");
      const savedMultiLangs = localStorage.getItem("er_langs");
      const c = localStorage.getItem("er_contacts");

      if (u) setUser(JSON.parse(u));

      let initialLang = "English";
      if (savedSingleLang) {
        initialLang = savedSingleLang;
      } else if (savedMultiLangs) {
        try {
          const parsed = JSON.parse(savedMultiLangs);
          if (Array.isArray(parsed) && parsed.length > 0) {
            initialLang = parsed[0];
          } else if (typeof parsed === "string") {
            initialLang = parsed;
          }
        } catch {}
      }

      const validated = normalizeLanguage(initialLang);
      setLanguageState(validated.name);
      applyHtmlAttributes(validated);

      if (c) setEmergencyContacts(JSON.parse(c));
    } catch (e) {
      console.error("Initialization error:", e);
    }
  }, [applyHtmlAttributes]);

  // Set the single active language across the entire application
  const setLanguage = useCallback((newLang) => {
    const validated = normalizeLanguage(newLang);
    setLanguageState(validated.name);
    applyHtmlAttributes(validated);

    try {
      localStorage.setItem("er_lang", validated.name);
      // Keep er_langs array for backward compatibility
      localStorage.setItem("er_langs", JSON.stringify([validated.name]));
    } catch (e) {
      console.error("Failed to persist language:", e);
    }
  }, [applyHtmlAttributes]);

  // Backward-compatibility alias methods
  const setPrimaryLanguage = useCallback((lang) => {
    setLanguage(lang);
  }, [setLanguage]);

  const saveLanguages = useCallback((langs) => {
    const target = Array.isArray(langs) ? langs[0] : langs;
    setLanguage(target);
  }, [setLanguage]);

  const saveEmergencyContacts = (contacts) => {
    setEmergencyContacts(contacts);
    localStorage.setItem("er_contacts", JSON.stringify(contacts));
  };

  const login = (name, email) => {
    const u = { name, email };
    setUser(u);
    localStorage.setItem("er_user", JSON.stringify(u));
    // Check if first time user
    const wasUser = localStorage.getItem("er_was_user");
    if (!wasUser) {
      setIsNewUser(true);
      localStorage.setItem("er_was_user", "true");
    }
  };

  const logout = () => {
    setUser(null);
    setLanguage("English");
    setShowGuide(false);
    setIsNewUser(false);
    setEmergencyContacts([]);
    localStorage.removeItem("er_user");
    localStorage.removeItem("er_lang");
    localStorage.removeItem("er_langs");
    localStorage.removeItem("er_contacts");
  };

  const currentLangObj = useMemo(() => normalizeLanguage(language), [language]);
  const t = useMemo(() => getTranslation(language), [language]);

  return (
    <Ctx.Provider
      value={{
        user,
        login,
        logout,
        language,
        currentLanguage: language,
        primaryLang: language, // Backward compatibility
        selectedLanguages: [language], // Backward compatibility
        setLanguage,
        setPrimaryLanguage, // Backward compatibility
        saveLanguages, // Backward compatibility
        currentLangObj,
        showGuide,
        setShowGuide,
        isNewUser,
        setIsNewUser,
        t,
        emergencyContacts,
        saveEmergencyContacts,
        supportedLanguages: SUPPORTED_LANGUAGES,
      }}
    >
      {children}
    </Ctx.Provider>
  );
};

export const useAppContext = () => useContext(Ctx);