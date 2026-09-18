import type { NextConfig } from "next";
const config: NextConfig = {
  agentRules: false,
  poweredByHeader: false,
  async headers() {
    return [
      { source: "/assets/nayana-kumari-ai-product-manager-resume.pdf", headers: [
        { key: "Content-Disposition", value: 'attachment; filename="Nayana-Kumari-AI-Product-Manager-Resume.pdf"' },
      ] },
      { source: "/(.*)", headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      ] },
    ];
  },
};
export default config;
