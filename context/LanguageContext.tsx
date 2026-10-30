"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "ar";
export type Direction = "ltr" | "rtl";

export interface Translations {
  nav: {
    about: string;
    services: string;
    gallery: string;
    brands: string;
    contact: string;
    blogs: string;
    booking: string;
    searchPlaceholder: string;
    contactBtn: string;
    langSwitchLabel: string;
    langName: string;
  };
  common: {
    bookAppointment: string;
    callUs: string;
    contactUs: string;
    learnMore: string;
    viewAll: string;
    exploreMore: string;
    readMore: string;
    submit: string;
    sending: string;
    success: string;
    error: string;
    whatsappChat: string;
    getQuote: string;
    allServices: string;
    allCategories: string;
  };
  home: {
    hero: {
      title: string;
      subtitle: string;
      exploreMore: string;
      bookService: string;
      scrollDown: string;
      happyClients: string;
      yearsExp: string;
      servicesOffered: string;
      satisfactionRate: string;
      videoPlayHint: string;
      videoPauseHint: string;
    };
    services: {
      eyebrow: string;
      titlePart1: string;
      titlePart2: string;
      viewAll: string;
      exploreService: string;
    };
    feature: {
      tag: string;
      titlePart1: string;
      titlePart2: string;
      description: string;
      expressTitle: string;
      expressDesc: string;
      qualityTitle: string;
      qualityDesc: string;
      pricingTitle: string;
      pricingDesc: string;
      techsTitle: string;
      techsDesc: string;
      learnMore: string;
    };
    whyChooseUs: {
      eyebrow: string;
      titlePart1: string;
      titlePart2: string;
      titlePart3: string;
      subtitle: string;
      card1Title: string;
      card1Desc: string;
      card2Title: string;
      card2Desc: string;
      card3Title: string;
      card3Desc: string;
      card4Title: string;
      card4Desc: string;
      card5Title: string;
      card5Desc: string;
      card6Title: string;
      card6Desc: string;
      badgeTitle: string;
      badgeSub: string;
      bannerTitle: string;
      bannerDesc: string;
      bookBtn: string;
      contactBtn: string;
    };
    appointment: {
      titlePrefix: string;
      titleWorkshop: string;
      namePlaceholder: string;
      emailPlaceholder: string;
      phonePlaceholder: string;
      vehiclePlaceholder: string;
      subjectPlaceholder: string;
      messagePlaceholder: string;
      sendBtn: string;
      sendingBtn: string;
      successToast: string;
      feat1Title: string;
      feat1Desc: string;
      feat2Title: string;
      feat2Desc: string;
    };
    workProcess: {
      eyebrow: string;
      title: string;
      step1Title: string;
      step1Desc: string;
      step2Title: string;
      step2Desc: string;
      step3Title: string;
      step3Desc: string;
      step4Title: string;
      step4Desc: string;
      step5Title: string;
      step5Desc: string;
      step6Title: string;
      step6Desc: string;
    };
    recentWork: {
      title: string;
      description: string;
      btn: string;
    };
    partnership: {
      title1: string;
      title2: string;
      desc: string;
    };
    testimonials: {
      eyebrow: string;
      titlePart1: string;
      titlePart2: string;
      subtitle: string;
      ratingBadge: string;
      vehicleLabel: string;
      verified: string;
    };
    faq: {
      title: string;
    };
    stats: {
      yearsExp: string;
      technicians: string;
      projects: string;
      customers: string;
    };
    latestInsights: {
      title: string;
      subtitle: string;
      viewMore: string;
      featuredTitle: string;
      art1Title: string;
      art2Title: string;
      art3Title: string;
      badgeWorkshop: string;
      badgeDetailing: string;
      badgeDiagnostics: string;
    };
    fourStep: {
      eyebrow: string;
      title: string;
      step1Title: string;
      step1Desc: string;
      step2Title: string;
      step2Desc: string;
      step3Title: string;
      step3Desc: string;
      step4Title: string;
      step4Desc: string;
    };
  };
  footer: {
    newsletterBadge: string;
    newsletterTitle: string;
    newsletterDesc: string;
    newsletterPlaceholder: string;
    newsletterBtn: string;
    newsletterSubscribing: string;
    newsletterSuccessToast: string;
    newsletterSuccessBanner: string;
    newsletterInvalidToast: string;
    aboutDesc: string;
    followUs: string;
    quickLinksTitle: string;
    servicesTitle: string;
    companyTitle: string;
    openingHoursTitle: string;
    hoursWeekdays: string;
    hoursBreak: string;
    hoursFriday: string;
    supportTitle: string;
    faqLink: string;
    privacyLink: string;
    contactTitle: string;
    address: string;
    copyright: string;
    sitemap: string;
    contact: string;
    appointment: string;
  };
  about: {
    heroTitle1: string;
    heroTitle2: string;
    heroSubtitle: string;
    happyCustomers: string;
    yearsOfExp: string;
    eyebrow: string;
    mainTitle: string;
    p1: string;
    p2: string;
    resultsEyebrow: string;
    resultsTitle: string;
    resultsDesc: string;
    viewGalleryBtn: string;
    whyEyebrow: string;
    whyTitle: string;
    reasons: {
      r1Title: string;
      r1Desc: string;
      r2Title: string;
      r2Desc: string;
      r3Title: string;
      r3Desc: string;
      r4Title: string;
      r4Desc: string;
      r5Title: string;
      r5Desc: string;
      r6Title: string;
      r6Desc: string;
    };
  };
  servicesPage: {
    heroTitle1: string;
    heroTitle2: string;
    heroSubtitle: string;
    filterAll: string;
    filterEngine: string;
    filterCooling: string;
    filterSafety: string;
    filterElectrical: string;
    featuresIncluded: string;
    durationLabel: string;
    warrantyLabel: string;
    bookServiceBtn: string;
    viewDetailsBtn: string;
    processEyebrow: string;
    processTitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
    faqTitle: string;
  };
  serviceDetails: {
    heroBadge: string;
    heroSuffix: string;
    heroSubtitle: string;
    allServicesTitle: string;
    needFastTitle: string;
    needFastSubtitle: string;
    needFastDesc: string;
    callNowBtn: string;
    bookOnlineBtn: string;
    workshopHoursTitle: string;
    durationLabel: string;
    warrantyLabel: string;
    serviceOverviewTitle: string;
    includedFeaturesTitle: string;
    bookThisServiceBtn: string;
    contactAdvisorBtn: string;
  };
  gallery: {
    heroTitle: string;
    heroSubtitle: string;
    readyTitle1: string;
    readyTitle2: string;
    readyDesc: string;
    contactBtn: string;
  };
  brands: {
    heroTitle1: string;
    heroTitle2: string;
    heroSubtitle: string;
  };
  booking: {
    heroTitle1: string;
    heroTitle2: string;
    heroSubtitle: string;
    workshopName: string;
    address: string;
    callUs: string;
    hoursTitle: string;
    formTitle: string;
    formSubtitle: string;
    nameLabel: string;
    emailLabel: string;
    phoneLabel: string;
    serviceLabel: string;
    selectServicePlaceholder: string;
    dateLabel: string;
    timeLabel: string;
    selectTimePlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitBtn: string;
    submittingBtn: string;
    successToast: string;
  };
  contact: {
    heroTitle1: string;
    heroTitle2: string;
    heroSubtitle: string;
    addressTitle: string;
    addressValue: string;
    callTitle: string;
    hoursTitle: string;
    formTitle: string;
    formSubtitle: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    phonePlaceholder: string;
    subjectPlaceholder: string;
    messagePlaceholder: string;
    sendBtn: string;
    sendingBtn: string;
    successToast: string;
  };
  faqPage: {
    heroBadge: string;
    heroTitle1: string;
    heroTitle2: string;
    heroSubtitle: string;
    stillHaveTitle: string;
    stillHaveDesc: string;
    callBtn: string;
    bookBtn: string;
  };
  blogs: {
    heroTitle: string;
    heroSubtitle: string;
    sectionTitle: string;
    sectionDesc: string;
    searchPlaceholder: string;
    categoriesTitle: string;
    readTimePrefix: string;
    readMoreBtn: string;
    noResults: string;
  };
  chat: {
    tooltip: string;
  };
  notFound: {
    code: string;
    title: string;
    desc: string;
    backHome: string;
    ourServices: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      about: "About",
      services: "Services",
      gallery: "Gallery",
      brands: "Brands",
      contact: "Contact",
      blogs: "Blogs",
      booking: "Book Appointment",
      searchPlaceholder: "Search...",
      contactBtn: "CONTACT",
      langSwitchLabel: "العربية",
      langName: "English",
    },
    common: {
      bookAppointment: "Book Appointment",
      callUs: "Call Us",
      contactUs: "Contact Us",
      learnMore: "Learn More",
      viewAll: "View All",
      exploreMore: "Explore More",
      readMore: "Read More",
      submit: "Submit",
      sending: "Sending...",
      success: "Success!",
      error: "Error occurred",
      whatsappChat: "Chat on WhatsApp",
      getQuote: "Get a Quote",
      allServices: "All Services",
      allCategories: "All Categories",
    },
    home: {
      hero: {
        title: "Bab Al Bustan Auto Maintenance Workshop",
        subtitle: "Trusted Car Maintenance in Sharjah",
        exploreMore: "Explore More",
        bookService: "Book Service",
        scrollDown: "Scroll Down",
        happyClients: "Happy Clients",
        yearsExp: "Years Experience",
        servicesOffered: "Services Offered",
        satisfactionRate: "Satisfaction Rate",
        videoPlayHint: "Play workshop video",
        videoPauseHint: "Pause video and return to image",
      },
      services: {
        eyebrow: "OUR SERVICES",
        titlePart1: "Professional Car Care For",
        titlePart2: "Every Make & Model",
        viewAll: "VIEW ALL SERVICES",
        exploreService: "Explore Service",
      },
      feature: {
        tag: "Bab Al Bustan Auto Maintenance Workshop",
        titlePart1: "We Go Beyond Just a",
        titlePart2: "Car Maintenance",
        description:
          "Bab Al Bustan Auto Maintenance Workshop, we blend speed with precision. Our certified technicians use cutting-edge equipment to deliver results that exceed expectations — every single time.",
        expressTitle: "Express Service",
        expressDesc:
          "Most services completed in under 60 minutes without sacrificing quality.",
        qualityTitle: "Quality Guarantee",
        qualityDesc:
          "100% satisfaction guarantee on all services. Not happy? We redo it free.",
        pricingTitle: "Transparent Pricing",
        pricingDesc:
          "No hidden charges. Get a full quote before we begin any work.",
        techsTitle: "Certified Technicians",
        techsDesc:
          "Our team holds certifications and undergoes continuous training.",
        learnMore: "Learn More About Us",
      },
      whyChooseUs: {
        eyebrow: "WHY CHOOSE US",
        titlePart1: "Precision, Quality &",
        titlePart2: "Commitment",
        titlePart3: "You Can Always Count On",
        subtitle:
          "From luxury sedans to heavy SUVs, we combine advanced technology with honest craftsmanship in Sharjah Industrial Area 5.",
        card1Title: "Certified Master Mechanics",
        card1Desc:
          "Skilled professionals with 15+ years of hands-on dealership experience across German, Japanese, and American automobiles.",
        card2Title: "100% Transparent Upfront Pricing",
        card2Desc:
          "Itemized quotes detailing parts and labor provided before turning a single wrench — absolutely zero hidden fees.",
        card3Title: "Dealership-Grade Diagnostics",
        card3Desc:
          "Cutting-edge computerized scanners and live sensor analyzers pinpoint ECU fault codes with 100% precision.",
        card4Title: "Genuine OEM & Certified Parts",
        card4Desc:
          "We only install manufacturer-approved OEM or certified components backed by full workshop warranty guarantees.",
        card5Title: "Express Bays & Quick Turnaround",
        card5Desc:
          "Fast-lane oil changes, computer code resets, and brake services completed in under 60 minutes in our express bays.",
        card6Title: "Dedicated Advisor & Aftercare",
        card6Desc:
          "Direct WhatsApp mechanic support, detailed vehicle health reports, and trusted after-service care in Sharjah.",
        badgeTitle: "15+ Years Excellence",
        badgeSub: "Over 5,000+ Vehicles Serviced in Sharjah",
        bannerTitle: "Ready to experience dealership-quality car service?",
        bannerDesc:
          "Schedule your appointment online or visit our workshop in Sharjah Industrial Area 5 today.",
        bookBtn: "Book Appointment",
        contactBtn: "Contact Us",
      },
      appointment: {
        titlePrefix: "Experience Premium Care –",
        titleWorkshop: "Bab Al Bustan Auto Maintenance Workshop",
        namePlaceholder: "Your Name",
        emailPlaceholder: "Your Email",
        phonePlaceholder: "Your Phone",
        vehiclePlaceholder: "Vehicle & Model",
        subjectPlaceholder: "Subject",
        messagePlaceholder: "Your Message",
        sendBtn: "Send Message",
        sendingBtn: "Sending...",
        successToast: "Thank you! Your message has been sent.",
        feat1Title: "Certified Expertise",
        feat1Desc: "Specialized in luxury and quality vehicles",
        feat2Title: "Trusted Excellence",
        feat2Desc: "Transparent process with guaranteed workmanship",
      },
      workProcess: {
        eyebrow: "OUR WORK PROCESS",
        title: "How We Work",
        step1Title: "Share Requirement",
        step1Desc: "Let us know what's bothering your car",
        step2Title: "Receive Up Front Quote",
        step2Desc: "Transparent pricing catering to your specific needs",
        step3Title: "Schedule Appointment",
        step3Desc: "Convenient time slot tailored for quick turnaround",
        step4Title: "Personal Attention",
        step4Desc: "Dedicated engineers working exclusively on your car",
        step5Title: "Live Tracking & Updates",
        step5Desc: "Track your car service visually in real time",
        step6Title: "Pay Post Service",
        step6Desc: "Pay online, through card or cash, post service completion.",
      },
      recentWork: {
        title: "Our Recent Work",
        description:
          "We take pride in offering you the best services available and 100% Satisfaction Guarantee.",
        btn: "All Our Work",
      },
      partnership: {
        title1: "Our",
        title2: "Partnership",
        desc: "We work with the world's leading automotive brands to bring you certified service and genuine parts. Our workshop in Sharjah is equipped to handle luxury, German, and Japanese vehicles with factory-level precision.",
      },
      testimonials: {
        eyebrow: "CLIENT TESTIMONIALS",
        titlePart1: "Trusted By Drivers Across",
        titlePart2: "Sharjah & The UAE",
        subtitle:
          "Read real feedback from vehicle owners who rely on Bab Al Bustan for dependable maintenance.",
        ratingBadge: "4.9 / 5.0 Rating from 450+ Happy Car Owners",
        vehicleLabel: "Vehicle:",
        verified: "Verified Customer",
      },
      faq: {
        title: "Most Popular Questions About Car Repair in Sharjah",
      },
      stats: {
        yearsExp: "YEAR EXPERIENCE",
        technicians: "EXPERT TECHNICIANS",
        projects: "COMPLETE PROJECTS",
        customers: "HAPPY CUSTOMERS",
      },
      latestInsights: {
        title: "Latest Insights",
        subtitle:
          "We cover essential topics to help you keep your vehicle performing at its best",
        viewMore: "View More",
        featuredTitle:
          "How Regular Oil Changes Keep Your Engine Running Longer and Smoother",
        art1Title: "Top Signs Your Brake Pads Need Immediate Replacement",
        art2Title: "Why Professional Interior Detailing Is Worth Every Dirham",
        art3Title:
          "Engine Diagnostics: Catch Problems Before They Become Costly",
        badgeWorkshop: "WORKSHOP",
        badgeDetailing: "DETAILING",
        badgeDiagnostics: "DIAGNOSTICS",
      },
      fourStep: {
        eyebrow: "How It Works",
        title: "Simple 4-Step Process",
        step1Title: "Book Online",
        step1Desc:
          "Choose your service and pick a convenient date and time from our booking form.",
        step2Title: "Drop Your Car",
        step2Desc:
          "Drive in or we'll arrange pickup. Our team greets you and takes over.",
        step3Title: "Expert Service",
        step3Desc:
          "Our certified technicians complete the job with precision and care.",
        step4Title: "Pick Up & Go",
        step4Desc:
          "Get your car back sparkling clean and perfectly maintained.",
      },
    },
    footer: {
      newsletterBadge: "Stay Ahead On Maintenance",
      newsletterTitle: "Subscribe for Car Care Tips & Special Offers",
      newsletterDesc:
        "Receive UAE seasonal checklists, synthetic oil interval reminders, and VIP repair discount coupons directly to your inbox.",
      newsletterPlaceholder: "Enter your email address...",
      newsletterBtn: "Subscribe",
      newsletterSubscribing: "Subscribing...",
      newsletterSuccessToast:
        "Thank you for subscribing! Check your email for car care tips & exclusive offers.",
      newsletterSuccessBanner:
        "You're subscribed! Welcome to the Bab Al Bustan VIP Club.",
      newsletterInvalidToast: "Please enter a valid email address.",
      aboutDesc:
        "Bab Al Bustan Auto Maintenance Workshop in Sharjah Industrial Area 5 stands as a trusted symbol of precision, genuine spare parts, and customer care for all your car repair needs.",
      followUs: "Follow us:",
      quickLinksTitle: "Quick Links",
      servicesTitle: "Services",
      companyTitle: "Company",
      openingHoursTitle: "Opening Hours",
      hoursWeekdays: "Saturday – Thursday: 8:00 AM – 9:00 PM",
      hoursBreak: "Break: 1:30 PM – 3:30 PM",
      hoursFriday: "Friday: Closed",
      supportTitle: "Support & FAQs",
      faqLink: "Frequently Asked Questions",
      privacyLink: "Privacy & Terms Policy",
      contactTitle: "Contact",
      address: "Industrial Area No 5,\nSharjah, United Arab Emirates",
      copyright:
        "© Copyright 2026 Bab Al Bustan Auto Maintenance Workshop. All rights reserved.",
      sitemap: "Sitemap",
      contact: "Contact",
      appointment: "Appointment",
    },
    about: {
      heroTitle1: "About",
      heroTitle2: "Us",
      heroSubtitle: "Learn more about our company and our mission",
      happyCustomers: "Happy Customers",
      yearsOfExp: "Years of Experience",
      eyebrow: "About Us",
      mainTitle: "Keeping Your Drive Smooth",
      p1: "Provides expert automotive maintenance and repair services including diagnostics, oil change, brakes, suspension, battery, A/C repair, tires, and periodic servicing.",
      p2: "We work on all major car brands with skilled technicians, high-quality parts, and fast turnaround times. Customer satisfaction and honest pricing are our top priorities.",
      resultsEyebrow: "Real Results",
      resultsTitle: "Before & After: Complete Auto Transformations",
      resultsDesc:
        "See the dramatic difference professional care makes — restoring clarity, depth, and shine while adding a durable layer of protection. Every detail counts, and the results speak for themselves.",
      viewGalleryBtn: "View Our Gallery",
      whyEyebrow: "Why Choose Us",
      whyTitle: "Reasons to Choose Bab Al Bustan Auto Maintenance Workshop",
      reasons: {
        r1Title: "Certified Mechanics",
        r1Desc:
          "ASE certified technicians with years of hands-on experience in all vehicle types.",
        r2Title: "Honest Pricing",
        r2Desc:
          "Transparent process with no hidden charges. Full quote provided before we begin.",
        r3Title: "Transparent Pricing",
        r3Desc:
          "No hidden fees, no surprises — full cost disclosure before any work begins.",
        r4Title: "Express Service",
        r4Desc:
          "Most services completed under 60 minutes without compromising on quality.",
        r5Title: "Quality Products",
        r5Desc:
          "We use only top-brand lubricants, parts, and materials on every vehicle.",
        r6Title: "Satisfaction Guarantee",
        r6Desc:
          "100% satisfaction guaranteed — not happy with the result? We redo it free.",
      },
    },
    servicesPage: {
      heroTitle1: "Our Auto",
      heroTitle2: "Services",
      heroSubtitle:
        "Professional automotive repair and maintenance in Sharjah Industrial Area 5",
      filterAll: "All Services",
      filterEngine: "Engine & Oil",
      filterCooling: "A/C & Cooling",
      filterSafety: "Brakes & Tires",
      filterElectrical: "Electrical & Computer",
      featuresIncluded: "Key Service Features",
      durationLabel: "Duration",
      warrantyLabel: "Warranty",
      bookServiceBtn: "Book Service",
      viewDetailsBtn: "View Details",
      processEyebrow: "HOW WE WORK",
      processTitle: "Our 4-Step Service Process",
      step1Title: "Book Your Service",
      step1Desc:
        "Schedule your preferred service online or call us. Our advisors will guide you through options tailored to your car model.",
      step2Title: "Diagnostic Inspection",
      step2Desc:
        "We perform digital scans and physical inspections, providing clear, itemized quotes with parts and labor before any work starts.",
      step3Title: "Expert Repair & Parts",
      step3Desc:
        "Certified master mechanics use advanced tools, genuine OEM parts, and factory-standard procedures to service your vehicle.",
      step4Title: "Quality Check & Delivery",
      step4Desc:
        "Every repaired car undergoes road testing and multi-point quality inspection backed by our comprehensive service warranty.",
      faqTitle: "Frequently Asked Questions About Our Services",
    },
    serviceDetails: {
      heroBadge: "Detailed Service Specifications",
      heroSuffix: "Service",
      heroSubtitle:
        "Professional car maintenance and repair standards in Sharjah Industrial Area 5.",
      allServicesTitle: "All Services",
      needFastTitle: "Need Fast Assistance?",
      needFastSubtitle: "Speak to Our Head Technician",
      needFastDesc:
        "Get instant technical advice and pricing for your vehicle over the phone or WhatsApp.",
      callNowBtn: "Call Now",
      bookOnlineBtn: "Book Online",
      workshopHoursTitle: "Workshop Hours",
      durationLabel: "Duration",
      warrantyLabel: "Warranty",
      serviceOverviewTitle: "Service Overview",
      includedFeaturesTitle: "What's Included in This Service",
      bookThisServiceBtn: "Book This Service",
      contactAdvisorBtn: "Contact Service Advisor",
    },
    gallery: {
      heroTitle: "Gallery",
      heroSubtitle:
        "A look at the quality work we deliver — every car, every time.",
      readyTitle1: "Ready for a",
      readyTitle2: "Transformation?",
      readyDesc:
        "Book your appointment today and see the Bab Al Bustan Auto Maintenance Workshop difference.",
      contactBtn: "Contact Us",
    },
    brands: {
      heroTitle1: "Brands",
      heroTitle2: "We Service",
      heroSubtitle:
        "A look at the quality work we deliver — every car, every time.",
    },
    booking: {
      heroTitle1: "Book an",
      heroTitle2: "Appointment",
      heroSubtitle:
        "Schedule your car maintenance with our certified master mechanics in Sharjah.",
      workshopName: "BAB AL BUSTAN AUTO MAINTENANCE WORKSHOP",
      address: "Industrial Area No 5, Sharjah, UAE",
      callUs: "CALL US",
      hoursTitle: "WORKSHOP HOURS",
      formTitle: "Schedule Your Service",
      formSubtitle:
        "Fill out the form below and our service team will confirm your preferred slot promptly.",
      nameLabel: "Your Name",
      emailLabel: "Email Address",
      phoneLabel: "Phone Number",
      serviceLabel: "Select Service",
      selectServicePlaceholder: "Choose a service...",
      dateLabel: "Preferred Date",
      timeLabel: "Preferred Time",
      selectTimePlaceholder: "Choose a time slot...",
      messageLabel: "Car Details & Notes",
      messagePlaceholder: "Mention car make, model, year, and specific complaints...",
      submitBtn: "Confirm Appointment Request",
      submittingBtn: "Submitting...",
      successToast:
        "Your appointment request has been received! We will call you shortly to confirm.",
    },
    contact: {
      heroTitle1: "Contact",
      heroTitle2: "Us",
      heroSubtitle:
        "Get in touch with our expert auto maintenance workshop team in Sharjah.",
      addressTitle: "Address",
      addressValue: "Industrial Area No 5, Sharjah, UAE",
      callTitle: "Call Us",
      hoursTitle: "Opening Hours",
      formTitle: "Send Us a Message",
      formSubtitle:
        "Have a question about car repairs or need an estimate? Drop us a note.",
      namePlaceholder: "Your Name",
      emailPlaceholder: "Your Email",
      phonePlaceholder: "Your Phone",
      subjectPlaceholder: "Subject",
      messagePlaceholder: "Your Message",
      sendBtn: "Send Message",
      sendingBtn: "Sending...",
      successToast:
        "Thank you! Your message has been sent. We will respond promptly.",
    },
    faqPage: {
      heroBadge: "Help & Answers",
      heroTitle1: "Frequently Asked",
      heroTitle2: "Questions",
      heroSubtitle:
        "Everything you need to know about our vehicle repairs, pricing, genuine parts, and workshop appointments in Sharjah.",
      stillHaveTitle: "Still Have Questions?",
      stillHaveDesc:
        "Our service advisors are available Saturday to Thursday to assist you with customized quotes and vehicle questions.",
      callBtn: "Call Now",
      bookBtn: "Book Appointment",
    },
    blogs: {
      heroTitle: "Maintenance Blogs",
      heroSubtitle:
        "Read the latest tips on car maintenance, AC repair, and engine diagnostics from Bab Al Bustan Workshop in Sharjah.",
      sectionTitle: "Explore Our Latest Insights",
      sectionDesc:
        "Stay updated with expert automotive advice, maintenance tips, and industry trends from the leading experts at Bab Al Bustan Workshop.",
      searchPlaceholder: "Search blogs...",
      categoriesTitle: "Categories",
      readTimePrefix: "min read",
      readMoreBtn: "Read Full Article",
      noResults: "No blog posts found matching your search.",
    },
    chat: {
      tooltip: "Chat on WhatsApp",
    },
    notFound: {
      code: "Error 404",
      title: "Page Not Found",
      desc: "We couldn't find the page you're looking for. It might have been moved or removed. Let's get you back on track.",
      backHome: "Back to Home",
      ourServices: "Our Services",
    },
  },
  ar: {
    nav: {
      about: "عن الورشة",
      services: "خدماتنا",
      gallery: "معرض الأعمال",
      brands: "الماركات",
      contact: "اتصل بنا",
      blogs: "المدونة",
      booking: "حجز موعد",
      searchPlaceholder: "بحث عن خدمة أو ماركة...",
      contactBtn: "اتصل بنا",
      langSwitchLabel: "English",
      langName: "العربية",
    },
    common: {
      bookAppointment: "حجز موعد",
      callUs: "اتصل بنا",
      contactUs: "تواصل معنا",
      learnMore: "معرفة المزيد",
      viewAll: "عرض الكل",
      exploreMore: "استكشف المزيد",
      readMore: "اقرأ المزيد",
      submit: "إرسال",
      sending: "جارٍ الإرسال...",
      success: "تم بنجاح!",
      error: "حدث خطأ",
      whatsappChat: "تواصل عبر واتساب",
      getQuote: "طلب تسعيرة",
      allServices: "جميع الخدمات",
      allCategories: "جميع الفئات",
    },
    home: {
      hero: {
        title: "ورشة باب البستان لصيانة السيارات",
        subtitle: "صيانة سيارات معتمدة وموثوقة في الشارقة",
        exploreMore: "استكشف الخدمات",
        bookService: "حجز صيانة",
        scrollDown: "التمرير لأسفل",
        happyClients: "عميل راضٍ",
        yearsExp: "سنوات خبرة",
        servicesOffered: "خدمة معتمدة",
        satisfactionRate: "نسبة الرضا",
        videoPlayHint: "تشغيل فيديو الورشة",
        videoPauseHint: "إيقاف الفيديو والعودة للصورة",
      },
      services: {
        eyebrow: "خدماتنا المتميزة",
        titlePart1: "عناية احترافية بالسيارات",
        titlePart2: "لكل الماركات والموديلات",
        viewAll: "عرض جميع الخدمات",
        exploreService: "تفاصيل الخدمة",
      },
      feature: {
        tag: "ورشة باب البستان لصيانة السيارات",
        titlePart1: "نقدم أكثر من مجرد",
        titlePart2: "صيانة سيارات عادية",
        description:
          "في ورشة باب البستان لصيانة السيارات، نجمع بين السرعة والدقة. يستخدم فنيونا المعتمدون أحدث الأجهزة لتحقيق نتائج تفوق توقعاتك في كل مرة.",
        expressTitle: "خدمة سريعة",
        expressDesc:
          "تُنجز معظم الخدمات خلال أقل من 60 دقيقة دون المساس بجودة الصيانة.",
        qualityTitle: "ضمان الجودة",
        qualityDesc:
          "ضمان الرضا بنسبة 100% على كافة الخدمات. لست راضياً؟ نعيد العمل مجاناً.",
        pricingTitle: "أسعار واضحة وشفافة",
        pricingDesc:
          "لا رسوم خفية. احصل على عرض سعر كامل ومفصل قبل بدء أي عمل.",
        techsTitle: "فنيون معتمدون",
        techsDesc:
          "فريقنا يحمل شهادات معتمدة ويخضع لتدريب مستمر على أحدث التطورات.",
        learnMore: "تعرف على المزيد عنا",
      },
      whyChooseUs: {
        eyebrow: "لماذا تختارنا",
        titlePart1: "الدقة، الجودة و",
        titlePart2: "الالتزام",
        titlePart3: "الذي يمكنك الاعتماد عليه دائماً",
        subtitle:
          "من سيارات الصالون الفاخرة إلى الدفع الرباعي، نجمع بين التكنولوجيا المتقدمة والحرفية الصادقة في المنطقة الصناعية 5 بالشارقة.",
        card1Title: "كبار الفنيين المعتمدين",
        card1Desc:
          "محترفون ذوو مهارة عالية بخبرة تزيد عن 15 عاماً في السيارات الألمانية واليابانية والأمريكية.",
        card2Title: "أسعار شفافة مسبقاً 100%",
        card2Desc:
          "عروض أسعار مفصلة لقطع الغيار وأجور اليد قبل فك أي مسمار - بدون أي رسوم خفية إطلاقاً.",
        card3Title: "فحص كمبيوتر بمستوى الوكالة",
        card3Desc:
          "أجهزة فحص إلكترونية متطورة وقراءة حية للحساسات لتحديد أكواد أعطال الكمبيوتر بدقة 100%.",
        card4Title: "قطع غيار أصلية ومعتمدة",
        card4Desc:
          "نقوم بتركيب قطع غيار أصلية ومطابقة للمواصفات معتمدة ومشمولة بضمان الورشة الكامل.",
        card5Title: "مسارات صيانة سريعة",
        card5Desc:
          "تبديل زيت سريع، إعادة ضبط أكواد الكمبيوتر، وصيانة الفرامل خلال أقل من 60 دقيقة في مساراتنا السريعة.",
        card6Title: "مستشار مخصص ومتابعة دورية",
        card6Desc:
          "دعم مباشر عبر واتساب، تقارير فحص شاملة، ومتابعة ما بعد الصيانة في الشارقة.",
        badgeTitle: "أكثر من 15 عاماً من التميز",
        badgeSub: "خدمة أكثر من 5,000 مركبة في الشارقة",
        bannerTitle: "هل أنت مستعد لتجربة صيانة سيارات بمستوى الوكالة؟",
        bannerDesc:
          "احجز موعدك عبر الإنترنت أو تفضل بزيارة ورشتنا في المنطقة الصناعية 5 بالشارقة اليوم.",
        bookBtn: "حجز موعد",
        contactBtn: "اتصل بنا",
      },
      appointment: {
        titlePrefix: "تمتع برعاية فائقة –",
        titleWorkshop: "ورشة باب البستان لصيانة السيارات",
        namePlaceholder: "اسمك الكريم",
        emailPlaceholder: "البريد الإلكتروني",
        phonePlaceholder: "رقم الهاتف",
        vehiclePlaceholder: "نوع وموديل السيارة",
        subjectPlaceholder: "الموضوع",
        messagePlaceholder: "رسالتك أو تفاصيل العطل",
        sendBtn: "إرسال الرسالة",
        sendingBtn: "جارٍ الإرسال...",
        successToast: "شكراً لك! تم إرسال رسالتك بنجاح.",
        feat1Title: "خبرة معتمدة",
        feat1Desc: "متخصصون في السيارات الفاخرة والعالية الجودة",
        feat2Title: "تميز موثوق",
        feat2Desc: "عملية شفافة مع ضمان على جودة الصيانة",
      },
      workProcess: {
        eyebrow: "خطوات العمل",
        title: "كيف نعمل",
        step1Title: "شاركنا متطلباتك",
        step1Desc: "أخبرنا بما تواجهه سيارتك من مشاكل",
        step2Title: "احصل على عرض سعر مسبق",
        step2Desc: "تسعير واضح وشفاف يناسب احتياجاتك",
        step3Title: "حجز الموعد",
        step3Desc: "اختر الوقت الأنسب لزيارتك أو تسليم السيارة",
        step4Title: "عناية شخصية ومخصصة",
        step4Desc: "مهندسون وفنيون مخصصون لسيارتك حصرياً",
        step5Title: "متابعة وتحديثات حية",
        step5Desc: "تابع مراحل صيانة سيارتك خطوة بخطوة",
        step6Title: "الدفع بعد انتهاء الصيانة",
        step6Desc:
          "ادفع نقداً أو بالبطاقة أو إلكترونياً بعد اكتمال العمل ورضاك.",
      },
      recentWork: {
        title: "أعمالنا الحديثة",
        description:
          "نفخر بتقديم أفضل الخدمات المتاحة مع ضمان رضا بنسبة 100%.",
        btn: "جميع أعمالنا",
      },
      partnership: {
        title1: "شركاؤنا و",
        title2: "العلامات التي نخدمها",
        desc: "نعمل مع كبرى العلامات العالمية لنقدم لك خدمة معتمدة وقطع غيار أصلية. ورشتنا في الشارقة مجهزة بالكامل للتعامل مع السيارات الألمانية واليابانية والأمريكية بدقة الوكالة.",
      },
      testimonials: {
        eyebrow: "آراء عملائنا",
        titlePart1: "موثوقون من قبل السائقين في",
        titlePart2: "الشارقة والإمارات",
        subtitle:
          "اقرأ تجارب حقيقية من مالكي السيارات الذين يعتمدون على باب البستان لصيانة موثوقة.",
        ratingBadge: "تقييم 4.9 من 5.0 من أكثر من 450+ مالك سيارة سعيد",
        vehicleLabel: "السيارة:",
        verified: "عميل موثق",
      },
      faq: {
        title: "الأسئلة الأكثر شيوعاً حول تصليح السيارات في الشارقة",
      },
      stats: {
        yearsExp: "سنوات خبرة",
        technicians: "فنيون محترفون",
        projects: "مشروع منجز",
        customers: "عملاء راضون",
      },
      latestInsights: {
        title: "أحدث المقالات والرؤى",
        subtitle:
          "نغطي أهم الموضوعات لمساعدتك في الحفاظ على أداء سيارتك في أفضل حالاته",
        viewMore: "عرض المزيد",
        featuredTitle:
          "كيف يحافظ التغيير المنتظم للزيت على عمر المحرك وأدائه السلس",
        art1Title: "أهم العلامات التي تدل على ضرورة تغيير سفايف الفرامل فوراً",
        art2Title: "لماذا يستحق التلميع الداخلي الاحترافي كل درهم تدفعه",
        art3Title: "فحص كمبيوتر المحرك: اكتشف الأعطال قبل أن تصبح مكلفة",
        badgeWorkshop: "الورشة",
        badgeDetailing: "تلميع",
        badgeDiagnostics: "فحص كمبيوتر",
      },
      fourStep: {
        eyebrow: "كيف تعمل الخدمة",
        title: "عملية بسيطة من 4 خطوات",
        step1Title: "احجز عبر الإنترنت",
        step1Desc:
          "اختر خدمتك وحدد التاريخ والوقت المناسبين من نموذج الحجز الإلكتروني.",
        step2Title: "تسليم السيارة",
        step2Desc:
          "تفضل بزيارتنا أو نرتب خدمة استلام السيارة، وسيتولى فريقنا كل شيء.",
        step3Title: "صيانة احترافية",
        step3Desc:
          "يقوم الفنيون المعتمدون بإنجاز العمل بكل دقة وعناية وفق أعلى المعايير.",
        step4Title: "استلم وانطلق",
        step4Desc:
          "استلم سيارتك نظيفة ومصانة بشكل مثالي وجاهزة للانطلاق على الطريق.",
      },
    },
    footer: {
      newsletterBadge: "كن دائماً على اطلاع بالصيانة",
      newsletterTitle: "اشترك للحصول على نصائح صيانة السيارات وعروض حصرية",
      newsletterDesc:
        "احصل على قوائم فحص فصول السنة في الإمارات، وتذكيرات مواعيد الزيت، وكوبونات خصم مباشرة إلى بريدك الإلكتروني.",
      newsletterPlaceholder: "أدخل بريدك الإلكتروني...",
      newsletterBtn: "اشتراك",
      newsletterSubscribing: "جارٍ الاشتراك...",
      newsletterSuccessToast:
        "شكراً لاشتراكك! تفقد بريدك الإلكتروني للحصول على نصائح الصيانة والعروض الحصرية.",
      newsletterSuccessBanner:
        "أنت الآن مشترك! مرحباً بك في نادي كبار عملاء باب البستان.",
      newsletterInvalidToast: "يرجى إدخال عنوان بريد إلكتروني صحيح.",
      aboutDesc:
        "تقف ورشة باب البستان لصيانة السيارات في المنطقة الصناعية 5 بالشارقة كرمز موثوق للدقة، وقطع الغيار الأصلية، وخدمة العملاء الرفيعة لجميع متطلبات إصلاح سيارتك.",
      followUs: "تابعنا على:",
      quickLinksTitle: "روابط سريعة",
      servicesTitle: "خدماتنا",
      companyTitle: "الشركة",
      openingHoursTitle: "ساعات العمل",
      hoursWeekdays: "السبت – الخميس: 8:00 صباحاً – 9:00 مساءً",
      hoursBreak: "استراحة: 1:30 ظهراً – 3:30 عصراً",
      hoursFriday: "الجمعة: مغلق",
      supportTitle: "الدعم والأسئلة",
      faqLink: "الأسئلة الشائعة",
      privacyLink: "سياسة الخصوصية والشروط",
      contactTitle: "اتصل بنا",
      address: "المنطقة الصناعية رقم 5،\nالشارقة، الإمارات العربية المتحدة",
      copyright:
        "© حقوق النشر 2026 ورشة باب البستان لصيانة السيارات. جميع الحقوق محفوظة.",
      sitemap: "خريطة الموقع",
      contact: "اتصل بنا",
      appointment: "حجز موعد",
    },
    about: {
      heroTitle1: "عن",
      heroTitle2: "الورشة",
      heroSubtitle: "تعرف على تاريخنا ورسالتنا في تقديم أفضل خدمات صيانة السيارات",
      happyCustomers: "عميل راضٍ",
      yearsOfExp: "سنوات من الخبرة",
      eyebrow: "من نحن",
      mainTitle: "نحافظ على سلاسة قيادتك وأمانك على الطريق",
      p1: "نقدم خدمات صيانة وإصلاح سيارات احترافية تشمل فحص الكمبيوتر، تغيير الزيت، الفرامل، التعليق والمساعدات، البطارية، صيانة المكيف، الإطارات، والصيانة الدورية الشاملة.",
      p2: "نعمل على جميع الماركات الرائدة بفنيين ماهرين وقطع غيار أصلية وسرعة في الإنجاز. رضا العميل والأسعار الصادقة هي قمة أولوياتنا.",
      resultsEyebrow: "نتائج حقيقية",
      resultsTitle: "قبل وبعد: تحولات شاملة للسيارات",
      resultsDesc:
        "شاهد الفرق الكبير الذي تحدثه العناية الاحترافية - استعادة اللمعان والعمق والأداء مع إضافة طبقة حماية متينة تدوم طويلاً. كل تفصيل مهم ونتائجنا تتحدث عن نفسها.",
      viewGalleryBtn: "مشاهدة معرض الصور والفيديو",
      whyEyebrow: "لماذا تختارنا",
      whyTitle: "أسباب لاختيار ورشة باب البستان لصيانة السيارات",
      reasons: {
        r1Title: "فنيون معتمدون",
        r1Desc:
          "فنيون معتمدون يتمتعون بسنوات من الخبرة العملية في مختلف أنواع وموديلات السيارات.",
        r2Title: "أسعار صادقة",
        r2Desc:
          "عملية شفافة بدون أي رسوم خفية مع تقديم عرض سعر مفصل قبل بدء العمل.",
        r3Title: "شفافية مطلقة",
        r3Desc:
          "لا مفاجآت أو تكاليف غير متوقعة - إفصاح كامل عن التكاليف قبل فك أي مسمار.",
        r4Title: "خدمة سريعة",
        r4Desc:
          "إنجاز معظم الخدمات الدورية في أقل من 60 دقيقة دون المساس بجودة الصيانة.",
        r5Title: "منتجات عالية الجودة",
        r5Desc:
          "نستخدم فقط زيوت وقطع غيار ومواد معتمدة من كبرى العلامات العالمية.",
        r6Title: "ضمان الرضا",
        r6Desc:
          "ضمان الرضا بنسبة 100% — إذا لم تكن راضياً عن النتيجة نعيد العمل مجاناً.",
      },
    },
    servicesPage: {
      heroTitle1: "خدمات",
      heroTitle2: "السيارات",
      heroSubtitle:
        "صيانة وإصلاح احترافي بمستوى الوكالة لجميع أنواع المركبات في الشارقة",
      filterAll: "جميع الخدمات",
      filterEngine: "المحرك والزيت",
      filterCooling: "المكيف والتبريد",
      filterSafety: "الفرامل والإطارات",
      filterElectrical: "الكهرباء والكمبيوتر",
      featuresIncluded: "مزايا وإجراءات الخدمة",
      durationLabel: "المدة التقديرية",
      warrantyLabel: "الضمان المعتمد",
      bookServiceBtn: "حجز الخدمة",
      viewDetailsBtn: "تفاصيل الخدمة",
      processEyebrow: "خطوات العمل",
      processTitle: "عملية الصيانة المعتمدة من 4 خطوات",
      step1Title: "حجز الخدمة",
      step1Desc:
        "احجز موعدك عبر الموقع أو اتصل بنا. سيرشدك مستشارونا إلى الخيارات الأنسب لسيارتك.",
      step2Title: "فحص وتشخيص دقيق",
      step2Desc:
        "نجري فحصاً كمبيوترياً وميكانيكياً شاملاً ونقدم عرض سعر واضح ومفصل لقطع الغيار وأجور اليد.",
      step3Title: "صيانة احترافية بقطع أصلية",
      step3Desc:
        "يتولى فنيون معتمدون إنجاز الإصلاحات باستخدام أحدث المعدات وقطع الغيار الأصلية المعتمدة.",
      step4Title: "فحص الجودة والتسليم",
      step4Desc:
        "تخضع كل مركبة لاختبار طريق وفحص جودة متعدد النقاط مشمولاً بضمان الورشة الشامل.",
      faqTitle: "الأسئلة الشائعة حول خدمات صيانة السيارات",
    },
    serviceDetails: {
      heroBadge: "المواصفات التفصيلية للخدمة",
      heroSuffix: "خدمة",
      heroSubtitle:
        "أعلى معايير الصيانة والإصلاح في المنطقة الصناعية 5 بالشارقة.",
      allServicesTitle: "جميع الخدمات",
      needFastTitle: "تحتاج مساعدة سريعة؟",
      needFastSubtitle: "تحدث مع رئيس الفنيين",
      needFastDesc:
        "احصل على استشارة فنية فورية وتقدير تكلفة لسيارتك عبر الهاتف أو واتساب.",
      callNowBtn: "اتصل الآن",
      bookOnlineBtn: "حجز إلكتروني",
      workshopHoursTitle: "أوقات العمل",
      durationLabel: "المدة",
      warrantyLabel: "الضمان",
      serviceOverviewTitle: "نظرة عامة على الخدمة",
      includedFeaturesTitle: "ما تشمله هذه الخدمة",
      bookThisServiceBtn: "حجز هذه الخدمة الآن",
      contactAdvisorBtn: "مراسلة مستشار الخدمة",
    },
    gallery: {
      heroTitle: "معرض الأعمال والفيديوهات",
      heroSubtitle:
        "نظرة على جودة العمل الذي نقدمه — لكل سيارة، في كل وقت.",
      readyTitle1: "جاهز لتجربة",
      readyTitle2: "فارقة لسيارتك؟",
      readyDesc:
        "احجز موعدك اليوم واكتشف تميز ورشة باب البستان لصيانة السيارات.",
      contactBtn: "اتصل بنا",
    },
    brands: {
      heroTitle1: "العلامات التي",
      heroTitle2: "نقوم بصيانتها",
      heroSubtitle:
        "خبرة متخصصة وقطع غيار أصلية لكبرى الماركات العالمية في الشارقة.",
    },
    booking: {
      heroTitle1: "حجز",
      heroTitle2: "موعد صيانة",
      heroSubtitle:
        "حدد موعد صيانة سيارتك مع كبار الفنيين المعتمدين في الشارقة.",
      workshopName: "ورشة باب البستان لصيانة السيارات",
      address: "المنطقة الصناعية رقم 5، الشارقة، الإمارات العربية المتحدة",
      callUs: "اتصل بنا",
      hoursTitle: "أوقات العمل",
      formTitle: "احجز موعد صيانة سيارتك",
      formSubtitle:
        "يرجى تعبئة النموذج أدناه وسيقوم فريق الاستقبال بتأكيد موعدك المفضل على الفور.",
      nameLabel: "الاسم الكامل",
      emailLabel: "البريد الإلكتروني",
      phoneLabel: "رقم الهاتف المتحرك",
      serviceLabel: "نوع الخدمة المطلوبة",
      selectServicePlaceholder: "اختر الخدمة...",
      dateLabel: "التاريخ المفضل",
      timeLabel: "الوقت المفضل",
      selectTimePlaceholder: "اختر الوقت المناسب...",
      messageLabel: "بيانات السيارة والملاحظات",
      messagePlaceholder: "اذكر نوع السيارة والموديل وسنة الصنع والمشكلة التي تواجهها...",
      submitBtn: "تأكيد طلب الحجز",
      submittingBtn: "جارٍ إرسال الطلب...",
      successToast:
        "تم استلام طلب حجزك بنجاح! سيتصل بك فريقنا لتأكيد الموعد.",
    },
    contact: {
      heroTitle1: "تواصل",
      heroTitle2: "معنا",
      heroSubtitle:
        "يسعدنا الإجابة على استفساراتكم وتقديم الدعم الفني لصيانة سيارتك في الشارقة.",
      addressTitle: "العنوان",
      addressValue: "المنطقة الصناعية رقم 5، الشارقة، الإمارات العربية المتحدة",
      callTitle: "اتصل بنا",
      hoursTitle: "أوقات العمل",
      formTitle: "أرسل لنا رسالة",
      formSubtitle:
        "هل لديك سؤال عن صيانة سيارتك أو ترغب في تقدير سعر؟ يسعدنا تواصلك.",
      namePlaceholder: "اسمك الكريم",
      emailPlaceholder: "البريد الإلكتروني",
      phonePlaceholder: "رقم الهاتف",
      subjectPlaceholder: "الموضوع",
      messagePlaceholder: "اكتب رسالتك أو تفاصيل العطل...",
      sendBtn: "إرسال الرسالة",
      sendingBtn: "جارٍ الإرسال...",
      successToast:
        "شكراً لك! تم إرسال رسالتك بنجاح، وسنرد عليك بأسرع وقت.",
    },
    faqPage: {
      heroBadge: "المساعدة والإجابات",
      heroTitle1: "الأسئلة",
      heroTitle2: "الشائعة",
      heroSubtitle:
        "كل ما تحتاج لمعرفته حول خدمات صيانة السيارات، والأسعار، وقطع الغيار الأصلية، وحجز المواعيد في الشارقة.",
      stillHaveTitle: "هل ما زالت لديك أسئلة؟",
      stillHaveDesc:
        "مستشارو الخدمة لدينا متاحون من السبت إلى الخميس لمساعدتك في عروض الأسعار واستفسارات الأعطال.",
      callBtn: "اتصل الآن",
      bookBtn: "حجز موعد",
    },
    blogs: {
      heroTitle: "مدونة صيانة السيارات",
      heroSubtitle:
        "أحدث النصائح حول صيانة السيارات وإصلاح المكيف وفحص المحرك في حرارة الإمارات من خبراء ورشة باب البستان.",
      sectionTitle: "استكشف أحدث المقالات والنصائح",
      sectionDesc:
        "ابق على اطلاع بأفضل الإرشادات الهندسية للحفاظ على كفاءة سيارتك وتجنب الأعطال المفاجئة.",
      searchPlaceholder: "ابحث في المقالات...",
      categoriesTitle: "الفئات",
      readTimePrefix: "دقائق قراءة",
      readMoreBtn: "اقرأ المقال كاملاً",
      noResults: "لم يتم العثور على مقالات مطابقة لبحثك.",
    },
    chat: {
      tooltip: "تواصل عبر واتساب",
    },
    notFound: {
      code: "خطأ 404",
      title: "الصفحة غير موجودة",
      desc: "عذراً، لم نتمكن من العثور على الصفحة التي تبحث عنها. ربما تم نقلها أو حذفها.",
      backHome: "العودة للرئيسية",
      ourServices: "خدماتنا",
    },
  },
};

interface LanguageContextType {
  language: Language;
  direction: Direction;
  isArabic: boolean;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("site_language") as Language | null;
    if (saved === "ar" || saved === "en") {
      setLanguageState(saved);
      document.documentElement.lang = saved;
      document.documentElement.dir = saved === "ar" ? "rtl" : "ltr";
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("site_language", lang);
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    }
  };

  const toggleLanguage = () => {
    const nextLang = language === "en" ? "ar" : "en";
    setLanguage(nextLang);
  };

  const direction: Direction = language === "ar" ? "rtl" : "ltr";
  const isArabic = language === "ar";
  const t = translations[language];

  return (
    <LanguageContext.Provider
      value={{
        language,
        direction,
        isArabic,
        toggleLanguage,
        setLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
