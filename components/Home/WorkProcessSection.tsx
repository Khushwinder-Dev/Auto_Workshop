"use client";

import React from "react";
import Image from "next/image";
import {
  ClipboardList,
  Receipt,
  CalendarDays,
  UserCheck,
  MapPin,
  CreditCard,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function WorkProcessSection() {
  const { isArabic, t } = useLanguage();

  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-5xl lg:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <div className="flex items-center justify-center gap-2 text-red-600 font-bold text-[11px] uppercase tracking-[0.2em] mb-4">
            {t.home.workProcess.eyebrow}
          </div>
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-[900] text-zinc-900 leading-tight uppercase tracking-tight">
            {t.home.workProcess.title}
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 xl:gap-8 items-center">
          {/* Left Column (Steps 1, 2, 3) */}
          <div className="flex flex-col gap-8 sm:gap-10 lg:gap-12 lg:order-1 lg:items-end">
            <div className="flex items-start gap-4 sm:gap-5 w-full max-w-[340px]">
              <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-red-50 rounded-xl flex items-center justify-center">
                <ClipboardList className="w-5 h-5 text-red-600" />
              </div>
              <div className="pt-0.5 sm:pt-1">
                <h4 className="text-zinc-900 font-bold text-lg sm:text-xl mb-1">{t.home.workProcess.step1Title}</h4>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {t.home.workProcess.step1Desc}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 sm:gap-5 w-full max-w-[340px]">
              <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-red-50 rounded-xl flex items-center justify-center">
                <Receipt className="w-5 h-5 text-red-600" />
              </div>
              <div className="pt-0.5 sm:pt-1">
                <h4 className="text-zinc-900 font-bold text-lg sm:text-xl mb-1">{t.home.workProcess.step2Title}</h4>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {t.home.workProcess.step2Desc}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 sm:gap-5 w-full max-w-[340px]">
              <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-red-50 rounded-xl flex items-center justify-center">
                <CalendarDays className="w-5 h-5 text-red-600" />
              </div>
              <div className="pt-0.5 sm:pt-1">
                <h4 className="text-zinc-900 font-bold text-lg sm:text-xl mb-1">{t.home.workProcess.step3Title}</h4>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {t.home.workProcess.step3Desc}
                </p>
              </div>
            </div>
          </div>

          {/* Center Image */}
          <div className="lg:order-2 flex justify-center">
            <div className="relative w-full max-w-[360px] sm:max-w-[400px] h-[340px] sm:h-[440px] lg:h-[560px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] border border-zinc-100">
              <Image
                src="/images/ims_b_2.jpg"
                alt="Mechanic working under car"
                fill
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Column (Steps 4, 5, 6) */}
          <div className="flex flex-col gap-8 sm:gap-10 lg:gap-12 lg:order-3 lg:items-start">
            <div className={`flex items-start gap-4 sm:gap-5 w-full max-w-[340px] flex-row ${isArabic ? "lg:flex-row lg:text-start" : "lg:flex-row-reverse lg:text-right"}`}>
              <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-red-50 rounded-xl flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-red-600" />
              </div>
              <div className="pt-0.5 sm:pt-1">
                <h4 className="text-zinc-900 font-bold text-lg sm:text-xl mb-1">{t.home.workProcess.step4Title}</h4>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {t.home.workProcess.step4Desc}
                </p>
              </div>
            </div>
            <div className={`flex items-start gap-4 sm:gap-5 w-full max-w-[340px] flex-row ${isArabic ? "lg:flex-row lg:text-start" : "lg:flex-row-reverse lg:text-right"}`}>
              <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-red-50 rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-red-600" />
              </div>
              <div className="pt-0.5 sm:pt-1">
                <h4 className="text-zinc-900 font-bold text-lg sm:text-xl mb-1">{t.home.workProcess.step5Title}</h4>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {t.home.workProcess.step5Desc}
                </p>
              </div>
            </div>
            <div className={`flex items-start gap-4 sm:gap-5 w-full max-w-[340px] flex-row ${isArabic ? "lg:flex-row lg:text-start" : "lg:flex-row-reverse lg:text-right"}`}>
              <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-red-50 rounded-xl flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-red-600" />
              </div>
              <div className="pt-0.5 sm:pt-1">
                <h4 className="text-zinc-900 font-bold text-lg sm:text-xl mb-1">{t.home.workProcess.step6Title}</h4>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {t.home.workProcess.step6Desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
