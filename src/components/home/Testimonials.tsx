"use client";
import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import styles from "./Testimonials.module.css";

type Testimonial = {
  Testimonial: string;
  ClientName: string;
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
  console.log("strapiUrl for testimonials", strapiUrl);
  const apiToken = process.env.STRAPI_API_TOKEN;

  try {
    const url = `${strapiUrl}/api/wealfy-testimonials?populate=*&sort=publishedAt:desc&pagination[limit]=10`;
    const headers: HeadersInit = { "Content-Type": "application/json" };
    if (apiToken) headers["Authorization"] = `Bearer ${apiToken}`;

    const response = await fetch(url, { headers, cache: "no-store" });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText} - ${errorText}`);
    }
    const data: StrapiResponse = await response.json();
    return data.data ?? [];
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    throw error;
  }
}

const makeVariants = (prefersReduced: boolean) =>
  prefersReduced
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0, filter: "blur(2px)" }),
        center: { x: 0, opacity: 1, filter: "blur(0px)" },
        exit: (dir: number) => ({ x: dir < 0 ? 40 : -40, opacity: 0, filter: "blur(2px)" }),
      };

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const prefersReducedMotion = useReducedMotion();
  const variants = makeVariants(!!prefersReducedMotion);

  const [TESTIMONIALS, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

   // Swipe detection states
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  // Fetch testimonials
  useEffect(() => {
    let mounted = true;
    const fetchTestimonials = async () => {
      setLoading(true);
      setError(null);
      try {
        const testimonials = await getTestimonials();
        if (!mounted) return;
        setTestimonials(testimonials);
      } catch (err: any) {
        if (!mounted) return;
        setError(err?.message || "Failed to fetch testimonials.");
        setTestimonials([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchTestimonials();
    return () => {
      mounted = false;
    };
  }, []);

  // Reset index if testimonials array changes (prevents out-of-bounds)
  useEffect(() => {
    if (TESTIMONIALS.length === 0) {
      setIndex(0);
    } else {
      setIndex((cur) => Math.min(cur, TESTIMONIALS.length - 1));
    }
  }, [TESTIMONIALS.length]);

  // Prev / Next handlers (depend on testimonials length)
  const prev = useCallback(() => {
    if (TESTIMONIALS.length <= 1) return;
    setDirection(-1);
    setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, [TESTIMONIALS.length]);

  const next = useCallback(() => {
    if (TESTIMONIALS.length <= 1) return;
    setDirection(1);
    setIndex((i) => (i + 1) % TESTIMONIALS.length);
  }, [TESTIMONIALS.length]);

   // Swipe handlers
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    if (TESTIMONIALS.length <= 1) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      next();
    }
    if (isRightSwipe) {
      prev();
    }
  };
  
  // Optional: auto-advance every 6s (comment out if you don't want it)
  /*
  useEffect(() => {
    if (TESTIMONIALS.length <= 1) return;
    const iv = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(iv);
  }, [TESTIMONIALS.length]);
  */

  // Current testimonial (guarded)
  const t = TESTIMONIALS.length ? TESTIMONIALS[index] : null;

  return (
    <div
      className={styles.testi_main_container}
      aria-roledescription="carousel"
      aria-label="Customer testimonials"
      aria-busy={loading ? "true" : "false"}
    >
      {/* left illustration (unchanged) */}
      <div className={styles.tst_figure_container}>
        <div className={styles.tst_figure_back} />
        <div className={styles.tst_figure_img_top}>
          <Image src="/images/quaters-green.png" alt="" width={110} height={656} priority />
        </div>
        <div className={styles.tst_figure_img_bottom}>
          <Image src="/images/svg/dot-grid.svg" alt="" width={110} height={656} priority />
        </div>
        <div className={styles.tst_figure_img_main}>
          <Image src="/images/Testimonial_figure.png" alt="Customer success illustration" width={451} height={656} priority />
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
          {/* Loading skeleton */}
          {loading ? (
            <div className={styles.tst_skeleton} aria-hidden="true">
              <div className={styles.skel_large} />
              <div className={styles.skel_name} />
              <div className={styles.skel_role} />
            </div>
          ) : error ? (
            // Error state
            <div className={styles.tst_error} role="status">
              <p>Sorry — could not load testimonials.</p>
              <small>{error}</small>
            </div>
          ) : !t ? (
            // Empty state
            <div className={styles.tst_empty} role="status">
              <p>No testimonials available yet.</p>
            </div>
          ) : (
            // Normal content (animated)
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
                <div className={styles.tst_content}>{t.Testimonial}</div>
                <div className={styles.tst_customer_name}>{t.ClientName}</div>
                <div className={styles.tst_customer_designation}>{t.role}</div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        <div className={styles.testimonial_buttons}>
          <button
            type="button"
            className={`${styles.pre_button} ${TESTIMONIALS.length <= 1 ? styles.disabled : ""}`}
            onClick={prev}
            aria-label="Previous testimonial"
            disabled={TESTIMONIALS.length <= 1 || loading}
          >
            {/* svg left */}
            <svg width="24" height="8" viewBox="0 0 24 8" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
              <path d="M23 7L2 7L6.95506 1" stroke="#1F1F1F" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          <button
            type="button"
            className={`${styles.pre_button} ${TESTIMONIALS.length <= 1 ? styles.disabled : ""}`}
            onClick={next}
            aria-label="Next testimonial"
            disabled={TESTIMONIALS.length <= 1 || loading}
          >
            {/* svg right */}
            <svg width="24" height="8" viewBox="0 0 24 8" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
              <path d="M1 7H22L17.0449 1" stroke="#137C7A" strokeWidth="1.5" strokeLinecap="round" />
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
