import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

/** Social preview cards (1200×630 PNG), rendered at build time so X, LinkedIn, Slack and WhatsApp always get an image.
 * Same Paper palette and Instrument Sans as the site; no gradients or effects. */
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";
const paper = { bg: "#FBFAF7", fg: "#1F1E1B", muted: "#68655F", rule: "#E6E3DC", accent: "#B4441F", green: "#3A9B65" };

async function fonts() {
  const dir = path.join(process.cwd(), "src/app/_og");
  const [regular, semibold] = await Promise.all([readFile(path.join(dir, "instrument-sans-400.woff")), readFile(path.join(dir, "instrument-sans-600.woff"))]);
  return [{ name: "Instrument Sans", data: regular, weight: 400 as const, style: "normal" as const }, { name: "Instrument Sans", data: semibold, weight: 600 as const, style: "normal" as const }];
}

type Card = { kicker?: string; title: string; lede: string; stats?: { value: string; label: string }[]; footer?: string; brand?: string };

export async function ogCard({ kicker, title, lede, stats = [], footer = "nayana-builds.vercel.app", brand }: Card) {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px 80px", background: paper.bg, color: paper.fg, fontFamily: "Instrument Sans", borderTop: `10px solid ${brand ?? paper.accent}` }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", fontSize: 26, color: paper.muted }}>
          <div style={{ width: 12, height: 12, borderRadius: 6, background: paper.green, marginRight: 14 }} />
          {kicker ?? "Nayana Kumari · Open to PM roles · Bangalore · remote or hybrid"}
        </div>
        <div style={{ marginTop: 40, fontSize: title.length > 34 ? 60 : 72, fontWeight: 600, letterSpacing: -2, lineHeight: 1.08 }}>{title}</div>
        <div style={{ marginTop: 22, fontSize: 30, lineHeight: 1.4, color: paper.muted, maxWidth: 960 }}>{lede}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {stats.length > 0 && <div style={{ display: "flex", borderTop: `2px solid ${paper.rule}`, borderBottom: `2px solid ${paper.rule}` }}>
          {stats.slice(0, 3).map((s, i) => <div key={s.label} style={{ display: "flex", flexDirection: "column", flex: 1, padding: "20px 0", paddingLeft: i ? 28 : 0, borderLeft: i ? `2px solid ${paper.rule}` : "none" }}>
            <div style={{ fontSize: 36, fontWeight: 600 }}>{s.value}</div>
            <div style={{ fontSize: 22, color: paper.muted, marginTop: 4 }}>{s.label}</div>
          </div>)}
        </div>}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24, fontSize: 22, color: paper.muted }}><span>{footer}</span><span>@uncommonnayana</span></div>
      </div>
    </div>,
    { ...ogSize, fonts: await fonts() },
  );
}
