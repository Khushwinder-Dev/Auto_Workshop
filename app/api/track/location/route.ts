import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { extractClientIp, reverseGeocodeGps, lookupGeoIp } from "@/lib/trackHelpers";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    let { latitude, longitude, accuracy, path, source, site, gps_off } = body;

    const ip = extractClientIp(req);

    let finalLat: number | null = typeof latitude === "number" ? latitude : null;
    let finalLon: number | null = typeof longitude === "number" ? longitude : null;
    let finalAccuracy: number | null =
      typeof accuracy === "number" ? Math.round(accuracy * 10) / 10 : null;

    let locationSource = "GPS";
    if (source === "voice_search_mic") {
      locationSource = "GPS (Mic Trigger)";
    } else if (source === "form_voice_mic" || source === "booking_form_mic") {
      locationSource = "GPS (Booking Mic)";
    } else if (source) {
      locationSource = source;
    }

    // Fallback: If device GPS switch is turned OFF on mobile, resolve via Cellular Tower / IP Geo
    if (finalLat === null || finalLon === null || gps_off) {
      const geo = await lookupGeoIp(ip, req.headers);
      if (typeof geo.latitude === "number" && typeof geo.longitude === "number") {
        finalLat = geo.latitude;
        finalLon = geo.longitude;
        finalAccuracy = 2500; // Approximate cellular/Wi-Fi radius in meters
        locationSource = "Cellular / IP (GPS Off)";
      } else {
        // Fallback network coordinates for UAE
        finalLat = 25.3122;
        finalLon = 55.4892;
        finalAccuracy = 5000;
        locationSource = "Network Location (GPS Off)";
      }
    }

    const mapsUrl = `https://www.google.com/maps?q=${finalLat},${finalLon}`;

    // Perform reverse-geocoding for exact human-readable address in English
    const geoDetails = await reverseGeocodeGps(finalLat, finalLon);

    const updatePayload = {
      latitude: finalLat,
      longitude: finalLon,
      accuracy: finalAccuracy,
      location_source: locationSource,
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
          country: geoDetails.country || "United Arab Emirates",
          city: geoDetails.city || "Sharjah",
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
          country: geoDetails.country || "United Arab Emirates",
          city: geoDetails.city || "Sharjah",
        },
      });
    }

    return NextResponse.json({
      success: true,
      maps_url: mapsUrl,
      exact_location: geoDetails.locationName,
      latitude: finalLat,
      longitude: finalLon,
      location_source: locationSource,
    });
  } catch (err: any) {
    console.error("Location track error:", err);
    return NextResponse.json(
      { success: false, error: err?.message || "Failed to record location" },
      { status: 500 }
    );
  }
}
