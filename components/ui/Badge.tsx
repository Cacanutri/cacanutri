import type React from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("rounded-full bg-black/5 px-3 py-1 text-xs font-medium", className)} {...props} />;
}
