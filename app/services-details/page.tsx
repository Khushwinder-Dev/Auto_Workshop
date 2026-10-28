"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  Clock,
  Shield,
  ArrowRight,
  ArrowLeft,
  Phone,
  Calendar,
} from "lucide-react";
import { WORKSHOP_INFO, getWorkshopServices, ServiceItem } from "@/data/workshopData";
import { useLanguage } from "@/context/LanguageContext";

function ServiceDetailsContent() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get("service");
  const { isArabic, t } = useLanguage();

  const services = getWorkshopServices(isArabic);

  const [selectedService, setSelectedService] = useState<ServiceItem>(services[0]);

  useEffect(() => {
    const currentList = getWorkshopServices(isArabic);
    if (serviceParam) {
      const found = currentList.find(
        (s) => s.id.toLowerCase() === serviceParam.toLowerCase()
      );
      if (found) {
        setSelectedService(found);
        return;
      }
    }
    // Update selected service with localized version
    const updated = currentList.find((s) => s.id === selectedService.id) || currentList[0];
    setSelectedService(updated);
  }, [serviceParam, isArabic]);

  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  return (
    <div className="bg-white">
      <section className="relative w-full h-[50vh] min-h-[380px] overflow-hidden flex flex-col justify-center items-center bg-black pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/services-hero.png"
            alt="Service Details Bab Al Bustan"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#120505]/75 backdrop-brightness-75" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
        </div>

        <div className="relative z-20 text-center px-6 max-w-3xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-[0.25em] mb-4">
            {t.serviceDetails.heroBadge}
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-black tracking-tight uppercase leading-tight text-white mb-3">
            {selectedService.title} <span className="text-red-500">{t.serviceDetails.heroSuffix}</span>
          </h1>
          <p className="max-w-xl mx-auto text-zinc-300 text-sm md:text-base font-normal leading-relaxed">
            {t.serviceDetails.heroSubtitle}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-zinc-50 border border-zinc-200/90 rounded-2xl p-6 shadow-sm">
              <h3 className="font-display font-black text-xl text-zinc-900 uppercase tracking-tight mb-4 pb-3 border-b border-zinc-200">
                {t.serviceDetails.allServicesTitle}
              </h3>
              <div className="space-y-2">
                {services.map((s) => {
                  const isActive = s.id === selectedService.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSelectedService(s)}
                      className={`w-full text-start px-4 py-3 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wide transition-all flex items-center justify-between cursor-pointer ${
                        isActive
                          ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                          : "bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-200/60"
                      }`}
                    >
                      <span>{s.title}</span>
                      <ArrowIcon className={`w-4 h-4 ${isActive ? "text-white" : "text-zinc-400"}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-[#0c0c0e] text-white rounded-2xl p-8 border border-zinc-800 shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <span className="text-red-500 text-[10px] font-black uppercase tracking-[0.25em] mb-2 block">
                  {t.serviceDetails.needFastTitle}
                </span>
                <h4 className="font-display font-black text-2xl uppercase tracking-tight mb-4">
                  {t.serviceDetails.needFastSubtitle}
                </h4>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6">
                  {t.serviceDetails.needFastDesc}
                </p>

                <div className="space-y-3 mb-6">
                  <a
                    href={`tel:${WORKSHOP_INFO.phones[0]}`}
                    className="flex items-center gap-3 text-sm text-white font-bold bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-colors"
                    dir="ltr"
                  >
                    <Phone className="w-4 h-4 text-red-500" />
                    <span>{WORKSHOP_INFO.phones[0]}</span>
                  </a>
                </div>

                <Link
                  href={`/booking?service=${selectedService.id}`}
                  className="w-full btn-primary text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{t.serviceDetails.bookThisServiceBtn}</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-8">
            <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden shadow-xl border border-zinc-200 bg-zinc-900">
              <Image
                src={selectedService.image}
                alt={selectedService.title}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className={`absolute bottom-6 ${isArabic ? "right-6" : "left-6"} z-10 bg-red-600 text-white font-black text-xs uppercase tracking-widest px-4 py-2 rounded-lg shadow-lg`}>
                {isArabic ? "مسار صيانة معتمد" : "Certified Service Bay"}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="font-display font-black text-2xl sm:text-4xl text-zinc-900 uppercase tracking-tight">
                {selectedService.title} - {t.serviceDetails.serviceOverviewTitle}
              </h2>
              <p className="text-zinc-600 text-base leading-relaxed">
                {selectedService.fullDesc}
              </p>
            </div>

            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-8">
              <h3 className="font-display font-black text-2xl text-zinc-900 uppercase tracking-tight mb-6">
                {t.serviceDetails.includedFeaturesTitle}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedService.features.map((feat) => (
                  <div key={feat} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-zinc-200/80 shadow-xs">
                    <CheckCircle2 className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-zinc-700 text-sm font-medium leading-snug">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="border border-zinc-200 rounded-2xl p-6 bg-white shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <span className="text-xs text-zinc-400 uppercase font-bold tracking-wider">
                    {t.serviceDetails.durationLabel}
                  </span>
                  <p className="text-lg font-black text-zinc-900 mt-0.5">
                    {selectedService.duration || (isArabic ? "45 - 60 دقيقة" : "45 - 60 Minutes")}
                  </p>
                </div>
              </div>

              <div className="border border-zinc-200 rounded-2xl p-6 bg-white shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <span className="text-xs text-zinc-400 uppercase font-bold tracking-wider">
                    {t.serviceDetails.warrantyLabel}
                  </span>
                  <p className="text-lg font-black text-zinc-900 mt-0.5">
                    {selectedService.warranty || (isArabic ? "ضمان مصنعية 100%" : "100% Guaranteed Workmanship")}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-bold text-zinc-900 text-lg">
                  {isArabic
                    ? `هل أنت جاهز لحجز خدمة ${selectedService.title}؟`
                    : `Ready to book ${selectedService.title}?`}
                </p>
                <p className="text-zinc-500 text-xs sm:text-sm">
                  {isArabic
                    ? "اختر التاريخ والوقت المفضل لديك في ورشتنا بالمنطقة الصناعية 5 بالشارقة."
                    : "Choose your preferred date and time at our Sharjah Industrial Area 5 shop."}
                </p>
              </div>

              <Link
                href={`/booking?service=${selectedService.id}`}
                className="btn-primary text-white font-black text-xs uppercase tracking-widest px-8 py-4 rounded-xl shadow-xl shadow-red-600/30 whitespace-nowrap cursor-pointer hover:scale-105"
              >
                {t.serviceDetails.bookThisServiceBtn}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServicesDetailsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white pt-32 text-center">Loading Service Details...</div>}>
      <ServiceDetailsContent />
    </Suspense>
  );
}
