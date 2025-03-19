import { queryKey } from "@/helpers/constants/types/queryKeys";
import { MatchDto } from "@/helpers/constants/types/match";
import { Region } from "@/helpers/constants/types/riot";
import { matchService } from "@/helpers/services/match-v5";
import { useQuery } from "@tanstack/react-query";

interface MatchInfoParams {
  matchId: string;
  region?: Region;
  enabled?: boolean;
}

export default function useGetMatchInfo({
  matchId,
  region = "europe",
  enabled = true,
}: MatchInfoParams) {
  const { data, isLoading, error, isSuccess } = useQuery<MatchDto>({
    queryKey: queryKey("matchInfo", { matchId, region }),
    queryFn: () => matchService.getMatchInfo(matchId, region),
    enabled: !!matchId && enabled,
    staleTime: 1000 * 60 * 60, // 1 hour - match data doesn't change
  });

  return {
    data,
    isLoading,
    error,
    isSuccess,
  };
}
