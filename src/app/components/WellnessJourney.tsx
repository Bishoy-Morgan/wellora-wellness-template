"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Heart, Leaf, Sparkles } from "lucide-react";
import wellnessImage from "@/public/images/3.jpg";

const JOURNEY_ITEMS = [
  {
    number: "01",
    title: "Understand your needs",
    description:
      "Every wellness journey begins with understanding your lifestyle, priorities, and what feeling better means to you.",
    icon: Heart,
  },
  {
    number: "02",
    title: "Build healthy habits",
    description:
      "Explore mindful movement, balanced nutrition, and everyday routines that support a healthier lifestyle.",
    icon: Leaf,
  },
  {
    number: "03",
    title: "Find your balance",
    description:
      "Make space for rest, self-care, and small positive changes that fit naturally into your daily life.",
    icon: Sparkles,
  },
] as const;

const SECTION_TRANSITION = {
  duration: 0.6,
  ease: "easeOut" as const,
};

export default function WellnessJourney() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={SECTION_TRANSITION}
      aria-labelledby="wellness-journey-title"
      className="wellness-journey-section relative w-full py-16 sm:py-20 lg:py-28"
    >
      <div className="wellness-journey-panel relative grid min-h-168 w-full grid-cols-1 overflow-hidden rounded-tl-[2.5rem] rounded-br-[2.5rem] lg:grid-cols-[1fr_0.9fr]">
        <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-14 xl:p-16">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...SECTION_TRANSITION, delay: 0.15 }}
          >
            <span className="mb-5 inline-flex items-center gap-2 text-caption font-semibold uppercase tracking-[0.2em] text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              A more balanced life
            </span>

            <h2
              id="wellness-journey-title"
              className="text-heading max-w-2xl text-text"
            >
              Your wellbeing deserves{" "}
              <span className="text-primary">a little more attention.</span>
            </h2>

            <p className="text-body mt-5 max-w-xl text-secondary sm:mt-6">
              Better wellbeing doesn’t happen overnight. Start with small,
              meaningful steps and create a routine that feels right for you.
            </p>
          </motion.div>

          <div className="mt-9 flex flex-col gap-7 sm:mt-12 sm:gap-8">
            {JOURNEY_ITEMS.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.number}
                  initial={
                    shouldReduceMotion ? false : { opacity: 0, x: -20 }
                  }
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    ...SECTION_TRANSITION,
                    delay: shouldReduceMotion ? 0 : 0.2 + index * 0.12,
                  }}
                  className="flex items-start gap-4 sm:gap-5"
                >
                  <div className="wellness-journey-icon flex h-11 w-11 shrink-0 items-center justify-center rounded-default border-default text-primary sm:h-12 sm:w-12">
                    <Icon size={21} strokeWidth={1.7} aria-hidden="true" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="text-caption text-muted">
                        {item.number}
                      </span>
                      <h3 className="text-main font-semibold text-text">
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-body text-secondary">
                      {item.description}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <motion.a
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...SECTION_TRANSITION, delay: 0.55 }}
            href="#wellness-areas-section"
            className="group mt-9 inline-flex w-fit items-center gap-3 rounded-default bg-primary px-5 py-3.5 text-small font-semibold transition-default hover:opacity-90 sm:mt-12"
          >
            Explore wellness
            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </motion.a>
        </div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 1.03 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ ...SECTION_TRANSITION, delay: 0.2 }}
          className="wellness-journey-visual relative min-h-92 overflow-hidden sm:min-h-120 lg:min-h-full"
        >
          <Image
            src={wellnessImage}
            alt="A peaceful wellness-inspired setting"
            fill
            sizes="(max-width: 1023px) 100vw, 45vw"
            className="wellness-journey-image object-contain"
          />

          <div className="wellness-journey-overlay absolute inset-0" />

          <div className="absolute inset-x-5 bottom-5 sm:inset-x-8 sm:bottom-8">
            <div className="wellness-journey-caption rounded-default border-default p-5 backdrop-blur-xl sm:p-7">
              <span className="text-caption font-semibold uppercase tracking-[0.18em] text-primary">
                Make room for yourself
              </span>
              <p className="text-subheading mt-3 max-w-sm text-text">
                Small changes. More mindful days.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}