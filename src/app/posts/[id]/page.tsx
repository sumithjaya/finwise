// src/app/posts/[id]/page.tsx
import Image from "next/legacy/image";
import Link from "next/link";
import React from "react";

type Tag = {
  id?: number;
  Name?: string;
  slug?: string;
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
  id: number | string;
  Title: string;
  Content?: { type?: string; children?: { type?: string; text?: string }[] }[] | string | null;
  Image?: Media | null;
  tags?: Tag[];
};

const STRAPI = process.env.STRAPI_API_URL || "http://localhost:1337";

/**
 * Utility: fetch with timeout (abort).
 */
async function safeFetch(input: RequestInfo, init?: RequestInit, timeoutMs = 5000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(input, { ...(init || {}), signal: controller.signal });
    clearTimeout(timeout);
    return res;
  } catch (err) {
    clearTimeout(timeout);
    throw err;
  }
}

/**
 * Fetch a single post by id (robust to Strapi v4 shape).
 */
export async function getPostById(id: string | number): Promise<PostItem | null> {
  try {
    const res = await safeFetch(`${STRAPI}/api/posts/${id}?populate=deep,3`, {
      next: { revalidate: 60 },
    }, 7000);

    if (!res.ok) {
      console.warn("Strapi get post failed:", res.status, await res.text());
      return null;
    }

    const json = await res.json();
    const raw = json.data ?? json; // handle either shape

    if (!raw) return null;

    // Normalize attributes
    const attrs = raw.attributes ?? raw;

    // Title
    const Title = attrs.Title ?? attrs.title ?? attrs.name ?? "Untitled";

    // Content
    const Content = attrs.Content ?? attrs.content ?? null;

    // Tags (handle v4 tags.data)
    let tags: Tag[] = [];
    if (attrs.tags) {
      if (Array.isArray(attrs.tags)) {
        tags = attrs.tags.map((t: any) => (t?.attributes ? { id: t.id, Name: t.attributes.Name ?? t.attributes.name } : { id: t.id ?? undefined, Name: t.Name ?? t.name }));
      } else if (attrs.tags.data) {
        tags = attrs.tags.data.map((t: any) => {
          const tAttrs = t.attributes ?? {};
          return { id: t.id, Name: tAttrs.Name ?? tAttrs.name ?? "" };
        });
      }
    }

    // Image mapping
    let Image: Media | null = null;
    if (attrs.Image) {
      const imageData = attrs.Image?.data?.attributes ?? attrs.Image?.attributes ?? attrs.Image;
      if (imageData) {
        Image = {
          url: imageData.url,
          alternativeText: imageData.alternativeText ?? imageData.alternative_text ?? imageData.alt,
          formats: imageData.formats ?? undefined,
        };
      }
    }

    return {
      id: raw.id ?? id,
      Title,
      Content,
      Image,
      tags,
    };
  } catch (err: any) {
    if (err?.name === "AbortError") {
      console.warn("getPostById aborted (timeout).");
    } else {
      console.warn("getPostById error:", err?.message ?? err);
    }
    return null;
  }
}

/**
 * Optional: tell Next to revalidate this page every 60 seconds (ISR).
 * You can change this number or remove it if you want full dynamic rendering.
 */
export const revalidate = 60;

/**
 * Optionally generate static params so Next pre-renders pages it knows about at build time.
 * This is safe — it will return [] if Strapi is unreachable, avoiding build failure.
 */
export async function generateStaticParams() {
  try {
    const res = await safeFetch(`${STRAPI}/api/posts?pagination[pageSize]=100`, {}, 7000);
    if (!res.ok) {
      console.warn("generateStaticParams: failed to fetch list:", res.status);
      return [];
    }
    const json = await res.json();
    const data = Array.isArray(json.data) ? json.data : [];
    return data.map((p: any) => ({ id: String(p.id ?? p?.attributes?.id ?? p) }));
  } catch (err) {
    console.warn("generateStaticParams failed:", (err as any)?.message ?? err);
    return [];
  }
}

/**
 * Page component for /posts/[id]
 */
export default async function PostPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const post = await getPostById(id);

  if (!post) {
    return (
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Post not available</h1>
        <p>We couldn't load that post right now. Try again later.</p>
        <Link href="/posts" className="text-blue-600 mt-4 block">
          ← Back to posts
        </Link>
      </main>
    );
  }

  const imgUrl =
    post.Image?.formats?.medium?.url ||
    post.Image?.formats?.small?.url ||
    post.Image?.url ||
    null;

  // If Content is rich blocks (array), flatten to text. If string, use it.
  const contentText = Array.isArray(post.Content)
    ? post.Content.map((block) => (Array.isArray(block.children) ? block.children.map((c: any) => c.text ?? "").join("") : "")).join("\n")
    : String(post.Content ?? "");

  return (
    <main className="max-w-3xl mx-auto p-6">
      <article className="prose lg:prose-xl">
        <h1 className="text-4xl font-bold mb-4">{post.Title}</h1>

        {imgUrl && (
          <div className="mb-6 rounded overflow-hidden">
            <Image
              src={`${STRAPI}${imgUrl}`}
              alt={post.Image?.alternativeText ?? post.Title}
              width={1200}
              height={700}
              unoptimized
            />
          </div>
        )}

        <div className="mb-6 whitespace-pre-wrap">{contentText || "No content."}</div>

        {post.tags && post.tags.length > 0 && (
          <div className="text-sm text-gray-600">
            Tags: {post.tags.map((t) => t.Name).filter(Boolean).join(", ")}
          </div>
        )}

        <Link href="/posts" className="text-blue-600 mt-8 block">
          ← Back to posts
        </Link>
      </article>
    </main>
  );
}
