"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, X, Video, Image as ImageIcon, Sparkles, ArrowRight } from "lucide-react";
import { WORKSHOP_VIDEOS } from "@/data/workshopData";

export default function GalleryPage() {
  const [filter, setFilter] = useState<"All" | "Videos" | "Photos">("All");
  const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null);

  const photos = [
    { src: "/gallery/1.jpg", title: "Engine Diagnostics & Sensor Setup", category: "Engine" },
    { src: "/gallery/2.jpg", title: "Luxury Brake Rotor Skimming", category: "Brakes" },
    { src: "/gallery/3.jpg", title: "High-Pressure AC Evaporator Service", category: "AC" },
    { src: "/gallery/4.jpg", title: "Multi-Point Suspension Check", category: "Suspension" },
    { src: "/gallery/5.jpg", title: "Full Vehicle Synthetic Oil Flush", category: "Oil Service" },
    { src: "/gallery/6.jpg", title: "Computer ECU Software Reprogramming", category: "Electronics" },
    { src: "/images/ims_b_1.jpg", title: "Sharjah Workshop Hydraulic Lifts", category: "Facility" },
    { src: "/images/ims_b_2.jpg", title: "Underbody Chassis Inspection", category: "Inspection" },
    { src: "/images/ims_b_3.jpg", title: "Engine Bay Tuning & Valve Work", category: "Engine" },
  ];

  return (
    <div className="bg-white">
      {/* Page Hero Banner */}
      <section className="relative w-full h-[55vh] min-h-[420px] overflow-hidden flex flex-col justify-center items-center bg-black pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/services-hero.png"
            alt="Gallery Bab Al Bustan Auto Workshop"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#120505]/75 backdrop-brightness-75" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
        </div>

        <div className="relative z-20 text-center px-6 max-w-3xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-[0.25em] mb-4">
            Workshop Showcase
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-tight uppercase leading-tight text-white mb-4">
            Our <span className="text-red-500">Gallery</span>
          </h1>
          <p className="max-w-xl mx-auto text-zinc-300 text-sm md:text-base font-normal leading-relaxed">
            Watch real footage of our mechanics in action and inspect our high-standard vehicle repair projects in Sharjah.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8 flex justify-center">
        <div className="inline-flex bg-zinc-100 p-1.5 rounded-full border border-zinc-200 gap-2">
          {(["All", "Videos", "Photos"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                filter === tab
                  ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              {tab === "Videos" && <Video className="w-4 h-4 inline-block mr-1.5 -mt-0.5" />}
              {tab === "Photos" && <ImageIcon className="w-4 h-4 inline-block mr-1.5 -mt-0.5" />}
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        {/* Videos Section */}
        {(filter === "All" || filter === "Videos") && (
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-3 h-8 bg-red-600 rounded-sm" />
              <h2 className="font-display font-black text-2xl sm:text-3xl text-zinc-900 uppercase tracking-tight">
                Live Workshop Video Recordings
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {WORKSHOP_VIDEOS.map((vid) => (
                <div
                  key={vid.id}
                  className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 shadow-xl flex flex-col group hover:border-red-600/40 transition-all duration-300"
                >
                  {/* Video Player Box */}
                  <div className="relative aspect-video w-full bg-black flex items-center justify-center">
                    <video
                      src={vid.videoUrl}
                      controls
                      preload="metadata"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-black px-2.5 py-1 rounded uppercase tracking-wider pointer-events-none">
                      {vid.category}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow justify-between bg-zinc-900">
                    <div>
                      <h3 className="text-white font-bold text-base sm:text-lg mb-2 uppercase tracking-tight group-hover:text-red-500 transition-colors">
                        {vid.title}
                      </h3>
                      <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                        {vid.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-zinc-800 flex items-center justify-between">
                      <span className="text-[11px] text-zinc-500 uppercase font-semibold">
                        Sharjah Workshop Bay
                      </span>
                      <button
                        onClick={() => setActiveVideoModal(vid.videoUrl)}
                        className="text-xs font-bold text-red-500 hover:text-red-400 uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>Theater Mode</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Photos Section */}
        {(filter === "All" || filter === "Photos") && (
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-3 h-8 bg-red-600 rounded-sm" />
              <h2 className="font-display font-black text-2xl sm:text-3xl text-zinc-900 uppercase tracking-tight">
                High-Resolution Workshop Photographs
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {photos.map((photo, i) => (
                <div
                  key={photo.src + i}
                  className="group relative h-72 rounded-2xl overflow-hidden shadow-md border border-zinc-200 bg-zinc-900"
                >
                  <Image
                    src={photo.src}
                    alt={photo.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  <div className="absolute bottom-5 left-5 right-5 z-10">
                    <span className="text-red-500 text-[10px] font-black uppercase tracking-widest block mb-1">
                      {photo.category}
                    </span>
                    <h3 className="text-white font-bold text-base leading-snug uppercase">
                      {photo.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Video Modal / Theater Mode */}
      {activeVideoModal && (
        <div
          className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setActiveVideoModal(null)}
        >
          <button
            onClick={() => setActiveVideoModal(null)}
            className="absolute top-6 right-6 text-white hover:text-red-500 p-2 cursor-pointer transition-colors"
            aria-label="Close Modal"
          >
            <X className="w-8 h-8" />
          </button>
          <div
            className="w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={activeVideoModal}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}

      {/* Ready for a Transformation CTA Section */}
      <section className="bg-[#050505] py-20 px-6 border-t border-zinc-900 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-red-500 text-xs font-black uppercase tracking-[0.25em] mb-4 block">
            Quality Guaranteed
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white uppercase tracking-tight mb-6">
            Ready for a Vehicle Transformation?
          </h2>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-8">
            Book an appointment today and let our certified mechanics keep your car driving at peak safety and performance.
          </p>
          <Link
            href="/booking"
            className="btn-primary text-white font-bold text-xs uppercase tracking-widest px-10 py-4 rounded-full shadow-2xl shadow-red-600/30 hover:scale-105 transition-transform"
          >
            Book Your Inspection
          </Link>
        </div>
      </section>
    </div>
  );
}
