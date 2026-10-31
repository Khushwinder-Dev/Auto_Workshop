"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Upload,
  ArrowRight,
  ArrowLeft,
  FileText,
  Trash2,
  Paperclip,
  Plus,
  ShieldCheck,
  Wrench,
  Clock,
  Phone,
  Mail,
  MapPin,
  Calendar,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import toast from "react-hot-toast";
import { useLanguage } from "@/context/LanguageContext";
import FaqAccordionItem from "@/components/Common/FaqAccordionItem";
import {
  FloatInput,
  FloatTextarea,
  SearchableSelect,
  useVoiceInput,
  isValidEmail,
  isValidPhone,
  isValidText,
  SearchableSelectOption,
} from "@/components/ui/FloatField";
import { getWorkshopFaqs, WORKSHOP_INFO } from "@/data/workshopData";

const WORKSHOP_SERVICE_OPTIONS: SearchableSelectOption[] = [
  {
    value: "Computer Diagnostics & ECU Scan",
    label: "Computer Diagnostics & ECU Scan",
    labelAr: "فحص كمبيوتر وتشخيص الأعطال الشامل",
  },
  {
    value: "Synthetic Oil & OEM Filter Change",
    label: "Synthetic Oil & OEM Filter Change",
    labelAr: "تبديل زيت المحرك التخليقي والفلتر الأصلي",
  },
  {
    value: "Brake Repair & Rotor Skimming",
    label: "Brake Repair & Rotor Skimming",
    labelAr: "صيانة الفرامل وتبديل السفايف وخرط الديسكات",
  },
  {
    value: "Suspension, Struts & Bushings",
    label: "Suspension, Struts & Bushings",
    labelAr: "صيانة نظام التعليق والمساعدات وميزان الرودات",
  },
  {
    value: "Car Battery Testing & Replacement",
    label: "Car Battery Testing & Replacement",
    labelAr: "فحص وتبديل بطارية السيارة وفحص الدينامو",
  },
  {
    value: "Car AC Repair, Leak Test & Freon Refill",
    label: "Car AC Repair, Leak Test & Freon Refill",
    labelAr: "تصليح وشحن مكيف السيارة وكشف التسريب",
  },
  {
    value: "Engine Overhaul & Mechanical Repair",
    label: "Engine Overhaul & Mechanical Repair",
    labelAr: "صيانة وتوضيب المحرك والأعمال الميكانيكية",
  },
  {
    value: "Transmission & Gearbox Service",
    label: "Transmission & Gearbox Service",
    labelAr: "صيانة الجيربوكس ونظام نقل الحركة",
  },
  {
    value: "Comprehensive 30-Point Inspection",
    label: "Comprehensive 30-Point Inspection",
    labelAr: "فحص شامل 30 نقطة قبل الشراء أو السفر",
  },
  {
    value: "Other Custom Repair / General",
    label: "Other Custom Repair / General",
    labelAr: "خدمات صيانة وإصلاحات أخرى",
  },
];

const TIMEFRAME_OPTIONS: SearchableSelectOption[] = [
  {
    value: "Urgent (Today / Same Day)",
    label: "Urgent (Today / Same Day)",
    labelAr: "عاجل (اليوم / في نفس اليوم)",
  },
  {
    value: "Tomorrow",
    label: "Tomorrow",
    labelAr: "غداً",
  },
  {
    value: "This Week",
    label: "This Week",
    labelAr: "خلال هذا الأسبوع",
  },
  {
    value: "Weekend (Saturday/Sunday)",
    label: "Weekend",
    labelAr: "عطلة نهاية الأسبوع",
  },
  {
    value: "Within 2 Weeks",
    label: "Within 2 Weeks",
    labelAr: "خلال أسبوعين",
  },
  {
    value: "Flexible",
    label: "Flexible / General Inquiry",
    labelAr: "مرن / استفسار عام",
  },
];

