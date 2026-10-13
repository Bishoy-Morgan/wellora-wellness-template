"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Heart } from "lucide-react";
import bg from "@/public/images/blackB.jpg";
import FormComp from "./FormComp";

const SECTION_TRANSITION = {
  duration: 0.8,
  ease: "easeOut" as const,
};

const MARQUEE_TEXT =
  "A little more balance. A little more care. A healthier you.";

export default function WellnessContact() {
  const [load, setLoad] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="contact-section"
      className="wellness-contact-section w-full overflow-hidden"
      aria-labelledby="wellness-contact-title"
    >
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={SECTION_TRANSITION}
        className="relative w-full px-[3%] py-8 sm:py-10 lg:py-12"
      >
        <div className="wellness-contact-panel absolute inset-y-0 left-0 right-0 overflow-hidden rounded-tl-4xl rounded-br-4xl sm:rounded-tl-[2.5rem] sm:rounded-br-[2.5rem]">
          <Image
            src={bg}
            alt=""
            fill
            sizes="94vw"
            quality={90}
            className="hidden object-cover lg:block"
          />
          <div className="absolute inset-0 bg-background/25" />
        </div>

        <div className="relative z-10 grid w-full grid-cols-1 gap-12 px-[2%] py-10 sm:px-[3%] sm:py-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:px-[2%] lg:py-[5%] xl:gap-20">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ ...SECTION_TRANSITION, delay: 0.1 }}
            className="flex flex-col items-start"
          >
            <span className="mb-6 flex items-center gap-2 text-caption font-semibold uppercase tracking-[0.2em] text-primary">
              <Heart size={15} aria-hidden="true" />
              Your wellbeing matters
            </span>

            <h2
              id="wellness-contact-title"
              className="text-heading max-w-3xl text-text"
            >
              Ready to make
              <br className="hidden sm:block" />{" "}
              <span className="text-primary">time for yourself?</span>
            </h2>

            <p className="text-body mt-6 max-w-xl text-secondary">
              Every wellness journey starts somewhere. Reach out to explore
              healthier habits, find your balance, and discover what wellbeing
              can look like for you.
            </p>

            <div className="mt-8 flex items-center gap-3 text-small text-secondary sm:mt-10">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-default text-primary">
                <Heart size={18} strokeWidth={1.6} aria-hidden="true" />
              </span>
              <span>Small steps. Sustainable habits. More mindful living.</span>
            </div>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ ...SECTION_TRANSITION, delay: 0.2 }}
            className="wellness-contact-form relative flex min-w-0 flex-col rounded-tl-[1.75rem] rounded-br-[1.75rem] p-5 sm:p-8 lg:p-7 xl:p-9"
          >
            <span className="text-caption font-semibold uppercase tracking-[0.18em] text-primary">
              Get in touch
            </span>

            <h3 className="text-subheading mt-3 text-text">
              Let’s start a conversation.
            </h3>

            <p className="text-body mt-3 text-secondary">
              Tell us what you have in mind, and we’ll help you take the next
              step.
            </p>

            <div className="mt-7">
              <FormComp formName="bottomForm" setLoad={setLoad} />
            </div>

            <button
              type="submit"
              form="bottomForm"
              disabled={load}
              className="wellness-contact-submit mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl cursor-pointer px-5 py-3 text-main font-semibold transition-default disabled:cursor-not-allowed disabled:opacity-50 sm:w-fit sm:min-w-40 "
            >
              {load ? (
                <>
                  <span className="loader" aria-hidden="true" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <span>Send a message</span>
                  <ArrowUpRight size={19} aria-hidden="true" />
                </>
              )}
            </button>

            <p className="text-caption mt-4 text-muted">
              We appreciate you reaching out.
            </p>
          </motion.div>
        </div>
      </motion.div>

      <div
        className="wellness-contact-marquee relative flex w-full items-center overflow-hidden py-8 sm:py-10 lg:py-14"
        aria-label={MARQUEE_TEXT}
      >
        <motion.div
          className="flex w-max shrink-0 items-center"
          animate={
            shouldReduceMotion
              ? undefined
              : { x: ["0%", "-50%"] }
          }
          transition={{
            duration: 28,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {[0, 1].map((copy) => (
            <div
              key={copy}
              aria-hidden={copy === 1}
              className="flex shrink-0 items-center"
            >
              <span className="text-hero whitespace-nowrap px-6 text-text sm:px-10 lg:px-14">
                {MARQUEE_TEXT}
              </span>
              <Heart
                size={30}
                strokeWidth={1.2}
                className="mr-6 shrink-0 text-primary sm:mr-10 lg:mr-14"
                aria-hidden="true"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}