import { Platform, Region } from "../types/riot";

export interface userIds {
  name: string;
  tag: string;
  platform?: Platform;
  region?: Region;
  puuid?: string;
}
export interface PlatformPUUID {
  encryptedPUUID: string;
  platform: Platform;
}
