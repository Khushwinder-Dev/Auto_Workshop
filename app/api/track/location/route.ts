import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { extractClientIp, reverseGeocodeGps } from "@/lib/trackHelpers";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { latitude, longitude, accuracy, path, source, site } = body;

    if (typeof latitude !== "number" || typeof longitude !== "number") {
      return NextResponse.json(
        { success: false, error: "Valid latitude and longitude required" },
        { status: 400 }
      );
    }

    const ip = extractClientIp(req);
    const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

    // Perform reverse-geocoding for exact human-readable address
    const geoDetails = await reverseGeocodeGps(latitude, longitude);

    const updatePayload = {
      latitude,
      longitude,
      accuracy: typeof accuracy === "number" ? Math.round(accuracy * 10) / 10 : null,
      location_source: source === "voice_search_mic" ? "GPS (Mic Trigger)" : "GPS",
      exact_location: geoDetails.locationName,
      maps_url: mapsUrl,
      last_visited_at: new Date(),
    };

    if (site === "tajalrahmah") {
      await prisma.tajVisitorLog.upsert({
        where: { ip_address: ip },
        update: updatePayload,
        create: {
          ip_address: ip,
          path_visited: path || "/",
          ...updatePayload,
          country: geoDetails.country || "Unknown",
          city: geoDetails.city || "Unknown",
        },
      });
    } else {
      await prisma.visitorLog.upsert({
        where: { ip_address: ip },
        update: updatePayload,
        create: {
          ip_address: ip,
          path_visited: path || "/",
          ...updatePayload,
          country: geoDetails.country || "Unknown",
          city: geoDetails.city || "Unknown",
        },
      });
    }

    return NextResponse.json({
      success: true,
      maps_url: mapsUrl,
      exact_location: geoDetails.locationName,
      latitude,
      longitude,
    });
  } catch (err: any) {
    console.error("Location track error:", err);
    return NextResponse.json(
      { success: false, error: err?.message || "Failed to record location" },
      { status: 500 }
    );
  }
}

