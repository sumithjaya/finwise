// ------------------------------ Hero.jsx ------------------------------
"use client";
import Image from "next/image";
import { PopupButton } from "@typeform/embed-react";
import styles from "./Hero.module.css";
import RevealStagger from "../ui/RevealStagger";


export default function Hero() {
const typeformId = process.env.NEXT_PUBLIC_TYPEFORM_ID ?? "";


return (
<div>
<div className={styles.hero}>
<section className="relative text-center flex flex-row" aria-labelledby="hero-heading">
<div className={styles.backdrop} />


<div className={styles.hero_content}>
<div className={styles.hero_content_left}>
<div className={styles.left_headline_group}>
<h2 className={styles.hero_content_left_title}>Find the Right</h2>
<h2 className={styles.hero_content_left_title_grn}>Financial Expert</h2>
<h2 className={styles.hero_content_left_title}>for Your Future.</h2>
</div>


<div className={styles.hero_content_mobile_image}>
<div className={styles.mobile_main_image}>
<div className={styles.avatar_card_small}>
<div className={styles.avatar_small_wrap}>
<Image src="/images/heroavatar.jpg" alt="Avatar" width={54} height={54} style={{ objectFit: "cover" }} priority />
</div>
<div className={styles.avatar_small_text}>
<p className={styles.avatar_small_name}>John Doe</p>
<div className={styles.avatar_small_bar} />
</div>
</div>
<div className={styles.stats_card_small}>
<h5 className={styles.stats_small_number}>1500+</h5>
<p className={styles.stats_small_label}>Financial Adviser</p>
</div>
</div>
</div>


<div className={styles.hero_content_left_subtitle}>
Compare, connect, and build your financial plan with confidence
</div>


<div className={styles.hero_content_left_button}>
<div className={styles.hero_content_left_button_text}>
Spend 5 mins and answer some simple questions and receive your Free Wealth Journal & Financial Plan
</div>
<PopupButton id={typeformId} className={styles.hero_content_left_button_text_main}>
<div>Get Started</div>
</PopupButton>
</div>
</div>


<div className={styles.hero_content_center}>
<div className={styles.center_blob}>
<svg width="56" height="68" viewBox="0 0 56 68" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M28 68C28.399 34.8697 28.7181 34.4824 56 34C28.7181 33.5176 28.399 33.1303 28 0C27.601 33.1303 27.2819 33.5176 0 34C27.2819 34.4824 27.601 34.8697 28 68Z" fill="#137C7A" fillOpacity="0.4" />
</svg>
</div>
</div>


<div className={styles.hero_content_right}>
<div className={styles.red_box} />
<div className={styles.main_image_card}>
<div className={styles.avatar_card_big}>
<div className={styles.avatar_big_wrap}>
<Image src="/images/heroavatar.jpg" alt="Avatar" width={54} height={54} style={{ objectFit: "cover" }} priority />
</div>
<div className={styles.avatar_big_text}>
<p className={styles.avatar_big_name}>John Doe</p>
<div className={styles.avatar_big_bar} />
</div>
</div>
<div className={styles.stats_card_big}>
<h5 className={styles.stats_big_number}>1500+</h5>
<p className={styles.stats_big_label}>Financial Adviser</p>
</div>
</div>
</div>
</div>
</section>
</div>
</div>
);
}