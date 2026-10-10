import React from "react";
import { useAppContext } from "../context/AppContext";
import { SUPPORTED_LANGUAGES } from "../i18n/translations";
import BrandLogo from "./BrandLogo";

const AI_PREVIEW = {
  English:   "Hello! I'm ResQ AI 🚨 I'll guide you in English in any emergency!",
  Hindi:     "नमस्ते! मैं ResQ AI हूँ 🚨 हिन्दी में आपातकालीन मार्गदर्शन करूँगा!",
  Kannada:   "ನಮಸ್ಕಾರ! ನಾನು ResQ AI 🚨 ತುರ್ತು ಪರಿಸ್ಥಿತಿಯಲ್ಲಿ ಕನ್ನಡದಲ್ಲಿ ಮಾರ್ಗದರ್ಶನ ಮಾಡುತ್ತೇನೆ!",
  Marathi:   "नमस्कार! मी ResQ AI 🚨 मराठीत आपत्कालीन मार्गदर्शन करेन!",
  Bengali:   "হ্যালো! আমি ResQ AI 🚨 বাংলায় জরুরি সাহায্য প্রদান করব!",
  Tamil:     "வணக்கம்! நான் ResQ AI 🚨 தமிழில் அவசர வழிகாட்டுதல் வழங்குவேன்!",
  Telugu:    "నమస్కారం! నేను ResQ AI 🚨 అత్యవసర పరిస్థితుల్లో తెలుగులో సహాయం చేస్తాను!",
  Gujarati:  "નમસ્તે! હું ResQ AI 🚨 ગુજરાતીમાં કટોકટી માર્ગદર્શન આપીશ!",
  Punjabi:   "ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ResQ AI 🚨 ਐਮਰਜੈਂਸੀ ਵਿੱਚ ਪੰਜਾਬੀ ਵਿੱਚ ਮਦਦ ਕਰਾਂਗਾ!",
  Malayalam: "നമസ്കാരം! ഞാൻ ResQ AI 🚨 അടിയന്തര ഘട്ടത്തിൽ മലയാളത്തിൽ സഹായിക്കും!",
  Urdu:      "السلام علیکم! میں ResQ AI 🚨 ہنگامی صورتحال میں اردو میں رہنمائی کروں گا!",
  Odia:      "ନମସ୍କାର! ମୁଁ ResQ AI 🚨 ଜରୁରୀ ପରିସ୍ଥିତିରେ ଓଡ଼ିଆରେ ସାହାଯ୍ୟ କରିବି!",
};

