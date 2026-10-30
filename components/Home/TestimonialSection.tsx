"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface Testimonial {
  name: string;
  role: string;
  vehicle: string;
  rating: number;
  date: string;
  comment: string;
  avatar: string;
}

const SLIDE_VARIANTS = {
  enter: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? 18 : -18,
  }),
  center: { opacity: 1, y: 0 },
  exit: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? -18 : 18,
  }),
};

const TESTIMONIALS_DATA_EN: Testimonial[] = [
  {
    name: "Tariq Al Mansoori",
    role: "Verified Customer, Sharjah",
    vehicle: "Mercedes-Benz E300 AMG",
    rating: 5,
    date: "October 2024",
    comment:
      "Bab Al Bustan solved a recurring transmission hesitation and check engine light that two other garages couldn't diagnose properly. Their master tech hooked up Star diagnostic scanner, pinpointed a faulty speed sensor, and completed the repair the same afternoon. Extremely professional and honest team!",
    avatar: "/images/testimonials/testimonial-bd-11.png",
  },
  {
    name: "Rashid Al Nuaimi",
    role: "Verified Customer, Ajman",
    vehicle: "Nissan Patrol V8 Titanium",
    rating: 5,
    date: "September 2024",
    comment:
      "Summer in Sharjah without strong AC is impossible. My Patrol's cooling had completely collapsed. The team did a pressure vacuum test, replaced the leaking evaporator core, and charged fresh refrigerant. The air conditioning is blowing ice cold even in midday traffic. Best garage in Industrial Area 5!",
    avatar: "/images/testimonials/testimonial-bd-2.png",
  },
  {
    name: "David Miller",
    role: "Business Executive, Dubai",
    vehicle: "BMW 530i M-Sport",
    rating: 5,
    date: "August 2024",
    comment:
      "What impressed me most was their 100% upfront transparency. They provided a written estimate before touching anything. Replaced front brake pads with OEM ceramic pads and skimmed the rotors on-car. High-speed brake judder is completely gone. Will be returning for all periodic servicing.",
    avatar: "/images/testimonials/testimonial-bd-3.png",
  },
  {
    name: "Fatima Al Shehhi",
    role: "Verified Customer, Sharjah",
    vehicle: "Toyota Land Cruiser VXR",
    rating: 5,
    date: "July 2024",
    comment:
      "I brought my car in for an express fully synthetic oil change and 25-point inspection. Completed in 35 minutes while I waited in the air-conditioned reception. Staff is respectful, friendly, and they treat your car with genuine care. Highly recommend to everyone in Sharjah!",
    avatar: "/images/testimonials/testimonial-bd-4.png",
  },
];

