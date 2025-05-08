"use client";

import { Card, CardBody } from "@heroui/card";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@heroui/link";

import { Button as MButton } from "@/components/moving-border";
import VideoBackground from "@/components/video-background";
import { OrbitingCircles } from "@/components/orbiting-circles";
import HoverSocial from "@/components/hover-social";
import { TextAnimate } from "@/components/text-animation";

export default function HomePage() {
  // Add responsive radius based on screen size
  const [radius, setRadius] = useState(200);

  // Update radius based on window size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setRadius(150); // Mobile
      } else if (window.innerWidth < 768) {
        setRadius(200); // Small tablet - reduced slightly
      } else if (window.innerWidth < 1024) {
        setRadius(250); // Large tablet - reduced slightly
      } else {
        setRadius(280); // Desktop - reduced slightly
      }
    };

    // Set initial size
    handleResize();

    // Add resize listener
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <VideoBackground src="/videos/background1.mp4" />
      <div className="flex flex-col w-full min-h-screen">
        {/* Main section with orbiting circles */}
        <section className="relative flex flex-col items-center justify-center min-h-[60vh]">
          <OrbitingCircles
            reverseTabOrder
            className="my-4"
            path={false}
            radius={radius}
            speed={0}
          >
            {/* Circle content remains the same */}
            <div />
            <div />
            <div />
            <HoverSocial title="twitch" />
            <div />
            <HoverSocial title="instagram" />
            <div />
            <HoverSocial title="youtube" />
            <div />
            <HoverSocial title="tiktok" />
            <div />
            <div />
            <div /> {/* Middle */}
            <div />
            <div />
            <div />
            <div />
            <div />
            {/* Donate button */}
            <Link
              isExternal
              className="cursor-pointer"
              href="https://buymeacoffee.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              {/* Donate button content remains the same */}
              <motion.div
                className="group relative flex min-h-[120px] w-full items-center justify-center"
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative inline-block">
                  <motion.div
                    animate={{ opacity: 1 }}
                    className="relative z-10"
                    initial={{ opacity: 0 }}
                    style={{
                      backgroundColor: `rgba(20, 20, 30, 0.85)`,
                      boxShadow: `0 4px 20px rgba(255, 184, 0, 0.3), inset 0 0 20px rgba(255, 184, 0, 0.2)`,
                      backdropFilter: "blur(8px)",
                      borderRadius: "12px",
                      padding: "8px 16px",
                      border: `1px solid rgba(255, 184, 0, 0.4)`,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <DonateButtonText />
                  </motion.div>
                </div>
              </motion.div>
            </Link>
            <div />
            <div />
            <div />
            <div />
            <div />
          </OrbitingCircles>
        </section>

        {/* Bottom section - now with proper spacing */}
        <section className="w-full flex justify-center relative">
          <div className="mx-auto w-full max-w-2xl px-4">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card
                className="overflow-hidden"
                style={{
                  backgroundColor: `rgba(20, 20, 30, 0.85)`,
                  boxShadow: `0 4px 20px rgba(120, 120, 255, 0.3), inset 0 0 20px rgba(120, 120, 255, 0.2)`,
                  backdropFilter: "blur(8px)",
                  border: `1px solid rgba(120, 120, 255, 0.4)`,
                }}
              >
                <CardBody className="py-6">
                  {/* Card content remains the same */}
                  <div className="mb-4">
                    <TextAnimate
                      className="!text-center !text-2xl !font-bold !mb-3 !mt-0"
                      style={{
                        background: `linear-gradient(135deg, #84CFFF 0%, #C4A8FF 100%)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        textShadow: `0 0 1px rgba(255,255,255,0.5), 0 0 15px rgba(120, 120, 255, 0.6)`,
                      }}
                      text="Sky Rhythm"
                      type="calmInUp"
                    />
                  </div>

                  <motion.p
                    animate={{ opacity: 1 }}
                    className="text-center text-neutral-200"
                    initial={{ opacity: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    Dive into an exhilarating journey through a mesmerizing
                    sci-fi tunnel, where gravity defies logic and the vibrant,
                    ever-shifting environment challenges your reflexes.
                  </motion.p>
                </CardBody>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}

function DonateButtonText() {
  const [isReady, setIsReady] = useState(false);

  // Create donation button gradient style
  const gradientStyle = {
    background: `linear-gradient(135deg, #FFD700 0%, #FFA500 100%)`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    textFillColor: "transparent",
    textShadow: `0 0 1px rgba(255,255,255,0.5), 0 0 15px rgba(255, 184, 0, 0.6)`,
  };

  // Only mount TextAnimate after delay to prevent flashing
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative text-center font-medium text-xl">
      {
        isReady ? (
          <TextAnimate
            className="!p-0 !m-0"
            style={{
              marginTop: 0,
              paddingTop: 0,
              paddingBottom: 0,
              paddingLeft: 0,
              paddingRight: 0,
              fontSize: "inherit",
              fontWeight: "500", // Slightly bolder for better visibility
              ...gradientStyle,
            }}
            text="Support Us"
            type="whipIn" // Same animation type as social buttons
          />
        ) : null /* Don't render anything until ready to prevent flashing */
      }
    </div>
  );
}
