import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { SUPPORTED_LANGUAGES } from "../i18n/translations";
import "./LanguageSelect.css";

const LanguageSelect = () => {
  const { setLanguage, user, t, language } = useAppContext();
  const [selected, setSelected] = useState(language || "English");
  const navigate = useNavigate();

  const handleSelect = (langName) => {
    setSelected(langName);
    setLanguage(langName);
  };

  const handleSave = () => {
    setLanguage(selected);
    navigate("/");
  };

  return (
    <div className="lang-bg">
      <div className="lang-container">
        <div className="lang-header">
          <h1 className="lang-title">{t?.auth?.step2Title || "Choose Your Language"}</h1>
          <p className="lang-subtitle">
            {user?.name ? `Hi ${user.name}! ` : ""}{t?.auth?.step2Desc || "Select your active language for emergency guidance."}
          </p>
        </div>

        <div className="lang-grid" role="radiogroup" aria-label="Available languages">
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = selected === lang.name;
            return (
              <button
                key={lang.code}
                role="radio"
                aria-checked={isSelected}
                aria-label={`${lang.name} (${lang.nativeName})`}
                className={`lang-card ${isSelected ? "selected" : ""}`}
                onClick={() => handleSelect(lang.name)}
              >
                <span className="lang-script" aria-hidden="true">{lang.scriptId}</span>
                <span className="lang-native">{lang.nativeName}</span>
                <span className="lang-name">{lang.name}</span>
                {isSelected && (
                  <span className="lang-check" aria-hidden="true">✓</span>
                )}
              </button>
            );
          })}
        </div>

        <button className="lang-save-btn" onClick={handleSave}>
          {t?.auth?.continueBtn ? `${t.auth.continueBtn} (${selected}) →` : `Continue with ${selected} →`}
        </button>
      </div>
    </div>
  );
};

export default LanguageSelect;