"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Wrench, Sparkles, Cpu } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function LatestInsightsSection() {
  const router = useRouter();
  const { isArabic, t } = useLanguage();

  const featured = {
    date: isArabic ? "١ مارس ٢٠٢٦" : "Mar 1, 2026",
    author: isArabic ? "ورشة باب البستان لصيانة السيارات" : "Bab Al Bustan Auto Maintenance Workshop",
    title: t.home.latestInsights.featuredTitle,
    image: "/images/service-5.png",
    badge: t.home.latestInsights.badgeWorkshop,
    icon: Wrench,
  };

  const sideArticles = [
    {
      date: isArabic ? "٢٠ فبراير ٢٠٢٦" : "Feb 20, 2026",
      author: isArabic ? "ورشة باب البستان" : "Bab Al Bustan Auto Workshop",
      title: t.home.latestInsights.art1Title,
      image: "/images/service-6.png",
      badge: t.home.latestInsights.badgeWorkshop,
      icon: Wrench,
    },
    {
      date: isArabic ? "١٠ فبراير ٢٠٢٦" : "Feb 10, 2026",
      author: isArabic ? "ورشة باب البستان" : "Bab Al Bustan Auto Workshop",
      title: t.home.latestInsights.art2Title,
      image: "/images/service-7.png",
      badge: t.home.latestInsights.badgeDetailing,
      icon: Sparkles,
    },
    {
      date: isArabic ? "٢٨ يناير ٢٠٢٦" : "Jan 28, 2026",
      author: isArabic ? "ورشة باب البستان" : "Bab Al Bustan Auto Workshop",
      title: t.home.latestInsights.art3Title,
      image: "/images/service-8.png",
      badge: t.home.latestInsights.badgeDiagnostics,
      icon: Cpu,
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-[900] text-zinc-900 leading-tight uppercase tracking-tight mb-4">
            {t.home.latestInsights.title}
          </h2>
          <p className="text-zinc-500 text-sm md:text-base">
            {t.home.latestInsights.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <div className="border border-zinc-100 rounded-xl overflow-hidden flex flex-col h-full shadow-sm">
            <div className="p-8">
              <div className="flex items-center gap-2 text-zinc-400 text-xs font-bold mb-4">
                <span>{featured.date}</span>
                <span className="w-1 h-1 bg-zinc-200 rounded-full" />
                <span>{featured.author}</span>
              </div>
              <h3 className="text-zinc-900 font-bold text-2xl md:text-3xl leading-tight mb-8">
                {featured.title}
              </h3>
              <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden">
                <div className={`absolute top-4 ${isArabic ? "right-4" : "left-4"} z-10 bg-brand text-white text-[10px] font-black px-3 py-1.5 rounded flex items-center gap-2 shadow-lg`}>
                  <featured.icon className="w-3 h-3" />
                  {featured.badge}
                </div>
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
            <button
              onClick={() => router.push("/blogs")}
              className="mt-auto w-full bg-brand hover:bg-brand-dark text-white font-black text-sm py-5 uppercase tracking-widest transition-all cursor-pointer"
            >
              {t.home.latestInsights.viewMore}
            </button>
          </div>
          <div className="border border-zinc-100 rounded-xl divide-y divide-zinc-100 h-full shadow-sm flex flex-col justify-between">
            {sideArticles.map((article, idx) => (
              <div
                key={idx}
                onClick={() => router.push("/blogs")}
                className="px-8 py-4 flex items-center gap-6 group hover:bg-zinc-50/50 transition-colors grow cursor-pointer"
              >
                <div className="grow">
                  <div className="flex items-center gap-2 text-zinc-400 text-[11px] font-bold mb-2">
                    <span>{article.date}</span>
                    <span className="w-1 h-1 bg-zinc-200 rounded-full" />
                    <span>{article.author}</span>
                  </div>
                  <h4 className="text-zinc-900 font-bold text-lg leading-snug group-hover:text-brand transition-colors">
                    {article.title}
                  </h4>
                </div>
                <div className="relative w-40 h-28 flex-shrink-0 rounded-lg overflow-hidden border border-zinc-100">
                  <div className={`absolute top-2 ${isArabic ? "right-2" : "left-2"} z-10 bg-brand text-white text-[8px] font-black px-2 py-1 rounded flex items-center gap-1.5 shadow-md`}>
                    <article.icon className="w-2.5 h-2.5" />
                    {article.badge}
                  </div>
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
