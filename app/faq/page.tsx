"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getWorkshopFaqs } from "@/data/workshopData";
import { useLanguage } from "@/context/LanguageContext";

export default function FAQPage() {
  const { t, isArabic } = useLanguage();
  const faqs = getWorkshopFaqs(isArabic);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="bg-[#fafafa]" dir={isArabic ? "rtl" : "ltr"}>
      {/* ========================================================= */}
      {/* HERO BANNER                                               */}
      {/* ========================================================= */}
      <section className="relative w-full h-[46vh] min-h-[380px] overflow-hidden flex flex-col justify-center items-center bg-black pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/services-hero.png"
            alt="FAQs Bab Al Bustan Auto Workshop"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#120505]/80 backdrop-brightness-75" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#fafafa] via-transparent to-black/40" />
        </div>

        <div className="relative z-20 text-center px-6 max-w-3xl mx-auto">
          {/* Eyebrow: — FAQ — */}
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 sm:w-10 h-[2px] bg-red-500 rounded-full" />
            <span className="text-xs sm:text-[13px] font-extrabold tracking-[0.2em] uppercase text-red-400">
              {isArabic ? "الأسئلة الشائعة" : "FAQ"}
            </span>
            <span className="w-8 sm:w-10 h-[2px] bg-red-500 rounded-full" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-tight uppercase leading-tight text-white mb-3">
            {isArabic ? (
              <>
                الأسئلة <span className="text-red-500">الشائعة</span>
              </>
            ) : (
              <>
                Frequently Asked <span className="text-red-500">Questions</span>
              </>
            )}
          </h1>
          <p className="max-w-xl mx-auto text-zinc-300 text-sm md:text-base font-normal leading-relaxed">
            {t.faqPage.heroSubtitle}
          </p>
        </div>
      </section>

      {/* ========================================================= */}
      {/* FAQ SECTION (Taj Al Rahmah Reference Layout)              */}
      {/* ========================================================= */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 sm:w-10 h-[2px] bg-red-600 rounded-full" />
            <span className="text-xs sm:text-[13px] font-extrabold tracking-[0.2em] uppercase text-red-600">
              {isArabic ? "الأسئلة الشائعة" : "FAQ"}
            </span>
            <span className="w-8 sm:w-10 h-[2px] bg-red-600 rounded-full" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold tracking-tight text-zinc-950 mb-3 leading-tight">
            {isArabic ? (
              <>
                الأسئلة <span className="text-red-600">الشائعة</span>
              </>
            ) : (
              <>
                Frequently Asked <span className="text-red-600">Questions</span>
              </>
            )}
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-zinc-500 max-w-lg mx-auto leading-relaxed">
            {isArabic
              ? "إجابات واضحة ومباشرة حول خدمات صيانة السيارات، الضمان، قطع الغيار، والأسعار في ورشة باب البستان بالشارقة."
              : "Find clear answers to common questions about our vehicle maintenance, repair procedures, warranties, and pricing."}
          </p>
        </div>

        {/* Stacked Accordion Cards (Taj Al Rahmah Reference Style) */}
        <div className="max-w-4xl mx-auto space-y-3.5 sm:space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className={`rounded-2xl sm:rounded-[22px] bg-white border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "border-red-600/40 shadow-[0_8px_30px_rgba(220,38,38,0.06)]"
                    : "border-zinc-200/80 hover:border-zinc-300 shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-start cursor-pointer group gap-4"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                    <span className="text-zinc-400 font-bold text-xs sm:text-sm tracking-wide select-none shrink-0">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-bold text-sm sm:text-[15.5px] transition-colors leading-snug ${
                        isOpen
                          ? "text-red-600"
                          : "text-zinc-900 group-hover:text-red-600"
                      }`}
                    >
                      {faq.q}
                    </span>
                  </div>

                  {/* Plus / Minus Circle Icon */}
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
                      isOpen
                        ? "bg-red-600 text-white shadow-sm shadow-red-600/30"
                        : "bg-white border border-red-500/50 text-red-600 group-hover:border-red-600 group-hover:bg-red-50"
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                    ) : (
                      <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: "easeInOut" }}
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-0 text-xs sm:text-[13.5px] text-zinc-600 leading-relaxed pl-11 sm:pl-12 rtl:pl-5 sm:rtl:pl-6 rtl:pr-11 sm:rtl:pr-12">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
