import React from "react";
import { motion } from "motion/react";
import { Sparkles, ArrowRight } from "lucide-react";

interface HeroSectionProps {
  onExploreClick: () => void;
  onAiClick: () => void;
}

export default function HeroSection({ onExploreClick, onAiClick }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden pt-20 pb-16 lg:pt-28 lg:pb-24" id="hero-section">
      {/* Background Soft Accents */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-96 h-96 bg-[#4F46E5] opacity-5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 translate-x-1/2 w-96 h-96 bg-[#06B6D4] opacity-5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Text content */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0F172A] leading-[1.1]"
            >
              Find the Perfect <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] via-[#7C3AED] to-[#06B6D4]">
                Name for Your Baby
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg sm:text-xl text-[#64748B] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal"
            >
              Discover meaningful baby names based on country, religion, language, culture, zodiac, personality traits, and real-time trends powered by search-grounded artificial intelligence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button
                onClick={onExploreClick}
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#4F46E5] hover:bg-[#4F46E5]/90 text-white font-semibold text-base transition-all duration-300 shadow-lg shadow-[#4F46E5]/20 hover:shadow-[#4F46E5]/30 hover:-translate-y-0.5 cursor-pointer"
                id="btn-start-exploring"
              >
                Start Exploring
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>

              <button
                onClick={onAiClick}
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#CBD5E1] text-[#0F172A] font-semibold text-base transition-all duration-300 hover:bg-[#F8FAFC] hover:-translate-y-0.5 cursor-pointer"
                id="btn-generate-ai"
              >
                Discover Names
              </button>
            </motion.div>

            {/* Stats section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-12 pt-8 border-t border-[#E2E8F0] grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0"
            >
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">50k+</p>
                <p className="text-xs sm:text-sm text-[#64748B]">Curated Names</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">180+</p>
                <p className="text-xs sm:text-sm text-[#64748B]">Countries</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">99.8%</p>
                <p className="text-xs sm:text-sm text-[#64748B]">Parent Delight</p>
              </div>
            </motion.div>
          </div>

          {/* Elegant Vector Baby / Celestial Illustration */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-[380px] aspect-square flex items-center justify-center"
            >
              {/* Outer soft glowing halo rings */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#4F46E5]/10 via-[#7C3AED]/5 to-[#06B6D4]/10 rounded-full animate-pulse filter blur-xl" />
              <div className="absolute w-[90%] h-[90%] rounded-full border border-dashed border-[#E2E8F0]/80 animate-spin-slow pointer-events-none" style={{ animationDuration: '60s' }} />
              
              {/* Main SVG Graphic */}
              <div className="relative w-full h-full bg-white rounded-3xl border border-[#F1F5F9] shadow-2xl shadow-indigo-100/50 p-8 flex flex-col justify-between items-center overflow-hidden">
                <div className="absolute top-4 left-4 right-4 flex justify-between text-xs text-[#94A3B8] font-medium tracking-wider">
                  <span>CELESTIAL HARMONY</span>
                  <span>BABYNAME AI</span>
                </div>
                
                <div className="my-auto flex flex-col items-center">
                  <svg viewBox="0 0 100 100" className="w-48 h-48 drop-shadow-xl">
                    {/* Stars in the background */}
                    <circle cx="20" cy="25" r="1" fill="#7C3AED" className="animate-ping" style={{ animationDuration: '3s' }} />
                    <circle cx="85" cy="30" r="1.2" fill="#4F46E5" className="animate-ping" style={{ animationDuration: '4s' }} />
                    <circle cx="75" cy="70" r="0.8" fill="#06B6D4" />
                    
                    {/* Moon */}
                    <path
                      d="M65 30 C 45 30, 35 45, 35 60 C 35 75, 48 85, 62 85 C 50 82, 45 72, 45 60 C 45 44, 53 35, 65 30 Z"
                      fill="url(#moon-gradient)"
                    />
                    
                    {/* Little Sleeping Cloud */}
                    <path
                      d="M30 65 C30 58, 42 58, 45 65 C48 62, 58 62, 58 68 C58 74, 48 76, 45 74 C42 76, 30 76, 30 65 Z"
                      fill="#F1F5F9"
                      opacity="0.9"
                    />
                    
                    {/* Glowing Little Star hanging from moon */}
                    <path
                      d="M62 48 L63.5 51 L67 51 L64 53 L65.5 56.5 L62 54.5 L58.5 56.5 L60 53 L57 51 L60.5 51 Z"
                      fill="#FFD700"
                    />
                    <line x1="62" y1="38" x2="62" y2="48" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="2" />

                    <defs>
                      <linearGradient id="moon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#4F46E5" />
                        <stop offset="60%" stopColor="#7C3AED" />
                        <stop offset="100%" stopColor="#06B6D4" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  <h3 className="mt-4 text-xl font-bold text-[#0F172A] tracking-tight text-center">Ethan & Maya</h3>
                  <p className="text-xs text-[#64748B] text-center mt-1">Harmonious pairing of strength & natural grace</p>
                </div>

                <div className="w-full flex items-center justify-between text-xs border-t border-[#F1F5F9] pt-4 mt-2">
                  <div className="flex gap-1.5 items-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
                    <span className="text-[#64748B] font-medium">99.8% Match</span>
                  </div>
                  <span className="text-[#4F46E5] font-bold">Aura Rating: Gold</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
