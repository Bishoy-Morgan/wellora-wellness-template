"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  Brain,
  HeartPulse,
  Leaf,
  MoonStar,
  Sparkles,
  Activity,
  type LucideIcon,
} from "lucide-react";
import bg from "@/public/images/blackLinedBg.png";

const SERVICES: {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    id: 1,
    title: "Personalized Wellness",
    description:
      "Explore wellness routines shaped around your goals, lifestyle, and everyday needs.",
    icon: HeartPulse,
  },
  {
    id: 2,
    title: "Mind & Mental Balance",
    description:
      "Make time for mindfulness, stress management, and a calmer approach to daily life.",
    icon: Brain,
  },
  {
    id: 3,
    title: "Nutrition & Healthy Living",
    description:
      "Build sustainable habits around balanced nutrition, movement, and feeling your best.",
    icon: Leaf,
  },
  {
    id: 4,
    title: "Rest & Better Sleep",
    description:
      "Discover simple ways to improve your evening routine and make room for recovery.",
    icon: MoonStar,
  },
  {
    id: 5,
    title: "Everyday Self-Care",
    description:
      "Create meaningful moments for yourself with simple, mindful self-care practices.",
    icon: Sparkles,
  },
  {
    id: 6,
    title: "Movement & Vitality",
    description:
      "Find approachable ways to stay active, improve mobility, and build consistency.",
    icon: Activity,
  },
];

const SECTION_TRANSITION = {
  duration: 0.7,
  ease: "easeOut" as const,
};

export default function WellnessServices() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      id="services-section"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={SECTION_TRANSITION}
      aria-labelledby="wellness-services-title"
      className="wellness-services-section relative isolate w-full overflow-hidden py-20 sm:py-24 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 -z-20">
        <Image
          src={bg}
          alt=""
          fill
          sizes="100vw"
          quality={90}
          className="object-cover"
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-background/45"
      />

      <div className="relative mx-auto grid w-full grid-cols-1 gap-10 px-[3%] lg:grid-cols-[1.05fr_1fr] lg:gap-14 xl:gap-20">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...SECTION_TRANSITION, delay: 0.15 }}
          className="flex flex-col items-start lg:sticky lg:top-28 lg:h-fit"
        >
          <span className="mb-5 text-caption font-semibold uppercase tracking-[0.2em] text-primary">
            Wellness services
          </span>

          <h2
            id="wellness-services-title"
            className="text-heading max-w-2xl text-text"
          >
            Make space for a{" "}
            <span className="text-primary">healthier you.</span>
          </h2>

          <p className="text-body mt-5 max-w-xl text-secondary sm:mt-6">
            Wellbeing is personal. Explore practical ways to care for your
            mind and body, develop healthier habits, and bring more balance
            into your everyday life.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 sm:mt-10">
            <span className="wellness-services-tag rounded-full border-default px-4 py-2 text-small text-secondary">
              Mindfulness
            </span>
            <span className="wellness-services-tag rounded-full border-default px-4 py-2 text-small text-secondary">
              Healthy habits
            </span>
            <span className="wellness-services-tag rounded-full border-default px-4 py-2 text-small text-secondary">
              Self-care
            </span>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: shouldReduceMotion ? 0 : 0.12,
                delayChildren: shouldReduceMotion ? 0 : 0.2,
              },
            },
          }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
        >
          {SERVICES.map((service) => {
            const Icon = service.icon;

            return (
              <motion.article
                key={service.id}
                variants={{
                  hidden: {
                    opacity: 0,
                    y: shouldReduceMotion ? 0 : 22,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: SECTION_TRANSITION,
                  },
                }}
                className="wellness-service-card group flex min-h-56 flex-col rounded-tl-[1.75rem] rounded-br-[1.75rem] border-default p-6 sm:min-h-60 sm:p-7"
              >
                <div className="mb-6 flex items-center justify-between">
                  <span className="wellness-service-icon flex h-12 w-12 items-center justify-center rounded-2xl text-primary transition-default group-hover:-translate-y-1">
                    <Icon size={23} strokeWidth={1.6} aria-hidden="true" />
                  </span>

                  <span className="text-caption text-muted">
                    {String(service.id).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="text-main font-semibold text-text">
                  {service.title}
                </h3>

                <p className="text-body mt-3 text-secondary">
                  {service.description}
                </p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}