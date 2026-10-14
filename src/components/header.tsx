"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Command, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePrefs } from "./prefs";
import { HashLink } from "./hash-link";

/** Bangalore time, rendered after mount so server and client markup match. */
function Clock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => setTime(new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" }).format(new Date()));
    tick(); const timer = setInterval(tick, 30000); return () => clearInterval(timer);
  }, []);
  return <span className="clock" aria-label={time ? `Bangalore, ${time}` : "Bangalore"}><i aria-hidden="true" />Bangalore {time && <span className="num">{time}</span>}</span>;
}

export function Header() {
  const { open } = usePrefs();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update(); window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return <header className={cn("topbar", scrolled && "is-scrolled")}>
    <div className="topbar-inner">
      <Link href="/" className="wordmark">Nayana Kumari</Link>
      <Clock />
      <nav aria-label="Main">
        <HashLink id="work" className="hide-sm">Work</HashLink>
        <HashLink id="contact" className="hide-sm">Contact</HashLink>
        <button type="button" className="cmd-btn" onClick={() => open("command")} aria-label="Open command menu"><Command size={14} aria-hidden="true" /><kbd>K</kbd></button>
        <button type="button" className="icon-btn" onClick={() => open("controls")} aria-label="Display and reading settings"><SlidersHorizontal size={16} /></button>
      </nav>
    </div>
  </header>;
}
