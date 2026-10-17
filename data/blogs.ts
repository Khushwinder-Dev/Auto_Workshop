export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  date: string;
  image: string;
  readTime: string;
  excerpt: string;
  content: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "car-ac-repair-sharjah-tips",
    title: "5 Tips to Maintain Your Car AC in Sharjah Heat",
    category: "Maintenance",
    date: "October 24, 2024",
    image: "/images/service-3.png",
    readTime: "4 min read",
    excerpt: "Sharjah's intense summer temperatures place tremendous stress on your vehicle's air conditioning. Learn the top 5 maintenance practices to keep your AC blowing ice-cold.",
    content: [
      "Sharjah's intense summer temperatures place tremendous stress on your vehicle's air conditioning system. A properly functioning AC is not just about comfort—it improves driving concentration and keeps passengers safe during extreme heat. Regular maintenance can prevent costly repairs while ensuring your system delivers consistent cooling throughout the year.",
      "One of the most important maintenance practices is replacing the cabin air filter according to your manufacturer's recommendations. A clogged filter restricts airflow, reduces cooling efficiency, and forces the AC system to work harder. Clean filters also improve air quality inside the vehicle by reducing dust, pollen, and other airborne particles.",
      "It's equally important to inspect the refrigerant level. Low refrigerant often indicates a leak and results in poor cooling performance. If your AC takes longer than usual to cool the cabin or only blows slightly cool air, have the system inspected by a qualified technician before the problem worsens.",
      "Keep the condenser clean by removing dirt, sand, and debris that accumulate over time, especially after driving on dusty roads. A blocked condenser cannot release heat effectively, reducing the overall efficiency of the cooling system.",
      "Running your air conditioner for a few minutes every week—even during cooler months—helps lubricate internal seals and prevents them from drying out. Finally, schedule a professional AC inspection before the summer season begins. Early detection of worn components, leaks, or compressor issues can save significant repair costs and keep your vehicle comfortable even during the hottest days in Sharjah."
    ]
  },
  {
    slug: "best-oil-change-intervals-uae",
    title: "Best Oil Change Intervals for UAE Drivers",
    category: "Repair",
    date: "October 20, 2024",
    image: "/images/service-1.png",
    readTime: "5 min read",
    excerpt: "In the UAE's harsh climate, motor oil breaks down faster due to extreme heat and heavy traffic. Discover the recommended oil change intervals for optimal engine protection.",
    content: [
      "Engine oil plays a critical role in protecting your engine from wear, reducing friction, and maintaining optimal operating temperatures. In the UAE's harsh climate, oil deteriorates faster than it would in milder regions due to high temperatures, frequent traffic congestion, and dusty road conditions.",
      "Although many manufacturers recommend oil changes every 8,000 to 10,000 kilometers, UAE drivers should consider shorter intervals depending on driving habits. Vehicles that spend long hours idling in traffic, regularly tow heavy loads, or frequently operate in dusty environments may require oil changes every 5,000 to 7,000 kilometers.",
      "Using the correct oil grade specified by your vehicle manufacturer is equally important. High-quality synthetic oils generally provide better protection against extreme temperatures and maintain their viscosity for longer periods, making them ideal for Gulf climates.",
      "Ignoring oil changes can lead to sludge buildup, reduced fuel efficiency, overheating, and accelerated engine wear. Warning signs such as dark, dirty oil, increased engine noise, poor acceleration, or dashboard oil indicators should never be ignored.",
      "Regular oil and filter replacement is one of the most affordable maintenance services and significantly extends engine life. Following a consistent maintenance schedule will improve reliability, performance, and resale value while reducing the risk of expensive engine repairs."
    ]
  },
  {
    slug: "brake-safety-check-guide",
    title: "Why Squeaking Brakes Should Never Be Ignored",
    category: "Safety",
    date: "October 15, 2024",
    image: "/news/Ensuring Quality with Comprehensive Inspection Services.png",
    readTime: "4 min read",
    excerpt: "Persistent squeaking, grinding, or soft pedals are vital warning signs that your brake system needs immediate inspection. Here is what you need to know.",
    content: [
      "Your vehicle's braking system is one of its most important safety features. While occasional brake noise may result from moisture or dust, persistent squeaking or grinding sounds often indicate that brake components require immediate attention.",
      "Brake pads are designed with wear indicators that produce a squealing sound when they become too thin. Ignoring this warning can allow the metal backing plate to contact the brake rotor, causing extensive damage and significantly increasing repair costs.",
      "Additional warning signs include vibrations while braking, longer stopping distances, a soft brake pedal, or the vehicle pulling to one side. These symptoms may indicate worn brake pads, damaged rotors, air in the brake lines, or hydraulic system problems.",
      "Routine brake inspections should include checking pad thickness, rotor condition, brake fluid quality, hoses, and calipers. Replacing worn parts early helps maintain maximum braking performance and reduces overall maintenance expenses.",
      "Never delay brake repairs. Prompt inspections and professional servicing ensure your vehicle remains safe for you, your passengers, and everyone else on the road."
    ]
  },
  {
    slug: "transmission-fluid-guide",
    title: "Signs Your Transmission Needs Urgent Service",
    category: "Repair",
    date: "October 10, 2024",
    image: "/news/Advanced Process Control Instrumentation for Industrial Efficiency.png",
    readTime: "5 min read",
    excerpt: "Delayed gear shifts, burning odors, or fluid leaks can indicate serious transmission issues. Catching them early saves thousands of dirhams in repair costs.",
    content: [
      "Your vehicle's transmission transfers engine power to the wheels and is essential for smooth acceleration and efficient driving. Proper lubrication from transmission fluid protects internal gears, clutches, and bearings from excessive wear.",
      "One of the earliest warning signs of transmission trouble is delayed gear engagement. If your vehicle hesitates before moving or shifts roughly between gears, the transmission fluid may be low, contaminated, or losing its protective properties.",
      "Other symptoms include grinding noises, burning smells, transmission fluid leaks, dashboard warning lights, or unexpected slipping while driving. Continuing to drive with these symptoms can cause severe internal damage that may require a complete transmission rebuild.",
      "Routine transmission service includes inspecting fluid levels, checking for leaks, replacing worn filters where applicable, and changing transmission fluid according to manufacturer recommendations. Vehicles operating in hot climates often benefit from more frequent inspections.",
      "Addressing transmission issues early helps maintain smooth performance, improves fuel efficiency, and prevents expensive repairs that could have been avoided through regular maintenance."
    ]
  },
  {
    slug: "battery-life-in-uae-summer",
    title: "How the UAE Heat Shortens Your Battery Life",
    category: "Maintenance",
    date: "October 05, 2024",
    image: "/news/Electrical Electronics Testing for Reliable Operations.png",
    readTime: "4 min read",
    excerpt: "Intense heat accelerates chemical degradation inside car batteries, cutting lifespan down to 2-3 years. Learn how to test, maintain, and protect your battery.",
    content: [
      "Extreme temperatures significantly reduce the lifespan of automotive batteries. In the UAE, prolonged exposure to intense heat accelerates chemical reactions inside the battery, causing faster deterioration compared to cooler climates.",
      "A weak battery often shows warning signs before complete failure. Slow engine cranking, dim headlights, electrical malfunctions, or repeated jump-starts indicate that the battery may no longer be able to provide sufficient power.",
      "Corroded battery terminals also reduce electrical conductivity and can prevent proper charging. Cleaning terminals regularly and ensuring secure cable connections help maintain reliable performance.",
      "Most vehicle batteries last between two and three years under Gulf weather conditions. Regular battery testing during scheduled maintenance allows technicians to identify declining performance before unexpected breakdowns occur.",
      "Replacing an aging battery proactively is far more convenient and affordable than dealing with a roadside failure. Routine inspections help ensure dependable starting performance throughout every season."
    ]
  },
  {
    slug: "wheel-alignment-benefits",
    title: "Save Fuel with Proper Wheel Alignment",
    category: "Inspection",
    date: "September 28, 2024",
    image: "/news/Lifting Non-Destructive Equipment Mechanical Solutions.png",
    readTime: "4 min read",
    excerpt: "Misaligned wheels cause uneven tire wear and increase rolling resistance, burning extra fuel. Discover the benefits of precision computerized alignment.",
    content: [
      "Wheel alignment directly affects your vehicle's handling, tire life, fuel efficiency, and overall driving comfort. Even minor impacts from potholes, curbs, or road imperfections can gradually shift wheel angles out of specification.",
      "When wheels are misaligned, tires experience uneven wear patterns that shorten their lifespan and reduce traction. Drivers may also notice the vehicle pulling to one side or the steering wheel sitting off-center while driving straight.",
      "Poor alignment increases rolling resistance, forcing the engine to work harder and consume more fuel. Correcting wheel alignment improves stability, enhances steering response, and contributes to better fuel economy.",
      "Professional alignment equipment measures camber, caster, and toe angles with high precision, ensuring they meet manufacturer specifications. Combined with regular tire balancing and pressure checks, proper alignment maximizes tire performance and driving safety.",
      "Scheduling wheel alignment after suspension repairs, tire replacement, or significant road impacts helps protect your investment while providing a smoother, safer, and more comfortable driving experience."
    ]
  }
];
