import React, { useState } from "react";
import { FilterState } from "../types";
import { 
  COUNTRIES, RELIGIONS, LANGUAGES, ZODIACS, MONTHS, ALPHABET 
} from "../data";
import { 
  Filter, ChevronDown, ChevronUp, RotateCcw, Sparkles 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FilterPanelProps {
  filters: FilterState;
  onChange: (key: keyof FilterState, value: any) => void;
  onClear: () => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export default function FilterPanel({ 
  filters, 
  onChange, 
  onClear, 
  onGenerate, 
  isLoading 
}: FilterPanelProps) {
  const [isAdvancedExpanded, setIsAdvancedExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col space-y-6" id="filter-panel">
      
      {/* Sidebar Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#4F46E5]" />
          <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
            Intelligent Filters
          </h3>
        </div>
        
        <button
          onClick={onClear}
          className="inline-flex items-center gap-1 py-1 px-2 rounded-lg text-[10px] font-bold text-slate-400 hover:text-slate-800 hover:bg-slate-50 transition-all cursor-pointer"
          id="btn-clear-filters"
          title="Reset all filters"
        >
          <RotateCcw className="w-3 h-3" />
          Clear
        </button>
      </div>

      {/* Filter Body - Stacked list of options */}
      <div className="space-y-5">
        
        {/* Gender Selection */}
        <div className="space-y-2">
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest">
            Gender Preferred
          </label>
          <div className="flex p-1 bg-slate-100 rounded-xl">
            {["Any", "Boy", "Girl"].map((g) => {
              const isActive = filters.gender === g || (g === "Any" && !filters.gender);
              return (
                <button
                  key={g}
                  type="button"
                  onClick={() => onChange("gender", g)}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    isActive
                      ? "bg-white text-[#4F46E5] shadow-xs"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {g}
                </button>
              );
            })}
          </div>
        </div>

        {/* Starts & Ends with in a neat side-by-side grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest">
              Starts With
            </label>
            <select
              value={filters.startsWith}
              onChange={(e) => onChange("startsWith", e.target.value)}
              className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-slate-700 outline-none focus:border-[#4F46E5] focus:bg-white transition-all"
            >
              <option value="Any">Any Letter</option>
              {ALPHABET.map((letter) => (
                <option key={letter} value={letter}>{letter}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest">
              Ends With
            </label>
            <select
              value={filters.endsWith}
              onChange={(e) => onChange("endsWith", e.target.value)}
              className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-slate-700 outline-none focus:border-[#4F46E5] focus:bg-white transition-all"
            >
              <option value="Any">Any Letter</option>
              {ALPHABET.map((letter) => (
                <option key={letter} value={letter}>{letter}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Country/Region */}
        <div className="space-y-2">
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest">
            Country / Region
          </label>
          <select
            value={filters.country}
            onChange={(e) => onChange("country", e.target.value)}
            className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 outline-none focus:border-[#4F46E5] focus:bg-white transition-all"
          >
            <option value="Any">All Countries</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Religion */}
        <div className="space-y-2">
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest">
            Religious Heritage
          </label>
          <select
            value={filters.religion}
            onChange={(e) => onChange("religion", e.target.value)}
            className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 outline-none focus:border-[#4F46E5] focus:bg-white transition-all"
          >
            <option value="Any">All Religions</option>
            {RELIGIONS.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        {/* Language */}
        <div className="space-y-2">
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest">
            Primary Language
          </label>
          <select
            value={filters.language}
            onChange={(e) => onChange("language", e.target.value)}
            className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 outline-none focus:border-[#4F46E5] focus:bg-white transition-all"
          >
            <option value="Any">All Languages</option>
            {LANGUAGES.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>

        {/* Collapsible Advanced Filters Section */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => setIsAdvancedExpanded(!isAdvancedExpanded)}
            className="w-full flex items-center justify-between py-2 text-xs font-extrabold text-[#4F46E5] hover:text-[#7C3AED] transition-colors cursor-pointer"
            id="btn-toggle-advanced"
          >
            <span>{isAdvancedExpanded ? "Hide Advanced Filters" : "Show Advanced (13 More)"}</span>
            {isAdvancedExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          <AnimatePresence initial={false}>
            {isAdvancedExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden space-y-4 pt-4"
              >
                
                {/* Meaning / Concept Keyword */}
                <div className="space-y-2">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                    Meaning / Keyword
                  </label>
                  <input
                    type="text"
                    value={filters.meaningKeyword || ""}
                    onChange={(e) => onChange("meaningKeyword", e.target.value)}
                    placeholder="e.g. Brave, Light, Forest..."
                    className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 outline-none focus:border-[#4F46E5] focus:bg-white transition-all"
                  />
                </div>

                {/* Popularity strength */}
                <div className="space-y-2">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                    Popularity Range
                  </label>
                  <select
                    value={filters.popularity}
                    onChange={(e) => onChange("popularity", e.target.value)}
                    className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 outline-none focus:border-[#4F46E5] focus:bg-white transition-all"
                  >
                    <option value="Any">Any Popularity</option>
                    <option value="Ultra High">Highly Popular (Top 10)</option>
                    <option value="Trending">Trending (Top 100)</option>
                    <option value="Moderate">Moderate (Top 500)</option>
                    <option value="Uncommon">Niche / Rare</option>
                  </select>
                </div>

                {/* Style Vibe */}
                <div className="space-y-2">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                    Style Vibe
                  </label>
                  <select
                    value={filters.style}
                    onChange={(e) => onChange("style", e.target.value)}
                    className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 outline-none focus:border-[#4F46E5] focus:bg-white transition-all"
                  >
                    <option value="Any">Any Style</option>
                    <option value="Modern">Modern & Fresh</option>
                    <option value="Traditional">Classic & Traditional</option>
                    <option value="Vintage">Timeless Vintage</option>
                  </select>
                </div>

                {/* Rarity */}
                <div className="space-y-2">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                    Rarity Vibe
                  </label>
                  <select
                    value={filters.scarcity}
                    onChange={(e) => onChange("scarcity", e.target.value)}
                    className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 outline-none"
                  >
                    <option value="Any">Any Rarity</option>
                    <option value="Extremely Rare">Extremely Unique</option>
                    <option value="Uncommon">Uncommon Gems</option>
                    <option value="Highly Popular">Highly Popular</option>
                  </select>
                </div>

                {/* Letters count */}
                <div className="space-y-2">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                    Name Length
                  </label>
                  <select
                    value={filters.lettersCount}
                    onChange={(e) => onChange("lettersCount", e.target.value)}
                    className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 outline-none"
                  >
                    <option value="Any">Any Length</option>
                    <option value="Short (3-4)">Short (3-4 letters)</option>
                    <option value="Medium (5-6)">Medium (5-6 letters)</option>
                    <option value="Long (7+)">Long (7+ letters)</option>
                  </select>
                </div>

                {/* Detailed origin */}
                <div className="space-y-2">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                    Specific Origin Info
                  </label>
                  <input
                    type="text"
                    value={filters.origin || ""}
                    onChange={(e) => onChange("origin", e.target.value)}
                    placeholder="e.g. Norse, Persian, Celtic..."
                    className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 outline-none"
                  />
                </div>

                {/* Birth Month */}
                <div className="space-y-2">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                    Birth Month Match
                  </label>
                  <select
                    value={filters.birthMonth}
                    onChange={(e) => onChange("birthMonth", e.target.value)}
                    className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 outline-none"
                  >
                    <option value="Any">Any Month</option>
                    {MONTHS.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                {/* Zodiac sign compatibility */}
                <div className="space-y-2">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                    Zodiac Alignment
                  </label>
                  <select
                    value={filters.zodiac}
                    onChange={(e) => onChange("zodiac", e.target.value)}
                    className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 outline-none"
                  >
                    <option value="Any">Any Zodiac</option>
                    {ZODIACS.map((z) => (
                      <option key={z} value={z}>{z}</option>
                    ))}
                  </select>
                </div>

                {/* Special nuances checkbox list in vertical list */}
                <div className="space-y-2">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                    Special Themes
                  </label>
                  <div className="space-y-2 pt-1">
                    {[
                      { key: "nature", label: "Nature Inspired" },
                      { key: "royal", label: "Royal Heritage" },
                      { key: "mythology", label: "Mythology Theme" },
                      { key: "spiritual", label: "Spiritual Roots" },
                      { key: "celebrity", label: "Celebrity Vibe" }
                    ].map((nuance) => (
                      <label 
                        key={nuance.key} 
                        className="flex items-center gap-2.5 px-3 py-2 border border-slate-200 bg-slate-50 rounded-xl hover:bg-slate-100/50 transition-all cursor-pointer select-none"
                      >
                        <input
                          type="checkbox"
                          checked={!!(filters as any)[nuance.key]}
                          onChange={(e) => onChange(nuance.key as keyof FilterState, e.target.checked)}
                          className="w-4 h-4 rounded border-slate-300 text-[#4F46E5] focus:ring-[#4F46E5]"
                        />
                        <span className="text-xs font-semibold text-slate-700">{nuance.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* Discover / Submit Button */}
      <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
        <button
          onClick={onGenerate}
          disabled={isLoading}
          className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:from-[#4F46E5]/90 hover:to-[#7C3AED]/90 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/10 transition-all duration-300 disabled:opacity-50 cursor-pointer"
          id="btn-discover-ai-names"
        >
          <Sparkles className="w-4 h-4 animate-pulse" />
          {isLoading ? "Analyzing..." : "Discover with AI"}
        </button>

        {/* Sidebar Mini Testimonial Quote */}
        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 mt-2">
          <p className="text-[10px] text-slate-500 leading-relaxed italic">
            "The most refined way to find a name that carries your legacy into the next generation."
          </p>
          <div className="mt-2 flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-[#06B6D4] to-[#4F46E5] flex items-center justify-center text-[8px] font-bold text-white">E</div>
            <span className="text-[9px] font-bold text-slate-600">Elena G. • Premium Parent</span>
          </div>
        </div>
      </div>

    </div>
  );
}

