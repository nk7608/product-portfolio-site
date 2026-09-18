import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/content";
export default async function sitemap():Promise<MetadataRoute.Sitemap>{const base=process.env.NEXT_PUBLIC_SITE_URL;if(!base)return [];return [{url:base},...(await getProjects()).map(p=>({url:`${base}/work/${p.slug}`}))];}
