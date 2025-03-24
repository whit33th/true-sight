import React from "react";
import Loader from "./loader";

export default function LoadingDiv() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Loader />
    </div>
  );
}
