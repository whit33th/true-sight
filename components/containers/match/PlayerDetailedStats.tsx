import React from "react";
import { ParticipantDto } from "@/helpers/constants/types/match";
import { Sword, Shield, Target, Eye, Activity, Crosshair } from "lucide-react";

interface PlayerDetailedStatsProps {
  player: ParticipantDto;
}

export default function PlayerDetailedStats({
  player,
}: PlayerDetailedStatsProps) {
  if (!player) return null;

  // Format damage numbers
  const formatNumber = (num: number) => {
    return num >= 10000 ? `${(num / 1000).toFixed(1)}k` : num.toLocaleString();
  };

  return (
    <div className="text-neutral-200">
      <h4 className="mb-3 font-medium text-neutral-300">
        Detailed Performance
      </h4>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {/* Damage statistics */}
        <div className="rounded-sm bg-neutral-700/40 p-3">
          <div className="mb-2 flex items-center gap-2">
            <Sword size={16} className="text-red-400" />
            <h5 className="font-medium text-neutral-300">Damage</h5>
          </div>
          <div className="space-y-2">
            <StatItem
              label="Total to Champions"
              value={formatNumber(player.totalDamageDealtToChampions)}
            />
            <StatItem
              label="Physical"
              value={formatNumber(player.physicalDamageDealtToChampions)}
              color="text-orange-300"
            />
            <StatItem
              label="Magic"
              value={formatNumber(player.magicDamageDealtToChampions)}
              color="text-blue-300"
            />
            <StatItem
              label="True"
              value={formatNumber(player.trueDamageDealtToChampions)}
              color="text-white"
            />
            <StatItem
              label="Critical Strike"
              value={formatNumber(player.largestCriticalStrike)}
              color="text-yellow-300"
            />
          </div>
        </div>

        {/* Damage taken statistics */}
        <div className="rounded-sm bg-neutral-700/40 p-3">
          <div className="mb-2 flex items-center gap-2">
            <Shield size={16} className="text-blue-400" />
            <h5 className="font-medium text-neutral-300">Damage Taken</h5>
          </div>
          <div className="space-y-2">
            <StatItem
              label="Total Taken"
              value={formatNumber(player.totalDamageTaken)}
            />
            <StatItem
              label="Physical"
              value={formatNumber(player.physicalDamageTaken)}
              color="text-orange-300"
            />
            <StatItem
              label="Magic"
              value={formatNumber(player.magicDamageTaken)}
              color="text-blue-300"
            />
            <StatItem
              label="True"
              value={formatNumber(player.trueDamageTaken)}
              color="text-white"
            />
            <StatItem
              label="Self Mitigated"
              value={formatNumber(player.damageSelfMitigated)}
              color="text-green-300"
            />
          </div>
        </div>

        {/* Combat statistics */}
        <div className="rounded-sm bg-neutral-700/40 p-3">
          <div className="mb-2 flex items-center gap-2">
            <Crosshair size={16} className="text-emerald-400" />
            <h5 className="font-medium text-neutral-300">Combat</h5>
          </div>
          <div className="space-y-2">
            <StatItem
              label="Double Kills"
              value={player.doubleKills.toString()}
            />
            <StatItem
              label="Triple Kills"
              value={player.tripleKills.toString()}
            />
            <StatItem
              label="Quadra Kills"
              value={player.quadraKills.toString()}
            />
            <StatItem
              label="Penta Kills"
              value={player.pentaKills.toString()}
            />
            <StatItem
              label="Killing Sprees"
              value={player.killingSprees.toString()}
            />
          </div>
        </div>

        {/* Utility statistics */}
        <div className="rounded-sm bg-neutral-700/40 p-3">
          <div className="mb-2 flex items-center gap-2">
            <Activity size={16} className="text-purple-400" />
            <h5 className="font-medium text-neutral-300">Utility</h5>
          </div>
          <div className="space-y-2">
            <StatItem
              label="CC Time"
              value={`${player.timeCCingOthers.toFixed(1)}s`}
            />
            <StatItem
              label="Total Healing"
              value={formatNumber(player.totalHeal)}
              color="text-green-300"
            />
            <StatItem
              label="Healing on Teammates"
              value={formatNumber(player.totalHealsOnTeammates)}
              color="text-green-300"
            />
            <StatItem
              label="Time Dead"
              value={`${(player.totalTimeSpentDead / 60).toFixed(1)} min`}
            />
            <StatItem
              label="Longest Life"
              value={`${(player.longestTimeSpentLiving / 60).toFixed(1)} min`}
              color="text-emerald-300"
            />
          </div>
        </div>

        {/* Vision statistics */}
        <div className="rounded-sm bg-neutral-700/40 p-3">
          <div className="mb-2 flex items-center gap-2">
            <Eye size={16} className="text-yellow-400" />
            <h5 className="font-medium text-neutral-300">Vision</h5>
          </div>
          <div className="space-y-2">
            <StatItem
              label="Vision Score"
              value={player.visionScore.toString()}
            />
            <StatItem
              label="Wards Placed"
              value={player.wardsPlaced.toString()}
            />
            <StatItem
              label="Wards Destroyed"
              value={player.wardsKilled.toString()}
            />
            <StatItem
              label="Control Wards"
              value={player.visionWardsBoughtInGame.toString()}
              color="text-pink-300"
            />
            <StatItem
              label="Detector Wards"
              value={player.detectorWardsPlaced.toString()}
            />
          </div>
        </div>

        {/* Objective statistics */}
        <div className="rounded-sm bg-neutral-700/40 p-3">
          <div className="mb-2 flex items-center gap-2">
            <Target size={16} className="text-amber-400" />
            <h5 className="font-medium text-neutral-300">Objectives</h5>
          </div>
          <div className="space-y-2">
            <StatItem
              label="Turret Kills"
              value={player.turretKills.toString()}
            />
            <StatItem
              label="Inhibitor Kills"
              value={player.inhibitorKills.toString()}
            />
            <StatItem
              label="Baron Kills"
              value={player.baronKills.toString()}
              color="text-purple-300"
            />
            <StatItem
              label="Dragon Kills"
              value={player.dragonKills.toString()}
              color="text-red-300"
            />
            <StatItem
              label="Objectives Stolen"
              value={player.objectivesStolen.toString()}
              color="text-yellow-300"
            />
          </div>
        </div>
      </div>

      {/* Game stats */}
      <div className="mt-3 flex flex-wrap gap-2">
        {player.firstBloodKill && <Badge color="red">First Blood</Badge>}
        {player.firstTowerKill && <Badge color="amber">First Tower</Badge>}
        {player.challenges?.killParticipation && (
          <Badge color="emerald">
            {Math.round(player.challenges.killParticipation * 100)}% Kill
            Participation
          </Badge>
        )}
        {player.challenges?.soloKills && (
          <Badge color="blue">{player.challenges.soloKills} Solo Kills</Badge>
        )}
        {player.challenges?.skillshotsHit && (
          <Badge color="violet">
            {player.challenges.skillshotsHit} Skillshots Hit
          </Badge>
        )}
      </div>
    </div>
  );
}

function StatItem({
  label,
  value,
  color = "text-neutral-300",
}: {
  label: string;
  value: string;
  color?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-neutral-400">{label}</span>
      <span className={`text-sm font-medium ${color}`}>{value}</span>
    </div>
  );
}

function Badge({
  children,
  color = "blue",
}: {
  children: React.ReactNode;
  color?: "red" | "blue" | "green" | "amber" | "violet" | "emerald";
}) {
  const colorClasses = {
    red: "bg-red-900/70 text-red-300",
    blue: "bg-blue-900/70 text-blue-300",
    green: "bg-green-900/70 text-green-300",
    amber: "bg-amber-900/70 text-amber-300",
    violet: "bg-violet-900/70 text-violet-300",
    emerald: "bg-emerald-900/70 text-emerald-300",
  };

  return (
    <span
      className={`rounded-sm px-2 py-1 text-xs font-medium ${colorClasses[color]}`}
    >
      {children}
    </span>
  );
}
