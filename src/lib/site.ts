/** Absolute site URL for canonical links, sitemaps and social previews (X/LinkedIn need absolute image URLs).
 * Order: explicit env → Vercel's production domain → the known production URL. */
const fromEnv = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "");
export const siteUrl = (fromEnv || "https://nayana-builds.vercel.app").replace(/\/$/, "");
export const site = {
  name: "Nayana Kumari",
  title: "Nayana Kumari — Product Manager",
  description: "Product manager with an engineering background. AI and B2B products from a fuzzy problem to a shipped, measured result — most recently founding PM at Vidrush. Open to PM roles.",
  handle: "@uncommonnayana",
};
