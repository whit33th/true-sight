"use client";
import { useState, useRef, useEffect } from "react";

interface VideoBackgroundButtonProps {
  defaultVideoSrc: string;
  hoverVideoSrc: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function VideoBackgroundButton({
  defaultVideoSrc,
  hoverVideoSrc,
  children,
  onClick,
  className = "",
}: VideoBackgroundButtonProps) {
  const [isHovering, setIsHovering] = useState(false);
  const defaultVideoRef = useRef<HTMLVideoElement>(null);
  const hoverVideoRef = useRef<HTMLVideoElement>(null);

  // Define clip paths for different shapes, including new exciting ones

  useEffect(() => {
    if (isHovering) {
      if (defaultVideoRef.current) defaultVideoRef.current.pause();
      if (hoverVideoRef.current) {
        hoverVideoRef.current.currentTime = 0;
        hoverVideoRef.current.play();
      }
    } else {
      if (hoverVideoRef.current) hoverVideoRef.current.pause();
      if (defaultVideoRef.current) {
        defaultVideoRef.current.currentTime = 0;
        defaultVideoRef.current.play();
      }
    }
  }, [isHovering]);

  return (
    <button
      className={`relative overflow-hidden rounded-sm border-4 border-neutral-200 text-neutral-950 contrast-75  ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={onClick}
    >
      {/* Default video (plays when not hovering) */}
      <video
        ref={defaultVideoRef}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
          isHovering ? "opacity-0" : "opacity-100"
        }`}
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={defaultVideoSrc} type="video/mp4" />
      </video>

      {/* Hover video (plays when hovering) */}
      <video
        ref={hoverVideoRef}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
          isHovering ? "opacity-100" : "opacity-0"
        }`}
        loop
        muted
        playsInline
      >
        <source src={hoverVideoSrc} type="video/mp4" />
      </video>

      {/* Button content */}
      <div className="relative z-10 flex h-full w-full items-center justify-center p-4">
        <div className="relative">{children}</div>
      </div>
    </button>
  );
}
