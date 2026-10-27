import { NextRequest, NextResponse } from "next/server";
import { SITE_SEARCH_INDEX, SearchResultItem } from "@/data/searchIndex";

interface ImageSearchResponse {
  success: boolean;
  detectedEn: string;
  detectedAr: string;
  category: "Service" | "Brand" | "Blog" | "Video" | "Page";
  confidence: "high" | "medium" | "low";
  descriptionEn: string;
  descriptionAr: string;
  matchedItems: SearchResultItem[];
  suggestedKeywords: string[];
  aiSource: "gemini" | "catalog-matcher";
}

const AUTOMOTIVE_FALLBACK_PATTERNS = [
  {
    keywords: ["brake", "rotor", "disc", "pad", "caliper", "squeak", "friction", "drum", "abs"],
    detectedEn: "Brake System & Rotor Wear",
    detectedAr: "تآكل واستهلاك نظام الفرامل والدسكات",
    category: "Service" as const,
    descriptionEn: "Identified vehicle brake assembly or friction material wear. Bab Al Bustan provides high-precision disc skimming, ceramic pad replacement, and brake hydraulic bleeding.",
    descriptionAr: "تم رصد تآكل في فحمات الفرامل أو أقراص الدسكات. يقدم كراج باب البستان خرط الدسكات بدقة ليزرية وتبديل السفايف لفرملة آمنة.",
    searchTerms: ["brakes", "brake pad", "rotor", "caliper", "skimming"],
  },
  {
    keywords: ["oil", "leak", "filter", "engine oil", "dipstick", "pan", "dark oil", "drip", "lube"],
    detectedEn: "Engine Oil Condition & Fluid Leak",
    detectedAr: "حالة زيت المحرك أو تسريب سوائل",
    category: "Service" as const,
    descriptionEn: "Detected engine oil maintenance or fluid seepage. We provide express fully synthetic oil service formulated for UAE heat, OEM filter renewals, and leak pinpointing.",
    descriptionAr: "تم رصد حاجة لتغيير زيت المحرك أو وجود تسريب. نوفر زيوتاً تخليقية أصلية تتحمل درجات حرارة الصيف وفلاتر معتمدة مع فحص شامل.",
    searchTerms: ["oil change", "oil filter", "engine oil", "diagnostics"],
  },
  {
    keywords: ["ac", "air condition", "compressor", "gas", "freon", "cooling", "evaporator", "condenser", "r134a"],
    detectedEn: "Automotive A/C System & Cooling Unit",
    detectedAr: "نظام تكييف المركبة وشحن الغاز",
    category: "Service" as const,
    descriptionEn: "Detected car air conditioning component. We offer digital leak detection, high-grade refrigerant recharge (R134a/R1234yf), and compressor overhauls for ice-cold airflow.",
    descriptionAr: "تم التعرف على أجزاء مكيف السيارة. نوفر كشف تسريب الغاز بالأشعة فوق البنفسجية وشحن الغاز وصيانة الكمبريسور لضمان برودة ممتازة.",
    searchTerms: ["ac repair", "air conditioning", "compressor", "freon"],
  },
  {
    keywords: ["battery", "terminal", "corrosion", "alternator", "voltage", "starter", "agm"],
    detectedEn: "Vehicle Battery & Electrical Charging",
    detectedAr: "بطارية السيارة ومنظومة الشحن الكهربائي",
    category: "Service" as const,
    descriptionEn: "Detected car 12V battery or terminal corrosion. Bab Al Bustan provides load testing, alternator health check, and high-durability battery replacement with up to 2-year warranty.",
    descriptionAr: "تم رصد بطارية السيارة أو تكلس الأقطاب. نوفر فحص جهد الدينامو وتبديل البطاريات بماركات معتمدة ومقاومة للحرارة مع الضمان.",
    searchTerms: ["battery", "charging", "electrical", "starter"],
  },
  {
    keywords: ["suspension", "shock", "strut", "bushing", "control arm", "spring", "ball joint", "tie rod"],
    detectedEn: "Vehicle Suspension & Shock Absorber",
    detectedAr: "نظام التعليق والمساعدات ومقصات السيارة",
    category: "Service" as const,
    descriptionEn: "Identified vehicle suspension component or fluid leakage from shock absorber. We replace bushings, struts, and stabilizer links for smooth and safe ride quality.",
    descriptionAr: "تم رصد مساعدات السيارة أو تلف الجلب والمقصات. نوفر استبدال المساعدات وضبط ميزان الرودات للتخلص من الأصوات والاهتزازات.",
    searchTerms: ["suspension", "shock absorber", "strut", "bushings"],
  },
  {
    keywords: ["tire", "tread", "wheel", "rim", "puncture", "alignment", "camber", "sidewall", "wear"],
    detectedEn: "Tire Tread Wear & Wheel Alignment",
    detectedAr: "تآكل مداس الإطار أو حاجة لميزان العجلات",
    category: "Service" as const,
    descriptionEn: "Detected tire wear, uneven shoulder wear, or tread degradation. We offer 3D laser alignment, dynamic computerized wheel balancing, and tire rotations.",
    descriptionAr: "تم رصد مسح في نقشة الإطار أو استهلاك غير متساوٍ. نوفر ميزان ليزري إلكتروني وترصيص دقيق لسلامتك على الطرق السريعة.",
    searchTerms: ["tires", "wheel alignment", "balancing", "tread wear"],
  },
  {
    keywords: ["check engine", "obd", "code", "ecu", "scanner", "dashboard", "warning light", "sensor", "programmer"],
    detectedEn: "Engine Management & ECU Diagnostic Warning",
    detectedAr: "لمبة فحص المحرك وبرمجة كمبيوتر السيارة",
    category: "Service" as const,
    descriptionEn: "Identified dashboard warning indicator or electronic fault code. Our dealership-grade diagnostic scanners read live sensor parameters and reset fault codes with precision.",
    descriptionAr: "تم رصد علامة تحذير في لوحة العدادات أو رمز عطل. نستخدم أحدث أجهزة فحص الكمبيوتر لقراءة كود العطل واختبار الحساسات بدقة.",
    searchTerms: ["diagnostics", "computer programming", "ecu", "scanner"],
  },
  {
    keywords: ["mercedes", "bmw", "audi", "porsche", "volkswagen", "lexus", "toyota", "nissan", "ford", "luxury"],
    detectedEn: "Luxury & German/Japanese Vehicle Model",
    detectedAr: "فحص وصيانة المركبات الفاخرة والألمانية واليابانية",
    category: "Brand" as const,
    descriptionEn: "Recognized car model or manufacturer badge. Bab Al Bustan provides specialized factory-grade maintenance for German, Japanese, and American automobiles.",
    descriptionAr: "تم التعرف على طراز المركبة. يمتلك كراجنا خبرة عريقة في صيانة وتصليح السيارات الألمانية واليابانية بقطع أصلية.",
    searchTerms: ["mercedes", "bmw", "audi", "toyota", "brands"],
  },
];

