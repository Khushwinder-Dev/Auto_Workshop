"use client";

import React from "react";
import Link from "next/link";
import { Home, Wrench } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-6 py-24 text-center bg-zinc-50 pt-32">
      <div className="w-20 h-20 bg-red-50 text-red-600 rounded-3xl flex items-center justify-center mb-6 shadow-sm border border-red-100">
        <Wrench className="w-10 h-10" />
      </div>

      <span className="text-red-600 text-xs font-black uppercase tracking-[0.25em] mb-2">
        {t.notFound.code}
      </span>

      <h1 className="text-4xl sm:text-5xl font-display font-black text-zinc-900 uppercase tracking-tight mb-4">
        {t.notFound.title}
      </h1>

      <p className="text-zinc-500 text-sm sm:text-base max-w-md mx-auto mb-8 leading-relaxed">
        {t.notFound.desc}
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Link
          href="/"
          className="btn-primary text-white font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded-full shadow-lg shadow-red-600/30 flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
          <span>{t.notFound.backHome}</span>
        </Link>
        <Link
          href="/services"
          className="bg-white hover:bg-zinc-100 text-zinc-800 border border-zinc-200 font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded-full transition-colors flex items-center gap-2"
        >
          <Wrench className="w-4 h-4 text-red-600" />
          <span>{t.notFound.ourServices}</span>
        </Link>
      </div>
    </div>
  );
}
