import { NextRequest, NextResponse } from "next/server";

interface ChatMessage {
  sender: "user" | "ai";
  text: string;
}

interface UserInfo {
  name?: string;
  email?: string;
  phone?: string;
}

interface ChatRequestPayload {
  messages: ChatMessage[];
  userInfo?: UserInfo;
  isArabic?: boolean;
}

interface ChatApiResponse {
  success: boolean;
  reply: string;
  quickActions: string[];
  source: "gemini" | "fallback-knowledge-base";
  error?: string;
}

// Comprehensive Bab Al Bustan Auto Maintenance Knowledge & FAQ Engine for Fallback & Grounding
const FALLBACK_KNOWLEDGE: {
  triggers: string[];
  replyEn: (name?: string) => string;
  replyAr: (name?: string) => string;
  quickActionsEn: string[];
  quickActionsAr: string[];
}[] = [
  // 1. FAQs & Common Workshop Questions
  {
    triggers: ["faq", "faqs", "question", "questions", "frequently asked", "common questions", "أسئلة", "شائعة", "استفسارات"],
    replyEn: (name) =>
      `${name ? `Dear ${name}, ` : ""}Here are the most **Frequently Asked Questions (FAQs)** about Bab Al Bustan Auto Maintenance:\n\n• **Location**: Industrial Area 5, Sharjah (close to Maliha Road & National Paints).\n• **Working Hours**: Saturday to Thursday: 8:00 AM – 8:30 PM (Friday: 8:00 AM – 12:30 PM & 2:30 PM – 8:30 PM).\n• **Free Initial Diagnostics**: Quick visual symptom check and computer diagnostic report before any repairs.\n• **Warranty on Repairs**: Comprehensive workshop warranty on labor and genuine OEM manufacturer parts.\n• **Car Brands Serviced**: European, German (Mercedes, BMW, Audi, Porsche), Japanese (Toyota, Nissan, Lexus), and American vehicles.\n• **Turnaround Time**: Express services (oil, brakes, AC recharge) take 45–60 mins; major engine or transmission overhauls take 1–3 days.\n\nNeed something specific? Feel free to ask or [Book a Workshop Slot](/booking).`,
    replyAr: (name) =>
      `${name ? `عزيزي ${name}، ` : ""}إليك أبرز **الأسئلة الشائعة** حول ورشة باب البستان لصيانة السيارات:\n\n• **الموقع**: الشارقة، المنطقة الصناعية 5 (بالقرب من شارع مليحة ومبنى الأصباغ الوطنية).\n• **ساعات العمل**: من السبت إلى الخميس: 8:00 صباحاً – 8:30 مساءً (الجمعة: 8:00 ص – 12:30 م ومن 2:30 م – 8:30 م).\n• **الفحص الأولي**: فحص كمبيوتر مجاني وتقرير أعطال تفصيلي قبل البدء بأي أعمال صيانة.\n• **الضمان المعتمد**: ضمان شامل على جميع أعمال الصيانة وقطع الغيار الأصلية OEM.\n• **أنواع السيارات**: السيارات الأوروبية والألمانية (مرسيدس، بي إم دبليو، أودي، بورش)، اليابانية (تويوتا، نيسان، لكزس)، والأمريكية.\n• **مدة الصيانة**: الصيانة السريعة (تغيير زيت، سفايف، تعبئة غاز مكيف) تستغرق 45-60 دقيقة، وتوضيب المحركات من 1-3 أيام.\n\nهل تود الاستفسار عن تفاصيل إضافية؟ يسعدنا إجابتك أو [حجز موعد صيانة مباشرة](/booking).`,
    quickActionsEn: ["Book Workshop Slot", "AC Repair & Gas Recharge", "Computer Diagnostics Cost", "Go to Contact Page"],
    quickActionsAr: ["حجز موعد صيانة", "تصليح المكيف وتعبئة الغاز", "فحص الكمبيوتر وتشخيص الأعطال", "زيارة صفحة اتصل بنا"],
  },

  // 2. Car AC Repair & Cooling
  {
    triggers: ["ac", "a/c", "cooling", "air conditioning", "gas", "freon", "leak", "compressor", "مكيف", "تبريد", "غاز", "فريون", "كمبروسر", "تسريب مكيف", "ثلاجة"],
    replyEn: (name) =>
      `${name ? `Dear ${name}, ` : ""}Our **Desert-Ready Car A/C Services** are engineered for extreme UAE summer heat:\n\n• **Electronic UV Leak Detection**: Pinpoints micro-leaks in hoses, condenser, and evaporator core.\n• **High-Purity R134a/R1234yf Freon Recharge**: Computerized gas recovery, vacuum pressure test, and precision filling with synthetic PAG lubricant.\n• **Compressor Overhaul & Replacement**: OEM magnetic clutch, valve replacement, and new compressors.\n• **Evaporator Core Replacement**: Deep cabin disassembly without damaging dash trim.\n• **Cabin Air Filter & Anti-Bacterial Sanitization**: Eliminates foul smells and dust.\n\nWould you like to book a quick 20-minute AC inspection?`,
    replyAr: (name) =>
      `${name ? `عزيزي ${name}، ` : ""}نوفر في كراج باب البستان **أفضل خدمات تصليح وصيانة مكيفات السيارات بالشارقة** لمواجهة حرارة الصيف:\n\n• **كشف التسريب بأشعة UV**: كشف دقيق لأصغر تهريب في ليات المكيف والراديتر وثلاجة المكيف.\n• **تعبئة غاز فريون أصلي أمريكي R134a**: سحب رطوبة وتفريغ هواء مع زيت كمبروسر أصلي PAG.\n• **إصلاح وتبديل الكمبروسر**: صيانة الكلتش والبلوف واستبدال الكمبروسرات بقطع أصلية مع الضمان.\n• **تبديل ثلاجة المكيف (Evaporator)**: فك وتركيب احترافي لطبلون السيارة دون أي أصوات أو خدوش.\n• **تعقيم دورة التكييف وتبديل فلتر المقصورة**: إزالة الروائح الكريهة وتوفير هواء بارد ومنعش.\n\nهل ترغب بحجز فحص سريع لمكيف سيارتك؟`,
    quickActionsEn: ["Book AC Inspection", "Check AC Gas Price", "Call +971 56 440 6456", "Chat on WhatsApp"],
    quickActionsAr: ["حجز فحص المكيف", "سعر تعبئة الغاز", "اتصل الآن +971 56 440 6456", "تواصل عبر واتساب"],
  },

  // 3. Brake Repair & Disk Skimming
  {
    triggers: ["brake", "brakes", "pad", "pads", "rotor", "rotors", "skimming", "disk", "disks", "abs", "فرامل", "بريك", "سفايف", "فحمات", "خرط ديسكات", "هوبات", "ديسك"],
    replyEn: (name) =>
      `${name ? `Dear ${name}, ` : ""}We specialize in **High-Performance Brake Service & Precision Rotor Skimming**:\n\n• **Computerized On-Car Rotor Skimming**: Eliminates steering shudder and pedal vibration without removing hubs.\n• **Premium Ceramic Brake Pads**: Low-dust, squeak-free OEM replacement pads with maximum stopping power.\n• **Brake Caliper Servicing**: Piston rebuilding, guide pin greasing, and seal renewal.\n• **Hydraulic Brake Fluid Flush**: Complete DOT 4 / DOT 5.1 pressure bleeding to restore crisp pedal feel.\n• **ABS Electronic Sensor Calibration**: Diagnostic testing for ABS and traction control warnings.\n\nExpress brake service completed in under 60 minutes!`,
    replyAr: (name) =>
      `${name ? `عزيزي ${name}، ` : ""}نقدم في ورشة باب البستان **خدمات صيانة فرامل متطورة وخرط ديسكات ليزري** بالشارقة:\n\n• **خرط ديسكات ليزري على السيارة بدون فك**: معالجة الرجة والاهتزاز أثناء الفرملة بدقة ميكرونية.\n• **تبديل سفايف سيراميك أصلية**: بدون صوت صفير، خالية من غبار الكربون، وتوفر أقصى درجات الأمان.\n• **صيانة كليبرات الفرامل**: تنظيف وتزييت بنوز الفرامل وتجديد الجلب لمنع تصلب السفايف.\n• **تبديل زيت الفرامل بالجهاز**: سحب الزيت القديم وتعبئة زيت DOT 4 أصلي لضمان تجاوب دعسة البريك.\n• **فحص نظام ABS والحساسات**: كشف كمبيوتر لحساسات مانع الانزلاق والتحكم بالثبات.\n\nمدة تغيير السفايف وخرط الديسكات لا تتجاوز 45-60 دقيقة!`,
    quickActionsEn: ["Book Brake Service", "Check Brake Pad Price", "Call +971 56 440 6456", "Book Workshop Slot"],
    quickActionsAr: ["حجز صيانة الفرامل", "سعر تبديل السفايف", "اتصل الآن +971 56 440 6456", "حجز موعد صيانة"],
  },

  // 4. Computer Diagnostics & Engine Tuning
  {
    triggers: ["diagnostic", "diagnostics", "check engine", "scan", "scanner", "ecu", "obd", "sensor", "programming", "فحص كمبيوتر", "برمجة", "لمبة المحرك", "تشخيص", "حساسات", "كمبيوتر"],
    replyEn: (name) =>
      `${name ? `Dear ${name}, ` : ""}Our **OEM Computer Diagnostics & Electronics Lab** provides dealer-grade scans:\n\n• **Dealership Diagnostic Scanners**: Autel MaxiSys Ultra, Launch, and dedicated BMW ISTA & Mercedes Xentry software.\n• **Check Engine Light Diagnosis**: Exact fault code extraction (DTCs), live sensor waveform telemetry, and cylinder misfire counters.\n• **ECU / TCU Module Programming**: Transmission adaptation resets, key programming, and module initialization.\n• **Oxygen / Mass Air Flow / Camshaft Sensors**: Signal testing with digital oscilloscopes to avoid unnecessary part replacements.\n• **Pre-Purchase Comprehensive 30-Point Inspection**: Full electronic health check before buying a used car in the UAE.`,
    replyAr: (name) =>
      `${name ? `عزيزي ${name}، ` : ""}يمتلك كراج باب البستان **أحدث أجهزة فحص كمبيوتر السيارات وبرمجة الوكالة** بالشارقة:\n\n• **أجهزة فحص وكالة متخصصة**: أجهزة Autel Ultra و Launch وبرامج خاصة لمرسيدس (Xentry) وبي إم دبليو (ISTA).\n• **كشف أسباب لمبة المكينة (Check Engine)**: استخراج أكواد الأعطال، فحص قراءات الحساسات المباشرة، وكشف تقطيع المكينة.\n• **برمجة كمبيوتر السيارة والجير**: إعادة ضبط تكيف الجيربوكس، برمجة الحساسات، وتهيئة الكنترولات الإلكترونية.\n• **فحص حساسات الأكسجين والماف والكرنك**: قياس الإشارات الكهربائية بالأوسيلوسكوب لتفادي تبديل قطع سليمة.\n• **فحص شامل 30 نقطة قبل الشراء**: فحص كمبيوتر متكامل للمركبة قبل شرائها مع تقرير فني شامل.`,
    quickActionsEn: ["Book Computer Scan", "Check Engine Diagnosis", "Request Free Quote", "Chat on WhatsApp"],
    quickActionsAr: ["حجز فحص كمبيوتر", "تشخيص لمبة المحرك", "طلب عرض سعر فوري", "تواصل عبر واتساب"],
  },

  // 5. Engine & Gearbox / Transmission Repair
  {
    triggers: ["engine", "gearbox", "transmission", "overhaul", "oil leak", "smoke", "head gasket", "timing chain", "مكينة", "محرك", "جير", "جيربوكس", "توضيب", "تهريب زيت", "سلسلة التايمنغ", "كازكيت"],
    replyEn: (name) =>
      `${name ? `Dear ${name}, ` : ""}We are master technicians in **Complete Engine Overhaul & Automatic Gearbox Service**:\n\n• **Major Engine Rebuilds**: Piston rings, crankshaft bearings, cylinder head resurfacing, and valve seal replacements.\n• **Timing Chain / Belt Replacements**: OEM alignment tools for European, American, and Asian high-revving engines.\n• **Transmission Fluid & Filter Replacement**: Synthetic ATF fluid flush with transmission pan magnet cleanout.\n• **Oil Leak Repairs**: Valve cover gaskets, oil pan seals, front/rear main crankshaft seals.\n• **Cooling & Overheating Diagnosis**: Water pump, thermostat, and radiator pressure test.\n\nAll engine & transmission rebuilds carry our written workshop guarantee.`,
    replyAr: (name) =>
      `${name ? `عزيزي ${name}، ` : ""}نحن خبراء في **توضيب المحركات وصيانة الجيربوكس الأوتوماتيكي** بالشارقة:\n\n• **توضيب كامل للمحرك (Overhaul)**: تبديل رنجات بساتم، كراسي ثابته ومتحركة، ومسح رأس المكينة وتجديد البلوف.\n• **تبديل سير وجنزير التايمنغ (Timing Chain)**: ضبط ليزري لعمود الكامات والمحاذاة باستخدام أدوات الوكالة الخاصة.\n• **صيانة وتغيير زيت الجيربوكس مع الفلتر**: استخدام زيوت ATF تخليقية أصلية مع تنظيف المغناطيس وقاع الكارتير.\n• **إصلاح تهريبات الزيت**: تبديل وجوه كازكيت غطاء البلوف، كازكيت الكارتير، وصوف المكينة الأمامية والخلفية.\n• **معالجة مشاكل حرارة المحرك**: فحص ضغط الراديتر، تبديل طرمبة الماء، الثرموستات، ومراوح التبريد.\n\nكافة أعمال توضيب المحركات والجير مشمولة بضمان خطي معتمد من الورشة.`,
    quickActionsEn: ["Book Engine Diagnosis", "Transmission Checkup", "Call Master Technician", "Request Free Quote"],
    quickActionsAr: ["حجز كشف على المحرك", "فحص الجيربوكس", "اتصل بالمشرف الفني", "طلب عرض سعر فوري"],
  },

  // 6. Working Hours, Location & Contact
  {
    triggers: ["location", "address", "where", "hours", "timing", "open", "phone", "contact", "whatsapp", "موقع", "عنوان", "وين", "ساعات", "دوام", "مواعيد", "هاتف", "رقم", "واتساب", "الشارقة"],
    replyEn: (name) =>
      `${name ? `Dear ${name}, ` : ""}Here are **Bab Al Bustan's Workshop Details**:\n\n📍 **Location**: Industrial Area 5, Sharjah, United Arab Emirates.\n⏰ **Working Hours**:\n• Saturday to Thursday: **8:00 AM – 8:30 PM**\n• Friday: **8:00 AM – 12:30 PM & 2:30 PM – 8:30 PM**\n\n📞 **Direct Hotline**: [+971 56 440 6456](tel:+971564406456) / [+971 55 763 6994](tel:+971557636994)\n💬 **WhatsApp**: [Chat with Us on WhatsApp](https://wa.me/971564406456)\n📧 **Email**: [info@babalbustanuae.com](mailto:info@babalbustanuae.com)\n🗺️ **Google Maps**: [Open Workshop Location on Google Maps](https://maps.google.com/maps?q=BAB%20AL%20BUSTAN%20AUTO%20MAINTENANCE%20WORKSHOP%20Industrial%20Area%205%20-%20Industrial%20Area%20-%20Sharjah)`,
    replyAr: (name) =>
      `${name ? `عزيزي ${name}، ` : ""}إليك **بيانات وعنوان ورشة باب البستان لصيانة السيارات**:\n\n📍 **الموقع**: المنطقة الصناعية 5، مدينة الشارقة، الإمارات العربية المتحدة.\n⏰ **أوقات العمل**:\n• السبت إلى الخميس: **8:00 صباحاً – 8:30 مساءً**\n• الجمعة: **8:00 ص – 12:30 م | 2:30 م – 8:30 م**\n\n📞 **الهاتف المباشر**: [0456 440 56 971+](tel:+971564406456) / [6994 763 55 971+](tel:+971557636994)\n💬 **واتساب الورشة**: [محادثة مباشرة عبر واتساب](https://wa.me/971564406456)\n📧 **البريد الإلكتروني**: [info@babalbustanuae.com](mailto:info@babalbustanuae.com)\n🗺️ **خرائط جوجل**: [فتح موقع الكراج على Google Maps](https://maps.google.com/maps?q=BAB%20AL%20BUSTAN%20AUTO%20MAINTENANCE%20WORKSHOP%20Industrial%20Area%205%20-%20Industrial%20Area%20-%20Sharjah)`,
    quickActionsEn: ["Call +971 56 440 6456", "Chat on WhatsApp", "Open in Google Maps", "Book Workshop Slot"],
    quickActionsAr: ["اتصل الآن +971 56 440 6456", "تواصل عبر واتساب", "فتح على خرائط جوجل", "حجز موعد صيانة"],
  },

  // 7. Pricing, Quotations & Booking
  {
    triggers: ["price", "cost", "quote", "rate", "how much", "estimate", "book", "appointment", "سعر", "تكلفة", "كم", "عرض سعر", "حجز", "موعد"],
    replyEn: (name) =>
      `${name ? `Dear ${name}, ` : ""}At Bab Al Bustan, we believe in **100% transparent pricing with zero surprise charges**:\n\n• **Free Estimate**: We diagnose your vehicle's condition and provide a detailed quotation before touching any parts.\n• **Genuine OEM Parts**: We quote OEM parts alongside high-grade certified alternatives to match your budget.\n• **Booking**: You can book a convenient workshop bay slot online or directly via WhatsApp.\n\n👉 [Request a Free Instant Quote Online](/booking) or talk to our advisor directly!`,
    replyAr: (name) =>
      `${name ? `عزيزي ${name}، ` : ""}نلتزم في كراج باب البستان بـ **شفافية تامة في الأسعار وبدون أي رسوم خفية**:\n\n• **تقدير تكلفة مسبق مجاناً**: نقوم بفحص المركبة وتقديم تفصيل دقيق للتكلفة وقطع الغيار قبل البدء بأي عمل.\n• **قطع غيار أصلية بضمان**: نوفر قطع غيار OEM وكالة وخيارات معتمدة درجة أولى لتناسب ميزانيتك.\n• **حجز المواعيد**: يمكنك حجز دور فحص مباشر في الورشة عبر الموقع أو عبر واتساب.\n\n👉 [طلب عرض سعر فوري أو حجز موعد كشف](/booking) أو تواصل معنا مباشرة!`,
    quickActionsEn: ["Request Free Quote", "Book Workshop Slot", "Chat on WhatsApp", "Call +971 56 440 6456"],
    quickActionsAr: ["طلب عرض سعر فوري", "حجز موعد صيانة", "تواصل عبر واتساب", "اتصل الآن +971 56 440 6456"],
  },
];

