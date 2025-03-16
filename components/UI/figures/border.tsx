import React from "react";

export default function BorderFigure() {
  return (
    <figure className="*:absolute *:bg-neutral-600">
      <div className="top-1 left-0 h-[1px] w-full"></div>
      <div className="bottom-1 left-0 h-[1px] w-full"></div>
      <div className="top-0 left-1 h-full w-[1px]"></div>
      <div className="top-0 right-1 h-full w-[1px]"></div>
    </figure>
  );
}
