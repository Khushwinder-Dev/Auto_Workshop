"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  Play,
  Pause,
  Sparkles,
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

export default function HeroSection({ s }: { s?: Record<string, string> }) {
  const { t, isArabic } = useLanguage();
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const videoRef = useRef<HTMLVideoElement>(null);

  const slides = [
    {
      image: "/images/hero-workshop-new.jpg",
      titlePart1: isArabic ? "فحص كمبيوتر متقدم و" : "Advanced Diagnostics &",
      titlePart2: isArabic ? "برمجة السيارات بالشارقة" : "Precision Engine Care",
      description: isArabic
        ? "تشخيص إلكتروني شامل لجميع الحساسات، قراءة كمبيوتر الوكالات، وحلول هندسية لأعطال المحرك في المنطقة الصناعية 5 بالشارقة."
        : "OEM-level computer scanning, sensor diagnostics, ECU tuning, and complete mechanical care in Sharjah Industrial Area 5.",
    },
    {
      image: "/images/hero-brakes-new.jpg",
      titlePart1: isArabic ? "صيانة الفرامل المعتمدة و" : "High-Performance Brakes &",
      titlePart2: isArabic ? "تجديد المساعدات والتعليق" : "Suspension Overhaul",
      description: isArabic
        ? "تبديل فحمات سيراميك، خرط دسكات إلكترونياً، وتجديد المساعدات وميزان ليزر لأعلى مستويات الأمان والثبات على الطرقات."
        : "Ceramic pad replacements, computerized disk skimming, shock absorbers, and laser alignment for smooth desert driving.",
    },
    {
      image: "/images/hero-supercar-new.jpg",
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

  // Auto-advance slides every 7 seconds when video is not playing
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

  return (
    <section
      className="relative w-full min-h-screen min-h-[680px] h-[100dvh] flex flex-col justify-between overflow-hidden bg-zinc-950"
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* 1. Background Image Slider Banners */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out z-0 ${
          isPlayingVideo && !isVideoPaused
            ? "opacity-0 pointer-events-none"
            : "opacity-100"
        }`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={slideIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={activeSlide.image}
              alt={activeSlide.titlePart2}
              fill
              priority
              quality={95}
              className="object-cover object-center"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 2. Background Video Banner (Toyota Corolla Red in Workshop) */}
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
            ? "linear-gradient(270deg, rgba(9, 9, 11, 0.88) 0%, rgba(9, 9, 11, 0.75) 35%, rgba(9, 9, 11, 0.45) 65%, rgba(0, 0, 0, 0.2) 100%)"
            : "linear-gradient(90deg, rgba(9, 9, 11, 0.88) 0%, rgba(9, 9, 11, 0.75) 35%, rgba(9, 9, 11, 0.45) 65%, rgba(0, 0, 0, 0.2) 100%)",
        }}
      />
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0.55) 0%, transparent 22%, transparent 70%, rgba(9, 9, 11, 0.75) 100%)",
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
        className={`relative z-20 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-28 sm:pt-36 lg:pt-40 flex-1 flex flex-col justify-center ${
          isArabic ? "pr-10 sm:pr-14" : "pl-10 sm:pl-14"
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* Left Text & CTAs (Columns 1-8) */}
          <div className="lg:col-span-8 flex flex-col items-start text-start min-h-[290px] sm:min-h-[320px] lg:min-h-[350px]">
            {/* Fixed Eyebrow with Brand Indicator Bar */}
            <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
              <span className="w-6 sm:w-8 h-[2.5px] bg-red-600 rounded-full" />
              <span className="text-red-500 text-xs sm:text-sm font-black tracking-[0.2em] uppercase font-display">
                {isArabic
                  ? "كراج باب البستان لصيانة وتصليح السيارات — الشارقة"
                  : "Bab Al Bustan Auto Maintenance Workshop"}
              </span>
            </div>

            {/* Direction-Aware Slide Typography Animation */}
            <div className="relative w-full overflow-hidden min-h-[190px] sm:min-h-[230px] lg:min-h-[260px]">
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
                  <h1 className="text-white text-3xl sm:text-5xl md:text-6xl lg:text-[64px] xl:text-[70px] font-black leading-[1.08] tracking-tight uppercase font-display drop-shadow-[0_2px_25px_rgba(0,0,0,0.6)]">
                    {activeSlide.titlePart1} <br />
                    <span className="text-red-500 drop-shadow-[0_2px_25px_rgba(220,38,38,0.55)]">
                      {activeSlide.titlePart2}
                    </span>
                  </h1>

                  <p className="text-zinc-200 text-sm sm:text-base md:text-lg max-w-xl font-normal leading-relaxed mt-4 sm:mt-5 mb-7 sm:mb-9 drop-shadow-md">
                    {activeSlide.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dual TajAlRahmah-Style Action CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-5">
              {/* Button 1: BOOK AN APPOINTMENT (Opens Booking Modal) */}
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

          {/* Right Column: Circular Play / Pause Button with Pulsing Halo (Columns 9-12) */}
          <div className="lg:col-span-4 flex items-center justify-center lg:justify-start lg:pl-6 pt-4 lg:pt-0">
            <div className="relative group">
              {/* Ambient Pulsing Halo */}
              {(!isPlayingVideo || isVideoPaused) && (
                <span className="absolute inset-0 rounded-full bg-red-600/35 animate-ping duration-1000 pointer-events-none" />
              )}

              {/* Circular Button */}
              <button
                type="button"
                onClick={handleToggleVideo}
                aria-label={
                  isPlayingVideo
                    ? isVideoPaused
                      ? "Resume Video"
                      : "Pause Video"
                    : "Play Workshop Video"
                }
                title={
                  isPlayingVideo
                    ? isVideoPaused
                      ? "Resume Video"
                      : "Pause Video"
                    : "Play Workshop Video"
                }
                className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-red-600 hover:bg-red-700 border-2 border-white/50 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 shadow-[0_0_35px_rgba(220,38,38,0.5)] hover:shadow-[0_0_55px_rgba(220,38,38,0.85)] focus:outline-none"
              >
                {isPlayingVideo && !isVideoPaused ? (
                  <Pause className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 text-white fill-white" />
                ) : (
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 text-white fill-white ml-0.5 sm:ml-1" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 7. Bottom Spacer / Subtle Scroll Down Indicator */}
      <div className="relative z-20 pb-6 sm:pb-8 flex justify-center">
        <div className="flex flex-col items-center gap-1.5 opacity-60">
          <span className="text-[10px] font-bold text-white uppercase tracking-[0.3em]">
            {t.home.hero.scrollDown}
          </span>
          <div className="w-[1.5px] h-6 bg-gradient-to-b from-red-600 to-transparent" />
        </div>
      </div>

      {/* 8. Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </section>
  );
}
