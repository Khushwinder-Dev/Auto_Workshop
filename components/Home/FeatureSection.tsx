"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Zap, ShieldCheck, Tag, UserCog } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function FeatureSection() {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <section className="bg-[#050505] py-20 px-6">
      <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative h-[300px] md:h-[500px] w-full rounded-[40px] overflow-hidden border border-white/5 shadow-2xl">
          <Image
            src="/images/service-5.png"
            alt="Mechanic at work"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col items-start lg:pl-10 rtl:lg:pl-0 rtl:lg:pr-10">
          <div className="inline-block px-3 py-1.5 rounded-full border border-red-900/40 bg-red-900/10 mb-8">
            <span className="text-red-600 text-[10px] font-black tracking-[0.2em] uppercase">
              {t.home.feature.tag}
            </span>
          </div>
          <h2 className="font-display text-2xl md:text-5xl font-bold text-white leading-tight mb-6 tracking-tight">
            {t.home.feature.titlePart1} <br /> {t.home.feature.titlePart2}
          </h2>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-6 max-w-3xl">
            {t.home.feature.description}
          </p>
          <div className="space-y-4 w-full mb-12">
            <div className="flex items-start gap-3 group">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-zinc-900/50 border border-zinc-800 flex items-center justify-center transition-colors group-hover:border-red-600/50">
                <Zap className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h4 className="text-white font-bold text-base mb-1 tracking-wide">
                  {t.home.feature.expressTitle}
                </h4>
                <p className="text-zinc-500 text-xs md:text-sm leading-snug max-w-lg">
                  {t.home.feature.expressDesc}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 group">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-zinc-900/50 border border-zinc-800 flex items-center justify-center transition-colors group-hover:border-red-600/50">
                <ShieldCheck className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h4 className="text-white font-bold text-base mb-1 tracking-wide">
                  {t.home.feature.qualityTitle}
                </h4>
                <p className="text-zinc-500 text-xs md:text-sm leading-snug max-w-lg">
                  {t.home.feature.qualityDesc}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 group">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-zinc-900/50 border border-zinc-800 flex items-center justify-center transition-colors group-hover:border-red-600/50">
                <Tag className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h4 className="text-white font-bold text-base mb-1 tracking-wide">
                  {t.home.feature.pricingTitle}
                </h4>
                <p className="text-zinc-500 text-xs md:text-sm leading-snug max-w-lg">
                  {t.home.feature.pricingDesc}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 group">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-zinc-900/50 border border-zinc-800 flex items-center justify-center transition-colors group-hover:border-red-600/50">
                <UserCog className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h4 className="text-white font-bold text-base mb-1 tracking-wide">
                  {t.home.feature.techsTitle}
                </h4>
                <p className="text-zinc-500 text-xs md:text-sm leading-snug max-w-lg">
                  {t.home.feature.techsDesc}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={() => router.push("/about-us")}
            className="bg-red-600 hover:bg-red-700 transition-all duration-300 text-white font-black text-xs md:text-sm px-10 py-5 rounded-lg uppercase tracking-[0.15em] shadow-lg shadow-red-600/20 active:scale-95 cursor-pointer"
          >
            {t.home.feature.learnMore}
          </button>
        </div>
      </div>
    </section>
  );
}
