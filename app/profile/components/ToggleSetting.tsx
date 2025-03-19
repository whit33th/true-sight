import React, { useState } from "react";

export default function ToggleSetting({
  label,
  initialValue,
}: {
  label: string;
  initialValue: boolean;
}) {
  const [enabled, setEnabled] = useState(initialValue);

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-neutral-700">{label}</span>
      <button
        onClick={() => setEnabled(!enabled)}
        className={`relative h-6 w-11 rounded-full transition-colors ${enabled ? "bg-emerald-500" : "bg-neutral-300"}`}
      >
        <span
          className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform ${enabled ? "translate-x-5" : ""}`}
        />
      </button>
    </div>
  );
}
