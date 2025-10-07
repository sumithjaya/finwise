"use client";

import React, { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { GrLocation } from "react-icons/gr";

import styles from "./Featured.module.css";

type Adviser = {
  name: string;
  dept: string;
  city: string;
  state: string;
  img: string;
};

const ADVISERS: Adviser[] = [
  { name: "Carla Press", dept: "Wealth Management", city: "Sydney", state: "NSW", img: "/images/adviser01.jpg" },
  { name: "Oliver Kent", dept: "Retirement Planning", city: "Melbourne", state: "VIC", img: "/images/adviser02.jpg" },
  { name: "Maya Singh", dept: "Superannuation", city: "Brisbane", state: "QLD", img: "/images/adviser03.jpg" },
  { name: "Henry Cole", dept: "Tax Strategy", city: "Perth", state: "WA", img: "/images/adviser04.jpg" },
  { name: "Sophia Lee", dept: "Estate Planning", city: "Adelaide", state: "SA", img: "/images/adviser01.jpg" },
  { name: "James Carter", dept: "Wealth Management", city: "Hobart", state: "TAS", img: "/images/adviser02.jpg" },
  { name: "Emily Johnson", dept: "Insurance", city: "Darwin", state: "NT", img: "/images/adviser03.jpg" },
  { name: "Liam Brown", dept: "Investment Advisory", city: "Canberra", state: "ACT", img: "/images/adviser04.jpg" },
  { name: "Isabella White", dept: "Retirement Planning", city: "Gold Coast", state: "QLD", img: "/images/adviser01.jpg" },
  { name: "Noah Wilson", dept: "Tax Strategy", city: "Newcastle", state: "NSW", img: "/images/adviser02.jpg" },
  { name: "Ava Martin", dept: "Superannuation", city: "Geelong", state: "VIC", img: "/images/adviser03.jpg" },
  { name: "Ethan Harris", dept: "Estate Planning", city: "Wollongong", state: "NSW", img: "/images/adviser04.jpg" },
];

export default function Featured()  {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    loop: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off?.("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.panel}>
        <div className={`${styles.header} text-center`}>
          <h2 className={styles.h2}>
            Featured <span className={styles.accent}>Advisers</span>
          </h2>
          <p className={styles.lead}>
            One disadvantage of Lorum Ipsum is that in Latin certain letters
            appear more frequently than others — which creates a distinct visual impression.
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.embla} ref={emblaRef}>
            <div className={styles.embla__container}>
              {ADVISERS.map((a, idx) => (
                <div className={styles.embla__slide} key={`${a.name}-${idx}`}>
                  <div className={styles.card}>
                    <div className={styles.outerWrapper}>
                      <div className={styles.border} />
                      <div
                        className={styles.avatar}
                        // dynamic background image stays inline because it's per-item
                        style={{ backgroundImage: `url("${a.img}")` }}
                        role="img"
                        aria-label={`${a.name} avatar`}
                      />
                    </div>

                    <h4 className={styles.ftr_card_title}>{a.name}</h4>
                    <div className={styles.ftr_card_dep}>{a.dept}</div>

                    <div className={styles.locationRow}>
                      <GrLocation className={styles.locationIcon} />
                      <div className={styles.locationText}>{a.city} {a.state}</div>
                    </div>

                    <button className={styles.viewBtn}>View Profile</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className={styles.dots}>
            {scrollSnaps.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === selectedIndex ? styles.dotActive : ""}`}
                onClick={() => emblaApi?.scrollTo(i)}
                aria-label={`Go to slide ${i + 1}`}
              >
                <div className={styles.dotFill} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
