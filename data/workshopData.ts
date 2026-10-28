export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  iconName: string;
  features: string[];
  duration?: string;
  warranty?: string;
}

export const WORKSHOP_SERVICES: ServiceItem[] = [
  {
    id: "diagnostics",
    title: "Diagnostics",
    shortDesc: "Advanced computer diagnostics to identify and resolve engine problems",
    fullDesc: "Our state-of-the-art diagnostic scanners interface directly with your car's onboard computer (ECU) to pinpoint fault codes, sensor malfunctions, transmission errors, and electrical issues with 100% precision.",
    image: "/images/ims_b_3.jpg",
    iconName: "cpu",
    features: [
      "Full ECU and sensor scans",
      "Check engine light analysis",
      "Live data monitoring & graphing",
      "Detailed health report with repair recommendations"
    ],
    duration: "30-45 mins",
    warranty: "Diagnostic Accuracy Guarantee"
  },
  {
    id: "oil-change",
    title: "Oil Change",
    shortDesc: "Quick and professional oil change service with premium quality oils",
    fullDesc: "We use only manufacturer-approved, high-grade fully synthetic oils formulated to withstand the intense UAE desert heat, prolonging engine life and maximizing fuel efficiency.",
    image: "/images/service-1.png",
    iconName: "droplets",
    features: [
      "OEM-spec premium synthetic oils (5W-30, 0W-40, etc.)",
      "Genuine oil filter replacement",
      "Comprehensive multi-point vehicle inspection",
      "Fluids top-up (coolant, brake, washer fluid)"
    ],
    duration: "20-30 mins",
    warranty: "Genuine Oil & Filter Guarantee"
  },
  {
    id: "brakes",
    title: "Brakes",
    shortDesc: "Complete brake system inspection, repair and replacement",
    fullDesc: "Ensure maximum safety with our specialized brake service. We inspect pads, rotors, drums, calipers, and hydraulic brake lines, replacing worn parts with genuine ceramic or metallic friction materials.",
    image: "/images/service-2.png",
    iconName: "shield-check",
    features: [
      "Brake pad & rotor replacement",
      "Brake disc skimming / resurfacing",
      "Brake fluid flush & bleeding",
      "ABS sensor & caliper servicing"
    ],
    duration: "45-60 mins",
    warranty: "6 Months / 10,000 KM Warranty"
  },
  {
    id: "suspension",
    title: "Suspension",
    shortDesc: "Full suspension inspection, repair and replacement for a smooth ride",
    fullDesc: "Restore smooth handling, ride comfort, and stability. We service shock absorbers, struts, control arms, ball joints, bushings, and stabilizer links for all vehicle makes.",
    image: "/images/service-5.png",
    iconName: "car",
    features: [
      "Shock absorber & strut replacement",
      "Control arm & bushing renewals",
      "Steering rack & tie rod repair",
      "Noise, vibration, and harshness (NVH) testing"
    ],
    duration: "1-2 hours",
    warranty: "1 Year Workmanship Warranty"
  },
  {
    id: "battery",
    title: "Battery",
    shortDesc: "Battery testing, replacement and charging system diagnostics",
    fullDesc: "Extreme Gulf temperatures drain battery life fast. We test battery cranking power, alternator charging output, and starter motor draw, offering high-durability AGM and maintenance-free batteries.",
    image: "/images/service-8.png",
    iconName: "battery",
    features: [
      "Digital battery health & load testing",
      "Alternator & charging voltage check",
      "Terminal corrosion cleaning & terminal protection",
      "Top-tier brands with up to 2-year warranty"
    ],
    duration: "15-20 mins",
    warranty: "12 to 24 Months Replacement"
  },
  {
    id: "ac-repair",
    title: "A/C Repair",
    shortDesc: "Air conditioning repair and maintenance for optimal comfort",
    fullDesc: "Beat the Sharjah heat with icy-cool air conditioning. We handle refrigerant recharging (R134a / R1234yf), compressor repair, evaporator replacement, condenser cleaning, and leak detection.",
    image: "/images/service-3.png",
    iconName: "fan",
    features: [
      "Precision gas leak detection with UV dye",
      "AC compressor, condenser & evaporator overhaul",
      "Cabin air filter replacement & sanitization",
      "System vacuuming & high-grade gas recharge"
    ],
    duration: "45-90 mins",
    warranty: "Cooling Performance Guarantee"
  },
  {
    id: "tires",
    title: "Tires",
    shortDesc: "Tire inspection, rotation, balancing and replacement service",
    fullDesc: "Stay safe on highway commutes. We inspect tread depth, perform high-speed computerized wheel balancing, laser alignment, and provide tire replacements from Michelin, Bridgestone, Continental, and more.",
    image: "/images/service-6.png",
    iconName: "disc",
    features: [
      "Computerized laser wheel alignment",
      "Dynamic wheel balancing",
      "Puncture repair & valve replacement",
      "Tire rotation & tread wear analysis"
    ],
    duration: "30-45 mins",
    warranty: "Manufacturer Warranty on New Tires"
  },
  {
    id: "computer-programming",
    title: "Computer Programming",
    shortDesc: "ECU programming, software updates and vehicle system configuration",
    fullDesc: "Advanced software calibration, module coding, key programming, and firmware upgrades for luxury and modern European and Japanese automobiles.",
    image: "/images/service-7.png",
    iconName: "code",
    features: [
      "ECU / TCU software updates",
      "Control module adaptation & coding",
      "Sensor calibration & throttle body relearn",
      "Immobilizer & smart key configuration"
    ],
    duration: "1-2 hours",
    warranty: "Software Stability Guarantee"
  }
];

