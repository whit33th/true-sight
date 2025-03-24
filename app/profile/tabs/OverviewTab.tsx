import React, { useMemo } from "react";
import Image from "next/image";
import { Trophy, Sword, Shield, Star } from "lucide-react";
import UpdateRiotIdForm from "@/components/containers/updateRiotIdForm";
import StatsCard from "../components/StatsCard";
import MasteryChampionCard from "../components/MasteryChampionCard";
import { Platform } from "@/helpers/constants/types/riot";
import useGetRiotUser from "@/hooks/useQueries/useGetRiotUser";
import useGetMastery from "@/hooks/useQueries/useGetMastery";
import useGetLeagueEntries from "@/hooks/useQueries/useGetLeagueEntries";
import useGetLatestVersion from "@/hooks/useQueries/useGetLatestVersion";
import useGetSummoner from "@/hooks/useQueries/useGetSummoner";

type OverviewTabProps = {
  platform: Platform;
};

export default function OverviewTab({ platform }: OverviewTabProps) {
  const { data: accountData } = useGetRiotUser();
  const { data: leagueEntries } = useGetLeagueEntries(
    accountData.puuid,
    platform,
  );
  const { data: mastery } = useGetMastery(accountData.puuid, platform);
  const { data: version } = useGetLatestVersion();
  const { data: summoner } = useGetSummoner(accountData.puuid, platform);

  const userRank = "II"; // Example value
  const totalGames = leagueEntries?.wins + leagueEntries?.losses;
  const winrateValue = (leagueEntries?.wins / totalGames) * 100;
  const winrate = winrateValue.toFixed(0);

  // Get top 3 champions by mastery points
  const topMasteryChampions = useMemo(() => {
    if (!mastery || mastery.length === 0) return [];

    return [...mastery]
      .sort((a, b) => b.championPoints - a.championPoints)
      .slice(0, 3);
  }, [mastery]);

  return (
    <div className="p-6">
      <div className="flex flex-wrap justify-center gap-8">
        {/* Left column - Profile card */}
        <div className="flex flex-shrink-0 flex-col">
          <div className="flex flex-col items-center">
            {/* Avatar with rank border */}
            <div className="group relative mb-4 h-64 w-64">
              {/* Banner background positioned to fill the container */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src={`/icons/ranks/banners/${leagueEntries.tier.toLowerCase()}.webp`}
                  alt={leagueEntries.tier.toLowerCase() + " Banner"}
                  width={128}
                  height={128}
                  className="h-full w-full object-contain drop-shadow-sm"
                  loading="eager"
                />
              </div>

              {/* Rank border positioned at the bottom */}
              <div className="absolute right-0 bottom-0 left-0 z-10 flex h-[331.5] w-[256px] justify-center">
                <Image
                  src={`/icons/ranks/borders/${leagueEntries.tier.toLowerCase()}.webp`}
                  alt={leagueEntries.tier.toLowerCase() + " Border"}
                  width={256}
                  height={256}
                  className="h-full w-full object-cover drop-shadow-sm"
                  loading="eager"
                />
              </div>

              {/* User avatar absolutely positioned 20px from bottom */}
              <div className="absolute bottom-[90px] left-1/2 h-[88px] w-[88px] -translate-x-1/2 overflow-hidden">
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${summoner.profileIconId}.png`}
                  alt="User Avatar"
                  width={64}
                  height={64}
                  loading="eager"
                  className="aspect-square h-full w-full rounded-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              <div className="absolute top-5 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-neutral-800/80 px-2 py-0.5 text-nowrap">
                <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                <span className="text-xs font-medium text-white">
                  {summoner.summonerLevel} lvl
                </span>
              </div>
            </div>

            {/* Username/ID */}
            <div className="mb-6 text-center">
              <h2 className="text-xl font-bold text-neutral-800">
                {accountData.gameName}#{accountData.tagLine}
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
                <span className="text-xs text-neutral-500">Solo/Duo</span>
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
                  <span className="text-sm font-medium">Platinum I</span>
                </div>
                <span className="text-xs text-neutral-500">Flex 5v5</span>
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
                {winrate}%
              </span>
            </div>
            <div className="relative h-4 w-full overflow-hidden rounded-sm bg-neutral-800/10">
              <div
                className="absolute top-0 left-0 h-full bg-emerald-500/70"
                style={{ width: `${winrateValue}%` }}
              ></div>
              {/* Loss percentage (red) */}
              <div
                className="absolute top-0 right-0 h-full bg-rose-500/70"
                style={{ width: `${100 - winrateValue}%` }}
              ></div>

              {/* Center line */}
              <div className="absolute top-0 left-1/2 h-full w-[2px] -translate-x-1/2 bg-neutral-800/60"></div>
            </div>
            <div className="mt-1 flex justify-between text-xs">
              <div className="flex items-center gap-1">
                <figure className="h-2 w-2 rounded-full bg-emerald-500"></figure>
                <span>Wins ({leagueEntries.wins})</span>
              </div>
              <div className="flex items-center gap-1">
                <figure className="h-2 w-2 rounded-full bg-rose-500"></figure>
                <span>Losses ({leagueEntries.losses})</span>
              </div>
            </div>
          </div>

          {/* Additional stats */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <StatsCard
              icon={<Trophy size={20} />}
              title="Ranked Games"
              value={totalGames}
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

        {/* Right column - Top Mastery Champions and Recent activity */}
        <div className="w-64 flex-shrink-0">
          {/* Top Mastery Champions */}
          <div className="mb-6">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-medium text-neutral-800">Top Champions</h3>
              <span className="text-xs text-neutral-500">By Mastery</span>
            </div>

            <div className="space-y-3">
              {topMasteryChampions.map((champion, index) => (
                <MasteryChampionCard
                  key={champion.championId}
                  champion={champion}
                  rank={index + 1}
                />
              ))}
            </div>
          </div>

          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-medium text-neutral-800">Recent Activity</h3>
            <span className="text-xs text-neutral-500">Last 7 days</span>
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
                <p className="text-xs font-medium text-emerald-800">Rank Up</p>
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
  );
}
