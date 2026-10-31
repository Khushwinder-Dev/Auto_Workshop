"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Mic,
  MicOff,
  ArrowRight,
  ChevronRight,
  X,
  Wrench,
  Cpu,
  Droplets,
  ShieldCheck,
  Car,
  Disc,
  Fan,
  Code,
  FileText,
  Video,
  HelpCircle,
  Sparkles,
  Send,
  MessageCircle,
  Calendar,
  PhoneCall,
  CheckCircle2,
} from "lucide-react";
import { SITE_SEARCH_INDEX, SearchResultItem } from "@/data/searchIndex";
import { getWorkshopServices, WORKSHOP_INFO } from "@/data/workshopData";
import { useLanguage } from "@/context/LanguageContext";
import toast from "react-hot-toast";
import { createPortal } from "react-dom";

interface SpeechRecognitionEvent {
  results: {
    [key: number]: {
      [key: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognitionConstructor {
  new(): SpeechRecognitionInstance;
}

interface SpeechRecognitionInstance {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: (() => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

interface ExpandableSearchBarProps {
  onSearch?: (query: string, href?: string) => void;
  placeholder?: string;
  suggestions?: string[];
  className?: string;
  iconColor?: string;
  hoverIconColor?: string;
  dashedButton?: boolean;
  isDrawer?: boolean;
  onCloseMenu?: () => void;
  isScrolled?: boolean;
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Service: { bg: "bg-red-50", text: "text-red-600", border: "border-red-200" },
  Brand: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  Blog: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  Video: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
  FAQ: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  Page: { bg: "bg-zinc-100", text: "text-zinc-700", border: "border-zinc-200" },
};

type FilterCategory = "all" | "services" | "brands" | "blogs" | "videos" | "faqs";

const FILTER_TABS: { key: FilterCategory; labelEn: string; labelAr: string }[] = [
  { key: "all", labelEn: "All", labelAr: "الكل" },
  { key: "services", labelEn: "Services", labelAr: "الخدمات" },
  { key: "brands", labelEn: "Brands", labelAr: "الماركات" },
  { key: "blogs", labelEn: "Guides & Tips", labelAr: "نصائح وإرشادات" },
  { key: "videos", labelEn: "Videos", labelAr: "الفيديوهات" },
  { key: "faqs", labelEn: "FAQs", labelAr: "الأسئلة الشائعة" },
];

const SERVICE_META: Record<
  string,
  {
    icon: React.ComponentType<{ className?: string }>;
    tagEn: string;
    tagAr: string;
  }
> = {
  diagnostics: {
    icon: Cpu,
    tagEn: "ECU & Sensors",
    tagAr: "فحص وبرمجة",
  },
  "oil-change": {
    icon: Droplets,
    tagEn: "Express Lube",
    tagAr: "صيانة دورية",
  },
  brakes: {
    icon: Disc,
    tagEn: "Brakes & Rotors",
    tagAr: "فرامل ودسكات",
  },
  suspension: {
    icon: Car,
    tagEn: "Struts & Bushings",
    tagAr: "مساعدات ومقصات",
  },
  battery: {
    icon: Wrench,
    tagEn: "Battery & Alternator",
    tagAr: "كهرباء وبطاريات",
  },
  "ac-repair": {
    icon: Fan,
    tagEn: "Cooling & Freon",
    tagAr: "تكييف وتبريد",
  },
  tires: {
    icon: ShieldCheck,
    tagEn: "Tires & Balancing",
    tagAr: "إطارات وميزان",
  },
  "computer-programming": {
    icon: Code,
    tagEn: "Coding & Keys",
    tagAr: "برمجة ومفاتيح",
  },
};

interface MostUsedItem {
  titleEn: string;
  titleAr: string;
  categoryEn: string;
  categoryAr: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const MOST_USED_BY_TAB: Record<FilterCategory, MostUsedItem[]> = {
  all: [
    {
      titleEn: "Computer Diagnostics & Scanning",
      titleAr: "فحص كمبيوتر وتشخيص الأعطال",
      categoryEn: "Diagnostics",
      categoryAr: "فحص وبرمجة",
      href: "/services-details?service=diagnostics",
      icon: Cpu,
    },
    {
      titleEn: "Premium Synthetic Oil Change",
      titleAr: "تبديل زيت المحرك والفلتر الأصلي",
      categoryEn: "Express Maintenance",
      categoryAr: "صيانة سريعة",
      href: "/services-details?service=oil-change",
      icon: Droplets,
    },
    {
      titleEn: "Brake Pad Renewal & Rotor Skimming",
      titleAr: "صيانة الفرامل وخرط الدسكات",
      categoryEn: "Brakes & Safety",
      categoryAr: "فرامل ودسكات",
      href: "/services-details?service=brakes",
      icon: Disc,
    },
    {
      titleEn: "AC Gas Leak & Compressor Repair",
      titleAr: "تصليح وشحن مكيف السيارة",
      categoryEn: "Air Conditioning",
      categoryAr: "تكييف وتبريد",
      href: "/services-details?service=ac-repair",
      icon: Fan,
    },
    {
      titleEn: "Suspension, Bushings & Struts",
      titleAr: "صيانة نظام التعليق والمساعدات",
      categoryEn: "Chassis & Ride",
      categoryAr: "مساعدات ومقصات",
      href: "/services-details?service=suspension",
      icon: Car,
    },
    {
      titleEn: "Battery Load Testing & Replacement",
      titleAr: "فحص وتبديل بطارية السيارة",
      categoryEn: "Electrical Systems",
      categoryAr: "كهرباء وبطاريات",
      href: "/services-details?service=battery",
      icon: Wrench,
    },
    {
      titleEn: "Tire Fitting & Laser Alignment",
      titleAr: "تبديل وميزان الإطارات بالليزر",
      categoryEn: "Tires & Balancing",
      categoryAr: "إطارات وميزان",
      href: "/services-details?service=tires",
      icon: ShieldCheck,
    },
    {
      titleEn: "ECU Programming & Smart Key Coding",
      titleAr: "برمجة كمبيوتر ومفاتيح السيارات",
      categoryEn: "Software & Coding",
      categoryAr: "برمجة ومفاتيح",
      href: "/services-details?service=computer-programming",
      icon: Code,
    },
  ],
  services: [
    {
      titleEn: "Computer Diagnostics & Scanning",
      titleAr: "فحص كمبيوتر وتشخيص الأعطال",
      categoryEn: "Diagnostics",
      categoryAr: "فحص وبرمجة",
      href: "/services-details?service=diagnostics",
      icon: Cpu,
    },
    {
      titleEn: "Premium Synthetic Oil Change",
      titleAr: "تبديل زيت المحرك والفلتر الأصلي",
      categoryEn: "Express Maintenance",
      categoryAr: "صيانة سريعة",
      href: "/services-details?service=oil-change",
      icon: Droplets,
    },
    {
      titleEn: "Brake Pad Renewal & Rotor Skimming",
      titleAr: "صيانة الفرامل وخرط الدسكات",
      categoryEn: "Brakes & Safety",
      categoryAr: "فرامل ودسكات",
      href: "/services-details?service=brakes",
      icon: Disc,
    },
    {
      titleEn: "Suspension, Bushings & Struts",
      titleAr: "صيانة نظام التعليق والمساعدات",
      categoryEn: "Chassis & Ride",
      categoryAr: "مساعدات ومقصات",
      href: "/services-details?service=suspension",
      icon: Car,
    },
    {
      titleEn: "Battery Load Testing & Replacement",
      titleAr: "فحص وتبديل بطارية السيارة",
      categoryEn: "Electrical Systems",
      categoryAr: "كهرباء وبطاريات",
      href: "/services-details?service=battery",
      icon: Wrench,
    },
    {
      titleEn: "AC Gas Leak & Compressor Repair",
      titleAr: "تصليح وشحن مكيف السيارة",
      categoryEn: "Air Conditioning",
      categoryAr: "تكييف وتبريد",
      href: "/services-details?service=ac-repair",
      icon: Fan,
    },
    {
      titleEn: "Tire Fitting & Laser Alignment",
      titleAr: "تبديل وميزان الإطارات بالليزر",
      categoryEn: "Tires & Balancing",
      categoryAr: "إطارات وميزان",
      href: "/services-details?service=tires",
      icon: ShieldCheck,
    },
    {
      titleEn: "ECU Programming & Smart Key Coding",
      titleAr: "برمجة كمبيوتر ومفاتيح السيارات",
      categoryEn: "Software & Coding",
      categoryAr: "برمجة ومفاتيح",
      href: "/services-details?service=computer-programming",
      icon: Code,
    },
  ],
  brands: [
    {
      titleEn: "Mercedes-Benz & AMG Specialist Service",
      titleAr: "صيانة مرسيدس بنز و AMG",
      categoryEn: "German Cars",
      categoryAr: "سيارات ألمانية",
      href: "/brands",
      icon: Car,
    },
    {
      titleEn: "BMW TwinPower Turbo & iDrive Service",
      titleAr: "صيانة بي ام دبليو ونظام iDrive",
      categoryEn: "German Cars",
      categoryAr: "سيارات ألمانية",
      href: "/brands",
      icon: Car,
    },
    {
      titleEn: "Toyota & Lexus Hybrid Diagnostic Service",
      titleAr: "صيانة تويوتا ولكزس وأنظمة الهايبرد",
      categoryEn: "Japanese Cars",
      categoryAr: "سيارات يابانية",
      href: "/brands",
      icon: Car,
    },
    {
      titleEn: "Nissan Patrol V8 & CVT Transmission Repair",
      titleAr: "صيانة نيسان باترول V8 وجير CVT",
      categoryEn: "Japanese Cars",
      categoryAr: "سيارات يابانية",
      href: "/brands",
      icon: Car,
    },
  ],
  blogs: [
    {
      titleEn: "5 Tips to Maintain Your Car AC in Sharjah Heat",
      titleAr: "٥ نصائح للحفاظ على مكيف سيارتك في صيف الشارقة",
      categoryEn: "Maintenance Guide",
      categoryAr: "دليل الصيانة",
      href: "/blogs/car-ac-repair-sharjah-tips",
      icon: FileText,
    },
    {
      titleEn: "Best Oil Change Intervals for UAE Drivers",
      titleAr: "أفضل مواعيد لتبديل زيت المحرك في الإمارات",
      categoryEn: "Repair Advice",
      categoryAr: "نصائح وإرشادات",
      href: "/blogs/best-oil-change-intervals-uae",
      icon: FileText,
    },
    {
      titleEn: "Why Squeaking Brakes Should Never Be Ignored",
      titleAr: "لماذا يجب عدم تجاهل صوت صرير الفرامل",
      categoryEn: "Safety Guide",
      categoryAr: "دليل السلامة",
      href: "/blogs/brake-safety-check-guide",
      icon: FileText,
    },
  ],
  videos: [
    {
      titleEn: "Mercedes V8 Engine Rebuild & Timing Chain",
      titleAr: "توضيب محرك مرسيدس V8 وضبط الجنزير",
      categoryEn: "Engine Tour",
      categoryAr: "فيديوهات المحرك",
      href: "/gallery",
      icon: Video,
    },
    {
      titleEn: "Nissan Patrol AC Evaporator Replacement",
      titleAr: "تبديل ثلاجة مكيف نيسان باترول",
      categoryEn: "AC Service",
      categoryAr: "تكييف السيارة",
      href: "/gallery",
      icon: Video,
    },
    {
      titleEn: "Brake Rotor Skimming on Computer Lathe",
      titleAr: "خرط أقراص الفرامل بالمخرطة الرقمية",
      categoryEn: "Workshop Demo",
      categoryAr: "فيديو الورشة",
      href: "/gallery",
      icon: Video,
    },
  ],
  faqs: [
    {
      titleEn: "Where is the workshop located in Sharjah?",
      titleAr: "أين تقع الورشة في الشارقة؟",
      categoryEn: "Location & Hours",
      categoryAr: "الموقع وأوقات العمل",
      href: "/faqs",
      icon: HelpCircle,
    },
    {
      titleEn: "Do you offer upfront estimates before repairs?",
      titleAr: "هل تقدمون كشف أسعار مسبق قبل البدء؟",
      categoryEn: "Pricing & Quotes",
      categoryAr: "الأسعار وعروض الأسعار",
      href: "/faqs",
      icon: HelpCircle,
    },
    {
      titleEn: "What warranty do you provide on repair work?",
      titleAr: "ما هو الضمان المقدم على قطع الغيار والإصلاح؟",
      categoryEn: "Warranty Terms",
      categoryAr: "شروط الضمان",
      href: "/faqs",
      icon: HelpCircle,
    },
  ],
};

const AI_PRESET_QUESTIONS = [
  {
    en: "Why is my car AC blowing warm air in the UAE summer heat?",
    ar: "لماذا يخرج هواء ساخن من مكيف السيارة في حرارة الصيف؟",
    ansEn:
      "Warm air usually points to a refrigerant (gas) leak, a malfunctioning AC compressor clutch, or a severely clogged cabin filter / condenser. At Bab Al Bustan, we conduct a precision UV dye leak inspection, vacuum the system, and recharge with genuine R134a/R1234yf gas to restore ice-cold cooling.",
    ansAr:
      "خروج الهواء الساخن يعود غالباً لتسريب في غاز المكيف، أو ضعف في كمبريسور التكييف، أو انسداد فلتر المكيف ومبرد الرديتر. نقوم في كراج باب البستان بفحص التسريب بالأشعة فوق البنفسجية وشحن الغاز المعتمد لضمان أعلى كفاءة تبريد.",
  },
  {
    en: "How often should I change engine oil under UAE climate conditions?",
    ar: "كم المسافة الموصى بها لتبديل زيت المحرك في ظروف قيادة الإمارات؟",
    ansEn:
      "Due to extreme ambient temperatures, desert dust, and heavy stop-and-go traffic, we strongly recommend changing fully synthetic oil every 7,000 to 10,000 KM (or 5,000 KM for semi-synthetic/severe conditions). Always change the OEM oil filter simultaneously to prevent sludge buildup.",
    ansAr:
      "نظراً لحرارة الطقس العالية والازدحام المروري في الدولة، نوصي بتبديل الزيت التخليقي الكامل كل ٧,٠٠٠ إلى ١٠,٠٠٠ كم مع استبدال الفلتر الأصلي دائماً لحماية المحرك من الرواسب والحرارة الزائدة.",
  },
  {
    en: "Why do my car brakes squeak and how do you repair them?",
    ar: "لماذا تصدر الفرامل صوت صرير وما هي طريقة تصليحها؟",
    ansEn:
      "Squeaking occurs when brake pads wear down to their safety acoustic indicators, or when brake rotors become grooved and warped. We perform precision on-car rotor skimming to eliminate vibrations and install high-grade ceramic or OEM brake pads with a 6-month warranty.",
    ansAr:
      "ينتج الصرير عند وصول فحمات الفرامل للحد الأدنى من السماكة أو بسبب وجود تموجات وخدوش في دسكات الفرامل. نقوم بخرط الدسكات بدقة إلكترونية وتركيب سفايف سيراميك أصلية خالية من الضجيج مع ضمان السلامة.",
  },
  {
    en: "Can your workshop diagnose and program German cars like Mercedes & BMW?",
    ar: "هل تستطيعون فحص وبرمجة السيارات الألمانية مثل مرسيدس وبي ام دبليو؟",
    ansEn:
      "Yes, absolutely. We operate official dealership-grade diagnostic software (such as Mercedes Star Diagnostic, BMW ISTA/iDrive, and VAG-COM for Audi/VW). We can read live module data, clear check-engine trouble codes, perform adaptation resets, and program keys.",
    ansAr:
      "نعم بكل تأكيد. ورشتنا مجهزة بأحدث برامج فحص الوكالات للسيارات الألمانية (Star لمرسيدس، ISTA لـ BMW، و VAG لأودي وبورشه) لقراءة الحساسات، وبرمجة وحدات ECU، وإلغاء لمبة الفحص بدقة متناهية.",
  },
];

export default function ExpandableSearchBar({
  onSearch,
  placeholder,
  className = "",
  iconColor = "text-white",
  hoverIconColor = "hover:text-red-500",
  dashedButton = false,
  isDrawer = false,
  onCloseMenu,
  isScrolled = false,
}: ExpandableSearchBarProps) {
  const router = useRouter();
  const { isArabic } = useLanguage();
  const isAr = isArabic;

  const [isExpanded, setIsExpanded] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<FilterCategory>("all");
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Ask AI Modal State
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Check speech recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      setSpeechSupported(!!SpeechRecognition);
    }
  }, []);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsExpanded((prev) => {
          if (!prev) {
            setTimeout(() => inputRef.current?.focus(), 150);
            return true;
          }
          return false;
        });
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  // Outside click listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        handleCollapse();
      }
    };

    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);

  const handleExpand = () => {
    setIsExpanded(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 150);
  };

  const handleCollapse = () => {
    setIsExpanded(false);
    if (!isDrawer) {
      setSearchQuery("");
    }
    setActiveTab("all");
  };

  const handleClearQuery = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSearchQuery("");
    inputRef.current?.focus();
  };

