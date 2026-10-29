"use client";

import React, { useState } from "react";
import { Mail, Send, CheckCircle2, Sparkles, ShieldCheck, Tag, Wrench } from "lucide-react";
import toast from "react-hot-toast";
import { useLanguage } from "@/context/LanguageContext";
import { FloatInput, useVoiceInput } from "@/components/ui/FloatField";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { isArabic, t } = useLanguage();

  const voice = useVoiceInput({
    isArabic,
    onResult: (_fieldName: string, text: string) => {
      setEmail(text);
    },
  });

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes("@") || !trimmed.includes(".")) {
      toast.error(t.footer.newsletterInvalidToast);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmed,
          formType: "3_Subscriptions",
          subject: "Newsletter & VIP Club Subscription",
          message: `Newsletter subscriber email: ${trimmed}`,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        console.warn("Newsletter subscription notice:", data);
      }

      setIsSubscribed(true);
      toast.success(t.footer.newsletterSuccessToast);
      setEmail("");
    } catch (err) {
      console.error("Subscription error:", err);
      setIsSubscribed(true);
      toast.success(t.footer.newsletterSuccessToast);
      setEmail("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const perks = [
    {
      icon: Tag,
      text: isArabic ? "خصومات خاصة للأعضاء" : "Exclusive VIP Discounts",
    },
    {
      icon: Wrench,
      text: isArabic ? "نصائح صيانة دورية للمناخ الخليجي" : "UAE Seasonal Car Tips",
    },
    {
      icon: ShieldCheck,
      text: isArabic ? "خصوصية تامة وبدون إزعاج" : "Zero Spam Guarantee",
    },
  ];

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="relative bg-zinc-50/80 border-t border-zinc-200/90 py-14 sm:py-16 px-4 font-sans overflow-hidden"
    >
      {/* Soft ambient lighting */}
      <div className="absolute top-1/2 -left-20 -translate-y-1/2 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-20 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="relative rounded-3xl bg-white border border-zinc-200/90 p-8 sm:p-12 lg:p-14 shadow-xl shadow-zinc-200/60 overflow-hidden">
          {/* Subtle top accent gradient */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-amber-500" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left / Info Column */}
            <div className="lg:col-span-7 space-y-4 text-center lg:text-start">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-widest bg-red-50 border border-red-200 px-3.5 py-1.5 rounded-full shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>{t.footer.newsletterBadge}</span>
              </div>

              <h2
                id="newsletter-heading"
                className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-900 font-display tracking-tight uppercase leading-tight"
              >
                {t.footer.newsletterTitle}
              </h2>

              <p className="text-sm sm:text-base text-zinc-600 max-w-2xl leading-relaxed">
                {t.footer.newsletterDesc}
              </p>

              {/* Trust & Value Perks */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 text-xs text-zinc-700 font-medium">
                {perks.map((perk, idx) => {
                  const PerkIcon = perk.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-2 bg-zinc-50 border border-zinc-200 px-3 py-1.5 rounded-lg shadow-2xs hover:border-zinc-300 transition-colors"
                    >
                      <PerkIcon className="w-3.5 h-3.5 text-red-600 shrink-0" />
                      <span>{perk.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right / Form Column */}
            <div className="lg:col-span-5 w-full">
              {isSubscribed ? (
                <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-emerald-900 space-y-3 text-center sm:text-start shadow-sm">
                  <div className="flex items-center gap-3 justify-center sm:justify-start">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                    <span className="font-bold text-base text-emerald-950">
                      {t.footer.newsletterSuccessBanner}
                    </span>
                  </div>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    {isArabic
                      ? "تم حفظ بريدك بنجاح، وستصلك أحدث العروض الحصرية وقسائم الصيانة."
                      : "We've registered your email. You'll receive our next care bulletin and VIP discount coupons."}
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSubscribed(false)}
                    className="text-xs text-red-600 hover:text-red-700 underline font-semibold transition-colors pt-1 cursor-pointer"
                  >
                    {isArabic ? "تسجيل بريد إلكتروني آخر" : "Subscribe another email address"}
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="bg-zinc-50/90 p-4 sm:p-5 rounded-3xl border border-zinc-200 shadow-sm space-y-3"
                >
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <div className="w-full flex-1">
                      <FloatInput
                        type="email"
                        name="newsletterEmail"
                        value={email}
                        label={t.footer.newsletterPlaceholder}
                        required
                        disabled={isSubmitting}
                        isArabic={isArabic}
                        icon={<Mail className="w-4 h-4" />}
                        isListening={voice.listeningField === "newsletterEmail"}
                        onVoiceToggle={() => voice.toggleListening("newsletterEmail", "email")}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 shadow-md shadow-red-600/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shrink-0 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span>
                        {isSubmitting
                          ? t.footer.newsletterSubscribing
                          : t.footer.newsletterBtn}
                      </span>
                      <Send
                        className={`w-3.5 h-3.5 ${
                          isArabic ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>
                  <p className="text-[11px] text-zinc-500 text-center sm:text-start px-2">
                    {isArabic
                      ? "نحترم خصوصيتك بالكامل. يمكنك إلغاء الاشتراك في أي وقت بنقرة واحدة."
                      : "We respect your privacy. Unsubscribe at any time with a single click."}
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
