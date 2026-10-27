"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, ArrowRight, Wrench, Award, Clock } from "lucide-react";

export default function WhyChooseUsSection() {
  const leftCards = [
    {
      number: "01",
      title: "Certified Master Mechanics",
      description:
        "Skilled professionals with 15+ years of hands-on dealership experience across German, Japanese, and American automobiles.",
    },
    {
      number: "03",
      title: "Dealership-Grade Diagnostics",
      description:
        "Cutting-edge computerized scanners and live sensor analyzers pinpoint ECU fault codes with 100% precision.",
    },
    {
      number: "05",
      title: "Express Bays & Quick Turnaround",
      description:
        "Fast-lane oil changes, computer code resets, and brake services completed in under 60 minutes in our express bays.",
    },
  ];

  const rightCards = [
    {
      number: "02",
      title: "100% Transparent Upfront Pricing",
      description:
        "Itemized quotes detailing parts and labor provided before turning a single wrench — absolutely zero hidden fees.",
    },
    {
      number: "04",
      title: "Genuine OEM & Certified Parts",
      description:
        "We only install manufacturer-approved OEM or certified components backed by full workshop warranty guarantees.",
    },
    {
      number: "06",
      title: "Dedicated Advisor & Aftercare",
      description:
        "Direct WhatsApp mechanic support, detailed vehicle health reports, and trusted after-service care in Sharjah.",
    },
  ];

  return (
    <section
      id="why-choose-us"
      className="relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto">
        {/* ============================================================
            SECTION HEADER
            ============================================================ */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 lg:mb-20">
          {/* Eyebrow / Tag */}
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <span className="inline-block h-[2px] w-6 sm:w-8 bg-red-600 rounded-full" />
            <span className="text-xs sm:text-sm font-extrabold tracking-[0.18em] uppercase text-red-600">
              WHY CHOOSE US
            </span>
            <span className="inline-block h-[2px] w-6 sm:w-8 bg-red-600 rounded-full" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold text-zinc-900 tracking-tight leading-[1.15]">
            <span>Precision, Quality &amp;</span>{" "}
            <span className="text-red-600">Commitment</span>
            <br />
            <span className="text-red-600">You Can Always Count On</span>
          </h2>
          <p className="mt-4 text-zinc-600 text-sm md:text-base max-w-xl mx-auto">
            From luxury sedans to heavy SUVs, we combine advanced technology with honest craftsmanship in Sharjah Industrial Area 5.
          </p>
        </div>

        {/* ============================================================
            MAIN 3-COLUMN LAYOUT
            ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-10 items-center">
          {/* ------------------------------------------------------------
              LEFT COLUMN: CARDS 01, 03, 05
              ------------------------------------------------------------ */}
          <div className="lg:col-span-4 flex flex-col gap-6 sm:gap-7 order-2 lg:order-1">
            {leftCards.map((card, idx) => (
              <div
                key={idx}
                className="group relative bg-zinc-50 hover:bg-white rounded-2xl p-6 border border-zinc-200/80 hover:border-red-600/40 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black text-red-600 tracking-wider bg-red-50 border border-red-200/60 px-2.5 py-1 rounded-full">
                    {card.number}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-zinc-300 group-hover:text-red-600 transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900 group-hover:text-red-600 transition-colors mb-2">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>

          {/* ------------------------------------------------------------
              CENTER COLUMN: FEATURE IMAGE & TRUST BADGE
              ------------------------------------------------------------ */}
          <div className="lg:col-span-4 relative order-1 lg:order-2 flex justify-center">
            <div className="relative w-full max-w-[360px] h-[440px] sm:h-[480px] lg:h-[520px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-zinc-900 group">
              <Image
                src="/images/service-10.png"
                alt="Bab Al Bustan Master Mechanic"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Floating Center Badge */}
              <div className="absolute bottom-6 inset-x-6 bg-black/85 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center shadow-xl">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-red-600 text-white mb-2 shadow-md shadow-red-600/40">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="text-white text-base font-extrabold uppercase tracking-tight">
                  15+ Years Excellence
                </h4>
                <p className="text-zinc-300 text-xs mt-0.5">
                  Over 5,000+ Vehicles Serviced in Sharjah
                </p>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------
              RIGHT COLUMN: CARDS 02, 04, 06
              ------------------------------------------------------------ */}
          <div className="lg:col-span-4 flex flex-col gap-6 sm:gap-7 order-3">
            {rightCards.map((card, idx) => (
              <div
                key={idx}
                className="group relative bg-zinc-50 hover:bg-white rounded-2xl p-6 border border-zinc-200/80 hover:border-red-600/40 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black text-red-600 tracking-wider bg-red-50 border border-red-200/60 px-2.5 py-1 rounded-full">
                    {card.number}
                  </span>
                  <ShieldCheck className="w-4 h-4 text-zinc-300 group-hover:text-red-600 transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900 group-hover:text-red-600 transition-colors mb-2">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-14 sm:mt-16 p-8 rounded-3xl bg-zinc-950 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-red-600/30 shadow-2xl">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-xl md:text-2xl font-bold font-display uppercase tracking-tight">
              Ready to experience dealership-quality car service?
            </h4>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Schedule your appointment online or visit our workshop in Sharjah Industrial Area 5 today.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/booking"
              className="px-6 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-red-600/30 inline-flex items-center gap-2 hover:scale-105"
            >
              <span>Book Appointment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider transition-all border border-zinc-700"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
