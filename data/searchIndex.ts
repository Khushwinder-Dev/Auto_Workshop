import { WORKSHOP_SERVICES, CAR_BRANDS, WORKSHOP_VIDEOS, WORKSHOP_FAQS } from "./workshopData";
import { BLOG_POSTS } from "./blogs";

export interface SearchResultItem {
  id: string;
  name: string;
  nameAr?: string;
  category: "Service" | "Brand" | "Blog" | "Video" | "FAQ" | "Page";
  categoryAr?: string;
  href: string;
  desc: string;
  descAr?: string;
  keywords: string[];
}

/* ─── DYNAMICALLY GENERATED SERVICES ─────────────────────────────── */
const serviceSearchItems: SearchResultItem[] = WORKSHOP_SERVICES.map((s) => ({
  id: `service-${s.id}`,
  name: s.title,
  nameAr:
    s.id === "diagnostics"
      ? "فحص كمبيوتر وتشخيص الأعطال"
      : s.id === "oil-change"
      ? "تبديل زيت المحرك والفلتر"
      : s.id === "brakes"
      ? "صيانة وفحص الفرامل (البريك)"
      : s.id === "suspension"
      ? "صيانة نظام التعليق والمساعدات"
      : s.id === "battery"
      ? "فحص وتبديل بطارية السيارة"
      : s.id === "ac-repair"
      ? "تصليح وشحن مكيف السيارة"
      : s.id === "tires"
      ? "تبديل وميزان الإطارات"
      : s.id === "computer-programming"
      ? "برمجة كمبيوتر ومفاتيح السيارات"
      : s.title,
  category: "Service",
  categoryAr: "خدمة",
  href: `/services-details?service=${s.id}`,
  desc: s.shortDesc || s.fullDesc,
  descAr:
    s.id === "diagnostics"
      ? "فحص كمبيوتر متقدم لتحديد وإصلاح جميع أعطال المحرك والحساسات بدقة 100%"
      : s.id === "oil-change"
      ? "تبديل زيت محرك تخليقي عالي الجودة مع فلتر أصلي وفحص شامل للمركبة"
      : s.id === "brakes"
      ? "خرط أقراص الفرامل وتبديل السفايف (الفحمات) مع ضمان جودة وسلامة الفرملة"
      : s.id === "suspension"
      ? "فحص وتجديد المساعدات، المقصات، الجلب، وميزان الرودات لقيادة مريحة وثابتة"
      : s.id === "battery"
      ? "فحص شحن الدينامو واختبار قوة البطارية وتبديلها ببطاريات معتمدة مع ضمان"
      : s.id === "ac-repair"
      ? "كشف تسريب غاز المكيف، صيانة الكمبريسور، وتبديل الفلتر لبرودة مثالية"
      : s.id === "tires"
      ? "ميزان ليزر للإطارات، فحص نقوش المداس، والترصيص بأحدث الأجهزة"
      : s.id === "computer-programming"
      ? "برمجة وحدات التحكم ECU وتحديث السوفتوير وبرمجة مفاتيح لجميع المركبات"
      : s.shortDesc,
  keywords: [
    s.title,
    s.id,
    "service",
    "repair",
    "maintenance",
    "workshop",
    "car",
    "auto",
    ...s.features,
    s.warranty || "",
  ].filter(Boolean),
}));

