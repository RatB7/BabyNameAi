import React, { useState } from "react";
import { BabyName } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Volume2, Sparkles, Hash, Star, ExternalLink, Crown, Award, Eye, Lightbulb, Info, Search } from "lucide-react";
import PopularityChart from "./PopularityChart";

interface ResultGridProps {
  names: BabyName[];
  favorites: string[];
  onToggleFavorite: (name: string) => void;
  searchSources?: Array<{ title: string; uri: string }>;
}

interface NameCardProps {
  key?: React.Key;
  item: BabyName;
  index: number;
  isFav: boolean;
  isMatchItem: boolean;
  onToggleFavorite: (name: string) => void;
  getGenderBadgeStyles: (gender: string) => string;
  getCardBorderAccent: (gender: string, isBestMatch?: boolean) => string;
}

function NameCard({
  item,
  index,
  isFav,
  isMatchItem,
  onToggleFavorite,
  getGenderBadgeStyles,
  getCardBorderAccent,
}: NameCardProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const funFactText = item.historicalFact || `A timeless ${item.origin} name signifying ${item.meaning.toLowerCase()} with high cultural resonance.`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -15 }}
      whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.25, ease: "easeOut" } }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
      className={`group bg-white rounded-2xl border p-6 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 flex flex-col justify-between relative ${getCardBorderAccent(
        item.gender,
        isMatchItem
      )}`}
    >
      {/* Best Match Card Top Badge */}
      {isMatchItem && (
        <div className="absolute -top-3 left-6 inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-indigo-600 text-white text-[9px] font-black uppercase tracking-wider shadow-md">
          <Crown className="w-3 h-3 fill-amber-200" />
          <span>Top #1 Option Choice</span>
        </div>
      )}

      <div className={isMatchItem ? "pt-1" : ""}>
        {/* Top Header Card Info */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="space-y-1 relative">
            <div className="flex items-center gap-2 flex-wrap">
              {/* Interactive Name Container with Tooltip Trigger */}
              <div
                className="relative inline-block"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <div className="flex items-center gap-2 cursor-pointer group/name">
                  <h4 className="text-xl font-extrabold text-[#0F172A] tracking-tight group-hover/name:text-[#4F46E5] transition-colors flex items-center gap-1.5">
                    {item.name}
                  </h4>

                  {/* Quick-view badge */}
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-indigo-50 text-indigo-600 text-[9px] font-bold opacity-80 group-hover/name:opacity-100 group-hover/name:bg-indigo-600 group-hover/name:text-white transition-all shadow-2xs">
                    <Eye className="w-2.5 h-2.5" />
                    <span className="uppercase tracking-wider">Quick View</span>
                  </span>
                </div>

                {/* Floating Quick-View Tooltip */}
                <AnimatePresence>
                  {showTooltip && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.94 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.95 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute left-0 top-full mt-2 z-30 w-72 sm:w-80 p-4 rounded-2xl bg-slate-900/95 backdrop-blur-md text-white shadow-2xl border border-slate-700/80 pointer-events-none"
                    >
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2.5">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-sm text-indigo-300">{item.name}</span>
                          <span className="text-[10px] text-slate-400 font-medium">({item.pronunciation})</span>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                          Quick Insight
                        </span>
                      </div>

                      <div className="space-y-2.5 text-xs">
                        <div>
                          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-1">Primary Meaning:</span>
                          <p className="text-slate-100 font-medium leading-relaxed bg-slate-800/70 p-2.5 rounded-xl border border-slate-700/60">
                            "{item.meaning}"
                          </p>
                        </div>

                        <div>
                          <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-widest flex items-center gap-1 mb-1">
                            <Lightbulb className="w-3 h-3 text-amber-400" />
                            Fun Fact & History:
                          </span>
                          <p className="text-amber-100/90 text-[11px] leading-relaxed italic bg-amber-950/40 p-2.5 rounded-xl border border-amber-500/30">
                            💡 {funFactText}
                          </p>
                        </div>

                        <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1.5 border-t border-slate-800/80">
                          <span>Origin: <strong className="text-slate-200">{item.origin}</strong></span>
                          <span>Trend Score: <strong className="text-emerald-400">{item.popularityScore}%</strong></span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Pronunciation audio guide helper */}
              <div className="flex items-center gap-1 text-[10px] text-slate-500 font-bold bg-slate-50 px-2 py-0.5 rounded-lg border border-slate-100 cursor-help" title={`Phonetic breakdown: ${item.pronunciation}`}>
                <Volume2 className="w-3 h-3 text-slate-400" />
                <span>{item.pronunciation}</span>
              </div>
            </div>

            {/* Sub-details (Origin & Religion) */}
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              {item.origin} • {item.religion}
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Gender Badge */}
            <span className={`px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider border ${getGenderBadgeStyles(item.gender)}`}>
              {item.gender}
            </span>
          </div>
        </div>

        {/* Meaning section */}
        <p className="text-xs font-semibold text-slate-500 leading-relaxed mb-4">
          {item.meaning}
        </p>

        {/* Best Match explanation inside card if present */}
        {item.bestMatchReason && (
          <div className="p-2.5 bg-indigo-50/70 border border-indigo-100 rounded-xl text-[11px] text-indigo-900 leading-snug mb-4 font-semibold">
            <span className="font-extrabold text-[#4F46E5] block text-[10px] uppercase tracking-wider">⭐ Why it's your top choice:</span>
            <span>{item.bestMatchReason}</span>
          </div>
        )}

        {/* Quick badges grid (Popularity, Numerology, Zodiac) */}
        <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 mb-5">
          <div className="text-center">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Trend</span>
            <span className="inline-flex items-center gap-1 text-xs font-extrabold text-[#10B981] mt-1">
              <Star className="w-3 h-3 fill-[#10B981]" />
              {item.popularityScore}%
            </span>
          </div>

          <div className="text-center border-x border-slate-100">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Numerology</span>
            <span className="inline-flex items-center gap-1 text-xs font-extrabold text-[#7C3AED] mt-1">
              <Hash className="w-3 h-3" />
              {item.numerology ? item.numerology.split(" - ")[0] : "5"}
            </span>
          </div>

          <div className="text-center">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Harmony</span>
            <span className="block text-xs font-bold text-slate-700 mt-1 truncate px-1" title={item.zodiac || "Aries"}>
              {item.zodiac || "Leo"}
            </span>
          </div>
        </div>

        {/* Visual 10-Year Popularity Trend Chart */}
        <PopularityChart
          data={item.trendHistory || []}
          gender={item.gender}
          name={item.name}
          popularityScore={item.popularityScore}
        />

        {/* Sibling/Twin similar names */}
        {item.similarNames && item.similarNames.length > 0 && (
          <div className="mb-5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Similar Sounds:</span>
            <div className="flex flex-wrap gap-1.5">
              {item.similarNames.map((sim, i) => (
                <span key={sim + i} className="text-[11px] px-2 py-1 rounded-lg bg-slate-50 border border-slate-100 font-bold text-slate-500 hover:text-[#4F46E5] hover:border-slate-300 transition-all cursor-pointer">
                  {sim}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Fun Historical Fact */}
        {item.historicalFact && (
          <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-[11px] text-slate-500 leading-relaxed mb-6 font-semibold italic">
            💡 {item.historicalFact}
          </div>
        )}
      </div>

      {/* Bottom Card Actions */}
      <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-auto">
        <span className="text-[10px] font-bold text-slate-400 uppercase">Lang: {item.language}</span>

        <div className="flex items-center gap-2">
          {/* Favorite Action */}
          <button
            onClick={() => onToggleFavorite(item.name)}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              isFav
                ? "bg-rose-50 border-rose-200 text-rose-600 shadow-xs"
                : "border-slate-200 hover:bg-slate-50 text-slate-400 hover:text-[#E11D48]"
            }`}
            title={isFav ? "Remove from saved favorites" : "Save to favorites"}
          >
            <Heart className={`w-3.5 h-3.5 ${isFav ? "fill-rose-600" : ""}`} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function ResultGrid({
  names,
  favorites,
  onToggleFavorite,
  searchSources
}: ResultGridProps) {
  const [bestMatchTooltip, setBestMatchTooltip] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Live filter names based on search term
  const displayedNames = names.filter((n) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase().trim();
    return (
      n.name.toLowerCase().includes(q) ||
      n.meaning.toLowerCase().includes(q) ||
      n.origin.toLowerCase().includes(q) ||
      n.language.toLowerCase().includes(q) ||
      n.gender.toLowerCase().includes(q) ||
      (n.religion && n.religion.toLowerCase().includes(q))
    );
  });

  const getGenderBadgeStyles = (gender: string) => {
    switch (gender.toLowerCase()) {
      case "boy":
        return "bg-sky-50 text-sky-700 border-sky-100";
      case "girl":
        return "bg-rose-50 text-rose-700 border-rose-100";
      default:
        return "bg-purple-50 text-purple-700 border-purple-100";
    }
  };

  const getCardBorderAccent = (gender: string, isBestMatch?: boolean) => {
    if (isBestMatch) {
      return "border-2 border-[#4F46E5] shadow-xl shadow-indigo-500/10 bg-gradient-to-b from-indigo-50/20 via-white to-white";
    }
    switch (gender.toLowerCase()) {
      case "boy":
        return "hover:border-sky-300 hover:shadow-sky-100/30";
      case "girl":
        return "hover:border-rose-300 hover:shadow-rose-100/30";
      default:
        return "hover:border-purple-300 hover:shadow-purple-100/30";
    }
  };

  // Find explicit best match item if flagged by generator/API
  const bestMatch = names.find((n) => n.isBestMatch);

  return (
    <div className="space-y-8" id="result-grid-container">
      
      {/* Title block with Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-indigo-100 text-[#4F46E5] uppercase tracking-wider">
              {displayedNames.length} {displayedNames.length === 1 ? "Option" : "Options"} Displayed
            </span>
            {searchTerm && (
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                Filtered by "{searchTerm}"
              </span>
            )}
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight">
            Curated Name Recommendations
          </h3>
          <p className="text-xs font-semibold text-slate-400 mt-0.5 uppercase tracking-wider">
            Displaying tailored choices with #1 AI match highlighted • Hover over names for quick insights
          </p>
        </div>

        {/* Quick Search Filter Input */}
        <div className="w-full md:w-72 shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter by name, origin, Japanese..."
              className="w-full pl-9 pr-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl text-slate-700 outline-none focus:border-[#4F46E5] focus:bg-white transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Cite search grounding if available */}
        {searchSources && searchSources.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 max-w-lg">
            <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-[#06B6D4]" />
              Sources:
            </span>
            {searchSources.map((source, index) => (
              <a
                key={index}
                href={source.uri}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-[#4F46E5] border border-slate-200 transition-all"
              >
                <span className="max-w-[100px] truncate">{source.title}</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Prominent Spotlight Best Match Banner */}
      {bestMatch && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -4, transition: { duration: 0.25, ease: "easeOut" } }}
          className="relative bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl shadow-indigo-950/20 overflow-visible border border-indigo-700 transition-all"
        >
          {/* Subtle background glow circle */}
          <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/30 text-amber-300 text-xs font-black tracking-wider uppercase">
                <Crown className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                <span>Top #1 Recommendation According to Your Options</span>
              </div>

              <div className="flex items-center gap-3 flex-wrap relative">
                {/* Interactive Name with Quick View Tooltip */}
                <div
                  className="relative inline-block cursor-pointer"
                  onMouseEnter={() => setBestMatchTooltip(true)}
                  onMouseLeave={() => setBestMatchTooltip(false)}
                >
                  <div className="flex items-center gap-2 group/bm">
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white group-hover/bm:text-amber-300 transition-colors">
                      {bestMatch.name}
                    </h2>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-200 text-[10px] font-bold">
                      <Eye className="w-3 h-3 text-amber-300" />
                      <span>Quick View</span>
                    </span>
                  </div>

                  {/* Best Match Quick View Tooltip */}
                  <AnimatePresence>
                    {bestMatchTooltip && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.94 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.95 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="absolute left-0 top-full mt-2 z-30 w-72 sm:w-80 p-4 rounded-2xl bg-slate-900/95 backdrop-blur-md text-white shadow-2xl border border-slate-700/80 pointer-events-none"
                      >
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2.5">
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-sm text-amber-300">{bestMatch.name}</span>
                            <span className="text-[10px] text-slate-400 font-medium">({bestMatch.pronunciation})</span>
                          </div>
                          <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            #1 Match Insight
                          </span>
                        </div>

                        <div className="space-y-2.5 text-xs">
                          <div>
                            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-1">Primary Meaning:</span>
                            <p className="text-slate-100 font-medium leading-relaxed bg-slate-800/70 p-2.5 rounded-xl border border-slate-700/60">
                              "{bestMatch.meaning}"
                            </p>
                          </div>

                          <div>
                            <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-widest flex items-center gap-1 mb-1">
                              <Lightbulb className="w-3 h-3 text-amber-400" />
                              Fun Fact / Heritage:
                            </span>
                            <p className="text-amber-100/90 text-[11px] leading-relaxed italic bg-amber-950/40 p-2.5 rounded-xl border border-amber-500/30">
                              💡 {bestMatch.historicalFact || `Leading ${bestMatch.origin} choice with exceptional phonetic balance and deep cultural meaning.`}
                            </p>
                          </div>

                          <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1.5 border-t border-slate-800/80">
                            <span>Origin: <strong className="text-slate-200">{bestMatch.origin}</strong></span>
                            <span>Score: <strong className="text-amber-300">{bestMatch.popularityScore}% Score</strong></span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-indigo-200 bg-white/10 px-2.5 py-1 rounded-lg border border-white/10">
                  <Volume2 className="w-3.5 h-3.5 text-indigo-300" />
                  <span>{bestMatch.pronunciation}</span>
                </div>
                <span className={`px-2.5 py-0.5 rounded text-xs font-extrabold uppercase tracking-wider bg-white/20 text-white border border-white/20`}>
                  {bestMatch.gender}
                </span>
              </div>

              <p className="text-indigo-100 text-sm font-medium leading-relaxed">
                {bestMatch.meaning}
              </p>

              {/* Dynamic Best Match explanation callout */}
              <div className="p-3.5 rounded-xl bg-white/10 border border-white/15 text-xs text-amber-100 leading-relaxed font-semibold flex items-start gap-2.5">
                <Award className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold text-amber-300 block mb-0.5">Why this is your top match:</span>
                  <span>{bestMatch.bestMatchReason || `Matches your preferred ${bestMatch.gender} filter and cultural options with high harmony and popularity.`}</span>
                </div>
              </div>
            </div>

            {/* Right Action buttons for Best Match */}
            <div className="flex flex-row lg:flex-col items-center gap-3 shrink-0">
              <button
                onClick={() => onToggleFavorite(bestMatch.name)}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md ${
                  favorites.includes(bestMatch.name)
                    ? "bg-rose-500 hover:bg-rose-600 text-white"
                    : "bg-white text-indigo-950 hover:bg-indigo-50"
                }`}
              >
                <Heart className={`w-4 h-4 ${favorites.includes(bestMatch.name) ? "fill-white" : "fill-rose-500 text-rose-500"}`} />
                <span>{favorites.includes(bestMatch.name) ? "Saved in Favorites" : "Save Best Match"}</span>
              </button>
            </div>

          </div>
        </motion.div>
      )}

      {/* Grid of all generated options (At least 10) */}
      {displayedNames.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center border border-slate-200">
          <p className="text-sm font-bold text-slate-600 mb-1">No names match "{searchTerm}"</p>
          <p className="text-xs text-slate-400 mb-4">Try clearing your search filter or selecting a preset filter.</p>
          <button
            onClick={() => setSearchTerm("")}
            className="px-4 py-2 bg-indigo-50 text-[#4F46E5] text-xs font-extrabold rounded-xl hover:bg-indigo-100 transition-all cursor-pointer"
          >
            Clear Search Filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {displayedNames.map((item, index) => {
            const isFav = favorites.includes(item.name);
            const isMatchItem = Boolean(item.isBestMatch);

            return (
              <NameCard
                key={item.name + index}
                item={item}
                index={index}
                isFav={isFav}
                isMatchItem={isMatchItem}
                onToggleFavorite={onToggleFavorite}
                getGenderBadgeStyles={getGenderBadgeStyles}
                getCardBorderAccent={getCardBorderAccent}
              />
            );
          })}
        </AnimatePresence>
      </div>
      )}
    </div>
  );
}

