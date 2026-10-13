"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import KeenSlider, {
    type KeenSliderInstance,
} from "keen-slider";
import { motion, useReducedMotion } from "framer-motion";
import {
    ArrowLeft,
    ArrowRight,
    Quote,
    Sparkles,
} from "lucide-react";
import "keen-slider/keen-slider.min.css";
import bg from "@/public/images/blackLinedBg.png";
import man1 from "@/public/images/testimonials/man1.jpg";
import man2 from "@/public/images/testimonials/man2.jpg";
import man3 from "@/public/images/testimonials/man3.jpg";
import woman1 from "@/public/images/testimonials/woman1.jpg";
import woman2 from "@/public/images/testimonials/woman2.jpg";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Daniel",
    role: "Building healthier habits",
    category: "Daily wellness",
    image: man1,
    quote:
      "I started making small changes to my daily routine, and they have made a real difference. Wellness finally feels manageable rather than overwhelming.",
  },
  {
    id: 2,
    name: "Michael",
    role: "Finding everyday balance",
    category: "Mindful living",
    image: man2,
    quote:
      "The focus on simple, realistic practices helped me become more intentional with my time and find more balance in my everyday life.",
  },
  {
    id: 3,
    name: "James",
    role: "Making time to recharge",
    category: "Rest & recovery",
    image: man3,
    quote:
      "I have become more aware of the importance of rest. Creating a better evening routine has helped me make more space to slow down.",
  },
  {
    id: 4,
    name: "Olivia",
    role: "Prioritizing self-care",
    category: "Self-care",
    image: woman1,
    quote:
      "I used to put my own wellbeing last. Now I make time for small things that help me feel more grounded, refreshed, and present.",
  },
  {
    id: 5,
    name: "Sophia",
    role: "Creating a healthier routine",
    category: "Healthy living",
    image: woman2,
    quote:
      "I love how approachable everything feels. It is about making sustainable choices, not chasing perfection or changing everything overnight.",
  },
];

const SECTION_TRANSITION = {
  duration: 0.7,
  ease: "easeOut" as const,
};

