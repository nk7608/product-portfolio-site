import { z } from "zod";
export const safeHref = z.string().refine(value => /^https:\/\//.test(value) || /^\/(?!\/)/.test(value) || /^mailto:[^\s]+$/.test(value), "Use HTTPS, a local absolute path, or mailto");
export const projectSchema = z.object({
  title: z.string(), subtitle: z.string(), summary: z.string(), category: z.enum(["AIPM", "Growth", "Prototypes"]),
  period: z.string(), role: z.string(), order: z.number(), featured: z.boolean().default(false), draft: z.boolean().default(false),
  visual: z.enum(["vidrush", "opsmith", "cycle", "document", "terminal", "growth"]).default("document"),
  domain: z.string().optional(),
  outcome: z.string().optional(),
  primaryMetric: z.object({value:z.string(),label:z.string()}).optional(),
  supportingMetrics: z.array(z.object({value:z.string(),label:z.string()})).default([]),
  product: z.string().optional(),
  challenge: z.string().optional(),
  ownership: z.string().optional(),
  decisions: z.array(z.string()).default([]),
  shipped: z.array(z.string()).default([]),
  impact: z.array(z.string()).default([]),
  metrics: z.array(z.object({value: z.string(), label: z.string()})),
  links: z.array(z.object({label: z.string(), href: safeHref})),
  details: z.array(z.object({title: z.string(), text: z.string()})),
});
export type Project = z.infer<typeof projectSchema> & { slug: string; body: string };
export const testimonialSchema = z.object({name:z.string(), headline:z.string(), date:z.string(), relationship:z.string(), quote:z.string(), excerpt:z.boolean().default(false)});
