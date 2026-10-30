"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  Play,
  Pause,
  Cpu,
  Droplets,
  Disc,
  Fan,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
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

interface MajorServiceItem {
  id: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

const MAJOR_HERO_SERVICES: MajorServiceItem[] = [
  {
    id: "diagnostics",
    titleEn: "Diagnostics & ECU Scans",
    titleAr: "فحص كمبيوتر وتشخيص الأعطال",
    descEn: "OEM scanner diagnostics & sensor tuning",
    descAr: "كشف وفحص شامل لكمبيوتر وحساسات السيارة",
    icon: Cpu,
    href: "/services-details?service=diagnostics",
  },
  {
    id: "oil-change",
    titleEn: "Synthetic Oil & Filter Service",
    titleAr: "تبديل زيت المحرك والفلتر",
    descEn: "Desert-grade synthetic oils & OEM filters",
    descAr: "زيوت تخليقية كاملة وفلاتر أصلية معتمدة",
    icon: Droplets,
    href: "/services-details?service=oil-change",
  },
  {
    id: "brakes",
    titleEn: "Brake Repair & Rotor Skimming",
    titleAr: "صيانة وفحص الفرامل (السفايف)",
    descEn: "Ceramic pads & precision disk skimming",
    descAr: "تبديل فحمات سيراميك وخرط الدسكات إلكترونياً",
    icon: Disc,
    href: "/services-details?service=brakes",
  },
  {
    id: "ac-repair",
    titleEn: "Car A/C Repair & Refrigerant Gas",
    titleAr: "تصليح وشحن مكيف السيارة",
    descEn: "UV leak detection & ice-cold cooling recharge",
    descAr: "كشف تسريب غاز المكيف وشحن فريون أصلي",
    icon: Fan,
    href: "/services-details?service=ac-repair",
  },
];

export default function HeroSection({ s }: { s?: Record<string, string> }) {
  const { t, isArabic } = useLanguage();
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Content rotates across the 3 slides while background image remains constant
  const slides = [
    {
      titlePart1: isArabic ? "فحص كمبيوتر متقدم و" : "Advanced Diagnostics &",
      titlePart2: isArabic ? "برمجة السيارات بالشارقة" : "Precision Engine Care",
      description: isArabic
        ? "تشخيص إلكتروني شامل لجميع الحساسات، قراءة كمبيوتر الوكالات، وحلول هندسية لأعطال المحرك في المنطقة الصناعية 5 بالشارقة."
        : "OEM-level computer scanning, sensor diagnostics, ECU tuning, and complete mechanical care in Sharjah Industrial Area 5.",
    },
    {
      titlePart1: isArabic ? "صيانة الفرامل المعتمدة و" : "High-Performance Brakes &",
      titlePart2: isArabic ? "تجديد المساعدات والتعليق" : "Suspension Overhaul",
      description: isArabic
        ? "تبديل فحمات سيراميك، خرط دسكات إلكترونياً، وتجديد المساعدات وميزان ليزر لأعلى مستويات الأمان والثبات على الطرقات."
        : "Ceramic pad replacements, computerized disk skimming, shock absorbers, and laser alignment for smooth desert driving.",
    },
    {
      titlePart1: isArabic ? "تصليح مكيفات السيارات و" : "Desert-Ready Car AC &",
      titlePart2: isArabic ? "الصيانة الدورية المعتمدة" : "Full Synthetic Lube",
      description: isArabic
        ? "كشف تسريب غاز المكيف بالأشعة، تجديد الكمبريسور، وتغيير زيوت تخليقية كاملة مع فلاتر أصلية معتمدة لحرارة الصيف."
        : "UV leak testing, ice-cold freon recharge, compressor overhauls, and top-tier synthetic oil changes for extreme UAE weather.",
    },
  ];

  const activeSlide = slides[slideIndex];

  const goToSlide = (index: number) => {
    if (index === slideIndex) return;
    setDirection(index > slideIndex ? 1 : -1);
    setSlideIndex(index);
  };

  // Auto-advance slide text every 7 seconds when video is not playing
  useEffect(() => {
    if (isPlayingVideo && !isVideoPaused) return;
    const timer = setInterval(() => {
      setDirection(1);
      setSlideIndex((current) => (current + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isPlayingVideo, isVideoPaused, slides.length, slideIndex]);

  // Mobile WebKit (iOS Safari) setup for muted background playback
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.defaultMuted = true;
    }
  }, []);

  // Toggle video playback
  const handleToggleVideo = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (!isPlayingVideo) {
      setIsPlayingVideo(true);
      setIsVideoPaused(false);
      video.muted = isMuted;
      video.currentTime = 0;
      video.play().catch((err) => {
        console.warn("Video play error:", err);
        video.muted = true;
        video.play().catch(() => {});
      });
    } else {
      if (video.paused) {
        video.play().then(() => setIsVideoPaused(false)).catch(() => {});
      } else {
        video.pause();
        setIsVideoPaused(true);
      }
    }
  };

  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;
  const ChevronIcon = isArabic ? ChevronLeft : ChevronRight;

  return (
    <section
      className="relative w-full min-h-screen min-h-[720px] lg:h-[100dvh] flex flex-col justify-between overflow-hidden bg-zinc-950"
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* 1. Background Image — Remains strictly constant (1st slide workshop image) for all slides */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out z-0 ${
          isPlayingVideo && !isVideoPaused
            ? "opacity-0 pointer-events-none"
            : "opacity-100"
        }`}
      >
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

      {/* 2. Background Video Banner (Toyota Corolla in Workshop) */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out z-0 ${
          isPlayingVideo && !isVideoPaused
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <video
          ref={videoRef}
          src="/videos/toyota-corolla-red.mp4"
          loop
          playsInline
          muted={isMuted}
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* 3. Deep Cinematic Gradient Overlays (Auto Workshop Red / Black Tint) */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: isArabic
            ? "linear-gradient(270deg, rgba(9, 9, 11, 0.92) 0%, rgba(9, 9, 11, 0.82) 42%, rgba(9, 9, 11, 0.55) 75%, rgba(0, 0, 0, 0.35) 100%)"
            : "linear-gradient(90deg, rgba(9, 9, 11, 0.92) 0%, rgba(9, 9, 11, 0.82) 42%, rgba(9, 9, 11, 0.55) 75%, rgba(0, 0, 0, 0.35) 100%)",
        }}
      />
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0.65) 0%, transparent 22%, transparent 70%, rgba(9, 9, 11, 0.85) 100%)",
        }}
      />

      {/* 4. Left Vertical Slider / Pill Indicators (TajAlRahmah Style) */}
      <div
        className={`flex flex-col items-center gap-2.5 absolute top-1/2 -translate-y-1/2 z-30 ${
          isArabic ? "right-3 sm:right-5 xl:right-7" : "left-3 sm:left-5 xl:left-7"
        }`}
      >
        {slides.map((_, index) => {
          const active = index === slideIndex;
          return (
            <button
              key={index}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`${isArabic ? "الشريحة" : "Go to slide"} ${index + 1}`}
              aria-current={active}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                active
                  ? "w-1.5 h-7 bg-red-600 shadow-[0_0_14px_#dc2626]"
                  : "w-1.5 h-7 border border-white/40 bg-white/10 hover:border-red-500 hover:bg-red-600/30"
              }`}
            />
          );
        })}
      </div>

      {/* 5. Main Hero Content Container (TajAlRahmah 12-Column Grid Layout) */}
      <div
        className={`relative z-20 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-28 sm:pt-36 lg:pt-36 pb-12 lg:pb-0 flex-1 flex flex-col justify-center ${
          isArabic ? "pr-10 sm:pr-14" : "pl-10 sm:pl-14"
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left: Heading, Description & Action CTAs (Columns 1-7) */}
          <div className="lg:col-span-7 flex flex-col items-start text-start min-h-[290px] sm:min-h-[320px]">
            {/* Fixed Eyebrow with Brand Indicator Bar */}
            <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
              <span className="w-6 sm:w-8 h-[2.5px] bg-red-600 rounded-full" />
              <span className="text-red-500 text-xs sm:text-sm font-black tracking-[0.2em] uppercase font-display">
                {isArabic
                  ? "كراج باب البستان لصيانة وتصليح السيارات — الشارقة"
                  : "Bab Al Bustan Auto Maintenance Workshop"}
              </span>
            </div>

            {/* Direction-Aware Slide Typography Animation — Only Content Changes */}
            <div className="relative w-full overflow-hidden min-h-[190px] sm:min-h-[220px]">
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
                  <h1 className="text-white text-3xl sm:text-5xl md:text-5xl lg:text-[54px] xl:text-[62px] font-black leading-[1.08] tracking-tight uppercase font-display drop-shadow-[0_2px_25px_rgba(0,0,0,0.6)]">
                    {activeSlide.titlePart1} <br />
                    <span className="text-red-500 drop-shadow-[0_2px_25px_rgba(220,38,38,0.55)]">
                      {activeSlide.titlePart2}
                    </span>
                  </h1>

                  <p className="text-zinc-200 text-sm sm:text-base md:text-lg max-w-xl font-normal leading-relaxed mt-4 sm:mt-5 mb-7 sm:mb-8 drop-shadow-md">
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

              {/* Button 2: EXPLORE SERVICES */}
              <Link
                href="/services"
                className="group pl-5 sm:pl-7 pr-1.5 sm:pr-2.5 py-1.5 sm:py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-black text-xs sm:text-sm tracking-wider uppercase inline-flex items-center gap-2.5 sm:gap-3.5 transition-all duration-300 shadow-[0_4px_22px_rgba(220,38,38,0.45)] hover:shadow-[0_6px_28px_rgba(220,38,38,0.65)] hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>{isArabic ? "استكشف الخدمات" : "Explore Services"}</span>
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-red-600 flex items-center justify-center transition-transform group-hover:scale-110">
                  <ArrowIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                </span>
              </Link>
            </div>
          </div>

          {/* Right: Side Content — Displaying Major Workshop Services (Columns 8-12) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="bg-zinc-950/85 backdrop-blur-2xl border border-red-600/35 rounded-3xl p-5 sm:p-6 shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(220,38,38,0.18)] relative overflow-hidden group/card">
              {/* Ambient radial glow */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

              {/* Card Header Strip */}
              <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-zinc-800/80 relative z-10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                  <h3 className="text-xs sm:text-sm font-black tracking-widest uppercase text-white font-display">
                    {isArabic ? "خدماتنا الرئيسية" : "OUR MAJOR SERVICES"}
                  </h3>
                </div>
                <span className="text-[11px] font-bold text-red-500 uppercase tracking-wider">
                  {isArabic ? "الشارقة صناعية 5" : "Sharjah Ind. Area 5"}
                </span>
              </div>

              {/* Services List (4 Major Workshop Services) */}
              <div className="space-y-2 relative z-10">
                {MAJOR_HERO_SERVICES.map((srv) => {
                  const Icon = srv.icon;
                  return (
                    <Link
                      key={srv.id}
                      href={srv.href}
                      className="group/item flex items-center justify-between p-2.5 sm:p-3 rounded-2xl bg-zinc-900/60 hover:bg-zinc-900/95 border border-zinc-800/80 hover:border-red-600/60 transition-all duration-200 cursor-pointer"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-zinc-800 text-red-500 border border-zinc-700/80 group-hover/item:bg-red-600 group-hover/item:text-white group-hover/item:border-red-600 flex items-center justify-center shrink-0 transition-all duration-200">
                          <Icon className="w-5 h-5 stroke-[2]" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs sm:text-[13px] font-bold text-white group-hover/item:text-red-500 transition-colors truncate">
                            {isArabic ? srv.titleAr : srv.titleEn}
                          </p>
                          <p className="text-[11px] text-zinc-400 truncate leading-snug">
                            {isArabic ? srv.descAr : srv.descEn}
                          </p>
                        </div>
                      </div>
                      <ChevronIcon className="w-4 h-4 text-zinc-600 group-hover/item:text-red-500 group-hover/item:translate-x-1 rtl:group-hover/item:-translate-x-1 transition-all shrink-0 ml-2 rtl:ml-0 rtl:mr-2" />
                    </Link>
                  );
                })}
              </div>

              {/* Card Footer: View All Services + Watch Workshop Video Toggle */}
              <div className="mt-3.5 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs relative z-10">
                <Link
                  href="/services"
                  className="text-zinc-300 hover:text-red-500 font-bold transition-colors inline-flex items-center gap-1.5"
                >
                  <span>{isArabic ? "جميع خدمات الورشة (8+)" : "View All Services (8+)"}</span>
                  <ChevronIcon className="w-3.5 h-3.5" />
                </Link>

                {/* Video Play / Pause Toggle */}
                <button
                  type="button"
                  onClick={handleToggleVideo}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-600/40 hover:border-red-600 font-bold text-[11px] transition-all cursor-pointer shadow-sm active:scale-95"
                  title={isPlayingVideo && !isVideoPaused ? "Pause Video" : "Play Live Video"}
                >
                  {isPlayingVideo && !isVideoPaused ? (
                    <>
                      <Pause className="w-3 h-3 fill-current" />
                      <span>{isArabic ? "إيقاف الفيديو" : "Pause Video"}</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 fill-current ml-0.5" />
                      <span>{isArabic ? "فيديو الورشة" : "Watch Video"}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Bottom Spacer / Subtle Scroll Down Indicator */}
      <div className="relative z-20 pb-5 sm:pb-7 flex justify-center">
        <div className="flex flex-col items-center gap-1.5 opacity-60">
          <span className="text-[10px] font-bold text-white uppercase tracking-[0.3em]">
            {t.home.hero.scrollDown}
          </span>
          <div className="w-[1.5px] h-6 bg-gradient-to-b from-red-600 to-transparent" />
        </div>
      </div>

      {/* 7. Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </section>
  );
}
