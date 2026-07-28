import React from "react";
import { FEATURE_CARDS } from "../data";
import { motion } from "motion/react";
import * as Icons from "lucide-react";

export default function FeaturesSection() {
  // Helper to render Lucide icons dynamically from our data mappings
  const renderIcon = (name: string) => {
    const IconComponent = (Icons as any)[name];
    if (IconComponent) {
      return <IconComponent className="w-6 h-6 text-[#4F46E5]" />;
    }
    return <Icons.Sparkles className="w-6 h-6 text-[#4F46E5]" />;
  };

  return (
    <section className="py-20 bg-white" id="features-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#4F46E5] bg-[#4F46E5]/10 px-3 py-1.5 rounded-full inline-block">
            FEATURED TOOLS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight mt-4">
            Everything You Need to Find the Name
          </h2>
          <p className="text-lg text-[#64748B] mt-4 leading-relaxed font-normal">
            Enjoy highly specialized, design-forward name tools tailored around deep parent research, cultural diversity, and modern aesthetic.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {FEATURE_CARDS.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group relative bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] hover:border-[#4F46E5]/30 p-6 sm:p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Icon circle */}
              <div className="w-12 h-12 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-center shadow-xs group-hover:scale-110 group-hover:border-[#4F46E5]/20 group-hover:bg-indigo-50/20 transition-all">
                {renderIcon(card.icon)}
              </div>

              <h3 className="text-lg font-bold text-[#0F172A] mt-6 tracking-tight group-hover:text-[#4F46E5] transition-colors">
                {card.title}
              </h3>
              
              <p className="text-sm text-[#64748B] mt-2.5 leading-relaxed font-normal">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
