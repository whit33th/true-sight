import React from "react";

export default function StatsCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center rounded-sm bg-neutral-300/40 p-3 transition-all hover:bg-neutral-300/60">
      <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-sm bg-neutral-800/10 text-neutral-700">
        {icon}
      </div>
      <div>
        <p className="text-xs text-neutral-600">{title}</p>
        <p className="font-bold text-neutral-800">{value}</p>
      </div>
    </div>
  );
}
