"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Cpu,
  Droplets,
  ShieldCheck,
  Car,
  Search,
  ClipboardList,
  Wrench,
  CircleCheck,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  Clock,
  Shield,
  Disc,
  Fan,
  Code,
  Check,
} from "lucide-react";
import { getWorkshopServices } from "@/data/workshopData";
import { useLanguage } from "@/context/LanguageContext";

export default function ServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const { isArabic, t } = useLanguage();

  const services = getWorkshopServices(isArabic);

  const iconMap: Record<string, React.ReactNode> = {
    diagnostics: <Cpu className="w-5 h-5 text-white" />,
    "oil-change": <Droplets className="w-5 h-5 text-white" />,
    brakes: <Disc className="w-5 h-5 text-white" />,
    suspension: <Car className="w-5 h-5 text-white" />,
    battery: <Wrench className="w-5 h-5 text-white" />,
    "ac-repair": <Fan className="w-5 h-5 text-white" />,
    tires: <ShieldCheck className="w-5 h-5 text-white" />,
    "computer-programming": <Code className="w-5 h-5 text-white" />,
  };

  const steps = [
    {
      icon: Search,
      title: t.servicesPage.step1Title,
      desc: t.servicesPage.step1Desc,
    },
    {
      icon: ClipboardList,
      title: t.servicesPage.step2Title,
      desc: t.servicesPage.step2Desc,
    },
    {
      icon: Wrench,
      title: t.servicesPage.step3Title,
      desc: t.servicesPage.step3Desc,
    },
    {
      icon: CircleCheck,
      title: t.servicesPage.step4Title,
      desc: t.servicesPage.step4Desc,
    },
  ];

  const faqsEn = [
    {
      q: "How long will my vehicle service take?",
      a: "Express services like oil changes, brake inspections, and battery tests are completed within 45 to 60 minutes. Major repairs like engine overhauls or AC evaporator core replacements take 1 to 2 days.",
    },
    {
      q: "Do you provide warranty on repairs and spare parts?",
      a: "Yes! All mechanical and electrical repairs are backed by our workshop warranty, and all replacement parts carry manufacturer guarantees.",
    },
    {
      q: "Can I get a transparent cost estimate before work begins?",
      a: "Absolutely. 100% transparency is our core promise. We diagnose the issue first and provide a written estimate before turning a single wrench.",
    },
    {
      q: "Do you use genuine manufacturer OEM parts?",
      a: "We only use genuine OEM or factory-certified high-grade parts according to manufacturer specifications to ensure optimal vehicle longevity and performance.",
    },
    {
      q: "Can your workshop service luxury German and European cars?",
      a: "Yes. We specialize in Mercedes-Benz, BMW, Audi, Porsche, Land Rover, and Volkswagen with dealership-level diagnostic scanners and specialized tools.",
    },
  ];

  const faqsAr = [
    {
      q: "كم يستغرق وقت صيانة سيارتي؟",
      a: "تكتمل الخدمات السريعة مثل تغيير الزيت، فحص الفرامل، وتبديل البطارية خلال 45 إلى 60 دقيقة. أما الإصلاحات الكبرى مثل توضيب المحرك أو استبدال ثلاجة المكيف فتستغرق من يوم إلى يومين.",
    },
    {
      q: "هل توفرون ضماناً على الإصلاحات وقطع الغيار؟",
      a: "نعم! جميع أعمال الإصلاح الميكانيكية والكهربائية مشمولة بضمان الورشة المعتمد، وجميع قطع الغيار تحمل ضمان الشركات المصنعة الأصلي.",
    },
    {
      q: "هل يمكنني الحصول على عرض سعر واضح قبل بدء العمل؟",
      a: "نعم بكل تأكيد. الشفافية 100% هي وعدنا لعملائنا. نقوم بفحص العطل أولاً ونقدم تقريراً وتسعيراً مكتوباً ومفصلاً قبل بدء العمل.",
    },
    {
      q: "هل تستخدمون قطع غيار أصلية ومطابقة لمواصفات الوكالة؟",
      a: "نستخدم فقط قطع غيار أصلية OEM أو قطعاً معتمدة بأعلى المواصفات المصنعية لضمان طول عمر سيارتك وأدائها الممتاز.",
    },
    {
      q: "هل ورشتكم مؤهلة لصيانة السيارات الألمانية والأوروبية الفاخرة؟",
      a: "نعم، نحن متخصصون في صيانة مرسيدس بنز، بي إم دبليو، أودي، بورش، رينج روفر، وفولكس فاجن بأحدث أجهزة الفحص بمستوى الوكالة.",
    },
  ];

  const faqs = isArabic ? faqsAr : faqsEn;

  const filteredServices = services.filter((service) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "engine") return ["diagnostics", "oil-change", "computer-programming"].includes(service.id);
    if (selectedFilter === "cooling") return service.id === "ac-repair";
    if (selectedFilter === "safety") return ["brakes", "suspension", "tires"].includes(service.id);
    if (selectedFilter === "electrical") return ["battery", "diagnostics", "computer-programming"].includes(service.id);
    return true;
  });

  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  return (
    <main className="bg-white">
      {/* ============================================================
          PAGE HERO BANNER
          ============================================================ */}
      <section className="relative w-full h-[60vh] min-h-[450px] overflow-hidden flex flex-col bg-black">
        <div className="absolute inset-0 z-0">
          <Image
            alt="Workshop Hero"
            fill
            className="object-cover"
            src="/images/services-hero.png"
            priority
          />
          <div className="absolute inset-0 bg-[#1a0a05]/75" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
        </div>
        <div className="relative z-20 flex-grow flex flex-col items-center justify-center text-center px-6 mt-10">
          <div data-aos="zoom-out" data-aos-delay="200" className="mb-4">
            <h1 className="text-4xl md:text-[56px] font-display font-bold tracking-tight leading-[0.9] flex items-center justify-center gap-3 max-w-[800px]">
              <span className="text-white">{t.servicesPage.heroTitle1}</span>
              <span className="text-red-600">{t.servicesPage.heroTitle2}</span>
            </h1>
          </div>
          <p
            data-aos="fade-up"
            data-aos-delay="400"
            className="max-w-xl text-gray-300 text-sm md:text-base font-medium tracking-wide opacity-90"
          >
            {t.servicesPage.heroSubtitle}
          </p>

          {/* Breadcrumb pills */}
          <div className="mt-6 flex items-center gap-2 text-xs font-bold text-gray-400">
            <Link href="/" className="hover:text-white transition-colors">
              {isArabic ? "الرئيسية" : "Home"}
            </Link>
            <span>/</span>
            <span className="text-red-500">
              {isArabic ? "الخدمات" : "Services"}
            </span>
          </div>
        </div>
      </section>

      {/* ============================================================
          ALL SERVICES SECTION
          ============================================================ */}
      <section className="py-20 bg-zinc-50">
        <div className="max-w-[1300px] mx-auto px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 text-red-600 font-bold text-[11px] uppercase tracking-[0.2em] mb-4">
              <span className="text-[8px]">▲</span>
              <span>{isArabic ? "حلول ورشة متكاملة" : "COMPLETE WORKSHOP SOLUTIONS"}</span>
              <span className="text-[8px]">▲</span>
            </div>
            <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-[52px] text-zinc-900 leading-[1.1] max-w-4xl mx-auto">
              {isArabic
                ? "إصلاح معتمد وصيانة وقائية لسيارتك في الشارقة"
                : "Certified Car Repair & Preventive Maintenance in Sharjah"}
            </h2>
            <p className="mt-4 text-zinc-600 max-w-2xl mx-auto text-sm md:text-base">
              {isArabic
                ? "تُنفذ جميع أعمال الصيانة باستخدام أحدث أجهزة الكمبيوتر وقطع الغيار الأصلية المشمولة بضماننا الشامل."
                : "Every service is carried out using cutting-edge computerized tools and genuine spare parts backed by our comprehensive warranty."}
            </p>

            {/* Category Filter Pills */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              {[
                { id: "all", label: t.servicesPage.filterAll },
                { id: "engine", label: t.servicesPage.filterEngine },
                { id: "cooling", label: t.servicesPage.filterCooling },
                { id: "safety", label: t.servicesPage.filterSafety },
                { id: "electrical", label: t.servicesPage.filterElectrical },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedFilter(tab.id)}
                  className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    selectedFilter === tab.id
                      ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                      : "bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Services Grid with Rich Features & Direct Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
            {filteredServices.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col group border border-zinc-200/80 hover:border-red-600/40 hover:-translate-y-1.5"
              >
                {/* Image */}
                <div className="relative h-56 w-full overflow-hidden bg-zinc-900">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-95 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                  
                  {/* Duration Tag */}
                  {item.duration && (
                    <div className={`absolute top-3 ${isArabic ? "left-3" : "right-3"} bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/20`}>
                      <Clock className="w-3 h-3 text-red-500" />
                      <span>{item.duration}</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="relative pt-12 pb-6 px-6 text-center flex-grow flex flex-col">
                  {/* Floating Triangle Badge with Icon */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-[-36px] w-[72px] h-[72px] z-10 flex items-center justify-center">
                    <svg
                      className="absolute inset-0 w-full h-full drop-shadow-md"
                      viewBox="0 0 72 72"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M36 5L68 65H4L36 5Z"
                        fill="#dc2626"
                        stroke="#b91c1c"
                        strokeWidth="1"
                      />
                    </svg>
                    <div className="relative z-20 mt-4">
                      {iconMap[item.id] || <Wrench className="w-5 h-5 text-white" />}
                    </div>
                  </div>

                  <h3 className="text-xl font-black text-zinc-900 mb-2 uppercase tracking-tight group-hover:text-red-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
                    {item.shortDesc}
                  </p>

                  {/* Features Bullet List */}
                  {item.features && (
                    <div className="text-start bg-zinc-50 rounded-xl p-3 mb-5 border border-zinc-100 flex-grow">
                      <p className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-400 mb-2">
                        {t.servicesPage.featuresIncluded}:
                      </p>
                      <ul className="space-y-1.5 text-xs text-zinc-600">
                        {item.features.slice(0, 2).map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-1.5 line-clamp-1">
                            <Check className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Warranty Tag */}
                  {item.warranty && (
                    <div className="mb-4 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg py-1 px-2.5 flex items-center justify-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="truncate">{item.warranty}</span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="mt-auto pt-3 border-t border-zinc-100 flex items-center justify-between gap-2">
                    <Link
                      href={`/services-details?service=${item.id}`}
                      className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 group/btn"
                    >
                      <span>{t.servicesPage.viewDetailsBtn}</span>
                      <ArrowIcon className="w-3.5 h-3.5 group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      href={`/booking?service=${item.id}`}
                      className="px-3.5 py-1.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-sm hover:shadow-md cursor-pointer"
                    >
                      {t.servicesPage.bookServiceBtn}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          HOW IT WORKS (4 STEPS)
          ============================================================ */}
      <section className="relative py-24 px-6 overflow-hidden min-h-[500px] flex flex-col justify-center bg-black">
        <div className="absolute inset-0 z-0 bg-black">
          <Image
            alt="How it works background"
            fill
            className="object-cover object-center"
            src="/images/bottomcar.jpg"
          />
          <div className="absolute inset-0 bg-black/80" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-90" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="text-center mb-16">
            <span className="text-red-600 font-bold text-xs uppercase tracking-[0.2em] mb-2 block">
              {t.servicesPage.processEyebrow}
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white uppercase tracking-tight">
              {t.servicesPage.processTitle}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center group">
                <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(225,29,35,0.4)] transition-transform duration-300 group-hover:scale-110">
                  <step.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-white text-lg font-black mb-3 uppercase tracking-tight">
                  {step.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed max-w-[280px]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          FAQ SECTION
          ============================================================ */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase tracking-[0.2em] mb-4">
              <span>▲</span>
              <span>{isArabic ? "أسئلة متكررة" : "COMMON QUESTIONS"}</span>
              <span>▲</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-zinc-900 uppercase tracking-tight mb-6">
              {t.servicesPage.faqTitle}
            </h2>
            <p className="text-zinc-600 text-base leading-relaxed mb-8">
              {isArabic
                ? "هل تحتاج لمزيد من المعلومات حول خدمات الصيانة أو أوقات الإنجاز أو الأسعار في الشارقة؟ إليك الإجابات على أبرز الأسئلة."
                : "Need more information about our workshop services, turnaround times, or pricing in Sharjah? Here are the most common questions our clients ask."}
            </p>
            <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200 flex flex-col gap-4">
              <h4 className="font-bold text-zinc-900 text-base">
                {isArabic ? "هل لديك سؤال آخر؟" : "Have another question?"}
              </h4>
              <p className="text-zinc-500 text-xs">
                {isArabic
                  ? "مستشارو الخدمة المعتمدون لدينا متاحون 6 أيام في الأسبوع لمساعدتك."
                  : "Our certified service advisors are available 6 days a week to assist you."}
              </p>
              <div className="flex items-center gap-3">
                <Link
                  href="/contact"
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-full text-xs font-bold tracking-wider uppercase transition-colors"
                >
                  {isArabic ? "تواصل مع المستشار" : "Contact Advisor"}
                </Link>
                <a
                  href="https://api.whatsapp.com/send?phone=971564406456"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-bold tracking-wider uppercase transition-colors"
                >
                  {isArabic ? "واتساب مباشر" : "WhatsApp Us"}
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="border border-zinc-200 rounded-xl overflow-hidden transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-start flex items-center justify-between gap-4 font-bold text-zinc-900 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    <span className="text-sm md:text-base">{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-red-600" : "text-zinc-400"
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-zinc-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
