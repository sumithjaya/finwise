"use client";

import Image from "next/image";
import styles from "./AdviserHero.module.css";

export default function AdviserHero() {
  return (
    <div className={styles.adviser_hero_container}>
      <div className={styles.adviser_hero_inner}>
        {/* Left side */}
        <div className={styles.adviser_hero_left}>
          <div className={styles.adviser_hero_greeting}>
            Hello World!{" "}
            <Image
              src="/images/wavinghand.png"
              alt="Scale hand illustration"
              width={24}
              height={24}
              priority
            />
          </div>
          <div className={styles.adviser_hero_name}>
            I’m{" "}
            <span>Carla Press,</span> Wealth Management Based in USA
          </div>
          <div className={styles.adviser_hero_tagline}>
            Helping you retire with confidence
          </div>
        </div>

        {/* Right side */}
        <div className={styles.adviser_hero_right}>
          <div className={styles.adviser_hero_blob} />
          <div className={styles.adviser_hero_image}>
            <Image
              src="/images/adviser-hero.png"
              alt="Scale hand illustration"
              width={459}
              height={559}
              priority
            />
          </div>
          <div className={styles.adviser_hero_svg}>
            <svg
              width="56"
              height="68"
              viewBox="0 0 56 68"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M28 68C28.399 34.8697 28.7181 34.4824 56 34C28.7181 33.5176 28.399 33.1303 28 0C27.601 33.1303 27.2819 33.5176 0 34C27.2819 34.4824 27.601 34.8697 28 68Z"
                fill="#137C7A"
                fillOpacity="0.4"
              />
            </svg>
          </div>
          <div className={styles.adviser_hero_element}>
            <Image
              src="/images/svg/element03.svg"
              alt="Scale hand illustration"
              width={146}
              height={559}
              priority
            />
          </div>
        </div>
      </div>
      {/* <Clientsblock/> */}
    </div>
  );
}
