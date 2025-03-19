import { useQuery } from "@tanstack/react-query";
import { riotConstService } from "../../helpers/services/RiotConst";

export default function useGetLatestVersion() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["latestVersion"],

    queryFn: () => riotConstService.getLastVersion(),
  });

  return {
    data: data || [],
    isLoading,
    error,
  };
}
