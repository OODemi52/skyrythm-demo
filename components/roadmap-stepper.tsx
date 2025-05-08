"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardBody } from "@heroui/card";

import { cn } from "@/lib/utils";
import { TextAnimate } from "@/components/text-animation";

export type RoadmapItem = {
  title: string;
  description: string;
  date?: string;
  status: "completed" | "current" | "upcoming";
};

export const RoadmapStepper = ({
  items,
  className,
}: {
  items: RoadmapItem[];
  className?: string;
}) => {
  // Track which steps should be animated
  const [activeStep, setActiveStep] = useState(0);

  // Animate steps one by one on component mount
  useEffect(() => {
    const currentStepIndex = items.findIndex(
      (item) => item.status === "current",
    );
    const completedStepsCount = items.filter(
      (item) => item.status === "completed",
    ).length;

    // Animate to completed steps and current step
    const finalStep =
      currentStepIndex !== -1 ? currentStepIndex : completedStepsCount;

    // Gradually reveal steps
    const timer = setTimeout(() => {
      setActiveStep(finalStep);
    }, 500);

    return () => clearTimeout(timer);
  }, [items]);

  return (
    <Card
      className={cn("w-full overflow-hidden", className)}
      style={{
        backgroundColor: `rgba(20, 20, 30, 0.85)`,
        boxShadow: `0 4px 20px rgba(255, 100, 100, 0.3), inset 0 0 20px rgba(255, 100, 100, 0.2)`,
        backdropFilter: "blur(8px)",
        border: `1px solid rgba(255, 100, 100, 0.4)`,
      }}
    >
      <CardBody className="py-4">
        <div className="space-y-1 mb-4">
          <TextAnimate
            className="!text-xl !font-bold !text-center !mb-1"
            style={{
              background: `linear-gradient(135deg, #FF6B6B 0%, #FFB88C 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: `0 0 1px rgba(255,255,255,0.5), 0 0 15px rgba(255, 100, 100, 0.6)`,
            }}
            text="Development Roadmap"
            type="calmInUp"
          />
          <p className="text-neutral-500 dark:text-neutral-400 text-center text-sm">
            Track our progress as we build the game
          </p>
        </div>

        <div className="mt-6 space-y-1">
          {items.map((item, index) => (
            <div key={index} className="relative">
              {/* Connect line between steps */}
              {index < items.length - 1 && (
                <div className="absolute left-4 top-5 h-full w-0.5 -translate-x-1/2 bg-neutral-200 dark:bg-neutral-700" />
              )}

              {/* Progress line animation */}
              {index < items.length - 1 && index < activeStep && (
                <motion.div
                  animate={{ height: "100%" }}
                  className="absolute left-4 top-5 h-full w-0.5 -translate-x-1/2 bg-primary dark:bg-primary"
                  initial={{ height: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                />
              )}

              <div className="flex items-start gap-3 p-2">
                {/* Circle indicator */}
                <motion.div
                  animate={
                    index <= activeStep
                      ? { scale: 1, opacity: 1 }
                      : { scale: 0.5, opacity: 0.5 }
                  }
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-full border",
                    item.status === "completed"
                      ? "border-primary bg-primary text-white"
                      : item.status === "current"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-neutral-300 bg-neutral-100 text-neutral-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400",
                  )}
                  initial={
                    index <= activeStep
                      ? { scale: 0 }
                      : { scale: 0.5, opacity: 0.5 }
                  }
                  transition={{ duration: 0.3, delay: index * 0.2 }}
                >
                  {item.status === "completed" ? (
                    <svg
                      fill="none"
                      height="16"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </motion.div>

                {/* Content */}
                <motion.div
                  animate={{ x: 0, opacity: 1 }}
                  className="flex-1"
                  initial={{ x: 20, opacity: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.2 }}
                >
                  <div className="flex flex-col gap-0.5 pb-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-semibold text-neutral-800 dark:text-neutral-100">
                        {item.title}
                      </h3>
                      {item.date && (
                        <span className="text-xs text-neutral-500 dark:text-neutral-400">
                          {item.date}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};