export default function WellnessTestimonials() {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const sliderInstance = useRef<KeenSliderInstance | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderLoaded, setSliderLoaded] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const sliderElement = sliderRef.current;

    if (!sliderElement) return;

    const slider = new KeenSlider(sliderElement, {
      loop: true,
      slides: {
        perView: 1,
        spacing: 16,
      },
      created(instance) {
        setCurrentSlide(instance.track.details.rel);
        setSliderLoaded(true);
      },
      slideChanged(instance) {
        setCurrentSlide(instance.track.details.rel);
      },
    });

    sliderInstance.current = slider;

    return () => {
      slider.destroy();
      sliderInstance.current = null;
    };
  }, []);

  const slidePrev = () => sliderInstance.current?.prev();
  const slideNext = () => sliderInstance.current?.next();

  return (
    <motion.section
      id="testimonials-section"
      aria-labelledby="wellness-testimonials-title"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={SECTION_TRANSITION}
      className="wellness-testimonials-section relative isolate w-full overflow-hidden py-16 sm:py-20 lg:py-28"
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
        className="pointer-events-none absolute inset-0 -z-10 bg-background/55"
      />

      <div className="relative grid w-full grid-cols-1 gap-10 px-[3%] lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-14">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...SECTION_TRANSITION, delay: 0.1 }}
          className="flex flex-col items-start"
        >
          <span className="mb-5 flex items-center gap-2 text-caption font-semibold uppercase tracking-[0.2em] text-primary">
            <Sparkles size={15} aria-hidden="true" />
            Real stories, everyday wellbeing
          </span>

          <h2
            id="wellness-testimonials-title"
            className="text-heading max-w-3xl text-text"
          >
            Small changes.
            <br />
            <span className="text-primary">Meaningful progress.</span>
          </h2>

          <p className="text-body mt-5 max-w-xl text-secondary sm:mt-6">
            Everyone's wellness journey looks different. Discover how small,
            sustainable changes can help make everyday life feel more balanced.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 sm:mt-10">
            <span className="wellness-testimonial-tag rounded-full px-4 py-2 text-small text-secondary">
              Mind & body
            </span>
            <span className="wellness-testimonial-tag rounded-full px-4 py-2 text-small text-secondary">
              Healthy routines
            </span>
            <span className="wellness-testimonial-tag rounded-full px-4 py-2 text-small text-secondary">
              Everyday balance
            </span>
          </div>

          <div className="mt-10 flex items-center gap-3 sm:mt-12">
            <div className="flex -space-x-3">
              {TESTIMONIALS.slice(0, 4).map((person) => (
                <div
                  key={person.id}
                  className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-background"
                >
                  <Image
                    src={person.image}
                    alt=""
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            <p className="text-small text-secondary">
              Every journey starts with a small step.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ ...SECTION_TRANSITION, delay: 0.2 }}
          className="relative min-w-0"
        >
          <div ref={sliderRef} className="keen-slider w-full">
            {TESTIMONIALS.map((person, index) => (
              <div
                key={person.id}
                className="keen-slider__slide min-w-0"
              >
                <article className="wellness-testimonial-card relative flex min-h-124 flex-col overflow-hidden rounded-tl-4xl rounded-br-4xl sm:min-h-136 lg:min-h-148">
                  <div className="relative flex flex-1 flex-col justify-between p-6 sm:p-8 lg:p-10">
                    <div className="flex items-start justify-between gap-4">
                      <span className="wellness-testimonial-category rounded-full px-4 py-2 text-caption uppercase tracking-[0.12em] text-primary">
                        {person.category}
                      </span>

                      <Quote
                        size={34}
                        strokeWidth={1.3}
                        className="shrink-0 text-primary/70"
                        aria-hidden="true"
                      />
                    </div>

                    <motion.blockquote
                      key={`${person.id}-${currentSlide}`}
                      initial={
                        shouldReduceMotion ? false : { opacity: 0, y: 12 }
                      }
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: shouldReduceMotion ? 0 : 0.45,
                        delay: shouldReduceMotion ? 0 : 0.08,
                      }}
                      className="my-8"
                    >
                      <p className="text-subheading text-text">
                        “{person.quote}”
                      </p>
                    </motion.blockquote>

                    <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-6">
                      <div className="flex min-w-0 items-center gap-4">
                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
                          <Image
                            src={person.image}
                            alt={person.name}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        </div>

                        <div className="min-w-0">
                          <h3 className="text-main font-semibold text-text">
                            {person.name}
                          </h3>
                          <p className="text-small mt-1 text-secondary">
                            {person.role}
                          </p>
                        </div>
                      </div>

                      <span className="text-caption shrink-0 text-muted">
                        {String(person.id).padStart(2, "0")} /{" "}
                        {String(TESTIMONIALS.length).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between gap-4">
            <div
              className="flex items-center gap-2"
              aria-label={`Testimonial ${currentSlide + 1} of ${TESTIMONIALS.length}`}
            >
              {TESTIMONIALS.map((person, index) => (
                <button
                  key={person.id}
                  type="button"
                  aria-label={`Go to testimonial ${index + 1}`}
                  aria-current={currentSlide === index ? "true" : undefined}
                  onClick={() => sliderInstance.current?.moveToIdx(index)}
                  className={`wellness-testimonial-dot ${
                    currentSlide === index ? "is-active" : ""
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={slidePrev}
                disabled={!sliderLoaded}
                aria-label="Previous testimonial"
                className="wellness-testimonial-nav flex h-12 w-12 items-center justify-center rounded-xl border-default text-text transition-default hover:text-primary disabled:opacity-50"
              >
                <ArrowLeft size={19} aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={slideNext}
                disabled={!sliderLoaded}
                aria-label="Next testimonial"
                className="wellness-testimonial-nav flex h-12 w-12 items-center justify-center rounded-xl border-default text-text transition-default hover:text-primary disabled:opacity-50"
              >
                <ArrowRight size={19} aria-hidden="true" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
