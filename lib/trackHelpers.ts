export interface ParsedUA {
  browser: string;
  os: string;
  deviceType: string;
}

export function parseUserAgent(uaString: string | null | undefined): ParsedUA {
  if (!uaString) {
    return { browser: "Unknown", os: "Unknown", deviceType: "Desktop" };
  }

  const ua = uaString.toLowerCase();

  // OS detection
  let os = "Unknown";
  if (ua.includes("windows nt 10.0") || ua.includes("windows nt 11.0")) {
    os = "Windows 10/11";
  } else if (ua.includes("windows")) {
    os = "Windows";
  } else if (ua.includes("android")) {
    os = "Android";
  } else if (ua.includes("iphone") || ua.includes("ipad") || ua.includes("ipod")) {
    os = "iOS";
  } else if (ua.includes("mac os") || ua.includes("macintosh")) {
    os = "macOS";
  } else if (ua.includes("linux")) {
    os = "Linux";
  } else if (ua.includes("cros")) {
    os = "ChromeOS";
  }

  // Device type detection
  let deviceType = "Desktop";
  if (ua.includes("ipad") || ua.includes("tablet") || (ua.includes("android") && !ua.includes("mobile"))) {
    deviceType = "Tablet";
  } else if (
    ua.includes("mobile") ||
    ua.includes("iphone") ||
    ua.includes("ipod") ||
    ua.includes("android") ||
    ua.includes("blackberry") ||
    ua.includes("webos")
  ) {
    deviceType = "Mobile";
  }

  // Browser detection
  let browser = "Unknown";
  if (ua.includes("edg/") || ua.includes("edge/")) {
    browser = "Edge";
  } else if (ua.includes("samsungbrowser")) {
    browser = "Samsung Internet";
  } else if (ua.includes("opr/") || ua.includes("opera/")) {
    browser = "Opera";
  } else if (ua.includes("chrome/") && !ua.includes("chromium/")) {
    browser = "Chrome";
  } else if (ua.includes("firefox/")) {
    browser = "Firefox";
  } else if (ua.includes("safari/") && !ua.includes("chrome/")) {
    browser = "Safari";
  } else if (ua.includes("bot") || ua.includes("crawler") || ua.includes("spider")) {
    browser = "Bot/Crawler";
  }

  return { browser, os, deviceType };
}

export function isLocalOrPrivateIp(ip: string): boolean {
  if (!ip) return true;
  const clean = ip.replace(/^::ffff:/, "").trim();
  return (
    clean === "127.0.0.1" ||
    clean === "::1" ||
    clean === "localhost" ||
    clean.startsWith("192.168.") ||
    clean.startsWith("10.") ||
    clean.startsWith("172.16.") ||
    clean.startsWith("172.17.") ||
    clean.startsWith("172.18.") ||
    clean.startsWith("172.19.") ||
    clean.startsWith("172.2") ||
    clean.startsWith("172.30.") ||
    clean.startsWith("172.31.") ||
    clean.startsWith("fc00:") ||
    clean.startsWith("fe80:")
  );
}

export interface GeoLookupResult {
  country: string;
  city: string;
  timezone: string;
  latitude?: number | null;
  longitude?: number | null;
}

