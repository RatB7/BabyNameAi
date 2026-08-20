import React, { useState, useEffect } from "react";
import { FilterState, BabyName, SearchSource } from "./types";
import { INITIAL_CURATED_NAMES } from "./data";

// Sub-components
import HeroSection from "./components/HeroSection";
import FilterPanel from "./components/FilterPanel";
import ResultGrid from "./components/ResultGrid";
import AiSection from "./components/AiSection";
import FeaturesSection from "./components/FeaturesSection";
import TestimonialsSection from "./components/TestimonialsSection";
import FaqSection from "./components/FaqSection";
import Footer from "./components/Footer";
import BrandLogo from "./components/BrandLogo";
import RegulatoryModal, { RegulatoryTab } from "./components/RegulatoryModal";

import { copyToClipboard } from "./utils/clipboard";

// Icons
import { Sparkles, Heart, Trash2, Copy, Check, Menu, X, ExternalLink, Moon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const INITIAL_FILTERS: FilterState = {
  country: "Any",
  religion: "Any",
  language: "Any",
  gender: "Any",
  startsWith: "Any",
  endsWith: "Any",
  meaningKeyword: "",
  popularity: "Any",
  style: "Any",
  scarcity: "Any",
  lettersCount: "Any",
  origin: "",
  birthMonth: "Any",
  zodiac: "Any",
  nature: false,
  royal: false,
  mythology: false,
  spiritual: false,
  celebrity: false
};

export default function App() {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [names, setNames] = useState<BabyName[]>(INITIAL_CURATED_NAMES);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchSources, setSearchSources] = useState<SearchSource[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Favorites Panel state
  const [isFavDrawerOpen, setIsFavDrawerOpen] = useState(false);
  const [favCopied, setFavCopied] = useState(false);

  // Regulatory Modal state
  const [isRegulatoryOpen, setIsRegulatoryOpen] = useState(false);
  const [regulatoryTab, setRegulatoryTab] = useState<RegulatoryTab>("privacy");

  const handleOpenRegulatory = (tab: RegulatoryTab) => {
    setRegulatoryTab(tab);
    setIsRegulatoryOpen(true);
  };

  // Load favorites from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("babyname_ai_favorites");
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (err) {
        console.error("Failed to parse favorites:", err);
      }
    }
  }, []);

  // Update a specific filter value
  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  // Reset all filters to default
  const handleClearFilters = () => {
    setFilters(INITIAL_FILTERS);
    setNames(INITIAL_CURATED_NAMES);
    setSearchSources([]);
    setError(null);
  };

  // Toggle saving / unsaving a name in favorites
  const handleToggleFavorite = (name: string) => {
    let updated: string[];
    if (favorites.includes(name)) {
      updated = favorites.filter((f) => f !== name);
    } else {
      updated = [...favorites, name];
    }
    setFavorites(updated);
    localStorage.setItem("babyname_ai_favorites", JSON.stringify(updated));
  };

  // Trigger discovery search grounded with Google Search API on the server
  const handleDiscoverNames = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/generate-names", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...filters,
          requestNonce: `${Date.now()}_${Math.random().toString(36).substring(2, 8)}`
        })
      });

      if (!response.ok) {
        throw new Error("Could not fetch name suggestions. Please try again.");
      }

      const data = await response.json();
      if (data.names && data.names.length > 0) {
        setNames(data.names);
        setSearchSources(data.searchSources || []);
        setError(null);
        
        // Scroll smoothly to result grid so user instantly sees new names
        setTimeout(() => {
          scrollToId("result-grid-container");
        }, 100);
      } else {
        setNames([]);
        throw new Error("No names found matching your criteria.");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  // Scroll helpers
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Copy saved list to clipboard helper
  const handleCopyFavoritesList = async () => {
    if (favorites.length === 0) return;
    const text = `My Saved Baby Names from New Baby Name ✨\n\n${favorites.map((f, i) => `${i + 1}. ${f}`).join("\n")}`;
    const success = await copyToClipboard(text);
    if (success) {
      setFavCopied(true);
      setTimeout(() => setFavCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between" id="app-wrapper">
      
      {/* Premium Header Navigation Bar */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-[#F1F5F9] z-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <div className="cursor-pointer" onClick={() => scrollToId("app-wrapper")}>
            <BrandLogo size="md" />
          </div>

          {/* Desktop Nav Items */}
          <nav className="flex items-center gap-6 text-sm font-semibold text-[#64748B]">
            <button onClick={() => scrollToId("filter-panel")} className="hover:text-[#0F172A] cursor-pointer transition-colors">Explore</button>
            <button onClick={() => scrollToId("ai-section")} className="hover:text-[#0F172A] cursor-pointer transition-colors">AI Suite</button>
            <button onClick={() => scrollToId("features-section")} className="hover:text-[#0F172A] cursor-pointer transition-colors">Features</button>
            <button onClick={() => scrollToId("testimonials-section")} className="hover:text-[#0F172A] cursor-pointer transition-colors">Reviews</button>
            <button onClick={() => scrollToId("faq-section")} className="hover:text-[#0F172A] cursor-pointer transition-colors">FAQ</button>
          </nav>

        </div>
      </header>

      {/* Main Content Sections */}
      <main className="flex-1">
        
        {/* Hero Section */}
        <HeroSection 
          onExploreClick={() => scrollToId("filter-panel")} 
          onAiClick={() => scrollToId("ai-section")} 
        />

        {/* Discovery & Search Hub Section */}
        <section className="py-12 border-t border-slate-200 bg-[#F8FAFC]" id="filter-panel">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              
              {/* Left Column: Intelligent Filters Sidebar */}
              <aside className="w-full lg:w-76 xl:w-80 shrink-0">
                <FilterPanel 
                  filters={filters} 
                  onChange={handleFilterChange} 
                  onClear={handleClearFilters}
                  onGenerate={handleDiscoverNames}
                  isLoading={isLoading}
                />
              </aside>

              {/* Right Column: Search Results Workspace */}
              <div className="flex-1 min-w-0 w-full space-y-6">
                
                {/* Content Greeting Card */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#06B6D4]/10 text-[#06B6D4] uppercase tracking-wider">
                      AI-Powered Selection
                    </span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] leading-tight tracking-tight">
                    Find the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#7C3AED]">Perfect Name</span> for Your Baby
                  </h2>
                  <p className="text-slate-500 mt-2 text-sm sm:text-base max-w-xl font-normal">
                    Discover meaningful names based on culture, personality, and zodiac. Configure your intelligent filters on the left, then click Discover to custom-tailor choices in real-time.
                  </p>
                </div>

                {/* Error Message Box */}
                {error && (
                  <div className="p-5 bg-rose-50 border border-rose-200 text-rose-600 rounded-2xl text-sm font-semibold flex items-center gap-3 animate-fade-in">
                    <span>⚠️</span>
                    <p>{error}. Click clear or change filters and retry.</p>
                  </div>
                )}

                {/* Dynamic Results Grid */}
                <div className="relative">
                  {isLoading && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-xs rounded-2xl flex flex-col items-center justify-center z-10 py-24 min-h-[400px]">
                      <LoaderIcon />
                      <p className="text-sm font-extrabold text-[#4F46E5] uppercase tracking-widest mt-4">Grounding recommendations with Google...</p>
                      <p className="text-xs text-[#64748B] mt-1.5 font-medium">Checking real-time popularity charts & origin records</p>
                    </div>
                  )}
                  
                  <ResultGrid 
                    names={names} 
                    favorites={favorites} 
                    onToggleFavorite={handleToggleFavorite}
                    searchSources={searchSources}
                  />
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* AI Specialized Suite (Bento Sub-tools) */}
        <AiSection />

        {/* Value Proposition Features */}
        <FeaturesSection />

        {/* Parent Testimonials */}
        <TestimonialsSection />

        {/* SEO Collapsible FAQ */}
        <FaqSection />

      </main>

      {/* Footer */}
      <Footer onOpenRegulatory={handleOpenRegulatory} />

      {/* Regulatory Modal Dialog */}
      <RegulatoryModal
        isOpen={isRegulatoryOpen}
        activeTab={regulatoryTab}
        onClose={() => setIsRegulatoryOpen(false)}
        onSelectTab={setRegulatoryTab}
      />

      {/* Favorites Drawer Sidebar Overlay */}
      <AnimatePresence>
        {isFavDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFavDrawerOpen(false)}
              className="fixed inset-0 bg-black/30 backdrop-blur-xs z-50 cursor-pointer"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white border-l border-[#E2E8F0] shadow-2xl z-50 flex flex-col justify-between p-6 sm:p-8"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#F1F5F9]">
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                    <h3 className="text-lg font-bold text-[#0F172A]">Saved Favorites</h3>
                  </div>
                  <button 
                    onClick={() => setIsFavDrawerOpen(false)}
                    className="p-1.5 rounded-lg hover:bg-[#F8FAFC] text-[#64748B] hover:text-[#0F172A] cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Favorites List */}
                <div className="mt-6 space-y-3 overflow-y-auto max-h-[50vh] pr-1">
                  {favorites.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-sm text-[#64748B]">No favorites saved yet.</p>
                      <p className="text-xs text-[#94A3B8] mt-1">Click the heart button on any name card to save it here!</p>
                    </div>
                  ) : (
                    favorites.map((fav) => (
                      <div key={fav} className="flex items-center justify-between p-3 bg-[#F8FAFC] border border-[#F1F5F9] rounded-xl hover:border-rose-200 hover:bg-rose-50/5 transition-all">
                        <span className="font-bold text-[#0F172A] text-sm">{fav}</span>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleToggleFavorite(fav)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
                            title="Remove favorite"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Bottom Actions */}
              {favorites.length > 0 && (
                <div className="space-y-3 pt-6 border-t border-[#F1F5F9]">
                  <button
                    onClick={handleCopyFavoritesList}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#4F46E5] hover:bg-[#4F46E5]/90 text-white text-xs font-bold transition-all cursor-pointer shadow-md"
                  >
                    {favCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {favCopied ? "List Copied!" : "Copy Favorites List"}
                  </button>
                  
                  <button
                    onClick={() => {
                      setFavorites([]);
                      localStorage.removeItem("babyname_ai_favorites");
                    }}
                    className="w-full py-2.5 rounded-xl border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#64748B] text-xs font-bold transition-all cursor-pointer text-center"
                  >
                    Clear All Favorites
                  </button>
                </div>
              )}

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}

// Custom spinning loader for elegance
function LoaderIcon() {
  return (
    <div className="relative w-12 h-12">
      <div className="absolute inset-0 rounded-full border-4 border-indigo-100" />
      <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin" />
    </div>
  );
}
