"use client";
import { useState } from "react";
import { useAnalytics } from "./analytics";
import { contact } from "./command-menu";

/** Copies the address (Rauno pattern) with visible feedback; falls back to mailto if the clipboard is unavailable. */
export function CopyEmail({ item, label }: { item: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const track = useAnalytics();
  return <button type="button" className="copy-btn link" aria-label={`Copy email address ${contact.email}`} onClick={() => {
    navigator.clipboard?.writeText(contact.email).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }).catch(() => { location.href = `mailto:${contact.email}`; });
    track("contact_open", { item });
  }}>{label ?? contact.email}{copied && <small role="status">Copied</small>}</button>;
}
