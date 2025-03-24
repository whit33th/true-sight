"use client";

import React, { useState } from "react";
import Image from "next/image";
import ProfileTabs, { ProfileTab } from "./components/ProfileTabs";
import OverviewTab from "./tabs/OverviewTab";
import StatsTab from "./tabs/StatsTab";
import ChampionsTab from "./tabs/ChampionsTab";
import HistoryTab from "./tabs/HistoryTab";
import SettingsTab from "./tabs/SettingsTab";
import { Platform } from "@/helpers/constants/types/riot";

export default function ProfileClientPage({
  platform,
  bgChampionName,
}: {
  platform: Platform;
  bgChampionName: string;
}) {
  const [activeTab, setActiveTab] = useState<ProfileTab>("overview");

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <div className="absolute inset-0 h-full w-full overflow-hidden">
        <Image
          src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${bgChampionName}_0.jpg`}
          alt="Profile Background"
          width={24}
          height={24}
          className="h-full w-full scale-125 object-cover object-top opacity-100 blur-[40px]"
        />

        <div className="absolute inset-0 bg-neutral-900/20"></div>
      </div>

      <div className="relative z-10 container mx-auto h-full max-w-6xl px-4 py-8">
        <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="overflow-hidden rounded-sm bg-neutral-50/70 shadow-xl backdrop-blur-sm">
          {/* Tab content */}
          {activeTab === "overview" && <OverviewTab platform={platform} />}

          {activeTab === "stats" && <StatsTab />}

          {activeTab === "champions" && <ChampionsTab platform={platform} />}

          {activeTab === "history" && <HistoryTab />}

          {activeTab === "settings" && <SettingsTab />}
        </div>
      </div>
    </div>
  );
}
