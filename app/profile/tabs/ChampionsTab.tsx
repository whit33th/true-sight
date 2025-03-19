import React from "react";
import ChampionCard from "../components/ChampionCard";
import useGetRiotUser from "@/hooks/useQueries/useGetRiotUser";
import useGetMastery from "@/hooks/useQueries/useGetMastery";
import { Platform } from "@/helpers/constants/types/riot";

type ChampionsTabProps = {
  platform: Platform;
};

export default function ChampionsTab({ platform }: ChampionsTabProps) {
  const { data: accountData } = useGetRiotUser();
  const { data: mastery } = useGetMastery(accountData.puuid, platform);

  return (
    <div className="p-6">
      <h2 className="mb-4 text-xl font-bold text-neutral-800">
        Champion Mastery
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {mastery && mastery.length > 0 ? (
          mastery
            .sort((a, b) => b.championPoints - a.championPoints)
            // .slice(0, 8)
            .map((championData, index) => (
              <ChampionCard
                key={championData.championId}
                championData={championData}
                index={index}
              />
            ))
        ) : (
          <div className="col-span-4 py-8 text-center text-neutral-600">
            No champion mastery data available
          </div>
        )}
      </div>
    </div>
  );
}
