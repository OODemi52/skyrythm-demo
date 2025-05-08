"use client";

import React, { ElementType, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { InstagramIcon, YoutubeIcon, TwitchIcon, Clock } from "lucide-react";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { TextAnimate } from "@/components/text-animation";

type IconSize = "1" | "2" | "3" | "4";
type SocialPlatform = keyof typeof siteConfig.social;
type AnimationType = "rollIn" | "whipIn" | "whipInUp" | "fadeInUp" | "calmInUp";

interface IconHoverProps {
  readonly title: string;
  readonly size?: IconSize;
  readonly animationType?: AnimationType;
  readonly withBackground?: boolean;
}

const sizeClasses: Record<IconSize, string> = {
  "1": "w-6 h-6",
  "2": "w-7 h-7",
  "3": "w-8 h-8",
  "4": "w-10 h-10",
};

const textSizeClasses: Record<IconSize, string> = {
  "1": "text-sm",
  "2": "text-base",
  "3": "text-lg",
  "4": "text-xl",
};

const getIconForTitle = (title: string) => {
  const lowercaseTitle = title.toLowerCase().trim();
  const iconMap: { [key: string]: ElementType } = {
    youtube: YoutubeIcon,
    instagram: InstagramIcon,
    twitch: TwitchIcon,
    tiktok: Clock,
  };

  return iconMap[lowercaseTitle];
};

const capitalizeWithSlash = (str: string) => {
  return str
    .split("/")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join("/");
};

export default function HoverSocial({
  title = "Square",
  size = "4",
  animationType = "whipIn",
  withBackground = true,
}: IconHoverProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const DynamicIcon = getIconForTitle(title);

  const sizeClass = sizeClasses[size];
  const textSizeClass = textSizeClasses[size];

  const formattedTitle = capitalizeWithSlash(title);

  // Get social platform data
  const platform = title.toLowerCase() as SocialPlatform;
  const socialData = siteConfig.social[platform];

  // Get colors for styling (with fallbacks)
  const mainColor = socialData?.color || "#888888";
  const accentColor = socialData?.accent || "#666666";

  // Create gradient text style with improved visibility
  const gradientStyle = {
    background: `linear-gradient(135deg, ${mainColor} 0%, ${accentColor} 100%)`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    textFillColor: "transparent",
    // Add an outer glow effect to the text
    textShadow: `0 0 1px rgba(255,255,255,0.5), 0 0 15px ${mainColor}60`,
  };

  const backgroundStyle = withBackground
    ? {
        backgroundColor: `rgba(20, 20, 30, 0.85)`,
        boxShadow: `0 4px 20px ${mainColor}30, inset 0 0 20px ${mainColor}20`,
        backdropFilter: "blur(8px)",
        borderRadius: "12px",
        padding: "8px 16px",
        border: `1px solid ${mainColor}40`,
      }
    : {};

  // Only mount TextAnimate after a delay to prevent flashing
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 500); // Increased delay for smoother appearance

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    // Initial check
    checkScreenSize();

    // Add event listener for resize
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const standardLogoVariants = {
    hidden: {
      opacity: 0,
      y: 0,
      scale: 0.5,
      rotate: 100,
    },
    visible: {
      opacity: 1,
      y: 13,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      y: 13,
      scale: 0.5,
      rotate: 100,
      transition: { duration: 0.3 },
    },
  };

  // Version without rotation for smaller screens
  const mobileLogoVariants = {
    hidden: {
      opacity: 0,
      y: 0,
      scale: 0.5,
    },
    visible: {
      opacity: 1,
      y: 13,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      y: 13,
      scale: 0.5,
      transition: { duration: 0.3 },
    },
  };

  // Use appropriate variants based on screen size
  const logoVariants = isSmallScreen
    ? mobileLogoVariants
    : standardLogoVariants;

  return (
    <motion.div
      className="group relative flex min-h-[120px] w-full cursor-pointer items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        className="relative inline-block"
        href={socialData?.url || "#"}
        rel="noopener noreferrer"
        target="_blank"
      >
        <motion.div
          animate={{ opacity: 1 }}
          className="relative z-10"
          initial={{ opacity: 0 }}
          style={backgroundStyle}
          transition={{ duration: 0.5 }}
        >
          {
            isReady ? (
              <div
                className={`relative text-center font-medium ${textSizeClass}`}
              >
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
                  text={formattedTitle}
                  type={animationType}
                />
              </div>
            ) : null /* Don't render anything until ready to prevent flashing */
          }
        </motion.div>
      </Link>

      <AnimatePresence>
        {isHovered && !isSmallScreen && (
          <motion.div
            animate="visible"
            className="absolute bottom-full left-1/2"
            exit="exit"
            initial="hidden"
            style={{
              x: "-50%",
              originX: 0.5,
              originY: 1,
              color: mainColor,
              filter: `drop-shadow(0 0 4px ${accentColor})`,
            }}
            variants={logoVariants}
          >
            <DynamicIcon className={sizeClass} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
