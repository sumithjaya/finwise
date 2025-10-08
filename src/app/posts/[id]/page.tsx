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
 */
export async function generateStaticParams() {
  const STRAPI = process.env.STRAPI_API_URL || "http://localhost:1337";

  try {
    const res = await fetch(`${STRAPI}/api/posts?pagination[pageSize]=100`);
    if (!res.ok) return [];
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
  params: {
    id: string;
  };
};
export default async function PostPage({ params }: Props) {
  const post: PostItem | null = await getPostById(params.id);

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
    ? post.Content.map((block) =>
        Array.isArray(block.children)
          ? block.children.map((c) => c.text ?? "").join("")
          : ""
      ).join("\n")
    : String(post.Content ?? "");

  return (
    <main className="max-w-3xl mx-auto p-6">
      <article className="prose lg:prose-xl">
        <h1 className="text-4xl font-bold mb-4">{post.Title}</h1>

        {imgUrl && (
          <div className="mb-6 rounded overflow-hidden">
            <Image
              src={`${process.env.STRAPI_API_URL || "http://localhost:1337"}${imgUrl}`}
              alt={post.Image?.alternativeText ?? post.Title}
              width={1200}
              height={700}
              unoptimized
            />
          </div>
        )}

        <div className="mb-6 whitespace-pre-wrap">
          {contentText || "No content."}
        </div>

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
