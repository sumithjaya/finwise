"use client";
import Image from "next/image";
import styles from "./startpage.module.css";
import { useState } from "react";
import MultiStepForm from "./MultiStepForm";

export default function StartPage() {
  const [started, setStarted] = useState(false);

  if (started) {
    return <MultiStepForm />;
  }

  return (
    <div className={styles.join_in_start_container}>
      <div className={styles.join_in_start_contentbox}>
        <div className={styles.join_in_start_contentboxpattern}>
          <div className="relative">
            <div className={styles.join_in_start_heading}>
              Let’s Find the{" "}
              <span className={styles.join_in_start_heading_bold}>
                Perfect Adviser
              </span>
            </div>
            <div className={styles.join_in_start_heading_underline}></div>
          </div>
          <div className={styles.join_in_start_heading}>for You.</div>
          <div className={styles.join_in_start_subheading}>
            Answer a few quick questions and we’ll match you.
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button className={styles.join_in_start_btn}  onClick={() => setStarted(true)}>Get Started</button>
          </div>
        </div>
      </div>
      <div className={styles.element01}>
        <Image
          src="/images/svg/element01.svg"
          alt="Scale hand illustration"
          width={146}
          height={40}
          priority
        />
      </div>
      <div className={styles.element02}>
        <Image
          src="/images/svg/star02.svg"
          alt="Scale hand illustration"
          width={56}
          height={40}
          priority
        />
      </div>
      <div className={styles.element_r01}> </div>
    </div>
  );
}
