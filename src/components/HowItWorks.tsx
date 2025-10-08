"use client";
import Image from "next/image";
import styles from "./HowItWorks.module.css";
import RevealStagger from "./ui/RevealStagger";

export default function HowItWorks() {
  return (
    <RevealStagger stagger={200}>
      <div className={styles.howitworks_container}>
        <section className={styles.howitworks_section}>
          <div>
            <div className={styles.howitworks_header}>
              <h2 className={styles.howitworks_title}>
                How It{" "}
                <span className={styles.howitworks_title_highlight}>Works</span>
              </h2>
              <p className={styles.howitworks_subtitle}>
                There is now an abundance of readable dummy texts. These are
                usually used when a text is required
              </p>
            </div>

            <div className={styles.howitworks_bullets_wrapper}>
              <div className={styles.howitworks_bullets}>
                <div
                  className={`${styles.howitworks_bullet} ${styles.howitworks_bullet_top1}`}
                >
                  <div className={styles.howitworks_bullet_icon_wrapper}>
                    <Image
                      src={"./images/svg/doc-search.svg"}
                      alt="book icon"
                      width={49}
                      height={49}
                      draggable={false}
                      className={styles.howitworks_bullet_icon}
                    />
                    <Image
                      src={"./images/svg/doc-search.svg"}
                      alt="book icon"
                      width={28}
                      height={28}
                      draggable={false}
                      className={styles.howitworks_bullet_icon_mobile}
                    />
                  </div>
                  <div className={styles.howitworks_bullet_text}>
                    Tell us a little about yourself and what sort of help you
                    are looking for
                  </div>
                </div>

                <div className={styles.howitworks_bullet}>
                  <div className={styles.howitworks_bullet_icon_wrapper}>
                    <Image
                      src={"./images/svg/bookjournal.svg"}
                      alt="book icon"
                      width={49}
                      height={49}
                      draggable={false}
                      className={styles.howitworks_bullet_icon}
                    />
                    <Image
                      src={"./images/svg/bookjournal.svg"}
                      alt="book icon"
                      width={28}
                      height={28}
                      draggable={false}
                      className={styles.howitworks_bullet_icon_mobile}
                    />
                  </div>
                  <div className={styles.howitworks_bullet_text}>
                    Receive your Free Wealth Journal/Financial Plan
                  </div>
                </div>

                <div
                  className={`${styles.howitworks_bullet} ${styles.howitworks_bullet_top2}`}
                >
                  <div className={styles.howitworks_bullet_icon_wrapper}>
                    <Image
                      src={"./images/svg/user-tick.svg"}
                      alt="book icon"
                      width={49}
                      height={49}
                      draggable={false}
                      className={styles.howitworks_bullet_icon}
                    />{" "}
                    <Image
                      src={"./images/svg/user-tick.svg"}
                      alt="book icon"
                      width={28}
                      height={28}
                      draggable={false}
                      className={styles.howitworks_bullet_icon_mobile}
                    />
                  </div>
                  <div className={styles.howitworks_bullet_text}>
                    Get matched with a Qualified Financial Expert
                  </div>
                </div>

                <div
                  className={`${styles.howitworks_bullet} ${styles.howitworks_bullet_top3}`}
                >
                  <div className={styles.howitworks_bullet_icon_wrapper}>
                    <Image
                      src={"./images/svg/book.svg"}
                      alt="book icon"
                      width={49}
                      height={49}
                      draggable={false}
                      className={styles.howitworks_bullet_icon}
                    />{" "}
                    <Image
                      src={"./images/svg/book.svg"}
                      alt="book icon"
                      width={28}
                      height={28}
                      draggable={false}
                      className={styles.howitworks_bullet_icon_mobile}
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
