"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  UserRound,
  Trophy,
  Shield,
  Sword,
  History,
  ChartArea,
  Settings,
  Star,
} from "lucide-react";
import { motion } from "motion/react";
import BorderFigure from "@/components/UI/figures/border";
import UpdateRiotIdForm from "@/components/containers/updateRiotIdForm";
import useGetRiotUser from "@/hooks/useQueries/useGetRiotUser";
import { Platform } from "@/helpers/constants/types/riot";

type ProfileTab = "overview" | "stats" | "champions" | "history" | "settings";

export default function ProfileClientPage({
  platform,
}: {
  platform: Platform;
}) {
  const { data } = useGetRiotUser();

  const userInfo = {
    name: data.gameName,
    tag: data.tagLine,
    uuid: data.puuid,
    platform: platform,
    winRate: 65,
    userLevel: 168,
    userRank: "II",
  };

  const [winRate] = useState(65); // Example value - would come from API
  const [userLevel] = useState(168); // Example value
  const [userRank] = useState("II"); // Example value
  const [activeTab, setActiveTab] = useState<ProfileTab>("overview");

  // Tab configuration
  const tabs = [
    { id: "overview", label: "Overview", icon: <UserRound size={18} /> },
    { id: "stats", label: "Statistics", icon: <ChartArea size={18} /> },
    { id: "champions", label: "Champions", icon: <Star size={18} /> },
    { id: "history", label: "Match History", icon: <History size={18} /> },
    { id: "settings", label: "Settings", icon: <Settings size={18} /> },
  ];

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-neutral-900">
      {/* Background container with proper overflow handling */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/img/champion/Aatrox_0.jpg" // Placeholder - would be dynamic
          alt="Profile Background"
          fill
          className="scale-125 object-cover object-center opacity-30 blur-[20px]"
          priority
        />
        {/* Add a subtle overlay to help blend any artifacts */}
        <div className="absolute inset-0 bg-neutral-900/20"></div>
      </div>

      <div className="relative z-10 container mx-auto h-full max-w-6xl px-4 py-8">
        <div className="mb-6 flex items-center justify-center">
          {/* Tab navigation - Adding overflow-hidden to prevent white edges */}
          <div className="overflow-hidden rounded-sm bg-neutral-50/70 p-1 backdrop-blur-sm">
            <div className="flex gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as ProfileTab)}
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

        {/* Main content area - Adding overflow-hidden to prevent white edges */}
        <div className="overflow-hidden rounded-sm bg-neutral-50/70 shadow-xl backdrop-blur-sm">
          {/* Tab content */}
          {activeTab === "overview" && (
            <div className="p-6">
              <div className="flex flex-wrap justify-center gap-8">
                {/* Left column - Profile card */}
                <div className="flex flex-shrink-0 flex-col">
                  <div className="flex flex-col items-center">
                    {/* Avatar with rank border */}
                    <div className="group relative mb-4 h-64">
                      <div className="flex h-full w-full items-center justify-center overflow-hidden">
                        <Image
                          src="/img/champion/Annie_5.jpg" // Placeholder
                          alt="User Avatar"
                          width={96}
                          height={96}
                          className="relative aspect-square rounded-full object-cover object-center transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                      <div className="absolute right-1/2 bottom-17.5 h-64 w-64 translate-x-1/2 object-center">
                        <Image
                          src="/icons/ranks/borders/challenger.webp" // Placeholder
                          alt="User Avatar"
                          width={256}
                          height={256}
                          className="drop-shadow-sm"
                        />
                      </div>
                      <div className="absolute top-1/2 left-1/2 z-[-2] h-64 w-64 -translate-x-1/2 -translate-y-1/2 object-center">
                        <Image
                          src="/icons/ranks/banners/grandmaster.png" // Placeholder
                          alt="User Avatar"
                          width={256}
                          height={256}
                          className="drop-shadow-sm"
                        />
                      </div>
                      <div className="absolute top-5 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-neutral-800/80 px-2 py-0.5 text-nowrap">
                        <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                        <span className="text-xs font-medium text-white">
                          Level {userLevel}
                        </span>
                      </div>
                    </div>

                    {/* Username/ID */}
                    <div className="mb-6 text-center">
                      <h2 className="text-xl font-bold text-neutral-800">
                        {userInfo.name}#{userInfo.tag}
                      </h2>
                    </div>

                    <UpdateRiotIdForm platform={platform} />

                    {/* Rank badges */}
                    <div className="flex w-full flex-col gap-2">
                      <div className="flex items-center justify-between rounded-sm bg-neutral-300/40 p-2">
                        <div className="flex items-center gap-2">
                          <Image
                            src="/icons/ranks/diamond.webp"
                            alt="Diamond Rank"
                            width={24}
                            height={24}
                            className="aspect-square object-contain"
                          />
                          <span className="text-sm font-medium">
                            Diamond {userRank}
                          </span>
                        </div>
                        <span className="text-xs text-neutral-500">
                          Solo/Duo
                        </span>
                      </div>
                      <div className="flex items-center justify-between rounded-sm bg-neutral-300/40 p-2">
                        <div className="flex items-center gap-2">
                          <Image
                            src="/icons/ranks/platinum.webp"
                            alt="Platinum Rank"
                            width={24}
                            height={24}
                            className="aspect-square object-contain"
                          />
                          <span className="text-sm font-medium">
                            Platinum I
                          </span>
                        </div>
                        <span className="text-xs text-neutral-500">
                          Flex 5v5
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Middle column - Stats and form */}
                <div className="min-w-[300px] flex-1">
                  {/* Win/Loss graph */}
                  <div className="mb-6">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium text-neutral-600">
                        Win Rate
                      </span>
                      <span className="text-lg font-bold text-neutral-800">
                        {winRate}%
                      </span>
                    </div>
                    <div className="relative h-4 w-full overflow-hidden rounded-sm bg-neutral-800/10">
                      {/* Win percentage (green) */}
                      <div
                        className="absolute top-0 left-0 h-full bg-emerald-500/70"
                        style={{ width: `${winRate}%` }}
                      ></div>
                      {/* Loss percentage (red) */}
                      <div
                        className="absolute top-0 right-0 h-full bg-rose-500/70"
                        style={{ width: `${100 - winRate}%` }}
                      ></div>
                      {/* Center line */}
                      <div className="absolute top-0 left-1/2 h-full w-[2px] -translate-x-1/2 bg-neutral-800/60"></div>
                    </div>
                    <div className="mt-1 flex justify-between text-xs">
                      <div className="flex items-center gap-1">
                        <figure className="h-2 w-2 rounded-full bg-emerald-500"></figure>
                        <span>Wins ({winRate}%)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <figure className="h-2 w-2 rounded-full bg-rose-500"></figure>
                        <span>Losses ({100 - winRate}%)</span>
                      </div>
                    </div>
                  </div>

                  {/* Additional stats */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <StatsCard
                      icon={<Trophy size={20} />}
                      title="Ranked Games"
                      value="286"
                    />
                    <StatsCard
                      icon={<Sword size={20} />}
                      title="Highest KDA"
                      value="12.3"
                    />
                    <StatsCard
                      icon={<Shield size={20} />}
                      title="Favorite Role"
                      value="Jungle"
                    />
                    <StatsCard
                      icon={<Star size={20} />}
                      title="Top Champion"
                      value="Veigar"
                    />
                  </div>
                </div>

                {/* New right column - Recent activity */}
                <div className="w-64 flex-shrink-0">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-medium text-neutral-800">
                      Recent Activity
                    </h3>
                    <span className="text-xs text-neutral-500">
                      Last 7 days
                    </span>
                  </div>

                  <div className="space-y-3">
                    {/* Activity items */}
                    <div className="flex gap-2 rounded-sm bg-neutral-300/40 p-2">
                      <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-sm">
                        <Image
                          src="/img/champion/Annie_5.jpg"
                          alt="Champion"
                          width={40}
                          height={40}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-neutral-800">
                          Mastery Level 6
                        </p>
                        <p className="text-xs text-neutral-600">Annie</p>
                        <p className="text-xs text-neutral-500">2 days ago</p>
                      </div>
                    </div>

                    <div className="flex gap-2 rounded-sm bg-neutral-300/40 p-2">
                      <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-sm">
                        <Image
                          src="/img/champion/Aatrox_0.jpg"
                          alt="Champion"
                          width={40}
                          height={40}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-neutral-800">
                          Pentakill
                        </p>
                        <p className="text-xs text-neutral-600">Aatrox</p>
                        <p className="text-xs text-neutral-500">4 days ago</p>
                      </div>
                    </div>

                    <div className="flex gap-2 rounded-sm bg-emerald-100/50 p-2">
                      <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-sm">
                        <div className="flex h-full w-full items-center justify-center bg-emerald-500/20">
                          <Trophy size={18} className="text-emerald-700" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-emerald-800">
                          Rank Up
                        </p>
                        <p className="text-xs text-emerald-700">
                          Diamond II → Diamond I
                        </p>
                        <p className="text-xs text-neutral-500">5 days ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "stats" && (
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
                    <StatBar
                      label="CS per Min"
                      value={7.8}
                      max={10}
                      suffix=""
                    />
                    <StatBar
                      label="Vision Score"
                      value={42}
                      max={100}
                      suffix=""
                    />
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
                          <div className="text-3xl font-bold text-neutral-800">
                            65%
                          </div>
                          <div className="text-xs text-neutral-600">
                            to next rank
                          </div>
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
                      <div className="text-sm text-neutral-600">
                        Current Rank
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "champions" && (
            <div className="p-6">
              <h2 className="mb-4 text-xl font-bold text-neutral-800">
                Champion Mastery
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <ChampionCard key={i} index={i} />
                ))}
              </div>
            </div>
          )}

          {activeTab === "history" && (
            <div className="p-6">
              <h2 className="mb-4 text-xl font-bold text-neutral-800">
                Match History
              </h2>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <MatchHistoryItem key={i} win={i % 2 === 0} />
                ))}
              </div>
            </div>
          )}

          {activeTab === "settings" && (
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
                  <ToggleSetting
                    label="Display rank on profile"
                    initialValue={true}
                  />
                  <ToggleSetting
                    label="Show champion mastery"
                    initialValue={true}
                  />
                </div>
                <div className="mt-4">
                  <button className="relative flex items-center justify-center rounded-sm bg-neutral-800 px-4 py-2 text-sm font-medium text-neutral-100 transition-all hover:bg-neutral-700">
                    <BorderFigure />
                    Save Settings
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Stats Card Component
function StatsCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
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

// Stat Bar Component for detailed statistics
function StatBar({
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

// Champion Card Component
function ChampionCard({ index }: { index: number }) {
  return (
    <div className="group overflow-hidden rounded-sm bg-neutral-300/40 transition-all hover:bg-neutral-300/60">
      <div className="relative aspect-square w-full">
        <Image
          src={`/img/champions/champion${index}.webp`}
          alt={`Champion ${index}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/70 to-transparent"></div>
        <div className="absolute bottom-2 left-2">
          <div className="text-sm font-bold text-neutral-100">
            Champion {index}
          </div>
          <div className="flex items-center text-xs text-neutral-200">
            <Star size={12} className="mr-1 fill-yellow-400 text-yellow-400" />
            Mastery 7
          </div>
        </div>
        <div className="absolute top-2 right-2 rounded-sm bg-neutral-800/80 px-1.5 py-0.5 text-xs font-bold text-neutral-100">
          65% WR
        </div>
      </div>
      <div className="p-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-neutral-600">KDA</span>
          <span className="text-xs font-medium text-neutral-800">
            3.8 / 2.1 / 6.4
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-neutral-600">Games</span>
          <span className="text-xs font-medium text-neutral-800">46</span>
        </div>
      </div>
    </div>
  );
}

// Match History Item Component
function MatchHistoryItem({ win }: { win: boolean }) {
  return (
    <div
      className={`flex items-center rounded-sm p-3 ${win ? "bg-emerald-100/30" : "bg-rose-100/30"}`}
    >
      <div className="mr-3 flex-shrink-0">
        <div className="relative h-12 w-12 overflow-hidden rounded-sm">
          <Image
            src={`/img/champions/champion${win ? 1 : 2}.webp`}
            alt="Champion"
            fill
            className="object-cover"
          />
        </div>
      </div>
      <div className="flex-grow">
        <div className="flex items-center justify-between">
          <div>
            <div
              className={`text-sm font-bold ${win ? "text-emerald-700" : "text-rose-700"}`}
            >
              {win ? "Victory" : "Defeat"}
            </div>
            <div className="text-xs text-neutral-600">Ranked Solo/Duo</div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-neutral-800">12/4/9</div>
            <div className="text-xs text-neutral-600">5.25 KDA</div>
          </div>
        </div>
        <div className="mt-1 flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-4 w-4 rounded-sm bg-neutral-300"></div>
            ))}
          </div>
          <div className="text-xs text-neutral-600">24 min ago</div>
        </div>
      </div>
    </div>
  );
}

// Toggle Setting Component
function ToggleSetting({
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
