"use client";
import Link from "next/link";
import type { ReactNode } from "react";

/** Link to a homepage section. On the homepage it sets location.hash so the page can reveal a collapsed section; elsewhere it navigates normally. */
export function HashLink({ id, className, children }: { id: string; className?: string; children: ReactNode }) {
  return <Link href={`/#${id}`} className={className} onClick={event => {
    if (window.location.pathname !== "/") return;
    event.preventDefault();
    if (window.location.hash === `#${id}`) window.dispatchEvent(new HashChangeEvent("hashchange"));
    else window.location.hash = id;
  }}>{children}</Link>;
}
