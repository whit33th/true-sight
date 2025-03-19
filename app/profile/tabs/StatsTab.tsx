import React from "react";
import StatBar from "../components/StatBar";

export default function StatsTab() {
  return (
    <div className="p-6">
      <h2 className="mb-4 text-xl font-bold text-neutral-800">
        Detailed Statistics
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-sm bg-neutral-100/50 p-4">
          <h3 className="mb-3 text-lg font-medium text-neutral-700">
            Performance Metrics
          </h3>
          <div className="space-y-3">
            <StatBar label="Win Rate" value={65} suffix="%" />
            <StatBar label="KDA Ratio" value={3.2} max={5} suffix="" />
            <StatBar label="CS per Min" value={7.8} max={10} suffix="" />
            <StatBar label="Vision Score" value={42} max={100} suffix="" />
          </div>
        </div>
        <div className="rounded-sm bg-neutral-100/50 p-4">
          <h3 className="mb-3 text-lg font-medium text-neutral-700">
            Seasonal Progress
          </h3>
          <div className="flex flex-col items-center">
            <div className="relative h-40 w-40 rounded-full border-8 border-neutral-200 bg-neutral-100">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-neutral-800">65%</div>
                  <div className="text-xs text-neutral-600">to next rank</div>
                </div>
              </div>
              {/* This would be a circular progress indicator */}
              <svg className="absolute inset-0 h-full w-full -rotate-90">
                <circle
                  className="stroke-emerald-500/70"
                  cx="50%"
                  cy="50%"
                  r="46%"
                  fill="transparent"
                  strokeWidth="8%"
                  strokeDasharray="290%"
                  strokeDashoffset="101.5%"
                />
              </svg>
            </div>
            <div className="mt-4 text-center">
              <div className="text-lg font-bold text-neutral-800">
                Diamond II
              </div>
              <div className="text-sm text-neutral-600">Current Rank</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
