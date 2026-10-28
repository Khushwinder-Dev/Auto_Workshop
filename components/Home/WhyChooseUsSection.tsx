"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, ArrowRight, ArrowLeft, Award } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function WhyChooseUsSection() {
  const { isArabic, t } = useLanguage();

  const leftCards = [
    {
      number: "01",
      title: t.home.whyChooseUs.card1Title,
      description: t.home.whyChooseUs.card1Desc,
    },
    {
      number: "03",
      title: t.home.whyChooseUs.card3Title,
      description: t.home.whyChooseUs.card3Desc,
    },
    {
      number: "05",
      title: t.home.whyChooseUs.card5Title,
      description: t.home.whyChooseUs.card5Desc,
    },
  ];

  const rightCards = [
    {
      number: "02",
      title: t.home.whyChooseUs.card2Title,
      description: t.home.whyChooseUs.card2Desc,
    },
    {
      number: "04",
      title: t.home.whyChooseUs.card4Title,
      description: t.home.whyChooseUs.card4Desc,
    },
    {
      number: "06",
      title: t.home.whyChooseUs.card6Title,
      description: t.home.whyChooseUs.card6Desc,
    },
  ];

  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  return (
    <section
      id="why-choose-us"
      className="relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto">
        {/* ============================================================
            SECTION HEADER
            ============================================================ */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 lg:mb-20">
          {/* Eyebrow / Tag */}
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <span className="inline-block h-[2px] w-6 sm:w-8 bg-red-600 rounded-full" />
            <span className="text-xs sm:text-sm font-extrabold tracking-[0.18em] uppercase text-red-600">
              {t.home.whyChooseUs.eyebrow}
            </span>
            <span className="inline-block h-[2px] w-6 sm:w-8 bg-red-600 rounded-full" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold text-zinc-900 tracking-tight leading-[1.15]">
            <span>{t.home.whyChooseUs.titlePart1}</span>{" "}
            <span className="text-red-600">{t.home.whyChooseUs.titlePart2}</span>
            <br />
            <span className="text-red-600">{t.home.whyChooseUs.titlePart3}</span>
          </h2>
          <p className="mt-4 text-zinc-600 text-sm md:text-base max-w-xl mx-auto">
            {t.home.whyChooseUs.subtitle}
          </p>
        </div>

        {/* ============================================================
            MAIN 3-COLUMN LAYOUT
            ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-10 items-center">
          {/* ------------------------------------------------------------
              LEFT COLUMN: CARDS 01, 03, 05
              ------------------------------------------------------------ */}
          <div className="lg:col-span-4 flex flex-col gap-6 sm:gap-7 order-2 lg:order-1">
            {leftCards.map((card, idx) => (
              <div
                key={idx}
                className="group relative bg-zinc-50 hover:bg-white rounded-2xl p-6 border border-zinc-200/80 hover:border-red-600/40 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black text-red-600 tracking-wider bg-red-50 border border-red-200/60 px-2.5 py-1 rounded-full">
                    {card.number}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-zinc-300 group-hover:text-red-600 transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900 group-hover:text-red-600 transition-colors mb-2">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>

          {/* ------------------------------------------------------------
              CENTER COLUMN: FEATURE IMAGE & TRUST BADGE
              ------------------------------------------------------------ */}
          <div className="lg:col-span-4 relative order-1 lg:order-2 flex justify-center">
            <div className="relative w-full max-w-[360px] h-[440px] sm:h-[480px] lg:h-[520px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-zinc-900 group">
              <Image
                src="/images/service-10.png"
                alt="Bab Al Bustan Master Mechanic"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Floating Center Badge */}
              <div className="absolute bottom-6 inset-x-6 bg-black/85 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center shadow-xl">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-red-600 text-white mb-2 shadow-md shadow-red-600/40">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="text-white text-base font-extrabold uppercase tracking-tight">
                  {t.home.whyChooseUs.badgeTitle}
                </h4>
                <p className="text-zinc-300 text-xs mt-0.5">
                  {t.home.whyChooseUs.badgeSub}
                </p>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------
              RIGHT COLUMN: CARDS 02, 04, 06
              ------------------------------------------------------------ */}
          <div className="lg:col-span-4 flex flex-col gap-6 sm:gap-7 order-3">
            {rightCards.map((card, idx) => (
              <div
                key={idx}
                className="group relative bg-zinc-50 hover:bg-white rounded-2xl p-6 border border-zinc-200/80 hover:border-red-600/40 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black text-red-600 tracking-wider bg-red-50 border border-red-200/60 px-2.5 py-1 rounded-full">
                    {card.number}
                  </span>
                  <ShieldCheck className="w-4 h-4 text-zinc-300 group-hover:text-red-600 transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900 group-hover:text-red-600 transition-colors mb-2">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-14 sm:mt-16 p-8 rounded-3xl bg-zinc-950 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-red-600/30 shadow-2xl">
          <div className="space-y-1 text-center md:text-start">
            <h4 className="text-xl md:text-2xl font-bold font-display uppercase tracking-tight">
              {t.home.whyChooseUs.bannerTitle}
            </h4>
            <p className="text-zinc-400 text-xs sm:text-sm">
              {t.home.whyChooseUs.bannerDesc}
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/booking"
              className="px-6 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-red-600/30 inline-flex items-center gap-2 hover:scale-105 cursor-pointer"
            >
              <span>{t.home.whyChooseUs.bookBtn}</span>
              <ArrowIcon className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider transition-all border border-zinc-700 cursor-pointer"
            >
              {t.home.whyChooseUs.contactBtn}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
