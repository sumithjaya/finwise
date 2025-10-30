// src/app/posts/page.tsx

import Link from "next/link";
import styles from "./Blog.module.css";
import { HiArrowUpRight } from "react-icons/hi2";
import Image from "next/image";

type Tag = {
  Title: string;
};

type MediaFormat = {
  url?: string;
};

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

type PostItem = {
  id: number;
  Title: string;
  Content?: { type: string; children: { type: string; text: string }[] }[];
  CoverImage?: Media;
  tags?: Tag[];
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
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

// Get the Strapi URL with fallback
function getStrapiUrl(): string {
  return (
    process.env.NEXT_PUBLIC_STRAPI_API_URL ||
    process.env.NEXT_PUBLIC_STRAPI_URL ||
    process.env.STRAPI_API_URL ||
    "http://localhost:1337"
  );
}

async function getBlogPosts(): Promise<PostItem[]> {
  const strapiUrl = getStrapiUrl();
  const apiToken = process.env.STRAPI_API_TOKEN;

  console.log("=== Strapi Fetch Debug ===");
  console.log("Strapi URL:", strapiUrl);
  console.log("API Token exists:", !!apiToken);
  console.log("API Token length:", apiToken?.length || 0);

  try {
    const url = `${strapiUrl}/api/wealfy-blog-posts?populate=*&sort=publishedAt:desc&pagination[limit]=10`;
    console.log("Fetching from:", url);

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (apiToken) {
      headers["Authorization"] = `Bearer ${apiToken}`;
    }

    console.log("Request headers:", {
      ...headers,
      Authorization: apiToken ? "Bearer ***" : "none",
    });

    const response = await fetch(url, {
      headers,
      cache: "no-store",
    });

    console.log("Response status:", response.status);
    console.log("Response statusText:", response.statusText);
    console.log("Response ok:", response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response body:", errorText);
      throw new Error(
        `Failed to fetch: ${response.status} ${response.statusText}`
      );
    }

    const data: StrapiResponse = await response.json();
    console.log("Successfully fetched posts count:", data.data?.length || 0);
    console.log("First post (if any):", data.data?.[0]?.Title || "No posts");
    return data.data || [];
  } catch (error) {
    console.error("=== Error Details ===");
    console.error("Error fetching blog posts:", error);
    if (error instanceof Error) {
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Error cause:", error.cause);
    }
    // Return empty array instead of throwing
    return [];
  }
}

/**
 * Helper: given a Media object (Strapi file object), return the best URL
 * priority: formats.medium.url -> formats.small.url -> url -> formats.thumbnail.url
 * returns null if none found.
 */
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

export default async function PostsPage() {
  const posts = await getBlogPosts();
  console.log("Posts:", posts);
  const latestPost = posts[0];

  console.log("Latest post:", latestPost);
  const remainingPosts = posts.slice(1);
  const strapiUrl = getStrapiUrl();
  const fallbackImage = "/images/bloghero.jpg";

  // Prefer latestPost.Image, fall back to latestPost.CoverImage
  const featuredImgPath = pickImagePath(latestPost?.CoverImage) || null;

  const featuredImageUrl = featuredImgPath
    ? featuredImgPath.startsWith("http")
      ? featuredImgPath
      : `${strapiUrl}${featuredImgPath}`
    : fallbackImage;

  console.log("Rendering page with", posts.length, "posts");

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

      <div className={styles.feturedPostContainer}>
        <div
          className={styles.feturedPost}
          style={{ ["--bg-image" as any]: `url(${featuredImageUrl})` }}
        >
          <div className={styles.feturedPostContent}>
            <div className={styles.feturedPostTitleContainer}>
              <div className={styles.feturedPostTitle}>
                {latestPost?.Title || "Featured story"}
              </div>
              <div className={styles.feturedPostClick}>
                <HiArrowUpRight />
              </div>
            </div>
            <div className={styles.feturedPostDescription}>
              {latestPost?.Content && latestPost.Content.length > 0
                ? latestPost.Content.map((block) =>
                    (block.children || [])
                      .map((c) => (c.text || "").trim())
                      .filter(Boolean)
                      .join("")
                  )
                    .join("\n")
                    .substring(0, 150)
                    .trim() +
                  (latestPost.Content.join("").length > 150 ? "..." : "")
                : "Read the latest insights on wealth management and personal finance."}
            </div>
            <div className={styles.feturedPostMeta}>
              <div className={styles.feturedPostMetaContainer}>
                <div className={styles.feturedPostAuthor}>
                  <div className={styles.feturedPostAuthorImage}>
                    <Image
                      src="/images/adviser02.jpg"
                      alt="logo"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className={styles.feturedPostAuthorName}>Jhone Doe</div>
                </div>
                <div className={styles.feturedPostDate}>
                  <div className={styles.feturedPostDateIcon}>
                    {/* calendar svg omitted for brevity */}
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
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11.9999 1.50195V3.75195"
                        stroke="white"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2.62512 6.81836H15.3751"
                        stroke="white"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15.75 6.37695V12.752C15.75 15.002 14.625 16.502 12 16.502H6C3.375 16.502 2.25 15.002 2.25 12.752V6.37695C2.25 4.12695 3.375 2.62695 6 2.62695H12C14.625 2.62695 15.75 4.12695 15.75 6.37695Z"
                        stroke="white"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11.7709 10.2773H11.7776"
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11.7709 12.5273H11.7776"
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.99673 10.2773H9.00347"
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.99673 12.5273H9.00347"
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6.22061 10.2773H6.22735"
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6.22061 12.5273H6.22735"
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className={styles.feturedPostDateText}>
                    {latestPost?.publishedAt
                      ? new Date(latestPost.publishedAt).toLocaleDateString()
                      : "14 Jun 2025"}
                  </div>
                </div>
              </div>
              <div className={styles.feturedPostTags}>
                {latestPost?.tags &&
                  latestPost.tags.map((tag, idx) => (
                    <div key={idx} className={styles.feturedPostTag}>
                      {tag.Title}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.postsList}>
        {posts.length === 0 ? (
          <div className={styles.noPosts}>
            <p className={styles.noPostsTitle}>No blog posts found</p>
            <p className={styles.noPostsText}>
              Check your server terminal logs for detailed error information
            </p>
          </div>
        ) : (
          remainingPosts.map((post) => {
            console.log("post", post);

            const { id, Title, Content = [], tags = [], CoverImage } = post;

            // prefer Image, then CoverImage
            const postImagePath = pickImagePath(CoverImage);

            const imgUrl = postImagePath
              ? postImagePath.startsWith("http")
                ? postImagePath
                : `${strapiUrl}${postImagePath}`
              : null;
            console.log("imgUrl", imgUrl);
            // Convert rich text blocks to plain text, filtering empty nodes
            const contentText = Content.map((block) =>
              (block.children || [])
                .map((c) => (c.text || "").trim())
                .filter(Boolean)
                .join("")
            )
              .filter(Boolean)
              .join("\n");

            return (
              <article key={id} className={styles.postCard}>
                {imgUrl && (
                  <div className={styles.postImageWrapper}>
                    <Image
                      src={imgUrl}
                      alt="Post Image"
                      width={500}
                      height={300}
                    />
                  </div>
                )}
                <Link href={`/posts/${id}`} className={styles.postLink}>
                  {Title}
                </Link>

                <p className={styles.postExcerpt}>
                  {contentText || "No content."}
                </p>
                <div>
                  <div> </div>
                </div>
                {tags.length > 0 && (
                  <div className={styles.postTagsText}>
                    Tags: {tags.map((t) => t.Title).join(", ")}
                  </div>
                )}
              </article>
            );
          })
        )}
      </div>
    </main>
  );
}
