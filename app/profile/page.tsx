import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchRiotAccountData } from "../../data/data";
import ProfileClientPage from "./pageClient";

export default async function ProfilePage() {
  const { queryClient, platform, bgChampionName } =
    await fetchRiotAccountData();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfileClientPage bgChampionName={bgChampionName} platform={platform} />
    </HydrationBoundary>
  );
}
