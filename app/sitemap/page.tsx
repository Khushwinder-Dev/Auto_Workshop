"use client";

import React, { useState, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Mic, MicOff, X } from "lucide-react";
import toast from "react-hot-toast";
import { useLanguage } from "@/context/LanguageContext";

interface SitemapItem {
  title: string;
  href: string;
}

interface SitemapGroup {
  id: string;
  title: string;
  mainHref: string;
  items: SitemapItem[];
}

const SITEMAP_GROUPS_EN: SitemapGroup[] = [
  {
    id: "services",
    title: "Services",
    mainHref: "/services",
    items: [
      { title: "Diagnostics & Computer Scanning", href: "/services-details?service=diagnostics" },
      { title: "Oil Change & Synthetic Lubricants", href: "/services-details?service=oil-change" },
      { title: "Brake Repair & Rotor Skimming", href: "/services-details?service=brakes" },
      { title: "Suspension & Shock Absorber Renewal", href: "/services-details?service=suspension" },
      { title: "Battery Testing & Replacement", href: "/services-details?service=battery" },
      { title: "A/C Repair & Gas Recharge", href: "/services-details?service=ac-repair" },
      { title: "Tires & Computerized Laser Alignment", href: "/services-details?service=tires" },
      { title: "Computer Programming & Key Coding", href: "/services-details?service=computer-programming" },
    ],
  },
  {
    id: "brands",
    title: "Brands We Service",
    mainHref: "/brands",
    items: [
      { title: "Mercedes-Benz & AMG Specialist Maintenance", href: "/brands" },
      { title: "BMW iDrive & TwinPower Turbo Service", href: "/brands" },
      { title: "Audi & Quattro TFSI Engine Care", href: "/brands" },
      { title: "Porsche Performance Diagnostics & PDK Service", href: "/brands" },
      { title: "Volkswagen & DSG Transmission Service", href: "/brands" },
      { title: "Land Rover & Range Rover Air Suspension Repair", href: "/brands" },
      { title: "Toyota & Lexus Hybrid Inverter Maintenance", href: "/brands" },
      { title: "Nissan Patrol V8 & CVT Gearbox Care", href: "/brands" },
      { title: "Infiniti, Honda, Mitsubishi & Suzuki", href: "/brands" },
      { title: "Ford, Chevrolet & Jeep 4x4 Drivetrain Service", href: "/brands" },
    ],
  },
  {
    id: "company",
    title: "Company",
    mainHref: "/about-us",
    items: [
      { title: "Home", href: "/" },
      { title: "About Us & Workshop Heritage", href: "/about-us" },
      { title: "All Auto Repair Services", href: "/services" },
      { title: "Car Brands Directory", href: "/brands" },
      { title: "Workshop Video Tours & Repairs", href: "/gallery" },
      { title: "Car Maintenance Blogs & UAE Tips", href: "/blogs" },
      { title: "Book Service Appointment Online", href: "/booking" },
      { title: "Contact Us & Location Map", href: "/contact" },
      { title: "Frequently Asked Questions (FAQs)", href: "/faq" },
    ],
  },
  {
    id: "blogs",
    title: "Maintenance Guides & Tips",
    mainHref: "/blogs",
    items: [
      { title: "5 Tips to Maintain Your Car AC in Sharjah Heat", href: "/blogs/car-ac-repair-sharjah-tips" },
      { title: "Best Oil Change Intervals for UAE Drivers", href: "/blogs/best-oil-change-intervals-uae" },
      { title: "Why Squeaking Brakes Should Never Be Ignored", href: "/blogs/brake-safety-check-guide" },
      { title: "How Extreme Heat Affects Car Battery Longevity", href: "/blogs" },
      { title: "Computer Diagnostic Warning Lights Explained", href: "/blogs" },
    ],
  },
  {
    id: "gallery",
    title: "Workshop Videos & Gallery",
    mainHref: "/gallery",
    items: [
      { title: "Mercedes V8 Engine Rebuild & Timing Setup", href: "/gallery" },
      { title: "Nissan Patrol AC Evaporator Core Replacement", href: "/gallery" },
      { title: "Toyota Hybrid Inverter & High Voltage Service", href: "/gallery" },
      { title: "Automated AC Refrigerant Recovery & Recharge", href: "/gallery" },
      { title: "Brake Rotor Skimming on Computerized Lathe", href: "/gallery" },
      { title: "Workshop Tour in Sharjah Industrial Area 5", href: "/gallery" },
    ],
  },
  {
    id: "support",
    title: "Support & Contact",
    mainHref: "/contact",
    items: [
      { title: "Book Online Priority Appointment", href: "/booking" },
      { title: "Customer Service Reception & Phone Numbers", href: "/contact" },
      { title: "WhatsApp Service Advisor Direct Chat", href: "https://api.whatsapp.com/send?phone=971564406456" },
      { title: "Frequently Asked Questions", href: "/faq" },
      { title: "Privacy Policy", href: "/contact" },
      { title: "Terms & Conditions", href: "/contact" },
    ],
  },
];

