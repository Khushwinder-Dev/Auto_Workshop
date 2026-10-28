"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const videos = [
  "/videos/ac-gas-remove.mp4",
  "/videos/ac-system-flush.mp4",
  "/videos/mercedes-engine-rebuild.mp4",
  "/videos/new-video-2.mp4",
  "/videos/nissan-ac-evaporator.mp4",
  "/videos/toyota-hybrid-repair.mp4",
  "/videos/workshop-video-1.mp4",
  "/videos/workshop-video-2.mp4",
  "/videos/workshop-video-3.mp4",
  "/videos/new-video-3.mp4",
  "/videos/workshop-video-5.mp4",
  "/videos/new-video.mp4",
];

export default function GalleryPage() {
  const { t } = useLanguage();

  return (
    <main>
      <div>
        <section className="relative w-full h-[60vh] min-h-[450px] overflow-hidden flex flex-col bg-black">
          <div className="absolute inset-0 z-0">
            <Image
              alt="Workshop Hero"
              fill
              className="object-cover"
              src="/images/services-hero.png"
              priority
            />
            <div className="absolute inset-0 bg-[#1a0a05]/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
          </div>
          <div className="relative z-20 flex-grow flex flex-col items-center justify-center text-center px-6 mt-10">
            <div data-aos="zoom-out" data-aos-delay="200" className="mb-4">
              <h1 className="text-3xl md:text-[50px] font-display font-bold tracking-[-0.04em] leading-[0.9] flex items-center justify-center gap-4 max-w-[800px]">
                <span className="text-white">{t.gallery.heroTitle}</span>
              </h1>
            </div>
            <p
              data-aos="fade-up"
              data-aos-delay="400"
              className="max-w-xl text-gray-300 text-xs md:text-sm font-medium tracking-wide opacity-90"
            >
              {t.gallery.heroSubtitle}
            </p>
          </div>
        </section>

        <div className="bg-[#0a0a0a] min-h-screen py-16 px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((videoSrc, idx) => (
                <div
                  key={idx}
                  className="relative group bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl border border-zinc-800"
                >
                  <div className="aspect-[9/16] w-full bg-black flex items-center justify-center">
                    <video
                      controls
                      playsInline
                      className="w-full h-full object-cover"
                      controlsList="nodownload"
                    >
                      <source src={videoSrc} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <section className="relative bg-[#1a0b0b] py-20 px-6 overflow-hidden mt-20 rounded-3xl border border-red-950/40 max-w-7xl mx-auto">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-900/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <h2 className="text-2xl md:text-4xl font-display text-white uppercase tracking-tighter mb-6 leading-tight">
                {t.gallery.readyTitle1} <span className="text-red-600">{t.gallery.readyTitle2}</span>
              </h2>
              <p className="text-zinc-400 text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                {t.gallery.readyDesc}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  className="w-full sm:w-auto btn-primary text-white font-bold px-10 py-4 rounded-full transition-all active:scale-95 uppercase text-sm tracking-widest cursor-pointer shadow-lg shadow-red-600/30"
                  href="/contact"
                >
                  {t.gallery.contactBtn}
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
