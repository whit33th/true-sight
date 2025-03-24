"use client";
import React, { useMemo } from "react";
import { UserRound, History, ChartArea, Settings, Star } from "lucide-react";

export type ProfileTab =
  | "overview"
  | "stats"
  | "champions"
  | "history"
  | "settings";

type TabItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

export default function ProfileTabs({
  activeTab,
  setActiveTab,
}: {
  activeTab: ProfileTab;
  setActiveTab: (tab: ProfileTab) => void;
}) {
  const tabs = useMemo<TabItem[]>(
    () => [
      { id: "overview", label: "Overview", icon: <UserRound size={18} /> },
      { id: "stats", label: "Statistics", icon: <ChartArea size={18} /> },
      { id: "champions", label: "Champions", icon: <Star size={18} /> },
      { id: "history", label: "Match History", icon: <History size={18} /> },
      { id: "settings", label: "Settings", icon: <Settings size={18} /> },
    ],
    [],
  );

  // Handle tab click - update state only
  const handleTabClick = (tabId: ProfileTab) => {
    setActiveTab(tabId);
  };

  return (
    <div className="mb-6 flex items-center justify-center">
      <div className="overflow-hidden rounded-sm bg-neutral-50/70 p-1 backdrop-blur-sm">
        <div className="flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id as ProfileTab)}
              className={`relative flex items-center rounded-sm px-3 py-2 text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-neutral-800 text-neutral-100"
                  : "bg-transparent text-neutral-600 hover:bg-neutral-300/50"
              }`}
            >
              <span className="relative z-10 flex items-center gap-1.5">
                {tab.icon}
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