export default function LangPickerModal({ onClose }) {
  const { language, setLanguage, t } = useAppContext();

  const handleSelectLanguage = (langName) => {
    setLanguage(langName);
    if (onClose) onClose();
  };

  const preview = AI_PREVIEW[language] || AI_PREVIEW["English"];

  return (
    <div style={overlay} onClick={onClose} role="dialog" aria-modal="true" aria-label="Language Selector">
      <div style={modal} onClick={(e) => e.stopPropagation()}>
        <button
          style={closeBtn}
          onClick={onClose}
          aria-label="Close language selector"
        >
          ×
        </button>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "14px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "8px" }}>
            <BrandLogo variant="icon" size={28} isDecorative={true} alt="" />
          </div>
          <h2 style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a", margin: "0 0 4px" }}>
            {t?.nav?.languages || "Select Language"} / भाषा चुनें
          </h2>
          <p style={{ fontSize: "12px", color: "#64748b", margin: 0 }}>
            {t?.auth?.step2Desc || "Select your active language for instant emergency response"}
          </p>
        </div>

        {/* AI preview bubble */}
        <div style={previewBubble}>
          <BrandLogo variant="icon" size={22} isDecorative={true} alt="" />
          <p style={{ fontSize: "12px", color: "#3730a3", fontWeight: "600", lineHeight: "1.5", margin: 0 }}>
            {preview}
          </p>
        </div>

        {/* Active Language Label */}
        <div style={activeBar}>
          <span style={{ fontSize: "12px", color: "#475569", fontWeight: "600" }}>Active Language:</span>
          <span style={activeBadge}>
            <strong>{language}</strong>
          </span>
        </div>

        {/* Language grid - 12 Indian Languages with Native Script Identifiers */}
        <div style={grid} role="radiogroup" aria-label="Supported Languages">
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = language === lang.name;
            return (
              <button
                key={lang.code}
                role="radio"
                aria-checked={isSelected}
                aria-label={`${lang.name} (${lang.nativeName})`}
                style={langCard(isSelected)}
                onClick={() => handleSelectLanguage(lang.name)}
              >
                {/* Script Identifier Badge (Replaces country flags) */}
                <span
                  style={scriptBadge(isSelected)}
                  aria-hidden="true"
                >
                  {lang.scriptId}
                </span>

                {/* Native Name */}
                <span style={{
                  fontSize: "13px",
                  fontWeight: "700",
                  color: isSelected ? "#3730a3" : "#0f172a",
                  textAlign: "center",
                  lineHeight: "1.2",
                }}>
                  {lang.nativeName}
                </span>

                {/* English Name and Region */}
                <span style={{
                  fontSize: "10px",
                  color: isSelected ? "#4f46e5" : "#64748b",
                  fontWeight: isSelected ? "700" : "500",
                  textAlign: "center",
                }}>
                  {lang.name}
                </span>

                {/* Selected Indicator */}
                {isSelected && (
                  <span style={activeCheck} title="Active Language">
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Done / Close button */}
        <button
          data-testid="save-languages-btn"
          aria-label="Done"
          style={doneBtn}
          onClick={onClose}
        >
          {t?.auth?.continueBtn ? `${t.auth.continueBtn} (${language}) →` : `Done (${language}) →`}
        </button>
      </div>
    </div>
  );
}

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(15,23,42,0.75)",
  backdropFilter: "blur(8px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
  padding: "16px",
};

const modal = {
  background: "#fff",
  borderRadius: "24px",
  padding: "24px 20px 20px",
  width: "100%",
  maxWidth: "420px",
  boxShadow: "0 32px 80px rgba(0,0,0,0.3)",
  position: "relative",
  maxHeight: "92vh",
  overflowY: "auto",
};

const closeBtn = {
  position: "absolute",
  top: "14px",
  right: "14px",
  background: "#f1f5f9",
  border: "none",
  width: "30px",
  height: "30px",
  borderRadius: "50%",
  fontSize: "18px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#64748b",
};

const previewBubble = {
  background: "linear-gradient(135deg, #f0f4ff, #e0e7ff)",
  border: "1px solid #c7d2fe",
  borderRadius: "12px",
  padding: "10px 12px",
  marginBottom: "12px",
  display: "flex",
  gap: "10px",
  alignItems: "center",
};

const activeBar = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: "#f8fafc",
  border: "1px solid #e2e8f0",
  borderRadius: "10px",
  padding: "6px 12px",
  marginBottom: "12px",
};

const activeBadge = {
  background: "#4f46e5",
  color: "#ffffff",
  fontSize: "11px",
  fontWeight: "700",
  padding: "2px 8px",
  borderRadius: "9999px",
  letterSpacing: "0.02em",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "8px",
  marginBottom: "16px",
  maxHeight: "310px",
  overflowY: "auto",
  padding: "2px",
};

const scriptBadge = (isSelected) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "36px",
  height: "36px",
  borderRadius: "10px",
  background: isSelected ? "rgba(79,70,229,0.18)" : "#f1f5f9",
  color: isSelected ? "#4338ca" : "#1e293b",
  fontSize: "16px",
  fontWeight: "800",
  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
  transition: "all 0.15s ease",
});

const langCard = (sel) => ({
  background: sel ? "linear-gradient(135deg, #f5f7ff, #eef2ff)" : "#ffffff",
  border: `2px solid ${sel ? "#4f46e5" : "#e2e8f0"}`,
  borderRadius: "14px",
  padding: "10px 6px 8px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "4px",
  cursor: "pointer",
  position: "relative",
  fontFamily: "inherit",
  transition: "all 0.15s ease",
  boxShadow: sel ? "0 4px 14px rgba(79,70,229,0.2)" : "0 1px 3px rgba(0,0,0,0.04)",
  outline: "none",
});

const activeCheck = {
  position: "absolute",
  top: "5px",
  right: "6px",
  background: "#4f46e5",
  color: "#fff",
  width: "16px",
  height: "16px",
  borderRadius: "50%",
  fontSize: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "800",
};

const doneBtn = {
  width: "100%",
  background: "linear-gradient(135deg, #4f46e5, #6366f1)",
  color: "#fff",
  border: "none",
  padding: "13px",
  borderRadius: "12px",
  fontSize: "14px",
  fontWeight: "700",
  cursor: "pointer",
  fontFamily: "inherit",
  boxShadow: "0 4px 14px rgba(79,70,229,0.3)",
};
