import { queryKey } from "@/helpers/constants/types/queryKeys";
import { matchType, Region } from "@/helpers/constants/types/riot";
import { accountService } from "@/helpers/services/account";
import { matchService } from "@/helpers/services/match-v5";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";

interface Result {
  data: string[];
  isLoading: boolean;
  isSuccess: boolean;
  error: unknown;
}

export interface IMatchHistoryParams {
  puuid: string;
  region?: Region;
  startTime?: number; // Epoch timestamp in seconds. Optional.
  endTime?: number; // Epoch timestamp in seconds. Optional.
  queue?: number; // Filter matches by queue id. Optional.
  type?: matchType; // Filter matches by type. Optional.
  start?: number; // Start index. Defaults to 0. Optional.
  count?: number; // Number of matches to return. Defaults to 20. Range: 0-100. Optional.
}

export default function useGetMatchHistory({
  puuid,
  region = "europe",
  startTime,
  endTime,
  queue,
  type,
  start = 0,
  count = 5,
}: IMatchHistoryParams): Result {
  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: queryKey("matchHistory", {
      puuid,
    }),
    queryFn: () =>
      matchService.getMatchHistory({
        puuid,
        region,
        startTime,
        endTime,
        queue,
        type,
        start,
        count,
      }),
    enabled: !!puuid && !!region,
  });

  return {
    data,
    isLoading,
    error,
    isSuccess,
  };
}
