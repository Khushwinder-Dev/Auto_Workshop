"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CAR_BRANDS } from "@/data/workshopData";

export default function PartnershipSection() {
  return (
    <section className="bg-[#0c0c0e] py-24 px-6 border-t border-zinc-900">
      <div className="max-w-[1400px] mx-auto">
        {/* Header Row */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16 border-b border-zinc-800 pb-12">
          <div className="flex flex-col items-start">
            <span className="text-red-600 text-xs font-black uppercase tracking-[0.25em] mb-4">
              All Major Vehicle Makes
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-[900] text-white leading-none uppercase tracking-tight">
              Our <br /> Partnership
            </h2>
          </div>

          <div className="max-w-xl">
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-6">
              We work with the world&#39;s leading automotive brands to bring you certified service and genuine parts. Our workshop in Sharjah is equipped to handle luxury, German, Japanese, and American vehicles with factory-level precision.
            </p>
            <Link
              href="/brands"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-500 hover:text-red-400 transition-colors"
            >
              <span>Explore All Serviced Brands</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Brands Logo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
          {CAR_BRANDS.map((brand) => (
            <Link
              key={brand.name}
              href={`/booking?brand=${encodeURIComponent(brand.name)}`}
              className="bg-white rounded-2xl aspect-[4/3] flex flex-col items-center justify-center p-4 group transition-all duration-300 hover:scale-[1.05] hover:shadow-[0_15px_30px_rgba(220,38,38,0.15)] border border-transparent hover:border-red-500/30"
            >
              <div className="relative w-full h-1/2 mb-2">
                <Image
                  src={brand.logo}
                  alt={`${brand.name} repair and service Sharjah Industrial Area`}
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <span className="text-zinc-900 font-black text-[11px] sm:text-xs text-center uppercase tracking-tight group-hover:text-red-600 transition-colors">
                {brand.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
