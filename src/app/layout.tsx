import type { Metadata,Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import localFont from "next/font/local";
import { Providers } from "@/components/providers";
import { Header } from "@/components/header";
import "./globals.css";
const InstrumentSerif = localFont({src:[{path:"../../public/fonts/instrument-serif-regular.ttf",weight:"400",style:"normal"},{path:"../../public/fonts/instrument-serif-italic.ttf",weight:"400",style:"italic"}],variable:"--font-instrument-serif",display:"swap"});
export const metadata:Metadata={title:{default:"Nayana Kumari — 0→1 AI Product Manager",template:"%s · Nayana Kumari"},description:"Founding and early-stage product manager helping teams build and grow AI products across video, DevOps, CRM, and manufacturing.",...(process.env.NEXT_PUBLIC_SITE_URL?{metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL)}:{}),openGraph:{title:"Nayana Kumari — 0→1 AI Product Manager",description:"AI product work, measured outcomes, prototypes, and technical writing.",type:"website"},twitter:{card:"summary_large_image",creator:"@uncommonnayana"}};
export const viewport:Viewport={width:"device-width",initialScale:1,viewportFit:"cover",themeColor:[{media:"(prefers-color-scheme: light)",color:"#faf9f6"},{media:"(prefers-color-scheme: dark)",color:"#131217"}]};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en" suppressHydrationWarning><body className={`${GeistSans.variable} ${GeistMono.variable} ${InstrumentSerif.variable}`}><Providers><a href="#main" className="skip-link">Skip to content</a><Header/>{children}</Providers></body></html>;}
