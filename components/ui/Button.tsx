import type React from "react";
import { cn } from "@/lib/utils";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "outline";
};

export function Button({ className, variant = "primary", ...props }: Props) {
  const base = "rounded-full px-5 py-2 text-sm font-medium transition";
  const styles = {
    primary: "bg-ocean text-white shadow-glow hover:opacity-90",
    ghost: "bg-transparent text-ink hover:bg-black/5",
    outline: "border border-black/10 bg-white hover:bg-black/5"
  };
  return <button className={cn(base, styles[variant], className)} {...props} />;
}
