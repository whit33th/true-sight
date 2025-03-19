import { queryKey } from "@/helpers/constants/types/queryKeys";
import { Platform } from "@/helpers/constants/types/riot";

import { leagueService } from "@/helpers/services/league-v4";

import { useQuery } from "@tanstack/react-query";

interface LeagueEntry {
  leagueId: string;
  queueType: string;
  tier: string;
  rank: string;
  summonerId: string;
  puuid: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  veteran: boolean;
  inactive: boolean;
  freshBlood: boolean;
  hotStreak: boolean;
}

interface Results {
  data: LeagueEntry;
  isLoading: boolean;
}

export default function useGetLeagueEntries(
  puuid: string,
  platform: Platform,
): Results {
  const { data, isLoading } = useQuery({
    queryKey: queryKey("leagueEntries", { encryptedPUUID: puuid, platform }),
    queryFn: () =>
      leagueService.getEntries({
        encryptedPUUID: puuid,
        platform,
      }),
    select: (data) => data[0] || [],

    enabled: !!puuid && !!platform,
  });

  return {
    data,
    isLoading,
  };
}
