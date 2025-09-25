"use client";
import useEmblaCarousel from "embla-carousel-react";
import { GrLocation } from "react-icons/gr";
import { useEffect, useState, useCallback } from "react";
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

export default function Featured() {
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
  }, [emblaApi, onSelect]);

  return (
    <div style={{ padding: "20px 100px", width: "100%" }}>
      <div style={{ backgroundColor: "#e8f8f6ff", borderRadius: "30px", width: "100%" }}>
        <div className="text-center p-10 pb-0 mb-1">
          <h2 style={{ fontSize: "40px", fontWeight: 500 }}>
            Featured{" "}
            <span style={{ color: "#137C7A", fontWeight: 800, fontStyle: "italic" }}>
              Advisers
            </span>
          </h2>
          <p style={{ fontSize: "16px", fontWeight: 400, color: "#545454" }}>
            One disadvantage of Lorum Ipsum is that in Latin certain letters
            appear more frequently than others — which creates a distinct visual impression.
          </p>
        </div>

        <div style={{   padding: "50px", borderRadius: "0 0 30px 30px" }}>
          <div className={styles.embla} ref={emblaRef}>
            <div className={styles.embla__container}>
              {ADVISERS.map((a, idx) => (
                <div className={styles.embla__slide} key={`${a.name}-${idx}`}>
                  <div className={styles.card}>
                    <div className={styles.outerWrapper}>
                      <div className={styles.border} />
                      <div className={styles.inner}>
                        <div
                          style={{
                            backgroundImage: `url("${a.img}")`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            width: "100%",
                            height: "100%",
                            borderRadius: "50%",
                          }}
                        />
                      </div>
                    </div>

                    <h4 className={styles.ftr_card_title}>{a.name}</h4>
                    <div className={styles.ftr_card_dep}>{a.dept}</div>
                    <div className={styles.locationRow}>
                      <GrLocation />
                      <div>{a.city} {a.state}</div>
                    </div>
                    <button className={styles.viewBtn}>View Profile</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots below */}
          <div className={styles.dots}>
            {scrollSnaps.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === selectedIndex ? styles.dotActive : ""}`}
                onClick={() => emblaApi?.scrollTo(i)}
              >
                <div className={styles.dotFill}></div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
