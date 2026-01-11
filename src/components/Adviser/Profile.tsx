import Image from "next/image";
import styles from "./Profile.module.css"; 

export default function Profile( ) {
    return (
      <section className={styles.adviser_profile}>
        <div className={styles.adviser_profile_container}>
        <div className={styles.adviser_profile_image_container}>
            <div className={styles.adviser_profile_image_wrapper}>
                <Image className={styles.adviser_profile_image} src="/images/adviser.jpg" alt="Profile" width={400} height={440} />
            </div>
        </div>
        <div className={styles.adviser_profile_content}>
            <div  className={styles.adviser_profile_title}> — About Me</div>
            <div className={styles.adviser_profile_sub_title}>Who Is <span className={styles.adviser_profile_name}>Carla Press?</span></div>
            <div className={styles.adviser_profile_description}>With over 15 years of experience in wealth management, Carla helps individuals and families confidently plan their financial future. Her work focuses on creating practical, customized strategies that align with each client’s goals, lifestyle, and long-term priorities.</div>
            <div className={styles.adviser_profile_description}>She specializes in retirement planning, investment management, and wealth protection — guiding clients through complex financial decisions with clarity and transparency. Carla believes financial advice should be understandable, pressure-free, and built for real life, not just projections.</div>
            <div className={styles.adviser_profile_description}>Her clients value her straightforward approach, long-term thinking, and commitment to helping them feel confident at every stage of their financial journey.</div>
        </div>
      </div>
      </section>
    );
}