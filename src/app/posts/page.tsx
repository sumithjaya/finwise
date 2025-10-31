"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Blog.module.css";
import { HiArrowUpRight } from "react-icons/hi2";
import Image from "next/image";

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
type ContentBlock = { type: string; children: { type: string; text: string }[] };

type PostItem = {
  id: number;
  documentId: string;
  Title: string;
  Content?: ContentBlock[];
  CoverImage?: Media;
  tags?: Tag[];
  publishedAt?: string;
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
        throw new Error(`Strapi fetch failed: ${res.status} ${res.statusText} - ${text}`);
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
                <div className={styles.feturedPostTitle}>{latestPost.Title}</div>
                <div className={styles.feturedPostClick}>
                  <Link href={`/posts/${latestPost.documentId}`}><HiArrowUpRight /></Link>
                </div>
              </div>
              <div className={styles.feturedPostDescription}>
                {renderContentText(latestPost.Content)?.substring(0, 150) || ""}
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
          <div className={styles.noPosts}>No blog posts found</div>
        ) : (
          remainingPosts.map((post) => {
            const imgUrl = buildImageUrl(pickImagePath(post.CoverImage));
            const text = renderContentText(post.Content);
            return (
              <article key={post.id} className={styles.postCard}>
                {imgUrl && (
                  <div className={styles.postImageWrapper}>
                    <Image src={imgUrl} alt={post.Title} width={500} height={300} />
                  </div>
                )}
                <Link href={`/posts/${post.documentId}`} className={styles.postLink}>
                  {post.Title}
                </Link>
                <p className={styles.postExcerpt}>{text.substring(0, 150)}...</p>
                {post.tags && post.tags.length > 0 && (
                  <div className={styles.postTagsText}>
                    Tags: {post.tags.map((t) => t.Title).join(", ")}
                  </div>
                )}
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
              background: "#001F3F",
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
    </main>
  );
}
