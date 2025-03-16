import { PlatformPUUID, userIds } from "../interfaces/riot";

export type QueryKeys = {
  getAccount: [userIds];
  leagueEntries: [PlatformPUUID];
  summoner: [name: string];
  matches: [page: number, count: number];
  champion: [id: number];
};

export type QueryKeyName = keyof QueryKeys;

export function queryKey<T extends QueryKeyName>(
  key: T,
  ...params: QueryKeys[T]
): [T, ...QueryKeys[T]] {
  return [key, ...params];
}
