"use client";
import { useEffect, useRef, type ReactNode } from "react";

/** Native <dialog> wrapper: focus trap, Escape and backdrop click come from the platform. */
export function Sheet({ open, onClose, label, className, children }: { open: boolean; onClose: () => void; label: string; className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const returnTo = useRef<Element | null>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) { returnTo.current = document.activeElement; dialog.showModal(); }
    if (!open && dialog.open) { dialog.close(); (returnTo.current as HTMLElement | null)?.focus?.({ preventScroll: true }); }
  }, [open]);
  return <dialog ref={ref} aria-label={label} className={`sheet ${className ?? ""}`} onCancel={event => { event.preventDefault(); onClose(); }} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    {open && children}
  </dialog>;
}
