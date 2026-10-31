import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/admin/visitors", "/api/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admin/", "/admin/visitors", "/api/"],
      },
      {
        userAgent: "bingbot",
        allow: "/",
        disallow: ["/admin/", "/admin/visitors", "/api/"],
      },
    ],
    sitemap: "https://babalbustan.ae/sitemap.xml",
  };
}
