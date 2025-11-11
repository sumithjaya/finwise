"use client";
import Image from "next/image";
import styles from "./ReadyToFind.module.css";
import Link from "next/link";
import { PopupButton } from "@typeform/embed-react";

export default function ReadyToFind() {
  const typeformId = process.env.NEXT_PUBLIC_TYPEFORM_ID ?? "";

  return (
    <div className={styles.ready_to_find_container}>
      <div className={styles.footer_bgCurve} aria-hidden="true" />
      <div className={styles.footer_layer}>
        <div className={styles.cta_card_wrapper}>
          <div className={styles.cta_card}>
            {/* Headline + underline */}
            <div className={styles.cta_headline}>
              Ready to find your <span>financial adviser?</span>
              <div className={styles.cta_underline} aria-hidden="true" />
            </div>

            {/* Subtext */}
            <div className={styles.cta_subtext}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. varius
              lacus vel elit accumsan, sollicitudin rhoncus quam scelerisque.
            </div>

            {/* CTA button */}
            {/* <Link
              href="/get-started"
              aria-label="Get Started"
              className={styles.cta_button}
            >
              Get Started
            </Link> */}
            <PopupButton
              id={typeformId}
             
              className={styles.hero_content_left_button_text_main}
              aria-label="Get started with Typeform"
            >
              Get Started
            </PopupButton>
            {/* Decorative tiles */}
            <div className={styles.cta_tiles}>
              <Image
                src="/images/svg/tiles.svg"
                alt=""
                aria-hidden="true"
                width={100}
                height={100}
              />
              <Image
                src="/images/svg/tiles.svg"
                alt=""
                aria-hidden="true"
                width={100}
                height={100}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
