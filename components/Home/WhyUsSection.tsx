"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Trophy } from "lucide-react";

export default function WhyUsSection() {
  const router = useRouter();

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col items-start max-w-2xl">
            <span className="text-red-600 font-bold text-[11px] tracking-[0.15em] uppercase mb-6">
              Bab Al Bustan Auto Maintenance Workshop
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-black text-zinc-900 leading-[1.1] mb-8 uppercase tracking-tight">
              Professional Car Maintenance in Sharjah
            </h2>
            <p className="text-zinc-600 text-base leading-relaxed mb-10">
              Bab Al Bustan Auto Maintenance Workshop is dedicated to keeping your vehicle running smoothly and efficiently. We offer a comprehensive range of automotive services — from mechanical repairs and diagnostics to full detailing solutions — using advanced equipment and skilled craftsmanship to ensure your car performs at its best.
            </p>
            <div className="w-full bg-zinc-50 border border-zinc-100 rounded-xl p-8 mb-10 flex items-start gap-6">
              <div className="flex-shrink-0 bg-white shadow-sm p-3 rounded-lg">
                <Trophy className="w-8 h-8 text-amber-500" />
              </div>
              <div>
                <h4 className="font-bold text-zinc-900 text-lg mb-1">
                  Trusted Expertise
                </h4>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  From routine maintenance to major repairs, we provide seamless automotive solutions tailored to each vehicle.
                </p>
              </div>
            </div>
            <button
              onClick={() => router.push("/services")}
              className="bg-brand hover:bg-brand-dark text-white font-bold text-sm px-10 py-5 rounded-lg uppercase tracking-widest transition-all shadow-lg shadow-brand/20 active:scale-95 cursor-pointer"
            >
              View All Services
            </button>
          </div>
          <div className="relative flex gap-6 h-[600px] items-center">
            <div className="relative flex-1 h-full rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/service-9.png"
                alt="Range Rover in Sharjah"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative flex-1 h-full rounded-2xl overflow-hidden [clip-path:polygon(0%_0%,100%_0%,100%_75%,60%_100%,0%_100%)] shadow-xl">
              <Image
                src="/images/service-10.png"
                alt="Car on lift in workshop"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
