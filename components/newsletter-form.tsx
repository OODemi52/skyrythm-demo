"use client";

import { useState } from "react";
import { z } from "zod";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { motion } from "framer-motion";

import { TextAnimate } from "./text-animation";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().min(2, "Name must be at least 2 characters long").optional(),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

export function NewsletterForm() {
  const [formData, setFormData] = useState<NewsletterFormData>({
    email: "",
    name: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      newsletterSchema.parse(formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Success state
      setIsSuccess(true);
      setFormData({ email: "", name: "" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};

        error.errors.forEach((err) => {
          if (err.path) {
            fieldErrors[err.path[0]] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card
      className="overflow-hidden w-full h-full"
      style={{
        backgroundColor: `rgba(20, 20, 30, 0.85)`,
        boxShadow: `0 4px 20px rgba(255, 100, 100, 0.3), inset 0 0 20px rgba(255, 100, 100, 0.2)`,
        backdropFilter: "blur(8px)",
        border: `1px solid rgba(255, 100, 100, 0.4)`,
      }}
    >
      <CardHeader className="pb-0 flex flex-col items-center">
        <TextAnimate
          className="!text-center !text-xl !font-bold !mb-1 !mt-0 !block w-full"
          style={{
            background: `linear-gradient(135deg, #FF6B6B 0%, #FFB88C 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textShadow: `0 0 1px rgba(255,255,255,0.5), 0 0 15px rgba(255, 100, 100, 0.6)`,
            padding: "0.5rem 0", // Added padding to prevent cutoff
          }}
          text="Stay Updated"
          type="calmInUp"
        />
        <p className="text-center text-sm text-neutral-300">
          Sign up for our newsletter to receive development updates
        </p>
      </CardHeader>

      <CardBody className="py-4">
        {isSuccess ? (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-4"
            initial={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
          >
            <TextAnimate
              className="!text-center !text-lg !font-medium !mb-2"
              style={{
                background: `linear-gradient(135deg, #FF6B6B 0%, #FFB88C 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              text="Thanks for subscribing!"
              type="whipIn"
            />
            <p className="text-neutral-300">
              We&apos;ll keep you posted on our progress.
            </p>
          </motion.div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Input
                fullWidth
                color={errors.name ? "danger" : "default"}
                errorMessage={errors.name}
                label="Name (Optional)"
                name="name"
                placeholder="Your name"
                value={formData.name}
                variant="bordered"
                onChange={handleChange}
              />
            </div>

            <div>
              <Input
                fullWidth
                isRequired
                color={errors.email ? "danger" : "default"}
                errorMessage={errors.email}
                label="Email"
                name="email"
                placeholder="your.email@example.com"
                type="email"
                value={formData.email}
                variant="bordered"
                onChange={handleChange}
              />
            </div>

            <Button
              fullWidth
              color="primary"
              isLoading={isSubmitting}
              style={{
                background: `linear-gradient(135deg, #FF6B6B 0%, #FFB88C 100%)`,
                boxShadow: `0 4px 10px rgba(255, 100, 100, 0.3)`,
              }}
              type="submit"
            >
              Subscribe
            </Button>
          </form>
        )}
      </CardBody>
    </Card>
  );
}
