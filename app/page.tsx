import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import DashboardClient from "./(dashboard)/DashboardClient";
import { queryKey } from "@/helpers/constants/types/queryKeys";
import { accountService } from "@/helpers/services/account";

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: queryKey("getAccount", { name: "name", tag: "tag" }),
    queryFn: () =>
      accountService.getAccountByTag({
        name: "name",
        tag: "tag",
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardClient />
    </HydrationBoundary>
  );
}
