import * as React from "react";

import { cn } from "@/lib/utils";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
}

export function Progress({ value, className, ...props }: ProgressProps) {
  return (
    <div
      className={cn("h-2.5 w-full overflow-hidden rounded-full bg-accent", className)}
      {...props}
    >
      <div
        className="h-full rounded-full bg-[linear-gradient(120deg,var(--brand-1),var(--brand-2))] transition-all duration-700"
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}
