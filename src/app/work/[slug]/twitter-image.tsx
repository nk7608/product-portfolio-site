import { getProject, getProjects } from "@/lib/content";
import { brandAssets } from "@/lib/brand-assets";
import { ogCard, ogContentType, ogSize } from "@/lib/og";
export const size = ogSize;
export const contentType = ogContentType;
export async function generateStaticParams() { return (await getProjects()).map(p => ({ slug: p.slug })); }
export async function generateImageMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const p = await getProject((await params).slug);
  return [{ id: "card", alt: p ? `${p.title}: ${p.outcome ?? p.subtitle}` : "Nayana Kumari", size: ogSize, contentType: ogContentType }];
}
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const p = await getProject((await params).slug);
  if (!p) return ogCard({ title: "Nayana Kumari", lede: "Product manager." });
  const stats = [p.primaryMetric, ...p.supportingMetrics, ...p.metrics].filter((m, i, all) => m && all.findIndex(x => x?.label === m.label) === i).slice(0, 3) as { value: string; label: string }[];
  return ogCard({ kicker: `${p.role.split(" · ")[0]} · ${p.period}`, title: p.title, lede: p.outcome ?? p.subtitle, stats, footer: `nayana-builds.vercel.app/work/${p.slug}`, brand: brandAssets[p.slug]?.hue });
}
