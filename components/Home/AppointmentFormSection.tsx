"use client";

import React, { useState } from "react";
import Image from "next/image";
import { UserCog, Handshake, User, Mail, Phone, Car, Wrench } from "lucide-react";
import toast from "react-hot-toast";
import { useLanguage } from "@/context/LanguageContext";
import { FloatInput, FloatTextarea, useVoiceInput } from "@/components/ui/FloatField";

export default function AppointmentFormSection() {
  const { t, isArabic } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    vehicle: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const voice = useVoiceInput({
    isArabic,
    onResult: (fieldName: string, text: string) => {
      setFormData((prev) => {
        if (fieldName === "message" && prev.message.trim()) {
          return { ...prev, message: `${prev.message.trim()} ${text}` };
        }
        return { ...prev, [fieldName]: text };
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success(t.home.appointment.successToast);
      setFormData({
        name: "",
        email: "",
        phone: "",
        vehicle: "",
        subject: "",
        message: "",
      });
    }, 1000);
  };

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative min-h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/header.png"
            alt="Bab Al Bustan Auto Workshop Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40 md:bg-linear-to-r md:from-black/50 md:via-black/50 md:to-black/70" />
        </div>
        <div className="relative z-10 max-w-8xl mx-auto px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[1.15] uppercase tracking-tight drop-shadow-lg">
              {t.home.appointment.titlePrefix}{" "}
              <span className="font-display italic font-bold text-red-500">
                {t.home.appointment.titleWorkshop}
              </span>
            </h2>
          </div>
          <div className="relative flex justify-end">
            <div className="w-full max-w-lg bg-zinc-900/90 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FloatInput
                    type="text"
                    name="name"
                    value={formData.name}
                    label={t.home.appointment.namePlaceholder}
                    required
                    isArabic={isArabic}
                    variant="dark"
                    icon={<User className="w-4 h-4" />}
                    isListening={voice.listeningField === "name"}
                    onVoiceToggle={() => voice.toggleListening("name", "text")}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <FloatInput
                    type="email"
                    name="email"
                    value={formData.email}
                    label={t.home.appointment.emailPlaceholder}
                    required
                    isArabic={isArabic}
                    variant="dark"
                    icon={<Mail className="w-4 h-4" />}
                    isListening={voice.listeningField === "email"}
                    onVoiceToggle={() => voice.toggleListening("email", "email")}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FloatInput
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    label={t.home.appointment.phonePlaceholder}
                    required
                    isArabic={isArabic}
                    variant="dark"
                    icon={<Phone className="w-4 h-4" />}
                    isListening={voice.listeningField === "phone"}
                    onVoiceToggle={() => voice.toggleListening("phone", "phone")}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                  <FloatInput
                    type="text"
                    name="vehicle"
                    value={formData.vehicle}
                    label={t.home.appointment.vehiclePlaceholder}
                    required
                    isArabic={isArabic}
                    variant="dark"
                    icon={<Car className="w-4 h-4" />}
                    isListening={voice.listeningField === "vehicle"}
                    onVoiceToggle={() => voice.toggleListening("vehicle", "text")}
                    onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                  />
                </div>
                <FloatInput
                  type="text"
                  name="subject"
                  value={formData.subject}
                  label={t.home.appointment.subjectPlaceholder}
                  required
                  isArabic={isArabic}
                  variant="dark"
                  icon={<Wrench className="w-4 h-4" />}
                  isListening={voice.listeningField === "subject"}
                  onVoiceToggle={() => voice.toggleListening("subject", "text")}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
                <FloatTextarea
                  name="message"
                  value={formData.message}
                  label={t.home.appointment.messagePlaceholder}
                  required
                  rows={3}
                  isArabic={isArabic}
                  variant="dark"
                  isListening={voice.listeningField === "message"}
                  onVoiceToggle={() => voice.toggleListening("message", "textarea")}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto bg-red-600 hover:bg-red-700 disabled:bg-zinc-600 px-10 py-4 text-white font-black text-xs uppercase tracking-widest transition-all rounded-full active:scale-95 shadow-lg shadow-red-600/30 cursor-pointer"
                >
                  {isSubmitting ? t.home.appointment.sendingBtn : t.home.appointment.sendBtn}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-red-600 py-8">
        <div className="max-w-8xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row gap-10 md:gap-24">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-white/15 rounded-full flex items-center justify-center shrink-0">
              <UserCog className="text-white w-7 h-7" />
            </div>
            <div>
              <h4 className="text-white font-bold text-lg leading-tight">{t.home.appointment.feat1Title}</h4>
              <p className="text-white/90 text-sm mt-0.5">{t.home.appointment.feat1Desc}</p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-white/15 rounded-full flex items-center justify-center shrink-0">
              <Handshake className="text-white w-7 h-7" />
            </div>
            <div>
              <h4 className="text-white font-bold text-lg leading-tight">{t.home.appointment.feat2Title}</h4>
              <p className="text-white/90 text-sm mt-0.5">{t.home.appointment.feat2Desc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
