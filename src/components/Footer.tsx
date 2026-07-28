import React from "react";
import { Heart } from "lucide-react";
import BrandLogo from "./BrandLogo";

interface FooterProps {
  onOpenRegulatory?: (tab: "privacy" | "terms" | "cookie") => void;
}

export default function Footer({ onOpenRegulatory }: FooterProps) {
  return (
    <footer className="bg-[#0F172A] text-white pt-20 pb-12" id="footer-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Top footer branding section */}
        <div className="pb-12 border-b border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start">
              <BrandLogo size="lg" />
            </div>
            
            <p className="text-sm text-slate-400 max-w-md leading-relaxed font-normal">
              Next-generation parenting companion. Helping expecting families discover meaningful, culturally grounded baby names with AI.
            </p>
          </div>
        </div>

        {/* Middle Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 py-16 text-sm">
          
          {/* Column 1 */}
          <div className="space-y-4">
            <h4 className="font-extrabold text-white text-xs uppercase tracking-widest">Parental Helpers</h4>
            <ul className="space-y-2.5 text-slate-400 font-medium">
              <li><a href="#ai-section" className="hover:text-white transition-colors">Twin Matcher</a></li>
              <li><a href="#ai-section" className="hover:text-white transition-colors">Meaning Explorer</a></li>
              <li><a href="#ai-section" className="hover:text-white transition-colors">Nickname Generator</a></li>
              <li><a href="#ai-section" className="hover:text-white transition-colors">Destiny Numerology</a></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            <h4 className="font-extrabold text-white text-xs uppercase tracking-widest">Discovery Tags</h4>
            <ul className="space-y-2.5 text-slate-400 font-medium">
              <li><a href="#filter-panel" className="hover:text-white transition-colors">Nature-Inspired Names</a></li>
              <li><a href="#filter-panel" className="hover:text-white transition-colors">Royal Heritage</a></li>
              <li><a href="#filter-panel" className="hover:text-white transition-colors">Mythological Meanings</a></li>
              <li><a href="#filter-panel" className="hover:text-white transition-colors">Zodiac Compatibility</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="space-y-4">
            <h4 className="font-extrabold text-white text-xs uppercase tracking-widest">Regulatory</h4>
            <ul className="space-y-2.5 text-slate-400 font-medium">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenRegulatory?.("privacy")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenRegulatory?.("terms")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenRegulatory?.("cookie")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Cookie Preferences
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} BabyName AI. All rights reserved globally.</p>
          
          <div className="flex items-center gap-1.5">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-600 animate-pulse" />
            <span>for expecting families everywhere</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