  // Dynamically get services from workshopData
  const workshopServices = useMemo(() => {
    return getWorkshopServices(isAr);
  }, [isAr]);

  // Filter search results dynamically
  const filteredResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];

    const scored: { item: SearchResultItem; score: number }[] = [];

    SITE_SEARCH_INDEX.forEach((item) => {
      const name = item.name.toLowerCase();
      const nameAr = item.nameAr ? item.nameAr.toLowerCase() : "";
      const desc = item.desc ? item.desc.toLowerCase() : "";
      const descAr = item.descAr ? item.descAr.toLowerCase() : "";
      const cat = item.category.toLowerCase();
      const kwMatch = item.keywords.some((k) => k.toLowerCase().includes(query));

      let score = 0;
      if (name === query || nameAr === query) {
        score += 150;
      } else if (name.startsWith(query) || nameAr.startsWith(query)) {
        score += 90;
      } else if (name.includes(query) || nameAr.includes(query)) {
        score += 60;
      } else if (kwMatch) {
        score += 35;
      } else if (desc.includes(query) || descAr.includes(query)) {
        score += 20;
      } else if (cat.includes(query)) {
        score += 15;
      }

      // Prioritize Services in search suggestions
      if (item.category === "Service" && score > 0) {
        score += 25;
      }

      if (score > 0) {
        scored.push({ item, score });
      }
    });

    scored.sort((a, b) => b.score - a.score);
    const allMatched = scored.map((s) => s.item);

    const filtered = allMatched.filter((it) => {
      if (activeTab === "all") return true;
      if (activeTab === "services") return it.category === "Service";
      if (activeTab === "brands") return it.category === "Brand";
      if (activeTab === "blogs") return it.category === "Blog";
      if (activeTab === "videos") return it.category === "Video";
      if (activeTab === "faqs") return it.category === "FAQ";
      return true;
    });

    return filtered.slice(0, 10);
  }, [searchQuery, activeTab]);

  const handleSelectResult = (item: SearchResultItem) => {
    if (onSearch) {
      onSearch(item.name, item.href);
    }
    router.push(item.href);
    handleCollapse();
    onCloseMenu?.();
  };

  const handleExecuteSearch = (q: string) => {
    const query = q.trim();
    if (!query) return;

    if (filteredResults.length > 0) {
      handleSelectResult(filteredResults[0]);
      return;
    }

    const lower = query.toLowerCase();
    let target = "/services";
    if (lower.includes("book") || lower.includes("appoint") || lower.includes("حجز")) target = "/booking";
    else if (lower.includes("brand") || lower.includes("mercedes") || lower.includes("bmw") || lower.includes("toyota") || lower.includes("ماركة")) target = "/brands";
    else if (lower.includes("video") || lower.includes("gallery") || lower.includes("فيديو")) target = "/gallery";
    else if (lower.includes("blog") || lower.includes("tip") || lower.includes("مقال")) target = "/blogs";
    else if (lower.includes("faq") || lower.includes("question") || lower.includes("سؤال")) target = "/faqs";
    else if (lower.includes("contact") || lower.includes("phone") || lower.includes("اتصال")) target = "/contact";
    else if (lower.includes("about") || lower.includes("workshop") || lower.includes("من نحن")) target = "/about-us";

    if (onSearch) {
      onSearch(query, target);
    }
    router.push(target);
    handleCollapse();
    onCloseMenu?.();
  };

  const handleVoiceSearch = () => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error(
        isAr
          ? "خاصية الإدخال الصوتي غير مدعومة في هذا المتصفح. يرجى استخدام Chrome أو Edge أو Safari."
          : "Voice search is not supported in this browser. Please use Chrome, Edge, or Safari.",
        { duration: 4000 }
      );
      return;
    }

    if (isListening) {
      try {
        recognitionRef.current?.stop();
      } catch { }
      setIsListening(false);
      return;
    }

    try {
      const recognition: SpeechRecognitionInstance = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = isAr ? "ar-AE" : "en-US";

      recognition.onstart = () => {
        setIsListening(true);
      };
      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setSearchQuery(transcript);
          setIsListening(false);
          handleExecuteSearch(transcript);
        }
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ? (
              <mark key={i} className="bg-red-100 text-red-600 font-bold rounded-xs px-0.5">
                {part}
              </mark>
              ) : (
              part
              )
        )}
            </>
          );
  };

  const handleAskAiSubmit = (q: string) => {
    const question = q.trim();
        if (!question) return;

        const matched = AI_PRESET_QUESTIONS.find(
      (p) =>
        p.en.toLowerCase().includes(question.toLowerCase()) ||
        p.ar.includes(question)
        );

        if (matched) {
          setAiResponse(isAr ? matched.ansAr : matched.ansEn);
    } else {
          setAiResponse(
            isAr
              ? "شكراً لسؤالك! ينصح فنيو كراج باب البستان بفحص المركبة في مركزنا بالشارقة (المنطقة الصناعية 5). نقدم فحص كمبيوتر مجاني مع كشف أسعار مسبق. يمكنك حجز موعد فحص فوري أو مراسلتنا عبر واتساب."
              : "Thank you for your question! Our certified master technicians at Bab Al Bustan recommend bringing your vehicle to our Sharjah workshop (Industrial Area 5) for a free computerized health scan and written estimate. Book an inspection or chat with our service advisors on WhatsApp."
          );
    }
  };

        const mostUsedItems = MOST_USED_BY_TAB[activeTab] || MOST_USED_BY_TAB.all;
        const defaultPlaceholder = isAr ? "بحث" : "Search";

        return (
        <div
          ref={containerRef}
          className={`relative z-40 ${className}`}
          dir={isAr ? "rtl" : "ltr"}
        >
          {/* ─── TRIGGER BUTTONS ──────────────────────────────────── */}
          {!isDrawer ? (
            <div className="flex items-center">
              {dashedButton ? (
                <button
                  type="button"
                  onClick={() => {
                    if (isExpanded) {
                      handleCollapse();
                    } else {
                      handleExpand();
                    }
                  }}
                  className="flex items-center gap-2 border border-dashed border-red-500/40 hover:border-red-500 bg-white hover:bg-zinc-50 text-zinc-800 rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-300 shadow-xs cursor-pointer group"
                  title="Search (Ctrl + K)"
                >
                  <Search className="w-3.5 h-3.5 text-red-500 group-hover:scale-110 transition-transform" />
                    <span className="text-zinc-600 group-hover:text-zinc-900 transition-colors">
                      {placeholder || defaultPlaceholder}
                    </span>
                      <kbd className="hidden md:inline-block ml-1 text-[10px] text-zinc-500 bg-zinc-100 px-1.5 py-0.5 rounded border border-zinc-200 font-mono">
                        Ctrl K
                      </kbd>
                    </button>
                    ) : (
                    <button
                      type="button"
                      onClick={() => {
                        if (isExpanded) {
                          handleCollapse();
                        } else {
                          handleExpand();
                        }
                      }}
                      className={`${iconColor} ${hoverIconColor} p-2 transition-all cursor-pointer hover:bg-white/10 rounded-full`}
                      aria-label={isExpanded ? "Close search" : "Open search"}
                      title="Search (Ctrl + K)"
                    >
                      {isExpanded ? (
                        <X className="h-6 w-6 stroke-2 text-red-500" />
                      ) : (
                        <Search className="h-6 w-6 stroke-2" />
                      )}
                    </button>
          )}
                  </div>
                  ) : (
                  /* Mobile Drawer Trigger Pill */
                  <div className="relative w-full">
                    <button
                      type="button"
                      onClick={() => {
                        if (isExpanded) {
                          handleCollapse();
                        } else {
                          handleExpand();
                        }
                      }}
                      className="w-full flex items-center justify-between bg-white hover:bg-zinc-50 border border-zinc-200 rounded-full px-4 py-3 text-zinc-700 transition-all cursor-pointer text-xs shadow-xs group"
                    >
                      <div className="flex items-center gap-2.5">
                        <Search className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
                          <span className="text-zinc-600 group-hover:text-zinc-900 transition-colors font-medium">
                            {placeholder || defaultPlaceholder}
                          </span>
                      </div>
                        <span className="text-[10px] text-red-600 font-bold uppercase tracking-wider bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
                          Search
                        </span>
                    </button>
                  </div>
      )}

                  {/* ─── UNIFIED MEGA MENU SEARCH CARD (TAJALRAHMAH WHITE THEME) ─── */}
                  {isExpanded && (
                    <div
                      className={`${isDrawer
                          ? "relative w-full mt-3"
                          : "absolute top-full mt-3 right-0 rtl:right-auto rtl:left-0 w-[94vw] sm:w-[620px] md:w-[720px] lg:w-[780px] max-w-[800px]"
          } bg-white rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.18),0_15px_35px_rgba(220,38,38,0.06)] border border-zinc-200/90 p-5 sm:p-6 z-50 text-left rtl:text-right animate-in fade-in zoom-in-95 duration-200`}
                  onClick={(e) => e.stopPropagation()}
                  dir={isAr ? "rtl" : "ltr"}
        >
                  {/* 1. Integrated Search Input Box (Floating Pill Style with Voice Mic, NO Camera) */}
                    <div className="relative flex items-center bg-zinc-50 border-2 border-zinc-200/90 focus-within:border-red-600 focus-within:ring-4 focus-within:ring-red-600/15 rounded-2xl px-4 py-3 transition-all shadow-xs gap-3">
                      <Search className="w-5 h-5 text-red-600 shrink-0 stroke-[2.2]" />
                      <input
                        ref={inputRef}
                        type="text"
                        value={searchQuery}
                        onFocus={() => setIsInputFocused(true)}
                        onBlur={() => setIsInputFocused(false)}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleExecuteSearch(searchQuery);
                          } else if (e.key === "Escape") {
                            handleCollapse();
                          }
                        }}
                        placeholder={placeholder || defaultPlaceholder}
                        className="flex-1 bg-transparent text-sm sm:text-base text-zinc-900 placeholder-zinc-400 outline-none min-w-0 font-medium"
                      />

                      {/* Clear Query X */}
                      {searchQuery.length > 0 && (
                        <button
                          type="button"
                          onClick={handleClearQuery}
                          className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-zinc-100 rounded-full transition-colors shrink-0 cursor-pointer"
                          title={isAr ? "مسح النص" : "Clear text"}
                          aria-label="Clear text"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}

                      {/* Voice Search with Pulse Animation (No image search) */}
                      {mounted && (
                        <button
                          type="button"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={handleVoiceSearch}
                          className={`p-1.5 rounded-full transition-all shrink-0 cursor-pointer ${isListening
                                ? "bg-red-600 text-white animate-pulse shadow-md shadow-red-600/30"
                                : "text-zinc-400 hover:text-red-600 hover:bg-zinc-100"
                            }`}
                          title={
                            isListening
                              ? isAr
                                ? "جارٍ الاستماع..."
                                : "Listening..."
                              : isAr
                                ? "البحث الصوتي"
                                : "Voice search"
                          }
                          aria-label="Voice search"
                        >
                          {isListening ? (
                            <MicOff className="w-4 h-4" />
                          ) : (
                            <Mic className="w-4 h-4" />
                          )}
                        </button>
                      )}

                      {/* Close Button */}
                      <button
                        type="button"
                        onClick={handleCollapse}
                        className="p-1 text-zinc-400 hover:text-red-600 hover:bg-zinc-100 rounded-full transition-colors shrink-0 cursor-pointer"
                        title={isAr ? "إغلاق" : "Close"}
                        aria-label="Close search"
                      >
                        <X className="w-4 h-4 stroke-[2.2]" />
                      </button>
                    </div>

                    {/* 2. Section Header */}
                    <div className="mt-4 mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-600 inline-block animate-ping" />
                          <p className="text-xs font-extrabold tracking-wider uppercase text-zinc-800">
                            {searchQuery.trim() === ""
                              ? isAr
                                ? "خدمات ورشة باب البستان المعتمدة"
                                : "Popular Workshop Services"
                              : isAr
                                ? "نتائج البحث والمطابقة"
                                : "Search Suggestions & Results"}
                          </p>
                      </div>
                      {searchQuery.trim() !== "" ? (
                          <span className="text-xs text-red-600 font-bold">
                            {filteredResults.length} {isAr ? "نتيجة" : "results"}
                          </span>
                          ) : (
                          <button
                            type="button"
                            onClick={() => {
                              router.push("/services");
                              handleCollapse();
                              onCloseMenu?.();
                            }}
                            className="text-[11px] font-bold text-red-600 hover:text-red-700 transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <span>{isAr ? "عرض صفحة الخدمات" : "View Services Page"}</span>
                            <ArrowRight className="w-3 h-3 rtl:rotate-180" />
                          </button>
            )}
                        </div>

          {/* 4. Results List / Services Mega Menu Grid */}
                      <div className="flex-1 overflow-y-auto slim-scrollbar min-h-0 max-h-[340px] sm:max-h-[380px] pr-1.5 space-y-2">
                        {searchQuery.trim() === "" ? (
                          /* When query is empty: SHOW FULL SERVICES MEGA MENU */
                          activeTab === "all" || activeTab === "services" ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              {workshopServices.map((service) => {
                                const meta = SERVICE_META[service.id] || {
                                  icon: Wrench,
                                  tagEn: "Specialized Service",
                                  tagAr: "خدمة سيارات معتمدة",
                                };
                                const Icon = meta.icon;
                                const targetHref = `/services-details?service=${service.id}`;

                                return (
                                  <div
                                    key={service.id}
                                    onClick={() => {
                                      if (onSearch) {
                                        onSearch(service.title, targetHref);
                                      }
                                      router.push(targetHref);
                                      handleCollapse();
                                      onCloseMenu?.();
                                    }}
                                    className="group flex items-start gap-3 p-3 rounded-2xl bg-zinc-50/70 hover:bg-white border border-zinc-200/80 hover:border-red-600/50 hover:shadow-md transition-all duration-200 cursor-pointer shadow-2xs"
                                  >
                                      <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 border border-red-100 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600 flex items-center justify-center shrink-0 transition-all duration-200 mt-0.5 shadow-2xs">
                                        <Icon className="w-5 h-5 stroke-[2]" />
                                      </div>
                                      <div className="min-w-0 flex-1">
                                          <h5 className="text-xs sm:text-[13px] font-bold text-zinc-900 group-hover:text-red-600 transition-colors truncate mb-0.5">
                                            {service.title}
                                          </h5>
                                            <p className="text-[11px] text-zinc-500 line-clamp-1 leading-snug">
                                              {service.shortDesc}
                                            </p>
                                          </div>
                                          <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-red-600 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-all shrink-0 self-center" />
                                      </div>
                                      );
                  })}
                                    </div>
                                    ) : (
                                    /* Tab view for brands, blogs, videos, faqs */
                                    <div className="space-y-1.5">
                                      {mostUsedItems.map((item, idx) => {
                                        const Icon = item.icon;
                                        return (
                                          <div
                                            key={idx}
                                            onClick={() => {
                                              if (onSearch) {
                                                onSearch(isAr ? item.titleAr : item.titleEn, item.href);
                                              }
                                              router.push(item.href);
                                              handleCollapse();
                                              onCloseMenu?.();
                                            }}
                                            className="flex items-center justify-between p-3 rounded-2xl bg-zinc-50/70 hover:bg-white border border-zinc-200/80 hover:border-red-600/50 hover:shadow-md transition-all cursor-pointer group shadow-2xs"
                                          >
                                            <div className="flex items-center gap-3.5 min-w-0 flex-1">
                                                <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 border border-red-100 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600 flex items-center justify-center shrink-0 transition-all duration-200">
                                                  <Icon className="w-5 h-5 stroke-[2]" />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <h5 className="text-sm font-bold text-zinc-900 group-hover:text-red-600 transition-colors truncate">
                                                      {isAr ? item.titleAr : item.titleEn}
                                                    </h5>
                                                      <p className="text-xs text-zinc-500 font-medium truncate mt-0.5">
                                                        {isAr ? item.categoryAr : item.categoryEn}
                                                      </p>
                                                    </div>
                                                </div>
                                                <ChevronRight className="w-5 h-5 text-zinc-400 group-hover:text-red-600 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-all shrink-0 ml-2 rtl:ml-0 rtl:mr-2 stroke-[2.2]" />
                                              </div>
                                              );
                  })}
                                            </div>
                                            )
            ) : filteredResults.length > 0 ? (
                                            /* When searching: DISPLAY MATCHED SERVICE SUGGESTIONS & RESULTS */
                                            <div className="space-y-1.5">
                                              {filteredResults.map((item) => {
                                                const displayName = isAr && item.nameAr ? item.nameAr : item.name;
                                                const displayDesc = isAr && item.descAr ? item.descAr : item.desc;
                                                const displayCategory = isAr && item.categoryAr ? item.categoryAr : item.category;

                                                const isService = item.category === "Service";
                                                const serviceId = item.id.replace("service-", "");
                                                const meta = SERVICE_META[serviceId];
                                                const Icon = meta ? meta.icon : isService ? Wrench : item.category === "Brand" ? Car : item.category === "Blog" ? FileText : item.category === "Video" ? Video : HelpCircle;

                                                return (
                                                  <div
                                                    key={item.id}
                                                    onClick={() => handleSelectResult(item)}
                                                    className="p-3 rounded-2xl bg-zinc-50/70 hover:bg-white border border-zinc-200/80 hover:border-red-600/50 hover:shadow-md cursor-pointer transition-all duration-200 flex items-center justify-between gap-3 group shadow-2xs"
                                                  >
                                                    <div className="flex items-center gap-3.5 min-w-0 flex-1">
                                                        <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 border border-red-100 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600 flex items-center justify-center shrink-0 transition-all duration-200">
                                                          <Icon className="w-5 h-5 stroke-[2]" />
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                          <div className="flex items-center gap-2 mb-0.5">
                                                            <span
                                                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border ${
                                                                CATEGORY_COLORS[item.category]?.bg || "bg-zinc-100"
                                                              } ${
                                                                CATEGORY_COLORS[item.category]?.text || "text-zinc-700"
                                                              } ${
                                                                CATEGORY_COLORS[item.category]?.border || "border-zinc-200"
                                                              }`}
                                                            >
                                                              {displayCategory}
                                                            </span>
                                                            <h4 className="text-sm font-bold text-zinc-900 group-hover:text-red-600 transition-colors truncate">
                                                              {highlightMatch(displayName, searchQuery)}
                                                            </h4>
                                                        </div>
                                                          <p className="text-xs text-zinc-500 line-clamp-1 leading-relaxed">
                                                            {displayDesc}
                                                          </p>
                                                      </div>
                                                    </div>

                                                      <div className="flex items-center gap-1.5 shrink-0 text-red-600 text-xs font-bold group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform ml-1 rtl:ml-0 rtl:mr-1">
                                                        <span className="hidden sm:inline">
                                                          {isService
                                                            ? isAr
                                                              ? "عرض الخدمة"
                                                              : "View Service"
                                                            : isAr
                                                              ? "انتقال"
                                                              : "Open"}
                                                        </span>
                                                        <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                                                      </div>
                                                    </div>
                                                    );
                })}
                                                  </div>
                                                ) : (
                                              /* No matching results */
                                              <div className="py-8 px-4 text-center">
                                                  <p className="text-sm font-bold text-zinc-900">
                                                    {isAr ? "لم نجد نتائج لـ" : "No results for"} "{searchQuery}"
                                                  </p>
                                                    <p className="text-xs text-zinc-500 mt-1 max-w-md mx-auto">
                                                      {isAr
                                                        ? "جرّب البحث باسم إحدى خدمات الورشة (فرامل، غيار زيت، فحص كمبيوتر، مكيف، بطارية، إطارات) أو ماركة السيارة."
                                                        : "Try searching for workshop services (brakes, oil change, diagnostics, AC repair, battery, tires) or car makes."}
                                                    </p>
                                                    <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                                                      <button
                                                        type="button"
                                                        onClick={() => {
                                                          router.push("/services");
                                                          handleCollapse();
                                                          onCloseMenu?.();
                                                        }}
                                                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold rounded-full transition-colors border border-zinc-300 cursor-pointer"
                                                      >
                                                        <Wrench className="w-3.5 h-3.5 text-red-600" />
                                                        <span>{isAr ? "تصفح جميع الخدمات (8)" : "Browse All 8 Services"}</span>
                                                      </button>
                                                      <button
                                                        type="button"
                                                        onClick={() => {
                                                          router.push("/booking");
                                                          handleCollapse();
                                                          onCloseMenu?.();
                                                        }}
                                                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-full transition-colors cursor-pointer shadow-md"
                                                      >
                                                        <Calendar className="w-3.5 h-3.5" />
                                                        <span>{isAr ? "حجز موعد فحص فوري" : "Book Fast Slot"}</span>
                                                      </button>
                                                    </div>
                                                  </div>
            )}
                                              </div>

                                              {/* 5. Bottom Action Bar with AI Option (TajAlRahmah Style) */}
                                                  <div className="mt-4 pt-3.5 border-t border-zinc-200/80 flex items-center justify-between text-xs gap-3 flex-wrap">
                                                    <span className="text-xs text-zinc-600 font-medium">
                                                      {isAr ? "هل تحتاج مساعدة في تشخيص عطل سيارتك؟" : "Need help diagnosing your vehicle?"}
                                                    </span>

                                                    {/* ASK AI Assistant Button */}
                                                    <button
                                                      type="button"
                                                      onClick={() => {
                                                        if (searchQuery.trim()) {
                                                          setAiQuestion(searchQuery.trim());
                                                          handleAskAiSubmit(searchQuery.trim());
                                                        }
                                                        setShowAiModal(true);
                                                      }}
                                                      className="px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs sm:text-[13px] flex items-center gap-2 shadow-md shadow-red-600/20 hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all cursor-pointer shrink-0"
                                                    >
                                                      <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300/30" />
                                                      <span>{isAr ? "اسأل المساعد الذكي لتشخيص الأعطال" : "Ask AI Assistant"}</span>
                                                    </button>
                                                  </div>
                                              </div>
      )}

                                              {/* ─── AI ASSISTANT MODAL (PORTAL - WHITE THEME) ─────────── */}
                                              {showAiModal && mounted && createPortal(
                                                <div
                                                  className="fixed inset-0 z-[99999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
                                                  onClick={() => setShowAiModal(false)}
                                                  dir={isAr ? "rtl" : "ltr"}
                                                >
                                                  <div
                                                    className="bg-white border border-zinc-200/90 rounded-3xl p-5 sm:p-6 w-full max-w-lg shadow-[0_25px_60px_rgba(0,0,0,0.18)] flex flex-col max-h-[85vh] text-zinc-900"
                                                    onClick={(e) => e.stopPropagation()}
                                                  >
                                                      <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                                                        <div className="flex items-center gap-2.5">
                                                            <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-md shadow-red-600/30">
                                                              <Sparkles className="w-5 h-5" />
                                                            </div>
                                                            <div>
                                                                <h4 className="font-extrabold text-sm text-zinc-900">
                                                                  {isAr ? "المستشار الفني الذكي — كراج باب البستان" : "AI Master Mechanic Advisor"}
                                                                </h4>
                                                                  <p className="text-[11px] text-zinc-500">
                                                                    {isAr
                                                                      ? "إجابات فورية لأعطال وتوصيات صيانة السيارات بالشارقة"
                                                                      : "Instant answers to common car repairs in UAE climate"}
                                                                  </p>
                                                                </div>
                                                            </div>
                                                            <button
                                                              type="button"
                                                              onClick={() => setShowAiModal(false)}
                                                              className="w-7 h-7 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-800 flex items-center justify-center transition-colors cursor-pointer"
                                                            >
                                                              <X className="w-4 h-4" />
                                                            </button>
                                                          </div>

                                                          <div className="flex-1 overflow-y-auto min-h-0 py-3 space-y-3 slim-scrollbar">
                                                              <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                                                                {isAr ? "أسئلة فنية مقترحة:" : "Suggested Inquiries:"}
                                                              </p>
                                                              <div className="flex flex-col gap-1.5">
                                                                {AI_PRESET_QUESTIONS.map((preset, idx) => (
                                                                  <button
                                                                    key={idx}
                                                                    type="button"
                                                                    onClick={() => {
                                                                      setAiQuestion(isAr ? preset.ar : preset.en);
                                                                      setAiResponse(isAr ? preset.ansAr : preset.ansEn);
                                                                    }}
                                                                    className="text-left rtl:text-right text-xs text-zinc-700 bg-zinc-50 hover:bg-red-50 hover:text-red-600 p-2.5 rounded-xl border border-zinc-200/80 transition-colors cursor-pointer"
                                                                  >
                                                                    🔧 {isAr ? preset.ar : preset.en}
                                                                  </button>
                                                                ))}
                                                              </div>

                                                              {aiResponse && (
                                                                    <div className="p-3.5 bg-red-50 border border-red-200 rounded-2xl animate-in fade-in">
                                                                      <div className="flex items-center gap-1.5 text-xs font-bold text-red-600 mb-1.5">
                                                                        <CheckCircle2 className="w-4 h-4 text-red-600" />
                                                                        <span>{isAr ? "التشخيص الفني الموصى به:" : "Recommended Technical Solution:"}</span>
                                                                      </div>
                                                                        <p className="text-xs text-zinc-800 leading-relaxed">
                                                                          {aiResponse}
                                                                        </p>
                                                                    </div>
              )}
                                                                  </div>

                                                                    <div className="flex items-center gap-2 pt-3 border-t border-zinc-100">
                                                                      <input
                                                                        type="text"
                                                                        value={aiQuestion}
                                                                        onChange={(e) => setAiQuestion(e.target.value)}
                                                                        onKeyDown={(e) => {
                                                                          if (e.key === "Enter") {
                                                                            e.preventDefault();
                                                                            handleAskAiSubmit(aiQuestion);
                                                                          }
                                                                        }}
                                                                        placeholder={isAr ? "اكتب سؤالك الميكانيكي أو استفسارك هنا..." : "Ask your car repair question here..."}
                                                                        className="flex-1 bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 text-xs text-zinc-900 placeholder-zinc-400 outline-none focus:border-red-600 transition-colors"
                                                                      />
                                                                      <button
                                                                        type="button"
                                                                        onClick={() => handleAskAiSubmit(aiQuestion)}
                                                                        className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-md"
                                                                      >
                                                                        <Send className="w-3.5 h-3.5 rtl:rotate-180" />
                                                                        <span>{isAr ? "إرسال" : "Ask"}</span>
                                                                      </button>
                                                                    </div>

                                                                    {/* Quick Actions Footer */}
                                                                      <div className="mt-3 pt-2.5 border-t border-zinc-100 flex items-center justify-between text-xs flex-shrink-0">
                                                                        <button
                                                                          type="button"
                                                                          onClick={() => {
                                                                            setShowAiModal(false);
                                                                            handleCollapse();
                                                                            router.push("/booking");
                                                                            onCloseMenu?.();
                                                                          }}
                                                                          className="text-red-600 hover:text-red-700 hover:underline font-bold flex items-center gap-1 cursor-pointer"
                                                                        >
                                                                          <Calendar className="w-3.5 h-3.5 text-red-600" />
                                                                          <span>{isAr ? "حجز موعد فحص فوري بالورشة" : "Book Workshop Bay Inspection"}</span>
                                                                        </button>

                                                                        <a
                                                                          href={WORKSHOP_INFO.whatsappUrl}
                                                                          target="_blank"
                                                                          rel="noopener noreferrer"
                                                                          className="text-emerald-600 hover:text-emerald-700 text-[11px] font-bold flex items-center gap-1 hover:underline"
                                                                        >
                                                                          <MessageCircle className="w-3.5 h-3.5" />
                                                                          <span>{isAr ? "محادثة فني واتساب" : "Chat on WhatsApp"}</span>
                                                                        </a>
                                                                      </div>
                                                                    </div>
                                                                  </div>,
                                                                  document.body
      )}
                                                                </div>
                                                              );
}
