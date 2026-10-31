"use client";

import React from "react";
import { Minus, Plus } from "lucide-react";

export interface FaqAccordionItemProps {
  id?: number | string;
  number?: string | number;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  isArabic?: boolean;
  className?: string;
}

export default function FaqAccordionItem({
  number,
  question,
  answer,
  isOpen,
  onToggle,
  isArabic = false,
  className = "",
}: FaqAccordionItemProps) {
  const formattedNum =
    number !== undefined
      ? typeof number === "number"
        ? String(number).padStart(2, "0")
        : number
      : undefined;

  return (
    <div
      className={`rounded-2xl sm:rounded-[22px] bg-white border transition-all duration-300 overflow-hidden ${
        isOpen
          ? "border-red-600/40 shadow-[0_8px_30px_rgba(220,38,38,0.06)]"
          : "border-zinc-200/80 hover:border-zinc-300 shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
      } ${className}`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between p-5 sm:p-6 text-left rtl:text-right cursor-pointer group gap-4"
      >
        <div className="flex items-center gap-3.5 sm:gap-4 min-w-0 flex-1">
          {formattedNum && (
            <span className="text-xs sm:text-sm font-bold text-zinc-400 select-none shrink-0 transition-colors group-hover:text-red-600">
              {formattedNum}
            </span>
          )}
          <span
            className={`font-bold text-sm sm:text-[15.5px] transition-colors leading-snug ${
              isOpen ? "text-red-600" : "text-zinc-900 group-hover:text-red-600"
            }`}
          >
            {question}
          </span>
        </div>

        {/* Plus / Minus Circle Icon */}
        <div
          className={`w-7 h-7 sm:w-8.5 sm:h-8.5 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
            isOpen
              ? "bg-red-600 text-white shadow-xs"
              : "border border-red-600/40 text-red-600 group-hover:border-red-600 group-hover:bg-red-50"
          }`}
        >
          {isOpen ? (
            <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
          ) : (
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
          )}
        </div>
      </button>

      {/* Smooth Grid Expand */}
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p
            className={`px-5 sm:px-6 pb-5 sm:pb-6 ${
              formattedNum ? "ps-9 sm:ps-12" : "ps-5 sm:ps-6"
            } text-xs sm:text-sm text-zinc-600 leading-relaxed`}
          >
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
