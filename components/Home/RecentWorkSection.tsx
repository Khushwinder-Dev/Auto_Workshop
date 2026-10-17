"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

const slides = [
  { category: "PAINT PROTECTION", title: "Paint Protection Film", image: "/images/service-2.png" },
  { category: "AC SERVICE", title: "Full AC Service", image: "/images/service-3.png" },
  { category: "FULL SERVICE", title: "Complete Car Service", image: "/images/service-4.png" },
  { category: "ENGINE REPAIR", title: "Major Overhaul", image: "/images/service-2.png" },
  { category: "DETAILING", title: "Interior Deep Clean", image: "/images/service-3.png" },
  { category: "BRAKE SERVICE", title: "Performance Brakes", image: "/images/service-4.png" },
  { category: "ELECTRICAL", title: "Computer Diagnostics", image: "/images/service-2.png" },
  { category: "SUSPENSION", title: "Shock Absorbers", image: "/images/service-3.png" },
];

export default function RecentWorkSection() {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  return (
    <section className="bg-[#080808] py-24 relative">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-start">
          <div className="relative z-30 bg-[#080808] flex flex-col items-start lg:pr-10 lg:sticky lg:top-32">
            <h2 className="font-display text-4xl md:text-5xl font-[900] text-white leading-none uppercase tracking-tight mb-6">
              Our Recent Work
            </h2>
            <p className="text-zinc-500 text-sm md:text-base leading-relaxed mb-8 max-w-xs">
              We take pride in offering you the best services available and 100% Satisfaction Guarantee.
            </p>
            <button
              className="bg-red-600 hover:bg-red-700 transition-colors text-white font-black text-xs px-8 py-4 uppercase tracking-widest rounded-sm mb-12 active:scale-95 cursor-pointer"
              onClick={() => router.push("/gallery")}
            >
              All Our Work
            </button>
            <div className="flex items-center gap-3">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (swiperInstance) {
                      swiperInstance.slideTo(idx);
                      setActiveIndex(idx);
                    }
                  }}
                  className={`transition-all duration-300 rounded-full cursor-pointer hover:bg-red-400 ${
                    activeIndex === idx ? "w-10 h-3 bg-red-600" : "w-3 h-3 bg-zinc-800"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
          <div className="lg:col-span-3 w-full relative z-10 overflow-hidden">
            <Swiper
              onSwiper={setSwiperInstance}
              spaceBetween={24}
              slidesPerView={1}
              allowTouchMove={true}
              speed={800}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="mySwiper"
            >
              {slides.map((slide, idx) => (
                <SwiperSlide key={idx}>
                  <div className="group bg-[#111111] rounded-xl overflow-hidden border border-white/5 transition-all duration-300 hover:border-red-600/30 h-full">
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <span className="text-red-600 font-bold text-[10px] tracking-widest uppercase mb-2 block">
                        {slide.category}
                      </span>
                      <h4 className="text-white font-bold text-lg tracking-wide group-hover:text-red-50 transition-colors">
                        {slide.title}
                      </h4>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
