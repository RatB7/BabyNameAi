import React, { useState, useEffect } from "react";
import { X, ShieldCheck, FileText, Cookie, Check, Lock, Sliders, Info, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export type RegulatoryTab = "privacy" | "terms" | "cookie";

interface RegulatoryModalProps {
  isOpen: boolean;
  activeTab: RegulatoryTab;
  onClose: () => void;
  onSelectTab: (tab: RegulatoryTab) => void;
}

export default function RegulatoryModal({
  isOpen,
  activeTab,
  onClose,
  onSelectTab
}: RegulatoryModalProps) {
  // Cookie Preferences state
  const [essentialCookies] = useState(true); // Always true
  const [analyticsCookies, setAnalyticsCookies] = useState(true);
  const [personalizationCookies, setPersonalizationCookies] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Load saved cookie preferences from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("babyname_ai_cookie_prefs");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (typeof parsed.analytics === "boolean") setAnalyticsCookies(parsed.analytics);
        if (typeof parsed.personalization === "boolean") setPersonalizationCookies(parsed.personalization);
      } catch (err) {
        console.error("Failed to parse cookie preferences:", err);
      }
    }
  }, []);

  const handleSaveCookiePrefs = () => {
    const prefs = {
      essential: true,
      analytics: analyticsCookies,
      personalization: personalizationCookies,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem("babyname_ai_cookie_prefs", JSON.stringify(prefs));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleResetCookiePrefs = () => {
    setAnalyticsCookies(true);
    setPersonalizationCookies(true);
    localStorage.setItem(
      "babyname_ai_cookie_prefs",
      JSON.stringify({ essential: true, analytics: true, personalization: true })
    );
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm cursor-pointer"
        />

        {/* Dialog Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative w-full max-w-4xl max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                {activeTab === "privacy" && <ShieldCheck className="w-5 h-5" />}
                {activeTab === "terms" && <FileText className="w-5 h-5" />}
                {activeTab === "cookie" && <Cookie className="w-5 h-5" />}
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">Regulatory & Legal</h3>
                <p className="text-xs text-slate-500 font-medium">Official policies and privacy controls for New Baby Name</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-all cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center border-b border-slate-200 px-6 bg-white gap-2 overflow-x-auto scrollbar-none">
            <button
              onClick={() => onSelectTab("privacy")}
              className={`flex items-center gap-2 py-3.5 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "privacy"
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              Privacy Policy
            </button>

            <button
              onClick={() => onSelectTab("terms")}
              className={`flex items-center gap-2 py-3.5 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "terms"
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <FileText className="w-4 h-4" />
              Terms of Service
            </button>

            <button
              onClick={() => onSelectTab("cookie")}
              className={`flex items-center gap-2 py-3.5 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "cookie"
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <Cookie className="w-4 h-4" />
              Cookie Preferences
            </button>
          </div>

          {/* Modal Body Content */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-slate-600 text-sm leading-relaxed">
            
            {/* 1. PRIVACY POLICY PAGE */}
            {activeTab === "privacy" && (
              <div className="space-y-6 animate-fade-in">
                <div className="bg-indigo-50/60 border border-indigo-100 rounded-2xl p-4 flex items-start gap-3">
                  <Info className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Privacy Overview</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Last updated: July 2026. New Baby Name is committed to protecting your family's personal privacy and preserving transparent data handling practices.
                    </p>
                  </div>
                </div>

                <section className="space-y-2">
                  <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-bold">1</span>
                    Information We Collect
                  </h4>
                  <p>
                    We collect minimal data required to generate personalized baby name recommendations. This includes:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs sm:text-sm">
                    <li><strong>Search Preferences:</strong> Cultural origin, gender selection, starting letters, language, and meaning keywords you select in the filter sidebar.</li>
                    <li><strong>Saved Favorites:</strong> Names saved using the heart icon, stored securely in your web browser's local storage (`localStorage`).</li>
                    <li><strong>AI Prompts:</strong> Custom text provided to our AI sub-tools (e.g., Twin Matcher, Nickname Generator).</li>
                  </ul>
                </section>

                <section className="space-y-2">
                  <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-bold">2</span>
                    How We Use Your Information
                  </h4>
                  <p>
                    Your search choices and prompts are processed solely to query Google Gemini AI models and retrieve grounded name meanings, popularity scores, and linguistic pronunciations. We never sell, rent, or trade your personal information or search queries to third-party advertisers.
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-bold">3</span>
                    Data Security & Browser Storage
                  </h4>
                  <p>
                    Your saved names list is stored locally on your device. Clearing your browser cache or clicking "Clear All Favorites" in the saved drawer will wipe this local data. We employ standard TLS encryption for all server communications.
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-bold">4</span>
                    Third-Party Integration
                  </h4>
                  <p>
                    New Baby Name utilizes Google Search API grounding and Gemini LLM services to verify historical etymologies and real-time popularity charts. Information transmitted to AI models is anonymized and stripped of personal identifiers.
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-bold">5</span>
                    Your Data Rights
                  </h4>
                  <p>
                    You have full control over your saved lists and cookie settings. You can export or clear your saved names at any time, or modify your tracking preferences in the Cookie Preferences tab.
                  </p>
                </section>
              </div>
            )}

            {/* 2. TERMS OF SERVICE PAGE */}
            {activeTab === "terms" && (
              <div className="space-y-6 animate-fade-in">
                <div className="bg-slate-100 rounded-2xl p-4 flex items-start gap-3 border border-slate-200">
                  <Lock className="w-5 h-5 text-slate-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Terms Agreement</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Effective Date: July 2026. By accessing or using New Baby Name, you agree to be bound by these Terms of Service.
                    </p>
                  </div>
                </div>

                <section className="space-y-2">
                  <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-bold">1</span>
                    Acceptance of Terms
                  </h4>
                  <p>
                    By using this website and its AI-powered naming tools, you agree to comply with these terms, applicable laws, and regulations. If you do not agree with any part of these terms, you must discontinue using the application.
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-bold">2</span>
                    AI Content & Educational Disclaimer
                  </h4>
                  <p>
                    Name meanings, pronunciations, numerology scores, and historical origins generated by New Baby Name are provided for educational, cultural, and inspirational purposes only. While our algorithms cross-reference validated dictionaries and search data, cultural interpretations may vary across regions and families.
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-bold">3</span>
                    Intellectual Property
                  </h4>
                  <p>
                    All branding, UI design, custom graphics, and software code are the exclusive property of New Baby Name. You retain full ownership of any custom lists or notes created using our platform for personal, non-commercial use.
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-bold">4</span>
                    Acceptable Use
                  </h4>
                  <p>
                    You agree not to attempt automated scraping, reverse engineering, or denial-of-service attacks against our API endpoints or AI recommendation pipelines.
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-bold">5</span>
                    Modifications to Service
                  </h4>
                  <p>
                    We reserve the right to modify or update these terms at any time. Continued use of the platform following published changes constitutes acceptance of the new terms.
                  </p>
                </section>
              </div>
            )}

            {/* 3. COOKIE PREFERENCES PAGE */}
            {activeTab === "cookie" && (
              <div className="space-y-6 animate-fade-in">
                <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 flex items-start gap-3">
                  <Cookie className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Manage Storage & Cookie Preferences</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Control how local browser storage and cookie technologies are used to personalize your baby name discovery experience.
                    </p>
                  </div>
                </div>

                {/* Preference Toggles List */}
                <div className="space-y-4">
                  {/* Toggle 1: Essential */}
                  <div className="flex items-start justify-between p-4 bg-slate-50 border border-slate-200 rounded-2xl gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">Strictly Essential Storage</span>
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-200 text-slate-700 rounded-md uppercase tracking-wider">
                          Always Active
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Required for core functionality, such as saving your favorite names list to browser localStorage and preserving search filter states during your session.
                      </p>
                    </div>

                    <div className="relative inline-flex items-center cursor-not-allowed opacity-60">
                      <input type="checkbox" checked={essentialCookies} disabled className="sr-only peer" />
                      <div className="w-11 h-6 bg-indigo-600 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" />
                    </div>
                  </div>

                  {/* Toggle 2: Analytics */}
                  <div className="flex items-start justify-between p-4 bg-white border border-slate-200 rounded-2xl gap-4 hover:border-slate-300 transition-all">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">Performance & Usage Analytics</span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Helps us measure which naming origins, styles, and AI sub-tools are most helpful so we can continually optimize our AI recommendation quality.
                      </p>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                      <input
                        type="checkbox"
                        checked={analyticsCookies}
                        onChange={(e) => setAnalyticsCookies(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600" />
                    </label>
                  </div>

                  {/* Toggle 3: Personalization */}
                  <div className="flex items-start justify-between p-4 bg-white border border-slate-200 rounded-2xl gap-4 hover:border-slate-300 transition-all">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">Personalization Memory</span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Remembers your preferred cultural origins, gender selections, and naming styles across multiple visits so you don't have to re-enter filters.
                      </p>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                      <input
                        type="checkbox"
                        checked={personalizationCookies}
                        onChange={(e) => setPersonalizationCookies(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600" />
                    </label>
                  </div>
                </div>

                {/* Cookie Actions Footer */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    onClick={handleResetCookiePrefs}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset to Defaults
                  </button>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    {savedSuccess && (
                      <span className="text-xs font-extrabold text-emerald-600 flex items-center gap-1 animate-fade-in">
                        <Check className="w-4 h-4" />
                        Preferences Saved
                      </span>
                    )}
                    <button
                      onClick={handleSaveCookiePrefs}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs tracking-wide transition-all cursor-pointer shadow-md shadow-indigo-600/10 flex items-center justify-center gap-2"
                    >
                      Save Preferences
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Footer Bar */}
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between text-xs text-slate-500">
            <span>© {new Date().getFullYear()} New Baby Name Regulatory Suite</span>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 font-bold transition-all cursor-pointer"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
