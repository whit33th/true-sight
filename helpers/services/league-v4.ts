import axios from "axios";
import { PLATFORM_HOSTS } from "../constants/types/riot";
import { PlatformPUUID } from "../constants/interfaces/riot";

class LeagueService {
  async getEntries({ encryptedPUUID, platform }: PlatformPUUID) {
    const response = await axios.get(
      `https://${PLATFORM_HOSTS[platform]}/lol/league/v4/entries/by-puuid/${encryptedPUUID}?api_key=${process.env.NEXT_PUBLIC_RIOT_API_KEY}`,
    );
    return response.data;
  }
}

export const leagueService = new LeagueService();
