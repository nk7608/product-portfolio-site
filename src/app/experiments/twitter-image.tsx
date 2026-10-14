import { ogCard, ogContentType, ogSize } from "@/lib/og";
export const alt = "Experiments by Nayana Kumari: independent case studies and prototypes.";
export const size = ogSize;
export const contentType = ogContentType;
export default function Image() {
  return ogCard({ title: "Experiments", lede: "Independent case studies and prototypes: Swish, Headout, Pronto, Loans24, Foobar and a cycle-synced workout tracker.", footer: "nayana-builds.vercel.app/experiments" });
}
