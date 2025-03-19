import { queryKey } from "@/helpers/constants/types/queryKeys";
import { Platform } from "@/helpers/constants/types/riot";
import { accountService } from "@/helpers/services/account";
import { championMasteryService } from "@/helpers/services/champion-mastery-v4";
import { leagueService } from "@/helpers/services/league-v4";
import { matchService } from "@/helpers/services/match-v5";
import { riotConstService } from "@/helpers/services/RiotConst";
import { summonerService } from "@/helpers/services/Summoner-v4";
import { currentUser } from "@clerk/nextjs/server";

import { QueryClient } from "@tanstack/react-query";

export async function fetchRiotAccountData() {
  const user = await currentUser();

  const name = user?.unsafeMetadata?.name as string;
  const tag = user?.unsafeMetadata?.tag as string;
  const platform = user?.unsafeMetadata?.platform as Platform;
  const queryClient = new QueryClient();

  // Fetch account data
  await queryClient.prefetchQuery({
    queryKey: queryKey("getAccount", { name, tag }),
    queryFn: () => accountService.test({ name, tag }),
  });

  const accountData = (await queryClient.getQueryData(
    queryKey("getAccount", { name, tag }),
  )) as { puuid: string };
  const puuid = accountData?.puuid;

  // Fetch league entries
  await queryClient.prefetchQuery({
    queryKey: queryKey("leagueEntries", {
      encryptedPUUID: puuid,
      platform,
    }),
    queryFn: () =>
      leagueService.getEntries({
        encryptedPUUID: puuid,
        platform,
      }),
  });

  // Get the league entries data
  const leagueEntries = await queryClient.getQueryData(
    queryKey("leagueEntries", { encryptedPUUID: puuid, platform }),
  );

  await queryClient.prefetchQuery({
    queryKey: queryKey("summoner", {
      encryptedPUUID: puuid,
      platform,
    }),
    queryFn: () => summonerService.getSummoner(puuid, platform),
  });

  const summoner = await queryClient.getQueryData(
    queryKey("summoner", { encryptedPUUID: puuid, platform }),
  );

  // Fetch champion masteries
  await queryClient.prefetchQuery({
    queryKey: queryKey("mastery", {
      encryptedPUUID: puuid,
      platform,
    }),
    queryFn: () =>
      championMasteryService.getMastery({
        encryptedPUUID: puuid,
        platform,
      }),
  });
  const mastery = (await queryClient.getQueryData(
    queryKey("mastery", { encryptedPUUID: puuid, platform }),
  )) as Array<{ championId: number }>;

  await queryClient.prefetchQuery({
    queryKey: ["ChampionsName"],
    queryFn: () => riotConstService.getAllChampionIds(),
  });

  await queryClient.prefetchQuery({
    queryKey: ["bgChampionName"],
    queryFn: () => riotConstService.getChampionName(mastery[0]?.championId),
  });

  // Fetch match history
  await queryClient.prefetchQuery({
    queryKey: queryKey("matchHistory", {
      puuid,
    }),
    queryFn: () =>
      matchService.getMatchHistory({
        puuid,
      }),
  });
  const matchHistory = (await queryClient.getQueryData(
    queryKey("matchHistory", { puuid }),
  )) as string[];

  if (matchHistory && matchHistory.length > 0) {
    for (const matchId of matchHistory) {
      await queryClient.prefetchQuery({
        queryKey: queryKey("matchInfo", { matchId, region: "europe" }),
        queryFn: () => matchService.getMatchInfo(matchId, "europe"),
      });
    }
  }
  const bgChampionName =
    ((await queryClient.getQueryData(["bgChampionName"])) as string) || "Jinx";

  return {
    queryClient,
    platform,
    bgChampionName,
    leagueEntries,
    summoner,
    mastery,
    accountData,
  };
}
