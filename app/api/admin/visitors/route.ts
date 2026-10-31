import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { COOKIE_NAME, verifySessionToken } from "@/lib/adminAuth";

export async function GET(req: NextRequest) {
  try {
    // 1. Session verification
    const token = req.cookies.get(COOKIE_NAME)?.value;
    if (!verifySessionToken(token)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Please authenticate first." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const siteFilter = searchParams.get("site")?.trim().toLowerCase() || "all";
    const gpsOnly = searchParams.get("gpsOnly") === "true";
    const search = searchParams.get("search")?.trim().toLowerCase() || "";
    const sortBy = searchParams.get("sortBy") || "last_visited_at";
    const sortOrder = searchParams.get("sortOrder") === "asc" ? "asc" : "desc";
    const limit = Math.min(parseInt(searchParams.get("limit") || "1000", 10), 2000);

    // 2. Fetch records based on site selection
    let babalList: any[] = [];
    let tajList: any[] = [];

    // Bab Al Bustan records
    if (siteFilter === "all" || siteFilter === "babalbustan") {
      try {
        babalList = await prisma.visitorLog.findMany({
          orderBy: {
            [sortBy === "visit_count" ? "visit_count" : "last_visited_at"]: sortOrder,
          },
          take: limit,
        });
      } catch (e) {
        console.error("Error loading Bab Al Bustan logs:", e);
      }
    }

    // Taj Al Rahmah records (from the same remote MySQL database defaultdb)
    if (siteFilter === "all" || siteFilter === "tajalrahmah") {
      try {
        tajList = await prisma.tajVisitorLog.findMany({
          orderBy: {
            [sortBy === "visit_count" ? "visit_count" : "last_visited_at"]: sortOrder,
          },
          take: limit,
        });
      } catch (e) {
        console.error("Error loading Taj Al Rahmah logs:", e);
      }
    }

    // Helper to sanitize any Arabic reverse-geocode address into English
    const sanitizeEnglishLocation = (loc: string | null, city: string | null, country: string | null) => {
      if (!loc) return null;
      if (/[\u0600-\u06FF]/.test(loc)) {
        const cleanCity = city && !/[\u0600-\u06FF]/.test(city) ? city : "Sharjah";
        const cleanCountry = country && !/[\u0600-\u06FF]/.test(country) ? country : "United Arab Emirates";
        return `${cleanCity}, ${cleanCountry}`;
      }
      return loc;
    };

    // Tag each entry with its site identity and ensure 100% English location text
    const normalizedBabal = babalList.map((item) => ({
      ...item,
      exact_location: sanitizeEnglishLocation(item.exact_location, item.city, item.country),
      site: "babalbustan",
      site_name: "Bab Al Bustan",
      site_badge_color: "red",
    }));

    const normalizedTaj = tajList.map((item) => ({
      ...item,
      exact_location: sanitizeEnglishLocation(item.exact_location, item.city, item.country),
      site: "tajalrahmah",
      site_name: "Taj Al Rahmah",
      site_badge_color: "emerald",
    }));

    // Merge lists
    let allVisitors = [...normalizedBabal, ...normalizedTaj];

    // Sort combined list if "all" was requested
    allVisitors.sort((a, b) => {
      if (sortBy === "visit_count") {
        return sortOrder === "asc"
          ? a.visit_count - b.visit_count
          : b.visit_count - a.visit_count;
      } else {
        const timeA = new Date(a.last_visited_at).getTime();
        const timeB = new Date(b.last_visited_at).getTime();
        return sortOrder === "asc" ? timeA - timeB : timeB - timeA;
      }
    });

    // 3. Compute Summary Statistics across the active selection
    let totalVisits = 0;
    let babalCount = 0;
    let tajCount = 0;
    let gpsCount = 0;
    const countryCounts: Record<string, number> = {};
    const pathCounts: Record<string, number> = {};

    allVisitors.forEach((v) => {
      totalVisits += v.visit_count;
      if (v.site === "babalbustan") babalCount += 1;
      if (v.site === "tajalrahmah") tajCount += 1;
      if (v.latitude != null && v.longitude != null) gpsCount += 1;

      const c = v.country || "Unknown";
      countryCounts[c] = (countryCounts[c] || 0) + v.visit_count;

      const p = v.path_visited || "/";
      pathCounts[p] = (pathCounts[p] || 0) + v.visit_count;
    });

    const uniqueVisitors = allVisitors.length;

    // Top Countries sorted descending
    const topCountries = Object.entries(countryCounts)
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Top Paths sorted descending
    const topPaths = Object.entries(pathCounts)
      .map(([path, count]) => ({ path, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // 4. GPS-only filter if toggled
    let filteredVisitors = allVisitors;
    if (gpsOnly) {
      filteredVisitors = filteredVisitors.filter(
        (v) => v.latitude != null && v.longitude != null
      );
    }

    // 5. In-memory search filtering
    if (search) {
      filteredVisitors = filteredVisitors.filter((v) => {
        const ip = (v.ip_address || "").toLowerCase();
        const country = (v.country || "").toLowerCase();
        const city = (v.city || "").toLowerCase();
        const path = (v.path_visited || "").toLowerCase();
        const browser = (v.browser || "").toLowerCase();
        const os = (v.os || "").toLowerCase();
        const siteName = (v.site_name || "").toLowerCase();
        const exactLoc = (v.exact_location || "").toLowerCase();

        return (
          ip.includes(search) ||
          country.includes(search) ||
          city.includes(search) ||
          path.includes(search) ||
          browser.includes(search) ||
          os.includes(search) ||
          siteName.includes(search) ||
          exactLoc.includes(search)
        );
      });
    }

    return NextResponse.json({
      success: true,
      stats: {
        totalVisits,
        uniqueVisitors,
        babalCount,
        tajCount,
        gpsCount,
        topCountries,
        topPaths,
      },
      visitors: filteredVisitors,
      activeSite: siteFilter,
    });
  } catch (error) {
    console.error("Error fetching visitor analytics:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch analytics data" },
      { status: 500 }
    );
  }
}
