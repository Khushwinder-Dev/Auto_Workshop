"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, RotateCcw, Wrench } from "lucide-react";

interface ErrorPageContentProps {
  title?: string;
  subtitle?: string;
  reset?: () => void;
  isRuntimeError?: boolean;
}

export default function ErrorPageContent({
  title,
  subtitle,
  reset,
  isRuntimeError = false,
}: ErrorPageContentProps) {
  const displayTitle =
    title || (isRuntimeError ? "Something Went Wrong" : "Page Not Found");

  const displaySubtitle =
    subtitle ||
    (isRuntimeError
      ? "An unexpected error occurred while loading this page. You can try refreshing or return to the workshop home page."
      : "The page you are looking for doesn't exist or has been moved. Explore our automotive services or get in touch with our Sharjah workshop.");

  return (
    <div className="w-full min-h-[70vh] bg-slate-900 text-white flex flex-col items-center justify-center py-20 px-4">
      <div className="max-w-2xl mx-auto flex flex-col items-center text-center">
        {/* Icon Badge */}
        <div className="w-20 h-20 rounded-2xl bg-red-600/20 border border-red-500/30 flex items-center justify-center mb-6 text-red-500 shadow-xl shadow-red-950/40">
          <Wrench className="w-10 h-10 animate-pulse" />
        </div>

        {/* Big Code */}
        <span className="text-7xl md:text-9xl font-black font-barlow tracking-wider text-red-600/30 mb-2 select-none">
          {isRuntimeError ? "500" : "404"}
        </span>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-barlow uppercase tracking-tight text-white mb-4">
          {displayTitle}
        </h1>

        {/* Subtitle */}
        <p className="text-slate-400 text-base sm:text-lg max-w-lg mb-8 leading-relaxed">
          {displaySubtitle}
        </p>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {reset && (
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-red-500" />
              <span>Try Again</span>
            </button>
          )}

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-sm tracking-wider uppercase transition-all shadow-lg shadow-red-900/40 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
