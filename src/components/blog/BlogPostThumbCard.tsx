import Link from "next/link";
import styles from "./BlogPage.module.css";
import Image from "next/image";
import { HiOutlineShare } from "react-icons/hi2"; 

export default function BlogPostThumbCard({
  image,
  date,
  month,
  title,
  subtitle,
  auther,
  url
} : {
  image: string;
  date: string;
  month: string;
  title: string;
  subtitle: string;
  auther: string;
  url: string;
}) {
  return (
    <div>
      <div className={styles.blog_thubmb_card}>
        <div>
          <div
            className={styles.blog_thumb_image_cont}
            style={{
              backgroundImage: `url(/images/${image})`,  
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className={styles.blog_date_badge}>
              <span className={styles.blog_date_day}>{date}</span>
              <span className={styles.blog_date_month}>{month}</span>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.blog_thumb_title}>{title}</div>
          <div className={styles.blog_thumb_subtitle}>{subtitle}</div>
        </div>
        <div className={styles.blog_thumb_seemore_box}>
          <Link className={styles.blog_thumb_seemore} href={url}>
            See More
          </Link>
           
        </div>
        <div style={{width:'100%'  }}>
          <div className={styles.blog_thum_footer}>
            <div className={styles.blog_thubmb_auther}>
              <Image
                src={"/images/svg/user-round-line.svg"}
                alt={"usericon"}
                width={24}
                height={0}
              />
              <div>By {auther}</div>
            </div>
            <div>
                <HiOutlineShare />
            </div>  
          </div>
        </div>
      </div>
    </div>
  );
}
