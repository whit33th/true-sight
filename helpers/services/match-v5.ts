import axios from "axios";
import { PLATFORM_HOSTS, Platform, Region } from "../constants/types/riot";
import { IMatchHistoryParams } from "@/hooks/useQueries/useGetMatchHistory";

class MatchService {
  async getMatchHistory({
    puuid,
    region = "europe",
    startTime,
    endTime,
    queue,
    type,
    start = 0,
    count = 5,
  }: IMatchHistoryParams) {
    const params = new URLSearchParams();

    if (startTime) params.append("startTime", startTime.toString());
    if (endTime) params.append("endTime", endTime.toString());
    if (queue) params.append("queue", queue.toString());
    if (type) params.append("type", type);
    params.append("start", start.toString());
    params.append("count", count.toString());

    const response = await axios.get(
      `https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?${params.toString()}&api_key=${process.env.NEXT_PUBLIC_RIOT_API_KEY}`,
    );
    return response.data;
  }

  async getMatchInfo(matchId: string, region: Region = "europe") {
    const response = await axios.get(
      `https://${region}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${process.env.NEXT_PUBLIC_RIOT_API_KEY}`,
    );
    return response.data;
  }

  async getMultipleMatchInfo(matchIds: string[], region: Region = "europe") {
    const promises = matchIds.map((matchId) =>
      this.getMatchInfo(matchId, region),
    );

    return Promise.all(promises);
  }
}

export const matchService = new MatchService();
