import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import DashboardClient from "./DashboardClient";
import { queryKey } from "@/helpers/constants/types/queryKeys";
import { accountService } from "@/helpers/services/account";


export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: queryKey("uuid", { name: "name", tag: "tag", region: "europe" }),
    queryFn: () =>
      accountService.getAccountById({
        name: "name",
        tag: "tag",
        region: "europe",
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardClient />
    </HydrationBoundary>
  );
}
