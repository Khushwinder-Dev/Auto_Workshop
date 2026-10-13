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
    cardBg: "#ffffff",
    icon: () => (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="#01a9a0"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-9 h-9 sm:w-10 sm:h-10 text-[#01a9a0]"
      >
        {/* Two people with speech bubble above - exact match to reference */}
        <circle cx="16" cy="19" r="4" />
        <path d="M9 33c0-3.3 3.1-6 7-6s7 2.7 7 6" />
        <circle cx="32" cy="19" r="4" />
        <path d="M25 33c0-3.3 3.1-6 7-6s7 2.7 7 6" />
        <path d="M20 12a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3h-2l-3 3v-3h-1a3 3 0 0 1-3-3v-2z" />
        <line x1="24" y1="13.5" x2="28" y2="13.5" />
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
    cardBg: "#ffffff",
    icon: () => (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="#01a9a0"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-9 h-9 sm:w-10 sm:h-10 text-[#01a9a0]"
      >
        {/* Profile with swirl inside brain - exact match to reference */}
        <path d="M19 40v-4a3.5 3.5 0 0 0-3-3.4A12 12 0 0 1 12 21C12 14.4 17.4 9 24 9c6.6 0 12 5.4 12 12 0 3.3-1.4 6.3-3.6 8.5a4 4 0 0 0-1.4 3V40" />
        <path d="M24 16c2.5 0 3.5 1.5 2 3s-3.5 1-2.5 2.5 2.5 1.5 2.5 1.5" />
        <circle cx="24" cy="20.5" r="1.3" fill="#01a9a0" />
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
    cardBg: "#ffffff",
    icon: () => (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="#01a9a0"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-9 h-9 sm:w-10 sm:h-10 text-[#01a9a0]"
      >
        {/* Lightbulb with gear cog & rays - exact match to reference */}
        <path d="M17 25a8.5 8.5 0 1 1 14 0c-.8 1.1-2 2.6-2 5h-10c0-2.4-1.2-3.9-2-5z" />
        <line x1="19" y1="34" x2="29" y2="34" />
        <line x1="21" y1="38" x2="27" y2="38" />
        <circle cx="24" cy="20" r="3" />
        <path d="M24 15v2m0 6v2m-4.5-5.5h2m5 0h2" />
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
    cardBg: "#ffffff",
    icon: () => (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="#01a9a0"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-9 h-9 sm:w-10 sm:h-10 text-[#01a9a0]"
      >
        {/* Document with magnifying glass - exact match to reference */}
        <path d="M22 11h14a2.5 2.5 0 0 1 2.5 2.5v22a2.5 2.5 0 0 1-2.5 2.5H16a2.5 2.5 0 0 1-2.5-2.5V29" />
        <line x1="23" y1="18" x2="32" y2="18" />
        <line x1="23" y1="24" x2="32" y2="24" />
        <line x1="23" y1="30" x2="30" y2="30" />
        <circle cx="16" cy="19" r="6" />
        <line x1="11.5" y1="23.5" x2="7" y2="28" strokeWidth="2.5" />
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
    cardBg: "#ffffff",
    icon: () => (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="#01a9a0"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-9 h-9 sm:w-10 sm:h-10 text-[#01a9a0]"
      >
        {/* Axes with upward curve arrow - exact match to reference */}
        <path d="M10 9v29h29" />
        <path d="M12 36c4-1 12-3 18-12 3-4.5 5.5-9 7.5-11" />
        <path d="M31 13h6.5v6.5" />
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
    cardBg: "#ffffff",
    icon: () => (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="#01a9a0"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-9 h-9 sm:w-10 sm:h-10 text-[#01a9a0]"
      >
        {/* Executive briefcase with handle and latch - exact match to reference */}
        <rect x="8" y="16" width="32" height="22" rx="3.5" />
        <path d="M17 16V12a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v4" />
        <line x1="8" y1="25" x2="40" y2="25" />
        <circle cx="24" cy="25" r="2.5" fill="#f0faf9" stroke="#01a9a0" />
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
    cardBg: "#ffffff",
    icon: () => (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="#01a9a0"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-9 h-9 sm:w-10 sm:h-10 text-[#01a9a0]"
      >
        {/* Drawing monitor/waveform - exact match to reference */}
        <rect x="9" y="12" width="30" height="20" rx="2.5" />
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
    cardBg: "#ffffff",
    icon: () => (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="#01a9a0"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-9 h-9 sm:w-10 sm:h-10 text-[#01a9a0]"
      >
        {/* Megaphone with sound bursts - exact match to reference */}
        <path d="M10 20h5l12-7v22l-12-7h-5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2z" />
        <path d="M13 28v5a2.5 2.5 0 0 0 2.5 2.5h1" />
        <path d="M32 16a7 7 0 0 1 0 16" />
        <path d="M36 12a13 13 0 0 1 0 24" />
        <line x1="30" y1="12" x2="33" y2="9" />
        <line x1="30" y1="36" x2="33" y2="39" />
      </svg>
    ),
  },
];

export default function OurProcessSection() {
  const { isArabic } = useLanguage();

  const stepPairs = [
    [processSteps[0], processSteps[1]],
    [processSteps[2], processSteps[3]],
    [processSteps[4], processSteps[5]],
    [processSteps[6], processSteps[7]],
  ];

  return (
    <section
      id="our-process"
      className="relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#009e90] overflow-hidden scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto">
        {/* ============================================================
            SECTION HEADER
            ============================================================ */}
        <div className="text-center max-w-5xl mx-auto mb-14 sm:mb-16 lg:mb-20">
          {/* Eyebrow / Tag */}
          <div className="inline-flex items-center justify-center gap-3 mb-3.5 sm:mb-4">
            <span className="inline-block h-[2px] w-6 sm:w-8 bg-white/70 rounded-full" />
            <span className="text-xs sm:text-sm font-extrabold tracking-[0.18em] uppercase text-white">
              {isArabic ? "منهجية عملنا" : "OUR PROCESS"}
            </span>
            <span className="inline-block h-[2px] w-6 sm:w-8 bg-white/70 rounded-full" />
          </div>

          {/* Main Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[42px] xl:text-[46px] font-extrabold text-white tracking-tight leading-[1.15] mb-4 sm:mb-5 lg:whitespace-nowrap">
            {isArabic ? (
              <>
                <span>رؤيتكم. </span>
                <span className="text-[#a7f3d0]">خبرتنا. </span>
                <span>نتائج استثنائية.</span>
              </>
            ) : (
              <>
                <span>Your Vision. </span>
                <span className="text-[#a7f3d0]">Our Expertise. </span>
                <span>Exceptional Results.</span>
              </>
            )}
          </h2>

          {/* Subtitle */}
          <p className="text-white/85 text-sm sm:text-base lg:text-[17px] max-w-2xl mx-auto leading-relaxed section-subtitle">
            {isArabic
              ? "من الاستشارة الأولية وحتى التسليم النهائي، نلتزم بأعلى معايير الجودة والموثوقية والدقة والاهتمام بالتفاصيل."
              : "From consultation to completion, we deliver quality, reliability, and attention to detail."}
          </p>
        </div>

        {/* ============================================================
            DESKTOP LAYOUT (lg and above): 2 Columns Capsule Layout
            ============================================================ */}
        <div className="hidden lg:block relative max-w-6xl mx-auto">
          {/* Central Vertical Dashed Line */}
          <div
            className="absolute top-8 bottom-8 left-1/2 -translate-x-1/2 w-[2px] pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, rgba(255,255,255,0.45) 0, rgba(255,255,255,0.45) 8px, transparent 8px, transparent 16px)",
            }}
          />

          <div className="flex flex-col gap-6 xl:gap-7">
            {stepPairs.map(([leftStep, rightStep], pairIdx) => (
              <div
                key={`pair-${pairIdx}`}
                className="relative grid grid-cols-[1fr_40px_1fr] items-center"
              >
                {/* ── LEFT CAPSULE (Odd: 1, 3, 5, 7) ──────────────────── */}
                <div
                  className="group relative flex items-center p-2.5 pe-6 xl:pe-8 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md cursor-default min-h-[92px] xl:min-h-[98px]"
                  style={{ backgroundColor: leftStep.cardBg }}
                >
                  {/* Left Inset Circle for Icon */}
                  <div className="w-[72px] h-[72px] xl:w-[78px] xl:h-[78px] rounded-full bg-[#f0faf9] shadow-xs flex items-center justify-center shrink-0">
                    {leftStep.icon()}
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 min-w-0 ms-4 xl:ms-5">
                    <h3 className="text-base lg:text-[18px] font-bold text-stone-900 leading-tight tracking-tight card-main-title">
                      {isArabic ? leftStep.titleAr : leftStep.titleEn}
                    </h3>
                    <p className="text-xs lg:text-[16px] text-stone-600 font-normal leading-relaxed mt-1">
                      {isArabic ? leftStep.descAr : leftStep.descEn}
                    </p>
                  </div>
                </div>

                {/* ── CENTER TIMELINE NODE ───────────────────────────── */}
                <div className="flex items-center justify-center relative z-10 w-full">
                  <div className="w-3.5 h-3.5 rounded-full bg-white border-[3px] border-[#009e90] shadow-sm ring-2 ring-white/60" />
                </div>

                {/* ── RIGHT CAPSULE (Even: 2, 4, 6, 8) ─────────────────── */}
                <div
                  className="group relative flex items-center p-2.5 pe-6 xl:pe-8 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md cursor-default min-h-[92px] xl:min-h-[98px]"
                  style={{ backgroundColor: rightStep.cardBg }}
                >
                  {/* Left Inset Circle for Icon */}
                  <div className="w-[72px] h-[72px] xl:w-[78px] xl:h-[78px] rounded-full bg-[#f0faf9] shadow-xs flex items-center justify-center shrink-0">
                    {rightStep.icon()}
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 min-w-0 ms-4 xl:ms-5">
                    <h3 className="text-base lg:text-[18px] font-bold text-stone-900 leading-tight tracking-tight card-main-title">
                      {isArabic ? rightStep.titleAr : rightStep.titleEn}
                    </h3>
                    <p className="text-xs lg:text-[16px] text-stone-600 font-normal leading-relaxed mt-1">
                      {isArabic ? rightStep.descAr : rightStep.descEn}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================
            MOBILE & TABLET LAYOUT (< lg): Responsive Capsule Stream
            ============================================================ */}
        <div className="lg:hidden relative">
          <div className="flex flex-col gap-4 sm:gap-5">
            {processSteps.map((step) => (
              <div
                key={step.number}
                className="group relative flex items-center p-2.5 pe-4 sm:pe-6 rounded-full transition-all duration-300 hover:shadow-sm cursor-default min-h-[82px] sm:min-h-[92px]"
                style={{ backgroundColor: step.cardBg }}
              >
                {/* Left Inset Circle for Icon */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#f0faf9] shadow-xs flex items-center justify-center shrink-0">
                  {step.icon()}
                </div>

                {/* Text Content */}
                <div className="flex-1 min-w-0 ms-3 sm:ms-4">
                  <h3 className="text-base font-bold text-stone-900 leading-tight tracking-tight">
                    {isArabic ? step.titleAr : step.titleEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 font-normal leading-relaxed mt-0.5">
                    {isArabic ? step.descAr : step.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
