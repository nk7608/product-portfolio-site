"use client";
import { AnalyticsWrapper } from "./analytics";
import { OfflineSupport } from "./offline-support";
import { PrefsProvider } from "./prefs";
import { Controls } from "./controls";
import { CommandMenu } from "./command-menu";
import { Onboarding } from "./onboarding";
export function Providers({children,roles}:{children:React.ReactNode;roles:{slug:string;label:string}[]}) {
  return <AnalyticsWrapper><PrefsProvider><OfflineSupport/>{children}<Controls/><CommandMenu roles={roles}/><Onboarding/></PrefsProvider></AnalyticsWrapper>;
}
