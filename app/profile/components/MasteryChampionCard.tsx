import React from "react";
import Image from "next/image";
import useGetChampionsName from "@/hooks/useQueries/useGetChampionsName";

export default function MasteryChampionCard({
  champion,
  // rank,
}: {
  champion: {
    championId: number;
    championLevel: number;
    championPoints: number;
    tokensEarned: number;
  };
  rank: number;
}) {
  // Format champion points with commas
  const formattedPoints = champion.championPoints.toLocaleString();
  const { data: championsNames } = useGetChampionsName();

  // Determine background color based on rank position (gold, silver, bronze)
  const getRankColor = (position: number) => {
    switch (position) {
      case 1:
        return "bg-gradient-to-r from-yellow-950 to-yellow-900"; // Iron
      case 2:
        return "bg-gradient-to-r from-yellow-800 to-yellow-700";
      case 3:
        return "bg-gradient-to-r from-yellow-700 to-yellow-600";
      case 4:
        return "bg-gradient-to-r from-yellow-600 to-yellow-500"; // Bronze
      case 5:
        return "bg-gradient-to-r from-cyan-800 to-cyan-600"; // Emerald
      case 6:
        return "bg-gradient-to-r from-emerald-800 to-emerald-600"; // Platinum
      case 7:
        return "bg-gradient-to-r from-blue-900 to-blue-500"; // Diamond
      case 8:
        return "bg-gradient-to-r from-purple-800 to-purple-400"; // Master
      case 9:
        return "bg-gradient-to-r from-orange-800 to-orange-500"; // Grandmaster
      case 10:
        return "bg-gradient-to-r from-red-800 to-red-500"; // Challenger
      default:
        return "bg-gradient-to-r from-gray-700 to-gray-600 "; // Unranked/default
    }
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-sm ${getRankColor(champion.championLevel)}`}
    >
      <div className="relative z-[1] flex items-center gap-3 p-2">
        {/* Champion image */}
        <div className="relative overflow-hidden rounded-sm border-2 border-white/20">
          <Image
            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championsNames[champion.championId]}_0.jpg`}
            alt={`Champion ${champion.championId}`}
            width={100}
            height={100}
            className="h-12 w-12 object-cover"
          />
        </div>

        {/* Champion info */}
        <div className="flex flex-1">
          <div className="flex flex-col justify-between gap-1">
            <p className="text-sm font-bold text-white">
              {championsNames[champion.championId]}
            </p>
            <div className="flex items-center">
              <p className="text-xs text-white/90">{formattedPoints} pts</p>
            </div>
          </div>
        </div>

        <div className="">
          <Image
            className="drop-shadow-2xl"
            alt="masteryIcon"
            width={52}
            height={52}
            src={`/icons/ranks/mastery/${champion.championLevel}.webp`}
          />
        </div>
      </div>
    </div>
  );
}
