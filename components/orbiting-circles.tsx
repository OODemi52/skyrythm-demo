import React from "react";

import { cn } from "@/lib/utils";

export interface OrbitingCirclesProps
  extends React.HTMLAttributes<HTMLDivElement> {
  readonly className?: string;
  readonly children?: React.ReactNode;
  readonly reverse?: boolean;
  readonly duration?: number;
  readonly delay?: number;
  readonly radius?: number;
  readonly path?: boolean;
  readonly iconSize?: number;
  readonly speed?: number;
  readonly reverseTabOrder?: boolean;
}

export function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  radius = 160,
  path = true,
  iconSize = 30,
  speed = 1,
  reverseTabOrder,
  ...props
}: OrbitingCirclesProps) {
  const calculatedDuration = duration / speed;

  return (
    <>
      {path && (
        <svg
          className="pointer-events-none absolute inset-0 size-full"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="stroke-black/10 stroke-1 dark:stroke-white/10"
            cx="50%"
            cy="50%"
            fill="none"
            r={radius}
          />
        </svg>
      )}
      {React.Children.map(children, (child, index) => {
        const originalAngle = (360 / React.Children.count(children)) * index;

        const angle = reverseTabOrder ? 180 - originalAngle : originalAngle;

        return (
          <div
            className={cn(
              `absolute flex size-[var(--icon-size)] transform-gpu animate-orbit items-center justify-center rounded-full`,
              { "[animation-direction:reverse]": reverse },
              className,
            )}
            style={
              {
                "--duration": calculatedDuration,
                "--radius": radius,
                "--angle": angle,
                "--icon-size": `${iconSize}px`,
              } as React.CSSProperties
            }
            {...props}
          >
            {child}
          </div>
        );
      })}
    </>
  );
}
