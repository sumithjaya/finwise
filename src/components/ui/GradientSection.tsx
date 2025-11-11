import styles from "./GradientSection.module.css";

export default function GradientSection({ children }: { children: React.ReactNode }) {
  return (
    <section className={styles.gradientSection}>
      {/* Optional glowing layer */}
      <div className={styles.glowOverlay} />
      <div className={styles.content}>{children}</div>
    </section>
  );
}
