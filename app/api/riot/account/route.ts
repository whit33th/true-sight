import apiCache from "@/lib/nodeCache";
import axios from "axios";
import { NextResponse } from "next/server";

const riot_key = process.env.RIOT_API_KEY;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const name = searchParams.get("name") as string;
  const tag = searchParams.get("tag") as string;

  console.log("Запрос аккаунта:", name, tag);

  if (!name || !tag) {
    return NextResponse.json({
      error: "No name or tag provided",
      status: 400,
    });
  }

  try {
    const cacheKey = `account:${name}:${tag}`;

    const cachedData = apiCache.get(cacheKey);
    if (cachedData) {
      console.log("Cache hit");
      const cachedResponse = NextResponse.json(cachedData);
      cachedResponse.headers.set(
        "Cache-Control",
        "public, max-age=600, s-maxage=1800",
      );
      return cachedResponse;
    }

    const encodedName = encodeURIComponent(name);
    const encodedTag = encodeURIComponent(tag);

    const endpoint = `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodedName}/${encodedTag}`;

    console.log("api work", endpoint);

    const res = await axios.get(endpoint, {
      headers: {
        "X-Riot-Token": riot_key || "",
      },
    });

    const data = res.data;
    apiCache.set(cacheKey, data, 60 * 60 * 24);

    const resWithData = NextResponse.json(data);
    resWithData.headers.set(
      "Cache-Control",
      "public, max-age=600, s-maxage=1800",
    );
    return resWithData;
  } catch (error: any) {
    console.error(error);
    if (error.response) {
      const status = error.response.status;
      let errorMessage = `Riot API error: ${status}`;

      if (status === 404) {
        errorMessage = `Account ${name}#${tag} not found`;
      }
      return NextResponse.json({ error: errorMessage }, { status });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
