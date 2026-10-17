"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Wrench, Sparkles, Cpu } from "lucide-react";

export default function LatestInsightsSection() {
  const router = useRouter();

  const featured = {
    date: "Mar 1, 2026",
    author: "Bab Al Bustan Auto Maintenance Workshop",
    title: "How Regular Oil Changes Keep Your Engine Running Longer and Smoother",
    image: "/images/service-5.png",
    badge: "WORKSHOP",
    icon: Wrench,
  };

  const sideArticles = [
    {
      date: "Feb 20, 2026",
      author: "Bab Al Bustan Auto Maintenance Workshop",
      title: "Top Signs Your Brake Pads Need Immediate Replacement",
      image: "/images/service-6.png",
      badge: "WORKSHOP",
      icon: Wrench,
    },
    {
      date: "Feb 10, 2026",
      author: "Bab Al Bustan Auto Maintenance Workshop",
      title: "Why Professional Interior Detailing Is Worth Every Dirham",
      image: "/images/service-7.png",
      badge: "DETAILING",
      icon: Sparkles,
    },
    {
      date: "Jan 28, 2026",
      author: "Bab Al Bustan Auto Maintenance Workshop",
      title: "Engine Diagnostics: Catch Problems Before They Become Costly",
      image: "/images/service-8.png",
      badge: "DIAGNOSTICS",
      icon: Cpu,
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-[900] text-zinc-900 leading-tight uppercase tracking-tight mb-4">
            Latest Insights
          </h2>
          <p className="text-zinc-500 text-sm md:text-base">
            We cover essential topics to help you keep your vehicle performing at its best
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
                <div className="absolute top-4 left-4 z-10 bg-brand text-white text-[10px] font-black px-3 py-1.5 rounded flex items-center gap-2 shadow-lg">
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
              View More
            </button>
          </div>
          <div className="border border-zinc-100 rounded-xl divide-y divide-zinc-100 h-full shadow-sm flex flex-col justify-between">
            {sideArticles.map((article, idx) => (
              <div
                key={idx}
                onClick={() => router.push("/blogs")}
                className="px-8 py-2 flex items-center gap-6 group hover:bg-zinc-50/50 transition-colors grow cursor-pointer"
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
                  <div className="absolute top-2 left-2 z-10 bg-brand text-white text-[8px] font-black px-2 py-1 rounded flex items-center gap-1.5 shadow-md">
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
