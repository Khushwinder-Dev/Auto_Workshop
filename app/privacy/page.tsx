"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Lock, Eye, FileText, Phone, Mail, ArrowRight, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function PrivacyPage() {
  const { isArabic } = useLanguage();
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  return (
    <div className="bg-white min-h-screen" dir={isArabic ? "rtl" : "ltr"}>
      {/* Hero Header */}
      <section className="relative w-full h-[40vh] min-h-[320px] overflow-hidden flex flex-col justify-center items-center bg-black pt-16">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/services-hero.png"
            alt="Privacy Policy Bab Al Bustan"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#120505]/85" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
        </div>

        <div className="relative z-20 text-center px-6 max-w-3xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-[0.25em] mb-4">
            {isArabic ? "الشفافية والأمان" : "Transparency & Security"}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight uppercase leading-tight text-white mb-3">
            {isArabic ? "سياسة الخصوصية" : "Privacy Policy"}
          </h1>
          <p className="max-w-xl mx-auto text-zinc-300 text-sm md:text-base font-normal leading-relaxed">
            {isArabic
              ? "نلتزم بحماية بيانات عملائنا وسجلات مركباتهم وفقاً لأعلى معايير الخصوصية والأمان في دولة الإمارات العربية المتحدة."
              : "We are committed to safeguarding your personal data, vehicle maintenance records, and privacy with the highest standards in the UAE."}
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 text-zinc-800">
        <div className="space-y-10 leading-relaxed text-sm sm:text-base">
          <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80">
            <h2 className="text-xl font-bold text-zinc-950 mb-3 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-red-600" />
              <span>{isArabic ? "1. المعلومات التي نجمعها" : "1. Information We Collect"}</span>
            </h2>
            <p className="text-zinc-600">
              {isArabic
                ? "نقوم بجمع المعلومات الضرورية فقط لتقديم خدمات فحص وصيانة السيارات، وتتضمن: الاسم، رقم الهاتف، البريد الإلكتروني، وتفاصيل المركبة (رقم الشاسيه VIN، سنة الصنع، والموديل)، بالإضافة إلى سجل الفحوصات والأعطال السابقة."
                : "We collect only the essential information required to service your vehicle safely: customer name, contact phone number, email address, vehicle details (make, model, year, VIN number, odometer reading), and diagnostic history."}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80">
            <h2 className="text-xl font-bold text-zinc-950 mb-3 flex items-center gap-3">
              <Lock className="w-5 h-5 text-red-600" />
              <span>{isArabic ? "2. كيفية استخدام بياناتك" : "2. How We Use Your Data"}</span>
            </h2>
            <ul className="list-disc list-inside space-y-2 text-zinc-600">
              <li>{isArabic ? "تأكيد مواعيد الصيانة وتقديم عروض الأسعار الدقيقة." : "Confirming workshop appointments and providing accurate service quotes."}</li>
              <li>{isArabic ? "إرسال تحديثات حالة السيارة وموعد استلامها عبر الرسائل القصيرة والواتساب." : "Sending real-time car repair progress updates and completion notifications via SMS/WhatsApp."}</li>
              <li>{isArabic ? "الاحتفاظ بسجل الصيانة الدورية لتسهيل الفحوصات والضمانات المستقبلية." : "Maintaining your vehicle digital service history for warranty coverage and future inspections."}</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80">
            <h2 className="text-xl font-bold text-zinc-950 mb-3 flex items-center gap-3">
              <Eye className="w-5 h-5 text-red-600" />
              <span>{isArabic ? "3. حماية البيانات وعدم المشاركة" : "3. Zero-Spam & Non-Disclosure Guarantee"}</span>
            </h2>
            <p className="text-zinc-600">
              {isArabic
                ? "لا نقوم ببيع أو تأجير أو مشاركة بياناتك الشخصية مع أي طرف ثالث لأغراض تسويقية. بياناتك مشفرة ومحفوظة بسرية تامة داخل أنظمة إدارة ورشة باب البستان."
                : "We never sell, trade, or distribute your personal contact information or vehicle data to third-party marketing companies. All customer records are stored securely within Bab Al Bustan's internal garage management system."}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80">
            <h2 className="text-xl font-bold text-zinc-950 mb-3 flex items-center gap-3">
              <FileText className="w-5 h-5 text-red-600" />
              <span>{isArabic ? "4. التواصل والاستفسارات" : "4. Contact Our Privacy Team"}</span>
            </h2>
            <p className="text-zinc-600 mb-4">
              {isArabic
                ? "إذا كانت لديك أي استفسارات حول سياسة الخصوصية أو ترغب في تحديث معلوماتك، يمكنك التواصل معنا مباشرة:"
                : "If you have questions regarding your data privacy or would like to update your vehicle records, feel free to reach out directly:"}
            </p>
            <div className="flex flex-wrap gap-4 text-sm font-semibold">
              <a href="tel:+971564406456" className="inline-flex items-center gap-2 text-red-600 hover:text-red-700">
                <Phone className="w-4 h-4" /> +971 56 440 6456
              </a>
              <a href="mailto:info@babalbustanuae.com" className="inline-flex items-center gap-2 text-red-600 hover:text-red-700">
                <Mail className="w-4 h-4" /> info@babalbustanuae.com
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