/* ─── DYNAMICALLY GENERATED CAR BRANDS ───────────────────────────── */
const brandSearchItems: SearchResultItem[] = CAR_BRANDS.map((b, idx) => ({
  id: `brand-${idx}-${b.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
  name: `${b.name} Specialist Service`,
  nameAr: `صيانة وإصلاح سيارات ${b.name}`,
  category: "Brand",
  categoryAr: "ماركة",
  href: "/brands",
  desc: `${b.category} — ${b.specialty}`,
  descAr: `خدمات مخصصة لسيارات ${b.name}: ${b.specialty}`,
  keywords: [
    b.name,
    b.category,
    b.specialty,
    "car brand",
    "luxury repair",
    "german car",
    "japanese car",
    "american car",
    "مرسيدس",
    "بي ام",
    "تويوتا",
    "نيسان",
    "لكزس",
    "اودي",
    "بورشه",
    "سيارات",
  ],
}));

/* ─── DYNAMICALLY GENERATED BLOG POSTS ───────────────────────────── */
const blogSearchItems: SearchResultItem[] = BLOG_POSTS.map((p) => ({
  id: `blog-${p.slug}`,
  name: p.title,
  nameAr: p.title,
  category: "Blog",
  categoryAr: "مقال",
  href: `/blogs/${p.slug}`,
  desc: p.excerpt,
  descAr: p.excerpt,
  keywords: [
    p.title,
    p.category,
    p.slug,
    "car advice",
    "maintenance guide",
    "tips",
    "uae driving",
    "sharjah heat",
    "مقالات",
    "نصائح صيانة",
  ],
}));

/* ─── DYNAMICALLY GENERATED WORKSHOP VIDEOS ──────────────────────── */
const videoSearchItems: SearchResultItem[] = WORKSHOP_VIDEOS.map((v) => ({
  id: `video-${v.id}`,
  name: v.title,
  nameAr: v.title,
  category: "Video",
  categoryAr: "فيديو",
  href: "/gallery",
  desc: v.description,
  descAr: v.description,
  keywords: [
    v.title,
    v.category,
    "workshop tour",
    "video",
    "repair demo",
    "engine rebuild",
    "ac flush",
    "hybrid repair",
    "فيديو صيانة",
    "ورشة",
  ],
}));

/* ─── DYNAMICALLY GENERATED FAQS ─────────────────────────────────── */
const faqSearchItems: SearchResultItem[] = WORKSHOP_FAQS.map((faq, idx) => ({
  id: `faq-${idx}`,
  name: faq.q,
  nameAr: faq.q,
  category: "FAQ",
  categoryAr: "أسئلة شائعة",
  href: "/faqs",
  desc: faq.a,
  descAr: faq.a,
  keywords: [
    faq.q,
    "faq",
    "question",
    "estimate",
    "location",
    "warranty",
    "sharjah industrial area 5",
    "pricing",
    "أسئلة",
  ],
}));

/* ─── CORE SITE PAGES ────────────────────────────────────────────── */
const corePageSearchItems: SearchResultItem[] = [
  {
    id: "page-home",
    name: "Home — Bab Al Bustan Auto Maintenance",
    nameAr: "الرئيسية — كراج باب البستان لصيانة السيارات",
    category: "Page",
    categoryAr: "صفحة",
    href: "/",
    desc: "Leading car repair & maintenance workshop in Sharjah Industrial Area 5. Professional diagnostics, oil change, brakes, and AC repair.",
    descAr: "أفضل ورشة لصيانة وتصليح السيارات في الشارقة المنطقة الصناعية 5. فحص كمبيوتر، غيار زيت، مكيف، وفرامل.",
    keywords: ["home", "babalbustan", "workshop", "sharjah", "auto garage", "الرئيسية", "كراج", "كراج الشارقة"],
  },
  {
    id: "page-services",
    name: "All Auto Repair Services",
    nameAr: "جميع خدمات صيانة وإصلاح السيارات",
    category: "Page",
    categoryAr: "صفحة",
    href: "/services",
    desc: "Comprehensive automotive services: ECU diagnostics, oil change, brake overhaul, AC servicing, suspension repairs, and tires.",
    descAr: "قائمة شاملة بجميع خدمات صيانة السيارات الميكانيكية والكهربائية وفحص الكمبيوتر والتكييف.",
    keywords: ["services", "all services", "mechanical", "electrical", "car repair", "خدمات صيانة", "تصليح"],
  },
  {
    id: "page-booking",
    name: "Book an Appointment / Service",
    nameAr: "حجز موعد صيانة سيارة",
    category: "Page",
    categoryAr: "صفحة",
    href: "/booking",
    desc: "Schedule your car repair or maintenance appointment online. Priority bay booking, transparent quote, and expert advice.",
    descAr: "احجز موعد صيانة سيارتك أونلاين بسهولة مع أولوية الفحص وتقديم عرض أسعار شفاف.",
    keywords: ["book appointment", "schedule service", "reservation", "car service booking", "حجز موعد", "موعد صيانة"],
  },
  {
    id: "page-about",
    name: "About Us — Bab Al Bustan Workshop",
    nameAr: "من نحن — ورشة باب البستان لصيانة السيارات",
    category: "Page",
    categoryAr: "صفحة",
    href: "/about-us",
    desc: "Over 15+ years of automotive excellence in Sharjah. Certified mechanics, genuine spare parts, and computerized testing.",
    descAr: "أكثر من 15 عاماً من الخبرة في صيانة السيارات في الشارقة، فنيون معتمدون وقطع غيار أصلية.",
    keywords: ["about", "about us", "who we are", "experience", "workshop team", "من نحن", "عن الورشة"],
  },
  {
    id: "page-brands",
    name: "Car Brands & Models Serviced",
    nameAr: "ماركات وموديلات السيارات التي نخدمها",
    category: "Page",
    categoryAr: "صفحة",
    href: "/brands",
    desc: "Expert service for German & Luxury (Mercedes, BMW, Audi, Porsche), Japanese (Toyota, Lexus, Nissan), and American vehicles.",
    descAr: "صيانة متخصصة للسيارات الألمانية واليابانية والأمريكية مع أحدث أجهزة الفحص المعتمدة.",
    keywords: ["brands", "car makes", "german cars", "japanese cars", "luxury car repair", "ماركات السيارات"],
  },
  {
    id: "page-gallery",
    name: "Workshop Video Tours & Repair Gallery",
    nameAr: "معرض الفيديوهات وصور الورشة",
    category: "Page",
    categoryAr: "صفحة",
    href: "/gallery",
    desc: "Watch our master technicians rebuild engines, repair AC systems, skim brake rotors, and test hybrid vehicles.",
    descAr: "شاهد أعمال الورشة الحقيقية: توضيب المحركات، تصليح المكيف، خرط الدسكات، وصيانة الهايبرد.",
    keywords: ["gallery", "videos", "workshop photos", "engine rebuild video", "معرض الصور", "فيديوهات الصيانة"],
  },
  {
    id: "page-blogs",
    name: "Car Maintenance Tips & News",
    nameAr: "نصائح وإرشادات صيانة السيارات",
    category: "Page",
    categoryAr: "صفحة",
    href: "/blogs",
    desc: "Essential advice for driving in UAE heat: AC maintenance, oil selection, brake checks, and battery longevity.",
    descAr: "دليلك الشامل للحفاظ على سيارتك في حرارة الإمارات: صيانة المكيف، اختيار الزيت، والفرامل.",
    keywords: ["blogs", "articles", "car tips", "heat protection", "مدونة", "نصائح"],
  },
  {
    id: "page-contact",
    name: "Contact Us & Location Map",
    nameAr: "اتصل بنا وموقع الورشة",
    category: "Page",
    categoryAr: "صفحة",
    href: "/contact",
    desc: "Visit our workshop in Industrial Area 5, Sharjah. Call +971 56 440 6456 or WhatsApp us for instant directions.",
    descAr: "تفضل بزيارتنا في المنطقة الصناعية رقم 5، الشارقة. اتصل بنا أو تواصل عبر واتساب للحصول على الموقع.",
    keywords: ["contact", "location", "phone", "whatsapp", "industrial area 5", "sharjah address", "اتصل بنا", "موقعنا"],
  },
  {
    id: "page-faqs",
    name: "Frequently Asked Questions (FAQs)",
    nameAr: "الأسئلة الأكثر تكراراً",
    category: "Page",
    categoryAr: "صفحة",
    href: "/faqs",
    desc: "Clear answers on repair warranties, diagnostics cost, service durations, and payment methods.",
    descAr: "إجابات واضحة حول الضمان، تكلفة الفحص، وقت الصيانة، وحجز المواعيد.",
    keywords: ["faq", "questions", "warranty information", "pricing questions", "الأسئلة الشائعة"],
  },
];

/* ─── UNIFIED COMPLETE SITE SEARCH INDEX ─────────────────────────── */
export const SITE_SEARCH_INDEX: SearchResultItem[] = [
  ...serviceSearchItems,
  ...brandSearchItems,
  ...blogSearchItems,
  ...videoSearchItems,
  ...faqSearchItems,
  ...corePageSearchItems,
];
