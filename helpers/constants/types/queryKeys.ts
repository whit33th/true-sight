import { IMatchHistoryParams } from "@/hooks/useQueries/useGetMatchHistory";
import { PlatformPUUID, userIds } from "../interfaces/riot";

export type QueryKeys = {
  getAccount: [userIds];
  leagueEntries: [PlatformPUUID];
  mastery: [PlatformPUUID];
  summoner: [PlatformPUUID];
  champion: [id: number];
  matchHistory: [IMatchHistoryParams];
  matchInfo: [{ matchId: string; region: string }];
};

export type QueryKeyName = keyof QueryKeys;

export function queryKey<T extends QueryKeyName>(
  key: T,
  ...params: QueryKeys[T]
): [T, ...QueryKeys[T]] {
  return [key, ...params];
}