export default function GetAQuoteContent() {
  const { isArabic } = useLanguage();
  const faqs = getWorkshopFaqs(isArabic);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    emailAddress: "",
    vehicleInfo: "",
    service: "",
    timeframe: "",
    details: "",
    agreed: false,
  });

  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Voice Input Integration
  const { listeningField, toggleListening } = useVoiceInput({
    isArabic,
    onResult: (fieldName: string, text: string) => {
      setFormData((prev) => {
        let finalText = text;
        if (fieldName === "details" && prev.details.trim()) {
          finalText = `${prev.details.trim()} ${text}`;
        }
        return { ...prev, [fieldName]: finalText };
      });
      if (errors[fieldName]) {
        setErrors((prev) => ({ ...prev, [fieldName]: "" }));
      }
    },
  });

  const ALLOWED_EXTS = [
    ".pdf",
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
    ".doc",
    ".docx",
  ];
  const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB per file

  // FAQ Accordion State (first item open by default)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex((prev) => (prev === idx ? null : idx));
  };

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "fullName":
        return !value.trim()
          ? isArabic
            ? "الاسم الكامل مطلوب."
            : "Your full name is required."
          : "";
      case "phoneNumber": {
        const trimmed = value.trim();
        if (!trimmed) {
          return isArabic
            ? "رقم الهاتف مطلوب."
            : "Your phone number is required.";
        }
        if (!isValidPhone(trimmed)) {
          return isArabic
            ? "رقم الهاتف غير صالح."
            : "Please enter a valid phone number.";
        }
        return "";
      }
      case "emailAddress": {
        const trimmed = value.trim();
        if (!trimmed) {
          return isArabic
            ? "البريد الإلكتروني مطلوب."
            : "Your email address is required.";
        }
        if (!isValidEmail(trimmed)) {
          return isArabic
            ? "البريد الإلكتروني غير صالح."
            : "Please enter a valid email address.";
        }
        return "";
      }
      case "vehicleInfo":
        return !value.trim()
          ? isArabic
            ? "يرجى إدخال طراز وسنة صنع السيارة."
            : "Please provide vehicle make, model and year."
          : "";
      case "service":
        return !value.trim()
          ? isArabic
            ? "يرجى اختيار نوع الخدمة المطلوبة."
            : "Please select the required service."
          : "";
      case "details":
        return !value.trim()
          ? isArabic
            ? "يرجى توضيح متطلبات الخدمة أو العطل."
            : "Please describe the symptoms or work scope."
          : "";
      default:
        return "";
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
      }
    }
  };

  const addFiles = (incomingFiles: File[]) => {
    const valid: File[] = [];
    for (const file of incomingFiles) {
      const ext = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
      if (!ALLOWED_EXTS.includes(ext)) {
        toast.error(
          isArabic
            ? `الملف ${file.name} غير مدعوم. يرجى إرفاق ملفات PDF، Word أو صور.`
            : `File "${file.name}" is not supported. Please upload PDF, Word or images.`
        );
        continue;
      }
      if (file.size > MAX_FILE_SIZE) {
        toast.error(
          isArabic
            ? `حجم الملف ${file.name} كبير جداً (الحد الأقصى 15 ميجابايت).`
            : `File "${file.name}" exceeds the 15MB size limit.`
        );
        continue;
      }
      if (!files.some((f) => f.name === file.name && f.size === file.size)) {
        valid.push(file);
      }
    }

    if (valid.length > 0) {
      setFiles((prev) => [...prev, ...valid]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addFiles(Array.from(e.target.files));
    }
    if (e.target) e.target.value = "";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {
      fullName: validateField("fullName", formData.fullName),
      phoneNumber: validateField("phoneNumber", formData.phoneNumber),
      emailAddress: validateField("emailAddress", formData.emailAddress),
      vehicleInfo: validateField("vehicleInfo", formData.vehicleInfo),
      service: validateField("service", formData.service),
      details: validateField("details", formData.details),
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((msg) => msg !== "");
    if (hasError) {
      toast.error(
        isArabic
          ? "يرجى تعبئة جميع الحقول المطلوبة بشكل صحيح."
          : "Please complete all required fields correctly."
      );
      return;
    }

    if (!formData.agreed) {
      toast.error(
        isArabic
          ? "يرجى الموافقة على شروط التواصل لإرسال الطلب."
          : "Please agree to be contacted to submit your request."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const submitData = new FormData();
      submitData.append("formType", "7_Get_A_Quote");
      submitData.append("fullName", formData.fullName);
      submitData.append("name", formData.fullName);
      submitData.append("phoneNumber", formData.phoneNumber);
      submitData.append("phone", formData.phoneNumber);
      submitData.append("emailAddress", formData.emailAddress);
      submitData.append("email", formData.emailAddress);
      submitData.append("companyName", formData.vehicleInfo);
      submitData.append(
        "service",
        `Quote Request: ${formData.service || "General Maintenance"} [Vehicle: ${formData.vehicleInfo || "Not specified"}] [Timeframe: ${formData.timeframe || "Flexible"}]`
      );
      submitData.append("projectType", formData.service);
      submitData.append("projectLocation", "Sharjah Industrial Area 5");
      submitData.append(
        "message",
        `Vehicle: ${formData.vehicleInfo}\nService: ${formData.service}\nTimeframe: ${formData.timeframe}\n\nClient Notes:\n${formData.details}`
      );
      submitData.append("projectDetails", formData.details);

      for (const file of files) {
        submitData.append("files", file);
      }

      const res = await fetch("/api/contact", {
        method: "POST",
        body: submitData,
      });

      if (res.ok) {
        toast.success(
          isArabic
            ? "شكراً لك! تم استلام طلب عرض السعر بنجاح. سيتواصل معك مشرف الصيانة قريباً."
            : "Thank you! Your quote request has been submitted successfully. Our service advisor will contact you shortly.",
          {
            duration: 6000,
            style: {
              background: "#dc2626",
              color: "#fff",
              padding: "16px",
              borderRadius: "12px",
            },
          }
        );
        setFormData({
          fullName: "",
          phoneNumber: "",
          emailAddress: "",
          vehicleInfo: "",
          service: "",
          timeframe: "",
          details: "",
          agreed: false,
        });
        setFiles([]);
        setErrors({});
      } else {
        const data = await res.json().catch(() => ({}));
        toast.error(
          data.error ||
            (isArabic
              ? "حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى."
              : "Submission failed. Please try again.")
        );
      }
    } catch {
      toast.error(
        isArabic
          ? "خطأ في الاتصال. يرجى المحاولة لاحقاً."
          : "Connection error. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="w-full bg-white overflow-hidden"
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* ══════════════════════════════════════════════════════════════
          1. HERO BANNER (MATCHING BAB AL BUSTAN HIGH-CONTRAST THEME)
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full h-[50vh] min-h-[420px] max-h-[500px] overflow-hidden flex flex-col bg-black justify-center items-center text-center">
        <div className="absolute inset-0 z-0">
          <Image
            alt="Workshop Quote Banner"
            fill
            className="object-cover"
            src="/images/services-hero.png"
            priority
          />
          <div className="absolute inset-0 bg-[#0a0302]/75" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/50" />
        </div>

        <div className="relative z-20 max-w-4xl px-4 sm:px-6 pt-12">
          {/* Tagline */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-xs sm:text-[13px] font-bold tracking-widest uppercase mb-4 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-red-400" />
            <span>
              {isArabic
                ? "كراج باب البستان — الشارقة"
                : "Bab Al Bustan Auto Maintenance"}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-display font-extrabold tracking-tight leading-[1.08] text-white">
            <span>{isArabic ? "طلب عرض سعر " : "REQUEST A FREE "}</span>
            <span className="text-red-600">
              {isArabic ? "مجاني وفوري" : "INSTANT QUOTE"}
            </span>
          </h1>

          <p className="mt-4 text-xs sm:text-sm md:text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed font-normal">
            {isArabic
              ? "تسعير دقيق وشفاف بدون أي رسوم خفية لجميع خدمات صيانة وإصلاح السيارات في المنطقة الصناعية 5، الشارقة."
              : "Accurate, transparent, and honest estimates for all major auto repair and maintenance services in Sharjah Industrial Area 5."}
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          2. MAIN SECTION: INFO COLUMN + FLOATING FORM CARD
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full py-12 md:py-16 lg:py-24 bg-[#fafafa] overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* ── LEFT COLUMN: Text + 3 Badges + Workshop Access Card ── */}
            <div className="lg:col-span-5 flex flex-col pt-2 lg:pt-4">
              {/* Tagline */}
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-[2.5px] bg-red-600 rounded-full" />
                <span className="text-xs sm:text-[13px] font-extrabold tracking-[0.2em] text-red-600 uppercase">
                  {isArabic ? "عرض سعر فوري" : "GET AN INSTANT QUOTE"}
                </span>
              </div>

              {/* Main Heading */}
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-zinc-950 leading-[1.15] tracking-tight mb-4">
                {isArabic ? (
                  <>
                    سيارتك تستحق <br />
                    أعلى درجات <br />
                    <span className="text-red-600">الدقة والخبرة</span>
                  </>
                ) : (
                  <>
                    Your Vehicle <br />
                    Deserves Expert <br />
                    <span className="text-red-600">Care & Precision</span>
                  </>
                )}
              </h2>

              {/* Subtitle */}
              <p className="text-zinc-600 text-xs sm:text-sm lg:text-[15px] font-normal leading-relaxed mb-8 max-w-lg">
                {isArabic
                  ? "سواء كنت بحاجة إلى فحص كمبيوتر دقيق، أو صيانة ميكانيكية شاملة، أو تبديل سفايف الفرامل، أو تصليح المكيف، فإن فريقنا المعتمد في الشارقة جاهز لتقييم سيارتك وتقديم عرض سعر شفاف ومباشر بدون أي رسوم خفية."
                  : "Whether you need computer diagnostics, mechanical repairs, brake replacement, or AC maintenance, our certified master technicians evaluate your vehicle and provide an upfront, transparent estimate."}
              </p>

              {/* 3 Feature Badges in TajAlRahmah Reference Style */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-white border border-zinc-200/90 shadow-sm mb-8">
                {/* 1. Reliable OEM Parts */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-red-600/30 bg-red-50 text-red-600 flex items-center justify-center shrink-0 shadow-2xs">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-zinc-900 leading-tight">
                      {isArabic ? "قطع أصلية" : "OEM Parts"}
                    </h4>
                    <span className="text-[11px] text-zinc-500 font-medium">
                      {isArabic ? "وضمان معتمد" : "With Warranty"}
                    </span>
                  </div>
                </div>

                {/* 2. Expert Technicians */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-red-600/30 bg-red-50 text-red-600 flex items-center justify-center shrink-0 shadow-2xs">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-zinc-900 leading-tight">
                      {isArabic ? "فنيون معتمدون" : "Master Techs"}
                    </h4>
                    <span className="text-[11px] text-zinc-500 font-medium">
                      {isArabic ? "خبرة 15+ عاماً" : "15+ Yrs Exp."}
                    </span>
                  </div>
                </div>

                {/* 3. Fast Turnaround */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-red-600/30 bg-red-50 text-red-600 flex items-center justify-center shrink-0 shadow-2xs">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold text-zinc-900 leading-tight">
                      {isArabic ? "استجابة سريعة" : "Fast Quote"}
                    </h4>
                    <span className="text-[11px] text-zinc-500 font-medium">
                      {isArabic ? "خلال 30 دقيقة" : "Within 30 Mins"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct Workshop Access Card */}
              <div className="bg-white rounded-3xl p-6 border border-zinc-200/90 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-zinc-400">
                    {isArabic ? "معلومات التواصل المباشر" : "DIRECT WORKSHOP DESK"}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    {isArabic ? "مفتوح الآن للخدمة" : "OPEN FOR ESTIMATES"}
                  </span>
                </div>

                <div className="space-y-3">
                  <a
                    href="tel:+971564406456"
                    className="flex items-center gap-3 text-zinc-800 hover:text-red-600 transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0 group-hover:bg-red-600 group-hover:text-white transition-colors">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-400 font-medium">
                        {isArabic ? "الاتصال المباشر بالورشة" : "Call Workshop Supervisor"}
                      </p>
                      <p className="text-sm font-bold text-zinc-900" dir="ltr">
                        +971 56 440 6456
                      </p>
                    </div>
                  </a>

                  <a
                    href={WORKSHOP_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-zinc-800 hover:text-emerald-600 transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-400 font-medium">
                        {isArabic ? "واتساب سريع" : "Instant WhatsApp"}
                      </p>
                      <p className="text-sm font-bold text-zinc-900" dir="ltr">
                        +971 56 440 6456
                      </p>
                    </div>
                  </a>

                  <div className="flex items-start gap-3 text-zinc-800 pt-1">
                    <div className="w-9 h-9 rounded-full bg-zinc-100 text-zinc-600 flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-400 font-medium">
                        {isArabic ? "موقع الورشة" : "Workshop Location"}
                      </p>
                      <p className="text-xs font-semibold text-zinc-800 leading-snug">
                        {isArabic
                          ? "المنطقة الصناعية رقم 5، الشارقة، الإمارات العربية المتحدة"
                          : "Industrial Area No 5, Sharjah, United Arab Emirates"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── RIGHT COLUMN: Floating White Form Card ── */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-[32px] p-6 sm:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] border border-zinc-200/90">
                {/* Card Tagline */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-5 h-[2px] bg-red-600" />
                  <span className="text-[11px] sm:text-[12px] font-extrabold tracking-[0.2em] text-red-600 uppercase">
                    {isArabic ? "نموذج عرض السعر" : "REQUEST A QUOTE"}
                  </span>
                </div>

                {/* Card Title */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight mb-2">
                  {isArabic
                    ? "أخبرنا عن سيارتك والخدمة المطلوبة"
                    : "Tell Us About Your Car & Service"}
                </h3>

                {/* Card Subtitle */}
                <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed mb-7">
                  {isArabic
                    ? "املأ البيانات أدناه وسيقوم مستشارو الصيانة لدينا بتقديم تقدير تكلفة دقيق وتحديد موعد مناسب."
                    : "Fill in the details below and our senior service advisor will evaluate the repair scope and provide transparent pricing."}
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
                  {/* Row 1: Full Name & Phone Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FloatInput
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      label={isArabic ? "الاسم الكامل" : "Full Name"}
                      required
                      isArabic={isArabic}
                      error={errors.fullName}
                      isListening={listeningField === "fullName"}
                      onVoiceToggle={() => toggleListening("fullName", "text")}
                      onChange={handleInputChange}
                    />

                    <FloatInput
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      label={isArabic ? "رقم الهاتف / واتساب" : "Phone / WhatsApp"}
                      required
                      isArabic={isArabic}
                      error={errors.phoneNumber}
                      isListening={listeningField === "phoneNumber"}
                      onVoiceToggle={() => toggleListening("phoneNumber", "phone")}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Row 2: Email & Vehicle Make / Model / Year */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FloatInput
                      type="email"
                      name="emailAddress"
                      value={formData.emailAddress}
                      label={isArabic ? "البريد الإلكتروني" : "Email Address"}
                      required
                      isArabic={isArabic}
                      error={errors.emailAddress}
                      isListening={listeningField === "emailAddress"}
                      onVoiceToggle={() => toggleListening("emailAddress", "email")}
                      onChange={handleInputChange}
                    />

                    <FloatInput
                      type="text"
                      name="vehicleInfo"
                      value={formData.vehicleInfo}
                      label={
                        isArabic
                          ? "طراز وسنة الصنع (مثال: تويوتا كامري 2021)"
                          : "Vehicle Make, Model & Year"
                      }
                      required
                      isArabic={isArabic}
                      error={errors.vehicleInfo}
                      isListening={listeningField === "vehicleInfo"}
                      onVoiceToggle={() => toggleListening("vehicleInfo", "text")}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Row 3: Service Needed & Preferred Timeframe */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <SearchableSelect
                      name="service"
                      value={formData.service}
                      options={WORKSHOP_SERVICE_OPTIONS}
                      label={isArabic ? "نوع الخدمة المطلوبة" : "Service Needed"}
                      placeholder={isArabic ? "اختر الخدمة..." : "Select Service..."}
                      required
                      isArabic={isArabic}
                      error={errors.service}
                      onChange={(val) => {
                        setFormData((prev) => ({ ...prev, service: val }));
                        if (errors.service) {
                          setErrors((prev) => ({ ...prev, service: "" }));
                        }
                      }}
                    />

                    <SearchableSelect
                      name="timeframe"
                      value={formData.timeframe}
                      options={TIMEFRAME_OPTIONS}
                      label={isArabic ? "الموعد المفضل للإصلاح" : "Preferred Timeframe"}
                      placeholder={isArabic ? "اختر الموعد..." : "Select Timeframe..."}
                      isArabic={isArabic}
                      onChange={(val) => {
                        setFormData((prev) => ({ ...prev, timeframe: val }));
                      }}
                    />
                  </div>

                  {/* Vehicle Symptoms / Details Textarea */}
                  <FloatTextarea
                    name="details"
                    value={formData.details}
                    label={
                      isArabic
                        ? "وصف العطل أو الأعراض الملاحظة أو الملاحظات"
                        : "Describe the Issue, Symptoms or Required Work"
                    }
                    rows={4}
                    required
                    isArabic={isArabic}
                    error={errors.details}
                    isListening={listeningField === "details"}
                    onVoiceToggle={() => toggleListening("details", "textarea")}
                    onChange={handleInputChange}
                  />

                  {/* File Upload Zone (Taj Al Rahmah Reference Layout) */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-zinc-800 flex items-center gap-1.5">
                        <Paperclip className="w-3.5 h-3.5 text-red-600" />
                        <span>
                          {isArabic
                            ? "إرفاق صور العطل أو الملكية أو تقرير فحص سابق"
                            : "Upload Photos, Mulkiya or Diagnostic Report"}
                        </span>
                        <span className="text-zinc-400 text-[11px] font-normal">
                          ({isArabic ? "اختياري" : "Optional"})
                        </span>
                      </label>
                      {files.length > 0 && (
                        <span className="text-[11px] font-semibold text-red-600">
                          {files.length} {isArabic ? "ملفات مرفقة" : "files attached"}
                        </span>
                      )}
                    </div>

                    <div
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`w-full border-2 border-dashed rounded-2xl p-5 sm:p-6 text-center transition-all cursor-pointer group ${
                        isDragging
                          ? "border-red-600 bg-red-50/50 ring-2 ring-red-600/25"
                          : "border-zinc-200 hover:border-red-600 bg-[#fbfbfb] hover:bg-red-50/20"
                      }`}
                    >
                      <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-zinc-100 group-hover:bg-red-100 flex items-center justify-center text-zinc-500 group-hover:text-red-600 transition-colors shadow-2xs">
                        <Upload className="w-5 h-5" />
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-zinc-700">
                        {isArabic
                          ? "اسحب وأفلت الملفات هنا أو "
                          : "Drag & drop files here or "}
                        <span className="text-red-600 underline font-bold">
                          {isArabic ? "تصفح من جهازك" : "browse files"}
                        </span>
                      </p>
                      <p className="text-[11px] text-zinc-400 mt-1">
                        {isArabic
                          ? "يدعم صور JPG, PNG, ملفات PDF, Word حتى 15 ميجابايت لكل ملف"
                          : "Supports JPG, PNG, PDF, Word documents up to 15MB each"}
                      </p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </div>

                    {/* Uploaded Files List */}
                    {files.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {files.map((file, idx) => (
                          <div
                            key={`${file.name}-${idx}`}
                            className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-white border border-zinc-200 shadow-2xs hover:border-red-600/40 transition-colors"
                          >
                            <div className="flex items-center gap-2.5 min-w-0 pr-2">
                              <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                                <FileText className="w-4 h-4" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs font-bold text-zinc-800 truncate max-w-[220px] sm:max-w-sm">
                                  {file.name}
                                </p>
                                <p className="text-[10px] text-zinc-400">
                                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                                </p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeFile(idx);
                              }}
                              className="w-7 h-7 rounded-full text-zinc-400 hover:text-red-600 hover:bg-red-50 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                              title={isArabic ? "حذف الملف" : "Remove file"}
                              aria-label="Remove file"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}

                        <div className="pt-1 flex items-center justify-between">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>
                              {isArabic ? "إضافة المزيد من الملفات" : "Add more files"}
                            </span>
                          </button>
                          <span className="text-[11px] text-zinc-400">
                            {isArabic ? "إجمالي الحجم:" : "Total size:"}{" "}
                            {(
                              files.reduce((acc, f) => acc + f.size, 0) /
                              (1024 * 1024)
                            ).toFixed(2)}{" "}
                            MB
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Consent Checkbox */}
                  <div className="flex items-start gap-2.5 pt-1">
                    <input
                      type="checkbox"
                      id="quote-agreed"
                      name="agreed"
                      checked={formData.agreed}
                      onChange={handleInputChange}
                      required
                      className="w-4 h-4 mt-0.5 accent-red-600 rounded cursor-pointer"
                    />
                    <label
                      htmlFor="quote-agreed"
                      className="text-xs text-zinc-600 leading-snug cursor-pointer"
                    >
                      {isArabic ? (
                        <>
                          أوافق على التواصل معي بخصوص هذا الطلب وعرض الأسعار.{" "}
                          <span className="text-red-500">*</span>
                        </>
                      ) : (
                        <>
                          I agree to be contacted regarding my quote request.{" "}
                          <span className="text-red-500">*</span>
                        </>
                      )}
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-red-600 hover:bg-red-700 active:scale-[0.99] text-white font-bold text-sm sm:text-base py-3.5 sm:py-4 rounded-full shadow-lg shadow-red-600/25 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>
                            {isArabic ? "جاري إرسال الطلب..." : "Submitting Quote Request..."}
                          </span>
                        </>
                      ) : (
                        <>
                          <span>
                            {isArabic ? "إرسال طلب عرض السعر" : "Request Instant Quote"}
                          </span>
                          {isArabic ? (
                            <ArrowLeft className="w-4 h-4" />
                          ) : (
                            <ArrowRight className="w-4 h-4" />
                          )}
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          3. FAQ SECTION (6 ITEMS - TAJ AL RAHMAH ACCORDION STYLE)
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full py-16 md:py-20 bg-white border-t border-zinc-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-10 sm:mb-14">
            <div className="flex items-center justify-center gap-2.5 mb-2.5">
              <span className="w-6 h-[2px] bg-red-600 rounded-full" />
              <span className="text-xs sm:text-[13px] font-extrabold tracking-[0.2em] text-red-600 uppercase">
                {isArabic ? "الأسئلة الشائعة" : "FAQ"}
              </span>
              <span className="w-6 h-[2px] bg-red-600 rounded-full" />
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-950 tracking-tight mb-3">
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

            <p className="text-zinc-500 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
              {isArabic
                ? "إجابات واضحة ومباشرة حول خدمات صيانة السيارات، الضمان، قطع الغيار، والأسعار في ورشة باب البستان بالشارقة."
                : "Find clear answers to common questions about our vehicle maintenance, repair procedures, warranties, and pricing."}
            </p>
          </div>

          {/* 6 Accordion FAQ Cards */}
          <div className="space-y-3.5 sm:space-y-4">
            {faqs.map((faq, idx) => (
              <FaqAccordionItem
                key={idx}
                number={idx + 1}
                question={faq.q}
                answer={faq.a}
                isOpen={openFaqIndex === idx}
                onToggle={() => toggleFaq(idx)}
                isArabic={isArabic}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          4. TALK TO OUR SENIOR ADVISORS CALLOUT BANNER
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full py-12 md:py-16 lg:py-20 bg-[#fafafa]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="relative w-full rounded-[28px] lg:rounded-[36px] overflow-hidden shadow-2xl border border-zinc-800 bg-[#0c0c0c] p-8 sm:p-12 lg:p-14 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Heading + Subtitle + Action Button */}
              <div className="lg:col-span-7">
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="w-5 h-[2px] bg-red-600" />
                  <span className="text-xs font-extrabold tracking-[0.2em] text-red-500 uppercase">
                    {isArabic ? "هل تحتاج إلى استشارة عاجلة؟" : "NEED IMMEDIATE GUIDANCE?"}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-3">
                  {isArabic
                    ? "تحدث مباشرة مع مشرف الصيانة الأول"
                    : "Talk Directly with Our Senior Workshop Advisor"}
                </h3>

                <p className="text-zinc-400 text-xs sm:text-sm lg:text-[15px] leading-relaxed mb-6 max-w-xl">
                  {isArabic
                    ? "هل لديك عطل مفاجئ أو استفسار حول تكلفة إصلاح سيارتك؟ تواصل مباشرة مع فريقنا الفني للحصول على تقييم سريع ونصائح ميكانيكية فورية."
                    : "Have an urgent car breakdown or complex mechanical symptom? Speak directly with our master technician in Sharjah for immediate assistance and transparent estimates."}
                </p>

                <div className="flex flex-wrap items-center gap-3.5">
                  <Link
                    href="/booking"
                    className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold text-xs sm:text-sm px-7 py-3.5 rounded-full shadow-lg shadow-red-600/30 transition-all duration-200 cursor-pointer"
                  >
                    <span>{isArabic ? "احجز موعد كشف" : "Book Workshop Slot"}</span>
                    {isArabic ? (
                      <ArrowLeft className="w-4 h-4" />
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )}
                  </Link>

                  <a
                    href={WORKSHOP_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 active:scale-95 text-white border border-white/20 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full transition-all duration-200"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span>{isArabic ? "مراسلة عبر واتساب" : "Chat on WhatsApp"}</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Contact Channels */}
              <div className="lg:col-span-5 space-y-4 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l rtl:lg:border-l-0 rtl:lg:border-r border-zinc-800 lg:pl-10 rtl:lg:pl-0 rtl:lg:pr-10">
                {/* Phone */}
                <a
                  href="tel:+971564406456"
                  className="flex items-center gap-3.5 p-3 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-red-600/60 transition-all group"
                >
                  <div className="w-12 h-12 rounded-full border border-red-600/40 bg-red-600/10 text-red-500 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-red-600 group-hover:text-white transition-all">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-bold text-white tracking-wide group-hover:text-red-400 transition-colors" dir="ltr">
                      +971 56 440 6456
                    </div>
                    <span className="text-[11px] text-zinc-400">
                      {isArabic ? "اتصل بمشرف الصيانة مباشرة" : "Direct Hotline (Call or WhatsApp)"}
                    </span>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:info@babalbustanuae.com"
                  className="flex items-center gap-3.5 p-3 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-red-600/60 transition-all group"
                >
                  <div className="w-12 h-12 rounded-full border border-red-600/40 bg-red-600/10 text-red-500 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-red-600 group-hover:text-white transition-all">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-bold text-white tracking-wide group-hover:text-red-400 transition-colors">
                      info@babalbustanuae.com
                    </div>
                    <span className="text-[11px] text-zinc-400">
                      {isArabic ? "أرسل تفاصيل العطل بالبريد" : "Send technical inquiry"}
                    </span>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-zinc-900/80 border border-zinc-800">
                  <div className="w-12 h-12 rounded-full border border-red-600/40 bg-red-600/10 text-red-500 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-bold text-white tracking-wide">
                      {isArabic ? "الشارقة، المنطقة الصناعية 5" : "Sharjah, Industrial Area 5"}
                    </div>
                    <span className="text-[11px] text-zinc-400">
                      {isArabic ? "موقع الورشة الرئيسي" : "Main Workshop Facility"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

