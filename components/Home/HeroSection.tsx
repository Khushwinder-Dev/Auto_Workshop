"use client";

import React from "react";
import Image from "next/image";

export default function HeroSection() {
  const stats = [
    { number: "5,000", suffix: "+", label: "Happy Clients" },
    { number: "15", suffix: "+", label: "Years Experience" },
    { number: "20", suffix: "+", label: "Services Offered" },
    { number: "98", suffix: "%", label: "Satisfaction Rate" },
  ];

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Background Hero Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/home-hero.png"
          alt="Workshop Hero"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Hero Headline Content */}
      <div className="relative z-20 text-center px-4 mb-20 max-w-[1000px]">
        <h1 className="font-display text-[clamp(3.2rem,7.5vw,6rem)] font-extrabold text-white leading-[1.05] tracking-[-0.01em] uppercase mb-[1.25rem] drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]">
          Bab Al Bustan Auto Maintenance Workshop
        </h1>
        <h3 className="text-white text-xl md:text-2xl font-bold tracking-wider opacity-90 drop-shadow-lg">
          Trusted Car Maintenance in Sharjah
        </h3>
      </div>

      {/* Glassmorphism Stats Bar */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-full max-w-[1200px] px-6 z-30">
        <div className="hero-stats-glass rounded-xl md:rounded-2xl grid grid-cols-2 lg:grid-cols-4 overflow-hidden border border-white/10">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center py-8 md:py-10 border-white/10 lg:[&:not(:last-child)]:border-r max-lg:[&:nth-child(odd)]:border-r max-lg:[&:nth-child(-n+2)]:border-b"
            >
              <div className="flex items-baseline">
                <span className="font-display text-4xl md:text-5xl font-black text-white">
                  {stat.number}
                </span>
                <span className="font-display text-2xl md:text-3xl font-black text-brand ml-1">
                  {stat.suffix}
                </span>
              </div>
              <p className="mt-1 text-[10px] md:text-xs font-bold text-zinc-300 uppercase tracking-widest text-center">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Down Cue */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
        <span className="text-[10px] font-bold text-white uppercase tracking-[0.4em]">
          Scroll Down
        </span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-brand to-transparent" />
      </div>
    </section>
  );
}