const SITEMAP_GROUPS_AR: SitemapGroup[] = [
  {
    id: "services",
    title: "خدمات الصيانة والإصلاح",
    mainHref: "/services",
    items: [
      { title: "فحص وتشخيص أعطال الكمبيوتر", href: "/services-details?service=diagnostics" },
      { title: "تغيير زيت المحرك والسوائل الأصلية", href: "/services-details?service=oil-change" },
      { title: "صيانة الفرامل وخرط الديسكات", href: "/services-details?service=brakes" },
      { title: "تجديد نظام التعليق والمساعدات", href: "/services-details?service=suspension" },
      { title: "فحص واستبدال بطاريات السيارات", href: "/services-details?service=battery" },
      { title: "إصلاح المكيف وتعبئة غاز التبريد", href: "/services-details?service=ac-repair" },
      { title: "ميزان ليزر للإطارات وتركيب التواير", href: "/services-details?service=tires" },
      { title: "برمجة الكمبيوتر ونسخ المفاتيح", href: "/services-details?service=computer-programming" },
    ],
  },
  {
    id: "brands",
    title: "الماركات التي نخدمها",
    mainHref: "/brands",
    items: [
      { title: "صيانة متخصصة لسيارات مرسيدس بنز و AMG", href: "/brands" },
      { title: "خدمة سيارات بي إم دبليو ومحركات TwinPower Turbo", href: "/brands" },
      { title: "عناية محركات أودي وكواترو TFSI", href: "/brands" },
      { title: "فحص أداء بورشه وصيانة ناقل PDK", href: "/brands" },
      { title: "صيانة فولكس فاجن وجير DSG", href: "/brands" },
      { title: "إصلاح نظام التعليق الهوائي لاند روفر ورينج روفر", href: "/brands" },
      { title: "صيانة محول الهايبرد تويوتا ولكزس", href: "/brands" },
      { title: "عناية نيسان باترول V8 وناقل الحركة CVT", href: "/brands" },
      { title: "إنفينيتي وهوندا وميتسوبيشي وسوزوكي", href: "/brands" },
      { title: "صيانة سيارات الدفع الرباعي فورد وشفروليه وجيب", href: "/brands" },
    ],
  },
  {
    id: "company",
    title: "عن الورشة",
    mainHref: "/about-us",
    items: [
      { title: "الصفحة الرئيسية", href: "/" },
      { title: "من نحن وتاريخ ورشة باب البستان", href: "/about-us" },
      { title: "جميع خدمات إصلاح السيارات", href: "/services" },
      { title: "دليل ماركات السيارات المعتمدة", href: "/brands" },
      { title: "معرض الصور وفيديوهات الصيانة", href: "/gallery" },
      { title: "مقالات صيانة السيارات ونصائح الإمارات", href: "/blogs" },
      { title: "حجز موعد صيانة أونلاين", href: "/booking" },
      { title: "اتصل بنا وخريطة الموقع", href: "/contact" },
      { title: "الأسئلة الشائعة (FAQ)", href: "/faq" },
    ],
  },
  {
    id: "blogs",
    title: "أدلة ونصائح الصيانة",
    mainHref: "/blogs",
    items: [
      { title: "٥ نصائح للحفاظ على مكيف سيارتك في حرارة الشارقة", href: "/blogs/car-ac-repair-sharjah-tips" },
      { title: "أفضل فترات تغيير زيت المحرك لسائقي الإمارات", href: "/blogs/best-oil-change-intervals-uae" },
      { title: "لماذا لا يجب تجاهل صوت صرير الفرامل أبداً", href: "/blogs/brake-safety-check-guide" },
      { title: "كيف تؤثر درجات الحرارة العالية على عمر البطارية", href: "/blogs" },
      { title: "شرح لمبات تحذير لوحة العدادات وتشخيص الأعطال", href: "/blogs" },
    ],
  },
  {
    id: "gallery",
    title: "فيديوهات ومعرض الورشة",
    mainHref: "/gallery",
    items: [
      { title: "توضيب محرك مرسيدس V8 وضبط التايمنج", href: "/gallery" },
      { title: "استبدال ثلاجة مكيف نيسان باترول", href: "/gallery" },
      { title: "صيانة محول الهايبرد تويوتا والجهد العالي", href: "/gallery" },
      { title: "سحب وإعادة شحن غاز المكيف الأوتوماتيكي", href: "/gallery" },
      { title: "خرط ديسكات الفرامل على مخرطة مبرمجة", href: "/gallery" },
      { title: "جولة في ورشتنا بالمنطقة الصناعية 5، الشارقة", href: "/gallery" },
    ],
  },
  {
    id: "support",
    title: "الدعم والتواصل",
    mainHref: "/contact",
    items: [
      { title: "حجز موعد ذو أولوية أونلاين", href: "/booking" },
      { title: "أرقام هواتف الاستقبال وخدمة العملاء", href: "/contact" },
      { title: "محادثة مباشرة مع مستشار الصيانة عبر واتساب", href: "https://api.whatsapp.com/send?phone=971564406456" },
      { title: "الأسئلة الأكثر تكراراً", href: "/faq" },
      { title: "سياسة الخصوصية", href: "/contact" },
      { title: "الشروط والأحكام", href: "/contact" },
    ],
  },
];

