"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Calendar,
  CheckCircle2,
  Wrench,
  Car,
} from "lucide-react";
import toast from "react-hot-toast";
import { WORKSHOP_SERVICES, CAR_BRANDS, WORKSHOP_INFO } from "@/data/workshopData";

function BookingFormContent() {
  const searchParams = useSearchParams();
  const preSelectedService = searchParams.get("service") || "";
  const preSelectedBrand = searchParams.get("brand") || "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    vehicleBrand: preSelectedBrand,
    vehicleModel: "",
    serviceId: preSelectedService,
    preferredDate: "",
    preferredTime: "morning",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (preSelectedService) {
      setFormData((prev) => ({ ...prev, serviceId: preSelectedService }));
    }
    if (preSelectedBrand) {
      setFormData((prev) => ({ ...prev, vehicleBrand: preSelectedBrand }));
    }
  }, [preSelectedService, preSelectedBrand]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      toast.success(
        "Appointment successfully scheduled! A service advisor will call you to confirm your slot."
      );
      setFormData({
        name: "",
        email: "",
        phone: "",
        vehicleBrand: "",
        vehicleModel: "",
        serviceId: "",
        preferredDate: "",
        preferredTime: "morning",
        notes: "",
      });
    }, 1200);
  };

  return (
    <div className="bg-white">
      {/* Page Hero Banner */}
      <section className="relative w-full h-[50vh] min-h-[380px] overflow-hidden flex flex-col justify-center items-center bg-black pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/services-hero.png"
            alt="Book Appointment Bab Al Bustan"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#120505]/75 backdrop-brightness-75" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
        </div>

        <div className="relative z-20 text-center px-6 max-w-3xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-[0.25em] mb-4">
            Priority Workshop Lane
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-tight uppercase leading-tight text-white mb-3">
            Book an <span className="text-red-500">Appointment</span>
          </h1>
          <p className="max-w-xl mx-auto text-zinc-300 text-sm md:text-base font-normal leading-relaxed">
            Reserve your inspection or maintenance slot at our Sharjah Industrial Area 5 workshop.
          </p>
        </div>
      </section>

      {/* Booking Form & Info Grid */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Interactive Booking Form */}
          <div className="lg:col-span-7 bg-zinc-50 border border-zinc-200/90 rounded-3xl p-8 sm:p-10 shadow-sm">
            <div className="mb-8">
              <span className="text-red-600 text-xs font-black uppercase tracking-[0.25em] mb-2 block">
                Instant Reservation
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-zinc-900 uppercase tracking-tight">
                Schedule Your Service
              </h2>
              <p className="text-zinc-500 text-xs sm:text-sm mt-1">
                Fill in your car details and preferred schedule below. We confirm all appointments via phone or WhatsApp.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white border border-zinc-200 rounded-xl p-4 text-zinc-900 text-sm outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/15 transition-all"
                />
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-zinc-200 rounded-xl p-4 text-zinc-900 text-sm outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/15 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">
                    Phone Number (+971) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+971 50 123 4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white border border-zinc-200 rounded-xl p-4 text-zinc-900 text-sm outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/15 transition-all"
                  />
                </div>
              </div>

              {/* Vehicle Brand & Model */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">
                    Vehicle Make *
                  </label>
                  <select
                    value={formData.vehicleBrand}
                    onChange={(e) => setFormData({ ...formData, vehicleBrand: e.target.value })}
                    className="w-full bg-white border border-zinc-200 rounded-xl p-4 text-zinc-900 text-sm outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/15 transition-all"
                  >
                    <option value="">Select Vehicle Make</option>
                    {CAR_BRANDS.map((b) => (
                      <option key={b.name} value={b.name}>
                        {b.name}
                      </option>
                    ))}
                    <option value="Other">Other Make</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">
                    Model &amp; Year
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. E300 (2021)"
                    value={formData.vehicleModel}
                    onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
                    className="w-full bg-white border border-zinc-200 rounded-xl p-4 text-zinc-900 text-sm outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/15 transition-all"
                  />
                </div>
              </div>

              {/* Service Required */}
              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">
                  Service Required *
                </label>
                <select
                  required
                  value={formData.serviceId}
                  onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                  className="w-full bg-white border border-zinc-200 rounded-xl p-4 text-zinc-900 text-sm outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/15 transition-all"
                >
                  <option value="">Select Service Category</option>
                  {WORKSHOP_SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title} — {s.shortDesc}
                    </option>
                  ))}
                  <option value="general-inspection">Comprehensive Vehicle Health Check</option>
                  <option value="other">Other / Custom Repair</option>
                </select>
              </div>

              {/* Preferred Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full bg-white border border-zinc-200 rounded-xl p-4 text-zinc-900 text-sm outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/15 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">
                    Time Window
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full bg-white border border-zinc-200 rounded-xl p-4 text-zinc-900 text-sm outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/15 transition-all"
                  >
                    <option value="morning">Morning (8:00 AM – 1:30 PM)</option>
                    <option value="afternoon">Afternoon / Evening (3:30 PM – 9:00 PM)</option>
                  </select>
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">
                  Additional Notes / Symptoms
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe any symptoms, noises, dashboard warning lights, or specific requests..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-white border border-zinc-200 rounded-xl p-4 text-zinc-900 text-sm outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/15 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary text-white font-black text-sm uppercase tracking-widest py-4 rounded-xl shadow-xl shadow-red-600/30 transition-all disabled:opacity-50"
              >
                {isSubmitting ? "Confirming Slot..." : "Confirm Appointment"}
              </button>
            </form>
          </div>

          {/* Right: Workshop Details & Facility Image */}
          <div className="lg:col-span-5 space-y-8">
            <div className="relative h-64 w-full rounded-2xl overflow-hidden shadow-xl border border-zinc-200 bg-zinc-900">
              <Image
                src="/images/ims_b_1.jpg"
                alt="Bab Al Bustan Facility Sharjah"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-red-500 text-[10px] font-black uppercase tracking-widest block mb-1">
                  Sharjah Facility
                </span>
                <h3 className="font-bold text-lg leading-tight uppercase">
                  {WORKSHOP_INFO.name}
                </h3>
              </div>
            </div>

            {/* Info Cards */}
            <div className="bg-zinc-50 border border-zinc-200/90 rounded-2xl p-6 space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-100/70 text-red-600 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 uppercase text-xs tracking-wider">
                    Location
                  </h4>
                  <p className="text-zinc-600 text-sm mt-1 leading-snug">
                    {WORKSHOP_INFO.address}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-100/70 text-red-600 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 uppercase text-xs tracking-wider">
                    Direct Call
                  </h4>
                  <div className="text-zinc-600 text-sm mt-1 space-y-0.5">
                    {WORKSHOP_INFO.phones.map((p) => (
                      <p key={p}>
                        <a href={`tel:${p}`} className="hover:text-red-600 transition-colors font-medium">
                          {p}
                        </a>
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-100/70 text-red-600 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 uppercase text-xs tracking-wider">
                    Working Hours
                  </h4>
                  <p className="text-zinc-600 text-sm mt-1">
                    {WORKSHOP_INFO.hours.weekdays}
                  </p>
                  <p className="text-zinc-400 text-xs mt-0.5">
                    {WORKSHOP_INFO.hours.break}
                  </p>
                  <p className="text-red-600 text-xs font-bold mt-0.5">
                    {WORKSHOP_INFO.hours.friday}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Find Us On Map Section with Official Google Maps Embed */}
      <section className="py-20 bg-zinc-50 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-red-600 text-xs font-black uppercase tracking-[0.25em] mb-2 block">
              Sharjah Industrial Area 5
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-zinc-900 uppercase tracking-tight">
              Find Us On Map
            </h2>
            <p className="text-zinc-500 text-sm mt-1">
              Easy access from Dubai, Ajman, and all sectors of Sharjah.
            </p>
          </div>

          <div className="w-full h-[450px] rounded-3xl overflow-hidden shadow-xl border border-zinc-300">
            <iframe
              src={WORKSHOP_INFO.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bab Al Bustan Location Map"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white pt-32 text-center">Loading Booking...</div>}>
      <BookingFormContent />
    </Suspense>
  );
}
