"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  vehicle: string;
  rating: number;
  date: string;
  comment: string;
  avatar: string;
}

const TESTIMONIALS_DATA: Testimonial[] = [
  {
    name: "Tariq Al Mansoori",
    role: "Verified Customer, Sharjah",
    vehicle: "Mercedes-Benz E300 AMG",
    rating: 5,
    date: "October 2024",
    comment:
      "Bab Al Bustan solved a recurring transmission hesitation and check engine light that two other garages couldn't diagnose properly. Their master tech hooked up Star diagnostic scanner, pinpointed a faulty speed sensor, and completed the repair the same afternoon. Extremely professional and honest team!",
    avatar: "/images/service-10.png",
  },
  {
    name: "Rashid Al Nuaimi",
    role: "Verified Customer, Ajman",
    vehicle: "Nissan Patrol V8 Titanium",
    rating: 5,
    date: "September 2024",
    comment:
      "Summer in Sharjah without strong AC is impossible. My Patrol's cooling had completely collapsed. The team did a pressure vacuum test, replaced the leaking evaporator core, and charged fresh refrigerant. The air conditioning is blowing ice cold even in midday traffic. Best garage in Industrial Area 5!",
    avatar: "/images/service-9.png",
  },
  {
    name: "David Miller",
    role: "Business Executive, Dubai",
    vehicle: "BMW 530i M-Sport",
    rating: 5,
    date: "August 2024",
    comment:
      "What impressed me most was their 100% upfront transparency. They provided a written estimate before touching anything. Replaced front brake pads with OEM ceramic pads and skimmed the rotors on-car. High-speed brake judder is completely gone. Will be returning for all periodic servicing.",
    avatar: "/images/service-8.png",
  },
  {
    name: "Fatima Al Shehhi",
    role: "Verified Customer, Sharjah",
    vehicle: "Toyota Land Cruiser VXR",
    rating: 5,
    date: "July 2024",
    comment:
      "I brought my car in for an express fully synthetic oil change and 25-point inspection. Completed in 35 minutes while I waited in the air-conditioned reception. Staff is respectful, friendly, and they treat your car with genuine care. Highly recommend to everyone in Sharjah!",
    avatar: "/images/service-7.png",
  },
];

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS_DATA.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS_DATA[currentIndex];

  return (
    <section className="py-20 lg:py-24 bg-zinc-950 text-white relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center justify-center gap-2.5 mb-3">
            <span className="inline-block h-[2px] w-6 sm:w-8 bg-red-600 rounded-full" />
            <span className="text-xs sm:text-sm font-extrabold tracking-[0.18em] uppercase text-red-500">
              CLIENT TESTIMONIALS
            </span>
            <span className="inline-block h-[2px] w-6 sm:w-8 bg-red-600 rounded-full" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
            <span>Trusted By Drivers Across</span>{" "}
            <span className="text-red-600">Sharjah &amp; The UAE</span>
          </h2>
          <p className="mt-3 text-zinc-400 text-sm md:text-base">
            Read real feedback from vehicle owners who rely on Bab Al Bustan for dependable maintenance.
          </p>

          {/* Overall Rating Badge */}
          <div className="mt-6 inline-flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-full px-5 py-2">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <span className="text-xs font-bold text-zinc-200">
              4.9 / 5.0 Rating from 450+ Happy Car Owners
            </span>
          </div>
        </div>

        {/* Featured Testimonial Card */}
        <div className="max-w-4xl mx-auto bg-zinc-900/90 rounded-3xl border border-zinc-800 p-8 sm:p-12 shadow-2xl relative">
          <Quote className="w-14 h-14 text-red-600/20 absolute top-6 right-6 pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-red-600/50 shadow-md shrink-0 bg-black">
              <Image
                src={current.avatar}
                alt={current.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="text-center sm:text-left flex-1">
              <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-400 mb-1.5">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                {current.name}
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                {current.role} • {current.date}
              </p>
              <div className="mt-2 inline-flex items-center gap-1.5 bg-red-950/60 border border-red-800/60 text-red-400 text-xs font-bold px-3 py-1 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Vehicle: {current.vehicle}</span>
              </div>
            </div>
          </div>

          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed italic mb-8 font-serif">
            "{current.comment}"
          </p>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-zinc-800">
            <div className="flex items-center gap-2">
              {TESTIMONIALS_DATA.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx ? "w-8 bg-red-600" : "w-2 bg-zinc-700 hover:bg-zinc-600"
                  }`}
                  aria-label={`Go to review ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-red-600 text-zinc-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-zinc-700"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-red-600 text-zinc-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-zinc-700"
                aria-label="Next review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
