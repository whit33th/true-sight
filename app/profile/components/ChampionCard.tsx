import React from "react";
import Image from "next/image";
import useGetChampionsName from "@/hooks/useQueries/useGetChampionsName";

export default function ChampionCard({
  championData,
  index,
}: {
  championData: {
    championId: number;
    championLevel: number;
    championPoints: number;
    tokensEarned: number;
    lastPlayTime: number;
  };
  index: number;
}) {
  const { data: championsNames } = useGetChampionsName();
  const championName =
    championsNames[championData.championId] || `Champion ${index}`;
  const formattedChampionName = championName.replace(/\s+/g, "");

  // Format champion name for URLs by replacing spaces with hyphens

  // Format champion points with commas
  const formattedPoints = championData.championPoints.toLocaleString();

  // Calculate time since last played
  const lastPlayed = championData.lastPlayTime
    ? new Date(championData.lastPlayTime).toLocaleDateString()
    : "Unknown";

  // Calculate KDA (This would typically come from match data, not mastery)
  // For now using placeholder values
  // const kda = (3 + (index % 2)).toFixed(1);

  // Win rate (placeholder, would come from match stats)
  const winRate = 45 + index * 5;

  return (
    <div className="group overflow-hidden rounded-sm bg-neutral-300/40 transition-all hover:bg-neutral-300/60">
      <div className="relative w-full overflow-hidden">
        {championsNames[championData.championId] && (
          <Image
            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${formattedChampionName}_0.jpg`}
            alt={championName}
            width={300}
            height={300}
            className="h-full w-full scale-105 object-cover object-center transition-transform duration-500 group-hover:scale-110"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/70 to-transparent"></div>

        <div className="absolute top-2 right-2 rounded-sm bg-neutral-800/80 px-1.5 py-0.5 text-xs font-bold text-neutral-100">
          {winRate}% WR
        </div>
        {/* Mastery icon */}
        <div className="absolute top-2 left-2 h-12 w-12">
          <Image
            src={`/icons/ranks/mastery/${championData.championLevel}.webp`}
            alt={`Mastery ${championData.championLevel}`}
            width={48}
            height={48}
            className="drop-shadow-sm"
          />
        </div>
        <div className="absolute right-0 bottom-0 left-0 bg-neutral-50/70 p-2">
          <div className="">
            <div className="text-sm font-bold">{championName}</div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-neutral-600">Points</span>
            <span className="text-xs font-medium text-neutral-800">
              {formattedPoints}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-neutral-600">Last Played</span>
            <span className="text-xs font-medium text-neutral-800">
              {lastPlayed}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