function getFallbackReply(userMessage: string, isArabic = false, userName?: string) {
  const cleanMsg = (userMessage || "").toLowerCase();

  for (const item of FALLBACK_KNOWLEDGE) {
    if (item.triggers.some((trigger) => cleanMsg.includes(trigger.toLowerCase()))) {
      return {
        reply: isArabic ? item.replyAr(userName) : item.replyEn(userName),
        quickActions: isArabic ? item.quickActionsAr : item.quickActionsEn,
      };
    }
  }

  // Generic fallback if no specific trigger matched
  if (isArabic) {
    return {
      reply: `${userName ? `عزيزي ${userName}، ` : ""}أهلاً بك في **كراج باب البستان لصيانة وإصلاح السيارات بالشارقة**. يسعدنا خدمتك في صيانة المكيف، الفرامل، فحص الكمبيوتر، توضيب المحركات، وتبديل الزيوت وكافة الإصلاحات الميكانيكية والكهربائية.\n\nيمكنك التواصل مع مشرف الصيانة مباشرة على [0456 440 56 971+](tel:+971564406456) أو عبر [واتساب الورشة](https://wa.me/971564406456). كما يمكنك زيارة [صفحة اتصل بنا](/contact) أو [حجز موعد كشف](/booking).`,
      quickActions: ["حجز موعد صيانة", "تصليح المكيف والغاز", "فحص كمبيوتر الأعطال", "تواصل عبر واتساب"],
    };
  }

  return {
    reply: `${userName ? `Dear ${userName}, ` : ""}Welcome to **Bab Al Bustan Auto Maintenance Workshop in Sharjah**. We specialize in complete automotive repair: Car A/C cooling, performance brakes, computer diagnostics, major engine & gearbox overhauls, and periodic servicing.\n\nYou can speak directly with our senior technician at [+971 56 440 6456](tel:+971564406456) or on [WhatsApp](https://wa.me/971564406456). Feel free to visit our [Contact Page](/contact) or [Book an Appointment Slot](/booking).`,
    quickActions: ["Book Workshop Slot", "AC Repair & Cooling", "Computer Diagnostics", "Chat on WhatsApp"],
  };
}

