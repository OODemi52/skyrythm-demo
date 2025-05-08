/**
 * Note: Use position fixed according to your needs
 * Display social icons consistently across all device sizes
 **/

import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "@heroui/link";

import { cn } from "@/lib/utils";

export const FloatingDock = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  let mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      className={cn(
        "mx-auto flex items-center justify-center gap-3 rounded-2xl bg-gray-50 px-3 py-2 dark:bg-neutral-900",
        // Make it adapt to content width
        items.length <= 3 ? "w-fit" : "w-full max-w-xs",
        className,
      )}
      onMouseLeave={() => mouseX.set(Infinity)}
      onMouseMove={(e) => mouseX.set(e.pageX)}
    >
      {items.map((item) => (
        <IconContainer key={item.title} mouseX={mouseX} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
}) {
  let ref = useRef<HTMLDivElement>(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  // Smaller base size for icons
  let widthTransform = useTransform(distance, [-150, 0, 150], [36, 50, 36]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [36, 50, 36]);

  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [18, 25, 18]);
  let heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [18, 25, 18],
  );

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  let widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  return (
    <Link isExternal href={href} rel="noopener noreferrer" target="_blank">
      <motion.div
        ref={ref}
        className="relative flex aspect-square items-center justify-center rounded-full bg-gray-200 dark:bg-neutral-800"
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              className="absolute -top-8 left-1/2 w-fit rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs whitespace-pre text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white"
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              initial={{ opacity: 0, y: 10, x: "-50%" }}
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          className="flex items-center justify-center"
          style={{ width: widthIcon, height: heightIcon }}
        >
          {icon}
        </motion.div>
      </motion.div>
    </Link>
  );
}
