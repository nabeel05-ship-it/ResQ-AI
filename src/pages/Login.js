import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { SUPPORTED_LANGUAGES } from "../i18n/translations";
import BrandLogo from "../components/BrandLogo";
import LangPickerModal from "../components/LangPickerModal";
import "./Login.css";

const AI_LANG_PREVIEW = {
  English: "I will guide you step-by-step through any emergency.",
  Hindi: "हिन्दी में आपातकाल में स्पष्ट मार्गदर्शन करूँगा।",
  Kannada: "ಕನ್ನಡದಲ್ಲಿ ತುರ್ತು ಸಂದರ್ಭದಲ್ಲಿ ಹಂತ ಹಂತವಾಗಿ ಮಾರ್ಗದರ್ಶನ ಮಾಡುತ್ತೇನೆ.",
  Marathi: "मराठीत आपत्कालीन परिस्थितीत टप्प्याटप्प्याने मार्गदर्शन करेन.",
  Bengali: "বাংলায় জরুরি পরিস্থিতিতে ধাপে ধাপে সাহায্য করব।",
  Tamil: "தமிழில் அவசர நிலையில் படிப்படியாக வழிகாட்டுவேன்.",
  Telugu: "తెలుగులో అత్యవసర పరిస్థితిలో దశలవారీగా సహాయం చేస్తాను.",
  Gujarati: "ગુજરાતીમાં કટોકટીમાં સ્પષ્ટ માર્ગદર્શન આપીશ.",
  Punjabi: "ਪੰਜਾਬੀ ਵਿੱਚ ਐਮਰਜੈਂਸੀ ਵਿੱਚ ਕਦਮ-ਦਰ-ਕਦਮ ਮਦਦ ਕਰਾਂਗਾ।",
  Malayalam: "മലയാളത്തിൽ അടിയന്തര ഘട്ടത്തിൽ ഘട്ടങ്ങളായി സഹായിക്കും.",
  Urdu: "اردو میں ہنگامی صورتحال میں مرحلہ وار رہنمائی کروں گا۔",
  Odia: "ଓଡ଼ିଆରେ ଜରୁରୀ ପରିସ୍ଥିତିରେ ସଠିକ୍ ସାହାଯ୍ୟ କରିବି।",
};