export interface BrandItem {
  name: string;
  category: "German & Luxury" | "Japanese" | "American" | "Korean";
  logo: string;
  specialty: string;
}

export const CAR_BRANDS: BrandItem[] = [
  { name: "Mercedes-Benz", category: "German & Luxury", logo: "/images/brands/Mercedes-Logo.png", specialty: "Star diagnostic, airmatic suspension, transmission service" },
  { name: "BMW", category: "German & Luxury", logo: "/images/brands/bimw.png", specialty: "iDrive updates, twin-turbo maintenance, brake service" },
  { name: "Audi", category: "German & Luxury", logo: "/images/brands/Audi-Logo.jpg", specialty: "Quattro system service, TFSI engine tuning, electrical check" },
  { name: "Porsche", category: "German & Luxury", logo: "/images/brands/Porsche-Logo.jpg", specialty: "Performance diagnostics, PDK transmission, brake overhaul" },
  { name: "Volkswagen", category: "German & Luxury", logo: "/images/brands/Volkswagen-Logo.png", specialty: "DSG service, turbo inspection, computer diagnostics" },
  { name: "Land Rover", category: "German & Luxury", logo: "/images/brands/Land-Rover-Logo.jpg", specialty: "Terrain response system, air suspension, drivetrain repairs" },
  { name: "Toyota", category: "Japanese", logo: "/images/brands/Toyota-Logo.jpg", specialty: "Hybrid system repair, routine periodic maintenance, brake care" },
  { name: "Lexus", category: "Japanese", logo: "/images/brands/Lexus.jpg", specialty: "Luxury electronics, V8/V6 engine tuning, AC conditioning" },
  { name: "Nissan", category: "Japanese", logo: "/images/brands/Nissan-Logo.jpg", specialty: "CVT gearbox service, Patrol V8 diagnostics, suspension" },
  { name: "Infiniti", category: "Japanese", logo: "/images/brands/Infiniti.png", specialty: "VVEL diagnostics, electrical harness, cooling systems" },
  { name: "Honda", category: "Japanese", logo: "/images/brands/Honda-logo.jpg", specialty: "VTEC engine maintenance, brake inspections, AC overhaul" },
  { name: "Mitsubishi", category: "Japanese", logo: "/images/brands/Mitsubishi.jpg", specialty: "4WD system service, Pajero maintenance, transmission repair" },
  { name: "Suzuki", category: "Japanese", logo: "/images/brands/Suzuki.jpg", specialty: "Fuel injection service, brake maintenance, battery testing" },
  { name: "Ford", category: "American", logo: "/images/brands/Ford-Logo.jpg", specialty: "EcoBoost maintenance, transmission fluid, heavy duty brakes" },
  { name: "Chevrolet", category: "American", logo: "/images/brands/Chevrolet-Logo.jpg", specialty: "V8 engine repair, cooling system flush, suspension overhaul" },
  { name: "Jeep", category: "American", logo: "/images/brands/jeep.png", specialty: "4x4 transfer case, suspension lift checks, cooling systems" },
  { name: "Kia", category: "Korean", logo: "/images/brands/Kia-Logo.jpg", specialty: "GDI engine service, air conditioning, routine warranty check" }
];

