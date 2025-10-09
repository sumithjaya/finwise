// src/app/posts/[id]/page.tsx
import Image from "next/legacy/image";
import Link from "next/link";
import { getPostById } from "@/libs/posts";

type Tag = {
  id?: number;
  Name?: string;
  slug?: string;
};

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

type PostItem = {
  id: number | string;
  Title: string;
  Content?:
    | { type?: string; children?: { type?: string; text?: string }[] }[]
    | string
    | null;
  Image?: Media | null;
  tags?: Tag[];
};

export const revalidate = 60; // ISR: revalidate every 60 seconds

/**
 * Pre-generate static params for known posts at build time
 *
 * NOTE: This function will NOT attempt to fetch from localhost during CI/build.
 * You must set NEXT_PUBLIC_STRAPI_API_URL or STRAPI_API_URL in the build environment.
 */
export async function generateStaticParams() {
  const STRAPI =
    process.env.NEXT_PUBLIC_STRAPI_API_URL ?? process.env.STRAPI_API_URL ?? "";

  if (!STRAPI) {
    // No public API configured for build-time data — skip prerendering to avoid build failures.
    console.warn(
      "generateStaticParams: no STRAPI API URL configured (NEXT_PUBLIC_STRAPI_API_URL / STRAPI_API_URL). Skipping static params."
    );
    return [];
  }

  try {
    const res = await fetch(`${STRAPI.replace(/\/$/, "")}/api/posts?pagination[pageSize]=100`);
    if (!res.ok) {
      console.warn("generateStaticParams: fetch returned !ok", res.status, res.statusText);
      return [];
    }
    const json = await res.json();
    const data = Array.isArray(json.data) ? json.data : [];
    return data.map((p: any) => ({
      id: String(p.id ?? p?.attributes?.id ?? p),
    }));
  } catch (err) {
    console.warn("generateStaticParams failed:", (err as any)?.message ?? err);
    return [];
  }
}

/**
 * The page component for /posts/[id]
 */
type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PostPage({ params }: Props) {
  // Await the params Promise
  const { id } = await params;
  const post: PostItem | null = await getPostById(id);

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

  // Flatten rich text blocks into string
  const contentText = Array.isArray(post.Content)
    ? post.Content
        .map((block) =>
          Array.isArray(block.children)
            ? block.children.map((c) => c.text ?? "").join("")
            : ""
        )
        .join("\n")
    : String(post.Content ?? "");

  // Use the same env var as generateStaticParams; default to empty so we never point to localhost in CI.
  const STRAPI =
    process.env.NEXT_PUBLIC_STRAPI_API_URL ?? process.env.STRAPI_API_URL ?? "";

  // Build full image src only if STRAPI is configured and imgUrl looks like a relative path.
  const fullImgSrc =
    imgUrl && STRAPI
      ? `${STRAPI.replace(/\/$/, "")}${imgUrl.startsWith("/") ? imgUrl : `/${imgUrl}`}`
      : null;

  return (
    <main className="max-w-3xl mx-auto p-6">
      <article className="prose lg:prose-xl">
        <h1 className="text-4xl font-bold mb-4">{post.Title}</h1>

        {fullImgSrc && (
          <div className="mb-6 rounded overflow-hidden">
            <Image
              src={fullImgSrc}
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
            Tags:{" "}
            {post.tags
              .map((t) => t.Name)
              .filter(Boolean)
              .join(", ")}
          </div>
        )}

        <Link href="/posts" className="text-blue-600 mt-8 block">
          ← Back to posts
        </Link>
      </article>
    </main>
  );
}
