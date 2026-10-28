"use client";

import React from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const brands = [
  { name: "Mercedes-Benz", logo: "/images/brands/Mercedes-Logo.png" },
  { name: "BMW", logo: "/images/brands/bimw.png" },
  { name: "Volkswagen", logo: "/images/brands/Volkswagen-Logo.png" },
  { name: "Land Rover", logo: "/images/brands/Land-Rover-Logo.jpg" },
  { name: "Chevrolet", logo: "/images/brands/Chevrolet-Logo.jpg" },
  { name: "Audi", logo: "/images/brands/Audi-Logo.jpg" },
  { name: "Kia", logo: "/images/brands/Kia-Logo.jpg" },
  { name: "Porsche", logo: "/images/brands/Porsche-Logo.jpg" },
  { name: "Ford", logo: "/images/brands/Ford-Logo.jpg" },
  { name: "Nissan", logo: "/images/brands/Nissan-Logo.jpg" },
  { name: "Toyota", logo: "/images/brands/Toyota-Logo.jpg" },
  { name: "Honda", logo: "/images/brands/Honda-logo.jpg" },
  { name: "Mitsubishi", logo: "/images/brands/Mitsubishi.jpg" },
  { name: "Lexus", logo: "/images/brands/Lexus.jpg" },
  { name: "Suzuki", logo: "/images/brands/Suzuki.jpg" },
  { name: "Infiniti", logo: "/images/brands/Infiniti.png" },
  { name: "UD", logo: "/images/brands/ud.png" },
  { name: "Jeep", logo: "/images/brands/jeep.png" },
];

export default function PartnershipSection() {
  const { isArabic, t } = useLanguage();

  return (
    <section className="relative bg-gradient-to-b from-zinc-100/90 via-zinc-50 to-zinc-100/90 py-20 lg:py-24 px-6 overflow-hidden border-y border-zinc-200/90">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 -left-20 -translate-y-1/2 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-20 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]"
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-14 lg:mb-16 border-b border-zinc-200/90 pb-10">
          <div className="flex flex-col items-start space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-widest bg-red-50 border border-red-200 px-3.5 py-1.5 rounded-full shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{isArabic ? "شركاؤنا والعلامات التجارية" : "Trusted Brand Partnerships"}</span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-[900] text-zinc-950 leading-none uppercase tracking-tight">
              {t.home.partnership.title1} <br /> {t.home.partnership.title2}
            </h2>
          </div>
          <div className="max-w-xl">
            <p className="text-zinc-600 text-base md:text-lg leading-relaxed">
              {t.home.partnership.desc}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 lg:gap-6">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="bg-white rounded-[24px] aspect-[4/3] flex flex-col items-center justify-center p-4 group transition-all duration-300 border border-zinc-200/90 shadow-sm hover:shadow-xl hover:shadow-zinc-300/40 hover:border-red-500/50 hover:-translate-y-1.5 relative overflow-hidden cursor-pointer"
            >
              {/* Subtle top indicator on hover */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-red-600/0 to-transparent group-hover:via-red-600 transition-all duration-300" />

              <div className="relative w-full h-1/2 mb-3">
                <Image
                  src={brand.logo}
                  alt={`${brand.name} repair and service Sharjah Industrial Area`}
                  fill
                  className="object-contain transition-all duration-300 group-hover:scale-110"
                />
              </div>
              <span className="text-zinc-800 group-hover:text-red-600 font-black text-[10px] md:text-[11px] text-center uppercase tracking-tight transition-colors">
                {brand.name}
              </span>
            </div>
          ))}
        </div>

        <div className="sr-only">
          Specializing in Toyota repair Sharjah, BMW service Sharjah, Mercedes maintenance UAE, Nissan repair Industrial Area 5, and all major automotive brands in Sharjah.
        </div>
      </div>
    </section>
  );
}
