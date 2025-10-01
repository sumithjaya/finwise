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
              There is now an abundance of readable dummy texts.
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
              Retirement Planning
            </div>
            <div className={styles.specialty_card_description}>
              There is now an abundance of readable dummy texts.
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
            <div className={styles.specialty_card_title}>
              Retirement Planning
            </div>
            <div className={styles.specialty_card_description}>
              There is now an abundance of readable dummy texts.
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
              Retirement Planning
            </div>
            <div className={styles.specialty_card_description}>
              There is now an abundance of readable dummy texts.
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
