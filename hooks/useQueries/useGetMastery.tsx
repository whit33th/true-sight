import { queryKey } from "@/helpers/constants/types/queryKeys";
import { Platform } from "@/helpers/constants/types/riot";

import { championMasteryService } from "@/helpers/services/champion-mastery-v4";

import { useQuery } from "@tanstack/react-query";

interface MasteryData {
  puuid: string;
  championId: number;
  championLevel: number;
  championPoints: number;
  lastPlayTime: number;
  championPointsSinceLastLevel: number;
  championPointsUntilNextLevel: number;
  markRequiredForNextLevel: number;
  tokensEarned: number;
  championSeasonMilestone: number;
  milestoneGrades: string[];
  nextSeasonMilestone: unknown[];
  requireGradeCounts: unknown[];
  rewardMarks: number;
  bonus: boolean;
  totalGamesRequires?: number; // Optional as it appears to be undefined
}

interface Results {
  data: MasteryData[];
  isLoading: boolean;
  error: unknown;
}

export default function useGetMastery(
  puuid: string,
  platform: Platform,
): Results {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKey("mastery", {
      encryptedPUUID: puuid,
      platform,
    }),
    queryFn: () =>
      championMasteryService.getMastery({ encryptedPUUID: puuid, platform }),

    enabled: !!puuid && !!platform,
  });

  return {
    data: data || [],
    isLoading,
    error,
  };
}
