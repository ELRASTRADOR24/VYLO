import { MetadataRoute } from "next";
import { getGameList } from "@/games";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://vylo-nine.vercel.app";
  const lastMod = new Date();
  const gameEntries: MetadataRoute.Sitemap = getGameList().map((game) => ({
    url: `${baseUrl}/setup/${game.id}`,
    lastModified: lastMod,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  return [
    {
      url: baseUrl,
      lastModified: lastMod,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/library`,
      lastModified: lastMod,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/join`,
      lastModified: lastMod,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/rules`,
      lastModified: lastMod,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...gameEntries,
    {
      url: `${baseUrl}/profile`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
