"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Menu, Moon, Sun, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAnalytics, TrackedLink } from "./analytics";

const resumeUrl = "https://docs.google.com/document/d/16Wz-oAqgGcgZ36rLB6bt4ICtLqCMLMaLhXMBpRDPePA/preview";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const track = useAnalytics();
  return <button type="button" className="theme-toggle icon-button" aria-label="Toggle light and dark mode" onClick={() => {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(next);
    track("theme_change", { theme: next });
  }}><Moon className="size-4 dark:hidden"/><Sun className="hidden size-4 dark:block"/></button>;
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 18);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, []);

  const internal = [
    ["Work", "/#work"], ["References", "/#references"], ["Independent work", "/#independent-work"], ["About", "/#about"],
  ] as const;

  return <header className={cn("site-header", scrolled && "is-scrolled", open && "menu-open")}>
    <div className="header-shell">
      <Link href="/" aria-label="Nayana Kumari home" className="wordmark">Nayana Kumari<span>.</span></Link>
      <nav aria-label="Main navigation" className="desktop-nav">
        {internal.map(([label, href]) => <Link className="nav-link" href={href} key={href}>{label}</Link>)}
        <TrackedLink className="nav-link" href={resumeUrl} event="resume_link" item="header-resume">Resume</TrackedLink>
        <TrackedLink className="nav-link nav-contact" href="mailto:nayanak872@gmail.com" event="contact_open" item="header-email">Contact</TrackedLink>
        <ThemeToggle/>
      </nav>
      <div className="mobile-actions"><ThemeToggle/><button type="button" className="icon-button menu-button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(value => !value)}>{open ? <X size={18}/> : <Menu size={18}/>}</button></div>
    </div>
    {open && <nav aria-label="Mobile navigation" className="mobile-nav">
      {internal.map(([label, href]) => <Link className="mobile-nav-link" href={href} key={href} onClick={() => setOpen(false)}>{label}</Link>)}
      <TrackedLink className="mobile-nav-link" href={resumeUrl} event="resume_link" item="mobile-resume" onClick={() => setOpen(false)}>Resume</TrackedLink>
      <TrackedLink className="mobile-nav-link" href="mailto:nayanak872@gmail.com" event="contact_open" item="mobile-email" onClick={() => setOpen(false)}>Contact</TrackedLink>
    </nav>}
  </header>;
}
