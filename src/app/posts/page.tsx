"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Blog.module.css";
import { HiArrowUpRight, HiOutlineUser } from "react-icons/hi2";
import Image from "next/image";
import { BsCalendar } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { HiOutlineShare } from "react-icons/hi";
import ReadyToFind from "@/components/home/ReadyToFind";
import { MdTaxiAlert } from "react-icons/md";
import { IoAlertCircle } from "react-icons/io5";

type Tag = { Title: string };
type MediaFormat = { url?: string };
type Media = {
  url?: string;
  formats?: {
    thumbnail?: MediaFormat;
    small?: MediaFormat;
    medium?: MediaFormat;
    large?: MediaFormat;
  };
  alternativeText?: string;
};
type ContentBlock = {
  type: string;
  children: { type: string; text: string }[];
};

type PostItem = {
  id: number;
  documentId: string;
  Title: string;
  Content?: ContentBlock[];
  CoverImage?: Media;
  Tags?: Tag[];
  publishedAt?: string;
  Auther?: string;
};

type StrapiResponse = {
  data: PostItem[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

const PAGE_SIZE = 6;

function getStrapiUrl(): string {
  return (
    process.env.NEXT_PUBLIC_STRAPI_API_URL ||
    process.env.NEXT_PUBLIC_STRAPI_URL ||
    "http://localhost:1337"
  );
}

function pickImagePath(media?: Media | null): string | null {
  if (!media) return null;
  return (
    media.formats?.medium?.url ||
    media.formats?.small?.url ||
    media.url ||
    media.formats?.thumbnail?.url ||
    null
  );
}
const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
const formatDateMonth = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", {
    month: "short",
  });
};
const formatDateDay = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
  });
};
export default function PostsPageClient() {
  const strapiUrl = getStrapiUrl();
  const apiToken = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async (pageToFetch: number) => {
    setLoading(true);
    setError(null);

    try {
      const url = `${strapiUrl}/api/wealfy-blog-posts?populate=*&sort=publishedAt:desc&pagination[page]=${pageToFetch}&pagination[pageSize]=${PAGE_SIZE}`;
      const headers: HeadersInit = { "Content-Type": "application/json" };
      if (apiToken) headers["Authorization"] = `Bearer ${apiToken}`;

      const res = await fetch(url, { headers, cache: "no-store" });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(
          `Strapi fetch failed: ${res.status} ${res.statusText} - ${text}`
        );
      }

      const data: StrapiResponse = await res.json();
      setPosts((prev) => [...prev, ...data.data]);
      setPageCount(data.meta?.pagination?.pageCount || null);
    } catch (err: any) {
      console.error("Fetch posts error:", err);
      setError(err?.message || "Unknown error while fetching posts");
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(1);
  }, []); // initial load

  const loadMore = async () => {
    if (loading) return;
    if (pageCount !== null && page >= pageCount) return;

    const nextPage = page + 1;
    setPage(nextPage);
    await fetchPosts(nextPage);
  };

  const latestPost = posts[0];
  const remainingPosts = posts.slice(1);

  const buildImageUrl = (path?: string | null) =>
    path?.startsWith("http") ? path : path ? `${strapiUrl}${path}` : null;

  const renderContentText = (Content?: ContentBlock[]) => {
    if (!Content || Content.length === 0) return "";
    return Content.map((block) =>
      (block.children || [])
        .map((c) => (c.text || "").trim())
        .filter(Boolean)
        .join("")
    )
      .filter(Boolean)
      .join("\n");
  };
  console.log("latestPost", latestPost);
  return (
    <main className={styles.pagemain}>
      <div className={styles.inner}>
        <div className={styles.readblogphill}>Read Our Blog</div>
        <h2 className={styles.pageHeaderTitle}>
          Browse our{" "}
          <span className={styles.pageHeaderTitleHighlight}>Resources</span>
        </h2>
        <div className={styles.pageHeaderDescription}>
          Lorem Ipsum is simply dummy text of the printing and industry.
        </div>
      </div>

      {/* Featured post */}
      {latestPost && (
        <div className={styles.feturedPostContainer}>
          <div
            className={styles.feturedPost}
            style={{
              ["--bg-image" as any]: `url(${
                buildImageUrl(pickImagePath(latestPost.CoverImage)) ||
                "/images/bloghero.jpg"
              })`,
            }}
          >
            <div className={styles.feturedPostContent}>
              <div className={styles.feturedPostTitleContainer}>
                <div className={styles.feturedPostTitle}>
                  {latestPost.Title}
                </div>
                <div className={styles.feturedPostClick}>
                  <Link href={`/posts/${latestPost.documentId}`}>
                    <HiArrowUpRight />
                  </Link>
                </div>
              </div>
              <div className={styles.feturedPostDescription}>
                {renderContentText(latestPost.Content)?.substring(0, 150) || ""}
              </div>
              <div className={styles.feturedPostMeta}>
                <div className={styles.avatarContainer}>
                  <div className={styles.avatar}>
                    <Image
                      src="/images/heroavatar.jpg"
                      alt="Avatar"
                      width={54}
                      height={54}
                      priority
                      className={styles.avatarImage}
                    />
                  </div>
                  <div>
                    {latestPost.Auther && latestPost.Auther != null
                      ? latestPost.Auther
                      : "NA"}
                  </div>
                </div>
                <div className={styles.feturedPostDateContainer}>
                  <div className={styles.feturedPostDate}>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.00012 1.50195V3.75195"
                        stroke="white"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M11.9999 1.50195V3.75195"
                        stroke="white"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M2.62512 6.81836H15.3751"
                        stroke="white"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M15.75 6.37695V12.752C15.75 15.002 14.625 16.502 12 16.502H6C3.375 16.502 2.25 15.002 2.25 12.752V6.37695C2.25 4.12695 3.375 2.62695 6 2.62695H12C14.625 2.62695 15.75 4.12695 15.75 6.37695Z"
                        stroke="white"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M11.7709 10.2773H11.7776"
                        stroke="white"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M11.7709 12.5273H11.7776"
                        stroke="white"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8.99673 10.2773H9.00347"
                        stroke="white"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8.99673 12.5273H9.00347"
                        stroke="white"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M6.22061 10.2773H6.22735"
                        stroke="white"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M6.22061 12.5273H6.22735"
                        stroke="white"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <div className={styles.feturedPostDateText}>
                    {latestPost?.publishedAt
                      ? formatDate(latestPost.publishedAt)
                      : null}
                  </div>
                </div>
                <div>
                  {latestPost &&
                    latestPost.Tags &&
                    latestPost.Tags.length > 0 && (
                      <div className={styles.feturedPostTags}>
                        {latestPost.Tags.map((Tag, index) => (
                          <div key={index} className={styles.feturedPostTag}>
                            {Tag.Title}
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Posts list */}
      <div className={styles.postsList}>
        {initialLoading ? (
          <div className={styles.noPosts}>Loading posts…</div>
        ) : posts.length === 0 ? (
          <div className={styles.noPosts}><IoAlertCircle/> No blog posts found</div>
        ) : (
          remainingPosts.map((post) => {
            const imgUrl = buildImageUrl(pickImagePath(post.CoverImage));
            const text = renderContentText(post.Content);
            return (
              <article key={post.id} className={styles.postCard}>
                {imgUrl && (
                  <div className={styles.postImageWrapper}>
                    <Image
                      src={imgUrl}
                      alt={post.Title}
                      width={500}
                      height={300}
                    />
                    <div className={styles.postDateBadge}>
                      <div className={styles.postDateBadgeText}>
                        {post?.publishedAt
                          ? formatDateMonth(post.publishedAt)
                          : null}
                      </div>
                      <div className={styles.postDateBadgeDay}>
                        {post?.publishedAt
                          ? formatDateDay(post.publishedAt)
                          : null}
                      </div>
                    </div>
                  </div>
                )}

                <div className={styles.postTitle}> {post.Title}</div>
                <p className={styles.postExcerpt}>
                  {text.substring(0, 150)}...
                </p>

                <Link
                  href={`/posts/${post.documentId}`}
                  className={styles.postLink}
                >
                  <div className={styles.postReadMore}>Read More</div>
                </Link>
                <div className={styles.postMeta}>
                  <div className={styles.postAuthor}>
                    <HiOutlineUser />
                    <div className={styles.postAuthorName}>
                      {post.Auther && post.Auther != null ? post.Auther : "NA"}
                    </div>
                  </div>
                  <div>
                    <HiOutlineShare />
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>
       
        
      {/* Load more button */}
      <div style={{ textAlign: "center", margin: "40px 0" }}>
        {pageCount !== null && page >= pageCount ? (
          <div style={{ color: "#888" }}>No more posts.</div>
        ) : (
          <button
            onClick={loadMore}
            disabled={loading}
            style={{
              padding: "12px 22px",
              background: "#137C7A",
              color: "#fff",
              borderRadius: "8px",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              fontWeight: "600",
              fontSize: "16px",
            }}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        )}
      </div>
      
          <ReadyToFind/>
    </main>
  );
}
