"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import {
  Twitter,
  Instagram,
  Youtube,
  Twitch,
  Github,
  Linkedin,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";

import { FloatingDock } from "@/components/floating-dock";

type TeamMember = {
  name: string;
  designation: string;
  quote: string;
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

export function TeamList({ members }: { members: TeamMember[] }) {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleOpen = (member: TeamMember) => {
    setSelectedMember(member);
    onOpen();
  };

  // Create social links for selected member
  const getSocialLinks = (member: TeamMember | null) => {
    if (!member || !member.socials) return [];

    const socials = member.socials;
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

  return (
    <>
      {/* List of team members */}
      <ul className="max-w-4xl mx-auto w-full space-y-4">
        {members.map((member, index) => (
          <motion.li
            key={`member-${member.name}-${index}`}
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className="cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
              onClick={() => handleOpen(member)}
            >
              <CardBody>
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <div className="relative h-40 w-40 md:h-20 md:w-20 overflow-hidden rounded-lg">
                    <Image
                      priority
                      alt={member.name}
                      className="object-cover object-center w-full h-full"
                      height={200}
                      src={member.src}
                      width={200}
                    />
                  </div>

                  <div className="flex-grow text-center md:text-left">
                    <h3 className="text-xl font-semibold dark:text-white">
                      {member.name}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      {member.designation}
                    </p>
                  </div>

                  {/* Fix: Use onClick instead of letting the button handle it */}
                  <Button
                    className="mt-2 md:mt-0"
                    color="primary"
                    radius="full"
                    variant="light"
                    onClick={(e) => {
                      e.stopPropagation(); // Stop the event here
                      handleOpen(member); // Call the same handler directly
                    }}
                  >
                    View Profile
                  </Button>
                </div>
              </CardBody>
            </Card>
          </motion.li>
        ))}
      </ul>

      {/* Modal for expanded view */}
      <Modal
        backdrop="blur"
        classNames={{
          backdrop: "bg-black/70 backdrop-blur-sm",
        }}
        isOpen={isOpen}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              scale: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              scale: 0.95,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              {selectedMember && (
                <>
                  <div className="relative w-full h-80">
                    <Image
                      alt={selectedMember.name}
                      className="w-full h-full object-cover object-center"
                      height={200}
                      src={selectedMember.src}
                      width={200}
                    />
                  </div>

                  <ModalHeader className="flex flex-col gap-1">
                    <h2 className="text-2xl font-bold">
                      {selectedMember.name}
                    </h2>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                      {selectedMember.designation}
                    </p>
                  </ModalHeader>

                  <ModalBody>
                    <div className="space-y-4">
                      <blockquote className="border-l-4 border-primary pl-4 italic">
                        &quot;{selectedMember.quote}&quot;
                      </blockquote>

                      {/* Add more team member details here if needed */}
                    </div>
                  </ModalBody>

                  <ModalFooter className="flex-col items-stretch">
                    {getSocialLinks(selectedMember).length > 0 && (
                      <div className="w-full mb-4">
                        <FloatingDock items={getSocialLinks(selectedMember)} />
                      </div>
                    )}

                    <Button fullWidth color="primary" onPress={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
