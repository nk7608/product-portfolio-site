"use client";
import { ThemeProvider } from "next-themes";
import { MotionConfig } from "motion/react";
import { AnalyticsWrapper } from "./analytics";
export function Providers({children}:{children:React.ReactNode}) {
  return <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange><MotionConfig reducedMotion="user"><AnalyticsWrapper>{children}</AnalyticsWrapper></MotionConfig></ThemeProvider>;
}