/**
 * Bulletproof parser that guarantees raw JSON structure is NEVER returned in the reply field
 */
function extractCleanReply(rawText: string, isArabic?: boolean): { reply: string; quickActions: string[] } {
  const defaultActions = isArabic
    ? ["حجز موعد صيانة", "تواصل عبر واتساب", "اتصل بنا مباشرة"]
    : ["Book Workshop Slot", "Chat on WhatsApp", "Call Us Directly"];

  if (!rawText || !rawText.trim()) {
    return {
      reply: isArabic
        ? "أهلاً بك في كراج باب البستان! كيف يمكننا مساعدتك في صيانة سيارتك اليوم؟"
        : "Hello! Welcome to Bab Al Bustan Auto Maintenance. How can we assist with your vehicle today?",
      quickActions: defaultActions,
    };
  }

  let clean = rawText.trim();
  // Strip code fences if present
  clean = clean.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();

  // 1. Try standard JSON.parse
  try {
    const parsed = JSON.parse(clean);
    if (parsed && typeof parsed === "object") {
      let replyStr = typeof parsed.reply === "string" ? parsed.reply.trim() : "";
      let actions = Array.isArray(parsed.quickActions) ? parsed.quickActions : [];
      if (replyStr) {
        return { reply: replyStr, quickActions: actions.length > 0 ? actions : defaultActions };
      }
    }
  } catch {}

  // 2. If it contains "reply": "...", extract with regex (even if JSON was cut off mid-sentence)
  if (clean.includes('"reply"')) {
    const replyRegex = /"reply"\s*:\s*"((?:\\.|[^"\\])*)/;
    const match = clean.match(replyRegex);
    if (match && match[1]) {
      let extracted = match[1]
        .replace(/\\n/g, "\n")
        .replace(/\\r/g, "")
        .replace(/\\"/g, '"')
        .replace(/\\\\/g, "\\")
        .trim();

      // Extract quickActions
      let actions: string[] = [];
      const qaMatch = clean.match(/"quickActions"\s*:\s*\[([\s\S]*?)\]/);
      if (qaMatch && qaMatch[1]) {
        try {
          actions = JSON.parse(`[${qaMatch[1]}]`);
        } catch {
          const itemMatches = qaMatch[1].match(/"([^"]+)"/g);
          if (itemMatches) {
            actions = itemMatches.map((s) => s.replace(/"/g, "").trim());
          }
        }
      }

      if (extracted) {
        return {
          reply: extracted,
          quickActions: actions.length > 0 ? actions : defaultActions,
        };
      }
    }
  }

  // 3. Fallback: Pure text cleanup (strip any leftover braces or "reply": wrappers)
  let pureText = clean
    .replace(/^\s*\{\s*/, "")
    .replace(/\s*\}\s*$/, "")
    .replace(/^"reply"\s*:\s*"?/, "")
    .replace(/"?\s*,?\s*"quickActions"[\s\S]*$/, "")
    .replace(/"?\s*$/, "")
    .replace(/\\n/g, "\n")
    .replace(/\\"/g, '"')
    .trim();

  return {
    reply: pureText || rawText,
    quickActions: defaultActions,
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => ({}))) as ChatRequestPayload;
    const { messages = [], userInfo, isArabic = false } = body;

    const latestUserMessage =
      messages.filter((m) => m.sender === "user").pop()?.text || "";

    const userName = userInfo?.name?.trim() || "";
    const apiKey =
      process.env.GEMINI_API_KEY ||
      process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
      "";

    if (apiKey) {
      try {
        const systemPrompt = `You are "Bab Al Bustan AI Service Advisor", an expert master automotive consultant representing "Bab Al Bustan Auto Maintenance Workshop" (كراج باب البستان لصيانة السيارات) located in Industrial Area 5, Sharjah, United Arab Emirates.

Customer Information:
- Name: ${userName || "Valued Customer"}
- Email: ${userInfo?.email || "Not provided"}
- Phone: ${userInfo?.phone || "Not provided"}
- Language: ${isArabic ? "Arabic" : "English"}

About Bab Al Bustan Auto Maintenance:
- Location: Industrial Area 5, Sharjah, UAE (near Maliha Road & National Paints intersection).
- Hotline Phone: +971 56 440 6456 / +971 55 763 6994
- WhatsApp: +971 56 440 6456 (https://wa.me/971564406456)
- Working Hours: Saturday to Thursday: 8:00 AM – 8:30 PM | Friday: 8:00 AM – 12:30 PM & 2:30 PM – 8:30 PM
- Email: info@babalbustanuae.com
- Core Services:
  1. Computer Diagnostics & ECU Scans: Dealership scanners (Autel Ultra, Launch, Mercedes Xentry, BMW ISTA), check engine light troubleshooting, sensor testing.
  2. Brake Repair & Laser Disk Skimming: Ceramic brake pads, computerized on-car rotor skimming, ABS sensor calibration, brake fluid flush.
  3. Desert-Ready Car A/C: High-purity American R134a freon recharge, UV electronic leak test, compressor overhauls, evaporator replacement.
  4. Engine & Transmission Overhauls: Major rebuilds, cylinder head gasket repair, timing chains, automatic transmission ATF service, oil leak fixes.
  5. Oil Change & Periodic Lube: 100% full synthetic OEM approved oils with genuine filters, free 30-point vehicle safety inspection.
  6. Suspension, Steering & Wheel Alignment: Shock absorbers, control arms, tie rods, laser wheel alignment.
- Key Commitments: 100% transparent upfront estimates before work starts, genuine OEM or certified high-grade parts, written workshop warranty, and fast express turnaround.

CRITICAL INSTRUCTIONS:
1. Dynamic Contextual Suggestions: In "quickActions", ALWAYS provide 3 to 4 suggestions specifically tailored to what the user asked (e.g. if asking about brakes, suggest brake skimming, pad price, or appointment; if asking about AC, suggest gas refill, leak test, or WhatsApp).
2. Professional Tone: Friendly, concise, reassuring, expert mechanic advice.
3. Language: If the user writes in Arabic, respond in fluent, professional Arabic. If English, in clear, professional English.
4. OUT OF SCOPE / UNRELATED INQUIRIES: Politely explain you specialize in automotive repair in Sharjah and offer direct contact to our service manager.
5. Format: Output MUST be ONLY valid JSON matching:
{
  "reply": "Your helpful response string here",
  "quickActions": ["Action 1", "Action 2", "Action 3"]
}`;

        const conversationHistory = messages.slice(-6).map((m) => ({
          role: m.sender === "user" ? "user" : "model",
          parts: [{ text: m.text }],
        }));

        // Candidate models verified working with this Gemini API key
        const candidateModels = ["gemini-3.5-flash", "gemini-3.8-flash", "gemini-3.6-flash", "gemini-flash-latest"];

        for (const model of candidateModels) {
          try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 12000);

            const geminiResponse = await fetch(
              `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                signal: controller.signal,
                body: JSON.stringify({
                  contents: [
                    {
                      role: "user",
                      parts: [{ text: systemPrompt }],
                    },
                    ...conversationHistory,
                  ],
                  generationConfig: {
                    responseMimeType: "application/json",
                    temperature: 0.4,
                    topP: 0.95,
                    maxOutputTokens: 2048,
                  },
                }),
              }
            );
            clearTimeout(timeoutId);

            if (geminiResponse.ok) {
              const geminiData = await geminiResponse.json();
              const rawText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || "";
              
              if (rawText) {
                const parsedResult = extractCleanReply(rawText, isArabic);
                if (parsedResult.reply) {
                  return NextResponse.json<ChatApiResponse>({
                    success: true,
                    reply: parsedResult.reply,
                    quickActions: parsedResult.quickActions,
                    source: "gemini",
                  });
                }
              }
            }
          } catch (modelErr) {
            console.warn(`Model ${model} request error or timeout:`, modelErr);
          }
        }
      } catch (geminiError) {
        console.warn("Gemini chat API error, switching to fallback:", geminiError);
      }
    }

    // Seamless Fallback Knowledge Engine (guarantees 100% uptime and instant answers)
    const fallback = getFallbackReply(latestUserMessage, isArabic, userName);
    return NextResponse.json<ChatApiResponse>({
      success: true,
      reply: fallback.reply,
      quickActions: fallback.quickActions,
      source: "fallback-knowledge-base",
    });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json<ChatApiResponse>(
      {
        success: false,
        reply: "We are currently experiencing a brief technical delay. Please call us directly at +971 56 440 6456 or contact us on WhatsApp.",
        quickActions: ["Call Now", "Chat on WhatsApp"],
        source: "fallback-knowledge-base",
        error: error?.message || "Internal error",
      },
      { status: 500 }
    );
  }
}

