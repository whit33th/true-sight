import { queryKey } from "@/helpers/constants/types/queryKeys";
import { MatchDto } from "@/helpers/constants/types/match";
import { Region } from "@/helpers/constants/types/riot";
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
    queryFn: () =>
      fetch(`/api/riot/matches?matchId=${matchId}&region=${region}`).then(
        (res) => res.json(),
      ),
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
