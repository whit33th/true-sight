import { queryKey } from "@/helpers/constants/types/queryKeys";
import { accountService } from "@/helpers/services/account";
import { currentUser } from "@clerk/nextjs/server";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import ProfileClientPage from "./pageClient";
import { Platform } from "@/helpers/constants/types/riot";
import { leagueService } from "@/helpers/services/league-v4";

export default async function ProfilePage() {
  const user = await currentUser();
  const name = user?.unsafeMetadata?.name as string;
  const tag = user?.unsafeMetadata?.tag as string;
  const platform = user?.unsafeMetadata?.platform as Platform;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKey("getAccount", {
      name: name,
      tag: tag,
    }),
    queryFn: () =>
      accountService.getAccountByTag({
        name: name,
        tag: tag,
      }),
  });
  await queryClient.prefetchQuery({
    queryKey: queryKey("leagueEntries", {
      platform: platform,
      encryptedPUUID: "",
    }),
    queryFn: () =>
      leagueService.getEntries({
        encryptedPUUID: "asdsadasd",
        platform: platform,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfileClientPage platform={platform} />
    </HydrationBoundary>
  );
}
