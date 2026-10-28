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
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-[1350px] mx-auto px-6">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-2 text-red-600 font-bold text-[11px] uppercase tracking-[0.2em] mb-4">
            {t.home.workProcess.eyebrow}
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-[900] text-zinc-900 leading-tight uppercase tracking-tight">
            {t.home.workProcess.title}
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-16 items-center">
          {/* Left Column (Steps 1, 2, 3) */}
          <div className="flex flex-col gap-12 lg:order-1">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center">
                <ClipboardList className="w-5 h-5 text-red-600" />
              </div>
              <div className="pt-1">
                <h4 className="text-zinc-900 font-bold text-xl mb-1.5">{t.home.workProcess.step1Title}</h4>
                <p className="text-zinc-500 text-sm leading-relaxed max-w-[260px]">
                  {t.home.workProcess.step1Desc}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center">
                <Receipt className="w-5 h-5 text-red-600" />
              </div>
              <div className="pt-1">
                <h4 className="text-zinc-900 font-bold text-xl mb-1.5">{t.home.workProcess.step2Title}</h4>
                <p className="text-zinc-500 text-sm leading-relaxed max-w-[260px]">
                  {t.home.workProcess.step2Desc}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center">
                <CalendarDays className="w-5 h-5 text-red-600" />
              </div>
              <div className="pt-1">
                <h4 className="text-zinc-900 font-bold text-xl mb-1.5">{t.home.workProcess.step3Title}</h4>
                <p className="text-zinc-500 text-sm leading-relaxed max-w-[260px]">
                  {t.home.workProcess.step3Desc}
                </p>
              </div>
            </div>
          </div>

          {/* Center Image */}
          <div className="lg:order-2 flex justify-center">
            <div className="relative w-full max-w-[420px] h-[580px] rounded-3xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border border-zinc-100">
              <Image
                src="/images/ims_b_2.jpg"
                alt="Mechanic working under car"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Column (Steps 4, 5, 6) */}
          <div className="flex flex-col gap-12 lg:order-3">
            <div className={`flex items-start gap-6 flex-row ${isArabic ? "lg:flex-row lg:text-start" : "lg:flex-row-reverse lg:text-right"}`}>
              <div className="flex-shrink-0 w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-red-600" />
              </div>
              <div className="pt-1">
                <h4 className="text-zinc-900 font-bold text-xl mb-1.5">{t.home.workProcess.step4Title}</h4>
                <p className={`text-zinc-500 text-sm leading-relaxed max-w-[260px] ${isArabic ? "lg:mr-auto" : "lg:ml-auto"}`}>
                  {t.home.workProcess.step4Desc}
                </p>
              </div>
            </div>
            <div className={`flex items-start gap-6 flex-row ${isArabic ? "lg:flex-row lg:text-start" : "lg:flex-row-reverse lg:text-right"}`}>
              <div className="flex-shrink-0 w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-red-600" />
              </div>
              <div className="pt-1">
                <h4 className="text-zinc-900 font-bold text-xl mb-1.5">{t.home.workProcess.step5Title}</h4>
                <p className={`text-zinc-500 text-sm leading-relaxed max-w-[260px] ${isArabic ? "lg:mr-auto" : "lg:ml-auto"}`}>
                  {t.home.workProcess.step5Desc}
                </p>
              </div>
            </div>
            <div className={`flex items-start gap-6 flex-row ${isArabic ? "lg:flex-row lg:text-start" : "lg:flex-row-reverse lg:text-right"}`}>
              <div className="flex-shrink-0 w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-red-600" />
              </div>
              <div className="pt-1">
                <h4 className="text-zinc-900 font-bold text-xl mb-1.5">{t.home.workProcess.step6Title}</h4>
                <p className={`text-zinc-500 text-sm leading-relaxed max-w-[260px] ${isArabic ? "lg:mr-auto" : "lg:ml-auto"}`}>
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
