import { queryKey } from "@/helpers/constants/types/queryKeys";
import { MatchDto } from "@/helpers/constants/types/match";
import { Region } from "@/helpers/constants/types/riot";
import { matchService } from "@/helpers/services/match-v5";
import { useQueries, useQueryClient } from "@tanstack/react-query";

interface UseMultipleMatchesParams {
  matchIds: string[];
  region?: Region;
  enabled?: boolean;
}

export default function useGetMultipleMatches({
  matchIds,
  region = "europe",
  enabled = true,
}: UseMultipleMatchesParams) {
  const queryClient = useQueryClient();

  // Use useQueries to fetch multiple matches in parallel
  const results = useQueries({
    queries: matchIds.map((matchId) => ({
      queryKey: queryKey("matchInfo", { matchId, region }),
      queryFn: () => matchService.getMatchInfo(matchId, region),
      enabled: enabled && !!matchId,
      staleTime: 1000 * 60 * 60, // 1 hour
    })),
  });

  const isLoading = results.some((result) => result.isLoading);
  const isError = results.some((result) => result.isError);
  const isSuccess = results.every((result) => result.isSuccess);

  // Extract just the data
  const matchesData = results.map(
    (result) => result.data as MatchDto | undefined,
  );

  return {
    matches: matchesData,
    isLoading,
    isError,
    isSuccess,
    // Provide individual results for more granular access if needed
    results,
  };
}
