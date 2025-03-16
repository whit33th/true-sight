import { useUser } from "@clerk/nextjs";
import { Platform } from "../helpers/constants/types/riot";

export default function useUpdateUserPlatform() {
  const { user } = useUser();

  const prevMetadata = user?.unsafeMetadata || {};

  function updateUserPlatform(platform: Platform) {
    user?.update({
      unsafeMetadata: { ...prevMetadata, userPlatform: platform },
    });
  }

  return { update: updateUserPlatform };
}
