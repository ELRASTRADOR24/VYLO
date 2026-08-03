import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/lobby/"],
    },
    sitemap: "https://vylo-nine.vercel.app/sitemap.xml",
  };
}
