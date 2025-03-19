import React from "react";

export default function StatBar({
  label,
  value,
  max = 100,
  suffix,
}: {
  label: string;
  value: number;
  max?: number;
  suffix: string;
}) {
  const percentage = (value / max) * 100;

  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <span className="text-sm text-neutral-700">{label}</span>
        <span className="text-sm font-medium text-neutral-800">
          {value}
          {suffix}
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-sm bg-neutral-200">
        <div
          className="h-full bg-emerald-500/70"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
