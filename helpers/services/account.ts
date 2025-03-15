import axios from "axios";
import { riotId } from "../constants/interfaces/riot";

class AccountService {
  async getAccountById({ name, tag, region }: riotId) {
    const response = await axios.get(
      `https://${region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${name}/${tag}?api_key=${process.env.RIOT_API_KEY}`,
    );
    return response.data;
  }
}

export const accountService = new AccountService();
