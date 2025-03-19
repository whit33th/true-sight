import axios from "axios";
import { userIds } from "../constants/interfaces/riot";

class AccountService {
  async getAccountByTag({ name, tag, region = "europe" }: userIds) {
    const response = await axios.get(
      `https://${region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${name}/${tag}?api_key=${process.env.RIOT_API_KEY}`,
    );
    return response.data;
  }
  async test({ name, tag, region = "europe" }: userIds) {
    const puuid = await axios.get(
      `https://${region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${name}/${tag}?api_key=${process.env.RIOT_API_KEY}`,
    );

    return puuid.data;
  }
}

export const accountService = new AccountService();
