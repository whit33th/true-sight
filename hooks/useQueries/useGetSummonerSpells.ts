import { useQuery } from "@tanstack/react-query";

interface SummonerSpellData {
  type: string;
  version: string;
  data: {
    [key: string]: {
      id: string;
      name: string;
      description: string;
      key: string;
      image: {
        full: string;
      };
    };
  };
}

const fetchSummonerSpells = async (
  version: string,
): Promise<SummonerSpellData> => {
  const response = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/summoner.json`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch summoner spells data");
  }
  return response.json();
};

export default function useGetSummonerSpells(version: string | undefined) {
  return useQuery({
    queryKey: ["summonerSpells", version],
    queryFn: () => fetchSummonerSpells(version || "15.5.1"),
    enabled: !!version,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}