export interface VideoGalleryItem {
  id: string;
  title: string;
  category: "Engine" | "AC Service" | "Workshop" | "Hybrid";
  videoUrl: string;
  thumbnail?: string;
  description: string;
}

export const WORKSHOP_VIDEOS: VideoGalleryItem[] = [
  {
    id: "mercedes-engine-rebuild",
    title: "Mercedes V8 Engine Rebuild & Timing",
    category: "Engine",
    videoUrl: "/videos/mercedes-engine-rebuild.mp4",
    description: "Full engine teardown, precision block inspection, and timing chain setup on a Mercedes luxury sedan."
  },
  {
    id: "nissan-ac-evaporator",
    title: "Nissan Patrol AC Evaporator Core Replacement",
    category: "AC Service",
    videoUrl: "/videos/nissan-ac-evaporator.mp4",
    description: "Detailed dashboard removal and evaporator unit replacement restoring maximum air conditioning performance."
  },
  {
    id: "toyota-hybrid-repair",
    title: "Toyota Hybrid Inverter & High Voltage Service",
    category: "Hybrid",
    videoUrl: "/videos/toyota-hybrid-repair.mp4",
    description: "Certified hybrid battery testing, module cell balancing, and inverter cooling flush."
  },
  {
    id: "ac-gas-remove",
    title: "Automated AC Refrigerant Recovery & Recharge",
    category: "AC Service",
    videoUrl: "/videos/ac-gas-remove.mp4",
    description: "High-precision digital AC recovery machine extracting old refrigerant and charging fresh lubricant."
  },
  {
    id: "ac-system-flush",
    title: "Complete Air Conditioning System Flush",
    category: "AC Service",
    videoUrl: "/videos/ac-system-flush.mp4",
    description: "Flushing out metallic debris and contaminants from the AC lines prior to compressor replacement."
  },
  {
    id: "mercedes-timing-chain",
    title: "Mercedes Camshaft Phaser & Timing Chain",
    category: "Engine",
    videoUrl: "/videos/mercedes-timing-chain.mp4",
    description: "Precision alignment of camshaft gears and hydraulic chain tensioner replacement."
  },
  {
    id: "workshop-video-1",
    title: "Workshop Tour & Vehicle Lift Diagnostics",
    category: "Workshop",
    videoUrl: "/videos/workshop-video-1.mp4",
    description: "Behind the scenes at Bab Al Bustan in Sharjah Industrial Area 5."
  },
  {
    id: "workshop-video-2",
    title: "Brake Rotor Skimming & Caliper Service",
    category: "Workshop",
    videoUrl: "/videos/workshop-video-2.mp4",
    description: "High-precision on-car brake lathe eliminating pedal vibration and noise."
  },
  {
    id: "workshop-video-3",
    title: "Suspension Arm Bushing Pressing",
    category: "Workshop",
    videoUrl: "/videos/workshop-video-3.mp4",
    description: "Hydraulic press removal and installation of OEM polyurethane suspension bushings."
  },
  {
    id: "workshop-video-5",
    title: "Computer Diagnostic Code Clearing & Road Test",
    category: "Workshop",
    videoUrl: "/videos/workshop-video-5.mp4",
    description: "Live sensor parameter logging and road performance verification."
  }
];

