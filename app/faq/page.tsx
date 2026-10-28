"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Phone, Calendar } from "lucide-react";
import { getWorkshopFaqs, WORKSHOP_INFO } from "@/data/workshopData";
import { useLanguage } from "@/context/LanguageContext";

export default function FAQPage() {
  const { t, isArabic } = useLanguage();
  const faqs = getWorkshopFaqs(isArabic);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="bg-white">
      <section className="relative w-full h-[50vh] min-h-[380px] overflow-hidden flex flex-col justify-center items-center bg-black pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/services-hero.png"
            alt="FAQs Bab Al Bustan Auto Workshop"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#120505]/75 backdrop-brightness-75" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
        </div>

        <div className="relative z-20 text-center px-6 max-w-3xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-[0.25em] mb-4">
            {t.faqPage.heroBadge}
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-tight uppercase leading-tight text-white mb-3">
            {t.faqPage.heroTitle1} <span className="text-red-500">{t.faqPage.heroTitle2}</span>
          </h1>
          <p className="max-w-xl mx-auto text-zinc-300 text-sm md:text-base font-normal leading-relaxed">
            {t.faqPage.heroSubtitle}
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className="border border-zinc-200 rounded-2xl p-6 bg-zinc-50/60 transition-all duration-300 hover:border-zinc-300"
              >
                <button
                  onClick={() => toggle(idx)}
                  className={`w-full flex items-center justify-between group cursor-pointer ${
                    isArabic ? "text-right" : "text-left"
                  }`}
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-zinc-900 font-bold text-base sm:text-lg group-hover:text-red-600 transition-colors ${
                      isArabic ? "pl-4" : "pr-4"
                    }`}
                  >
                    {faq.q}
                  </span>
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isOpen ? "bg-red-600 text-white rotate-180" : "bg-zinc-200 text-zinc-700"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="mt-4 pt-4 border-t border-zinc-200 text-zinc-600 text-sm sm:text-base leading-relaxed animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-16 p-8 bg-zinc-900 text-white rounded-3xl border border-zinc-800 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-xl mx-auto">
            <h3 className="font-display font-black text-2xl uppercase tracking-tight mb-2">
              {t.faqPage.stillHaveTitle}
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm mb-6 leading-relaxed">
              {t.faqPage.stillHaveDesc}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${WORKSHOP_INFO.phones[0]}`}
                className="btn-primary text-white font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded-xl shadow-lg shadow-red-600/30 flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>{t.faqPage.callBtn}</span>
              </a>
              <Link
                href="/booking"
                className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded-xl border border-white/20 transition-colors flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>{t.faqPage.bookBtn}</span>
              </Link>
            </div>
          </div>
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-red-600/20 rounded-full blur-2xl pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
