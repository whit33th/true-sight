import React from "react";
import BorderFigure from "@/components/UI/figures/border";
import ToggleSetting from "../components/ToggleSetting";

export default function SettingsTab() {
  return (
    <div className="p-6">
      <h2 className="mb-4 text-xl font-bold text-neutral-800">
        Profile Settings
      </h2>
      <div className="rounded-sm bg-neutral-100/50 p-4">
        <h3 className="mb-3 text-lg font-medium text-neutral-700">
          Display Settings
        </h3>
        <div className="space-y-4">
          <ToggleSetting
            label="Show match history publicly"
            initialValue={true}
          />
          <ToggleSetting label="Display rank on profile" initialValue={true} />
          <ToggleSetting label="Show champion mastery" initialValue={true} />
        </div>
        <div className="mt-4">
          <button className="relative flex items-center justify-center rounded-sm bg-neutral-800 px-4 py-2 text-sm font-medium text-neutral-100 transition-all hover:bg-neutral-700">
            <BorderFigure />
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
