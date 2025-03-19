import { queryKey } from "@/helpers/constants/types/queryKeys";
import { accountService } from "@/helpers/services/account";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";

interface Result {
  data: RiotUserData;
  isLoading: boolean;
  isSuccess: boolean;
  error: unknown;
}

interface RiotUserData {
  puuid: string;
  gameName: string;
  tagLine: string;
}

export default function useGetRiotUser(): Result {
  const { user } = useUser();

  const name = user?.unsafeMetadata.name as string;
  const tag = user?.unsafeMetadata.tag as string;

  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: queryKey("getAccount", { name, tag }),
    queryFn: () =>
      accountService.getAccountByTag({
        name,
        tag,
      }),
    enabled: !!name && !!tag,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  return {
    data: data || { puuid: "", gameName: "", tagLine: "" },
    isLoading,
    error,
    isSuccess,
  };
}