export default function SitemapPage() {
  const { isArabic } = useLanguage();
  const rawGroups = isArabic ? SITEMAP_GROUPS_AR : SITEMAP_GROUPS_EN;

  const [searchQuery, setSearchQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const handleVoiceSearch = () => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error(
        isArabic
          ? "البحث الصوتي غير مدعوم في هذا المتصفح."
          : "Voice search is not supported in this browser."
      );
      return;
    }

    if (isListening) {
      try {
        recognitionRef.current?.stop();
      } catch {}
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = isArabic ? "ar-AE" : "en-US";

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        const transcript = event.results?.[0]?.[0]?.transcript;
        if (transcript) {
          setSearchQuery(transcript);
        }
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const filteredGroups = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return rawGroups;

    return rawGroups
      .map((group) => {
        const groupMatches = group.title.toLowerCase().includes(q);

        if (groupMatches) {
          return group;
        }

        const matchingItems = group.items.filter(
          (item) =>
            item.title.toLowerCase().includes(q) ||
            item.href.toLowerCase().includes(q)
        );

        return {
          ...group,
          items: matchingItems,
        };
      })
      .filter((group) => group.items.length > 0);
  }, [searchQuery, rawGroups]);

  const totalMatchingCount = useMemo(() => {
    return filteredGroups.reduce((acc, g) => acc + g.items.length, 0);
  }, [filteredGroups]);

  return (
    <main className="min-h-screen bg-white">
      <section className="relative w-full h-[55vh] min-h-[420px] overflow-hidden flex flex-col bg-black">
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
              <span className="text-white">{isArabic ? "خريطة" : "HTML"} </span>
              <span className="text-[#e11d23]">{isArabic ? "الموقع" : "Sitemap"}</span>
            </h1>
          </div>
          <p
            data-aos="fade-up"
            data-aos-delay="400"
            className="max-w-xl text-gray-300 text-sm md:text-base font-medium tracking-wide opacity-90"
          >
            {isArabic
              ? "دليل شامل لجميع خدمات إصلاح السيارات، وماركات السيارات، ونصائح الصيانة، وبوابات العملاء."
              : "Complete directory of all auto repair services, car brands, maintenance tips, and customer portals."}
          </p>

          <div className="mt-6 flex items-center gap-2 text-xs font-bold text-gray-400">
            <Link href="/" className="hover:text-white transition-colors">
              {isArabic ? "الرئيسية" : "Home"}
            </Link>
            <span>/</span>
            <span className="text-red-500">{isArabic ? "خريطة الموقع" : "Sitemap"}</span>
          </div>
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20">
        <div className="max-w-2xl mx-auto mb-14 sm:mb-16">
          <div className="relative">
            <div
              className={`absolute inset-y-0 ${
                isArabic ? "right-0 pr-4" : "left-0 pl-4"
              } flex items-center pointer-events-none text-red-600`}
            >
              <Search className="w-5 h-5 stroke-[2.2]" />
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isArabic ? "ابحث في روابط خريطة الموقع..." : "Search sitemap links..."
              }
              className={`w-full py-3.5 sm:py-4 text-sm sm:text-base rounded-full border border-zinc-300 hover:border-red-500 bg-white text-zinc-900 shadow-sm transition-all outline-none focus:border-red-600 focus:ring-4 focus:ring-red-600/15 placeholder:text-zinc-400 ${
                isArabic ? "pr-11 pl-20 text-right" : "pl-11 pr-20 text-left"
              }`}
            />

            <div
              className={`absolute inset-y-0 ${
                isArabic ? "left-0 pl-4" : "right-0 pr-4"
              } flex items-center gap-1.5`}
            >
              <button
                type="button"
                onClick={handleVoiceSearch}
                className={`p-1.5 rounded-full transition-all cursor-pointer ${
                  isListening
                    ? "bg-red-600 text-white animate-pulse shadow-md shadow-red-600/40"
                    : "text-zinc-400 hover:text-red-600 hover:bg-red-50"
                }`}
                title={isArabic ? "البحث الصوتي" : "Voice Search"}
                aria-label="Voice search"
              >
                {isListening ? (
                  <MicOff className="w-4 h-4" />
                ) : (
                  <Mic className="w-4 h-4" />
                )}
              </button>

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer p-1"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {searchQuery.trim() && (
            <div className="mt-3 flex items-center justify-between text-xs sm:text-sm text-zinc-600 px-2">
              <span>
                {isArabic
                  ? `تم العثور على ${totalMatchingCount} رابط لـ "${searchQuery}"`
                  : `Found ${totalMatchingCount} link${totalMatchingCount === 1 ? "" : "s"} matching "${searchQuery}"`}
              </span>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-red-600 hover:text-red-700 hover:underline font-semibold cursor-pointer"
              >
                {isArabic ? "إعادة الضبط" : "Reset search"}
              </button>
            </div>
          )}
        </div>

        {filteredGroups.length === 0 ? (
          <div className="py-16 text-center max-w-md mx-auto">
            <div className="w-14 h-14 rounded-full bg-zinc-100 flex items-center justify-center mx-auto text-zinc-400 mb-4">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900">
              {isArabic ? "لم يتم العثور على روابط مطابقة" : "No matching links found"}
            </h3>
            <p className="mt-1.5 text-sm text-zinc-500 leading-relaxed">
              {isArabic
                ? `لم تطابق أي روابط في خريطة الموقع كلمة "${searchQuery}". يرجى تجربة كلمة أخرى.`
                : `No links in the sitemap matched "${searchQuery}". Please try searching with a different keyword.`}
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="mt-5 px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-md shadow-red-600/30"
            >
              {isArabic ? "عرض جميع الروابط" : "Show All Links"}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-y-10 sm:gap-y-12">
            {filteredGroups.map((group) => (
              <div key={group.id} className="flex flex-col">
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-red-600 mb-3.5">
                  <Link
                    href={group.mainHref}
                    className="hover:text-red-700 transition-colors"
                  >
                    {group.title}
                  </Link>
                </h2>

                <ul className="space-y-2.5 sm:space-y-3">
                  {group.items.map((item, idx) => (
                    <li key={idx}>
                      <Link
                        href={item.href}
                        className="text-zinc-700 hover:text-red-600 hover:underline text-[15px] sm:text-[15.5px] leading-snug inline-block transition-colors font-medium"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
