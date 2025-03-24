import { queryKey } from "@/helpers/constants/types/queryKeys";
import { MatchDto } from "@/helpers/constants/types/match";
import { Region } from "@/helpers/constants/types/riot";
import { matchService } from "@/helpers/services/match-v5";
import {
  useQueries,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { useEffect } from "react";

interface UseMultipleMatchesParams {
  matchIds: string[];
  region?: Region;
  enabled?: boolean;
}

interface UseMultipleMatchesResult {
  matches: (MatchDto | undefined)[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  errors: (Error | null)[];
  refetch: () => Promise<void>;
  results: UseQueryResult<MatchDto, Error>[];
}

export default function useGetMultipleMatches({
  matchIds,
  region = "europe",
  enabled = true,
}: UseMultipleMatchesParams): UseMultipleMatchesResult {
  const queryClient = useQueryClient();

  // Force client-side fetching for all matches
  useEffect(() => {
    if (matchIds.length > 0 && enabled) {
      console.log("Ensuring all match data is fetched on client side");
      matchIds.forEach((matchId) => {
        const queryData = queryClient.getQueryData(
          queryKey("matchInfo", { matchId, region }),
        );

        if (!queryData) {
          console.log(`No cached data for match ${matchId}, forcing fetch`);
          queryClient.fetchQuery({
            queryKey: queryKey("matchInfo", { matchId, region }),
            queryFn: () => matchService.getMatchInfo(matchId, region),
          });
        }
      });
    }
  }, [matchIds.join(","), region, enabled]);

  // Use useQueries to fetch/access match data
  const results = useQueries({
    queries: matchIds.map((matchId) => ({
      queryKey: queryKey("matchInfo", { matchId, region }),
      queryFn: () => {
        console.log(`Fetching match data for: ${matchId}`);
        return matchService.getMatchInfo(matchId, region);
      },
      enabled: enabled && !!matchId,
      staleTime: 1000 * 60 * 60,
      
    })),
  });

  // Log results status for debugging
  useEffect(() => {
    if (matchIds.length > 0) {
      console.log(
        "Query statuses:",
        results.map((r) => r.status),
      );
      if (results.some((r) => r.isError)) {
        console.log(
          "Errors:",
          results.filter((r) => r.isError).map((r) => r.error),
        );
      }
    }
  }, [results.map((r) => r.status).join(",")]);

  const isLoading = results.some((result) => result.isLoading);
  const isError = results.some((result) => result.isError);
  const isSuccess = results.every((result) => result.isSuccess);

  // Extract just the data
  const matchesData = results.map(
    (result) => result.data as MatchDto | undefined,
  );

  // Extract errors for easier access
  const errors = results.map((result) => result.error);

  // Provide a way to refetch all queries
  const refetch = async () => {
    await Promise.all(results.map((result) => result.refetch()));
  };

  return {
    matches: matchesData,
    isLoading,
    isError,
    isSuccess,
    errors,
    refetch,
    results,
  };
}