export async function lookupGeoIp(
  ip: string,
  headers: Headers
): Promise<GeoLookupResult> {
  // Check common reverse proxy / CDN headers first (Vercel, Cloudflare, AWS CloudFront)
  const headerCountry =
    headers.get("x-vercel-ip-country") ||
    headers.get("cf-ipcountry") ||
    headers.get("cloudfront-viewer-country") ||
    null;

  const headerCity =
    headers.get("x-vercel-ip-city") ||
    headers.get("cf-ipcity") ||
    headers.get("cloudfront-viewer-city") ||
    null;

  const headerTz =
    headers.get("x-vercel-ip-timezone") ||
    headers.get("cf-timezone") ||
    null;

  const headerLat = headers.get("x-vercel-ip-latitude") || headers.get("cf-iplatitude");
  const headerLon = headers.get("x-vercel-ip-longitude") || headers.get("cf-iplongitude");

  const parsedLat = headerLat ? parseFloat(headerLat) : null;
  const parsedLon = headerLon ? parseFloat(headerLon) : null;

  if (headerCountry) {
    return {
      country: headerCountry,
      city: headerCity ? decodeURIComponent(headerCity) : "Unknown",
      timezone: headerTz || "Unknown",
      latitude: !isNaN(parsedLat as number) ? parsedLat : null,
      longitude: !isNaN(parsedLon as number) ? parsedLon : null,
    };
  }

  if (isLocalOrPrivateIp(ip)) {
    return {
      country: "Local Network",
      city: "Localhost",
      timezone: "Local",
      latitude: 25.3122,
      longitude: 55.4892,
    };
  }

  // Fallback to free public IP lookup service with lat/lon and quick 2.5s timeout
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);

    const res = await fetch(`http://ip-api.com/json/${encodeURIComponent(ip)}?fields=status,country,city,timezone,lat,lon`, {
      signal: controller.signal,
      cache: "force-cache",
    });
    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      if (data && data.status === "success") {
        return {
          country: data.country || "Unknown",
          city: data.city || "Unknown",
          timezone: data.timezone || "Unknown",
          latitude: typeof data.lat === "number" ? data.lat : null,
          longitude: typeof data.lon === "number" ? data.lon : null,
        };
      }
    }
  } catch {
    // Geo lookup timed out or failed; fallback gracefully
  }

  return {
    country: "Unknown",
    city: "Unknown",
    timezone: "Unknown",
    latitude: null,
    longitude: null,
  };
}

export function extractClientIp(req: { headers: Headers }): string {
  const headers = req.headers;
  const cfConnectingIp = headers.get("cf-connecting-ip");
  const xForwardedFor = headers.get("x-forwarded-for");
  const xRealIp = headers.get("x-real-ip");

  let ip = "127.0.0.1";
  if (cfConnectingIp) {
    ip = cfConnectingIp.trim();
  } else if (xForwardedFor) {
    const ips = xForwardedFor.split(",").map((s) => s.trim());
    ip = ips[0] || "127.0.0.1";
  } else if (xRealIp) {
    ip = xRealIp.trim();
  }

  ip = ip.replace(/^::ffff:/, "").trim();
  if (ip === "::1") ip = "127.0.0.1";
  return ip;
}

export async function reverseGeocodeGps(
  lat: number,
  lon: number
): Promise<{ locationName: string; city?: string; country?: string }> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3500);

    // Request explicitly in English with accept-language=en
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1&accept-language=en`,
      {
        headers: {
          "User-Agent": "BabAlBustanTracker/1.0",
          Accept: "application/json",
          "Accept-Language": "en-US,en;q=0.9",
        },
        signal: controller.signal,
      }
    );
    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      const addr = data.address || {};
      const parts: string[] = [];

      // Extract English names
      const area = addr.suburb || addr.neighbourhood || addr.residential || addr.industrial || addr.road;
      if (area) parts.push(area);

      const city = addr.city || addr.town || addr.county || addr.state;
      if (city) parts.push(city);

      const country = addr.country || "United Arab Emirates";
      if (country) parts.push(country);

      let locationName = parts.length > 0 ? parts.join(", ") : data.display_name?.slice(0, 100);

      // Sanitize: If any Arabic characters remain, strip or replace them with English
      if (/[\u0600-\u06FF]/.test(locationName)) {
        locationName = [city, country].filter(Boolean).join(", ") || `Coordinates: ${lat.toFixed(5)}, ${lon.toFixed(5)}`;
      }

      return {
        locationName: locationName || `Lat: ${lat.toFixed(5)}, Lng: ${lon.toFixed(5)}`,
        city: typeof city === "string" && !/[\u0600-\u06FF]/.test(city) ? city : "Sharjah",
        country: typeof country === "string" && !/[\u0600-\u06FF]/.test(country) ? country : "United Arab Emirates",
      };
    }
  } catch {
    // Timeout or network error - fallback gracefully
  }

  return {
    locationName: `Lat: ${lat.toFixed(5)}, Lng: ${lon.toFixed(5)}`,
    city: "Sharjah",
    country: "United Arab Emirates",
  };
}
