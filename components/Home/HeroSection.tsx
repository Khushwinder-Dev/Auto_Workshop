"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import BookingModal from "@/components/Common/BookingModal";

const SLIDE_VARIANTS = {
  enter: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? 28 : -28,
  }),
  center: {
    opacity: 1,
    y: 0,
  },
  exit: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? -28 : 28,
  }),
};

interface HeroServiceSlide {
  id: string;
  badgeEn: string;
  badgeAr: string;
  serviceNameEn: string;
  serviceNameAr: string;
  titlePart1: string;
  titlePart2: string;
  description: string;
}

export default function HeroSection({ s }: { s?: Record<string, string> }) {
  const { t, isArabic } = useLanguage();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  // Slides rotate through Bab Al Bustan's 3 major services while the workshop background image remains static
  const slides: HeroServiceSlide[] = [
    {
      id: "diagnostics",
      badgeEn: "MAJOR SERVICE 01 / 03 • COMPUTER DIAGNOSTICS & ECU",
      badgeAr: "خدمة رئيسية ٠١ / ٠٣ • فحص كمبيوتر وتشخيص الأعطال",
      serviceNameEn: "Diagnostics & ECU Scans",
      serviceNameAr: "فحص كمبيوتر وبرمجة الأعطال",
      titlePart1: isArabic ? "فحص كمبيوتر متقدم و" : "Advanced Diagnostics &",
      titlePart2: isArabic ? "برمجة الحساسات والكمبيوتر" : "Precision Engine Care",
      description: isArabic
        ? "فحص إلكتروني شامل لكمبيوتر السيارة بأحدث أجهزة الوكالة، كشف وإصلاح لمبة المحرك، فحص الحساسات، وبرمجة الأنظمة في صناعية 5 بالشارقة."
        : "OEM-level computer scanning, sensor diagnostics, ECU tuning, check engine light diagnosis, and complete mechanical care in Sharjah Industrial Area 5.",
    },
    {
      id: "brakes",
      badgeEn: "MAJOR SERVICE 02 / 03 • BRAKE REPAIR & ROTOR SKIMMING",
      badgeAr: "خدمة رئيسية ٠٢ / ٠٣ • صيانة الفرامل وخرط الديسكات",
      serviceNameEn: "Brake Repair & Rotor Skimming",
      serviceNameAr: "صيانة الفرامل والديسكات",
      titlePart1: isArabic ? "صيانة وتصليح الفرامل و" : "High-Performance Brakes &",
      titlePart2: isArabic ? "خرط الديسكات والمساعدات" : "Suspension Overhaul",
      description: isArabic
        ? "تبديل سفايف سيراميك أصلية، خرط ديسكات ليزري على السيارة بدون فك، تجديد المساعدات ونظام التعليق، وميزان ليزر لأعلى مستويات الأمان والثبات."
        : "Ceramic pad replacements, computerized on-car disk skimming, fluid flushes, suspension shock absorbers, and laser alignment for smooth desert driving.",
    },
    {
      id: "ac-repair",
      badgeEn: "MAJOR SERVICE 03 / 03 • DESERT-READY CAR A/C & OIL SERVICE",
      badgeAr: "خدمة رئيسية ٠٣ / ٠٣ • تصليح المكيف وتغيير الزيت",
      serviceNameEn: "Car A/C Repair & Synthetic Lube",
      serviceNameAr: "تصليح المكيف والصيانة الدورية",
      titlePart1: isArabic ? "تصليح مكيفات السيارات و" : "Desert-Ready Car A/C &",
      titlePart2: isArabic ? "الصيانة الدورية المعتمدة" : "Full Synthetic Lube",
      description: isArabic
        ? "كشف تسريب غاز المكيف بأشعة UV، صيانة واستبدال الكمبروسر وثلاجة المكيف، مع تبديل زيوت تخليقية كاملة وفلاتر أصلية لحرارة الصيف."
        : "UV leak testing, ice-cold freon recharge, compressor overhauls, and top-tier synthetic oil changes for extreme UAE weather.",
    },
  ];

  const activeSlide = slides[slideIndex];

  const goToSlide = (index: number) => {
    if (index === slideIndex) return;
    setDirection(index > slideIndex ? 1 : -1);
    setSlideIndex(index);
  };

  // Auto-advance slide text every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setSlideIndex((current) => (current + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  return (
    <section
      className="relative w-full min-h-screen min-h-[720px] lg:h-[100dvh] flex flex-col justify-between overflow-hidden bg-zinc-950"
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* 1. Background Image — Remains strictly constant (1st slide workshop image) for all slides */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-workshop-new.jpg"
          alt="Bab Al Bustan Auto Maintenance Workshop"
          fill
          priority
          quality={95}
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* 2. Deep Cinematic Gradient Overlays (Auto Workshop Red / Black Tint) */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: isArabic
            ? "linear-gradient(270deg, rgba(9, 9, 11, 0.94) 0%, rgba(9, 9, 11, 0.85) 45%, rgba(9, 9, 11, 0.55) 75%, rgba(0, 0, 0, 0.35) 100%)"
            : "linear-gradient(90deg, rgba(9, 9, 11, 0.94) 0%, rgba(9, 9, 11, 0.85) 45%, rgba(9, 9, 11, 0.55) 75%, rgba(0, 0, 0, 0.35) 100%)",
        }}
      />
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0.65) 0%, transparent 22%, transparent 70%, rgba(9, 9, 11, 0.85) 100%)",
        }}
      />

      {/* 3. Left Vertical Slider / Pill Indicators (TajAlRahmah Style) */}
      <div
        className={`flex flex-col items-center gap-2.5 absolute top-1/2 -translate-y-1/2 z-30 ${
          isArabic ? "right-3 sm:right-5 xl:right-7" : "left-3 sm:left-5 xl:left-7"
        }`}
      >
        {slides.map((slide, index) => {
          const active = index === slideIndex;
          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`${isArabic ? "خدمة" : "Service"} ${index + 1}: ${
                isArabic ? slide.serviceNameAr : slide.serviceNameEn
              }`}
              title={isArabic ? slide.serviceNameAr : slide.serviceNameEn}
              aria-current={active}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                active
                  ? "w-1.5 h-8 bg-red-600 shadow-[0_0_14px_#dc2626]"
                  : "w-1.5 h-8 border border-white/40 bg-white/10 hover:border-red-500 hover:bg-red-600/30"
              }`}
            />
          );
        })}
      </div>

      {/* 4. Main Hero Content Container (TajAlRahmah Style) */}
      <div
        className={`relative z-20 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-28 sm:pt-36 lg:pt-40 pb-12 flex-1 flex flex-col justify-center ${
          isArabic ? "pr-10 sm:pr-14" : "pl-10 sm:pl-14"
        }`}
      >
        <div className="max-w-3xl xl:max-w-4xl flex flex-col items-start text-start min-h-[320px] sm:min-h-[360px]">
          {/* Direction-Aware Slide Typography Animation — Only Content Changes Across Major Services */}
          <div className="relative w-full overflow-hidden min-h-[220px] sm:min-h-[250px] lg:min-h-[270px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={slideIndex}
                custom={direction}
                variants={SLIDE_VARIANTS}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Slide Eyebrow with Major Service Badge */}
                <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
                  <span className="w-6 sm:w-8 h-[2.5px] bg-red-600 rounded-full" />
                  <span className="text-red-500 text-xs sm:text-sm font-black tracking-[0.2em] uppercase font-display">
                    {isArabic ? activeSlide.badgeAr : activeSlide.badgeEn}
                  </span>
                </div>

                {/* Main Heading for the Active Major Service */}
                <h1 className="text-white text-3xl sm:text-5xl md:text-5xl lg:text-[54px] xl:text-[62px] font-black leading-[1.08] tracking-tight uppercase font-display drop-shadow-[0_2px_25px_rgba(0,0,0,0.6)]">
                  {activeSlide.titlePart1} <br />
                  <span className="text-red-500 drop-shadow-[0_2px_25px_rgba(220,38,38,0.55)]">
                    {activeSlide.titlePart2}
                  </span>
                </h1>

                {/* Major Service Description */}
                <p className="text-zinc-200 text-sm sm:text-base md:text-lg max-w-2xl font-normal leading-relaxed mt-4 sm:mt-5 mb-7 sm:mb-8 drop-shadow-md">
                  {activeSlide.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dual TajAlRahmah-Style Action CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-5">
            {/* Button 1: BOOK AN APPOINTMENT */}
            <button
              type="button"
              onClick={() => setIsBookingModalOpen(true)}
              className="group pl-5 sm:pl-7 pr-1.5 sm:pr-2.5 py-1.5 sm:py-2.5 rounded-full bg-white hover:bg-zinc-100 text-red-600 font-black text-xs sm:text-sm tracking-wider uppercase inline-flex items-center gap-2.5 sm:gap-3.5 transition-all duration-300 shadow-xl shadow-black/40 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>{isArabic ? "احجز موعد صيانة" : "Book an Appointment"}</span>
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-red-600 text-white flex items-center justify-center transition-transform group-hover:scale-110">
                <ArrowIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
              </span>
            </button>

            {/* Button 2: EXPLORE THIS MAJOR SERVICE */}
            <Link
              href={`/services-details?service=${activeSlide.id}`}
              className="group pl-5 sm:pl-7 pr-1.5 sm:pr-2.5 py-1.5 sm:py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-black text-xs sm:text-sm tracking-wider uppercase inline-flex items-center gap-2.5 sm:gap-3.5 transition-all duration-300 shadow-[0_4px_22px_rgba(220,38,38,0.45)] hover:shadow-[0_6px_28px_rgba(220,38,38,0.65)] hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>{isArabic ? "تفاصيل هذه الخدمة" : "Explore This Service"}</span>
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-red-600 flex items-center justify-center transition-transform group-hover:scale-110">
                <ArrowIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* 5. Bottom Spacer / Subtle Scroll Down Indicator */}
      <div className="relative z-20 pb-5 sm:pb-7 flex justify-center">
        <div className="flex flex-col items-center gap-1.5 opacity-60">
          <span className="text-[10px] font-bold text-white uppercase tracking-[0.3em]">
            {t.home.hero.scrollDown}
          </span>
          <span className="w-[1.5px] h-4 bg-gradient-to-b from-red-500 to-transparent animate-pulse" />
        </div>
      </div>

      {/* 6. Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </section>
  );
}
