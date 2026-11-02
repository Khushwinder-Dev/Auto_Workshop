"use client";

import React from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function FourStepProcessSection() {
  const { isArabic, t } = useLanguage();

  const steps = [
    {
      num: "01",
      emoji: "🗓️",
      title: t.home.fourStep.step1Title,
      desc: t.home.fourStep.step1Desc,
    },
    {
      num: "02",
      emoji: "🚗",
      title: t.home.fourStep.step2Title,
      desc: t.home.fourStep.step2Desc,
    },
    {
      num: "03",
      emoji: "⚙️",
      title: t.home.fourStep.step3Title,
      desc: t.home.fourStep.step3Desc,
    },
    {
      num: "04",
      emoji: "✅",
      title: t.home.fourStep.step4Title,
      desc: t.home.fourStep.step4Desc,
    },
  ];

  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  return (
    <section className="bg-white py-14 sm:py-20 lg:py-24 overflow-hidden" dir={isArabic ? "rtl" : "ltr"}>
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-6 xl:px-10 2xl:px-14 flex flex-col items-center">
        <div className="inline-block px-5 py-1.5 rounded-full border border-red-500/30 bg-red-500/10 mb-8">
          <span className="text-red-600 text-[10px] font-black tracking-[0.25em] uppercase">
            {t.home.fourStep.eyebrow}
          </span>
        </div>
        <h2 className="font-display font-bold text-2xl md:text-5xl text-black leading-tight uppercase tracking-tight mb-10 sm:mb-16 lg:mb-20 text-center">
          {t.home.fourStep.title}
        </h2>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-0 w-full">
          {steps.map((step, idx) => (
            <React.Fragment key={step.num}>
              <div className="flex-1 w-full max-w-[320px] bg-[#111111] border border-zinc-800/80 rounded-2xl p-6 sm:p-8 lg:p-10 flex flex-col items-center text-center shadow-2xl transition-all duration-300 hover:border-red-600/50 hover:translate-y-[-5px] group">
                <span className="font-display text-4xl font-black text-red-500 group-hover:text-red-400 mb-4 tracking-tight transition-colors drop-shadow-[0_2px_8px_rgba(239,68,68,0.25)]">
                  {step.num}
                </span>
                <div className="text-3xl mb-6 flex items-center justify-center h-12 transition-transform duration-300 group-hover:scale-110">
                  {step.emoji}
                </div>
                <h3 className="text-white font-bold text-xl mb-4 tracking-wide uppercase">
                  {step.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed max-w-[200px]">
                  {step.desc}
                </p>
              </div>
              {idx < steps.length - 1 && (
                <div className="hidden lg:flex items-center justify-center w-12 xl:w-16">
                  <ArrowIcon className="text-red-600 w-5 h-5" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
