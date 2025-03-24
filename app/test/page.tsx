import axios from "axios";
import React from "react";

export default async function Page() {
  // Используем переменную окружения для базового URL
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await axios.get(
    `${baseUrl}/api/riot/account?name=${encodeURIComponent("whit33th")}&tag=${encodeURIComponent("3333")}`,
  );

  const data = res.data;
  console.log(data);
  return <div>page</div>;
}
