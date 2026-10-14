"use client";
import { useEffect } from "react";
/** Cursor spotlight for every glass surface: one delegated listener writes --mx/--my on the hovered card. Fine pointers only. */
export const surfaceSelector = ".proof-card,.experience-row,.experiment-card,.quote-card,.working-notes,.personal-card,.conversation-panel,.case-header,.case-body-grid";
export function Spotlight() {
  useEffect(() => {
    if (!window.matchMedia("(hover:hover) and (pointer:fine)").matches) return;
    let current: HTMLElement | null = null;
    let frame = 0;
    const move = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const target = (event.target as Element | null)?.closest<HTMLElement>(surfaceSelector) ?? null;
        if (current && current !== target) current.removeAttribute("data-lit");
        current = target;
        if (!target) return;
        const box = target.getBoundingClientRect();
        target.style.setProperty("--mx", `${event.clientX - box.left}px`);
        target.style.setProperty("--my", `${event.clientY - box.top}px`);
        target.setAttribute("data-lit", "");
      });
    };
    const leave = () => { current?.removeAttribute("data-lit"); current = null; };
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("pointermove", move); document.documentElement.removeEventListener("pointerleave", leave); };
  }, []);
  return null;
}
