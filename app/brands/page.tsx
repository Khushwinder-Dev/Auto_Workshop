"use client";

import React from "react";
import Image from "next/image";

const brands = [
  { name: "Mercedes-Benz", logo: "/images/brands/Mercedes-Logo.png" },
  { name: "BMW", logo: "/images/brands/bimw.png" },
  { name: "Volkswagen", logo: "/images/brands/Volkswagen-Logo.png" },
  { name: "Land Rover", logo: "/images/brands/Land-Rover-Logo.jpg" },
  { name: "Chevrolet", logo: "/images/brands/Chevrolet-Logo.jpg" },
  { name: "Audi", logo: "/images/brands/Audi-Logo.jpg" },
  { name: "Kia", logo: "/images/brands/Kia-Logo.jpg" },
  { name: "Porsche", logo: "/images/brands/Porsche-Logo.jpg" },
  { name: "Ford", logo: "/images/brands/Ford-Logo.jpg" },
  { name: "Nissan", logo: "/images/brands/Nissan-Logo.jpg" },
  { name: "Toyota", logo: "/images/brands/Toyota-Logo.jpg" },
  { name: "Honda", logo: "/images/brands/Honda-logo.jpg" },
  { name: "Mitsubishi", logo: "/images/brands/Mitsubishi.jpg" },
  { name: "Lexus", logo: "/images/brands/Lexus.jpg" },
  { name: "Suzuki", logo: "/images/brands/Suzuki.jpg" },
  { name: "Infiniti", logo: "/images/brands/Infiniti.png" },
  { name: "UD", logo: "/images/brands/ud.png" },
  { name: "Jeep", logo: "/images/brands/jeep.png" },
];

export default function BrandsPage() {
  return (
    <main>
      <div className="bg-black min-h-screen">
        {/* Hero Section */}
        <section className="relative w-full h-[60vh] min-h-[450px] overflow-hidden flex flex-col bg-black">
          <div className="absolute inset-0 z-0">
            <Image
              alt="Workshop Hero"
              fill
              className="object-cover"
              src="/images/services-hero.png"
              priority
            />
            <div className="absolute inset-0 bg-[#1a0a05]/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
          </div>
          <div className="relative z-20 flex-grow flex flex-col items-center justify-center text-center px-6 mt-10">
            <div data-aos="zoom-out" data-aos-delay="200" className="mb-4">
              <h1 className="text-3xl md:text-[50px] font-display font-bold tracking-[-0.04em] leading-[0.9] flex items-center justify-center gap-4 max-w-[800px]">
                <span className="text-white">Brands</span>
                <span className="text-[#e11d23]">We Service</span>
              </h1>
            </div>
            <p
              data-aos="fade-up"
              data-aos-delay="400"
              className="max-w-xl text-gray-400 text-xs md:text-sm font-medium tracking-wide opacity-80"
            >
              A look at the quality work we deliver — every car, every time.
            </p>
          </div>
        </section>

        {/* Brands Grid */}
        <section className="py-16 px-6 md:px-12">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 lg:gap-5">
              {brands.map((brand) => (
                <div
                  key={brand.name}
                  className="bg-white rounded-[20px] aspect-[4/3] flex flex-col items-center justify-center p-4 md:p-8 group transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_10px_30px_rgba(255,255,255,0.1)]"
                >
                  <div className="relative w-full h-16 md:h-20 mb-4">
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      fill
                      className="object-contain transition-all duration-300 group-hover:brightness-110"
                    />
                  </div>
                  <span className="text-zinc-800 font-bold text-[11px] md:text-sm text-center uppercase tracking-tight">
                    {brand.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
