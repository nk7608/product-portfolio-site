"use client";
import { createContext, useContext, type ReactNode, type ComponentProps } from "react";
import Link from "next/link";
export type AnalyticsEvent = "project_open" | "artifact_open" | "case_detail_open" | "case_expand" | "case_collapse" | "evidence_click" | "build_click" | "recommendation_expand" | "article_click" | "resume_link" | "theme_change" | "recommendation_change" | "music_load" | "music_play" | "music_pause" | "music_error" | "contact_open" | "pitstop_select";
export type AnalyticsAdapter = (event: AnalyticsEvent, properties: Record<string,string|number|boolean>) => void;
const noop:AnalyticsAdapter = ()=>{};
const AnalyticsContext = createContext<AnalyticsAdapter>(noop);
// Supply a consent-aware PostHog, GA or Vercel adapter here when enabled.
export function AnalyticsWrapper({children,adapter}: {children:ReactNode;adapter?:AnalyticsAdapter}) {
  return <AnalyticsContext.Provider value={adapter ?? noop}>{children}</AnalyticsContext.Provider>;
}
export function useAnalytics() { return useContext(AnalyticsContext); }
export function TrackedLink({event="artifact_open",item,href,...props}:ComponentProps<typeof Link> & {event?:AnalyticsEvent;item:string}) {
  const track=useAnalytics();
  const external=typeof href === "string" && href.startsWith("https://");
  return <Link href={href} {...(external?{target:"_blank",rel:"noopener noreferrer"}:{})} {...props} onClick={e=>{track(event,{item});props.onClick?.(e);}}/>;
}
