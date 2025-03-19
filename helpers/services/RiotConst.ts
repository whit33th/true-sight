import { Platform } from "./../constants/types/riot";
import axios from "axios";
import { PLATFORM_HOSTS } from "../constants/types/riot";
import { PlatformPUUID } from "../constants/interfaces/riot";

class RiotConstService {
  private championJson: any = {};

  async getLastVersion() {
    const url = "https://ddragon.leagueoflegends.com/api/versions.json";
    const res = await axios.get(url);
    const latestVersion = res.data[0];
    return latestVersion;
  }

  async getLatestDDragon() {
    if (Object.keys(this.championJson).length > 0) {
      return this.championJson;
    }

    const version = await this.getLastVersion();
    const response = await axios.get(
      `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`,
    );
    const champions = response.data.data;
    this.championJson = champions;
    return champions;
  }

  async getChampionByKey(key: string | number) {
    const champions = await this.getLatestDDragon();

    for (const championName in champions) {
      if (!champions.hasOwnProperty(championName)) {
        continue;
      }

      if (champions[championName].key === key.toString()) {
        return champions[championName];
      }
    }

    return false;
  }

  async getAllChampionIds() {
    const champions = await this.getLatestDDragon();
    const idToNameMap: Record<string, string> = {};

    for (const championName in champions) {
      if (champions.hasOwnProperty(championName)) {
        idToNameMap[champions[championName].key] = champions[championName].name;
      }
    }

    return idToNameMap;
  }

  async getChampionName(championKey: string | number) {
    const champion = await this.getChampionByKey(championKey);
    return champion ? champion.name : null;
  }
}

export const riotConstService = new RiotConstService();
