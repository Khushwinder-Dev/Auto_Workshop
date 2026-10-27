"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Cpu,
  Droplets,
  ShieldCheck,
  Wrench,
  Disc,
  Fan,
  Car,
  Code,
} from "lucide-react";
import { WORKSHOP_SERVICES } from "@/data/workshopData";

export default function ServicesSection() {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    diagnostics: Cpu,
    "oil-change": Droplets,
    brakes: Disc,
    suspension: Car,
    battery: Wrench,
    "ac-repair": Fan,
    tires: ShieldCheck,
    "computer-programming": Code,
  };

  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-zinc-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* ============================================================
            SECTION HEADER (Matching Taj Al Rahmah Style)
            ============================================================ */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 mb-12 sm:mb-16">
          <div>
            {/* Eyebrow / Tag */}
            <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
              <span className="inline-block h-[2px] w-6 sm:w-8 bg-red-600 rounded-full" />
              <span className="text-xs sm:text-sm font-extrabold tracking-[0.16em] uppercase text-red-600">
                OUR SERVICES
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold text-zinc-900 tracking-tight leading-[1.14]">
              <span>Professional Car Care For</span>
              <br />
              <span className="text-red-600">Every Make &amp; Model</span>
            </h2>
          </div>

          {/* Right CTA Button */}
          <div className="flex-shrink-0">
            <Link
              href="/services"
              className="inline-flex items-center gap-3.5 bg-red-600 hover:bg-red-700 text-white pl-6 pr-2.5 py-2.5 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase shadow-[0_4px_16px_rgba(220,38,38,0.25)] hover:shadow-[0_6px_22px_rgba(220,38,38,0.35)] transition-all duration-300 group hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>VIEW ALL SERVICES</span>
              <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-red-600 group-hover:scale-105 transition-transform duration-300 shadow-sm">
                <ArrowRight className="w-4 h-4 text-red-600 group-hover:translate-x-0.5 transition-transform duration-300 stroke-[2.5]" />
              </span>
            </Link>
          </div>
        </div>

        {/* ============================================================
            SERVICES CARD GRID (Overlapping Floating Info Cards)
            ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-12 sm:gap-y-14 gap-x-6 lg:gap-x-7">
          {WORKSHOP_SERVICES.map((service, index) => {
            const IconComponent = iconMap[service.id] || Wrench;
            return (
              <Link
                key={service.id}
                href={`/services-details?service=${service.id}`}
                className="group flex flex-col cursor-pointer"
              >
                {/* Card Image Container */}
                <div className="relative w-full h-[220px] sm:h-[230px] rounded-3xl overflow-hidden shadow-[0_8px_25px_-10px_rgba(0,0,0,0.12)] bg-zinc-900">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                </div>

                {/* Overlapping Floating Info Card */}
                <div className="relative -mt-14 sm:-mt-16 mx-3 sm:mx-4 bg-white rounded-2xl p-5 sm:p-6 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.1)] border border-zinc-100 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_18px_38px_-8px_rgba(220,38,38,0.22)] group-hover:border-red-200">
                  {/* Header: Icon + Title */}
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-red-50 group-hover:bg-red-600 flex items-center justify-center transition-colors duration-300 shadow-xs">
                      <IconComponent className="w-5 h-5 text-red-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-base sm:text-[17px] font-bold text-zinc-900 leading-snug tracking-tight group-hover:text-red-600 transition-colors duration-300 line-clamp-1">
                      {service.title}
                    </h3>
                  </div>


                {/* Subtitle / Description */}
                <p className="text-xs sm:text-[13px] text-zinc-500 font-normal leading-relaxed min-h-[38px] line-clamp-2">
                  {service.shortDesc}
                </p>

                {/* CTA Link: Get Started */}
                <div className="mt-4 pt-2 border-t border-zinc-100 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-red-600 group-hover:text-red-700 transition-colors">
                    <span>Explore Service</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  {service.duration && (
                    <span className="text-[10px] font-bold text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded-full">
                      {service.duration}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
        </div>
      </div>
    </section>
  );
}
