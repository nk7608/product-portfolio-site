import type { NextConfig } from "next";

const dev = process.env.NODE_ENV !== "production";
/* Third parties are opt-in embeds only: the YouTube (nocookie) player after "Play", and Vercel's toolbar on previews.
 * Next.js emits inline bootstrap scripts on statically rendered pages, so script-src keeps 'unsafe-inline'
 * rather than forcing every page dynamic for nonces; everything else is locked to an explicit allowlist. */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${dev ? " 'unsafe-eval'" : ""} https://vercel.live`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://vercel.live https://vercel.com",
  "font-src 'self' data: https://vercel.live",
  "frame-src 'self' https://www.youtube-nocookie.com https://vercel.live",
  `connect-src 'self' https://vercel.live wss://ws-us3.pusher.com${dev ? " ws:" : ""}`,
  "media-src 'self'",
  "worker-src 'self'",
  "manifest-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  ...(dev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const config: NextConfig = {
  agentRules: false,
  poweredByHeader: false,
  async headers() {
    return [
      { source: "/assets/nayana-kumari-ai-product-manager-resume.pdf", headers: [
        { key: "Content-Disposition", value: 'attachment; filename="Nayana-Kumari-AI-Product-Manager-Resume.pdf"' },
      ] },
      { source: "/sw.js", headers: [
        { key: "Cache-Control", value: "no-cache" },
        { key: "Service-Worker-Allowed", value: "/" },
      ] },
      { source: "/(.*)", headers: [
        { key: "Content-Security-Policy", value: csp },
        { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()" },
      ] },
    ];
  },
};
export default config;
