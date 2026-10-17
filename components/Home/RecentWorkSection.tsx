"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

export default function RecentWorkSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const projects = [
    {
      title: "Mercedes-Benz E300",
      service: "Major Service & Brake System Overhaul",
      image: "/images/service-1.png",
      tag: "German Care",
    },
    {
      title: "Porsche Cayenne GTS",
      service: "Air Conditioning Compressor & Flush",
      image: "/images/service-2.png",
      tag: "AC Repair",
    },
    {
      title: "Nissan Patrol Platinum V8",
      service: "Full Suspension Arm & Bushing Renewal",
      image: "/images/service-3.png",
      tag: "Suspension",
    },
    {
      title: "BMW 530i M-Sport",
      service: "Computer Diagnostic & Sensor Calibration",
      image: "/images/service-4.png",
      tag: "Diagnostics",
    },
    {
      title: "Audi Q7 Quattro",
      service: "Engine Oil Flush & Multi-Point Inspection",
      image: "/images/service-5.png",
      tag: "Oil Service",
    },
    {
      title: "Toyota Land Cruiser VXR",
      service: "Brake Disc Skimming & Ceramic Pads",
      image: "/images/service-6.png",
      tag: "Brakes",
    },
    {
      title: "Range Rover Sport HSE",
      service: "Air Suspension Strut Replacement",
      image: "/images/service-7.png",
      tag: "Air Suspension",
    },
    {
      title: "Lexus LX570",
      service: "Dual Evaporator AC Deep Sanitization",
      image: "/images/service-8.png",
      tag: "Climate Control",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  // Visible projects slice for sliding
  const visibleProjects = [
    projects[currentIndex],
    projects[(currentIndex + 1) % projects.length],
    projects[(currentIndex + 2) % projects.length],
  ];

  return (
    <section className="bg-[#080808] py-24 relative overflow-hidden border-t border-zinc-900">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-start">
          {/* Left Column */}
          <div className="flex flex-col items-start lg:pr-8">
            <span className="text-red-600 text-xs font-bold uppercase tracking-[0.25em] mb-4">
              Sharjah Workshop Portfolio
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-[900] text-white leading-none uppercase tracking-tight mb-6">
              Our Recent Work
            </h2>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-8">
              We take pride in offering you the best services available and a 100% Satisfaction Guarantee. Inspect our latest vehicle restorations and services.
            </p>

            <Link
              href="/gallery"
              className="btn-primary text-white font-black text-xs px-8 py-4 uppercase tracking-widest rounded-xl mb-10 active:scale-95 transition-all shadow-xl shadow-red-600/30"
            >
              All Our Work
            </Link>

            {/* Navigation Buttons and Dots */}
            <div className="flex items-center gap-4">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full border border-zinc-800 bg-zinc-900 flex items-center justify-center text-white hover:bg-red-600 hover:border-red-600 transition-colors"
                aria-label="Previous Project"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full border border-zinc-800 bg-zinc-900 flex items-center justify-center text-white hover:bg-red-600 hover:border-red-600 transition-colors"
                aria-label="Next Project"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Dots */}
              <div className="flex items-center gap-2 ml-4">
                {projects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`h-2.5 rounded-full transition-all ${
                      i === currentIndex ? "w-8 bg-red-600" : "w-2.5 bg-zinc-700 hover:bg-zinc-500"
                    }`}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Project Cards Carousel */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {visibleProjects.map((p, idx) => (
                <div
                  key={`${p.title}-${idx}`}
                  className="bg-zinc-900/90 rounded-2xl overflow-hidden border border-zinc-800 flex flex-col group hover:border-red-600/40 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-64 w-full overflow-hidden bg-black">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 z-10 bg-red-600 text-white text-[10px] font-black px-3 py-1.5 rounded-md uppercase tracking-wider">
                      {p.tag}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow justify-between">
                    <div>
                      <h3 className="text-white font-bold text-lg mb-2 uppercase tracking-tight group-hover:text-red-500 transition-colors">
                        {p.title}
                      </h3>
                      <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                        {p.service}
                      </p>
                    </div>

                    <Link
                      href="/booking"
                      className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-500 hover:text-red-400 transition-colors"
                    >
                      <span>Book Similar Service</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
