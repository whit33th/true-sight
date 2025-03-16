"use client";
import { queryKey } from "@/helpers/constants/types/queryKeys";
import { accountService } from "@/helpers/services/account";
import { useUser } from "@clerk/nextjs"; 
import { useQuery } from "@tanstack/react-query";

interface UseGetRiotUserResult {
  data: { puuid: string; gameName: string; tagLine: string };
  isLoading: boolean;
  error: unknown;
}

export default function useGetRiotUser(): UseGetRiotUserResult {
  const { user } = useUser();

  const name = user?.unsafeMetadata.name as string;
  const tag = user?.unsafeMetadata.tag as string;

  const { data, isLoading, error } = useQuery({
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
  };
}
