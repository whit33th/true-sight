import { queryKey } from "@/helpers/constants/types/queryKeys";
import { Platform } from "@/helpers/constants/types/riot";
import { summonerService } from "@/helpers/services/summoner-v4";
import { useQuery } from "@tanstack/react-query";

interface Summoner {
  id: string;
  accountId: string;
  puuid: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
}

interface Results {
  data: Summoner;
  isLoading: boolean;
  isSuccess: boolean;
}

export default function useGetSummoner(
  puuid: string,
  platform: Platform,
): Results {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: queryKey("summoner", { encryptedPUUID: puuid, platform }),
    queryFn: () => summonerService.getSummoner(puuid, platform),

    enabled: !!puuid && !!platform,
  });

  return {
    data,
    isLoading,
    isSuccess,
  };
}
