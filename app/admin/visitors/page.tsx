"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Lock,
  Unlock,
  Eye,
  EyeOff,
  RefreshCw,
  Download,
  LogOut,
  Users,
  Eye as PageViewsIcon,
  Globe,
  Compass,
  Monitor,
  Smartphone,
  Tablet,
  Search,
  Filter,
  ArrowUpDown,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Clock,
  MapPin,
  Laptop,
  Navigation,
  Mic,
  Building2,
  Layers,
} from "lucide-react";

interface VisitorLogItem {
  id: string;
  ip_address: string;
  country: string | null;
  city: string | null;
  timezone: string | null;
  user_agent: string | null;
  device_type: string | null;
  browser: string | null;
  os: string | null;
  path_visited: string;
  visit_count: number;
  first_visited_at: string;
  last_visited_at: string;
  site?: "babalbustan" | "tajalrahmah" | string;
  site_name?: string;
  site_badge_color?: string;
  latitude?: number | null;
  longitude?: number | null;
  accuracy?: number | null;
  location_source?: string | null;
  exact_location?: string | null;
  maps_url?: string | null;
}

interface AnalyticsStats {
  totalVisits: number;
  uniqueVisitors: number;
  babalCount?: number;
  tajCount?: number;
  gpsCount?: number;
  topCountries: { country: string; count: number }[];
  topPaths: { path: string; count: number }[];
}

