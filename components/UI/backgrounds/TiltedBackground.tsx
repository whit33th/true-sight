import React from "react";

export default function TiltedBackground() {
  return (
    <div className="fixed z-[-1] h-screen w-screen overflow-hidden">
      <div className="video-container relative h-full w-full">
        <video
          src="https://res.cloudinary.com/drsebki2w/video/upload/v1741871596/loop_nf8y7a.mp4"
          autoPlay
          muted
          loop
          playsInline
          poster="/img/posterAuthBg.webp"
          aria-label="noxus-video"
          className="h-full w-full object-cover blur-xs"
        />

        <div className="absolute top-0 left-0 h-[20%] w-full bg-gradient-to-b from-black/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 h-[20%] w-full bg-gradient-to-t from-black/30 to-transparent"></div>
        <div className="absolute top-0 left-0 h-full w-[15%] bg-gradient-to-r from-black/30 to-transparent"></div>
      </div>

      <div className="absolute inset-0 bg-neutral-100/50 dark:bg-neutral-950/50"></div>
    </div>
  );
}