export default function Login() {
  const [step, setStep] = useState("auth"); // "auth" | "language"
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [langModalOpen, setLangModalOpen] = useState(false);

  const { login, user, t, language, setLanguage, currentLangObj } = useAppContext();
  const navigate = useNavigate();

  // If already authenticated and not configuring languages, navigate to home
  useEffect(() => {
    if (user && step !== "language") {
      navigate("/");
    }
  }, [user, navigate, step]);

  const validateEmail = (val) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setError("");

    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    if (!cleanEmail) {
      setError(t?.auth?.errors?.fillAll || "Please enter your email address.");
      return;
    }

    if (!validateEmail(cleanEmail)) {
      setError(t?.auth?.errors?.invalidCreds || "Please enter a valid email address.");
      return;
    }

    if (mode === "signup" && !name.trim()) {
      setError(t?.auth?.errors?.fillAll || "Please enter your full name.");
      return;
    }

    if (!cleanPassword) {
      setError(t?.auth?.errors?.fillAll || "Please enter your password.");
      return;
    }

    if (cleanPassword.length < 6) {
      setError(t?.auth?.errors?.pwShort || "Password must be at least 6 characters long.");
      return;
    }

    if (mode === "signup" && cleanPassword !== confirmPassword.trim()) {
      setError(t?.auth?.errors?.pwMatch || "Passwords do not match. Please re-enter.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const userName = mode === "signup" ? name.trim() : cleanEmail.split("@")[0];
      login(userName, cleanEmail);
      setLoading(false);
      setStep("language");
    }, 400);
  };

  const handleDemoLogin = () => {
    setError("");
    setName("Dhruv");
    setEmail("dhruv@resq.ai");
    setPassword("demo123456");
    setLoading(true);

    setTimeout(() => {
      login("Dhruv", "dhruv@resq.ai");
      setLoading(false);
      navigate("/");
    }, 350);
  };

  const currentPrimary = language || "English";
  const aiLine = AI_LANG_PREVIEW[currentPrimary] || AI_LANG_PREVIEW.English;

  const capabilities = [
    {
      title: t?.auth?.capabilities?.offline || "Emergency Guidance",
      desc: t?.home?.heroSub || "Understand clear, step-by-step first-aid instructions.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M12 8v8" />
          <path d="M8 12h8" />
        </svg>
      ),
    },
    {
      title: t?.auth?.capabilities?.multilingual || "Your Language",
      desc: t?.nav?.languages ? `12 ${t.nav.languages}` : "Access emergency guidance in supported Indian languages.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      ),
    },
    {
      title: t?.home?.offlineSection || "Offline Access",
      desc: t?.home?.worksOffline || "Access bundled emergency guides without an internet connection.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M22.61 16.95A5 5 0 0 0 18 10h-1.26a8 8 0 0 0-7.05-6M5 5a8 8 0 0 0-4 7h1.26a5 5 0 0 0 5 5" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
      ),
    },
    {
      title: t?.auth?.capabilities?.sos || "SOS & Location Sharing",
      desc: t?.sos?.sub || "Reach trusted contacts using the supported emergency workflow.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4.93 19.07a10 10 0 0 1 0-14.14" />
          <path d="M7.76 16.24a6 6 0 0 1 0-8.48" />
          <circle cx="12" cy="12" r="2" />
          <path d="M16.24 7.76a6 6 0 0 1 0 8.48" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      ),
    },
  ];

  // ─── STEP 2: LANGUAGE SELECTION ──────────────────────────────────────────
  if (step === "language") {
    return (
      <div className="auth-page">
        {langModalOpen && <LangPickerModal onClose={() => setLangModalOpen(false)} />}
        {/* Header */}
        <header className="auth-header">
          <div className="auth-brand">
            <BrandLogo variant="compact" size={38} theme="light" showTagline={true} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button
              type="button"
              className="auth-lang-btn"
              onClick={() => setLangModalOpen(true)}
              title={t?.nav?.changeLanguages || "Change language"}
              style={{
                background: "rgba(15,23,42,0.06)",
                border: "1px solid rgba(15,23,42,0.12)",
                borderRadius: "999px",
                padding: "6px 12px",
                fontSize: "13px",
                fontWeight: "600",
                color: "#0f172a",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              🌐 <span>{currentPrimary}</span>
            </button>
            <a href="tel:112" className="auth-emergency-action" title="Call Emergency Services (112)">
              <span className="auth-emergency-dot" />
              <span className="emergency-label-full">{t?.nav?.emergencyCall || "Emergency: Call 112"}</span>
              <span className="emergency-label-short" style={{ display: "none" }}>112</span>
            </a>
          </div>
        </header>

        {/* Content */}
        <main className="auth-main">
          <div className="auth-lang-wrap">
            <div className="auth-lang-card">
              <div className="auth-lang-badge">{t?.auth?.step2Badge || "Step 2 of 2 · Preferences"}</div>
              <h1 className="auth-lang-title">{t?.auth?.step2Title || "Choose your language"}</h1>
              <p className="auth-lang-desc">
                {t?.auth?.step2Desc || "Select your active language for emergency guidance and assistance."}
              </p>

              {/* AI Persona Preview Bubble */}
              <div className="auth-ai-bubble" role="status" style={{ display: "flex", gap: "12px", padding: "12px 14px", background: "#f8fafc", borderRadius: "12px", marginBottom: "20px", border: "1px solid #e2e8f0" }}>
                <div className="auth-ai-avatar" aria-hidden="true">
                  <BrandLogo variant="icon" size={24} isDecorative={true} alt="" />
                </div>
                <div className="auth-ai-content">
                  <span className="auth-ai-name" style={{ fontWeight: 700, fontSize: "13px", color: "#0f172a" }}>ResQ AI</span>
                  <p className="auth-ai-text" style={{ margin: "2px 0 0", fontSize: "13px", color: "#334155" }}>{aiLine}</p>
                </div>
              </div>

              {/* Languages Grid */}
              <div className="auth-lang-grid" role="radiogroup" aria-label="Available languages">
                {SUPPORTED_LANGUAGES.map((l) => {
                  const isSelected = language === l.name;
                  return (
                    <button
                      key={l.code}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      className={`auth-lang-tile ${isSelected ? "selected" : ""}`}
                      onClick={() => setLanguage(l.name)}
                      style={{
                        padding: "12px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "4px",
                        cursor: "pointer",
                        position: "relative",
                        border: isSelected ? "2px solid #4f46e5" : "1px solid #e2e8f0",
                        borderRadius: "14px",
                        background: isSelected ? "#f5f7ff" : "#ffffff",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "32px",
                          height: "32px",
                          borderRadius: "8px",
                          background: isSelected ? "rgba(79,70,229,0.15)" : "#f1f5f9",
                          color: isSelected ? "#4338ca" : "#334155",
                          fontWeight: 800,
                          fontSize: "15px",
                        }}
                      >
                        {l.scriptId}
                      </span>
                      <div className="auth-tile-native" style={{ marginTop: "4px" }}>{l.nativeName}</div>
                      <div className="auth-tile-region">{l.name} · {l.region}</div>
                      {isSelected && <span className="auth-tile-check" aria-hidden="true" style={{ background: "#4f46e5" }}>✓</span>}
                    </button>
                  );
                })}
              </div>

              {/* Save & Finish Button */}
              <button
                type="button"
                className="auth-lang-submit-btn"
                onClick={() => navigate("/")}
              >
                {t?.auth?.continueBtn ? `${t.auth.continueBtn} (${currentPrimary}) →` : `Continue with ${currentPrimary} →`}
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ─── STEP 1: AUTHENTICATION (SIGN IN / CREATE ACCOUNT) ────────────────────
  return (
    <div className="auth-page">
      {langModalOpen && <LangPickerModal onClose={() => setLangModalOpen(false)} />}
      {/* Top Emergency & Brand Header */}
      <header className="auth-header">
        <div className="auth-brand">
          <BrandLogo variant="compact" size={38} theme="light" showTagline={true} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button
            type="button"
            className="auth-lang-btn"
            onClick={() => setLangModalOpen(true)}
            title={t?.nav?.changeLanguages || "Change language"}
            aria-label={t?.nav?.changeLanguages || "Change language"}
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1.5px solid rgba(99, 102, 241, 0.5)",
              borderRadius: "9999px",
              padding: "6px 14px 6px 8px",
              fontSize: "13px",
              fontWeight: "700",
              color: "#ffffff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3), 0 0 14px rgba(99, 102, 241, 0.25)",
            }}
          >
            <span
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #4f46e5, #6366f1)",
                color: "#ffffff",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "13px",
                fontWeight: "800",
                boxShadow: "0 2px 6px rgba(79, 70, 229, 0.4)",
              }}
            >
              {currentLangObj?.scriptId || "EN"}
            </span>
            <span style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", lineHeight: "1.15" }}>
              <span style={{ fontSize: "9.5px", textTransform: "uppercase", letterSpacing: "0.06em", color: "#a5b4fc", fontWeight: "700" }}>
                {t?.nav?.languages || "Language"}
              </span>
              <span style={{ fontSize: "13px", fontWeight: "700", color: "#ffffff" }}>
                {currentLangObj?.nativeName || currentPrimary}
              </span>
            </span>
            <span style={{ fontSize: "10px", color: "#94a3b8", marginLeft: "2px" }}>▼</span>
          </button>
          <a href="tel:112" className="auth-emergency-action" title="Immediate life threat: Dial 112 directly">
            <span className="auth-emergency-dot" />
            <span className="emergency-label-full">{t?.nav?.emergencyCall || "Immediate Emergency: Call 112"}</span>
          </a>
        </div>
      </header>

      {/* Main Split Layout */}
      <main className="auth-main">
        <div className="auth-container">
          {/* Left Column: Product Information */}
          <aside className="auth-info-col">
            <div className="auth-hero-brand" style={{ marginBottom: "20px" }}>
              <BrandLogo variant="full" size={130} showTagline={false} />
            </div>
            <div className="auth-eyebrow">
              <span className="auth-eyebrow-indicator" aria-hidden="true" />
              <span>{t?.auth?.companionEyebrow || "AI-Assisted Emergency Companion"}</span>
            </div>
            <h1 className="auth-headline">{t?.auth?.heroHeadline || "Help when every second matters."}</h1>
            <p className="auth-subhead">
              {t?.auth?.heroSubhead || "Emergency guidance you can understand, in a language you know, even when connectivity is limited."}
            </p>

            {/* Core Capability Highlights */}
            <div className="auth-capabilities" role="list">
              {capabilities.map((cap) => (
                <div key={cap.title} className="auth-cap-item" role="listitem">
                  <div className="auth-cap-icon-box" aria-hidden="true">
                    {cap.icon}
                  </div>
                  <div className="auth-cap-content">
                    <span className="auth-cap-title">{cap.title}</span>
                    <span className="auth-cap-desc">{cap.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Privacy & Trust Statement */}
            <div className="auth-trust-note">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span>{t?.auth?.privacyNote || "Private by design. Your contacts and emergency preferences remain stored locally on your device."}</span>
            </div>
          </aside>

          {/* Right Column: Authentication Card */}
          <section className="auth-card-wrap">
            <div className="auth-card">


              {/* Tab Selector */}
              <div className="auth-tabs" aria-label="Authentication modes">
                <button
                  type="button"
                  id="tab-login"
                  className={`auth-tab-btn ${mode === "login" ? "active" : ""}`}
                  onClick={() => { setMode("login"); setError(""); }}
                >
                  {t?.auth?.loginTab || "Log in"}
                </button>
                <button
                  type="button"
                  id="tab-signup"
                  className={`auth-tab-btn ${mode === "signup" ? "active" : ""}`}
                  onClick={() => { setMode("signup"); setError(""); }}
                >
                  {t?.auth?.signupTab || "Sign up"}
                </button>
              </div>

              {/* Header Info */}
              <div id="auth-form-panel" role="tabpanel" aria-labelledby={mode === "login" ? "tab-login" : "tab-signup"}>
                <h2 className="auth-form-title">
                  {mode === "login"
                    ? (t?.auth?.welcomeBack || "Welcome back")
                    : (t?.auth?.createAccount || "Create your account")}
                </h2>
                <p className="auth-form-sub">
                  {mode === "login"
                    ? (t?.auth?.loginSubtitle || "Sign in to access your account and emergency tools.")
                    : (t?.auth?.signupSubtitle || "Sign up to set up trusted contacts and personalized emergency guidance.")}
                </p>

                {/* Authentication Form */}
                <form className="auth-form" onSubmit={handleAuthSubmit} noValidate>
                  {/* Full Name (Sign Up only) */}
                  {mode === "signup" && (
                    <div className="auth-field">
                      <label htmlFor="auth-name" className="auth-label">
                        {t?.auth?.fullName || "Full name"}
                      </label>
                      <div className="auth-input-wrap">
                        <input
                          id="auth-name"
                          name="name"
                          type="text"
                          className="auth-input"
                          placeholder={t?.auth?.namePlaceholder || "Aditya Kumar"}
                          autoComplete="name"
                          value={name}
                          onChange={(e) => { setName(e.target.value); setError(""); }}
                          disabled={loading}
                        />
                      </div>
                    </div>
                  )}

                  {/* Email Field */}
                  <div className="auth-field">
                    <label htmlFor="auth-email" className="auth-label">
                      {t?.auth?.email || "Email address"}
                    </label>
                    <div className="auth-input-wrap">
                      <input
                        id="auth-email"
                        name="email"
                        type="email"
                        className={`auth-input ${error && !email ? "has-error" : ""}`}
                        placeholder={t?.auth?.emailPlaceholder || "you@example.com"}
                        autoComplete="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setError(""); }}
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="auth-field">
                    <label htmlFor="auth-password" className="auth-label">
                      <span>{t?.auth?.password || "Password"}</span>
                    </label>
                    <div className="auth-input-wrap">
                      <input
                        id="auth-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        className={`auth-input ${error && !password ? "has-error" : ""}`}
                        placeholder={mode === "signup" ? (t?.auth?.pwHint || "At least 6 characters") : (t?.auth?.passwordPlaceholder || "Enter your password")}
                        autoComplete={mode === "signup" ? "new-password" : "current-password"}
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); setError(""); }}
                        disabled={loading}
                      />
                      <button
                        type="button"
                        className="auth-pw-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        tabIndex={0}
                      >
                        {showPassword ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                            <line x1="1" y1="1" x2="23" y2="23" />
                          </svg>
                        ) : (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        )}
                      </button>
                    </div>
                    {mode === "signup" && (
                      <span className="auth-field-hint">{t?.auth?.pwHint || "Must be at least 6 characters."}</span>
                    )}
                  </div>

                  {/* Confirm Password Field (Sign Up only) */}
                  {mode === "signup" && (
                    <div className="auth-field">
                      <label htmlFor="auth-confirm-password" className="auth-label">
                        {t?.auth?.confirmPassword || "Confirm password"}
                      </label>
                      <div className="auth-input-wrap">
                        <input
                          id="auth-confirm-password"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          className={`auth-input ${error && confirmPassword !== password ? "has-error" : ""}`}
                          placeholder={t?.auth?.confirmPasswordPlaceholder || "Re-enter your password"}
                          autoComplete="new-password"
                          value={confirmPassword}
                          onChange={(e) => { setConfirmPassword(e.target.value); setError(""); }}
                          disabled={loading}
                        />
                        <button
                          type="button"
                          className="auth-pw-toggle"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                          tabIndex={0}
                        >
                          {showConfirmPassword ? (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                              <line x1="1" y1="1" x2="23" y2="23" />
                            </svg>
                          ) : (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Inline Error Notification */}
                  {error && (
                    <div className="auth-error-banner" role="alert" aria-live="assertive">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Primary CTA */}
                  <button
                    type="submit"
                    className="auth-submit-btn"
                    disabled={loading}
                    aria-busy={loading}
                  >
                    {loading
                      ? (mode === "login" ? (t?.auth?.signingIn || "Signing in…") : (t?.auth?.creatingAccount || "Creating account…"))
                      : (mode === "login" ? (t?.auth?.signInBtn || "Sign in") : (t?.auth?.signUpBtn || "Create account"))}
                  </button>
                </form>

                {/* Demo Login CTA */}
                <div className="auth-divider">
                  <span className="auth-divider-line" />
                  <span className="auth-divider-text">{t?.auth?.orQuickDemo || "or quick demo"}</span>
                  <span className="auth-divider-line" />
                </div>

                <button
                  type="button"
                  id="demo-login-btn"
                  data-testid="demo-login-btn"
                  className="auth-demo-btn"
                  onClick={handleDemoLogin}
                  disabled={loading}
                  aria-label="Demo login as Dhruv"
                >
                  <svg
                    className="auth-demo-icon"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <polyline points="16 11 18 13 22 9" />
                  </svg>
                  <span>
                    {loading && email === "dhruv@resq.ai"
                      ? (t?.auth?.signingInAsDhruv || "Signing in as Dhruv…")
                      : (t?.auth?.demoLogin || "Demo Login (Dhruv)")}
                  </span>
                </button>

                {/* Secondary Action Switcher */}
                <div className="auth-switch-prompt">
                  {mode === "login" ? (
                    <span>
                      {t?.auth?.noAccount || "Don't have an account?"}{" "}
                      <button
                        type="button"
                        className="auth-switch-link"
                        onClick={() => { setMode("signup"); setError(""); }}
                      >
                        {t?.auth?.createAccount || "Create an account"}
                      </button>
                    </span>
                  ) : (
                    <span>
                      {t?.auth?.haveAccount || "Already have an account?"}{" "}
                      <button
                        type="button"
                        className="auth-switch-link"
                        onClick={() => { setMode("login"); setError(""); }}
                      >
                        {t?.auth?.signInBtn || "Sign in"}
                      </button>
                    </span>
                  )}
                </div>

                {/* Emergency Notice */}
                <p className="auth-card-notice">
                  {t?.auth?.emergencyNotice || "In an immediate life-threatening emergency, call 112 directly."}
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
