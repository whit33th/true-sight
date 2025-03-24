import axios from "axios";
import { Platform, PLATFORM_HOSTS } from "../constants/types/riot";

class SummonerService {
  async getSummoner(puuid: string, platform: Platform) {
    const response = await axios.get(
      `https://${PLATFORM_HOSTS[platform]}/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${process.env.NEXT_PUBLIC_RIOT_API_KEY}`,
    );
    return response.data;
  }
}

export const summonerService = new SummonerService();
