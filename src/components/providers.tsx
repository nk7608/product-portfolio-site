"use client";
import { ThemeProvider } from "next-themes";
import { MotionConfig } from "motion/react";
import { AnalyticsWrapper } from "./analytics";
import { AppearanceLab } from "./appearance-lab";
import { OfflineSupport } from "./offline-support";
export function Providers({children}:{children:React.ReactNode}) {
  return <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange><MotionConfig reducedMotion="user"><AnalyticsWrapper><OfflineSupport/>{children}<AppearanceLab/></AnalyticsWrapper></MotionConfig></ThemeProvider>;
}
