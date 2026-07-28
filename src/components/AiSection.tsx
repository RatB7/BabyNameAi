import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, Compass, Users, Smile, Hash, Star, Check, 
  Loader2, ArrowRight, Heart, Volume2 
} from "lucide-react";
import { 
  TwinSiblingCombination, Nickname, MeaningReport, NumerologyReport 
} from "../types";

export default function AiSection() {
  const [activeTab, setActiveTab] = useState<"twins" | "meaning" | "nickname" | "numerology">("twins");
  const [inputName, setInputName] = useState("");
  const [genderFilter, setGenderFilter] = useState("Any");
  const [relationType, setRelationType] = useState<"twins" | "siblings">("twins");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // States for results
  const [twinsResult, setTwinsResult] = useState<TwinSiblingCombination[] | null>(null);
  const [meaningResult, setMeaningResult] = useState<MeaningReport | null>(null);
  const [nicknameResult, setNicknameResult] = useState<Nickname[] | null>(null);
  const [numerologyResult, setNumerologyResult] = useState<NumerologyReport | null>(null);

  // Quick Action triggers
  const handleTwinsGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputName.trim()) return;
    setIsLoading(true);
    setError(null);
    setTwinsResult(null);

    try {
      const response = await fetch("/api/twin-sibling-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: inputName, relationType, genderFilter })
      });
      if (!response.ok) throw new Error("Failed to generate matching names");
      const data = await response.json();
      setTwinsResult(data.combinations);
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMeaningExplore = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputName.trim()) return;
    setIsLoading(true);
    setError(null);
    setMeaningResult(null);

    try {
      const response = await fetch("/api/meaning-explorer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: inputName })
      });
      if (!response.ok) throw new Error("Failed to explore name history");
      const data = await response.json();
      setMeaningResult(data.report);
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNicknameGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputName.trim()) return;
    setIsLoading(true);
    setError(null);
    setNicknameResult(null);

    try {
      const response = await fetch("/api/nickname-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: inputName })
      });
      if (!response.ok) throw new Error("Failed to generate nicknames");
      const data = await response.json();
      setNicknameResult(data.nicknames);
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNumerologyCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputName.trim()) return;
    setIsLoading(true);
    setError(null);
    setNumerologyResult(null);

    try {
      const response = await fetch("/api/numerology", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: inputName })
      });
      if (!response.ok) throw new Error("Failed to calculate numerology");
      const data = await response.json();
      setNumerologyResult(data.numerology);
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 bg-[#F1F5F9]/50 relative" id="ai-section">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#F8FAFC] to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#F8FAFC] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#7C3AED] bg-[#7C3AED]/10 px-3 py-1.5 rounded-full inline-block">
            STILL DECIDING?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight mt-4">
            Activate the AI Suite
          </h2>
          <p className="text-lg text-[#64748B] mt-4 leading-relaxed font-normal">
            Deep dive into specific name custom generators, explore historical records, find twin names, sibling matches, and calculate ancient Pythagorean numerology.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column Tabs (Bento structure) */}
          <div className="lg:col-span-4 space-y-3">
            {[
              { id: "twins", title: "Twin & Sibling Matcher", desc: "Discover perfect matching name pairs", icon: Users, color: "text-[#4F46E5] bg-[#4F46E5]/10" },
              { id: "meaning", title: "Linguistic Meaning Explorer", desc: "Uncover global etymology & history", icon: Compass, color: "text-[#06B6D4] bg-[#06B6D4]/10" },
              { id: "nickname", title: "Vibrant Nickname Generator", desc: "Instantly create playful pet names", icon: Smile, color: "text-[#7C3AED] bg-[#7C3AED]/10" },
              { id: "numerology", title: "Pythagorean Numerology", desc: "Calculate destiny numbers & traits", icon: Hash, color: "text-[#10B981] bg-[#10B981]/10" }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    setInputName("");
                    setError(null);
                    setTwinsResult(null);
                    setMeaningResult(null);
                    setNicknameResult(null);
                    setNumerologyResult(null);
                  }}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center gap-4 cursor-pointer ${
                    isActive 
                      ? "bg-white border-[#E2E8F0] shadow-md shadow-indigo-100/50 scale-[1.02]" 
                      : "bg-transparent border-transparent hover:bg-white/40 text-[#64748B]"
                  }`}
                >
                  <div className={`p-3 rounded-xl ${tab.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0F172A] text-sm leading-tight">{tab.title}</h4>
                    <p className="text-xs text-[#64748B] mt-0.5 font-medium leading-none">{tab.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column Interactive Console */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-[#E2E8F0] shadow-sm p-6 sm:p-8">
            
            <AnimatePresence mode="wait">
              
              {/* 1. TWINS & SIBLINGS TAB */}
              {activeTab === "twins" && (
                <motion.div
                  key="twins-panel"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <div className="border-b border-[#F1F5F9] pb-4">
                    <h3 className="text-xl font-bold text-[#0F172A] flex items-center gap-2">
                      <Users className="w-5 h-5 text-[#4F46E5]" />
                      Twin & Sibling Matcher
                    </h3>
                    <p className="text-xs text-[#64748B] mt-1">
                      Enter an existing child's name to generate harmoniously paired combinations of names that sound beautifully aligned.
                    </p>
                  </div>

                  <form onSubmit={handleTwinsGenerate} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
                    <div className="sm:col-span-4">
                      <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-2">Child's Name</label>
                      <input
                        type="text"
                        required
                        value={inputName}
                        onChange={(e) => setInputName(e.target.value)}
                        placeholder="e.g. Leo, Chloe"
                        className="w-full text-sm font-medium bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-2">Relation Vibe</label>
                      <select
                        value={relationType}
                        onChange={(e) => setRelationType(e.target.value as any)}
                        className="w-full text-sm font-medium bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3 py-3 text-[#0F172A]"
                      >
                        <option value="twins">For Twins</option>
                        <option value="siblings">For Sibling Match</option>
                      </select>
                    </div>

                    <div className="sm:col-span-3">
                      <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-2">Target Gender</label>
                      <select
                        value={genderFilter}
                        onChange={(e) => setGenderFilter(e.target.value)}
                        className="w-full text-sm font-medium bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3 py-3 text-[#0F172A]"
                      >
                        <option value="Any">Any Gender</option>
                        <option value="Boy">Boy</option>
                        <option value="Girl">Girl</option>
                        <option value="Unisex">Unisex</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="sm:col-span-2 w-full inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-[#4F46E5] hover:bg-[#4F46E5]/90 text-white font-bold text-xs shadow-md shadow-indigo-100 transition-all cursor-pointer disabled:opacity-50"
                    >
                      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Match"}
                      {!isLoading && <ArrowRight className="w-3.5 h-3.5" />}
                    </button>
                  </form>

                  {/* Results Panel */}
                  {twinsResult && (
                    <div className="space-y-4 pt-4 border-t border-[#F1F5F9] animate-fade-in">
                      <h4 className="text-xs font-bold text-[#64748B] uppercase tracking-wider">Aesthetic Harmonies Found</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {twinsResult.map((pair, idx) => (
                          <div key={idx} className="p-4 rounded-2xl border border-[#F1F5F9] bg-[#F8FAFC]">
                            <div className="flex items-center gap-2 mb-2">
                              {pair.names.map((n, i) => (
                                <React.Fragment key={n}>
                                  <span className="text-base font-extrabold text-[#4F46E5]">{n}</span>
                                  {i < pair.names.length - 1 && <span className="text-xs text-[#94A3B8] font-bold">&</span>}
                                </React.Fragment>
                              ))}
                              <span className="ml-auto text-[10px] font-bold text-[#7C3AED] bg-[#7C3AED]/10 px-2 py-0.5 rounded-full uppercase">
                                {pair.vibe}
                              </span>
                            </div>
                            <p className="text-xs text-[#64748B] leading-relaxed font-medium">
                              {pair.reason}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* 2. MEANING EXPLORER TAB */}
              {activeTab === "meaning" && (
                <motion.div
                  key="meaning-panel"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <div className="border-b border-[#F1F5F9] pb-4">
                    <h3 className="text-xl font-bold text-[#0F172A] flex items-center gap-2">
                      <Compass className="w-5 h-5 text-[#06B6D4]" />
                      Linguistic Meaning Explorer
                    </h3>
                    <p className="text-xs text-[#64748B] mt-1">
                      Deep dive into the etymology, cultural history, variations, royal usage, and zodiac connections of any name.
                    </p>
                  </div>

                  <form onSubmit={handleMeaningExplore} className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-2">Explore Any Name</label>
                      <input
                        type="text"
                        required
                        value={inputName}
                        onChange={(e) => setInputName(e.target.value)}
                        placeholder="e.g. Aurelia, Kenji, Soraya"
                        className="w-full text-sm font-medium bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#06B6D4]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full sm:w-auto self-end inline-flex items-center justify-center gap-1.5 px-6 py-3 rounded-xl bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-white font-bold text-sm shadow-md transition-all cursor-pointer disabled:opacity-50"
                    >
                      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Explore Roots"}
                    </button>
                  </form>

                  {/* Results Panel */}
                  {meaningResult && (
                    <div className="space-y-4 pt-4 border-t border-[#F1F5F9] animate-fade-in">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-extrabold text-[#06B6D4]">{meaningResult.name}</h4>
                        <span className="text-xs font-bold text-[#64748B]">{meaningResult.origin}</span>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">Spiritual Meaning</span>
                          <p className="text-xs text-[#475569] leading-relaxed font-medium mt-1">{meaningResult.meaning}</p>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">Historical usage & royalty</span>
                          <p className="text-xs text-[#64748B] leading-relaxed font-medium mt-1">{meaningResult.history}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 pt-2">
                          <div>
                            <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider block mb-1">Language Variants</span>
                            <div className="flex flex-wrap gap-1">
                              {meaningResult.variations && meaningResult.variations.map((v, i) => (
                                <span key={v + i} className="text-xs px-2 py-0.5 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] text-[#4F46E5] font-semibold">{v}</span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider block mb-1">Aura Harmony</span>
                            <span className="text-xs font-bold text-[#0F172A]">{meaningResult.zodiac}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* 3. NICKNAME GENERATOR TAB */}
              {activeTab === "nickname" && (
                <motion.div
                  key="nickname-panel"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <div className="border-b border-[#F1F5F9] pb-4">
                    <h3 className="text-xl font-bold text-[#0F172A] flex items-center gap-2">
                      <Smile className="w-5 h-5 text-[#7C3AED]" />
                      Vibrant Nickname Generator
                    </h3>
                    <p className="text-xs text-[#64748B] mt-1">
                      Input any full baby name to generate a selection of adorable, modern, short, or traditional nicknames and pet titles.
                    </p>
                  </div>

                  <form onSubmit={handleNicknameGenerate} className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-2">Full Baby Name</label>
                      <input
                        type="text"
                        required
                        value={inputName}
                        onChange={(e) => setInputName(e.target.value)}
                        placeholder="e.g. Alexander, Siddharth, Soraya"
                        className="w-full text-sm font-medium bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full sm:w-auto self-end inline-flex items-center justify-center gap-1.5 px-6 py-3 rounded-xl bg-[#7C3AED] hover:bg-[#7C3AED]/90 text-white font-bold text-sm shadow-md transition-all cursor-pointer disabled:opacity-50"
                    >
                      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Generate Pet Names"}
                    </button>
                  </form>

                  {/* Results Panel */}
                  {nicknameResult && (
                    <div className="space-y-4 pt-4 border-t border-[#F1F5F9] animate-fade-in">
                      <h4 className="text-xs font-bold text-[#64748B] uppercase tracking-wider">Playful & Sweet Pet Names</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {nicknameResult.map((nick, idx) => (
                          <div key={idx} className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl hover:border-[#7C3AED] hover:bg-white transition-all text-center">
                            <span className="block text-base font-extrabold text-[#7C3AED]">{nick.nickname}</span>
                            <span className="text-[10px] font-bold text-[#94A3B8] uppercase block mt-1">{nick.vibe}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* 4. PYTHAGOREAN NUMEROLOGY TAB */}
              {activeTab === "numerology" && (
                <motion.div
                  key="numerology-panel"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <div className="border-b border-[#F1F5F9] pb-4">
                    <h3 className="text-xl font-bold text-[#0F172A] flex items-center gap-2">
                      <Hash className="w-5 h-5 text-[#10B981]" />
                      Pythagorean Numerology Analyzer
                    </h3>
                    <p className="text-xs text-[#64748B] mt-1">
                      Discover the mathematical vibrational energy, Destiny Number, lucky days, colors, and personality markers for any name.
                    </p>
                  </div>

                  <form onSubmit={handleNumerologyCalculate} className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-2">Explore Name Vibration</label>
                      <input
                        type="text"
                        required
                        value={inputName}
                        onChange={(e) => setInputName(e.target.value)}
                        placeholder="e.g. Arjun, Liam, Eliana"
                        className="w-full text-sm font-medium bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full sm:w-auto self-end inline-flex items-center justify-center gap-1.5 px-6 py-3 rounded-xl bg-[#10B981] hover:bg-[#10B981]/90 text-white font-bold text-sm shadow-md transition-all cursor-pointer disabled:opacity-50"
                    >
                      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Calculate Vibration"}
                    </button>
                  </form>

                  {/* Results Panel */}
                  {numerologyResult && (
                    <div className="space-y-4 pt-4 border-t border-[#F1F5F9] animate-fade-in">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-[#10B981]/10 flex items-center justify-center text-xl font-black text-[#10B981]">
                          {numerologyResult.number}
                        </div>
                        <div>
                          <h4 className="text-lg font-extrabold text-[#0F172A]">{numerologyResult.title}</h4>
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            {numerologyResult.traits && numerologyResult.traits.map((trait, idx) => (
                              <span key={trait + idx} className="text-[10px] font-extrabold text-[#10B981] uppercase tracking-wider bg-[#10B981]/5 px-2 py-0.5 rounded-full border border-[#10B981]/20">
                                {trait}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-[#64748B] leading-relaxed font-medium">
                        {numerologyResult.description}
                      </p>

                      <div className="grid grid-cols-3 gap-3 pt-2">
                        <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#F1F5F9]">
                          <span className="block text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">Lucky Day</span>
                          <span className="block text-xs font-bold text-[#0F172A] mt-0.5">{numerologyResult.luckyDay}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#F1F5F9]">
                          <span className="block text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">Lucky Color</span>
                          <span className="block text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] mt-0.5">{numerologyResult.luckyColor}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#F1F5F9]">
                          <span className="block text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">Lucky Stone</span>
                          <span className="block text-xs font-bold text-[#0F172A] mt-0.5">{numerologyResult.luckyStone}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Loading & Error Overlays */}
              {isLoading && (
                <div className="absolute inset-0 bg-white/70 backdrop-blur-xs rounded-3xl flex flex-col items-center justify-center z-10">
                  <Loader2 className="w-8 h-8 text-[#4F46E5] animate-spin" />
                  <p className="text-xs font-bold text-[#4F46E5] mt-3 uppercase tracking-wider">Grounding with Google Search...</p>
                </div>
              )}

              {error && (
                <div className="p-4 bg-rose-50 border border-rose-200 text-rose-600 rounded-2xl text-xs font-semibold">
                  ⚠️ {error}. Please try again.
                </div>
              )}

            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
