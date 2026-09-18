"use client";
import * as Primitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
export const Accordion = Primitive.Root;
export function AccordionItem({className,...props}:ComponentProps<typeof Primitive.Item>) { return <Primitive.Item className={cn("border-b border-border last:border-b-0",className)} {...props}/>; }
export function AccordionTrigger({className,children,...props}:ComponentProps<typeof Primitive.Trigger>) { return <Primitive.Header><Primitive.Trigger className={cn("group flex min-h-12 w-full items-center justify-between gap-4 py-4 text-left text-sm font-medium hover:text-primary",className)} {...props}>{children}<Plus aria-hidden className="size-4 shrink-0 transition-transform group-data-[state=open]:rotate-45"/></Primitive.Trigger></Primitive.Header>; }
export function AccordionContent({className,children,...props}:ComponentProps<typeof Primitive.Content>) { return <Primitive.Content className="accordion-content overflow-hidden" {...props}><div className={cn("pb-5 text-sm leading-relaxed text-muted-foreground",className)}>{children}</div></Primitive.Content>; }
