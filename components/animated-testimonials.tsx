"use client";

import {
  ArrowLeft,
  ArrowRight,
  Twitter,
  Instagram,
  Youtube,
  Twitch,
  Github,
  Linkedin,
  ExternalLink,
  Clock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import React from "react";

import { NeumorphEyebrow } from "@/components/neumorphic-eyebrow";
import { FloatingDock } from "@/components/floating-dock";

// Demo component (can be removed if not needed)
export function FloatingDockDemo() {
  const links = [
    {
      title: "Home",
      icon: (
        <ArrowRight className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Products",
      icon: (
        <Github className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Components",
      icon: (
        <ExternalLink className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Twitter",
      icon: (
        <Twitter className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "GitHub",
      icon: (
        <Github className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
  ];

  return (
    <div className="flex items-center justify-center h-[35rem] w-full">
      <FloatingDock
        items={links}
        mobileClassName="translate-y-20" // only for demo, remove for production
      />
    </div>
  );
}

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
  socials?: {
    twitter?: string;
    instagram?: string;
    youtube?: string;
    twitch?: string;
    tiktok?: string;
    github?: string;
    linkedin?: string;
    website?: string;
  };
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
  className = "",
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
  className?: string;
}) => {
  const [active, setActive] = useState(0);
  const [isDockHovered, setIsDockHovered] = useState(false);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  const handleDockMouseEnter = () => {
    setIsDockHovered(true);
  };

  const handleDockMouseLeave = () => {
    setIsDockHovered(false);
  };

  useEffect(() => {
    if (autoplay && !isDockHovered) {
      const interval = setInterval(handleNext, 7500);

      return () => clearInterval(interval);
    }
  }, [autoplay, isDockHovered]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  // Create social links for FloatingDock
  const getSocialLinks = () => {
    const currentMember = testimonials[active];
    const socials = currentMember.socials || {};

    const socialItems = [];

    if (socials.twitter) {
      socialItems.push({
        title: "Twitter",
        icon: (
          <Twitter className="h-full w-full text-[#1DA1F2] dark:text-[#1DA1F2]" />
        ),
        href: socials.twitter,
      });
    }

    if (socials.instagram) {
      socialItems.push({
        title: "Instagram",
        icon: (
          <Instagram className="h-full w-full text-[#E4405F] dark:text-[#E4405F]" />
        ),
        href: socials.instagram,
      });
    }

    if (socials.youtube) {
      socialItems.push({
        title: "YouTube",
        icon: (
          <Youtube className="h-full w-full text-[#FF0000] dark:text-[#FF0000]" />
        ),
        href: socials.youtube,
      });
    }

    if (socials.twitch) {
      socialItems.push({
        title: "Twitch",
        icon: (
          <Twitch className="h-full w-full text-[#9146FF] dark:text-[#9146FF]" />
        ),
        href: socials.twitch,
      });
    }

    if (socials.tiktok) {
      socialItems.push({
        title: "TikTok",
        icon: <Clock className="h-full w-full text-black dark:text-white" />,
        href: socials.tiktok,
      });
    }

    if (socials.github) {
      socialItems.push({
        title: "GitHub",
        icon: <Github className="h-full w-full text-black dark:text-white" />,
        href: socials.github,
      });
    }

    if (socials.linkedin) {
      socialItems.push({
        title: "LinkedIn",
        icon: (
          <Linkedin className="h-full w-full text-[#0A66C2] dark:text-[#0A66C2]" />
        ),
        href: socials.linkedin,
      });
    }

    if (socials.website) {
      socialItems.push({
        title: "Website",
        icon: (
          <ExternalLink className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        ),
        href: socials.website,
      });
    }

    return socialItems;
  };

  const socialLinks = getSocialLinks();

  return (
    <div className={`mx-auto px-4 py-20 font-sans antialiased ${className}`}>
      <div className="relative grid grid-cols-1 gap-20 md:grid-cols-2">
        <div>
          <div className="relative h-80 w-full">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index)
                      ? 40
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  className="absolute inset-0 origin-bottom"
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                >
                  <Image
                    priority
                    alt={testimonial.name}
                    className="h-full w-full rounded-3xl object-cover object-center"
                    draggable={false}
                    height={500}
                    src={testimonial.src}
                    width={500}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex flex-col justify-between py-4">
          <motion.div
            key={active}
            animate={{
              y: 0,
              opacity: 1,
            }}
            className="flex flex-col h-full"
            exit={{
              y: -20,
              opacity: 0,
            }}
            initial={{
              y: 20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            <h3 className="text-2xl font-bold text-black dark:text-white mb-1">
              {testimonials[active].name}
            </h3>
            <NeumorphEyebrow
              className="text-sm inline-block mx-auto mt-4"
              intent="secondary"
            >
              {testimonials[active].designation}
            </NeumorphEyebrow>
            <motion.p className="mt-2 text-lg text-gray-500 dark:text-neutral-300 mb-8">
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  className="inline-block"
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>

            {/* Only show FloatingDock if there are social links */}
            {socialLinks.length > 0 && (
              <motion.div
                key={`socials-${active}`}
                animate={{ opacity: 1, y: 0 }}
                className="mt-auto"
                exit={{ opacity: 0, y: 10 }}
                initial={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.3 }}
                onMouseEnter={handleDockMouseEnter}
                onMouseLeave={handleDockMouseLeave}
              >
                <FloatingDock items={socialLinks} />
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-12">
        <button
          className="group/button flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
          onClick={handlePrev}
        >
          <ArrowLeft className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:rotate-12 dark:text-neutral-400" />
        </button>
        <button
          className="group/button flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
          onClick={handleNext}
        >
          <ArrowRight className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:-rotate-12 dark:text-neutral-400" />
        </button>
      </div>
    </div>
  );
};
