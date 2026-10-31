"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Cookie, Settings, ShieldCheck, CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function CookiesPage() {
  const { isArabic } = useLanguage();
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  return (
    <div className="bg-white min-h-screen" dir={isArabic ? "rtl" : "ltr"}>
      {/* Hero Header */}
      <section className="relative w-full h-[40vh] min-h-[320px] overflow-hidden flex flex-col justify-center items-center bg-black pt-16">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/services-hero.png"
            alt="Cookie Policy Bab Al Bustan"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#120505]/85" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
        </div>

        <div className="relative z-20 text-center px-6 max-w-3xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-[0.25em] mb-4">
            {isArabic ? "ملفات تعريف الارتباط" : "Cookie Preferences & Transparency"}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight uppercase leading-tight text-white mb-3">
            {isArabic ? "سياسة ملفات تعريف الارتباط (الكوكيز)" : "Cookie Policy"}
          </h1>
          <p className="max-w-xl mx-auto text-zinc-300 text-sm md:text-base font-normal leading-relaxed">
            {isArabic
              ? "كيف نستخدم ملفات تعريف الارتباط لتحسين تجربة تصفحك وتذكر تفضيلاتك اللغوية على موقعنا."
              : "How we use cookies and browser storage to optimize your browsing experience and language preferences."}
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 text-zinc-800">
        <div className="space-y-10 leading-relaxed text-sm sm:text-base">
          <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80">
            <h2 className="text-xl font-bold text-zinc-950 mb-3 flex items-center gap-3">
              <Cookie className="w-5 h-5 text-red-600" />
              <span>{isArabic ? "1. ما هي ملفات الكوكيز؟" : "1. What Are Cookies?"}</span>
            </h2>
            <p className="text-zinc-600">
              {isArabic
                ? "ملفات تعريف الارتباط هي ملفات نصية صغيرة يتم حفظها على جهازك عند زيارة الموقع لمساعدتنا في تذكر تفضيلاتك مثل اللغة (العربية أو الإنجليزية) وحفظ حالة نموذج الحجز لتسهيل زياراتك المتكررة."
                : "Cookies are small text files stored in your web browser when visiting our website. They assist in remembering user settings such as language selection (Arabic or English) and service booking draft data for smoother repeat visits."}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80">
            <h2 className="text-xl font-bold text-zinc-950 mb-3 flex items-center gap-3">
              <Settings className="w-5 h-5 text-red-600" />
              <span>{isArabic ? "2. أنواع الملفات المستخدمة" : "2. Types of Cookies We Use"}</span>
            </h2>
            <ul className="list-disc list-inside space-y-2 text-zinc-600">
              <li>
                <strong className="text-zinc-900">{isArabic ? "الملفات الأساسية:" : "Essential Functional Cookies:"}</strong>{" "}
                {isArabic ? "ضرورية لتشغيل الموقع والتنقل بين الصفحات واختيار اللغة بسلاسة." : "Required for website navigation, language state persistence, and appointment modal functionality."}
              </li>
              <li>
                <strong className="text-zinc-900">{isArabic ? "الملفات التحليلية:" : "Anonymous Analytics:"}</strong>{" "}
                {isArabic ? "تساعدنا في فهم الصفحات الأكثر زيارة لتحسين سرعة الموقع وأداء الخدمات دون جمع أي بيانات شخصية محددة للهوية." : "Helps us assess page load speeds and visitor flow to improve site usability without collecting personally identifiable tracking data."}
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80">
            <h2 className="text-xl font-bold text-zinc-950 mb-3 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-red-600" />
              <span>{isArabic ? "3. إدارة ملفات الكوكيز" : "3. Managing Your Cookie Settings"}</span>
            </h2>
            <p className="text-zinc-600">
              {isArabic
                ? "يمكنك في أي وقت تعطيل أو مسح ملفات تعريف الارتباط عبر إعدادات متصفحك. يرجى ملاحظة أن تعطيل بعض الملفات قد يؤدي إلى إعادة تعيين تفضيلات اللغة عند كل زيارة."
                : "You can modify or disable cookie storage at any time through your browser settings. Note that disabling essential cookies may require you to reselect your preferred language upon each visit."}
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-sm transition-all shadow-md cursor-pointer"
          >
            <span>{isArabic ? "العودة إلى الصفحة الرئيسية" : "Return to Homepage"}</span>
            <ArrowIcon className="w-4 h-4 text-red-500" />
          </Link>
        </div>
      </div>
    </div>
  );
}

