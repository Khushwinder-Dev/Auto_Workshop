"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BLOG_POSTS } from "@/data/blogs";

export default function BlogsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const categories = [
    "All Categories",
    "Maintenance",
    "Repair",
    "Safety",
    "Inspection",
  ];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCat =
      selectedCategory === "All Categories" ||
      post.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <main>
      <div>
        {/* Hero Section */}
        <section className="relative w-full h-[60vh] min-h-[450px] overflow-hidden flex flex-col bg-black">
          <div className="absolute inset-0 z-0">
            <Image
              alt="Workshop Hero"
              fill
              className="object-cover"
              src="/images/services-hero.png"
              priority
            />
            <div className="absolute inset-0 bg-[#1a0a05]/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
          </div>
          <div className="relative z-20 flex-grow flex flex-col items-center justify-center text-center px-6 mt-10">
            <div data-aos="zoom-out" data-aos-delay="200" className="mb-4">
              <h1 className="text-3xl md:text-[50px] font-display font-bold tracking-[-0.04em] leading-[0.9] flex items-center justify-center gap-4 max-w-[800px]">
                <span className="text-white">Blogs</span>
                <span className="text-[#e11d23]" />
              </h1>
            </div>
            <p
              data-aos="fade-up"
              data-aos-delay="400"
              className="max-w-xl text-gray-400 text-xs md:text-sm font-medium tracking-wide opacity-80"
            >
              Read the latest tips on car maintenance, AC repair, and engine diagnostics from Bab Al Bustan Workshop in Sharjah.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <div className="min-h-screen bg-white">
          <div className="w-full py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">
                  Explore Our Latest Insights
                </h2>
                <p className="text-lg text-gray-700 max-w-4xl mx-auto">
                  Stay updated with expert automotive advice, maintenance tips, and industry trends from the leading experts at Bab Al Bustan Workshop.
                </p>
              </div>

              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                {/* Sidebar */}
                <aside className="w-full lg:w-96 flex flex-col gap-6">
                  <div
                    className="bg-gray-50 border border-gray-200 rounded-2xl p-5 sm:p-7"
                    data-aos="fade-right"
                  >
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search blogs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white rounded-full border border-gray-300 outline-none focus:border-red-600 transition-all text-gray-800"
                      />
                      <svg
                        className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                  </div>

                  <div
                    className="bg-gray-50 border border-gray-200 rounded-2xl p-5 sm:p-7"
                    data-aos="fade-right"
                    data-aos-delay="100"
                  >
                    <h3 className="text-gray-900 text-xl font-bold mb-4">
                      Categories
                    </h3>
                    <div className="flex flex-col gap-1">
                      {categories.map((cat, idx) => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          data-aos="fade-up"
                          data-aos-delay={idx * 50}
                          className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                            selectedCategory === cat
                              ? "bg-red-600 text-white font-bold"
                              : "text-gray-600 hover:bg-gray-100 font-medium"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                </aside>

                {/* Articles Grid */}
                <main className="flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredPosts.map((post, idx) => (
                      <article
                        key={post.slug}
                        onClick={() => router.push(`/blogs/${post.slug}`)}
                        className="bg-white rounded-3xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer"
                        data-aos="fade-up"
                        data-aos-delay={idx * 100}
                      >
                        <div className="relative h-56 overflow-hidden">
                          <Image
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            src={post.image}
                          />
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                              {post.category}
                            </span>
                          </div>
                        </div>
                        <div className="p-6 flex flex-col gap-4">
                          <time className="text-gray-500 text-sm font-medium">
                            {post.date}
                          </time>
                          <h3 className="text-gray-900 text-xl font-bold leading-tight group-hover:text-red-600 transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                            {post.excerpt}
                          </p>
                          <div className="pt-4 border-t border-gray-100 flex items-center text-red-600 font-bold text-sm">
                            Read Full Article
                            <svg
                              className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                              />
                            </svg>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </main>
              </div>

              {/* Bottom CTA Banner */}
              <section className="mt-20" data-aos="fade-up">
                <div className="bg-red-600 rounded-[40px] p-8 lg:p-16 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-red-500 rounded-full -mr-20 -mt-20 opacity-50" />
                  <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
                    <div className="w-full lg:w-1/2 text-white">
                      <h2 className="text-3xl sm:text-5xl font-bold leading-tight mb-6">
                        Professional Car Care You Can Trust
                      </h2>
                      <p className="text-red-100 text-lg mb-8">
                        From oil changes to complex engine diagnostics, our team at Bab Al Bustan is ready to keep your vehicle in peak condition.
                      </p>
                      <button
                        onClick={() => router.push("/booking")}
                        className="px-8 py-4 bg-white text-red-600 rounded-full font-bold text-lg hover:bg-gray-100 transition-all flex items-center gap-2 group shadow-xl cursor-pointer"
                      >
                        Book Your Service
                        <svg
                          className="w-6 h-6 group-hover:translate-x-1 transition-transform"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <div className="h-40 bg-red-700 rounded-2xl overflow-hidden shadow-lg border border-red-500 relative">
                          <Image
                            alt="Service"
                            fill
                            className="object-cover opacity-80"
                            src="/images/service-1.png"
                          />
                        </div>
                        <div className="h-56 bg-white p-6 rounded-2xl flex flex-col justify-center text-center shadow-lg">
                          <span className="text-red-600 text-4xl font-black">15+</span>
                          <span className="text-gray-800 font-bold uppercase text-xs tracking-widest mt-2">
                            Years Experience
                          </span>
                        </div>
                      </div>
                      <div className="space-y-4 pt-8">
                        <div className="h-56 bg-red-800 p-6 rounded-2xl flex flex-col justify-center text-center shadow-lg border border-red-500">
                          <span className="text-white text-4xl font-black">100%</span>
                          <span className="text-red-100 font-bold uppercase text-xs tracking-widest mt-2">
                            Quality Guarantee
                          </span>
                        </div>
                        <div className="h-40 bg-red-700 rounded-2xl overflow-hidden shadow-lg border border-red-500 relative">
                          <Image
                            alt="Service"
                            fill
                            className="object-cover opacity-80"
                            src="/images/service-3.png"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
