"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

interface ProcessStep {
  number: number;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  numberBg: string;
  cardBg: string;
  borderColor: string;
  accentColor: string;
  icon: () => React.ReactNode;
}

const processSteps: ProcessStep[] = [
  {
    number: 1,
    titleEn: "Initial Consultation",
    titleAr: "الاستشارة الأولية",
    descEn:
      "Contact us for a consultation on your project via our website or social media.",
    descAr:
      "تواصل معنا للحصول على استشارة متخصصة لمشروعك عبر موقعنا الإلكتروني أو وسائل التواصل الاجتماعي.",
    numberBg: "#F3984E",
    cardBg: "#FFF1E8",
    borderColor: "#FEDAC5",
    accentColor: "#F3984E",
    icon: () => (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-7 h-7 sm:w-8 sm:h-8 text-stone-800"
      >
        <circle cx="16" cy="18" r="4.5" />
        <path d="M8 32c0-3.5 3.5-6 8-6s8 2.5 8 6" />
        <circle cx="32" cy="18" r="4.5" />
        <path d="M24 32c0-3.5 3.5-6 8-6s8 2.5 8 6" />
        <path d="M20 13a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4h-2l-3 3v-3h-1" />
        <line x1="24" y1="13" x2="28" y2="13" />
      </svg>
    ),
  },
  {
    number: 2,
    titleEn: "Share Your Vision",
    titleAr: "شاركنا رؤيتك",
    descEn:
      "Discuss your vision, preferences, budget and timeline during the consultation.",
    descAr:
      "ناقش رؤيتك وتفضيلاتك وميزانيتك والجدول الزمني المحدد خلال جلسة الاستشارة.",
    numberBg: "#7B66FF",
    cardBg: "#F1EDFF",
    borderColor: "#DCD4FD",
    accentColor: "#7B66FF",
    icon: () => (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-7 h-7 sm:w-8 sm:h-8 text-stone-800"
      >
        <path d="M18 38v-3a4 4 0 0 0-3-3.8A12 12 0 0 1 11 21C11 14.4 16.4 9 23 9s12 5.4 12 12c0 3.8-1.8 7.2-4.6 9.4A4 4 0 0 0 29 34.2V38" />
        <path d="M23 15c2.5 0 3.5 1.5 2 3s-3.5 1-2.5 2.5 2.5 1.5 2.5 1.5" />
        <circle cx="23" cy="20" r="1.2" fill="currentColor" />
      </svg>
    ),
  },
  {
    number: 3,
    titleEn: "Conceptualization",
    titleAr: "بلورة المفاهيم والتصميم",
    descEn:
      "Our team will conceptualize designs based on your vision and preferences.",
    descAr:
      "يقوم فريقنا بابتكار وتطوير التصاميم الهندسية بناءً على رؤيتك واحتياجاتك الخاصة.",
    numberBg: "#32B8C6",
    cardBg: "#E7F9FA",
    borderColor: "#C3EFF3",
    accentColor: "#32B8C6",
    icon: () => (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-7 h-7 sm:w-8 sm:h-8 text-stone-800"
      >
        <path d="M17 25a8.5 8.5 0 1 1 14 0c-.8 1.1-2 2.6-2 5h-10c0-2.4-1.2-3.9-2-5z" />
        <line x1="19" y1="34" x2="29" y2="34" />
        <line x1="21" y1="38" x2="27" y2="38" />
        <circle cx="24" cy="20" r="3" />
        <line x1="24" y1="5" x2="24" y2="8" />
        <line x1="12" y1="12" x2="14.5" y2="14.5" />
        <line x1="36" y1="12" x2="33.5" y2="14.5" />
        <line x1="7" y1="21" x2="10" y2="21" />
        <line x1="41" y1="21" x2="38" y2="21" />
      </svg>
    ),
  },
  {
    number: 4,
    titleEn: "Execution and Construction",
    titleAr: "التنفيذ والإنشاء",
    descEn:
      "Finalize design, proceed to execution or consultancy, with our team ensuring flawless implementation.",
    descAr:
      "اعتماد التصاميم النهائية والبدء بالتنفيذ الميداني بإشراف هندسي يضمن دقة التنفيذ والجودة.",
    numberBg: "#EAB54B",
    cardBg: "#FFF9E7",
    borderColor: "#FEEDBD",
    accentColor: "#EAB54B",
    icon: () => (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-7 h-7 sm:w-8 sm:h-8 text-stone-800"
      >
        <path d="M22 10h14a3 3 0 0 1 3 3v22a3 3 0 0 1-3 3H16a3 3 0 0 1-3-3v-6" />
        <line x1="24" y1="17" x2="33" y2="17" />
        <line x1="24" y1="23" x2="33" y2="23" />
        <line x1="24" y1="29" x2="31" y2="29" />
        <circle cx="16" cy="18" r="5.5" />
        <line x1="12.1" y1="21.9" x2="8" y2="26" />
      </svg>
    ),
  },
  {
    number: 5,
    titleEn: "Material Selection",
    titleAr: "اختيار المواد والتشطيبات",
    descEn:
      "Select materials and finishes, together prioritizing quality and aesthetics.",
    descAr:
      "اختيار أفضل المواد والعوازل والتشطيبات بالتعاون معكم مع إعطاء الأولوية للجودة والجمالية.",
    numberBg: "#EB6497",
    cardBg: "#FDEBF3",
    borderColor: "#F9CEE3",
    accentColor: "#EB6497",
    icon: () => (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-7 h-7 sm:w-8 sm:h-8 text-stone-800"
      >
        <path d="M10 9v29h29" />
        <path d="M12 36c4-1 12-3 18-12 3-4.5 6-10 8-12" />
        <path d="M32 12h6v6" />
      </svg>
    ),
  },
  {
    number: 6,
    titleEn: "Client Walkthrough",
    titleAr: "المعاينة الميدانية",
    descEn:
      "Experience your transformed space in a walkthrough before final adjustments.",
    descAr:
      "استكشف مساحتك المحدثة في جولة تفقدية شاملة قبل وضع اللمسات النهائية والتسليم.",
    numberBg: "#E8705A",
    cardBg: "#FDF1EE",
    borderColor: "#FAD9D1",
    accentColor: "#E8705A",
    icon: () => (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-7 h-7 sm:w-8 sm:h-8 text-stone-800"
      >
        <rect x="8" y="16" width="32" height="22" rx="3" />
        <path d="M17 16V12a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v4" />
        <line x1="8" y1="25" x2="40" y2="25" />
        <circle cx="24" cy="25" r="2.5" />
      </svg>
    ),
  },
  {
    number: 7,
    titleEn: "Finishing Touches",
    titleAr: "اللمسات النهائية",
    descEn:
      "Add finishing touches like artwork and lighting to make the space uniquely yours.",
    descAr:
      "إضافة اللمسات التكميلية كالإضاءة والتشطيبات الدقيقة لتصبح المساحة متوافقة تماماً مع ذوقك.",
    numberBg: "#6C63FF",
    cardBg: "#EEEDFF",
    borderColor: "#DCD9FE",
    accentColor: "#6C63FF",
    icon: () => (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-7 h-7 sm:w-8 sm:h-8 text-stone-800"
      >
        <rect x="9" y="12" width="30" height="20" rx="2" />
        <path d="M13 23h5l3-6 4 9 3-5h7" />
        <line x1="6" y1="36" x2="42" y2="36" />
        <line x1="10" y1="32" x2="38" y2="32" />
      </svg>
    ),
  },
  {
    number: 8,
    titleEn: "Project Completion",
    titleAr: "تسليم المشروع",
    descEn:
      "Your dream space is ready. We're here for future needs or enhancements.",
    descAr:
      "مساحتك المثالية باتت جاهزة بالكامل، ونحن هنا دائماً لخدمتكم لأي احتياجات أو تحسينات مستقبلية.",
    numberBg: "#5EBA76",
    cardBg: "#EDF9F0",
    borderColor: "#D0F2D7",
    accentColor: "#5EBA76",
    icon: () => (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-7 h-7 sm:w-8 sm:h-8 text-stone-800"
      >
        <path d="M9 20h6l12-7v22l-12-7H9a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2z" />
        <path d="M13 28v6a3 3 0 0 0 3 3h1" />
        <path d="M33 16a8 8 0 0 1 0 16" />
        <path d="M37 12a14 14 0 0 1 0 24" />
      </svg>
    ),
  },
];

