import { riotId } from "@/helpers/constants/interfaces/riot";
import { useUser } from "@clerk/nextjs";

export default function useUpdateRiotId() {
  const { user } = useUser();

  const prevMetadata = user?.unsafeMetadata || {};

  function update({ name, tag }: riotId) {
    user?.update({
      unsafeMetadata: { ...prevMetadata, riotId: `${name}#${tag}` },
    });
  }

  return { update };
}
