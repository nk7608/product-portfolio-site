"use client";
import { ThemeProvider } from "next-themes";
import { MotionConfig } from "motion/react";
import { AnalyticsWrapper } from "./analytics";
import { AppearanceLab } from "./appearance-lab";
import { OfflineSupport } from "./offline-support";
import { Spotlight } from "./spotlight";
export function Providers({children}:{children:React.ReactNode}) {
  return <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange><MotionConfig reducedMotion="user"><AnalyticsWrapper><OfflineSupport/><Spotlight/>{children}<AppearanceLab/></AnalyticsWrapper></MotionConfig></ThemeProvider>;
}
