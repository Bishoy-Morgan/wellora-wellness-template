
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import HERO_IMAGE from "@/public/images/5.jpg";

const HERO_TRANSITION = {
  duration: 0.8,
  ease: "easeOut" as const,
};

export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={HERO_TRANSITION}
      aria-labelledby="hero-title"
      className="relative isolate flex h-dvh w-full items-center overflow-hidden bg-background px-4 py-24 sm:px-6 lg:px-12"
    >
      <div className="absolute inset-0 -z-20">
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          sizes="100vw"
          quality={90}
          className="object-cover object-center"
        />
      </div>

      <div className="absolute inset-0 -z-10 bg-black/55" />

      <div className="absolute inset-0 -z-10 bg-linear-to-r from-black/85 via-black/25 to-transparent" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: shouldReduceMotion ? 0 : 0.15,
              delayChildren: shouldReduceMotion ? 0 : 0.1,
            },
          },
        }}
        className="container-main flex w-full flex-col items-start text-left"
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
            visible: {
              opacity: 1,
              y: 0,
              transition: HERO_TRANSITION,
            },
          }}
          className="mb-6 flex items-center gap-3"
        >
          <span className="h-px w-8 bg-primary" />
          <span className="text-caption uppercase tracking-[0.18em] text-white/80">
            Your wellbeing, reimagined
          </span>
        </motion.div>

        <motion.h1
          id="hero-title"
          variants={{
            hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: HERO_TRANSITION,
            },
          }}
          className="text-hero max-w-4xl text-white"
        >
          Your Journey to Better{" "}
          <span className="text-primary">Wellbeing</span>
        </motion.h1>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
            visible: {
              opacity: 1,
              y: 0,
              transition: HERO_TRANSITION,
            },
          }}
          className="text-main mt-6 max-w-xl text-white/80 sm:mt-8"
        >
          Discover a more balanced, healthier you with personalized care and
          wellness solutions designed around your needs.
        </motion.p>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
            visible: {
              opacity: 1,
              y: 0,
              transition: HERO_TRANSITION,
            },
          }}
          className="mt-8 sm:mt-10"
        >
          <Link
            href="/?showPopup=true"
            className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-primary px-7 py-4 text-small font-semibold text-primary-foreground transition-colors duration-300 hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            Start Your Wellness Journey
            <ArrowUpRight
              size={18}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}