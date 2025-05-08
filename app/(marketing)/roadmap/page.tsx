"use client";

import { Link } from "@heroui/link";
import { Card, CardBody } from "@heroui/card";
import { motion } from "framer-motion";

import { Button as MButton } from "@/components/moving-border";
import VideoBackground from "@/components/video-background";
import { RoadmapStepper, type RoadmapItem } from "@/components/roadmap-stepper";
import { NewsletterForm } from "@/components/newsletter-form";
import { TextAnimate } from "@/components/text-animation";

export default function RoadmapPage() {
  // Development roadmap items
  const roadmapItems: RoadmapItem[] = [
    {
      title: "Concept Development",
      description: "Initial game concept, storyline, and mechanics planning",
      date: "Q1 2023",
      status: "completed",
    },
    {
      title: "Art Direction & Prototyping",
      description: "Visual style definition and gameplay prototype development",
      date: "Q2 2023",
      status: "completed",
    },
    {
      title: "Core Mechanics Implementation",
      description:
        "Building the foundation of gameplay systems and player controls",
      date: "Q3 2023",
      status: "current",
    },
    {
      title: "Level Design & Content Creation",
      description:
        "Creating engaging environments and implementing game progression",
      date: "Q4 2023",
      status: "upcoming",
    },
    {
      title: "Testing & Optimization",
      description: "Beta testing, performance optimization, and bug fixes",
      date: "Q1 2024",
      status: "upcoming",
    },
    {
      title: "Launch",
      description: "Official game release across multiple platforms",
      date: "Q2 2024",
      status: "upcoming",
    },
  ];

  return (
    <>
      <VideoBackground src="/videos/background1.mp4" />
      <div className="flex flex-col w-full min-h-screen">
        <section className="flex-grow flex flex-col items-center justify-center py-10">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-10 text-center">
              Development Journey
            </h1>

            {/* Two column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-10">
              {/* Roadmap column - Takes up 3/5 on large screens */}
              <div className="lg:col-span-3">
                <div className="w-full h-full">
                  <RoadmapStepper className="h-full" items={roadmapItems} />
                </div>
              </div>

              {/* Newsletter form column - Takes up 2/5 on large screens */}
              <div className="lg:col-span-2">
                <NewsletterForm />
              </div>
            </div>

            {/* Mission Statement Card */}
            <div className="mt-8 mb-6 max-w-4xl mx-auto">
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card
                  className="overflow-hidden"
                  style={{
                    backgroundColor: `rgba(20, 20, 30, 0.85)`,
                    boxShadow: `0 4px 20px rgba(255, 100, 100, 0.3), inset 0 0 20px rgba(255, 100, 100, 0.2)`,
                    backdropFilter: "blur(8px)",
                    border: `1px solid rgba(255, 100, 100, 0.4)`,
                  }}
                >
                  <CardBody className="py-6">
                    <div className="mb-4">
                      <TextAnimate
                        className="!text-center !text-2xl !font-bold !mb-3 !mt-0"
                        style={{
                          background: `linear-gradient(135deg, #FF6B6B 0%, #FFB88C 100%)`,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                          textShadow: `0 0 1px rgba(255,255,255,0.5), 0 0 15px rgba(255, 100, 100, 0.6)`,
                        }}
                        text="Our Mission"
                        type="calmInUp"
                      />
                    </div>

                    <motion.p
                      animate={{ opacity: 1 }}
                      className="text-center text-neutral-200"
                      initial={{ opacity: 0 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                    >
                      At SkyRhythm, we&apos;re creating more than just a game -
                      we&apos;re crafting an experience that challenges
                      perception and reflex. Our mission is to blend mesmerizing
                      visuals with innovative gameplay mechanics, creating a
                      sci-fi rhythm adventure that transports players to a world
                      where music and movement become one.
                    </motion.p>

                    <div className="flex justify-center mt-6">
                      <motion.div
                        animate={{ scale: 1, opacity: 1 }}
                        initial={{ scale: 0.9, opacity: 0 }}
                        transition={{
                          delay: 0.8,
                          duration: 0.3,
                          type: "spring",
                        }}
                      >
                        <MButton className="px-8">
                          <Link href="/game">Play Demo</Link>
                        </MButton>
                      </motion.div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            </div>

            {/* Back button */}
            <div className="mt-6 flex justify-center">
              <MButton>
                <Link href="/">Back to Home</Link>
              </MButton>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
