import React from "react";
import { fetchRiotAccountData } from "../api/riot/data";

export default async function Page() {
  const {} = await fetchRiotAccountData();

  return <div> </div>;
}
