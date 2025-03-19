import { useQuery } from "@tanstack/react-query";
import { riotConstService } from "../../helpers/services/RiotConst";

interface Results {
  data: Record<number, string> | undefined[];
  isLoading: boolean;
  error: unknown;
}

export default function useGetChampionsName(): Results {
  const { data, isLoading, error } = useQuery({
    queryKey: ["ChampionsName"],
    queryFn: () => riotConstService.getAllChampionIds(),
  });

  return {
    data: data || [],
    isLoading,
    error,
  };
}
