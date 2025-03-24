import { queryKey } from "@/helpers/constants/types/queryKeys";
import { Platform } from "@/helpers/constants/types/riot";
import { accountService } from "@/helpers/services/account";
import { championMasteryService } from "@/helpers/services/champion-mastery-v4";
import { leagueService } from "@/helpers/services/league-v4";
import { matchService } from "@/helpers/services/match-v5";
import { riotConstService } from "@/helpers/services/RiotConst";
import { summonerService } from "@/helpers/services/summoner-v4";
import { currentUser } from "@clerk/nextjs/server";

import { QueryClient } from "@tanstack/react-query";

export async function fetchRiotAccountData() {
  const user = await currentUser();

  const name = user?.unsafeMetadata?.name as string;
  const tag = user?.unsafeMetadata?.tag as string;
  const platform = user?.unsafeMetadata?.platform as Platform;
  const queryClient = new QueryClient();

  try {
    const accountPromise =  queryClient.fetchQuery({
      queryKey: queryKey("getAccount", { name, tag }),
      queryFn: () => accountService.getAccountByTag({ name, tag }),
    });

    // Await the account data first since we need the puuid
    const accountData = await accountPromise;
    const puuid = accountData?.puuid;

    if (!puuid) {
      throw new Error("Failed to get puuid");
    }

    const [summonerPromise, leagueEntriesPromise, ] =
      await Promise.all([
        // Summoner data
        queryClient.fetchQuery({
          queryKey: queryKey("summoner", { encryptedPUUID: puuid, platform }),
          queryFn: () => summonerService.getSummoner(puuid, platform),
        }),

        // League entries
        queryClient.fetchQuery({
          queryKey: queryKey("leagueEntries", {
            encryptedPUUID: puuid,
            platform,
          }),
          queryFn: () =>
            leagueService.getEntries({ encryptedPUUID: puuid, platform }),
        }),

        // Champion IDs (for later use)
        queryClient.fetchQuery({
          queryKey: ["ChampionsName"],
          queryFn: () => riotConstService.getAllChampionIds(),
        }),
      ]);

    // Fetch champion masteries
    const masteryPromise = queryClient.fetchQuery({
      queryKey: queryKey("mastery", { encryptedPUUID: puuid, platform }),
      queryFn: () =>
        championMasteryService.getMastery({ encryptedPUUID: puuid, platform }),
    });

    // Wait for mastery data
    const mastery = await masteryPromise;

    // Get background champion BG
    let bgChampionName = "Jinx"; // Default 
    if (mastery && mastery[0]?.championId) {
      bgChampionName = await queryClient.fetchQuery({
        queryKey: ["bgChampionName"],
        queryFn: () => riotConstService.getChampionName(mastery[0].championId),
      });
    }

    // Fetch only first few matches for initial load (pagination can be used for more)
    const matchHistoryPromise = queryClient.prefetchQuery({
      queryKey: queryKey("matchHistory", { puuid }),
      queryFn: () => matchService.getMatchHistory({ puuid, count: 5 }), // Limit to 5 matches initially
    });

    const matchHistory = await matchHistoryPromise;

    
    // if (matchHistory && matchHistory.length > 0) {
    //   await Promise.all(
    //     matchHistory.slice(0, 5).map((matchId: string) =>
    //       queryClient.prefetchQuery({
    //         queryKey: queryKey("matchInfo", {
    //           matchId,
    //           region: "europe" as const,
    //         }),
    //         queryFn: () => matchService.getMatchInfo(matchId, "europe"),
    //       }),
    //     ),
    //   );
    // }

    return {
      queryClient,
      platform,
      bgChampionName,
      leagueEntries: await leagueEntriesPromise,
      summoner: await summonerPromise,
      mastery,
      accountData,
      matchHistory,
    };
  } catch (error) {
    console.error("Error fetching Riot account data:", error);
    throw error;
  }
}
