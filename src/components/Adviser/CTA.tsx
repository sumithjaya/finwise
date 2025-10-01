import styles from "./CTA.module.css";

export default function CTA() {
    return (
        <section className={styles.cta_section}><div className={styles.cta_container}>
            <div className={styles.cta_title}>Ready to plan your future with clarity?  </div>
            <div className={styles.cta_description}>Click below to schedule a <span className={styles.cta_description_span}>30-minute free</span> consultation.</div>
            <div className={styles.cta_button_container}>
                <button className={styles.cta_button}>Book a Free Discovery Call</button>
            </div>
        </div></section>
    );
}