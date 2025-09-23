import Image from "next/image";
import styles from "./blog.module.css";
import { RxCalendar } from "react-icons/rx";
import { HiArrowUpRight } from "react-icons/hi2";
import Link from "next/link";
import BlogPostThumbCard from "@/components/blog/BlogPostThumbCard";
import client from "../../../tina/__generated__/client";

type TinaPostNode = {
  _sys: { filename: string };
  title?: string | null;
  date?: string | null;
  author?: string | null;
  subtitle?: string | null;
  image?: { url: string } | null;
  // add image/summary if you add those fields to Tina
};

function fmtDayMonth(iso?: string | null) {
  if (!iso) return { day: "", month: "" };
  const d = new Date(iso);
  // guard against invalid dates
  if (isNaN(d.getTime())) return { day: "", month: "" };
  return {
    day: String(d.getDate()).padStart(2, "0"),
    month: d.toLocaleString("en-US", { month: "short" }), // "Jan", "Feb", ...
  };
}

export const dynamic = "force-static"; // pre-render at build-time
export const revalidate = 60; // revalidate every 60s (tweak as you like)

export default async function RootLayout() {
  const res = await client.queries.blogConnection({ first: 200 });
  const edges = (res.data.blogConnection?.edges ?? []) as {
    node: TinaPostNode;
  }[];

  const posts = edges
    .map((e) => e.node)
    .sort((a, b) => {
      const da = a.date ? +new Date(a.date) : 0;
      const db = b.date ? +new Date(b.date) : 0;
      return db - da;
    });

  // const blogPosts = [
  //   {
  //     image: "blog_post01.jpg",
  //     date: "12",
  //     month: "Feb",
  //     title: "How to change careers: 7 steps for a successful transition",
  //     subtitle:
  //       "Lorem Ipsum has been the industry dummy text ever since the 1500s....",
  //   },
  //   {
  //     image: "blog_post02.jpg",
  //     date: "12",
  //     month: "Feb",
  //     title: "Building a strong resume: Tips for showcasing your skills",
  //     subtitle:
  //       "A resume is often your first impression. Here’s how to make it stand out.",
  //     auther: "John",
  //   },
  //   {
  //     image: "blog_post03.jpg",
  //     date: "12",
  //     month: "Feb",
  //     title: " ",
  //     subtitle:
  //       "Networking is essential in today’s job market. Learn effective ways to connect.",
  //     auther: "Emily",
  //   },
  //   {
  //     image: "blog_post04.jpg",
  //     date: "12",
  //     month: "Feb",
  //     title: "Mastering interview techniques: What to say and how to say it",
  //     subtitle:
  //       "Interviews can be daunting. Here are techniques to build your confidence.",
  //     auther: "Alex",
  //   },
  //   {
  //     image: "blog_post05.jpg",
  //     date: "12",
  //     month: "Feb",
  //     title: "The importance of continuous learning in your career",
  //     subtitle:
  //       "In a fast-changing world, lifelong learning is key to staying relevant.",
  //     auther: "John",
  //   },
  //   {
  //     image: "blog_post06.jpg",
  //     date: "12",
  //     month: "Feb",
  //     title: "Embracing change: How to adapt to new work environments",
  //     subtitle:
  //       "Change can be challenging but also rewarding. Here are tips to embrace it.",
  //     auther: "John",
  //   },
  //   {
  //     image: "blog_post07.jpg",
  //     date: "12",
  //     month: "Feb",
  //     title: "Setting career goals: A roadmap to your professional future",
  //     subtitle:
  //       "Goal setting is crucial for tracking progress and staying motivated.",
  //     auther: "John",
  //   },
  //   {
  //     image: "blog_post08.jpg",
  //     date: "12",
  //     month: "Feb",
  //     title: "Work-life balance: Strategies for a healthier lifestyle",
  //     subtitle:
  //       "Achieving balance is essential for well-being and productivity. Here’s how.",
  //     auther: "John",
  //   },
  //   {
  //     image: "blog_post09.jpg",
  //     date: "12",
  //     month: "Feb",
  //     title: "Leveraging social media for professional growth",
  //     subtitle:
  //       "Social platforms can enhance your career opportunities. Learn effective strategies.",
  //     auther: "John",
  //   },
  // ];

  return (
    <div style={{ padding: "100px" }}>
      {/* Hero section */}
      <div>
        <div className={styles.read_blog_phill}>Read Our Blog</div>
        <div className={styles.blog_hero_header}>
          Browse Our{" "}
          <span className={styles.blog_hero_header_italic}>Resources</span>{" "}
        </div>
        <div className={styles.blog_hero_subheader}>
          Lorem Ipsum is simply dummy text of the printing and industry.
        </div>
        <div className={styles.hero_image_container}>
          <div className={styles.hero_image_inner_card}>
            <div className={styles.hero_image_card_left}>
              <div className={styles.blog_hero_title}>
                Browse Our Resources{" "}
              </div>
              <div className={styles.blog_hero_subtitle}>
                Lorem Ipsum is simply dummy text of the printing and industry.
              </div>
              <div className="flex gap-30">
                <div className="flex items-center gap-5">
                  <Image
                    style={{ borderRadius: "50%" }}
                    alt="book icon"
                    src={"/images/person101.jpg"}
                    width={52}
                    height={52}
                  />
                  <div className={styles.hero_card_text}> John Doe</div>
                </div>
                <div className="flex flex row  items-center gap-5">
                  <div className={styles.hero_card_calendar_iconwrapper}>
                    <RxCalendar />
                  </div>
                  <div className={styles.hero_card_text}>14 Jun 2025</div>
                </div>
              </div>
            </div>
            <div className={styles.blog_hero_card_right}>
              <div className={styles.card_left_arrow_link}>
                <div style={{ width: "40px" }}>
                  <HiArrowUpRight style={{ fontSize: "40px" }} />
                </div>
              </div>
              <div className={styles.card_left_link_container}>
                <Link href={"/#"} className={styles.card_left_link}>
                  Wealth Management
                </Link>
                <Link href={"/#"} className={styles.card_left_link}>
                  Career
                </Link>
                <Link href={"/#"} className={styles.card_left_link}>
                  Personal Finance
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.blog_post_thumb_grid}>
        {posts.map((post) => {
          const slug = post._sys.filename;
          const { day, month } = fmtDayMonth(post.date);

          return (
            <BlogPostThumbCard
              key={slug}
              image={post.image ?? "blog_post01.jpg"} // fallback image if Tina doesn’t provide one
              date={day}
              month={month}
              title={post.title ?? slug}
              subtitle={post.subtitle ?? ""}
              auther={post.author ?? ""}
              url={`/blog/${slug}`}
            />
          );
        })}
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          padding: "60px",
        }}
      >
        <button className={styles.loadingmore_btn}>Loading More..</button>
      </div>
    </div>
  );
}
