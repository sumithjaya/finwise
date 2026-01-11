import Image from "next/image";
import Link from "next/link";
import styles from "./Specialty.module.css";

export default function Specialty() {
  return (
    <div className={styles.specialty_container}>
      <div>
        <div className={styles.specialty_title_container}>
          <div className={styles.specialty_title}>Specialty</div>
          <div>
            <Link className={styles.specialty_view_all} href="/adviser-profile">
              View All
            </Link>
          </div>
        </div>
        <div className={styles.specialty_card_container}>
          <div className={styles.specialty_card}>
            <div className={styles.specialty_card_icon}>
              <Image
                src="/images/svg/editdoc.svg"
                alt="Profile"
                width={28}
                height={28}
              />
            </div>
            <div className={styles.specialty_card_title}>
              Retirement Planning
            </div>
            <div className={styles.specialty_card_description}>
              Plan for retirement with a clear strategy based on your income,
              lifestyle goals, and timeline — not generic assumptions.
            </div>
            <div>
              <Link
                className={styles.specialty_read_more}
                href="/adviser-profile"
              >
                Read More
              </Link>
            </div>
          </div>{" "}
          <div className={styles.specialty_card}>
            <div className={styles.specialty_card_icon}>
              <Image
                src="/images/svg/handheart.svg"
                alt="Profile"
                width={28}
                height={28}
              />
            </div>
            <div className={styles.specialty_card_title}>
              Healthcare Coverage
            </div>
            <div className={styles.specialty_card_description}>
              Understand healthcare costs and coverage options before and during
              retirement, so unexpected expenses don’t derail your plan.
            </div>
            <div>
              <Link
                className={styles.specialty_read_more}
                href="/adviser-profile"
              >
                Read More
              </Link>
            </div>
          </div>{" "}
          <div className={styles.specialty_card}>
            <div className={styles.specialty_card_icon}>
              <Image
                src="/images/svg/building.svg"
                alt="Profile"
                width={28}
                height={28}
              />
            </div>
            <div className={styles.specialty_card_title}>Estate Planning</div>
            <div className={styles.specialty_card_description}>
              Structure your assets to protect your family, preserve wealth, and
              ensure your legacy is handled exactly as you intend.
            </div>
            <div>
              <Link
                className={styles.specialty_read_more}
                href="/adviser-profile"
              >
                Read More
              </Link>
            </div>
          </div>{" "}
          <div className={styles.specialty_card}>
            <div className={styles.specialty_card_icon}>
              <Image
                src="/images/svg/chartup.svg"
                alt="Profile"
                width={28}
                height={28}
              />
            </div>
            <div className={styles.specialty_card_title}>
              Investment Management
            </div>
            <div className={styles.specialty_card_description}>
              Create a balanced investment strategy designed to grow wealth
              steadily while managing risk responsibly.{" "}
            </div>
            <div>
              <Link
                className={styles.specialty_read_more}
                href="/adviser-profile"
              >
                Read More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
