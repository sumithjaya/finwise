"use client";
import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import styles from "./Testimonials.module.css";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Lorem Ipsum is simply dummy text of the printing and industry. It has been the standard ever since the 1500s—reliable, clear, and timeless.",
    name: "Henry Paddington",
    role: "Designer",
  },
  {
    quote:
      "We shipped 2x faster after adopting their workflow. Support is on point and the docs are refreshingly direct.",
    name: "Amaya Perera",
    role: "Product Manager",
  },
  {
    quote:
      "From onboarding to scaling, everything felt thoughtfully engineered. Zero fluff—just results.",
    name: "Liam Chen",
    role: "CTO",
  },
  {
    quote:
      "Our team finally has a single source of truth. The ROI was obvious within the first week.",
    name: "Sofia Martínez",
    role: "Head of Operations",
  },
];

// Animation variants
const makeVariants = (prefersReduced: boolean) =>
  prefersReduced
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        enter: (dir: number) => ({
          x: dir > 0 ? 40 : -40,
          opacity: 0,
          filter: "blur(2px)",
        }),
        center: { x: 0, opacity: 1, filter: "blur(0px)" },
        exit: (dir: number) => ({
          x: dir < 0 ? 40 : -40,
          opacity: 0,
          filter: "blur(2px)",
        }),
      };

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = next, -1 = prev
  const prefersReducedMotion = useReducedMotion();
  const variants = makeVariants(!!prefersReducedMotion);

  const prev = useCallback(() => {
    setDirection(-1);
    setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  const next = useCallback(() => {
    setDirection(1);
    setIndex((i) => (i + 1) % TESTIMONIALS.length);
  }, []);

  const t = TESTIMONIALS[index];

  return (
    <div
      style={{ display: "flex"  }}
      className={styles.testi_main_container}
      aria-roledescription="carousel"
      aria-label="Customer testimonials"
    >
      {/* Left illustration / figure */}
      <div style={{ flex: 1 }} className={styles.tst_figure_container}>
        <div className={styles.tst_figure_back} />
        <div style={{ position: "absolute", top: 140, left: 130 }}>
          <Image
            src="/images/quaters-green.png"
            alt=""
            width={110}
            height={656}
            priority
          />
        </div>
        <div style={{ position: "absolute", bottom: -50, right: 50, zIndex: -2 }}>
          <Image
            src="/images/svg/dot-grid.svg"
            alt=""
            width={110}
            height={656}
            priority
          />
        </div>
        <div style={{ width: "451px", height: "670px", overflow: "hidden" }}>
          <Image
            src="/images/Testimonial_figure.png"
            alt="Customer success illustration"
            width={451}
            height={656}
            priority
          />
        </div>
      </div>

      {/* Right content */}
      <div style={{ flex: 1 ,height:'100%',padding:'120px',display:'flex',flexDirection:'column', justifyContent:'space-between' }}>
        <div style={{ fontWeight: 700, fontSize: "25px", color: "#137C7A" }}>
          — Testimonial
        </div>
        <div>
          <div style={{ fontSize: "40px", fontWeight: 500 }}>
            What Our{" "}
            <span
              style={{ color: "#137C7A", fontStyle: "italic", fontWeight: 800 }}
            >
              Customer’s Say
            </span>
          </div>
        </div>

        {/* Animated content container */}
        <div
          className={`${styles.tst_conatiner} ${styles.tst_anim_wrap}`}
          role="group"
          aria-live="polite"
          aria-atomic="true"

        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <div className={styles.tst_content}>{t.quote}</div>
              <div className={styles.tst_customer_name}>{t.name}</div>
              <div className={styles.tst_customer_designation}>{t.role}</div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div
          style={{
            width: "15%",
            display: "flex",
            justifyContent: "space-between",
            paddingTop: "50px",
          }}
        >
          <button
            type="button"
            className={styles.pre_button}
            onClick={prev}
            aria-label="Previous testimonial"
          >
            <svg
              width="24"
              height="8"
              viewBox="0 0 24 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M23 7L2 7L6.95506 1"
                stroke="#1F1F1F"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <button
            type="button"
            className={styles.pre_button}
            onClick={next}
            aria-label="Next testimonial"
          >
            <svg
              width="24"
              height="8"
              viewBox="0 0 24 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M1 7H22L17.0449 1"
                stroke="#137C7A"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div>
        <Image src="/images/svg/star01.svg" alt="" width={52} height={63} priority />
      </div>
    </div>
  );
}