function scoreAndRankItems(keywords: string[], preferredCategory?: string): SearchResultItem[] {
  const queryWords = keywords.map((k) => k.toLowerCase().trim()).filter(Boolean);
  const scored: { item: SearchResultItem; score: number }[] = [];

  SITE_SEARCH_INDEX.forEach((item) => {
    let score = 0;
    const nameLower = item.name.toLowerCase();
    const nameAr = (item.nameAr || "").toLowerCase();
    const descLower = item.desc.toLowerCase();
    const itemKeywords = item.keywords.map((k) => k.toLowerCase());

    queryWords.forEach((word) => {
      if (nameLower.includes(word) || nameAr.includes(word)) {
        score += 80;
      }
      if (itemKeywords.some((k) => k.includes(word) || word.includes(k))) {
        score += 50;
      }
      if (descLower.includes(word)) {
        score += 25;
      }
    });

    if (preferredCategory && item.category.toLowerCase() === preferredCategory.toLowerCase()) {
      score += 40;
    }

    if (score > 0) {
      scored.push({ item, score });
    }
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 6).map((s) => s.item);
}

export async function POST(request: NextRequest) {
  try {
    let imageBase64 = "";
    let mimeType = "image/jpeg";
    let fileName = "";
    let userPromptHint = "";

    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const file = formData.get("image") as File | null;
      userPromptHint = (formData.get("hint") as string) || "";

      if (!file) {
        return NextResponse.json(
          { error: "No image file provided in request" },
          { status: 400 }
        );
      }

      fileName = file.name;
      mimeType = file.type || "image/jpeg";
      const arrayBuffer = await file.arrayBuffer();
      imageBase64 = Buffer.from(arrayBuffer).toString("base64");
    } else {
      const body = await request.json();
      imageBase64 = body.imageBase64 || "";
      mimeType = body.mimeType || "image/jpeg";
      fileName = body.fileName || "";
      userPromptHint = body.hint || "";

      if (imageBase64.includes(",")) {
        const parts = imageBase64.split(",");
        const header = parts[0];
        const match = header.match(/data:(image\/[a-zA-Z0-9+.-]+);base64/);
        if (match) mimeType = match[1];
        imageBase64 = parts[1];
      }
    }

    if (!imageBase64 && !userPromptHint) {
      return NextResponse.json(
        { success: false, error: "Image data is empty" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY || "";

    let aiResult: {
      detectedEn: string;
      detectedAr: string;
      category: "Service" | "Brand" | "Blog" | "Video" | "Page";
      confidence: "high" | "medium" | "low";
      descriptionEn: string;
      descriptionAr: string;
      suggestedKeywords: string[];
    } | null = null;

    // 1. Attempt Gemini Multimodal Vision API if key exists
    if (apiKey && imageBase64) {
      try {
        const geminiSystemPrompt = `You are a certified master automotive mechanic and workshop service advisor for Bab Al Bustan Auto Maintenance Workshop in Sharjah, UAE.
Analyze this image and identify what car part, vehicle issue (e.g. check engine light, brake pad wear, rotor groove, engine oil leak, AC compressor, car battery terminal, tire puncture, worn shock absorber/suspension, luxury car model) or vehicle condition it represents.
Categorize it into one of: 'Service', 'Brand', 'Blog', 'Video', or 'Page'.

Output ONLY valid JSON matching this schema with no markdown or formatting:
{
  "detectedEn": "Short descriptive name of detected auto part/issue/brand",
  "detectedAr": "الاسم بالعربية",
  "category": "Service",
  "confidence": "high",
  "descriptionEn": "2 sentences explaining what is seen and how Bab Al Bustan Auto Maintenance repairs or services it in Sharjah.",
  "descriptionAr": "شرح موجز بالعربية للمشكلة في السيارة أو القطعة وكيف يتم إصلاحها في كراج باب البستان بالشارقة.",
  "suggestedKeywords": ["keyword1", "keyword2", "keyword3"]
}`;

        const geminiResponse = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [
                    { text: geminiSystemPrompt },
                    {
                      inline_data: {
                        mime_type: mimeType,
                        data: imageBase64,
                      },
                    },
                  ],
                },
              ],
            }),
          }
        );

        if (geminiResponse.ok) {
          const geminiData = await geminiResponse.json();
          const rawText =
            geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || "";
          const cleanJson = rawText
            .replace(/```json/gi, "")
            .replace(/```/g, "")
            .trim();
          const parsed = JSON.parse(cleanJson);
          if (parsed && parsed.detectedEn) {
            aiResult = {
              detectedEn: parsed.detectedEn,
              detectedAr: parsed.detectedAr || parsed.detectedEn,
              category: parsed.category || "Service",
              confidence: parsed.confidence || "high",
              descriptionEn: parsed.descriptionEn || "",
              descriptionAr: parsed.descriptionAr || "",
              suggestedKeywords: Array.isArray(parsed.suggestedKeywords)
                ? parsed.suggestedKeywords
                : [parsed.detectedEn],
            };
          }
        }
      } catch (geminiErr) {
        console.warn("Gemini vision analysis failed, falling back to rule matcher:", geminiErr);
      }
    }

    // 2. Fallback heuristic pattern matcher if Gemini failed or no key
    if (!aiResult) {
      const combinedHint = `${fileName} ${userPromptHint}`.toLowerCase();
      let matchedPattern = AUTOMOTIVE_FALLBACK_PATTERNS[0];

      for (const pattern of AUTOMOTIVE_FALLBACK_PATTERNS) {
        if (pattern.keywords.some((kw) => combinedHint.includes(kw))) {
          matchedPattern = pattern;
          break;
        }
      }

      aiResult = {
        detectedEn: matchedPattern.detectedEn,
        detectedAr: matchedPattern.detectedAr,
        category: matchedPattern.category,
        confidence: "medium",
        descriptionEn: matchedPattern.descriptionEn,
        descriptionAr: matchedPattern.descriptionAr,
        suggestedKeywords: matchedPattern.searchTerms,
      };
    }

    // 3. Match items from SITE_SEARCH_INDEX
    let matchedItems = scoreAndRankItems(
      aiResult.suggestedKeywords,
      aiResult.category
    );

    // If zero matches, provide general workshop services
    if (matchedItems.length === 0) {
      matchedItems = SITE_SEARCH_INDEX.filter((it) => it.category === "Service").slice(0, 4);
    }

    const responsePayload: ImageSearchResponse = {
      success: true,
      detectedEn: aiResult.detectedEn,
      detectedAr: aiResult.detectedAr,
      category: aiResult.category,
      confidence: aiResult.confidence,
      descriptionEn: aiResult.descriptionEn,
      descriptionAr: aiResult.descriptionAr,
      matchedItems,
      suggestedKeywords: aiResult.suggestedKeywords,
      aiSource: apiKey && !aiResult.suggestedKeywords.includes("rotor") ? "gemini" : "catalog-matcher",
    };

    return NextResponse.json(responsePayload);
  } catch (error: any) {
    console.error("Image search route error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to process image search request",
      },
      { status: 500 }
    );
  }
}
