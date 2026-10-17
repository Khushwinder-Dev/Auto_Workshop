import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, ShieldCheck, Wrench } from "lucide-react";
import { CAR_BRANDS } from "@/data/workshopData";

export const metadata: Metadata = {
  title: "Car Brands We Service in Sharjah | Bab Al Bustan Auto Workshop",
  description:
    "Expert servicing for Mercedes-Benz, BMW, Audi, Porsche, Range Rover, Toyota, Nissan, Ford, and all major car brands in Sharjah Industrial Area 5.",
};

export default function BrandsPage() {
  const categories = ["German & Luxury", "Japanese", "American", "Korean"] as const;

  return (
    <div className="bg-white">
      {/* Page Hero Banner */}
      <section className="relative w-full h-[55vh] min-h-[420px] overflow-hidden flex flex-col justify-center items-center bg-black pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/services-hero.png"
            alt="Brands We Service Bab Al Bustan"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#120505]/75 backdrop-brightness-75" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
        </div>

        <div className="relative z-20 text-center px-6 max-w-3xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-[0.25em] mb-4">
            Manufacturer-Grade Care
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-tight uppercase leading-tight text-white mb-4">
            Brands <span className="text-red-500">We Service</span>
          </h1>
          <p className="max-w-xl mx-auto text-zinc-300 text-sm md:text-base font-normal leading-relaxed">
            From German precision engineering to dependable Japanese engines and robust American SUVs, our workshop is calibrated for factory-level maintenance.
          </p>
        </div>
      </section>

      {/* Brands Categories Breakdown */}
      <div className="max-w-7xl mx-auto px-6 py-24 space-y-20">
        {categories.map((cat) => {
          const brandsInCat = CAR_BRANDS.filter((b) => b.category === cat);
          if (brandsInCat.length === 0) return null;

          return (
            <div key={cat}>
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-zinc-200">
                <div className="w-3 h-8 bg-red-600 rounded-sm" />
                <div>
                  <h2 className="font-display font-black text-2xl sm:text-3xl text-zinc-900 uppercase tracking-tight">
                    {cat} Vehicles
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-500">
                    OEM computer coding, specialized diagnostics, and genuine replacement parts.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {brandsInCat.map((brand) => (
                  <div
                    key={brand.name}
                    className="bg-zinc-50 rounded-2xl p-6 border border-zinc-200 hover:border-red-600/40 hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Logo Container */}
                      <div className="relative w-full h-24 mb-4 bg-white rounded-xl p-3 flex items-center justify-center border border-zinc-100 shadow-xs">
                        <Image
                          src={brand.logo}
                          alt={`${brand.name} repair in Sharjah`}
                          fill
                          className="object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>

                      <h3 className="font-display font-black text-xl text-zinc-900 uppercase tracking-tight mb-2 group-hover:text-red-600 transition-colors">
                        {brand.name}
                      </h3>

                      <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed mb-4">
                        {brand.specialty}
                      </p>
                    </div>

                    <Link
                      href={`/booking?brand=${encodeURIComponent(brand.name)}`}
                      className="inline-flex items-center justify-between text-xs font-bold uppercase tracking-wider text-red-600 hover:text-red-700 pt-3 border-t border-zinc-200 transition-colors"
                    >
                      <span>Book {brand.name} Service</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Assurance Bottom Banner */}
      <section className="bg-[#050505] py-20 px-6 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto text-center text-white">
          <span className="text-red-500 text-xs font-black uppercase tracking-[0.25em] mb-4 block">
            Don&#39;t See Your Car Listed?
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight mb-6">
            We Service All International Vehicle Makes
          </h2>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-8 max-w-xl mx-auto">
            Our diagnostic equipment supports over 80+ automotive brands worldwide. Contact us with your vehicle model and year for custom service packages.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="btn-primary text-white font-bold text-xs uppercase tracking-widest px-10 py-4 rounded-full shadow-2xl hover:scale-105 transition-transform"
            >
              Book an Inspection
            </Link>
            <Link
              href="/contact"
              className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-widest px-10 py-4 rounded-full border border-white/20 transition-all"
            >
              Contact Workshop
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