export default function AdminVisitorsPage() {
  // Auth state
  const [authStatus, setAuthStatus] = useState<"loading" | "unauthenticated" | "authenticated">("loading");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Data state
  const [visitors, setVisitors] = useState<VisitorLogItem[]>([]);
  const [stats, setStats] = useState<AnalyticsStats>({
    totalVisits: 0,
    uniqueVisitors: 0,
    babalCount: 0,
    tajCount: 0,
    gpsCount: 0,
    topCountries: [],
    topPaths: [],
  });
  const [dataLoading, setDataLoading] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);

  // Filters & sorting
  const [selectedSite, setSelectedSite] = useState<"all" | "babalbustan" | "tajalrahmah">("all");
  const [gpsOnly, setGpsOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDevice, setSelectedDevice] = useState<string>("ALL");
  const [sortBy, setSortBy] = useState<"last_visited_at" | "visit_count">("last_visited_at");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

  // Fetch visitor data with active site and sort
  const fetchData = useCallback(
    async (siteParam?: string, gpsParam?: boolean) => {
      setDataLoading(true);
      const site = siteParam ?? selectedSite;
      const gps = gpsParam ?? gpsOnly;

      try {
        const queryParams = new URLSearchParams({
          site,
          gpsOnly: gps ? "true" : "false",
          sortBy,
          sortOrder,
        });

        const res = await fetch(`/api/admin/visitors?${queryParams.toString()}`, {
          cache: "no-store",
        });

        if (res.status === 401) {
          setAuthStatus("unauthenticated");
          return;
        }

        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setVisitors(data.visitors || []);
            setStats(
              data.stats || {
                totalVisits: 0,
                uniqueVisitors: 0,
                babalCount: 0,
                tajCount: 0,
                gpsCount: 0,
                topCountries: [],
                topPaths: [],
              }
            );
            setLastRefreshed(new Date());
          }
        }
      } catch (err) {
        console.error("Failed to load visitor logs:", err);
      } finally {
        setDataLoading(false);
      }
    },
    [selectedSite, gpsOnly, sortBy, sortOrder]
  );

  // Check initial session
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/auth", { method: "GET" });
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            setAuthStatus("authenticated");
            fetchData();
            return;
          }
        }
      } catch {
        // Fallback to unauthenticated
      }
      setAuthStatus("unauthenticated");
    }
    checkAuth();
  }, [fetchData]);

  // Handle site filter switch
  const handleSiteChange = (site: "all" | "babalbustan" | "tajalrahmah") => {
    setSelectedSite(site);
    fetchData(site, gpsOnly);
  };

  // Handle GPS-only toggle
  const handleGpsToggle = () => {
    const next = !gpsOnly;
    setGpsOnly(next);
    fetchData(selectedSite, next);
  };

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setLoginError("Please enter the dashboard password");
      return;
    }

    setLoginLoading(true);
    setLoginError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setAuthStatus("authenticated");
        setPassword("");
        fetchData();
      } else {
        setLoginError(data.error || "Incorrect password. Please try again.");
      }
    } catch {
      setLoginError("Connection failed. Please check network and try again.");
    } finally {
      setLoginLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
    } catch {
      // Ignore error
    }
    setAuthStatus("unauthenticated");
    setVisitors([]);
  };

  // Filter visitors in memory
  const filteredVisitors = useMemo(() => {
    return visitors.filter((item) => {
      // Device filter
      if (selectedDevice !== "ALL") {
        if ((item.device_type || "").toLowerCase() !== selectedDevice.toLowerCase()) {
          return false;
        }
      }

      // GPS filter if set
      if (gpsOnly && (item.latitude == null || item.longitude == null)) {
        return false;
      }

      // Search filter
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      const ip = (item.ip_address || "").toLowerCase();
      const country = (item.country || "").toLowerCase();
      const city = (item.city || "").toLowerCase();
      const path = (item.path_visited || "").toLowerCase();
      const browser = (item.browser || "").toLowerCase();
      const os = (item.os || "").toLowerCase();
      const site = (item.site_name || item.site || "").toLowerCase();
      const loc = (item.exact_location || "").toLowerCase();

      return (
        ip.includes(q) ||
        country.includes(q) ||
        city.includes(q) ||
        path.includes(q) ||
        browser.includes(q) ||
        os.includes(q) ||
        site.includes(q) ||
        loc.includes(q)
      );
    });
  }, [visitors, selectedDevice, gpsOnly, searchQuery]);

  // Export to CSV
  const handleExportCSV = () => {
    if (filteredVisitors.length === 0) return;

    const headers = [
      "Site",
      "IP Address",
      "Country",
      "City",
      "Exact GPS Latitude",
      "Exact GPS Longitude",
      "GPS Accuracy (m)",
      "Location Source",
      "Exact Location Name",
      "Google Maps URL",
      "Timezone",
      "Device",
      "OS",
      "Browser",
      "Page Visited",
      "Visit Count",
      "First Visited",
      "Last Visited",
    ];

    const rows = filteredVisitors.map((v) => [
      `"${v.site_name || (v.site === 'tajalrahmah' ? 'Taj Al Rahmah' : 'Bab Al Bustan')}"`,
      `"${v.ip_address}"`,
      `"${v.country || "Unknown"}"`,
      `"${v.city || "Unknown"}"`,
      v.latitude != null ? v.latitude : '""',
      v.longitude != null ? v.longitude : '""',
      v.accuracy != null ? v.accuracy : '""',
      `"${v.location_source || "IP"}"`,
      `"${v.exact_location || ""}"`,
      `"${v.maps_url || ""}"`,
      `"${v.timezone || "Unknown"}"`,
      `"${v.device_type || "Desktop"}"`,
      `"${v.os || "Unknown"}"`,
      `"${v.browser || "Unknown"}"`,
      `"${v.path_visited}"`,
      v.visit_count,
      `"${new Date(v.first_visited_at).toLocaleString()}"`,
      `"${new Date(v.last_visited_at).toLocaleString()}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `visitors_${selectedSite}_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatRelativeTime = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffSec = Math.floor(diffMs / 1000);
      const diffMin = Math.floor(diffSec / 60);
      const diffHours = Math.floor(diffMin / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffSec < 30) return "Just now";
      if (diffSec < 60) return `${diffSec}s ago`;
      if (diffMin < 60) return `${diffMin}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays === 1) return "Yesterday";
      if (diffDays < 30) return `${diffDays}d ago`;
      return date.toLocaleDateString();
    } catch {
      return dateStr;
    }
  };

  const getDeviceIcon = (deviceType: string | null) => {
    const d = (deviceType || "").toLowerCase();
    if (d === "mobile") return <Smartphone className="w-4 h-4 text-red-400" />;
    if (d === "tablet") return <Tablet className="w-4 h-4 text-amber-400" />;
    return <Monitor className="w-4 h-4 text-sky-400" />;
  };

  // 1. Initial Loading Screen
  if (authStatus === "loading") {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-zinc-300">
        <div className="w-12 h-12 border-4 border-red-600/30 border-t-red-600 rounded-full animate-spin mb-4" />
        <p className="text-sm font-medium tracking-wide">Initializing secure analytics dashboard...</p>
      </div>
    );
  }

  // 2. Lockscreen Modal (Unauthenticated)
  if (authStatus === "unauthenticated") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-red-800/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md bg-zinc-900/90 border border-zinc-800/80 rounded-2xl shadow-2xl p-8 backdrop-blur-xl relative z-10">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-700 flex items-center justify-center shadow-lg shadow-red-600/30 mb-4">
              <Lock className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Visitor Intelligence Portal
            </h1>
            <p className="text-xs text-zinc-400 mt-1.5">
              Unified Traffic & Real-time Location Dashboard
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                Administrator Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter access key..."
                  className="w-full bg-zinc-950/80 border border-zinc-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition pr-10"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition cursor-pointer"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-semibold text-sm shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {loginLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying Session...</span>
                </>
              ) : (
                <>
                  <Unlock className="w-4 h-4" />
                  <span>Unlock Portal</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-zinc-800 text-center">
            <span className="text-[11px] text-zinc-500 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
              Direct Encrypted Remote DB Access • Aiven Cloud MySQL
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 3. Authenticated Dashboard Screen
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-red-600 selection:text-white">
      {/* Top Bar / Header */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-zinc-800/80">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-600 flex items-center justify-center shadow-lg shadow-red-600/25 shrink-0">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white tracking-tight">
                  Visitor Intelligence & Exact GPS Portal
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold border border-emerald-500/20 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Sync
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Centralized Analytics & Search Mic Geolocation Capture
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            {lastRefreshed && (
              <span className="text-xs text-zinc-500 hidden sm:inline-block">
                Updated {lastRefreshed.toLocaleTimeString()}
              </span>
            )}
            <button
              onClick={() => fetchData()}
              disabled={dataLoading}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition border border-zinc-700/60 disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${dataLoading ? "animate-spin text-red-400" : ""}`} />
              <span>Refresh</span>
            </button>
            <button
              onClick={handleExportCSV}
              disabled={filteredVisitors.length === 0}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-medium transition shadow-sm shadow-red-600/30 disabled:opacity-50 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-medium transition border border-rose-500/20 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Exit</span>
            </button>
          </div>
        </header>

        {/* Site Switcher Toolbar (All Sites | Bab Al Bustan | Taj Al Rahmah) */}
        <div className="bg-zinc-900/70 border border-zinc-800/90 rounded-2xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5 pl-1">
              <Layers className="w-3.5 h-3.5 text-zinc-400" />
              Remote DB Site Filter:
            </span>
            <div className="inline-flex rounded-xl bg-zinc-950 p-1 border border-zinc-800 text-xs">
              <button
                onClick={() => handleSiteChange("all")}
                className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer flex items-center gap-1.5 ${
                  selectedSite === "all"
                    ? "bg-zinc-800 text-white shadow-sm border border-zinc-700"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <span>🏢 All Sites Combined</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-zinc-900 text-zinc-300">
                  {(stats.babalCount || 0) + (stats.tajCount || 0)}
                </span>
              </button>

              <button
                onClick={() => handleSiteChange("babalbustan")}
                className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer flex items-center gap-1.5 ${
                  selectedSite === "babalbustan"
                    ? "bg-red-600 text-white shadow-sm shadow-red-600/30"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-red-400" />
                <span>Bab Al Bustan</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/40 text-red-200">
                  {stats.babalCount || 0}
                </span>
              </button>

              <button
                onClick={() => handleSiteChange("tajalrahmah")}
                className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer flex items-center gap-1.5 ${
                  selectedSite === "tajalrahmah"
                    ? "bg-emerald-600 text-white shadow-sm shadow-emerald-600/30"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Taj Al Rahmah</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/40 text-emerald-200">
                  {stats.tajCount || 0}
                </span>
              </button>
            </div>
          </div>

          {/* Quick GPS Filter Indicator */}
          <button
            onClick={handleGpsToggle}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition border cursor-pointer ${
              gpsOnly
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm shadow-emerald-500/20"
                : "bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-700"
            }`}
          >
            <Navigation className={`w-3.5 h-3.5 ${gpsOnly ? "text-emerald-400 animate-spin" : "text-zinc-400"}`} />
            <span>📍 Mic GPS Coordinates Only</span>
            <span
              className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold ${
                gpsOnly ? "bg-emerald-500 text-zinc-950" : "bg-zinc-800 text-zinc-300"
              }`}
            >
              {stats.gpsCount || 0}
            </span>
          </button>
        </div>

        {/* 4 Summary Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Total Visits */}
          <div className="bg-zinc-900/60 border border-zinc-800/90 rounded-2xl p-5 relative overflow-hidden backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                Total Visits
              </span>
              <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center">
                <PageViewsIcon className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white tracking-tight">
                {stats.totalVisits.toLocaleString()}
              </span>
              <span className="text-xs text-red-400 font-medium">Hits Recorded</span>
            </div>
            <p className="text-xs text-zinc-500 mt-2">
              Aggregated page loads across {selectedSite === "all" ? "all connected sites" : selectedSite}
            </p>
          </div>

          {/* Card 2: Unique Visitors */}
          <div className="bg-zinc-900/60 border border-zinc-800/90 rounded-2xl p-5 relative overflow-hidden backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                Unique Visitors
              </span>
              <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white tracking-tight">
                {stats.uniqueVisitors.toLocaleString()}
              </span>
              <span className="text-xs text-sky-400 font-medium">Distinct IPs</span>
            </div>
            <p className="text-xs text-zinc-500 mt-2">
              {stats.babalCount || 0} Bab Al Bustan • {stats.tajCount || 0} Taj Al Rahmah
            </p>
          </div>

          {/* Card 3: Exact GPS Captures (High precision via mic search trigger) */}
          <div className="bg-zinc-900/60 border border-zinc-800/90 rounded-2xl p-5 relative overflow-hidden backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                Exact GPS Pins
              </span>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-emerald-400 tracking-tight">
                {stats.gpsCount || 0}
              </span>
              <span className="text-xs text-emerald-400/80 font-medium">Captured via Mic</span>
            </div>
            <p className="text-xs text-zinc-500 mt-2">
              Precise latitude/longitude recorded when users trigger mic search
            </p>
          </div>

          {/* Card 4: Top Countries */}
          <div className="bg-zinc-900/60 border border-zinc-800/90 rounded-2xl p-5 relative overflow-hidden backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                Top Countries
              </span>
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Globe className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 space-y-1.5">
              {stats.topCountries.length > 0 ? (
                stats.topCountries.slice(0, 2).map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <span className="text-zinc-300 font-medium truncate max-w-[130px]">
                      {item.country || "Unknown"}
                    </span>
                    <span className="text-amber-400 font-semibold">{item.count} hits</span>
                  </div>
                ))
              ) : (
                <span className="text-xs text-zinc-500">No geo data yet</span>
              )}
            </div>
            <p className="text-xs text-zinc-500 mt-2">
              {stats.topCountries.length} active territories
            </p>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by IP, Site, Country, City, Exact Location, or Path..."
              className="w-full bg-zinc-950/70 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-red-600 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Right Controls: Device Filter & Sort */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Device tabs */}
            <div className="inline-flex rounded-xl bg-zinc-950/80 p-1 border border-zinc-800 text-xs">
              {(["ALL", "Desktop", "Mobile", "Tablet"] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDevice(d)}
                  className={`px-3 py-1 rounded-lg font-medium transition cursor-pointer ${
                    selectedDevice === d
                      ? "bg-red-600 text-white shadow-sm shadow-red-600/30"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-zinc-400">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => {
                  const val = e.target.value as "last_visited_at" | "visit_count";
                  setSortBy(val);
                }}
                className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-white focus:outline-none focus:ring-1 focus:ring-red-600 cursor-pointer"
              >
                <option value="last_visited_at">Last Visited</option>
                <option value="visit_count">Visit Count</option>
              </select>

              <button
                onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
                className="p-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-300 hover:text-white cursor-pointer"
                title={`Order: ${sortOrder.toUpperCase()}`}
              >
                <ArrowUpDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Visitors Table Card */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-4 border-b border-zinc-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-white">Active Visitor Intelligence Log</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400">
                {filteredVisitors.length} of {visitors.length} entries shown
              </span>
              {gpsOnly && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Filtered by GPS Only
                </span>
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-950/70 text-zinc-400 font-semibold uppercase tracking-wider text-[11px] border-b border-zinc-800">
                <tr>
                  <th className="py-3.5 px-4">Site & IP Address</th>
                  <th className="py-3.5 px-4">Location & Exact GPS Pin</th>
                  <th className="py-3.5 px-4">Device & Browser</th>
                  <th className="py-3.5 px-4">Timezone</th>
                  <th className="py-3.5 px-4">Last Visited Path</th>
                  <th className="py-3.5 px-4 text-center">Visits</th>
                  <th className="py-3.5 px-4">Last Seen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {filteredVisitors.length > 0 ? (
                  filteredVisitors.map((v) => {
                    const hasGps = v.latitude != null && v.longitude != null;
                    const isTaj = v.site === "tajalrahmah";

                    return (
                      <tr
                        key={v.id}
                        className="hover:bg-zinc-800/30 transition-colors duration-150 group"
                      >
                        {/* Site & IP Column */}
                        <td className="py-3.5 px-4">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1.5">
                              {isTaj ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                  Taj Al Rahmah
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-red-500/10 text-red-300 border border-red-500/20">
                                  <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                                  Bab Al Bustan
                                </span>
                              )}
                              {v.country === "Local Network" && (
                                <span className="px-1.5 py-0.2 rounded text-[10px] bg-zinc-800 text-zinc-400 border border-zinc-700">
                                  Local
                                </span>
                              )}
                            </div>
                            <span className="font-mono text-zinc-300 font-medium">
                              {v.ip_address}
                            </span>
                          </div>
                        </td>

                        {/* Location Column (With Exact GPS & Google Maps link if mic triggered) */}
                        <td className="py-3.5 px-4">
                          {hasGps ? (
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-1.5">
                                {v.location_source?.includes("GPS Off") ? (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                                    <Navigation className="w-3 h-3 text-amber-400" />
                                    Cell / IP (GPS Off) {v.accuracy ? `(±${Math.round(v.accuracy)}m)` : ""}
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 animate-pulse">
                                    <Navigation className="w-3 h-3 text-emerald-400" />
                                    GPS Exact {v.accuracy ? `(±${Math.round(v.accuracy)}m)` : ""}
                                  </span>
                                )}
                                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] bg-zinc-800 text-zinc-400">
                                  <Mic className="w-2.5 h-2.5 text-red-400" />
                                  Mic Triggered
                                </span>
                              </div>

                              {v.exact_location && (
                                <span className="text-white font-medium text-xs">
                                  {/[\u0600-\u06FF]/.test(v.exact_location)
                                    ? `${v.city || "Sharjah"}, ${v.country || "United Arab Emirates"}`
                                    : v.exact_location}
                                </span>
                              )}

                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="font-mono text-[11px] text-zinc-400">
                                  {v.latitude?.toFixed(5)}, {v.longitude?.toFixed(5)}
                                </span>
                                <a
                                  href={v.maps_url || `https://www.google.com/maps?q=${v.latitude},${v.longitude}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-red-600/20 hover:bg-red-600/30 text-red-300 text-[10px] font-medium transition border border-red-500/30"
                                >
                                  <span>View Pin</span>
                                  <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-col gap-0.5">
                              <div className="flex items-center gap-1.5 text-zinc-300">
                                <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                                <span className="font-medium text-white">{v.country || "Unknown"}</span>
                                {v.city && v.city !== "Unknown" && (
                                  <span className="text-zinc-500">({v.city})</span>
                                )}
                              </div>
                              <span className="text-[10px] text-zinc-500">
                                IP Geolocation
                              </span>
                            </div>
                          )}
                        </td>

                        {/* Device & Browser Column */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            {getDeviceIcon(v.device_type)}
                            <div className="flex flex-col">
                              <span className="text-white font-medium">
                                {v.os || "Unknown"} • {v.browser || "Unknown"}
                              </span>
                              <span className="text-[10px] text-zinc-500">
                                {v.device_type || "Desktop"}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Timezone */}
                        <td className="py-3.5 px-4 text-zinc-400 font-mono text-[11px]">
                          {v.timezone || "Unknown"}
                        </td>

                        {/* Last Visited Path */}
                        <td className="py-3.5 px-4">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-zinc-950 font-mono text-red-400 text-[11px] border border-zinc-800 group-hover:border-zinc-700 transition">
                            {v.path_visited}
                          </span>
                        </td>

                        {/* Visit Count */}
                        <td className="py-3.5 px-4 text-center">
                          <span
                            className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${
                              v.visit_count > 10
                                ? "bg-red-500/20 text-red-300 border border-red-500/40"
                                : v.visit_count > 3
                                ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                                : "bg-zinc-800 text-zinc-300"
                            }`}
                          >
                            {v.visit_count}
                          </span>
                        </td>

                        {/* Last Seen */}
                        <td className="py-3.5 px-4">
                          <div className="flex flex-col">
                            <span className="text-white font-medium">
                              {formatRelativeTime(v.last_visited_at)}
                            </span>
                            <span className="text-[10px] text-zinc-500">
                              {new Date(v.last_visited_at).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-zinc-500">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Users className="w-8 h-8 text-zinc-600" />
                        <p className="text-sm font-medium">No visitor logs found</p>
                        <p className="text-xs text-zinc-600">
                          {searchQuery
                            ? "Try refining your search filter criteria"
                            : "New visits to the website will automatically appear here"}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer info note */}
        <footer className="text-center text-xs text-zinc-600 pt-4 pb-8">
          Bab Al Bustan & Taj Al Rahmah Shared Remote Intelligence • Protected Multi-Site Portal • All rights reserved
        </footer>
      </div>
    </div>
  );
}
