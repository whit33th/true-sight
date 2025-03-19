import axios from "axios";

export type Region = "americas" | "asia" | "europe" | "esports";
export type matchType = "ranked" | "normal" | "tourney" | "tutorial";
export type Platform =
  | "br1"
  | "eun1"
  | "euw1"
  | "jp1"
  | "kr"
  | "la1"
  | "la2"
  | "na1"
  | "oc1"
  | "tr1"
  | "ru"
  | "ph2"
  | "sg2"
  | "th2"
  | "tw2"
  | "vn2";

export const PLATFORM_HOSTS: Record<Platform, string> = {
  br1: "br1.api.riotgames.com",
  eun1: "eun1.api.riotgames.com",
  euw1: "euw1.api.riotgames.com",
  jp1: "jp1.api.riotgames.com",
  kr: "kr.api.riotgames.com",
  la1: "la1.api.riotgames.com",
  la2: "la2.api.riotgames.com",
  na1: "na1.api.riotgames.com",
  oc1: "oc1.api.riotgames.com",
  tr1: "tr1.api.riotgames.com",
  ru: "ru.api.riotgames.com",
  ph2: "ph2.api.riotgames.com",
  sg2: "sg2.api.riotgames.com",
  th2: "th2.api.riotgames.com",
  tw2: "tw2.api.riotgames.com",
  vn2: "vn2.api.riotgames.com",
};

export const REGION_HOSTS: Record<Region, string> = {
  americas: "americas.api.riotgames.com",
  asia: "asia.api.riotgames.com",
  europe: "europe.api.riotgames.com",
  esports: "esports.api.riotgames.com",
};
export const PLATFORM_DISPLAY_NAMES: Record<Platform, string> = {
  na1: "North America",
  euw1: "Europe West",
  eun1: "Europe Nordic & East",
  br1: "Brazil",
  jp1: "Japan",
  kr: "Korea",
  la1: "Latin America North",
  la2: "Latin America South",
  oc1: "Oceania",
  tr1: "Turkey",
  ru: "Russia",
  ph2: "Philippines",
  sg2: "Singapore",
  th2: "Thailand",
  tw2: "Taiwan",
  vn2: "Vietnam",
};

