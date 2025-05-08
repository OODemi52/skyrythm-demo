"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";
import NextLink from "next/link";
import { motion } from "framer-motion";

import { siteConfig } from "@/config/site";

// Animated link component with gradient hover effect
const AnimatedNavLink = ({ href, label }: { href: string; label: string }) => {
  return (
    <motion.div
      className="relative"
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      whileHover={{ scale: 1.05 }}
    >
      <NextLink className="px-3 py-2 relative group" href={href}>
        <span className="relative z-10 font-medium text-white group-hover:text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-red-600 transition duration-300">
          {label}
        </span>
        <span className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 bg-[#101014] backdrop-blur-sm transition duration-300" />
      </NextLink>
    </motion.div>
  );
};

export const Navbar = () => {
  return (
    <HeroUINavbar
      className="bg-transparent"
      isBlurred={false}
      maxWidth="xl"
      position="sticky"
    >
      <NavbarContent className="basis-full" justify="center">
        <ul className="flex gap-4 justify-center">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <AnimatedNavLink href={item.href} label={item.label} />
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>
    </HeroUINavbar>
  );
};
