"use client";

import { useEffect, useRef } from "react";

interface VideoBackgroundProps {
  readonly src: string;
  readonly fallbackImage?: string;
  readonly startTime?: number;
}

export default function VideoBackground({
  src,
  fallbackImage,
  startTime = 0,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      // Set the current time if startTime is provided
      if (startTime > 0) {
        videoRef.current.currentTime = startTime;
      }

      // Promise-based play with fallback for mobile browsers
      const playPromise = videoRef.current.play();

      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          // Handle auto-play prevention error (e.g., log to an external service)
          handleAutoPlayError(error);
        });
      }
    }
  }, [startTime]);

  return (
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute min-w-full min-h-full w-auto h-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover"
        poster={fallbackImage}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}
