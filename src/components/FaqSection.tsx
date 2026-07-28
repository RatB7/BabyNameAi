import React, { useState } from "react";
import { FAQS } from "../data";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white" id="faq-section">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#7C3AED] bg-[#7C3AED]/10 px-3 py-1.5 rounded-full inline-block">
            HELP & EDUCATION
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight mt-4">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-[#64748B] mt-4 leading-relaxed font-normal">
            Need guidance choosing? Explore answers to top parent queries, naming suggestions, and custom AI search details.
          </p>
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-[#E2E8F0] overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 bg-white hover:bg-[#F8FAFC] text-left cursor-pointer transition-colors"
                >
                  <span className="font-bold text-[#0F172A] text-sm sm:text-base pr-4 flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-[#4F46E5] shrink-0" />
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#64748B]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#64748B]" />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-[#F1F5F9] bg-[#F8FAFC]"
                    >
                      <div className="p-6 text-sm text-[#475569] leading-relaxed font-normal">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
