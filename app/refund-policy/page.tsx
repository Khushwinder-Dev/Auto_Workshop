"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { RefreshCcw, ShieldCheck, Clock, CheckCircle2, Phone, ArrowRight, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function RefundPolicyPage() {
  const { isArabic } = useLanguage();
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  return (
    <div className="bg-white min-h-screen" dir={isArabic ? "rtl" : "ltr"}>
      {/* Hero Header */}
      <section className="relative w-full h-[40vh] min-h-[320px] overflow-hidden flex flex-col justify-center items-center bg-black pt-16">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/services-hero.png"
            alt="Refund & Cancellation Policy Bab Al Bustan"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#120505]/85" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
        </div>

        <div className="relative z-20 text-center px-6 max-w-3xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-[0.25em] mb-4">
            {isArabic ? "الضمان والرضا التام" : "Satisfaction & Guarantee Policy"}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight uppercase leading-tight text-white mb-3">
            {isArabic ? "سياسة الاسترداد والإلغاء" : "Refund & Cancellation Policy"}
          </h1>
          <p className="max-w-xl mx-auto text-zinc-300 text-sm md:text-base font-normal leading-relaxed">
            {isArabic
              ? "سياسة شفافة وعادلة لإلغاء المواعيد، وضمان جودة الصيانة، واسترداد المبالغ في حال عدم الرضا."
              : "Clear and fair policy for appointment cancellations, repair service warranties, and refund guarantees."}
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 text-zinc-800">
        <div className="space-y-10 leading-relaxed text-sm sm:text-base">
          <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80">
            <h2 className="text-xl font-bold text-zinc-950 mb-3 flex items-center gap-3">
              <Clock className="w-5 h-5 text-red-600" />
              <span>{isArabic ? "1. إلغاء المواعيد وتعديلها" : "1. Appointment Cancellation & Rescheduling"}</span>
            </h2>
            <p className="text-zinc-600">
              {isArabic
                ? "يمكنك إلغاء أو إعادة جدولة موعد الصيانة في أي وقت قبل بدء أعمال الفحص أو الإصلاح دون أي رسوم أو غرامات. يُفضل إشعارنا قبل ساعتين على الأقل لإعادة تنظيم جدول الفنيين."
                : "You may cancel or reschedule your vehicle service booking at any time prior to the commencement of diagnostics or repair work with zero penalties or cancellation fees. Kindly notify us at least 2 hours in advance."}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80">
            <h2 className="text-xl font-bold text-zinc-950 mb-3 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-red-600" />
              <span>{isArabic ? "2. ضمان إعادة الإصلاح مجاناً" : "2. 100% Free Rework Guarantee"}</span>
            </h2>
            <p className="text-zinc-600">
              {isArabic
                ? "إذا ظهر نفس العيب أو المشكلة خلال فترة الضمان المحددة في فاتورتك، تتكفل ورشتنا بإعادة الفحص وإصلاح الخلل بالكامل مجاناً دون أي تكلفة إضافية على أجور اليد."
                : "If a repaired component or diagnosed issue recurs within the warranty window stated on your invoice, Bab Al Bustan provides 100% free re-inspection and corrective repair with zero additional labor charge."}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80">
            <h2 className="text-xl font-bold text-zinc-950 mb-3 flex items-center gap-3">
              <RefreshCcw className="w-5 h-5 text-red-600" />
              <span>{isArabic ? "3. استرداد قيمة قطع الغيار والخدمات" : "3. Parts & Service Refunds"}</span>
            </h2>
            <p className="text-zinc-600">
              {isArabic
                ? "في حال طلب قطعة غيار خاصة ولم يتم استخدامها نتيجة إلغاء الصيانة قبل فتح العبوة، يتم استرداد قيمتها بالكامل. كما يحق للعميل استرداد المبلغ في حال ثبوت عدم مطابقة القطعة للمواصفات القياسية للشركة المصنعة."
                : "Unopened genuine spare parts ordered specifically for your vehicle and cancelled before installation are eligible for a full refund. Defective parts covered under manufacturer warranty will be replaced immediately or refunded."}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80">
            <h2 className="text-xl font-bold text-zinc-950 mb-3 flex items-center gap-3">
              <Phone className="w-5 h-5 text-red-600" />
              <span>{isArabic ? "4. طلب استرداد أو استفسار" : "4. How to Request Support"}</span>
            </h2>
            <p className="text-zinc-600 mb-4">
              {isArabic
                ? "لأي استفسار حول سياسة الاسترداد أو الضمان، يسعدنا تواصلكم مباشرة مع إدارة الورشة:"
                : "For any warranty claim, refund inquiry, or service feedback, please contact our workshop service manager:"}
            </p>
            <div className="flex flex-wrap gap-4 text-sm font-semibold">
              <a href="tel:+971564406456" className="inline-flex items-center gap-2 text-red-600 hover:text-red-700">
                +971 56 440 6456
              </a>
              <span className="text-zinc-300">•</span>
              <a href="mailto:info@babalbustanuae.com" className="inline-flex items-center gap-2 text-red-600 hover:text-red-700">
                info@babalbustanuae.com
              </a>
            </div>
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

