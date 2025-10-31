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

type StrapiResponse = {
  data: Testimonial[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
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
function getStrapiUrl(): string {
  return (
    process.env.NEXT_PUBLIC_STRAPI_API_URL ||
    process.env.NEXT_PUBLIC_STRAPI_URL ||
    process.env.STRAPI_API_URL ||
    "http://localhost:1337"
  );
}
async function getTestimonials(): Promise<Testimonial[]> {
 const strapiUrl = getStrapiUrl();
  const apiToken = process.env.STRAPI_API_TOKEN;

  console.log("=== Strapi Fetch Debug ===");
  console.log("Strapi URL:", strapiUrl);
  console.log("API Token exists:", !!apiToken);
  console.log("API Token length:", apiToken?.length || 0);


  try {
     const url = `${strapiUrl}/api/wealfy-testimonials?populate=*&sort=publishedAt:desc&pagination[limit]=10`;
    console.log("Fetching from:", url);

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (apiToken) {
      headers["Authorization"] = `Bearer ${apiToken}`;
    }

    console.log("Request headers:", {
      ...headers,
      Authorization: apiToken ? "Bearer ***" : "none",
    });

    const response = await fetch(url, {
      headers,
      cache: "no-store",
    });

    console.log("Response status:", response.status);
    console.log("Response statusText:", response.statusText);
    console.log("Response ok:", response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response body:", errorText);
      throw new Error(
        `Failed to fetch: ${response.status} ${response.statusText}`
      );
    }

    const data: StrapiResponse = await response.json();
    return data.data;
  } catch (error) {
    console.error("=== Error Details ===");
    console.error("Error fetching blog posts:", error);
    return [];
  }
}
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
  const [direction, setDirection] = useState(1);
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
      className={styles.testi_main_container}
      aria-roledescription="carousel"
      aria-label="Customer testimonials"
    >
      {/* Left illustration / figure */}
      <div className={styles.tst_figure_container}>
        <div className={styles.tst_figure_back} />
        <div className={styles.tst_figure_img_top}>
          <Image
            src="/images/quaters-green.png"
            alt=""
            width={110}
            height={656}
            priority
          />
        </div>
        <div className={styles.tst_figure_img_bottom}>
          <Image
            src="/images/svg/dot-grid.svg"
            alt=""
            width={110}
            height={656}
            priority
          />
        </div>
        <div className={styles.tst_figure_img_main}>
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
      <div className={styles.tst_content_wrapper}>
        <div className={styles.tst_subtitle}>— Testimonial</div>
        <div className={styles.tst_title}>
          What Our <span>Customer’s Say</span>
        </div>

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

        <div className={styles.testimonial_buttons}>
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
