import { fetchRiotAccountData } from "@/app/api/riot/data";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export default async function MatchDetailsPage({
  // params,
}: {
  params: { matchId: string };
}) {
  const { queryClient } = await fetchRiotAccountData();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/* <MatchDetailsClient
        bgChampionName={bgChampionName}
        matchId={params.matchId}
        userPuuid={puuid}
        platform={platform}
      /> */}
    </HydrationBoundary>
  );
}
