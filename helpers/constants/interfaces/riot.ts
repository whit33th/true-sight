import { Platform, Region } from "../types/riot";

export interface userIds {
  name: string;
  tag: string;
  platform?: Platform;
  region?: Region;
}
export interface PlatformPUUID {
  encryptedPUUID: string;
  platform: Platform;
}
