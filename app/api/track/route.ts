import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { lookupGeoIp, parseUserAgent, extractClientIp, reverseGeocodeGps } from "@/lib/trackHelpers";

export async function POST(req: NextRequest) {
  try {
    let payload: {
      path?: string;
      referrer?: string;
      timezone?: string;
      deviceType?: string;
      screenResolution?: string;
      language?: string;
      latitude?: number;
      longitude?: number;
      accuracy?: number;
      source?: string;
    } = {};

    try {
      const contentType = req.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        payload = await req.json();
      } else {
        const text = await req.text();
        if (text) {
          payload = JSON.parse(text);
        }
      }
    } catch {
      payload = {};
    }

    const path = (payload.path || "/").trim();

    // 1. Filter out static assets, admin routes, and api routes
    if (
      path.startsWith("/_next") ||
      path.startsWith("/admin") ||
      path.startsWith("/api") ||
      path.includes("favicon.ico") ||
      path.match(/\.(png|jpg|jpeg|webp|gif|svg|mp4|css|js|map|woff|woff2|ttf|ico)$/i)
    ) {
      return NextResponse.json({ skipped: true }, { status: 200 });
    }

    // 2. Extract client IP Address
    const ip = extractClientIp(req);

    // 3. Extract User-Agent & device details
    const userAgent = req.headers.get("user-agent") || "";
    const parsedUa = parseUserAgent(userAgent);
    const deviceType = payload.deviceType || parsedUa.deviceType;
    const browser = parsedUa.browser;
    const os = parsedUa.os;

    // 4. Geolocation & Timezone lookup
    const geo = await lookupGeoIp(ip, req.headers);
    let country = geo.country || "Unknown";
    let city = geo.city || "Unknown";
    const timezone = payload.timezone || geo.timezone || "Unknown";

    // 5. Check if exact GPS was supplied
    let gpsUpdate: {
      latitude?: number;
      longitude?: number;
      accuracy?: number | null;
      location_source?: string;
      exact_location?: string;
      maps_url?: string;
    } = {};

    if (typeof payload.latitude === "number" && typeof payload.longitude === "number") {
      const mapsUrl = `https://www.google.com/maps?q=${payload.latitude},${payload.longitude}`;
      const revGeo = await reverseGeocodeGps(payload.latitude, payload.longitude);
      if (revGeo.country) country = revGeo.country;
      if (revGeo.city) city = revGeo.city;

      gpsUpdate = {
        latitude: payload.latitude,
        longitude: payload.longitude,
        accuracy: typeof payload.accuracy === "number" ? Math.round(payload.accuracy * 10) / 10 : null,
        location_source: payload.source === "voice_search_mic" ? "GPS (Mic Trigger)" : "GPS",
        exact_location: revGeo.locationName,
        maps_url: mapsUrl,
      };
    }

    // 6. Database Storage & Aggregation
    const existing = await prisma.visitorLog.findUnique({
      where: { ip_address: ip },
    });

    if (existing) {
      await prisma.visitorLog.update({
        where: { ip_address: ip },
        data: {
          visit_count: { increment: 1 },
          last_visited_at: new Date(),
          path_visited: path,
          country: country !== "Unknown" ? country : existing.country,
          city: city !== "Unknown" ? city : existing.city,
          timezone: timezone !== "Unknown" ? timezone : existing.timezone,
          user_agent: userAgent || existing.user_agent,
          device_type: deviceType || existing.device_type,
          browser: browser !== "Unknown" ? browser : existing.browser,
          os: os !== "Unknown" ? os : existing.os,
          ...(gpsUpdate.latitude !== undefined ? gpsUpdate : {}),
        },
      });
    } else {
      await prisma.visitorLog.create({
        data: {
          ip_address: ip,
          country,
          city,
          timezone,
          user_agent: userAgent,
          device_type: deviceType,
          browser,
          os,
          path_visited: path,
          visit_count: 1,
          first_visited_at: new Date(),
          last_visited_at: new Date(),
          ...gpsUpdate,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Visitor tracking error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Tracking error" },
      { status: 200 }
    );
  }
}

// Diagnostic GET endpoint to test database connectivity directly
export async function GET() {
  try {
    const count = await prisma.visitorLog.count();
    return NextResponse.json({
      status: "ok",
      connected: true,
      total_visitors: count,
      database: "Aiven Cloud MySQL",
      table: "babalbustan_visitor_logs",
    });
  } catch (err: any) {
    console.error("Database connection test error:", err);
    return NextResponse.json(
      {
        status: "error",
        connected: false,
        error: err.message || String(err),
      },
      { status: 500 }
    );
  }
}
