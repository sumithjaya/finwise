"use client";

import React from "react";
import Image from "next/image";
import styles from "./HowItWorks.module.css";
import RevealStagger from "./ui/RevealStagger";

export default function HowItWorks() {
  return (
    <RevealStagger stagger={200}>
      <div className={styles.how_it_works_container}>
        <section className={styles.how_it_works_section}>
          <div>
            <div className={`${styles.text_center} text-center p-10`}>
              <h2 className={styles.heading}>
                How It{" "}
                <span className={styles.accent}>
                  Works
                </span>
              </h2>

              <p className={styles.lead}>
                There is now an abundance of readable dummy texts. These are
                usually used when a text is required
              </p>
            </div>

            <div className={styles.inner_padding}>
              <div
                className={`${styles.bullets_row} flex`}
                style={{
                  backgroundImage: 'url("/images/svg/curvedline.svg")',
                }}
              >
                <div className={styles.bullet_column}>
                  <div className={styles.circle_wrapper}>
                    <Image
                      src={"/images/svg/doc-search.svg"}
                      alt="doc search icon"
                      width={49}
                      height={49}
                      draggable={false}
                    />
                  </div>
                  <div className={styles.howitworks_bullet_text}>
                    Tell us a little about yourself and what sort of help you
                    are looking for
                  </div>
                </div>

                <div className={styles.bullet_column}>
                  <div
                    className={`${styles.circle_wrapper} ${styles.howitworks_bullet_icon}`}
                  >
                    <Image
                      src={"/images/svg/bookjournal.svg"}
                      alt="book journal icon"
                      width={49}
                      height={49}
                      draggable={false}
                    />
                  </div>
                  <div className={styles.howitworks_bullet_text}>
                    Receive your Free Wealth Journal/Financial Plan
                  </div>
                </div>

                <div className={styles.bullet_column}>
                  <div className={styles.circle_wrapper}>
                    <Image
                      src={"/images/svg/user-tick.svg"}
                      alt="user tick icon"
                      width={49}
                      height={49}
                      draggable={false}
                    />
                  </div>
                  <div className={styles.howitworks_bullet_text}>
                    Get matched with a Qualified Financial Expert
                  </div>
                </div>

                <div className={styles.bullet_column}>
                  <div className={styles.circle_wrapper}>
                    <Image
                      src={"/images/svg/book.svg"}
                      alt="book icon"
                      width={49}
                      height={49}
                      draggable={false}
                    />
                  </div>
                  <div className={styles.howitworks_bullet_text}>
                    Book a no obligation call and have your questions answered
                    and plan updated.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </RevealStagger>
  );
}
