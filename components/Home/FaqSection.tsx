"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

const faqsEn: FaqItem[] = [
  {
    id: 1,
    question: "What types of vehicles do you specialize in?",
    answer:
      "We specialize in servicing and repairing a comprehensive range of vehicles, including luxury, German (Mercedes, BMW, Audi, Porsche, VW), Japanese (Toyota, Lexus, Nissan, Honda), and American brands, utilizing advanced OEM diagnostic scanners and certified technicians.",
  },
  {
    id: 2,
    question: "How often should I service my car?",
    answer:
      "Regular maintenance is key to vehicle longevity. We recommend a minor service every 5,000–10,000 km (synthetic oil, OEM filter, 30-point inspection) and a major service every 20,000–40,000 km, calibrated specifically for UAE climate and highway conditions.",
  },
  {
    id: 3,
    question: "Do you offer same-day service?",
    answer:
      "Yes, for routine maintenance, computerized diagnostics, brake pad replacement, synthetic oil service, and battery replacement, we provide same-day completion to get you back on the road safely without unnecessary downtime.",
  },
  {
    id: 4,
    question: "Is there a documented warranty on repairs?",
    answer:
      "Absolutely. We provide a documented workshop warranty on both genuine replacement parts and workmanship, ensuring complete confidence and peace of mind after leaving our Sharjah facility.",
  },
  {
    id: 5,
    question: "Do you provide computerized vehicle diagnostics?",
    answer:
      "Yes, we use the latest OEM-level computerized diagnostic equipment to accurately pinpoint sensor, engine, gearbox, transmission, AC, and complex electrical system faults with 100% precision.",
  },
  {
    id: 6,
    question: "Do you offer pickup and drop-off in Sharjah?",
    answer:
      "Yes, we provide convenient vehicle pickup and delivery services across selected areas in Sharjah and adjacent zones, saving you valuable time.",
  },
];

const faqsAr: FaqItem[] = [
  {
    id: 1,
    question: "ما هي أنواع السيارات التي تتخصصون في صيانتها؟",
    answer:
      "نحن متخصصون في صيانة وإصلاح مجموعة واسعة وشاملة من السيارات، بما فيها السيارات الفاخرة والألمانية (مرسيدس، بي إم دبليو، أودي، بورش، فولكس فاجن)، واليابانية (تويوتا، لكزس، نيسان، هوندا)، والأمريكية، باستخدام أحدث أجهزة الفحص الرقمية وبأيدي فنيين معتمدين.",
  },
  {
    id: 2,
    question: "كم مرة يجب أن أقوم بصيانة سيارتي؟",
    answer:
      "الصيانة الدورية ضرورية لسلامة وأداء المحرك. نوصي عادةً بإجراء صيانة صغرى كل 5,000 إلى 10,000 كم (تغيير زيت تخليقي، فلتر أصلي، فحص 30 نقطة)، وصيانة كبرى كل 20,000 إلى 40,000 كم لتناسب ظروف القيادة وحرارة الجو في الإمارات.",
  },
  {
    id: 3,
    question: "هل توفرون خدمة الصيانة في نفس اليوم؟",
    answer:
      "نعم، بالنسبة للصيانة الدورية، وفحص الكمبيوتر، وتبديل السفايف (الفرامل)، وتبديل الزيوت، والبطاريات، نوفر خدمة الاستلام والتسليم في نفس اليوم لتوفير وقتك وجهدك.",
  },
  {
    id: 4,
    question: "هل يوجد ضمان موثق على أعمال الإصلاح وقطع الغيار؟",
    answer:
      "بالتأكيد. نقدم ضماناً معتمداً وموثقاً على كل من قطع الغيار الأصلية وجودة العمل المنجز لضمان راحة بالك التامة بعد مغادرة ورشتنا بالشارقة.",
  },
  {
    id: 5,
    question: "هل توفرون فحص الكمبيوتر الإلكتروني الدقيق؟",
    answer:
      "نعم، نستخدم أحدث أجهزة الفحص الرقمية المبرمجة لتحديد أعطال المحرك، والجيربوكس، والحساسات، والأنظمة الكهربائية بدقة 100%.",
  },
  {
    id: 6,
    question: "هل توفرون خدمة استلام وتسليم السيارة بالشارقة؟",
    answer:
      "نعم، نوفر خدمة استلام وتسليم السيارة في مناطق محددة بالشارقة لتوفير أقصى درجات الراحة والمرونة لعملائنا الكرام.",
  },
];

export default function FaqSection() {
  const [openId, setOpenId] = useState<number | null>(1);
  const { isArabic } = useLanguage();

  const faqs = isArabic ? faqsAr : faqsEn;

  const toggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      className="py-16 sm:py-20 lg:py-24 bg-[#fafafa]"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================= */}
        {/* SECTION HEADER (Taj Al Rahmah Reference Layout)          */}
        {/* ========================================================= */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          {/* Eyebrow: — FAQ — */}
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 sm:w-10 h-[2px] bg-red-600 rounded-full" />
            <span className="text-xs sm:text-[13px] font-extrabold tracking-[0.2em] uppercase text-red-600">
              {isArabic ? "الأسئلة الشائعة" : "FAQ"}
            </span>
            <span className="w-8 sm:w-10 h-[2px] bg-red-600 rounded-full" />
          </div>

          {/* Main Title: Frequently Asked Questions */}
          <h2 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold tracking-tight text-zinc-950 mb-3 leading-tight">
            {isArabic ? (
              <>
                الأسئلة <span className="text-red-600">الشائعة</span>
              </>
            ) : (
              <>
                Frequently Asked <span className="text-red-600">Questions</span>
              </>
            )}
          </h2>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm md:text-base text-zinc-500 max-w-lg mx-auto leading-relaxed">
            {isArabic
              ? "إجابات واضحة ومباشرة حول خدمات صيانة السيارات، الضمان، قطع الغيار، والأسعار في ورشة باب البستان بالشارقة."
              : "Find clear answers to common questions about our vehicle maintenance, repair procedures, warranties, and pricing."}
          </p>
        </div>

        {/* ========================================================= */}
        {/* STACKED ACCORDION CARDS (Taj Al Rahmah Reference Style)   */}
        {/* ========================================================= */}
        <div className="max-w-4xl mx-auto space-y-3.5 sm:space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl sm:rounded-[22px] bg-white border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "border-red-600/40 shadow-[0_8px_30px_rgba(220,38,38,0.06)]"
                    : "border-zinc-200/80 hover:border-zinc-300 shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-start cursor-pointer group gap-4"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                    <span className="text-zinc-400 font-bold text-xs sm:text-sm tracking-wide select-none shrink-0">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-bold text-sm sm:text-[15.5px] transition-colors leading-snug ${
                        isOpen
                          ? "text-red-600"
                          : "text-zinc-900 group-hover:text-red-600"
                      }`}
                    >
                      {faq.question}
                    </span>
                  </div>

                  {/* Plus / Minus Circle Icon */}
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
                      isOpen
                        ? "bg-red-600 text-white shadow-sm shadow-red-600/30"
                        : "bg-white border border-red-500/50 text-red-600 group-hover:border-red-600 group-hover:bg-red-50"
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                    ) : (
                      <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: "easeInOut" }}
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-0 text-xs sm:text-[13.5px] text-zinc-600 leading-relaxed pl-11 sm:pl-12 rtl:pl-5 sm:rtl:pl-6 rtl:pr-11 sm:rtl:pr-12">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
