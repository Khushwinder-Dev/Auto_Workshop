"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
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

export default function BrandsPage() {
  const { isArabic, t } = useLanguage();

  return (
    <main className="min-h-screen bg-white">
      {/* ============================================================
          1. DEDICATED HERO BANNER SECTION (Dark Theme)
          ============================================================ */}
      <section className="relative w-full h-[600px] min-h-[600px] overflow-hidden flex flex-col justify-center bg-black border-b border-zinc-800">
        <div className="absolute inset-0 z-0">
          <Image
            alt="Brands We Service Bab Al Bustan"
            fill
            className="object-cover"
            src="/images/banners/banner-brands.jpg"
            priority
          />
          <div className="absolute inset-0 bg-[#1a0a05]/75" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
        </div>

        <div className="relative z-20 flex-grow flex flex-col items-center justify-center text-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-28 pb-12">
          <div className="mb-3">
            <h1 className="text-3xl md:text-5xl lg:text-[54px] font-display font-bold tracking-tight leading-tight flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-[800px]">
              <span className="text-white">{t.brands.heroTitle1}</span>
              <span className="text-red-600">{t.brands.heroTitle2}</span>
            </h1>
          </div>
          <p className="max-w-xl text-gray-300 text-xs sm:text-sm md:text-base font-medium tracking-wide opacity-90 leading-relaxed">
            {t.brands.heroSubtitle}
          </p>

          {/* Breadcrumb Navigation */}
          <div className="mt-5 flex items-center gap-2 text-xs font-bold text-gray-400">
            <Link href="/" className="hover:text-white transition-colors">
              {isArabic ? "الرئيسية" : "Home"}
            </Link>
            <span>/</span>
            <span className="text-red-500">
              {isArabic ? "الماركات" : "Brands"}
            </span>
          </div>
        </div>
      </section>

      {/* ============================================================
          2. BRANDS GRID SECTION (Separated Clean Light Section)
          ============================================================ */}
      <section className="py-16 sm:py-20 lg:py-24 bg-zinc-50 border-t border-zinc-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="flex items-center justify-center gap-2 text-red-600 font-bold text-[11px] sm:text-xs uppercase tracking-[0.2em] mb-3">
              <span className="w-8 h-[2px] bg-red-600 rounded-full" />
              <span>{isArabic ? "العلامات المدعومة بالكامل" : "SUPPORTED MANUFACTURERS"}</span>
              <span className="w-8 h-[2px] bg-red-600 rounded-full" />
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-zinc-900 tracking-tight leading-tight">
              {isArabic ? "صيانة معتمدة لجميع الماركات العالمية" : "Dealership-Grade Care For All Makes"}
            </h2>
            <p className="mt-3.5 text-zinc-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              {isArabic
                ? "نقدم خدمات الفحص الإلكتروني، الصيانة الدورية وتوضيب المحركات لجميع الماركات الألمانية واليابانية والأمريكية والأوروبية في الشارقة."
                : "From computerized ECU diagnostics to mechanical overhauls and AC repairs, our Sharjah workshop is equipped with specialized dealership scanners and genuine OEM components."}
            </p>
          </div>

          {/* Brand Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5 lg:gap-6">
            {brands.map((brand) => (
              <div
                key={brand.name}
                className="bg-white rounded-2xl aspect-[4/3] flex flex-col items-center justify-center p-4 md:p-6 border border-zinc-200/80 shadow-xs group transition-all duration-300 hover:scale-[1.04] hover:shadow-xl hover:border-red-500 cursor-pointer"
              >
                <div className="relative w-full h-14 sm:h-16 md:h-18 mb-3">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <span className="text-zinc-800 group-hover:text-red-600 transition-colors font-bold text-xs sm:text-[13px] md:text-sm text-center uppercase tracking-tight">
                  {brand.name}
                </span>
              </div>
            ))}
          </div>

          {/* Bottom Assistance Banner */}
          <div className="mt-14 sm:mt-16 bg-white border border-zinc-200/80 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="text-center md:text-start">
              <h3 className="text-lg sm:text-xl font-bold text-zinc-900">
                {isArabic ? "هل تمتلك سيارة من علامة أخرى؟" : "Don't See Your Vehicle Brand?"}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 mt-1">
                {isArabic
                  ? "فريقنا مجهز لصيانة كافة الموديلات الأوروبية والآسيوية والأمريكية. تواصل معنا مباشرة في الشارقة."
                  : "We service all international makes and models. Call or message our Sharjah master technicians directly."}
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <Link
                href="/booking"
                className="px-6 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md shadow-red-600/25"
              >
                {isArabic ? "احجز موعد صيانة" : "Book an Appointment"}
              </Link>
              <a
                href="tel:+971564406456"
                className="px-6 py-2.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-bold text-xs sm:text-sm transition-all border border-zinc-200"
                dir="ltr"
              >
                +971 56 440 6456
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
