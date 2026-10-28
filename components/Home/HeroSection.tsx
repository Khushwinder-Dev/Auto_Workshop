"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Calendar, Play, Pause } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function HeroSection({ s }: { s?: Record<string, string> }) {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isArabic, t } = useLanguage();

  const stats = [
    {
      target: s?.home_stat1_target || "5,000",
      suffix: s?.home_stat1_suffix || "+",
      label: s?.home_stat1_label || t.home.hero.happyClients,
    },
    {
      target: s?.home_stat2_target || "15",
      suffix: s?.home_stat2_suffix || "+",
      label: s?.home_stat2_label || t.home.hero.yearsExp,
    },
    {
      target: s?.home_stat3_target || "20",
      suffix: s?.home_stat3_suffix || "+",
      label: s?.home_stat3_label || t.home.hero.servicesOffered,
    },
    {
      target: s?.home_stat4_target || "98",
      suffix: s?.home_stat4_suffix || "%",
      label: s?.home_stat4_label || t.home.hero.satisfactionRate,
    },
  ];

  // Play toggles video mode; Pause returns to image mode
  const handleToggleVideo = () => {
    if (!isPlayingVideo) {
      setIsPlayingVideo(true);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current
          .play()
          .catch((err) => console.log("Video playback error:", err));
      }
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
      }
      setIsPlayingVideo(false);
    }
  };

  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      {/* 1. Background Image Banner */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ease-in-out z-0 ${isPlayingVideo
          ? "opacity-0 pointer-events-none"
          : "opacity-100"
          }`}
      >
        <Image
          src="/images/home-hero.png"
          alt="Workshop Hero"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* 2. Background Video Banner */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ease-in-out z-0 ${isPlayingVideo
          ? "opacity-100"
          : "opacity-0 pointer-events-none"
          }`}
      >
        <video
          ref={videoRef}
          src="/videos/mercedes-engine-rebuild.mp4"
          loop
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

      {/* 3. Center Hero Typography & CTAs */}
      <div className="relative z-20 text-center px-4 mb-20 max-w-[1000px]">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-[clamp(2.5rem,6.5vw,5.5rem)] font-extrabold text-white leading-[1.1] tracking-[-0.01em] uppercase mb-[1.25rem] drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]"
        >
          {s?.home_hero_title || t.home.hero.title}
        </motion.h1>
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-white text-lg md:text-2xl font-bold tracking-wider opacity-90 drop-shadow-lg"
        >
          {s?.home_hero_subtitle || t.home.hero.subtitle}
        </motion.h3>

        {/* CTA Buttons & Video Play/Pause Circle */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/services"
            className="group px-8 py-3.5 rounded-full text-sm font-bold tracking-wider uppercase inline-flex items-center gap-3 bg-white hover:bg-zinc-100 text-red-600 shadow-xl shadow-black/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>{t.home.hero.exploreMore}</span>
            <span className="w-7 h-7 rounded-full bg-red-50 text-red-600 flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm">
              <ArrowIcon className="w-4 h-4 stroke-[2.5]" />
            </span>
          </Link>

          <Link
            href="/booking"
            className="px-8 py-3.5 rounded-full text-sm font-bold tracking-wider uppercase inline-flex items-center gap-2.5 bg-black/50 hover:bg-black/80 text-white border border-white/20 hover:border-white/50 backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-red-500" />
            <span>{t.home.hero.bookService}</span>
          </Link>

          {/* Circular Play / Pause Button with Pulsing Halo */}
          <div className="relative group inline-flex items-center ml-1">
            {!isPlayingVideo && (
              <span className="absolute inset-0 rounded-full bg-white/40 animate-ping duration-1000 pointer-events-none" />
            )}
            <button
              type="button"
              onClick={handleToggleVideo}
              aria-label={
                isPlayingVideo
                  ? t.home.hero.videoPauseHint
                  : t.home.hero.videoPlayHint
              }
              title={
                isPlayingVideo
                  ? t.home.hero.videoPauseHint
                  : t.home.hero.videoPlayHint
              }
              className="relative w-12 h-12 rounded-full bg-white hover:bg-zinc-100 border-2 border-white flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 shadow-[0_0_25px_rgba(255,255,255,0.4)] focus:outline-none"
            >
              {isPlayingVideo ? (
                <Pause className="w-5 h-5 text-red-600 fill-red-600" />
              ) : (
                <Play className="w-5 h-5 text-red-600 fill-red-600 ml-0.5" />
              )}
            </button>
          </div>
        </motion.div>
      </div>

      {/* 5. Glassmorphic Stats Section */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-full max-w-[1200px] px-6 z-30">
        <div className="hero-stats-glass rounded-xl md:rounded-2xl grid grid-cols-2 lg:grid-cols-4 overflow-hidden border border-white/10 bg-[#0006]">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center py-8 md:py-10 border-white/10 lg:[&:not(:last-child)]:border-r max-lg:[&:nth-child(odd)]:border-r max-lg:[&:nth-child(-n+2)]:border-b"
            >
              <div className="flex items-baseline" dir="ltr">
                <span className="font-display text-4xl md:text-5xl font-black text-white">
                  {stat.target}
                </span>
                <span className="font-display text-2xl md:text-3xl font-black text-brand ml-1">
                  {stat.suffix}
                </span>
              </div>
              <p className="mt-1 text-[10px] md:text-xs font-bold text-zinc-300 uppercase tracking-widest text-center">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 z-30 pointer-events-none">
        <span className="text-[10px] font-bold text-white uppercase tracking-[0.4em]">
          {t.home.hero.scrollDown}
        </span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-brand to-transparent" />
      </div>
    </section>
  );
}
