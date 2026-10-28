"use client";

import React from "react";
import Image from "next/image";
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
  const { t } = useLanguage();

  return (
    <section className="bg-black py-24 px-6 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16 border-b border-zinc-800 pb-12">
          <div className="flex flex-col items-start">
            <h2 className="font-display text-4xl md:text-6xl font-[900] text-white leading-none uppercase tracking-tight">
              {t.home.partnership.title1} <br /> {t.home.partnership.title2}
            </h2>
          </div>
          <div className="max-w-xl">
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
              {t.home.partnership.desc}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="bg-white rounded-[24px] aspect-[4/3] flex flex-col items-center justify-center p-4 group transition-all duration-300 hover:scale-[1.05] hover:shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
            >
              <div className="relative w-full h-1/2 mb-3">
                <Image
                  src={brand.logo}
                  alt={`${brand.name} repair and service Sharjah Industrial Area`}
                  fill
                  className="object-contain transition-all duration-300 group-hover:scale-110"
                />
              </div>
              <span className="text-zinc-900 font-black text-[9px] md:text-[11px] text-center uppercase tracking-tighter">
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
