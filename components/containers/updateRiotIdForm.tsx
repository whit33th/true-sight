"use client";
import { userIds } from "@/helpers/constants/interfaces/riot";
import {
  Platform,
  PLATFORM_DISPLAY_NAMES,
} from "@/helpers/constants/types/riot";
import useUpdateRiotId from "@/hooks/updateRiotId";
import useGetRiotUser from "@/hooks/useQueries/useGetRiotUser";
import { ChevronDown, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import BorderFigure from "../UI/figures/border";

export default function UpdateRiotIdForm({ platform }: { platform: Platform }) {
  const { data: riotUser } = useGetRiotUser();

  const { update } = useUpdateRiotId();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<userIds>({
    mode: "onChange",
    defaultValues: {
      name: riotUser.gameName,
      tag: riotUser.tagLine,
      platform: platform,
    },
  });

  const nameValue = watch("name");
  const tagValue = watch("tag");
  const platformValue = watch("platform");
  const nameLength = nameValue?.length || 0;
  const tagLength = tagValue?.length || 0;

  function onSubmit(data: userIds) {
    update({
      name: data.name,
      tag: data.tag,
      platform: data.platform,
      puuid: riotUser.puuid,
    });
  }

  // Array of available platforms
  const platforms: Platform[] = [
    "na1",
    "euw1",
    "eun1",
    "br1",
    "jp1",
    "kr",
    "la1",
    "la2",
    "oc1",
    "tr1",
    "ru",
    "ph2",
    "sg2",
    "th2",
    "tw2",
    "vn2",
  ];

  // Display names for platforms

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-6 w-full space-y-4">
      <div className="relative">
        <label htmlFor="name" className="text-sm font-medium text-neutral-700">
          Riot ID
        </label>
        <div className="flex flex-col gap-2">
          <div className="flex w-full gap-2">
            <div className="relative flex-1">
              <input
                {...register("name", {
                  required: "Riot name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                  maxLength: {
                    value: 16,
                    message: "Name must be at most 16 characters",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9\s]+$/,
                    message: "Only English letters and numbers allowed",
                  },
                })}
                type="text"
                placeholder="Username"
                maxLength={16}
                className={`h-10 w-full rounded-sm border px-4 py-2 text-sm text-neutral-700 outline-none focus:ring-1 focus:ring-neutral-400 ${
                  errors.name
                    ? "border-red-400 bg-red-200"
                    : nameLength >= 3
                      ? "border-green-400 bg-green-200"
                      : "border-neutral-400/30 bg-neutral-100/70"
                }`}
                onKeyDown={(e) => {
                  // Block non-English characters from being typed
                  const regex = /^[a-zA-Z0-9\s]$/;
                  if (
                    !regex.test(e.key) &&
                    e.key !== "Backspace" &&
                    e.key !== "Delete" &&
                    e.key !== "ArrowLeft" &&
                    e.key !== "ArrowRight" &&
                    e.key !== "Tab" &&
                    !e.ctrlKey &&
                    !e.metaKey
                  ) {
                    e.preventDefault();
                  }
                }}
              />
              {nameLength > 0 && (
                <div className="absolute right-2 bottom-1 text-[10px] font-medium text-neutral-500">
                  {nameLength}/16
                </div>
              )}
            </div>
            <div className="relative w-24">
              <div className="absolute top-1/2 left-3 -translate-y-1/2 text-lg font-medium text-neutral-700">
                #
              </div>
              <input
                {...register("tag", {
                  required: "Tag is required",
                  pattern: {
                    value: /^[0-9A-Za-z]{3,5}$/,
                    message: "3-5 English alphanumeric characters only",
                  },
                })}
                type="text"
                placeholder="TAG"
                maxLength={5}
                className={`h-10 w-full rounded-sm border px-4 py-2 pl-6 text-sm text-neutral-700 uppercase outline-none focus:ring-1 focus:ring-neutral-400 ${
                  errors.tag
                    ? "border-red-400 bg-red-200"
                    : tagLength >= 3 && tagLength <= 5
                      ? "border-green-400 bg-green-200"
                      : "border-neutral-400/30 bg-neutral-100/70"
                }`}
                onKeyDown={(e) => {
                  // Block non-English alphanumeric characters from being typed
                  const regex = /^[a-zA-Z0-9]$/;
                  if (
                    !regex.test(e.key) &&
                    e.key !== "Backspace" &&
                    e.key !== "Delete" &&
                    e.key !== "ArrowLeft" &&
                    e.key !== "ArrowRight" &&
                    e.key !== "Tab" &&
                    !e.ctrlKey &&
                    !e.metaKey
                  ) {
                    e.preventDefault();
                  }
                }}
              />
              {tagLength > 0 && (
                <div
                  className={`absolute right-2 bottom-1 text-[10px] font-medium ${
                    tagLength < 3 ? "text-red-500" : "text-neutral-500"
                  }`}
                >
                  {tagLength}/5
                </div>
              )}
            </div>
          </div>

          <div className="w-full">
            <label
              htmlFor="platform"
              className="text-sm font-medium text-neutral-700"
            >
              Server
            </label>
            <div className="relative mt-1">
              <select
                {...register("platform", { required: "Server is required" })}
                className={`h-10 w-full appearance-none rounded-sm border px-4 py-2 pr-10 text-sm text-neutral-700 outline-none focus:ring-1 focus:ring-neutral-400 ${
                  errors.platform
                    ? "border-red-400 bg-red-200"
                    : platformValue
                      ? "border-green-400 bg-green-200"
                      : "border-neutral-400/30 bg-neutral-100/70"
                }`}
              >
                <option value="" disabled>
                  Select a server
                </option>
                {platforms.map((platform) => (
                  <option key={platform} value={platform}>
                    {PLATFORM_DISPLAY_NAMES[platform]}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-neutral-700">
                <ChevronDown size={16} />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={Object.keys(errors).length > 0}
            className={`relative flex items-center justify-center rounded-sm bg-neutral-800 px-4 py-2 text-sm font-medium text-neutral-100 transition-all hover:bg-neutral-800/90 disabled:cursor-not-allowed disabled:bg-neutral-800/60 disabled:text-neutral-300`}
          >
            <BorderFigure />
            <Send size={14} className="mr-1" />
            <span>Update</span>
          </button>
        </div>
      </div>
    </form>
  );
}
