import React from "react";

import useGetMatchHistory from "@/hooks/useQueries/useGetMatchHistory";
import useGetMultipleMatches from "@/hooks/useQueries/useGetMultipleMatches";
import useGetRiotUser from "@/hooks/useQueries/useGetRiotUser";
import MatchHistoryItem from "@/app/profile/components/MatchHistoryItem";

export default function HistoryTab() {
  const { data: accountData } = useGetRiotUser();
  const { data: matchHistory } = useGetMatchHistory({
    puuid: accountData.puuid,
  });

  const { matches: matchesData, isLoading: matchesLoading } =
    useGetMultipleMatches({
      matchIds: matchHistory?.slice(0, 5) || [],
      enabled: !!matchHistory && matchHistory.length > 0,
    });
  return (
    <div className="p-6">
      <h2 className="mb-4 text-xl font-bold text-neutral-800">Match History</h2>
      <div className="flex flex-col gap-2.5">
        {matchesLoading ? (
          <div>Loading match data...</div>
        ) : matchesData && matchesData.length > 0 ? (
          matchesData.map(
            (match) =>
              match && (
                <MatchHistoryItem
                  key={match.metadata.matchId}
                  matchData={match}
                  userPuuid={accountData.puuid}
                />
              ),
          )
        ) : (
          <div>No match history available</div>
        )}
      </div>
    </div>
  );
}
