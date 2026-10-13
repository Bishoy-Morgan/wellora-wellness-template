"use client";

import {
  Activity,
  Brain,
  HeartPulse,
  Leaf,
  MoonStar,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const WELLNESS_AREAS: {
  title: string;
  description: string;
  icon: LucideIcon;
  number: string;
}[] = [
  {
    title: "Preventive Care",
    description:
      "Build healthier habits and take proactive steps toward long-term wellbeing.",
    icon: ShieldCheck,
    number: "01",
  },
  {
    title: "Mental Wellbeing",
    description:
      "Create space for mindfulness, emotional balance, and a calmer everyday life.",
    icon: Brain,
    number: "02",
  },
  {
    title: "Nutrition",
    description:
      "Discover a more balanced approach to nourishing your body and mind.",
    icon: Leaf,
    number: "03",
  },
  {
    title: "Movement",
    description:
      "Find enjoyable ways to stay active, improve mobility, and build strength.",
    icon: Activity,
    number: "04",
  },
  {
    title: "Rest & Recovery",
    description:
      "Make quality rest part of your routine and support your body's recovery.",
    icon: MoonStar,
    number: "05",
  },
  {
    title: "Whole-Person Health",
    description:
      "Bring everyday wellness practices together for a more balanced lifestyle.",
    icon: HeartPulse,
    number: "06",
  },
];

const CARD_TRANSITION = {
  duration: 0.55,
  ease: "easeOut" as const,
};

export default function WellnessAreas() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.12,
  });

  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      id="wellness-areas-section"
      aria-labelledby="wellness-areas-title"
      className="wellness-areas-section relative isolate w-full overflow-hidden py-20 sm:py-24 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="gradient-bg pointer-events-none absolute inset-x-0 top-0 -z-10 h-1/2"
      />

      <div
        aria-hidden="true"
        className="logo-decoration pointer-events-none absolute -bottom-12 -right-10 -z-10 hidden h-52 w-80 rounded-4xl border border-border sm:block"
      />

      <div
        aria-hidden="true"
        className="logo-decoration pointer-events-none absolute -bottom-12 right-[40%] -z-10 hidden h-52 w-120 rounded-4xl border border-border lg:block"
      />

      <div className="container-main">
        <motion.div
          initial={
            shouldReduceMotion ? false : { opacity: 0, y: 24 }
          }
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={CARD_TRANSITION}
          className="mx-auto mb-12 max-w-3xl text-center sm:mb-16 lg:mb-20"
        >
          <span className="mb-4 inline-flex items-center gap-2 text-caption font-semibold uppercase tracking-[0.2em] text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Your wellbeing, reimagined
          </span>

          <h2
            id="wellness-areas-title"
            className="text-heading text-text"
          >
            Small steps toward a <span className="text-primary">healthier you.</span>
          </h2>

          <p className="text-body mx-auto mt-5 max-w-2xl text-secondary sm:mt-6">
            Wellbeing is more than one habit. Explore the areas that help you
            feel better, live more intentionally, and build a healthier
            everyday routine.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {WELLNESS_AREAS.map((area, index) => {
            const Icon = area.icon;

            return (
              <motion.article
                key={area.number}
                initial={
                  shouldReduceMotion
                    ? false
                    : { opacity: 0, y: 24 }
                }
                animate={
                  inView
                    ? { opacity: 1, y: 0 }
                    : undefined
                }
                transition={{
                  ...CARD_TRANSITION,
                  delay: shouldReduceMotion ? 0 : index * 0.08,
                }}
                className="wellness-area-card group relative flex min-h-64 flex-col rounded-default border-default p-6 sm:min-h-72 sm:p-7 lg:p-8"
              >
                <div className="mb-8 flex items-start justify-between">
                  <span className="wellness-area-icon flex h-12 w-12 items-center justify-center rounded-default border-default text-primary transition-default group-hover:-translate-y-1">
                    <Icon size={23} strokeWidth={1.6} aria-hidden="true" />
                  </span>

                  <span className="text-caption text-muted">
                    {area.number}
                  </span>
                </div>

                <h3 className="text-subheading text-text">
                  {area.title}
                </h3>

                <p className="text-body mt-3 text-secondary">
                  {area.description}
                </p>

                <div
                  aria-hidden="true"
                  className="wellness-area-line mt-auto pt-7"
                >
                  <span />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}