import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MatchDto } from "@/helpers/constants/types/match";
import { formatDistanceToNow } from "date-fns";
import {
  Shield,
  Sword,
  Target,
  Clock,
  Users,
  Trophy,
  Crown,
  Swords,
  HandCoins,
} from "lucide-react";
import useGetLatestVersion from "@/hooks/useQueries/useGetLatestVersion";
import useGetSummonerSpells from "@/hooks/useQueries/useGetSummonerSpells";

interface MatchHistoryItemProps {
  matchData: MatchDto;
  userPuuid: string;
}

export default function MatchHistoryItem({
  matchData,
  userPuuid,
}: MatchHistoryItemProps) {
  const { data: version } = useGetLatestVersion();
  const { data: summonerSpellsData } = useGetSummonerSpells(version);

  if (!matchData) return null;

  // Find the current player in the match
  const player = matchData.info.participants.find((p) => p.puuid === userPuuid);

  if (!player) return null;

  // Determine if the player won or lost
  const isWin = player.win;

  // Calculate match duration
  const durationMinutes = Math.floor(matchData.info.gameDuration / 60);
  const durationSeconds = matchData.info.gameDuration % 60;

  // Calculate KDA
  const kda = (
    (player.kills + player.assists) /
    Math.max(1, player.deaths)
  ).toFixed(2);

  // Calculate CS and CS per minute
  const totalCS = player.totalMinionsKilled + player.neutralMinionsKilled;
  const csPerMin = (totalCS / (matchData.info.gameDuration / 60)).toFixed(1);

  // Calculate time since match
  const matchTime = new Date(
    matchData.info.gameEndTimestamp || matchData.info.gameCreation,
  );
  const timeAgo = formatDistanceToNow(matchTime, { addSuffix: true });

  // Get team data
  const team = matchData.info.teams.find((t) => t.teamId === player.teamId);

  // Get queue name (simplified version)
  const getQueueName = (queueId: number) => {
    switch (queueId) {
      case 420:
        return {
          name: "Ranked Solo/Duo",
          icon: <Crown className="h-4 w-4 text-yellow-600" />,
        };
      case 440:
        return {
          name: "Ranked Flex",
          icon: <Crown className="h-4 w-4 text-blue-600" />,
        };
      case 400:
        return {
          name: "Normal Draft",
          icon: <Users className="h-4 w-4 text-green-600" />,
        };
      case 430:
        return {
          name: "Normal Blind",
          icon: <Users className="h-4 w-4 text-green-600" />,
        };
      case 450:
        return {
          name: "ARAM",
          icon: <Shield className="h-4 w-4 text-purple-600" />,
        };
      case 700:
        return {
          name: "Clash",
          icon: <Trophy className="h-4 w-4 text-orange-600" />,
        };
      default:
        return {
          name: matchData.info.gameMode,
          icon: <Swords className="h-4 w-4 text-gray-600" />,
        };
    }
  };

  const queueInfo = getQueueName(matchData.info.queueId);

  // Get summoner spell name from ID
  const getSummonerSpellName = (spellId: string | number): string => {
    if (!summonerSpellsData) return "Summoner";

    // Convert number to string if needed
    const spellIdStr = spellId.toString();

    // Find the spell in the data
    const spell = Object.values(summonerSpellsData.data).find(
      (spell) => spell.key === spellIdStr,
    );

    if (spell) {
      // Return the id without the "Summoner" prefix
      return spell.id.replace("Summoner", "");
    }

    // Fallback to default mappings if not found
    switch (Number(spellId)) {
      case 4:
        return "Flash";
      case 14:
        return "Ignite";
      case 7:
        return "Heal";
      case 6:
        return "Ghost";
      case 3:
        return "Exhaust";
      case 11:
        return "Smite";
      case 12:
        return "Teleport";
      case 21:
        return "Barrier";
      case 1:
        return "Cleanse";
      case 13:
        return "Clarity";
      case 32:
        return "Snowball";
      case 39:
        return "SnowURFSnowball_Mark";
      default:
        return "Summoner";
    }
  };

  return (
    <Link
      href={`/match/${matchData.metadata.matchId}`}
      className={`flex items-center gap-3 rounded-lg p-2 transition-all duration-100 hover:shadow-md ${
        isWin
          ? "bg-emerald-100/80 hover:bg-emerald-100"
          : "bg-rose-100/80 hover:bg-rose-100"
      }`}
    >
      {/* 1. Champion image */}
      <div className="flex items-center gap-1">
        <div className="relative h-16 w-16 overflow-hidden rounded-sm border-2 border-white/50">
          <Image
            src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${player.championName}.png`}
            alt={player.championName}
            width={48}
            height={48}
            className="h-full w-full object-cover"
          />
          <div className="absolute right-0 bottom-0 rounded-tl-xs bg-black/50 p-[3px] text-[9px] font-bold text-white backdrop-blur-xl">
            {player.champLevel}
          </div>
          <div
            className={`absolute inset-0 flex items-center justify-center rounded-sm ${
              isWin ? "bg-emerald-500/10" : "bg-rose-500/10"
            }`}
          ></div>
        </div>

        {/* 2. Summoner spells in column */}
        <div className="flex h-full flex-col justify-between gap-1">
          <div className="h-6 w-6 overflow-hidden rounded-sm border border-white/50 bg-neutral-200">
            <Image
              src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/Summoner${getSummonerSpellName(player.summoner1Id)}.png`}
              alt={`Summoner Spell ${getSummonerSpellName(player.summoner1Id)}`}
              width={24}
              height={24}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="h-6 w-6 overflow-hidden rounded-sm border border-white/50 bg-neutral-200">
            <Image
              src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/Summoner${getSummonerSpellName(player.summoner2Id)}.png`}
              alt={`Summoner Spell ${getSummonerSpellName(player.summoner2Id)}`}
              width={24}
              height={24}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* 3. Items grid and trinket */}
        <div className="flex items-start gap-1">
          {/* Main items in 3x2 grid */}
          <div className="grid grid-cols-3 gap-1">
            {[
              player.item0,
              player.item1,
              player.item2,
              player.item3,
              player.item4,
              player.item5,
            ].map((itemId, idx) => (
              <div
                key={idx}
                className={`h-6 w-6 rounded-sm ${itemId > 0 ? "bg-neutral-200" : "bg-neutral-200/30"}`}
              >
                {itemId > 0 && (
                  <Image
                    src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${itemId}.png`}
                    alt={`Item ${idx + 1}`}
                    width={24}
                    height={24}
                    className="h-full w-full rounded-sm object-cover"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Trinket item */}

          <div
            className={`rounded-sm ${player.item6 > 0 ? "border border-yellow-400/50 bg-neutral-200" : "bg-neutral-200/30"}`}
          >
            {player.item6 > 0 && (
              <Image
                src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${player.item6}.png`}
                alt="Ward"
                width={24}
                height={24}
                className="h-full w-full rounded-sm object-cover"
              />
            )}
          </div>
        </div>
      </div>

      {/* 4. Win/Loss indicator */}

      {/* 5. Stats column */}
      <div className="flex flex-col gap-1">
        <div className="group relative flex items-center justify-between gap-1">
          <div className="flex items-center">
            <Sword className="h-3 w-3 text-red-700" />
          </div>
          <span className="text-xs font-medium text-neutral-900">
            {(player.challenges?.damagePerMinute || 0).toFixed(1)}
          </span>
          <div className="invisible absolute top-full left-0 z-10 mt-1 w-40 rounded-md bg-white p-2 text-xs shadow-lg group-hover:visible">
            <p className="font-semibold">Damage Per Minute</p>
            <p className="text-neutral-600">
              Average damage dealt to champions per minute
            </p>
          </div>
        </div>

        <div className="group relative flex items-center justify-between gap-1">
          <div className="flex items-center">
            <Target className="h-3 w-3 text-green-700" />
          </div>
          <span className="text-xs font-medium text-neutral-900">
            {Math.round((player.challenges?.killParticipation || 0) * 100)}%
          </span>
          <div className="invisible absolute top-full left-0 z-10 mt-1 w-40 rounded-md bg-white p-2 text-xs shadow-lg group-hover:visible">
            <p className="font-semibold">Kill Participation</p>
            <p className="text-neutral-600">
              Percentage of team kills you contributed to
            </p>
          </div>
        </div>

        <div className="group relative flex items-center justify-between gap-1">
          <div className="flex items-center">
            <Shield className="h-3 w-3 text-blue-700" />
          </div>
          <span className="text-xs font-medium text-neutral-900">
            {Math.round(
              (player.challenges?.damageTakenOnTeamPercentage || 0) * 100,
            )}
            %
          </span>
          <div className="invisible absolute top-full left-0 z-10 mt-1 w-40 rounded-md bg-white p-2 text-xs shadow-lg group-hover:visible">
            <p className="font-semibold">Damage Taken</p>
            <p className="text-neutral-600">
              Percentage of team&apos;s total damage taken
            </p>
          </div>
        </div>
      </div>

      {/* 6. Gold and CS column */}
      <div className="flex flex-col gap-1 text-xs text-neutral-700">
        {/* KDA section */}
        <div className="flex items-center gap-1">
          <span
            className={` ${isWin ? "text-emerald-600" : "text-neutral-700"}`}
          >
            {player.kills}
          </span>
          <span className="text-neutral-400">/</span>
          <span
            className={` ${player.deaths > 0 ? "text-rose-600" : "text-neutral-700"}`}
          >
            {player.deaths}
          </span>
          <span className=" ">/</span>
          <span
            className={` ${isWin ? "text-emerald-600" : "text-neutral-700"}`}
          >
            {player.assists}
          </span>
          <div className="flex items-center gap-1">
            <span className="text-xs">KDA</span>
            <span className="font-medium">{kda}</span>
          </div>
        </div>

        {/* Gold */}
        <div className="flex items-center gap-1">
          <HandCoins className="h-3 w-3 text-amber-500" />
          {(player.goldEarned / 1000).toFixed(1)}k
          <div className="">
            <span>/ {totalCS} CS</span>
            <span className="text-[10px]">({csPerMin}/min)</span>
          </div>
        </div>
        {/* KDA Ratio */}

        {/* CS section */}

        {/* Match Result */}
        <div className="flex items-center gap-1 font-medium">
          <span className={`${isWin ? "text-emerald-600" : "text-rose-600"}`}>
            {isWin ? "Victory" : "Defeat"}
          </span>
          <span className="text-xs text-neutral-500">
            {team?.objectives.champion.kills} -{" "}
            {
              matchData.info.teams.find((t) => t.teamId !== player.teamId)
                ?.objectives.champion.kills
            }
          </span>
        </div>
      </div>

      {/* 7. Teams grid */}
      <div className="ml-auto flex flex-col justify-between gap-1">
        {/* Blue team */}
        <div className="flex gap-1 rounded-sm">
          {matchData.info.participants
            .filter((p) => p.teamId === 100)
            .map((p) => (
              <div
                onClick={() => (window.location.href = `/profile/${p.puuid}`)}
                key={p.participantId}
                className={`relative aspect-square cursor-pointer overflow-hidden rounded-sm transition-all hover:scale-105 ${
                  p.puuid === userPuuid
                    ? "shadow-lg ring-2 ring-yellow-400 ring-offset-1"
                    : "hover:ring-1 hover:ring-white/50"
                }`}
                title={p.summonerName}
              >
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${p.championName}.png`}
                  alt={p.championName}
                  width={24}
                  height={24}
                  className="h-full w-full object-cover"
                />
                {p.puuid === userPuuid && (
                  <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/20 to-transparent" />
                )}
              </div>
            ))}
        </div>

        {/* Red team */}
        <div className="flex gap-1 rounded-sm">
          {matchData.info.participants
            .filter((p) => p.teamId === 200)
            .map((p) => (
              <div
                onClick={() => (window.location.href = `/profile/${p.puuid}`)}
                key={p.participantId}
                className={`relative aspect-square cursor-help overflow-hidden rounded-sm transition-all hover:scale-105 ${
                  p.puuid === userPuuid
                    ? "shadow-lg ring-2 ring-yellow-400 ring-offset-1"
                    : "hover:ring-1 hover:ring-white/50"
                }`}
                title={p.summonerName}
              >
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${p.championName}.png`}
                  alt={p.championName}
                  width={24}
                  height={24}
                />
              </div>
            ))}
        </div>
      </div>

      {/* 8. Match time info */}
      <div className="flex flex-col items-end gap-1 text-xs">
        <div className="text-neutral-800">
          {durationMinutes}:{durationSeconds.toString().padStart(2, "0")}
        </div>
        <div className="flex items-center justify-end gap-1 text-neutral-600">
          <Clock className="h-3 w-3" /> {timeAgo}
        </div>
        <div className="flex items-center gap-1 rounded-md bg-white px-1 py-0.5 text-neutral-700">
          {queueInfo.icon}
          <span className="font-medium">{queueInfo.name}</span>
        </div>
      </div>
    </Link>
  );
}
