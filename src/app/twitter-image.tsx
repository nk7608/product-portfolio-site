import { ogCard, ogContentType, ogSize } from "@/lib/og";
export const alt = "Nayana Kumari, product manager. 10K to 80K weekly product access, $4.2M to $6M ARR supported, MVP to 3 pilots in four months.";
export const size = ogSize;
export const contentType = ogContentType;
export default function Image() {
  return ogCard({
    kicker: "Open to PM roles · Bangalore · remote or hybrid",
    title: "Nayana Kumari",
    lede: "Product manager. AI and B2B products from a fuzzy problem to a shipped, measured result; most recently founding PM at Vidrush.",
    stats: [{ value: "10K → 80K", label: "weekly product access" }, { value: "$4.2M → $6M", label: "ARR supported" }, { value: "MVP → 3 pilots", label: "in four months" }],
  });
}
