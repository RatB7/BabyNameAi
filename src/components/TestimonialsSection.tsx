import React from "react";
import { TESTIMONIALS } from "../data";
import { motion } from "motion/react";
import { Star, MessageSquare } from "lucide-react";

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-[#F8FAFC]" id="testimonials-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#06B6D4] bg-[#06B6D4]/10 px-3 py-1.5 rounded-full inline-block">
            TESTIMONIALS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight mt-4">
            Loved by Expecting Parents Globally
          </h2>
          <p className="text-lg text-[#64748B] mt-4 leading-relaxed font-normal">
            Read how other new parents utilized our smart cultural filter tags and real-time AI search to discover their dream baby names.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, index) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-8 shadow-xs flex flex-col justify-between hover:shadow-md transition-all duration-300"
            >
              <div>
                {/* Stars */}
                <div className="flex items-center gap-1 mb-6 text-[#FFD700]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FFD700]" />
                  ))}
                </div>
                
                <p className="text-sm sm:text-base text-[#475569] leading-relaxed italic font-medium">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-[#F1F5F9] pt-6 mt-8">
                <div>
                  <h4 className="font-bold text-[#0F172A] text-sm tracking-tight">{t.author}</h4>
                  <p className="text-xs text-[#64748B] mt-0.5">{t.location}</p>
                </div>

                <span className="text-[10px] font-bold text-[#4F46E5] bg-[#4F46E5]/5 border border-[#4F46E5]/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {t.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
