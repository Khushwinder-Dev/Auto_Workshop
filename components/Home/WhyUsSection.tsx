"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Trophy } from "lucide-react";

export default function WhyUsSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Text Column */}
          <div className="flex flex-col items-start max-w-2xl">
            <span className="text-red-600 font-bold text-xs tracking-[0.2em] uppercase mb-4">
              Bab Al Bustan Auto Maintenance Workshop
            </span>

            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-zinc-900 leading-[1.05] mb-6 uppercase tracking-tight">
              Professional Car Maintenance in Sharjah
            </h2>

            <p className="text-zinc-600 text-sm md:text-base leading-relaxed mb-8">
              Bab Al Bustan Auto Maintenance Workshop is dedicated to keeping your vehicle running smoothly and efficiently. We offer a comprehensive range of automotive services — from mechanical repairs and computer diagnostics to complete brake and cooling solutions — using advanced equipment and skilled craftsmanship to ensure your car performs at its highest level.
            </p>

            {/* Trusted Expertise Highlight Box */}
            <div className="w-full bg-zinc-50 border border-zinc-200/80 rounded-2xl p-6 md:p-8 mb-8 flex items-start gap-5 shadow-sm">
              <div className="flex-shrink-0 bg-white shadow-sm p-3.5 rounded-xl border border-zinc-100">
                <Trophy className="w-7 h-7 text-amber-500" />
              </div>
              <div>
                <h3 className="font-bold text-zinc-900 text-lg mb-1 uppercase tracking-tight">
                  Trusted Expertise & Reliability
                </h3>
                <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed">
                  From routine scheduled maintenance to complex engine rebuilds and computer coding, we deliver transparent, guaranteed automotive care tailored to every vehicle.
                </p>
              </div>
            </div>

            <Link
              href="/services"
              className="btn-primary text-white font-bold text-xs md:text-sm px-10 py-4 rounded-xl uppercase tracking-widest shadow-lg shadow-red-600/30 active:scale-95 transition-all"
            >
              View All Services
            </Link>
          </div>

          {/* Right Dual-Image Column with Special Polygon Angle */}
          <div className="relative flex gap-5 h-[480px] sm:h-[560px] items-center">
            {/* Left Image: Normal rounded-2xl */}
            <div className="relative flex-1 h-full rounded-2xl overflow-hidden shadow-2xl border border-zinc-200">
              <Image
                src="/images/service-9.png"
                alt="Range Rover repair in Sharjah"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Right Image: Angled polygon clip path */}
            <div className="relative flex-1 h-full rounded-2xl overflow-hidden [clip-path:polygon(0%_0%,100%_0%,100%_75%,60%_100%,0%_100%)] shadow-2xl border border-zinc-200">
              <Image
                src="/images/service-10.png"
                alt="Car on lift in workshop"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
