"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Zap, ShieldCheck, Tag, Users } from "lucide-react";

export default function FeatureSection() {
  const features = [
    {
      icon: <Zap className="w-5 h-5 text-red-500" />,
      title: "Express Service",
      desc: "Most services completed in under 60 minutes without sacrificing quality.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-red-500" />,
      title: "Quality Guarantee",
      desc: "100% satisfaction guarantee on all services. Not happy? We redo it free.",
    },
    {
      icon: <Tag className="w-5 h-5 text-red-500" />,
      title: "Transparent Pricing",
      desc: "No hidden charges. Get a full itemized quote before we begin any work.",
    },
    {
      icon: <Users className="w-5 h-5 text-red-500" />,
      title: "Certified Technicians",
      desc: "Our workshop team holds certifications and undergoes continuous manufacturer training.",
    },
  ];

  return (
    <section className="bg-[#050505] py-24 px-6 relative overflow-hidden border-t border-b border-white/5">
      <div className="max-w-[1350px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Side Image with rounded corner design */}
        <div className="relative h-[380px] md:h-[540px] w-full rounded-[36px] overflow-hidden border border-white/10 shadow-2xl group">
          <Image
            src="/images/service-5.png"
            alt="Mechanic at work in Bab Al Bustan"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          {/* Quick badge */}
          <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-black/70 backdrop-blur-md border border-white/15">
            <p className="text-white font-bold text-sm">
              Sharjah Industrial Area 5 Dedicated High-Tech Bays
            </p>
            <p className="text-xs text-zinc-400 mt-1">
              Equipped with hydraulic lifts, computerized scanners, and laser tire balancers.
            </p>
          </div>
        </div>

        {/* Right Side Content */}
        <div className="flex flex-col items-start lg:pl-6">
          <div className="inline-block px-3.5 py-1.5 rounded-full border border-red-900/50 bg-red-900/15 mb-6">
            <span className="text-red-500 text-[11px] font-black tracking-[0.25em] uppercase">
              Bab Al Bustan Auto Maintenance Workshop
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.05] mb-6 uppercase tracking-tight">
            We Go Beyond Just a <br className="hidden sm:inline" />
            <span className="text-red-500">Car Maintenance</span>
          </h2>

          <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-8 max-w-xl">
            At Bab Al Bustan Auto Maintenance Workshop, we blend speed with precision. Our certified technicians use cutting-edge diagnostic equipment to deliver results that exceed expectations — every single time.
          </p>

          <div className="space-y-5 w-full mb-10">
            {features.map((f) => (
              <div key={f.title} className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center transition-colors group-hover:border-red-600/60 group-hover:bg-red-950/20">
                  {f.icon}
                </div>
                <div>
                  <h3 className="text-white font-bold text-base mb-1 tracking-wide uppercase">
                    {f.title}
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-lg">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/about-us"
            className="btn-primary text-white font-black text-xs md:text-sm px-10 py-4 rounded-xl uppercase tracking-[0.15em] shadow-lg shadow-red-600/30 active:scale-95 transition-all"
          >
            Learn More About Us
          </Link>
        </div>
      </div>
    </section>
  );
}