export const WORKSHOP_FAQS = [
  {
    q: "What types of vehicles do you service?",
    a: "We specialize in servicing and repairing a wide range of vehicles, including luxury, German (Mercedes-Benz, BMW, Audi, Porsche, VW), Japanese (Toyota, Lexus, Nissan, Honda), and American cars, using advanced computerized diagnostic tools and factory-trained technicians."
  },
  {
    q: "Where is your auto workshop located in Sharjah?",
    a: "We are located at Industrial Area No 5, Sharjah, UAE. Our workshop is easily accessible from Dubai, Ajman, and all parts of Sharjah, with dedicated customer reception and ample parking."
  },
  {
    q: "Do you offer upfront estimates before starting any work?",
    a: "Yes! 100% transparency is our core promise. We perform an initial inspection, pinpoint the issue, and provide a clear, itemized quote detailing parts and labor before turning a single wrench."
  },
  {
    q: "How long does a standard oil change or minor service take?",
    a: "Our express maintenance services—such as synthetic oil changes, filter renewals, brake inspections, and battery swaps—are typically completed in under 45 to 60 minutes in our dedicated express bays."
  },
  {
    q: "Do you provide warranty on your repair work and parts?",
    a: "Absolutely. All our replacement parts and labor are backed by our workshop guarantee. We use genuine OEM or high-grade certified aftermarket parts that carry full manufacturer warranties."
  },
  {
    q: "Can I book an appointment online or through WhatsApp?",
    a: "Yes! You can easily book an appointment using our online booking form or message our service advisors directly on WhatsApp at +971 56 440 6456 for instant response and priority slot reservation."
  }
];

