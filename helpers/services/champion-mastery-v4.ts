import { Platform } from "./../constants/types/riot";
import axios from "axios";
import { PLATFORM_HOSTS } from "../constants/types/riot";
import { PlatformPUUID } from "../constants/interfaces/riot";

class ChampionMasteryService {
  async getMastery({ encryptedPUUID, platform }: PlatformPUUID) {
    const response = await axios.get(
      `https://${PLATFORM_HOSTS[platform]}/lol/champion-mastery/v4/champion-masteries/by-puuid/${encryptedPUUID}?api_key=${process.env.NEXT_PUBLIC_RIOT_API_KEY}`,
    );
    return response.data;
  }
}

export const championMasteryService = new ChampionMasteryService();
