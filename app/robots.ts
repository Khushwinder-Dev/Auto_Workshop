import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
      },
      {
        userAgent: "bingbot",
        allow: "/",
      },
    ],
    sitemap: "https://babalbustan.ae/sitemap.xml",
  };
}