export const WORKSHOP_SERVICES_AR: ServiceItem[] = [
  {
    id: "diagnostics",
    title: "فحص كمبيوتر وتشخيص الأعطال",
    shortDesc: "فحص إلكتروني متقدم بالكمبيوتر لتحديد وإصلاح جميع أعطال المحرك والحساسات",
    fullDesc: "تتصل أحدث أجهزة الفحص لدينا مباشرة بكمبيوتر سيارتك (ECU) لتحديد أكواد الأعطال، ومشاكل الحساسات، وأعطال الجيربوكس، والأنظمة الكهربائية بدقة 100%.",
    image: "/images/ims_b_3.jpg",
    iconName: "cpu",
    features: [
      "فحص شامل لكمبيوتر السيارة وجميع الحساسات",
      "تحليل وإطفاء لمبة المحرك (Check Engine)",
      "قراءة البيانات الحية ومخططات الأداء",
      "تقرير فحص مفصل مع توصيات الصيانة الدقيقة"
    ],
    duration: "30-45 دقيقة",
    warranty: "ضمان دقة الفحص والتشخيص"
  },
  {
    id: "oil-change",
    title: "تغيير الزيت والفلتر",
    shortDesc: "خدمة تغيير زيت سريعة واحترافية بأجود الزيوت التخليقية المعتمدة",
    fullDesc: "نستخدم فقط زيوتاً تخليقية بالكامل ومعتمدة من الشركات المصنعة مصممة لتحمل حرارة صيف الإمارات القاسية، لحماية المحرك وزيادة كفاءة استهلاك الوقود.",
    image: "/images/service-1.png",
    iconName: "droplets",
    features: [
      "زيوت تخليقية معتمدة ومطابقة للمواصفات الأصلية",
      "استبدال فلتر الزيت الأصلي",
      "فحص شامل متعدد النقاط لسلامة المركبة",
      "تزويد سوائل السيارة (ماء الرديتر، زيت البريك، ماء المساحات)"
    ],
    duration: "20-30 دقيقة",
    warranty: "ضمان الزيت والفلتر الأصلي"
  },
  {
    id: "brakes",
    title: "صيانة وتصليح الفرامل",
    shortDesc: "فحص وصيانة وتبديل نظام الفرامل وخرط الديسكات بأعلى معايير الأمان",
    fullDesc: "اضمن أقصى درجات الأمان مع خدمة الفرامل المتخصصة. نفحص السفايف، الديسكات، الكليبرات، وخراطيم الفرامل، ونقوم بتركيب قطع سيراميك أو معدنية أصلية.",
    image: "/images/service-2.png",
    iconName: "shield-check",
    features: [
      "تبديل سفايف وأقراص الفرامل (الديسكات)",
      "خرط ديسكات ليزري عالي الدقة بدون فك",
      "تفريغ وتجديد سائل الفرامل بالكامل",
      "صيانة حساسات نظام مانع الانغلاق ABS والكليبرات"
    ],
    duration: "45-60 دقيقة",
    warranty: "ضمان 6 أشهر / 10,000 كم"
  },
  {
    id: "suspension",
    title: "المساعدات ونظام التعليق",
    shortDesc: "فحص وصيانة وتبديل نظام التعليق والمساعدات لقيادة مريحة وثابتة",
    fullDesc: "استعد ثبات سيارتك وراحتك على الطريق. نقوم بصيانة وتجديد المساعدات، المقصات، الجلب، ومسامير التوازن لجميع أنواع السيارات.",
    image: "/images/service-5.png",
    iconName: "car",
    features: [
      "تبديل المساعدات والمساعدات الهوائية (الهيدروليك)",
      "تجديد المقصات والجلب وكراسي المساعدات",
      "إصلاح مجمع الدريكسيون ومسامير التوازن",
      "فحص واختبار الضوضاء والاهتزازات بالكامل"
    ],
    duration: "1-2 ساعة",
    warranty: "ضمان مصنعية لمدة عام كامل"
  },
  {
    id: "battery",
    title: "فحص وتبديل البطارية",
    shortDesc: "فحص قوة البطارية والدينامو مع توفير بطاريات معتمدة بضمان شامل",
    fullDesc: "تؤدي حرارة الخليج إلى استنزاف البطاريات بسرعة. نقوم باختبار كفاءة التشغيل، وشحن الدينامو، وتوفير بطاريات AGM وبطاريات لا تحتاج لصيانة بأعلى درجات التحمل.",
    image: "/images/service-8.png",
    iconName: "battery",
    features: [
      "فحص إلكتروني دقيق لكفاءة البطارية وجهد التشغيل",
      "فحص شحن الدينامو ونظام الإشعال",
      "تنظيف أقطاب البطارية وحمايتها من التآكل",
      "أفضل الماركات العالمية بضمان استبدال حتى سنتين"
    ],
    duration: "15-20 دقيقة",
    warranty: "ضمان استبدال من 12 إلى 24 شهراً"
  },
  {
    id: "ac-repair",
    title: "صيانة وتصليح المكيف",
    shortDesc: "صيانة وتعبئة غاز المكيف وإصلاح الكمبروسر لبرودة مثالية في حرارة الصيف",
    fullDesc: "تغلب على حرارة الشارقة بتبريد منعش وقوي. نتولى إعادة تعبئة غاز المكيف، إصلاح الكمبروسر، استبدال الثلاجة، تنظيف الرديتر، وكشف التسريبات بأحدث الأجهزة.",
    image: "/images/service-3.png",
    iconName: "fan",
    features: [
      "كشف دقيق لتسريب الغاز بالأشعة فوق البنفسجية",
      "صيانة وتجديد كمبروسر المكيف والرديتر والثلاجة",
      "استبدال فلتر المكيف وتعقيم المقصورة الداخلية",
      "سحب الهواء (فاكيوم) وشحن غاز تبريد نقي عالي الجودة"
    ],
    duration: "45-90 دقيقة",
    warranty: "ضمان برودة وأداء التكييف"
  },
  {
    id: "tires",
    title: "الإطارات وميزان ليزر",
    shortDesc: "تبديل الإطارات وترصيص وميزان ليزر دقيق لقيادة آمنة واقتصادية",
    fullDesc: "حافظ على سلامتك على الطرق السريعة. نفحص عمق النقشة، ونجري ميزان ليزر كمبيوتري عالي الدقة، ونوفر إطارات ميشلان، بريدجستون، كونتيننتال والمزيد.",
    image: "/images/service-6.png",
    iconName: "disc",
    features: [
      "ميزان ليزر كمبيوتري لضبط زوايا العجلات",
      "ترصيص ديناميكي دقيق لمنع الاهتزازات",
      "إصلاح الثقوب وتبديل البلوف",
      "تدوير الإطارات وفحص تآكل المداس"
    ],
    duration: "30-45 دقيقة",
    warranty: "ضمان الوكيل على الإطارات الجديدة"
  },
  {
    id: "computer-programming",
    title: "برمجة الكمبيوتر والمفاتيح",
    shortDesc: "برمجة كمبيوتر السيارة وتحديث السوفت وير وبرمجة المفاتيح الذكية",
    fullDesc: "معايرة برمجية متقدمة، وترميز وحدات التحكم، وبرمجة المفاتيح، وتحديث البرامج الثابتة للسيارات الفاخرة والأوروبية واليابانية الحديثة.",
    image: "/images/service-7.png",
    iconName: "code",
    features: [
      "تحديث برامج وحدات التحكم بالمحرك والجير (ECU / TCU)",
      "ترميز ومواءمة وحدات التحكم الإلكترونية",
      "معايرة الحساسات وإعادة ضبط بوابة الثروتل",
      "برمجة نظام منع السرقة والمفاتيح الذكية"
    ],
    duration: "1-2 ساعة",
    warranty: "ضمان استقرار السوفت وير والبرمجة"
  }
];

