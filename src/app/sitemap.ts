import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/content";
import { siteUrl } from "@/lib/site";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [{ url: siteUrl, priority: 1 }, { url: `${siteUrl}/experiments` }, ...(await getProjects()).map(p => ({ url: `${siteUrl}/work/${p.slug}` }))];
}
