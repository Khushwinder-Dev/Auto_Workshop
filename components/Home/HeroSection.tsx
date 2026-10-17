"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, Wrench, ShieldCheck, Clock, Award } from "lucide-react";

export default function HeroSection() {
  const stats = [
    { number: "5,000", suffix: "+", label: "Happy Clients" },
    { number: "15", suffix: "+", label: "Years Experience" },
    { number: "20", suffix: "+", label: "Services Offered" },
    { number: "98", suffix: "%", label: "Satisfaction Rate" },
  ];

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black pt-20 pb-16">
      {/* Background Hero Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/home-hero.png"
          alt="Bab Al Bustan Workshop Hero"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-brightness-75" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
      </div>

      {/* Hero Headline Content */}
      <div className="relative z-20 text-center px-4 max-w-[1100px] mx-auto mt-12 mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-[0.2em] mb-6 animate-pulse">
          <Wrench className="w-3.5 h-3.5 text-red-500" />
          <span>Premier Auto Care in Sharjah Industrial Area 5</span>
        </div>

        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.05] tracking-tight uppercase mb-6 drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
          Bab Al Bustan <br className="hidden sm:inline" />
          <span className="text-red-500">Auto Maintenance</span> Workshop
        </h1>

        <h2 className="text-white text-lg sm:text-xl md:text-2xl font-bold tracking-wider opacity-90 drop-shadow-lg max-w-2xl mx-auto mb-8">
          Trusted Car Maintenance, Computer Diagnostics & Engine Repair in Sharjah
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/booking"
            className="w-full sm:w-auto btn-primary px-10 py-4 rounded-full text-sm font-black tracking-widest uppercase shadow-2xl shadow-red-600/40 hover:scale-105 active:scale-95 transition-all"
          >
            Book Appointment
          </Link>
          <Link
            href="/services"
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md px-10 py-4 rounded-full text-sm font-bold tracking-widest uppercase transition-all hover:scale-105 active:scale-95"
          >
            Explore Services
          </Link>
        </div>
      </div>

      {/* Glassmorphism Stats Bar */}
      <div className="relative z-30 w-full max-w-[1200px] px-6 mt-auto">
        <div className="hero-stats-glass rounded-2xl grid grid-cols-2 lg:grid-cols-4 overflow-hidden border border-white/15 shadow-2xl backdrop-blur-xl">
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center justify-center py-7 md:py-9 border-white/10 ${
                idx !== stats.length - 1 ? "lg:border-r" : ""
              } ${idx % 2 === 0 ? "max-lg:border-r" : ""} ${idx < 2 ? "max-lg:border-b" : ""}`}
            >
              <div className="flex items-baseline">
                <span className="font-display text-4xl md:text-5xl font-black text-white">
                  {stat.number}
                </span>
                <span className="font-display text-2xl md:text-3xl font-black text-red-500 ml-1">
                  {stat.suffix}
                </span>
              </div>
              <p className="mt-1 text-[11px] md:text-xs font-bold text-zinc-300 uppercase tracking-widest text-center">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Down Cue */}
      <div className="relative z-30 mt-6 flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
        <span className="text-[10px] font-bold text-white uppercase tracking-[0.4em]">Scroll Down</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-red-500 to-transparent animate-bounce" />
      </div>
    </section>
  );
}
