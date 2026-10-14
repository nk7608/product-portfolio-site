import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Newsreader } from "next/font/google";
import { Providers } from "@/components/providers";
import { Header } from "@/components/header";
import { getProjects } from "@/lib/content";
import { prefsKey } from "@/lib/prefs";
import { site, siteUrl } from "@/lib/site";
import "./globals.css";

const sans = Instrument_Sans({ subsets: ["latin"], variable: "--font-sans-face", display: "swap" });
const serif = Newsreader({ subsets: ["latin"], variable: "--font-serif-face", display: "swap", style: ["normal", "italic"] });
export const metadata:Metadata={
  metadataBase:new URL(siteUrl),
  title:{default:site.title,template:"%s · Nayana Kumari"},
  description:site.description,
  alternates:{canonical:"/"},
  openGraph:{type:"website",url:"/",siteName:site.name,locale:"en_IN",title:site.title,description:site.description},
  twitter:{card:"summary_large_image",site:site.handle,creator:site.handle,title:site.title,description:site.description},
  authors:[{name:site.name,url:siteUrl}],
};
export const viewport:Viewport={width:"device-width",initialScale:1,viewportFit:"cover",themeColor:[{media:"(prefers-color-scheme: light)",color:"#fbfaf7"},{media:"(prefers-color-scheme: dark)",color:"#1a1917"}]};

/* Runs before paint so the chosen theme, type and size never flash. Mirrors htmlAttributes() in src/lib/prefs.ts. */
const prepaint = `try{var p=JSON.parse(localStorage.getItem(${JSON.stringify(prefsKey)})||"{}")||{},d=document.documentElement,ok=function(v,a,f){return a.indexOf(v)>-1?v:f};var t=ok(p.theme,["system","paper","stone","ink","night"],"system");if(t==="system")t=matchMedia("(prefers-color-scheme: dark)").matches?"ink":"paper";d.setAttribute("data-theme",t);d.setAttribute("data-mode",t==="ink"||t==="night"?"dark":"light");d.setAttribute("data-accent",ok(p.accent,["rust","cobalt","moss","plum"],"rust"));d.setAttribute("data-font",ok(p.font,["sans","serif"],"sans"));d.setAttribute("data-size",ok(p.size,["s","m","l"],"m"));d.setAttribute("data-density",ok(p.density,["skim","full"],"skim"));d.setAttribute("data-motion",ok(p.motion,["auto","off"],"auto"))}catch(e){}`;

export default async function RootLayout({children}:{children:React.ReactNode}) {
  const roles = (await getProjects()).filter(p => ["vidrush","opsmith","blaze","phasio"].includes(p.slug)).map(p => ({ slug: p.slug, label: `${p.role.split(" · ")[0]} · ${p.title}` }));
  return <html lang="en" data-theme="paper" data-mode="light" data-accent="rust" data-font="sans" data-size="m" data-density="skim" data-motion="auto" data-scroll-behavior="smooth" className={`${sans.variable} ${serif.variable}`} suppressHydrationWarning>
    <head><script dangerouslySetInnerHTML={{__html:prepaint}}/></head>
    <body><Providers roles={roles}><a href="#main" className="skip-link">Skip to content</a><Header/>{children}</Providers></body>
  </html>;
}