export const WORKSHOP_FAQS_AR = [
  {
    q: "ما هي أنواع السيارات التي تقومون بصيانتها؟",
    a: "نحن متخصصون في خدمة وإصلاح مجموعة واسعة من السيارات، بما في ذلك السيارات الفاخرة والألمانية (مرسيدس بنز، بي إم دبليو، أودي، بورش، فولكس فاجن)، واليابانية (تويوتا، لكزس، نيسان، هوندا)، والأمريكية، باستخدام أحدث أجهزة الفحص المبرمجة وفنيين مدربين."
  },
  {
    q: "أين تقع ورشتكم في الشارقة؟",
    a: "نحن نقع في المنطقة الصناعية رقم 5، الشارقة، الإمارات العربية المتحدة. يسهل الوصول إلى ورشتنا من دبي وعجمان وجميع أنحاء الشارقة، مع صالة استقبال مريحة للعملاء ومواقف واسعة."
  },
  {
    q: "هل تقدمون عرض سعر مفصل قبل بدء العمل؟",
    a: "نعم بكل تأكيد! الشفافية بنسبة 100% هي وعدنا الأساسي. نقوم بفحص أولي لتحديد العطل بدقة، ونقدم عرض سعر مفصل ومكتوب يوضح قطع الغيار وأجور اليد قبل فك أي مسمار."
  },
  {
    q: "كم يستغرق تغيير الزيت أو الصيانة السريعة؟",
    a: "تكتمل خدمات الصيانة السريعة لدينا - مثل تغيير الزيت التخليقي والفلتر، وفحص الفرامل، واستبدال البطارية - عادةً في غضون 45 إلى 60 دقيقة في مسارات الصيانة السريعة المخصصة."
  },
  {
    q: "هل توفرون ضماناً على أعمال الصيانة وقطع الغيار؟",
    a: "نعم بالتأكيد. جميع قطع الغيار وأجور العمل مشمولة بضمان الورشة. نستخدم فقط قطع غيار أصلية OEM أو قطع معتمدة عالية الجودة تحمل ضمان الشركة المصنعة الكامل."
  },
  {
    q: "هل يمكنني حجز موعد عبر الإنترنت أو عبر واتساب؟",
    a: "نعم! يمكنك حجز موعد بسهولة عبر نموذج الحجز في موقعنا أو مراسلة مستشاري الخدمة مباشرة عبر واتساب على الرقم 6456 440 56 971+ للرد الفوري وتأكيد حجزك."
  }
];

export function getWorkshopServices(isArabic: boolean): ServiceItem[] {
  return isArabic ? WORKSHOP_SERVICES_AR : WORKSHOP_SERVICES;
}

export function getWorkshopFaqs(isArabic: boolean): { q: string; a: string }[] {
  return isArabic ? WORKSHOP_FAQS_AR : WORKSHOP_FAQS;
}

export const WORKSHOP_INFO = {
  name: "Bab Al Bustan Auto Maintenance Workshop",
  tagline: "Trusted Car Maintenance in Sharjah",
  address: "Industrial Area No 5, Sharjah, UAE",
  phones: ["+971564406456", "+971557636994"],
  whatsapp: "+971564406456",
  whatsappUrl: "https://api.whatsapp.com/send?phone=971564406456",
  emails: ["info@babalbustanuae.com", "babalbustan1@gmail.com"],
  hours: {
    weekdays: "Saturday - Thursday: 8:00 AM - 9:00 PM",
    break: "Break: 1:30 PM – 3:30 PM",
    friday: "Friday: Closed"
  },
  social: {
    facebook: "https://www.facebook.com/babalbustan2/",
    instagram: "https://www.instagram.com/babalbustan2",
    tiktok: "https://www.tiktok.com/@babalbustan2"
  },
  mapEmbedUrl: "https://maps.google.com/maps?q=BAB%20AL%20BUSTAN%20AUTO%20MAINTENANCE%20WORKSHOP%20Industrial%20Area%205%20-%20Industrial%20Area%20-%20Sharjah&t=&z=15&ie=UTF8&iwloc=&output=embed"
};
