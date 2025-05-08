"use client";
import React from "react";
import { motion } from "framer-motion";

type SpotlightProps = {
  gradientFirst?: string;
  gradientSecond?: string;
  gradientThird?: string;
  translateY?: number;
  width?: number;
  height?: number;
  smallWidth?: number;
  duration?: number;
  xOffset?: number;
};

export const Spotlight = ({
  gradientFirst = "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(0, 100%, 90%, .1) 0, hsla(0, 100%, 60%, .03) 50%, hsla(0, 100%, 50%, 0) 80%)",
  gradientSecond = "radial-gradient(50% 50% at 50% 50%, hsla(0, 100%, 90%, .08) 0, hsla(0, 100%, 60%, .03) 80%, transparent 100%)",
  gradientThird = "radial-gradient(50% 50% at 50% 50%, hsla(0, 100%, 90%, .06) 0, hsla(0, 100%, 50%, .03) 80%, transparent 100%)",
  translateY = -350,
  width = 560,
  height = 1380,
  smallWidth = 240,
  duration = 7,
  xOffset = 100,
}: SpotlightProps = {}) => {
  return (
    <motion.div
      animate={{
        opacity: 1,
      }}
      className="pointer-events-none absolute inset-0 h-full w-full"
      initial={{
        opacity: 0,
      }}
      transition={{
        duration: 1.5,
      }}
    >
      <motion.div
        animate={{
          x: [0, xOffset, 0],
        }}
        className="absolute top-0 left-0 w-screen h-screen z-40 pointer-events-none"
        transition={{
          duration,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        <div
          className={`absolute top-0 left-0`}
          style={{
            transform: `translateY(${translateY}px) rotate(-45deg)`,
            background: gradientFirst,
            width: `${width}px`,
            height: `${height}px`,
          }}
        />

        <div
          className={`absolute top-0 left-0 origin-top-left`}
          style={{
            transform: "rotate(-45deg) translate(5%, -50%)",
            background: gradientSecond,
            width: `${smallWidth}px`,
            height: `${height}px`,
          }}
        />

        <div
          className={`absolute top-0 left-0 origin-top-left`}
          style={{
            transform: "rotate(-45deg) translate(-180%, -70%)",
            background: gradientThird,
            width: `${smallWidth}px`,
            height: `${height}px`,
          }}
        />
      </motion.div>

      <motion.div
        animate={{
          x: [0, -xOffset, 0],
        }}
        className="absolute top-0 right-0 w-screen h-screen z-40 pointer-events-none"
        transition={{
          duration,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        <div
          className={`absolute top-0 right-0`}
          style={{
            transform: `translateY(${translateY}px) rotate(45deg)`,
            background: gradientFirst,
            width: `${width}px`,
            height: `${height}px`,
          }}
        />

        <div
          className={`absolute top-0 right-0 origin-top-right`}
          style={{
            transform: "rotate(45deg) translate(-5%, -50%)",
            background: gradientSecond,
            width: `${smallWidth}px`,
            height: `${height}px`,
          }}
        />

        <div
          className={`absolute top-0 right-0 origin-top-right`}
          style={{
            transform: "rotate(45deg) translate(180%, -70%)",
            background: gradientThird,
            width: `${smallWidth}px`,
            height: `${height}px`,
          }}
        />
      </motion.div>
    </motion.div>
  );
};
