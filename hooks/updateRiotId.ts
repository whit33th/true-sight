import { userIds } from "@/helpers/constants/interfaces/riot";
import { accountService } from "@/helpers/services/account";
import { useUser } from "@clerk/nextjs";

import { useSuspenseQuery } from "@tanstack/react-query";
import { queryKey } from "@/helpers/constants/types/queryKeys";
import axios from "axios";

export default function useUpdateRiotId() {
  const { user } = useUser();

  const prevMetadata = user?.unsafeMetadata || {};

  async function updateRiotId({ name, tag, platform, puuid }: userIds) {
    if (!user) return;

    try {
      await user.update({
        unsafeMetadata: {
          ...prevMetadata,

          name: name,
          tag: tag,
          platform: platform,
          puuid: puuid,
        },
      });

      const { toast } = await import("sonner");
      toast.success("Riot ID updated successfully");
    } catch (error) {
      const { toast } = await import("sonner");
      toast.error("Failed to update Riot ID");
      console.error("Error updating Riot ID:", error);
    }
  }

  return { update: updateRiotId };
}