export default function OurProcessSection() {
  const { isArabic } = useLanguage();

  // Pairs for desktop rows: [1, 2], [3, 4], [5, 6], [7, 8]
  const stepPairs = [
    [processSteps[0], processSteps[1]],
    [processSteps[2], processSteps[3]],
    [processSteps[4], processSteps[5]],
    [processSteps[6], processSteps[7]],
  ];

  return (
    <section
      id="our-process"
      className="relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto">
        {/* ============================================================
            SECTION HEADER
            ============================================================ */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20">
          {/* Eyebrow / Tag */}
          <div className="inline-flex items-center justify-center gap-3 mb-3.5 sm:mb-4">
            <span className="inline-block h-[2px] w-6 sm:w-8 bg-[#01a9a0] rounded-full" />
            <span className="text-xs sm:text-sm font-extrabold tracking-[0.18em] uppercase text-[#01a9a0]">
              {isArabic ? "منهجية عملنا" : "OUR PROCESS"}
            </span>
            <span className="inline-block h-[2px] w-6 sm:w-8 bg-[#01a9a0] rounded-full" />
          </div>

          {/* Main Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold text-stone-900 tracking-tight leading-[1.2] mb-4 sm:mb-5">
            {isArabic ? (
              <>
                <span>رؤيتكم. </span>
                <span className="text-[#01a9a0]">خبرتنا. </span>
                <span>نتائج استثنائية.</span>
              </>
            ) : (
              <>
                <span>Your Vision. </span>
                <span className="text-[#01a9a0]">Our Expertise. </span>
                <span>Exceptional Results.</span>
              </>
            )}
          </h2>

          {/* Subtitle */}
          <p className="text-stone-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {isArabic
              ? "من الاستشارة الأولية وحتى التسليم النهائي، نلتزم بأعلى معايير الجودة والموثوقية والدقة والاهتمام بالتفاصيل."
              : "From consultation to completion, we deliver quality, reliability, and attention to detail."}
          </p>
        </div>

        {/* ============================================================
            DESKTOP LAYOUT (lg and above): 2 Columns with Center Timeline
            ============================================================ */}
        <div className="hidden lg:block relative max-w-6xl mx-auto">
          {/* Central Vertical Dashed Line */}
          <div
            className="absolute top-10 bottom-10 left-1/2 -translate-x-1/2 w-[2px] pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, #cbd5e1 0, #cbd5e1 8px, transparent 8px, transparent 16px)",
            }}
          />

          <div className="flex flex-col gap-7 xl:gap-9">
            {stepPairs.map(([leftStep, rightStep], pairIdx) => (
              <div
                key={`pair-${pairIdx}`}
                className="relative grid grid-cols-[1fr_60px_1fr] items-center"
              >
                {/* ── LEFT CARD (Odd step: 1, 3, 5, 7) ────────────────── */}
                <div
                  className="group relative flex items-center gap-4 xl:gap-5 px-5 py-4.5 xl:px-7 xl:py-5.5 rounded-full border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-default"
                  style={{
                    backgroundColor: leftStep.cardBg,
                    borderColor: leftStep.borderColor,
                  }}
                >
                  {/* Left Icon (White Circular Capsule) */}
                  <div className="w-14 h-14 xl:w-16 xl:h-16 rounded-full bg-white shadow-sm border border-black/5 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                    {leftStep.icon()}
                  </div>

                  {/* Number Badge */}
                  <div
                    className="w-10 h-10 xl:w-11 xl:h-11 rounded-full text-white font-extrabold text-lg xl:text-xl flex items-center justify-center shrink-0 shadow-sm"
                    style={{ backgroundColor: leftStep.numberBg }}
                  >
                    {leftStep.number}
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 min-w-0 pr-2">
                    <h3 className="text-base xl:text-lg font-bold text-stone-900 leading-snug tracking-tight">
                      {isArabic ? leftStep.titleAr : leftStep.titleEn}
                    </h3>
                    <p className="text-xs xl:text-[13px] text-stone-600 font-medium leading-relaxed mt-1">
                      {isArabic ? leftStep.descAr : leftStep.descEn}
                    </p>
                  </div>
                </div>

                {/* ── CENTER TIMELINE NODE WITH HORIZONTAL CONNECTORS ──── */}
                <div className="flex items-center justify-center relative z-10 w-full px-1">
                  {/* Left connector */}
                  <div
                    className="flex-1 h-[2px] pointer-events-none"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(to right, #94a3b8 0, #94a3b8 4px, transparent 4px, transparent 8px)",
                    }}
                  />
                  {/* Center Dot */}
                  <div className="w-3.5 h-3.5 rounded-full bg-slate-400 border-[3px] border-white shadow-sm ring-2 ring-slate-200 shrink-0 mx-1" />
                  {/* Right connector */}
                  <div
                    className="flex-1 h-[2px] pointer-events-none"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(to right, #94a3b8 0, #94a3b8 4px, transparent 4px, transparent 8px)",
                    }}
                  />
                </div>

                {/* ── RIGHT CARD (Even step: 2, 4, 6, 8) ───────────────── */}
                <div
                  className="group relative flex items-center gap-4 xl:gap-5 px-5 py-4.5 xl:px-7 xl:py-5.5 rounded-full border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-default"
                  style={{
                    backgroundColor: rightStep.cardBg,
                    borderColor: rightStep.borderColor,
                  }}
                >
                  {/* Number Badge */}
                  <div
                    className="w-10 h-10 xl:w-11 xl:h-11 rounded-full text-white font-extrabold text-lg xl:text-xl flex items-center justify-center shrink-0 shadow-sm"
                    style={{ backgroundColor: rightStep.numberBg }}
                  >
                    {rightStep.number}
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 min-w-0 pl-1">
                    <h3 className="text-base xl:text-lg font-bold text-stone-900 leading-snug tracking-tight">
                      {isArabic ? rightStep.titleAr : rightStep.titleEn}
                    </h3>
                    <p className="text-xs xl:text-[13px] text-stone-600 font-medium leading-relaxed mt-1">
                      {isArabic ? rightStep.descAr : rightStep.descEn}
                    </p>
                  </div>

                  {/* Right Icon (White Circular Capsule) */}
                  <div className="w-14 h-14 xl:w-16 xl:h-16 rounded-full bg-white shadow-sm border border-black/5 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                    {rightStep.icon()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================
            MOBILE & TABLET LAYOUT (< lg): Responsive Sequential Stream
            ============================================================ */}
        <div className="lg:hidden relative">
          {/* Subtle vertical connector line on mobile */}
          <div
            className={`absolute top-6 bottom-6 ${
              isArabic ? "right-7 sm:right-8" : "left-7 sm:left-8"
            } w-[2px] pointer-events-none z-0`}
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, #cbd5e1 0, #cbd5e1 6px, transparent 6px, transparent 12px)",
            }}
          />

          <div className="flex flex-col gap-4 sm:gap-5 relative z-10">
            {processSteps.map((step) => (
              <div
                key={step.number}
                className="group relative flex items-start sm:items-center gap-3.5 sm:gap-5 p-4 sm:p-5 rounded-2xl sm:rounded-3xl border shadow-xs transition-all duration-300 hover:shadow-md cursor-default"
                style={{
                  backgroundColor: step.cardBg,
                  borderColor: step.borderColor,
                }}
              >
                {/* Step Number Badge */}
                <div
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full text-white font-extrabold text-base sm:text-lg flex items-center justify-center shrink-0 shadow-sm"
                  style={{ backgroundColor: step.numberBg }}
                >
                  {step.number}
                </div>

                {/* Text Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-snug tracking-tight">
                    {isArabic ? step.titleAr : step.titleEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 font-medium leading-relaxed mt-1">
                    {isArabic ? step.descAr : step.descEn}
                  </p>
                </div>

                {/* Icon Box */}
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white shadow-xs border border-black/5 flex items-center justify-center shrink-0 self-center sm:self-auto group-hover:scale-105 transition-transform duration-300">
                  {step.icon()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
