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
            <div className={styles.adviser_profile_description}>With over 15 years of experience, John helps clients confidently plan their financial future. He specializes in creating customized retirement strategies based on individual goals, lifestyle, and legacy needs.</div>
            <div className={styles.adviser_profile_description}>Lorem Ipsum is simply dummy text of the printing and industry. Lorem Ipsum has been the industry&#39s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen bookLorem Ipsum is simply dummy text of the printing and industry.</div>
        </div>
      </div>
      </section>
    );
}