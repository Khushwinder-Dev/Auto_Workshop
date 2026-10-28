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
  FileText,
  Video,
  HelpCircle,
  Sparkles,
  Bot,
  Send,
  MessageCircle,
  Camera,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  Loader2,
  RefreshCw,
  Image as ImageIcon,
} from "lucide-react";
import { SITE_SEARCH_INDEX, SearchResultItem } from "@/data/searchIndex";
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
  new (): SpeechRecognitionInstance;
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
  { key: "blogs", labelEn: "Blogs & Tips", labelAr: "نصائح ومقالات" },
  { key: "videos", labelEn: "Videos", labelAr: "الفيديوهات" },
  { key: "faqs", labelEn: "FAQs", labelAr: "الأسئلة" },
];

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
      categoryAr: "فحص كمبيوتر",
      href: "/services-details?service=diagnostics",
      icon: Cpu,
    },
    {
      titleEn: "AC Gas Leak & Compressor Repair",
      titleAr: "تصليح وشحن مكيف السيارة",
      categoryEn: "Air Conditioning",
      categoryAr: "تكييف السيارة",
      href: "/services-details?service=ac-repair",
      icon: Fan,
    },
    {
      titleEn: "Brake Pad Renewal & Rotor Skimming",
      titleAr: "صيانة الفرامل وخرط الدسكات",
      categoryEn: "Brakes",
      categoryAr: "فرامل ودسكات",
      href: "/services-details?service=brakes",
      icon: Disc,
    },
    {
      titleEn: "Premium Synthetic Oil Change",
      titleAr: "تبديل زيت المحرك والفلتر الأصلي",
      categoryEn: "Express Maintenance",
      categoryAr: "صيانة دورية سريعة",
      href: "/services-details?service=oil-change",
      icon: Droplets,
    },
    {
      titleEn: "German & Luxury Car Service (Mercedes/BMW)",
      titleAr: "صيانة السيارات الألمانية والفاخرة",
      categoryEn: "Brands",
      categoryAr: "ماركات فاخرة",
      href: "/brands",
      icon: Car,
    },
  ],
  services: [
    {
      titleEn: "Diagnostics & ECU Scans",
      titleAr: "فحص كمبيوتر وحساسات المحرك",
      categoryEn: "Services",
      categoryAr: "خدمات",
      href: "/services-details?service=diagnostics",
      icon: Cpu,
    },
    {
      titleEn: "Brake System & Ceramic Pads",
      titleAr: "فحمات وسفايف فرامل سيراميك",
      categoryEn: "Services",
      categoryAr: "خدمات",
      href: "/services-details?service=brakes",
      icon: Disc,
    },
    {
      titleEn: "Suspension, Bushings & Struts",
      titleAr: "مساعدات ومقصات وميزان رودات",
      categoryEn: "Services",
      categoryAr: "خدمات",
      href: "/services-details?service=suspension",
      icon: ShieldCheck,
    },
    {
      titleEn: "Battery Load Testing & Replacement",
      titleAr: "فحص وتبديل بطارية السيارة",
      categoryEn: "Services",
      categoryAr: "خدمات",
      href: "/services-details?service=battery",
      icon: Wrench,
    },
  ],
  brands: [
    {
      titleEn: "Mercedes-Benz & AMG Maintenance",
      titleAr: "صيانة مرسيدس بنز و AMG",
      categoryEn: "German Cars",
      categoryAr: "ألماني",
      href: "/brands",
      icon: Car,
    },
    {
      titleEn: "BMW iDrive & TwinPower Turbo",
      titleAr: "صيانة بي ام دبليو",
      categoryEn: "German Cars",
      categoryAr: "ألماني",
      href: "/brands",
      icon: Car,
    },
    {
      titleEn: "Toyota & Lexus Hybrid Systems",
      titleAr: "صيانة تويوتا ولكزس وهايبرد",
      categoryEn: "Japanese Cars",
      categoryAr: "ياباني",
      href: "/brands",
      icon: Car,
    },
    {
      titleEn: "Nissan Patrol V8 & CVT Service",
      titleAr: "صيانة نيسان باترول وجير CVT",
      categoryEn: "Japanese Cars",
      categoryAr: "ياباني",
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

  // Image Search State
  const [isImageSearchOpen, setIsImageSearchOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzingImage, setIsAnalyzingImage] = useState(false);
  const [imageSearchData, setImageSearchData] = useState<{
    detectedEn: string;
    detectedAr: string;
    category: "Service" | "Brand" | "Blog" | "Video" | "Page";
    confidence: "high" | "medium" | "low";
    descriptionEn: string;
    descriptionAr: string;
    matchedItems: SearchResultItem[];
    suggestedKeywords: string[];
    aiSource: "gemini" | "catalog-matcher";
  } | null>(null);
  const [imageSearchError, setImageSearchError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
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
    setIsImageSearchOpen(false);
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

  const processImageFile = async (file: File) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setImageSearchError(
        isAr
          ? "يرجى اختيار ملف صورة صالح (PNG, JPG, WEBP)"
          : "Please select a valid image file (PNG, JPG, WEBP)"
      );
      setIsImageSearchOpen(true);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setImageSearchError(
        isAr
          ? "حجم الصورة كبير جداً (الحد الأقصى 10 ميغابايت)"
          : "Image is too large (maximum 10MB)"
      );
      setIsImageSearchOpen(true);
      return;
    }

    setSelectedImageFile(file);
    setImageSearchError(null);
    setImageSearchData(null);
    setIsAnalyzingImage(true);
    setIsImageSearchOpen(true);
    setIsExpanded(true);

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("hint", searchQuery || "");

      const res = await fetch("/api/image-search", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to analyze image");
      }

      setImageSearchData(data);
    } catch (err: any) {
      console.error("Image search error:", err);
      setImageSearchError(
        isAr
          ? "تعذر تحليل الصورة. يرجى تجربة صورة أخرى أو التحقق من الاتصال."
          : err.message || "Failed to analyze image. Please try another image."
      );
    } finally {
      setIsAnalyzingImage(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

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

    return filtered.slice(0, 8);
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
      } catch {}
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
          setIsImageSearchOpen(false);
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
            <mark key={i} className="bg-red-500/20 text-red-600 font-bold rounded-sm px-0.5">
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
    const questionText = q.trim();
    if (!questionText) return;

    const lower = questionText.toLowerCase();
    const matched = AI_PRESET_QUESTIONS.find((item) =>
      lower.includes("ac") || lower.includes("air") || lower.includes("مكيف")
        ? item.en.includes("AC")
        : lower.includes("oil") || lower.includes("زيت")
        ? item.en.includes("oil")
        : lower.includes("brake") || lower.includes("squeak") || lower.includes("فرامل")
        ? item.en.includes("brakes")
        : lower.includes("mercedes") || lower.includes("bmw") || lower.includes("diagnos") || lower.includes("كمبيوتر")
        ? item.en.includes("German")
        : false
    );

    if (matched) {
      setAiResponse(isAr ? matched.ansAr : matched.ansEn);
    } else {
      setAiResponse(
        isAr
          ? `بناءً على سؤالك حول "${questionText}"، يوصي كراج باب البستان في الشارقة بإجراء فحص كمبيوتر وتدقيق ميكانيكي مباشر في ورشتنا لضمان سلامة المركبة وتقديم حل فني مضمون.`
          : `For "${questionText}", Bab Al Bustan Auto Maintenance in Sharjah recommends bringing your vehicle for a quick computer scan & physical inspection to pinpoint the issue with genuine replacement parts and workmanship warranty.`
      );
    }
  };

  const defaultPlaceholder = isAr
    ? "ابحث عن خدمات، ماركات، مشاكل سيارتك..."
    : "Search services, brands, car issues...";
  const mostUsedItems = MOST_USED_BY_TAB[activeTab] || MOST_USED_BY_TAB.all;

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {/* ─── DESKTOP & DRAWER TRIGGER BUTTON ─── */}
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
              className={`relative p-0.5 rounded-full border border-dashed transition-all cursor-pointer hover:scale-105 ${
                isExpanded
                  ? "border-red-600 bg-red-600/15"
                  : isScrolled
                  ? "border-red-600/50 hover:border-red-600"
                  : "border-white/60 hover:border-white"
              }`}
              aria-label={isExpanded ? "Close search" : "Open search"}
              title="Search (Ctrl + K)"
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors shadow-sm ${
                  isScrolled
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-red-600 hover:bg-red-700 text-white"
                }`}
              >
                {isExpanded ? (
                  <X className="h-4 w-4 stroke-[2.5]" />
                ) : (
                  <Search className="h-4 w-4 stroke-[2.5]" />
                )}
              </div>
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
              className="p-1 transition-all cursor-pointer hover:bg-white/10 rounded-full flex items-center justify-center"
              aria-label={isExpanded ? "Close search" : "Open search"}
              title="Search (Ctrl + K)"
            >
              {isExpanded ? (
                <div className="w-9 h-9 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center transition-transform hover:scale-105">
                  <X className="h-4 w-4 stroke-2" />
                </div>
              ) : (
                <div className="w-9 h-9 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition-transform hover:scale-105 shadow-md shadow-red-600/30">
                  <Search className="h-4 w-4 stroke-[2.5]" />
                </div>
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
            className="w-full flex items-center justify-between bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 rounded-full px-4 py-3 text-zinc-300 transition-all cursor-pointer text-xs shadow-sm group"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full bg-red-600/20 text-red-500 flex items-center justify-center">
                <Search className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-zinc-300 group-hover:text-white transition-colors font-medium">
                {placeholder || defaultPlaceholder}
              </span>
            </div>
            <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider bg-red-500/10 px-2.5 py-0.5 rounded-full border border-red-500/20">
              Ctrl+K
            </span>
          </button>
        </div>
      )}

      {/* ─── UNIFIED SEARCH CARD DROPDOWN ───────────── */}
      {isExpanded && (
        <div
          className={`${
            isDrawer
              ? "relative w-full mt-3"
              : "absolute top-full mt-3 right-0 rtl:right-auto rtl:left-0 w-[94vw] sm:w-[520px] md:w-[560px] lg:w-[600px] max-w-[600px]"
          } bg-zinc-950 rounded-3xl shadow-[0_25px_70px_rgba(220,38,38,0.2),0_15px_35px_rgba(0,0,0,0.8)] border border-red-600/30 p-5 sm:p-6 z-[10005] text-left rtl:text-right animate-in fade-in zoom-in-95 duration-200 text-white`}
          onClick={(e) => e.stopPropagation()}
          dir={isAr ? "rtl" : "ltr"}
        >
          {/* 1. Integrated Search Input Box */}
          <div className="relative flex items-center bg-zinc-900 border-2 border-red-600/40 focus-within:border-red-600 focus-within:ring-4 focus-within:ring-red-600/20 rounded-2xl px-4 py-3 transition-all shadow-inner gap-3">
            <Search className="w-5 h-5 text-red-500 shrink-0 stroke-[2.2]" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              onChange={(e) => {
                const val = e.target.value;
                setSearchQuery(val);
                if (isImageSearchOpen) {
                  setIsImageSearchOpen(false);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (isImageSearchOpen) {
                    setIsImageSearchOpen(false);
                  }
                  handleExecuteSearch(searchQuery);
                } else if (e.key === "Escape") {
                  handleCollapse();
                }
              }}
              placeholder={placeholder || defaultPlaceholder}
              className="flex-1 bg-transparent text-sm sm:text-base text-white placeholder-zinc-400 outline-none min-w-0 font-medium"
            />

            {/* Clear Query X */}
            {searchQuery.length > 0 && (
              <button
                type="button"
                onClick={handleClearQuery}
                className="p-1.5 text-zinc-400 hover:text-red-500 hover:bg-zinc-800 rounded-full transition-colors shrink-0 cursor-pointer"
                title={isAr ? "مسح النص" : "Clear text"}
                aria-label="Clear text"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Voice Search with Pulse */}
            {mounted && (
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={handleVoiceSearch}
                className={`p-1.5 rounded-full transition-all shrink-0 cursor-pointer ${
                  isListening
                    ? "bg-red-600 text-white animate-pulse shadow-md shadow-red-600/50"
                    : "text-zinc-400 hover:text-red-500 hover:bg-zinc-800"
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

            {/* Visual Image Search Camera Button */}
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={(e) => {
                e.stopPropagation();
                setIsImageSearchOpen((prev) => !prev);
              }}
              className={`p-1.5 rounded-full transition-all shrink-0 cursor-pointer group/cam relative ${
                isImageSearchOpen
                  ? "bg-red-600 text-white shadow-md ring-2 ring-red-600/30"
                  : "text-zinc-400 hover:text-red-500 hover:bg-zinc-800"
              }`}
              title={isAr ? "فحص الصورة بالذكاء الاصطناعي" : "Visual AI Diagnosis"}
              aria-label="Image search"
            >
              <Camera className="w-4 h-4 transition-transform group-hover/cam:scale-110" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            {/* Close Button */}
            <button
              type="button"
              onClick={handleCollapse}
              className="p-1 text-zinc-400 hover:text-red-500 hover:bg-zinc-800 rounded-full transition-colors shrink-0 cursor-pointer"
              title={isAr ? "إغلاق" : "Close"}
              aria-label="Close search"
            >
              <X className="w-4 h-4 stroke-[2.2]" />
            </button>
          </div>

          {/* ─── CONDITIONAL: EMBEDDED AI IMAGE SEARCH VIEW ─── */}
          {isImageSearchOpen ? (
            <div className="mt-4 flex flex-col animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-red-600 to-rose-600 flex items-center justify-center text-white shadow-sm shadow-red-600/30 shrink-0">
                    <Camera className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-xs sm:text-sm text-white leading-tight">
                      {isAr ? "فحص وتشخيص عطل السيارة بالصورة" : "Visual Car Issue Diagnosis"}
                    </h3>
                    <p className="text-[11px] text-zinc-400 mt-0.5">
                      {isAr
                        ? "ارفع صورة للمشكلة (فحمات، تسريب زيت، لمبة المحرك، كمبريسور) لتشخيص العطل"
                        : "Upload a photo of your car part or defect to match repairs"}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsImageSearchOpen(false)}
                  className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                  title={isAr ? "العودة للبحث العادي" : "Back to normal search"}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="mt-3 max-h-[340px] sm:max-h-[380px] overflow-y-auto pr-1.5 space-y-3">
                {/* 1. Dropzone */}
                {!imagePreview && (
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsDragging(true);
                    }}
                    onDragEnter={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsDragging(true);
                    }}
                    onDragLeave={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsDragging(false);
                    }}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 group flex flex-col items-center justify-center gap-3 ${
                      isDragging
                        ? "border-red-500 bg-red-600/10 scale-[1.01] shadow-md shadow-red-600/20"
                        : "border-zinc-700 hover:border-red-600 hover:bg-zinc-900/60 bg-zinc-900/40"
                    }`}
                  >
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200 shadow-inner ${
                        isDragging
                          ? "bg-red-600 text-white scale-110 shadow-md shadow-red-600/30"
                          : "bg-zinc-800 group-hover:bg-red-600/20 text-red-500 group-hover:scale-105"
                      }`}
                    >
                      <UploadCloud className="w-7 h-7" />
                    </div>

                    <div className="space-y-1">
                      <p className="font-bold text-white text-xs sm:text-sm">
                        {isDragging
                          ? isAr
                            ? "أفلت الصورة هنا للبدء بالفحص"
                            : "Drop image here to analyze"
                          : isAr
                          ? "اسحب وأفلت صورة القطعة أو العطل هنا"
                          : "Drag & drop car part photo here"}
                      </p>
                      <p className="text-[11px] text-zinc-400 font-medium">
                        {isAr
                          ? "أو اضغط لاختيار صورة من جهازك"
                          : "or click below to choose a file from your device"}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                      className="mt-0.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm inline-flex items-center gap-2 shadow-md shadow-red-600/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <ImageIcon className="w-4 h-4" />
                      <span>{isAr ? "رفع صورة" : "Upload Image"}</span>
                    </button>

                    <p className="text-[11px] text-zinc-500">
                      {isAr
                        ? "يدعم PNG, JPG, WEBP (حتى 10 ميغابايت)"
                        : "Supports PNG, JPG, WEBP (up to 10MB)"}
                    </p>
                  </div>
                )}

                {/* 2. Analyzing State */}
                {isAnalyzingImage && (
                  <div className="flex flex-col items-center justify-center p-6 bg-zinc-900/60 rounded-2xl border border-red-600/20 text-center gap-3">
                    {imagePreview && (
                      <div className="relative w-36 h-28 rounded-xl overflow-hidden shadow-md border-2 border-red-600/50 bg-black">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={imagePreview}
                          alt="Uploaded preview"
                          className="w-full h-full object-cover opacity-80"
                        />
                        <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_15px_#dc2626] animate-[bounce_1.5s_infinite]" />
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-red-500 font-bold text-xs sm:text-sm">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>
                        {isAr
                          ? "جارٍ فحص الصورة ومطابقة الأعطال الميكانيكية..."
                          : "Analyzing auto defect & matching workshop repair..."}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 max-w-xs">
                      {isAr
                        ? "يتم تشخيص العطل ومطابقته مع خدمات كراج باب البستان وضمان الصيانة"
                        : "Matching diagnosis with genuine parts, ECU scanners, and workshop bays in Sharjah"}
                    </p>
                  </div>
                )}

                {/* 3. Error State */}
                {imageSearchError && !isAnalyzingImage && (
                  <div className="p-3.5 rounded-2xl bg-rose-950/50 border border-rose-800 text-rose-200 flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div className="flex-1 text-xs">
                      <p className="font-bold">{isAr ? "تنبيه الفحص" : "Diagnosis Notice"}</p>
                      <p className="mt-0.5 text-rose-300">{imageSearchError}</p>
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null);
                          setImageSearchError(null);
                          fileInputRef.current?.click();
                        }}
                        className="mt-2 inline-flex items-center gap-1 font-bold text-rose-300 hover:underline cursor-pointer"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>{isAr ? "محاولة بصورة أخرى" : "Try another image"}</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* 4. Results Display */}
                {imageSearchData && !isAnalyzingImage && (
                  <div className="space-y-3">
                    <div className="bg-zinc-900 border border-red-600/30 rounded-2xl p-3.5 shadow-md">
                      <div className="flex items-start gap-3">
                        {imagePreview && (
                          <div className="w-16 h-16 rounded-xl overflow-hidden border border-zinc-700 shadow-xs shrink-0 bg-black">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={imagePreview}
                              alt="Scanned item"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap mb-1">
                            <span className="px-2 py-0.5 rounded-full text-[9.5px] font-extrabold uppercase tracking-wider bg-red-600 text-white">
                              {imageSearchData.category}
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-[9.5px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-700 flex items-center gap-1">
                              <CheckCircle2 className="w-2.5 h-2.5" />
                              {isAr ? "مطابقة دقيقة" : "Diagnostic Match"}
                            </span>
                          </div>
                          <h4 className="font-extrabold text-xs sm:text-sm text-white leading-snug truncate">
                            {isAr ? imageSearchData.detectedAr : imageSearchData.detectedEn}
                          </h4>
                          <p className="text-[11px] text-zinc-300 mt-0.5 line-clamp-2 leading-relaxed">
                            {isAr ? imageSearchData.descriptionAr : imageSearchData.descriptionEn}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Matched Items */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <p className="font-extrabold text-[11px] uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                          <Sparkles className="w-3 h-3 text-red-500" />
                          <span>
                            {isAr
                              ? "خدمات الصيانة الموصى بها في الورشة:"
                              : "Recommended Workshop Services:"}
                          </span>
                        </p>
                        <span className="text-[10px] font-bold text-zinc-400">
                          {imageSearchData.matchedItems.length} {isAr ? "خدمات" : "matches"}
                        </span>
                      </div>

                      <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1.5">
                        {imageSearchData.matchedItems.map((item, idx) => (
                          <div
                            key={idx}
                            onClick={() => handleSelectResult(item)}
                            className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-red-600 transition-all cursor-pointer group"
                          >
                            <div className="flex items-center gap-2.5 min-w-0 flex-1">
                              <div className="w-8 h-8 rounded-lg bg-zinc-800 group-hover:bg-red-600 text-red-500 group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                                <Wrench className="w-3.5 h-3.5 stroke-[2]" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-1.5 mb-0.5">
                                  <span className="text-[8.5px] font-extrabold uppercase px-1.5 py-0.2 rounded-full border bg-red-950 text-red-400 border-red-800">
                                    {isAr && item.categoryAr ? item.categoryAr : item.category}
                                  </span>
                                  <h5 className="font-bold text-xs text-white group-hover:text-red-500 transition-colors truncate">
                                    {isAr && item.nameAr ? item.nameAr : item.name}
                                  </h5>
                                </div>
                                <p className="text-[10.5px] text-zinc-400 truncate">
                                  {isAr && item.descAr ? item.descAr : item.desc}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 text-red-500 shrink-0 text-[11px] font-bold group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform ml-1 rtl:ml-0 rtl:mr-1">
                              <span>{isAr ? "عرض" : "View"}</span>
                              <ArrowRight className="w-3 h-3 rtl:rotate-180" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-2 border-t border-zinc-800 gap-2 flex-wrap">
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null);
                          setImageSearchData(null);
                          setImageSearchError(null);
                          fileInputRef.current?.click();
                        }}
                        className="px-2.5 py-1.5 rounded-xl border border-zinc-700 hover:border-red-500 text-zinc-300 hover:text-white text-[11px] font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                      >
                        <Camera className="w-3 h-3" />
                        <span>{isAr ? "فحص صورة أخرى" : "Scan Another Photo"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          handleCollapse();
                          router.push("/booking");
                          onCloseMenu?.();
                        }}
                        className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm"
                      >
                        <span>{isAr ? "حجز موعد فحص بالورشة" : "Book Workshop Slot"}</span>
                        <ArrowRight className="w-3 h-3 rtl:rotate-180" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* REGULAR SEARCH VIEW: Filter Category Pills, Most Used / Results, Bottom Bar */
            <>
              {/* Filter Category Pills */}
              <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {FILTER_TABS.map((tab) => {
                  const isSelected = activeTab === tab.key;
                  return (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => {
                        setActiveTab(tab.key);
                        setIsImageSearchOpen(false);
                      }}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                        isSelected
                          ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                          : "bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-700"
                      }`}
                    >
                      {isAr ? tab.labelAr : tab.labelEn}
                    </button>
                  );
                })}
              </div>

              {/* Section Header */}
              <div className="mt-5 mb-2.5 flex items-center justify-between">
                <p className="text-xs font-extrabold tracking-wider uppercase text-zinc-400">
                  {searchQuery.trim() === ""
                    ? isAr
                      ? "الأكثر طلباً وزيارة"
                      : "Popular Services & Shortcuts"
                    : isAr
                    ? "نتائج البحث"
                    : "Search Results"}
                </p>
                {searchQuery.trim() !== "" && (
                  <span className="text-xs text-red-500 font-bold">
                    {filteredResults.length} {isAr ? "نتيجة" : "results"}
                  </span>
                )}
              </div>

              {/* Results List / Most Used */}
              <div className="flex-1 overflow-y-auto min-h-0 max-h-[300px] sm:max-h-[340px] pr-1.5 space-y-1">
                {searchQuery.trim() === "" ? (
                  mostUsedItems.map((item, idx) => {
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
                        className="flex items-center justify-between p-3 rounded-2xl bg-zinc-900/50 hover:bg-zinc-800/80 border border-zinc-800/60 hover:border-red-600/50 transition-all cursor-pointer group"
                      >
                        <div className="flex items-center gap-3.5 min-w-0 flex-1">
                          <div className="w-10 h-10 rounded-2xl bg-zinc-800 text-red-500 border border-zinc-700 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600 flex items-center justify-center shrink-0 transition-all duration-200">
                            <Icon className="w-5 h-5 stroke-[2]" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h5 className="text-sm font-bold text-white group-hover:text-red-500 transition-colors truncate">
                              {isAr ? item.titleAr : item.titleEn}
                            </h5>
                            <p className="text-xs text-zinc-400 font-medium truncate mt-0.5">
                              {isAr ? item.categoryAr : item.categoryEn}
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-red-500 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-all shrink-0 ml-2 rtl:ml-0 rtl:mr-2 stroke-[2.2]" />
                      </div>
                    );
                  })
                ) : filteredResults.length > 0 ? (
                  filteredResults.map((item) => {
                    const displayName = isAr && item.nameAr ? item.nameAr : item.name;
                    const displayDesc = isAr && item.descAr ? item.descAr : item.desc;
                    const displayCategory = isAr && item.categoryAr ? item.categoryAr : item.category;

                    return (
                      <div
                        key={item.id}
                        onClick={() => handleSelectResult(item)}
                        className="p-3 rounded-2xl bg-zinc-900/50 hover:bg-zinc-800/80 border border-zinc-800/60 hover:border-red-600/50 cursor-pointer transition-colors flex items-center justify-between gap-3 group"
                      >
                        <div className="flex items-center gap-3.5 min-w-0 flex-1">
                          <div className="w-10 h-10 rounded-2xl bg-zinc-800 text-red-500 border border-zinc-700 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600 flex items-center justify-center shrink-0 transition-all duration-200">
                            {item.category === "Service" && <Wrench className="w-5 h-5 stroke-[2]" />}
                            {item.category === "Brand" && <Car className="w-5 h-5 stroke-[2]" />}
                            {item.category === "Blog" && <FileText className="w-5 h-5 stroke-[2]" />}
                            {item.category === "Video" && <Video className="w-5 h-5 stroke-[2]" />}
                            {item.category === "FAQ" && <HelpCircle className="w-5 h-5 stroke-[2]" />}
                            {item.category === "Page" && <ArrowRight className="w-5 h-5 stroke-[2]" />}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-[9.5px] font-extrabold uppercase px-2 py-0.5 rounded-full border bg-red-950 text-red-400 border-red-800">
                                {displayCategory}
                              </span>
                              <h4 className="text-sm font-bold text-white group-hover:text-red-500 transition-colors truncate">
                                {highlightMatch(displayName, searchQuery)}
                              </h4>
                            </div>
                            <p className="text-xs text-zinc-400 line-clamp-1 leading-relaxed">
                              {displayDesc}
                            </p>
                          </div>
                        </div>

                        <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-red-500 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-all shrink-0 ml-2 rtl:ml-0 rtl:mr-2 stroke-[2.2]" />
                      </div>
                    );
                  })
                ) : (
                  <div className="py-8 px-4 text-center">
                    <p className="text-sm font-bold text-white">
                      {isAr ? "لم نجد نتائج لـ" : "No results for"} "{searchQuery}"
                    </p>
                    <p className="text-xs text-zinc-400 mt-1">
                      {isAr
                        ? "جرّب البحث باسم خدمة (فرامل، مكيف، غيار زيت، فحص كمبيوتر) أو ماركة سيارة"
                        : "Try searching for service names (oil change, brakes, AC repair, diagnostics) or car brand"}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          router.push("/services");
                          handleCollapse();
                          onCloseMenu?.();
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-red-500 text-xs font-bold rounded-full transition-colors border border-red-600/30 cursor-pointer"
                      >
                        <Wrench className="w-3.5 h-3.5" />
                        <span>{isAr ? "تصفح جميع الخدمات" : "Browse All Services"}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          router.push("/booking");
                          handleCollapse();
                          onCloseMenu?.();
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-full transition-colors cursor-pointer shadow-md shadow-red-600/30"
                      >
                        <span>{isAr ? "حجز موعد صيانة" : "Book Appointment"}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Footer Bar */}
              <div className="mt-5 pt-3.5 border-t border-zinc-800 flex items-center justify-between gap-3 shrink-0">
                <span className="text-xs sm:text-sm text-zinc-400 font-medium">
                  {isAr ? "تحتاج مساعدة أو استشارة ميكانيكية؟" : "Need help diagnosing car issue?"}
                </span>

                <button
                  type="button"
                  onClick={() => {
                    if (searchQuery.trim()) {
                      setAiQuestion(searchQuery.trim());
                      handleAskAiSubmit(searchQuery.trim());
                    }
                    setShowAiModal(true);
                  }}
                  className="px-4 sm:px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-red-600/30 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer shrink-0"
                >
                  <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300/30" />
                  <span>{isAr ? "المساعد الميكانيكي الذكي" : "Ask Auto AI Advisor"}</span>
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* ─── INTERACTIVE "ASK AI" ASSISTANT MODAL (PORTAL) ───────────── */}
      {showAiModal &&
        mounted &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-[10006] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
            onClick={() => setShowAiModal(false)}
          >
            <div
              className="bg-zinc-950 text-white rounded-3xl shadow-2xl border border-red-600/40 max-w-lg w-full p-5 sm:p-6 text-left rtl:text-right overflow-hidden relative max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
              dir={isAr ? "rtl" : "ltr"}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-zinc-800 flex-shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-red-600/20 text-red-500 border border-red-600/30 flex items-center justify-center">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      {isAr
                        ? "المستشار الميكانيكي الذكي — كراج باب البستان"
                        : "Bab Al Bustan AI Workshop Advisor"}
                    </h3>
                    <p className="text-[11px] text-zinc-400">
                      {isAr
                        ? "إرشادات فورية لحرارة صيف الإمارات وتشخيص أعطال السيارات"
                        : "Instant vehicle guidance & UAE climate maintenance advice"}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAiModal(false)}
                  className="w-7 h-7 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto min-h-0 py-2 space-y-3">
                <div className="my-2">
                  <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2">
                    {isAr ? "أسئلة شائعة مقترحة:" : "Common Questions:"}
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
                        className="text-left rtl:text-right text-xs text-zinc-200 bg-zinc-900 hover:bg-red-950/40 hover:text-red-400 p-2.5 rounded-xl border border-zinc-800 hover:border-red-600/50 transition-colors cursor-pointer"
                      >
                        💬 {isAr ? preset.ar : preset.en}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Answer Display */}
                {aiResponse && (
                  <div className="p-3.5 bg-red-950/30 border border-red-800/60 rounded-2xl my-2 animate-in fade-in">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-red-400 mb-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>
                        {isAr ? "التوصية الفنية المعتمدة من الورشة:" : "Certified Workshop Recommendation:"}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-200 leading-relaxed font-sans">
                      {aiResponse}
                    </p>
                  </div>
                )}
              </div>

              {/* Input Bar */}
              <div className="flex items-center gap-2 pt-2 border-t border-zinc-800 flex-shrink-0">
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
                  placeholder={
                    isAr
                      ? "اكتب مشكلة سيارتك أو سؤالك هنا..."
                      : "Type your car problem or question..."
                  }
                  className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-red-600 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => handleAskAiSubmit(aiQuestion)}
                  className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-sm"
                >
                  <Send className="w-3.5 h-3.5 rtl:rotate-180" />
                  <span>{isAr ? "إرسال" : "Ask"}</span>
                </button>
              </div>

              {/* Quick Actions Footer */}
              <div className="mt-2.5 pt-2 border-t border-zinc-800 flex items-center justify-between text-xs flex-shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setShowAiModal(false);
                    handleCollapse();
                    router.push("/booking");
                    onCloseMenu?.();
                  }}
                  className="text-red-500 hover:underline font-bold flex items-center gap-1 cursor-pointer"
                >
                  <span>{isAr ? "حجز فحص مباشر" : "Book Service Bay"}</span>
                  <ArrowRight className="w-3 h-3 rtl:rotate-180" />
                </button>
                <a
                  href="https://api.whatsapp.com/send?phone=971564406456"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline font-bold flex items-center gap-1"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{isAr ? "محادثة فني عبر واتساب" : "WhatsApp Service Advisor"}</span>
                </a>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
