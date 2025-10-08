"use client";
import Image from "next/image";
import styles from "./Whyfinwise.module.css";

export default function Whyfinwise() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.leftSection}>
        <div className={styles.leftSectionTitle}>
          Why <span>FinWise?</span>
        </div>
        <div className={styles.underlineContainer}>
          <div className={styles.underline}>
            <Image
              src="/images/svg/understrike.svg"
              alt="Underline"
              width={227}
              height={8}
              priority
            />
          </div>
        </div>
        <div className={styles.leftSectionText}>
          There is now an abundance of readable dummy texts. These are usually
          used when a text is required
        </div>
      </div>

      <div className={styles.cardsWrapper}>
        <div className={styles.cardContainer}>
          <div className={styles.cardBackgroundSmall} />
          <div className={styles.card}>
            <div className={styles.cardIconWrapper}>
              <Image
                src="/images/svg/scalehand.svg"
                alt="Scale hand illustration"
                width={52}
                height={52}
                priority
              />
            </div>
            <div className={styles.wfw_card_title}>Clear, Transparent Advice</div>
            <div className={styles.wfw_card_content}>
              There is now an abundance of readable dummy texts.
            </div>
          </div>
        </div>

        <div className={styles.cardGradientWrapper}>
          <div className={styles.cardGradientInner}>
            <div className={styles.cardIconWrapper}>
              <Image
                src="/images/svg/chart.svg"
                alt="Chart illustration"
                width={52}
                height={52}
                priority
              />
            </div>
            <div className={styles.wfw_card_title}>Expert Financial Guidance</div>
            <div className={styles.wfw_card_content}>
              There is now an abundance of readable dummy texts.
            </div>
          </div>
        </div>

        <div className={styles.cardContainer}>
          <div className={styles.cardBackgroundLarge} />
          <div className={styles.card}>
            <div className={styles.cardIconWrapper}>
              <Image
                src="/images/svg/piggybank.svg"
                alt="Piggy bank illustration"
                width={52}
                height={52}
                priority
              />
            </div>
            <div className={styles.wfw_card_title}>Affordable Solutions</div>
            <div className={styles.wfw_card_content}>
              There is now an abundance of readable dummy texts.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
