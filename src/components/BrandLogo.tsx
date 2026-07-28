import React from "react";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  className?: string;
}

export default function BrandLogo({ size = "md", showText = true, className = "" }: BrandLogoProps) {
  const sizeMap = {
    sm: { box: "w-8 h-8 rounded-lg", icon: "w-4 h-4", text: "text-base" },
    md: { box: "w-10 h-10 rounded-xl", icon: "w-5 h-5", text: "text-lg" },
    lg: { box: "w-12 h-12 rounded-2xl", icon: "w-6 h-6", text: "text-xl" },
    xl: { box: "w-16 h-16 rounded-2xl", icon: "w-8 h-8", text: "text-2xl" }
  };

  const dim = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Icon Mark Container with 3D gradient glow */}
      <div className={`relative ${dim.box} bg-gradient-to-tr from-[#4F46E5] via-[#7C3AED] to-[#06B6D4] p-0.5 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-300 flex items-center justify-center group`}>
        {/* Ambient background glow behind the icon */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#4F46E5] to-[#06B6D4] opacity-50 blur-sm rounded-xl group-hover:opacity-80 transition-opacity" />
        
        {/* Inner Glass Container */}
        <div className="relative w-full h-full bg-slate-900/10 backdrop-blur-xs rounded-[inherit] flex items-center justify-center overflow-hidden">
          
          {/* Custom SVG Icon combining Moon, Starlight Sparkle & Heart */}
          <svg
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`${dim.icon} text-white drop-shadow-md`}
          >
            {/* Celestial Moon Curve */}
            <path
              d="M26 10C21 10 16 14 16 20C16 26 21 30 26 30C20 30 13 25 13 19.5C13 14 18 10 26 10Z"
              fill="url(#logoMoonGrad)"
            />

            {/* Glowing Baby Heart inside Moon */}
            <path
              d="M20 22.5C20 22.5 16.5 19.8 16.5 17.8C16.5 16.5 17.5 15.5 18.8 15.5C19.6 15.5 20.3 16 20.7 16.7C21.1 16 21.8 15.5 22.6 15.5C23.9 15.5 24.9 16.5 24.9 17.8C24.9 19.8 21.4 22.5 21.4 22.5"
              fill="url(#logoHeartGrad)"
            />

            {/* AI Starlight Sparkle Top Right */}
            <path
              d="M27 10L28.2 13.8L32 15L28.2 16.2L27 20L25.8 16.2L22 15L25.8 13.8L27 10Z"
              fill="#FDE047"
              className="animate-pulse"
            />

            {/* Micro Sparkle Bottom Left */}
            <path
              d="M10 24L10.7 26.3L13 27L10.7 27.7L10 30L9.3 27.7L7 27L9.3 26.3L10 24Z"
              fill="#67E8F9"
            />

            {/* Gradients */}
            <defs>
              <linearGradient id="logoMoonGrad" x1="13" y1="10" x2="26" y2="30" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFFFFF" />
                <stop offset="1" stopColor="#E0E7FF" />
              </linearGradient>
              <linearGradient id="logoHeartGrad" x1="16.5" y1="15.5" x2="24.9" y2="22.5" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FB7185" />
                <stop offset="1" stopColor="#F43F5E" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Brand Text Header */}
      {showText && (
        <div className="flex flex-col">
          <span className={`${dim.text} font-black tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-r from-[#4F46E5] via-[#7C3AED] to-[#06B6D4]`}>
            BabyName<span className="text-[#0F172A]">.AI</span>
          </span>
          <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest leading-none mt-0.5">
            Smart Name Discovery
          </span>
        </div>
      )}
    </div>
  );
}
