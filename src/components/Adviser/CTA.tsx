"use client";
import { PopupButton } from "@typeform/embed-react";
import styles from "./CTA.module.css";

export default function CTA() {
  const typeformId = process.env.NEXT_PUBLIC_TYPEFORM_ID ?? "";
  return (
    <section className={styles.cta_section}>
      <div className={styles.cta_container}>
        <div className={styles.cta_title}>
          Ready to plan your future with clarity?{" "}
        </div>
        <div className={styles.cta_description}>
          Click below to schedule a{" "}
          <span className={styles.cta_description_span}>30-minute free</span>{" "}
          consultation.
        </div>
        <div className={styles.cta_button_container}>
          <PopupButton
            id={typeformId}
            className={styles.cta_button}
            aria-label="Join via Typeform"
          >
            Book a Free Discovery Call
          </PopupButton>
        </div>
      </div>
    </section>
  );
}
