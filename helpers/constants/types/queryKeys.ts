import { riotId } from "../interfaces/riot";

export type QueryKeys = {
  uuid: [riotId];
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
