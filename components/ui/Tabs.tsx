"use client";

import { cn } from "@/lib/utils";

type Tab = { id: string; label: string };

export function Tabs({
  tabs,
  active,
  onChange
}: {
  tabs: Tab[];
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "rounded-full px-4 py-2 text-sm",
            active === tab.id ? "bg-ink text-white" : "bg-white border border-black/10"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
