"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FourStepProcessSection() {
  const steps = [
    {
      num: "01",
      emoji: "🗓️",
      title: "Book Online",
      desc: "Choose your service and pick a convenient date and time from our booking form.",
    },
    {
      num: "02",
      emoji: "🚗",
      title: "Drop Your Car",
      desc: "Bring your car to our Sharjah Industrial Area 5 facility for an upfront inspection.",
    },
    {
      num: "03",
      emoji: "🔧",
      title: "Expert Service",
      desc: "Certified engineers complete all approved repairs with genuine parts & fluids.",
    },
    {
      num: "04",
      emoji: "✅",
      title: "Pick Up & Go",
      desc: "Inspect your car, pay conveniently, and drive away with our full service warranty.",
    },
  ];

  return (
    <section className="bg-[#0a0a0a] py-24 px-6 relative overflow-hidden border-t border-zinc-900">
      <div className="max-w-[1400px] mx-auto flex flex-col items-center">
        {/* Badge & Title */}
        <div className="inline-block px-5 py-1.5 rounded-full border border-red-900/40 bg-red-900/10 mb-6">
          <span className="text-red-600 text-xs font-black tracking-[0.25em] uppercase">
            How It Works
          </span>
        </div>

        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight uppercase tracking-tight mb-16 text-center">
          Simple 4-Step Process
        </h2>

        {/* 4 Process Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-20">
          {steps.map((step) => (
            <div
              key={step.num}
              className="bg-[#121214] border border-white/5 rounded-2xl p-8 flex flex-col items-center text-center shadow-2xl transition-all duration-300 hover:border-red-600/40 hover:-translate-y-2 group"
            >
              <span className="font-display text-4xl font-black text-red-900/40 group-hover:text-red-600/60 transition-colors mb-4 tracking-tighter">
                {step.num}
              </span>
              <div className="text-4xl mb-6 flex items-center justify-center h-12 transform group-hover:scale-125 transition-transform duration-300">
                {step.emoji}
              </div>
              <h3 className="text-white font-bold text-xl mb-3 tracking-wide uppercase group-hover:text-red-500 transition-colors">
                {step.title}
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-[220px]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Call to Action Banner with bottomcar.jpg */}
        <div className="relative w-full rounded-3xl overflow-hidden min-h-[380px] flex items-center justify-center p-8 sm:p-12 border border-white/10 shadow-2xl">
          <Image
            src="/images/bottomcar.jpg"
            alt="Auto Maintenance in Sharjah"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px]" />

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <span className="text-red-500 text-xs font-black tracking-[0.25em] uppercase mb-3 block">
              Ready to Service Your Vehicle?
            </span>
            <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-tight mb-6">
              Experience the Highest Standards of Automotive Care in Sharjah
            </h3>
            <p className="text-zinc-300 text-sm sm:text-base mb-8 max-w-xl mx-auto leading-relaxed">
              Book your appointment today or contact our service advisors for free diagnostics guidance and transparent repair estimates.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/booking"
                className="w-full sm:w-auto btn-primary px-10 py-4 rounded-full text-xs font-black tracking-widest uppercase shadow-2xl shadow-red-600/40 hover:scale-105 active:scale-95 transition-all"
              >
                Book Your Appointment Now
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 px-10 py-4 rounded-full text-xs font-bold tracking-widest uppercase transition-all hover:scale-105 active:scale-95"
              >
                Contact Us & Location
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
