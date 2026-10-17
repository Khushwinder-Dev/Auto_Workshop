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