const TESTIMONIALS_DATA_AR: Testimonial[] = [
  {
    name: "طارق المنصوري",
    role: "عميل موثق، الشارقة",
    vehicle: "مرسيدس بنز E300 AMG",
    rating: 5,
    date: "أكتوبر ٢٠٢٤",
    comment:
      "قامت ورشة باب البستان بحل مشكلة تقطيع القير ولمبة فحص المحرك التي عجزت ورشتان أخريان عن تشخيصها. قام الفني بفحص كمبيوتر Star واكتشف حساس السرعة التالف وأنهى الإصلاح في نفس اليوم. فريق في قمة الاحترافية والأمانة!",
    avatar: "/images/testimonials/testimonial-bd-11.png",
  },
  {
    name: "راشد النعيمي",
    role: "عميل موثق، عجمان",
    vehicle: "نيسان باترول V8 تيتانيوم",
    rating: 5,
    date: "سبتمبر ٢٠٢٤",
    comment:
      "صيف الشارقة بدون مكيف قوي مستحيل تماماً. توقف تبريد سيارتي بالكامل. قام الفريق بفحص ضغط الفاكيوم واستبدال ثلاجة المكيف المسربة وشحن غاز تبريد جديد. المكيف يثلج الآن حتى في زحمة الظهيرة. أفضل ورشة في الصناعية 5!",
    avatar: "/images/testimonials/testimonial-bd-2.png",
  },
  {
    name: "ديفيد ميلر",
    role: "مدير أعمال، دبي",
    vehicle: "بي إم دبليو 530i إم سبورت",
    rating: 5,
    date: "أغسطس ٢٠٢٤",
    comment:
      "أكثر ما أبهرني هو الشفافية التامة؛ قدموا لي عرض سعر مكتوباً ومفصلاً قبل لمس السيارة. تم تركيب سفايف سيراميك أصلية وخرط الديسكات على السيارة. اختفت الرجة تماماً عند السرعات العالية. سأعود دائماً للصيانة الدورية.",
    avatar: "/images/testimonials/testimonial-bd-3.png",
  },
  {
    name: "فاطمة الشحي",
    role: "عميلة موثقة، الشارقة",
    vehicle: "تويوتا لاندكروزر VXR",
    rating: 5,
    date: "يوليو ٢٠٢٤",
    comment:
      "أحضرت سيارتي لتغيير الزيت التخليقي بالكامل مع فحص شامل من 25 نقطة. انتهى العمل في 35 دقيقة فقط وأنا أنتظر في صالة الاستقبال المكيفة. طاقم العمل محترم وودود ويعامل سيارتك بعناية تامة. أنصح بهم بشدة!",
    avatar: "/images/testimonials/testimonial-bd-4.png",
  },
];

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const { isArabic, t } = useLanguage();

  const testimonials = isArabic ? TESTIMONIALS_DATA_AR : TESTIMONIALS_DATA_EN;

  const goToSlide = (idx: number) => {
    if (idx === currentIndex) return;
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[currentIndex];

  const PrevIcon = isArabic ? ChevronRight : ChevronLeft;
  const NextIcon = isArabic ? ChevronLeft : ChevronRight;

  return (
    <section
      className="relative w-full py-[48px] md:py-[64px] lg:py-[80px] px-4 sm:px-6 lg:px-8 bg-zinc-950 text-white overflow-hidden"
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ── Section Header (TajAlRahmah Style) ───────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center gap-3 mb-3.5">
            <span className="inline-block h-[2px] w-6 sm:w-8 bg-red-600 rounded-full" />
            <span className="text-xs sm:text-sm font-extrabold tracking-[0.18em] uppercase text-red-500">
              {t.home.testimonials.eyebrow}
            </span>
            <span className="inline-block h-[2px] w-6 sm:w-8 bg-red-600 rounded-full" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold text-white tracking-tight leading-[1.15] font-display uppercase">
            <span>{t.home.testimonials.titlePart1}</span>{" "}
            <span className="text-red-600">{t.home.testimonials.titlePart2}</span>
          </h2>

          <p className="mt-3.5 text-zinc-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            {t.home.testimonials.subtitle}
          </p>

          {/* 5-Star Rating Pill */}
          <div className="mt-6 inline-flex items-center gap-2.5 bg-zinc-900/90 border border-zinc-800 rounded-full px-5 py-2 shadow-lg shadow-black/40">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-xs font-bold text-zinc-200">
              {t.home.testimonials.ratingBadge}
            </span>
          </div>
        </div>

        {/* ── Testimonial Card (TajAlRahmah 12-Column Grid with Dot Matrix) ── */}
        <div className="relative max-w-7xl mx-auto bg-gradient-to-br from-zinc-900 via-zinc-950 to-black border border-red-600/30 rounded-[32px] p-8 sm:p-12 lg:p-14 shadow-[0_20px_50px_rgba(220,38,38,0.12)] overflow-hidden">
          {/* Radial Dot Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#dc2626_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Quote & Details (Columns 1-7) */}
            <div className="lg:col-span-7 flex flex-col justify-center min-h-[230px] sm:min-h-[250px] text-start">
              <div className="flex items-center justify-between mb-6">
                {/* Circular Quote Icon Badge */}
                <div className="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-600/30 border-2 border-dashed border-red-300 shrink-0">
                  <Quote className="w-6 h-6 fill-current" />
                </div>

                {/* Verified Customer & Vehicle Pill */}
                <div className="inline-flex items-center gap-1.5 bg-red-950/70 border border-red-800/60 text-red-400 text-xs font-bold px-3.5 py-1.5 rounded-full shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{current.vehicle}</span>
                </div>
              </div>

              <div className="relative overflow-hidden">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={SLIDE_VARIANTS}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* 5-Star Rating inside the review */}
                    <div className="flex items-center gap-1 text-amber-400 mb-3">
                      {[...Array(current.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>

                    <p className="text-base sm:text-lg lg:text-[18px] text-zinc-200 font-normal leading-[1.8] italic font-serif">
                      &ldquo;{current.comment}&rdquo;
                    </p>

                    <div className="mt-8 pt-2 border-t border-zinc-800/80">
                      <p className="text-lg sm:text-xl lg:text-[20px] font-bold text-white tracking-wide">
                        — {current.name}
                      </p>
                      <p className="text-xs sm:text-sm font-bold text-red-500 mt-1">
                        {current.role} • {current.date}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right: TajAlRahmah Signature Circular Avatar with Layered Gradient Rings (Columns 8-12) */}
            <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full bg-gradient-to-br from-red-600/25 to-red-600/50 p-3 sm:p-3.5 shadow-2xl flex-shrink-0 border-4 border-zinc-800 ring-8 ring-red-600/15">
                <div className="relative w-full h-full rounded-full bg-zinc-900 overflow-hidden shadow-inner border border-white/10">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.04 }}
                      transition={{ duration: 0.4 }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={current.avatar}
                        alt={current.name}
                        fill
                        unoptimized
                        className="object-cover object-top scale-105"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Slider Navigation Controls & Dots (TajAlRahmah Style) ── */}
        <div className="flex items-center justify-between max-w-7xl mx-auto mt-8 sm:mt-10 px-2">
          {/* Previous Button */}
          <button
            type="button"
            onClick={prevTestimonial}
            className="w-11 h-11 rounded-full bg-zinc-900 hover:bg-red-600 text-zinc-300 hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer border border-zinc-800 shadow-md active:scale-95"
            aria-label="Previous testimonial"
          >
            <PrevIcon className="w-5 h-5" />
          </button>

          {/* Center Navigation Dots */}
          <div className="flex items-center justify-center gap-2.5">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => goToSlide(idx)}
                aria-label={`${isArabic ? "الشهادة" : "Go to testimonial"} ${idx + 1}`}
                aria-current={currentIndex === idx}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentIndex === idx
                    ? "w-8 h-2.5 bg-red-600 shadow-[0_2px_8px_rgba(220,38,38,0.5)]"
                    : "w-2.5 h-2.5 bg-zinc-700 hover:bg-red-600/50"
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            type="button"
            onClick={nextTestimonial}
            className="w-11 h-11 rounded-full bg-zinc-900 hover:bg-red-600 text-zinc-300 hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer border border-zinc-800 shadow-md active:scale-95"
            aria-label="Next testimonial"
          >
            <NextIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
