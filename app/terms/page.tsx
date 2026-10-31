"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Scale, CheckCircle2, AlertCircle, Wrench, ArrowRight, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function TermsPage() {
  const { isArabic } = useLanguage();
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  return (
    <div className="bg-white min-h-screen" dir={isArabic ? "rtl" : "ltr"}>
      {/* Hero Header */}
      <section className="relative w-full h-[40vh] min-h-[320px] overflow-hidden flex flex-col justify-center items-center bg-black pt-16">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/services-hero.png"
            alt="Terms of Use Bab Al Bustan"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#120505]/85" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
        </div>

        <div className="relative z-20 text-center px-6 max-w-3xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-[0.25em] mb-4">
            {isArabic ? "الشروط والأحكام" : "Legal Terms & Service Agreement"}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight uppercase leading-tight text-white mb-3">
            {isArabic ? "شروط الاستخدام" : "Terms of Use"}
          </h1>
          <p className="max-w-xl mx-auto text-zinc-300 text-sm md:text-base font-normal leading-relaxed">
            {isArabic
              ? "الشروط والأحكام المنظمة لخدمات صيانة وإصلاح وفحص المركبات في ورشة باب البستان في الشارقة."
              : "Standard terms and conditions governing automotive inspection, diagnostic, repair, and maintenance services at Bab Al Bustan."}
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 text-zinc-800">
        <div className="space-y-10 leading-relaxed text-sm sm:text-base">
          <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80">
            <h2 className="text-xl font-bold text-zinc-950 mb-3 flex items-center gap-3">
              <Scale className="w-5 h-5 text-red-600" />
              <span>{isArabic ? "1. الموافقة والتقدير المالي" : "1. Estimates & Repair Authorization"}</span>
            </h2>
            <p className="text-zinc-600">
              {isArabic
                ? "يتم تزويد العميل بتقدير تكلفة تفصيلي يشمل أجور اليد وأسعار قطع الغيار الأصلية قبل البدء في أي عمل صيانة. لا يتم تنفيذ أي أعمال إضافية دون الحصول على موافقة خطية أو تأكيد مباشر من العميل."
                : "Customers receive a transparent upfront cost estimate detailing labor charges and OEM part prices prior to any maintenance work. No additional repairs will be performed without explicit prior approval from the customer."}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80">
            <h2 className="text-xl font-bold text-zinc-950 mb-3 flex items-center gap-3">
              <Wrench className="w-5 h-5 text-red-600" />
              <span>{isArabic ? "2. قطع الغيار والضمان" : "2. Parts & Service Warranty"}</span>
            </h2>
            <p className="text-zinc-600">
              {isArabic
                ? "تستخدم ورشتنا قطع غيار أصلية ومعتمدة من الشركات المصنعة، وتخضع جميع الإصلاحات لضمان معتمد على شغل اليد وقطع الغيار حسب نوع الخدمة وفاتورة الصيانة الرسمية."
                : "We source certified genuine and OEM-grade parts for all automotive repairs. All repairs carried out at Bab Al Bustan are backed by our workmanship and parts warranty, clearly stated on your official service invoice."}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80">
            <h2 className="text-xl font-bold text-zinc-950 mb-3 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-red-600" />
              <span>{isArabic ? "3. الفحص واستلام السيارة" : "3. Quality Inspection & Vehicle Collection"}</span>
            </h2>
            <p className="text-zinc-600">
              {isArabic
                ? "تخضع كل مركبة لفحص جودة واختبار قيادة بعد إتمام الصيانة. يُرجى من العملاء استلام مركباتهم خلال 48 ساعة من إشعار الجاهزية تجنباً لرسوم الإيواء."
                : "Every vehicle undergoes strict multi-point quality assurance testing and road verification before handover. Customers are kindly requested to collect their vehicles within 48 hours of service completion notice."}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80">
            <h2 className="text-xl font-bold text-zinc-950 mb-3 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span>{isArabic ? "4. الدفع والفواتير" : "4. Payment Methods & Invoicing"}</span>
            </h2>
            <p className="text-zinc-600">
              {isArabic
                ? "يتم الدفع عند استلام المركبة بعد فحصها من قبل العميل، ونقبل الدفع نقداً، وبطاقات الائتمان، والتحويل البنكي المعتمد مع تقديم فاتورة ضريبية رسمية متوافقة مع متطلبات الهيئة الاتحادية للضرائب."
                : "Payment is settled upon vehicle handover after final customer inspection. We accept cash, credit/debit cards, and corporate bank transfers, complete with official UAE FTA-compliant VAT tax invoices."}
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

