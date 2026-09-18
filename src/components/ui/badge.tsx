import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
const badgeVariants = cva("inline-flex items-center rounded-md px-2 py-1 font-mono text-[10px] tracking-wide",{variants:{variant:{default:"bg-secondary text-secondary-foreground",outline:"border border-border text-muted-foreground"}},defaultVariants:{variant:"default"}});
export function Badge({className,variant,...props}: ComponentProps<"span"> & VariantProps<typeof badgeVariants>) { return <span data-slot="badge" className={cn(badgeVariants({variant}),className)} {...props}/>; }
