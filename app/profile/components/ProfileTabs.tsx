"use client";
import React, { useCallback, useEffect, useMemo } from "react";
import { motion } from "motion/react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

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

  // Update activeTab from URL on initial load
  useEffect(() => {
    const tabParam = searchParams?.get("tab") as ProfileTab;
    if (tabParam && tabs.some((tab) => tab.id === tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams, setActiveTab, tabs]);

  // Tab configuration

  // Create query string utility function
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams?.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  // Handle tab click - update URL and state
  const handleTabClick = (tabId: ProfileTab) => {
    // Update URL without refreshing page
    router.push(`${pathname}?${createQueryString("tab", tabId)}`, {
      scroll: false,
    });

    // Update state
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
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 rounded-sm bg-neutral-800"
                  transition={{ duration: 0.2 }}
                />
              )}
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
