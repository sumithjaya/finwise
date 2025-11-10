// src/app/posts/[id]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { getPostById } from "@/libs/posts";
import type { Metadata } from "next";

// --- types (keep these in a shared types file if you prefer) ---
export type Tag = {
  id?: number;
  Name?: string | null;
  name?: string | null;
  slug?: string | null;
};

export type MediaFormat = { url?: string | null };

export type Media = {
  url?: string | null;
  formats?: {
    thumbnail?: MediaFormat | null;
    small?: MediaFormat | null;
    medium?: MediaFormat | null;
    large?: MediaFormat | null;
  } | null;
  alternativeText?: string | null;
};

export type RichTextChild = {
  type?: string;
  text?: string;
};

export type RichTextBlock = {
  type?: string;
  children?: RichTextChild[];
};

export type PostItem = {
  id: number | string;
  Title: string;
  Content?: RichTextBlock[] | string | null;
  CoverImage?: Media | null;
  tags?: Tag[] | null;
  documentId?: string;
};

// ISR
export const revalidate = 60;

// IMPORTANT: file is [id], so return { id: "..." } here
export async function generateStaticParams() {
  const STRAPI =
    process.env.NEXT_PUBLIC_STRAPI_API_URL ?? process.env.STRAPI_API_URL ?? "";

  if (!STRAPI) {
    console.warn(
      "generateStaticParams: no STRAPI API URL configured. Skipping static params."
    );
    return [];
  }

  try {
    const res = await fetch(
      `${STRAPI.replace(/\/$/, "")}/api/wealfy-blog-posts?pagination[pageSize]=100`
    );
    if (!res.ok) {
      console.warn("generateStaticParams: fetch returned !ok", res.status);
      return [];
    }
    const json = await res.json();
    const data = Array.isArray(json.data) ? json.data : [];
    // Return 'id' because this route file is posts/[id]/page.tsx
    return data.map((p: any) => ({ id: String(p.id ?? p?.attributes?.id ?? p) }));
  } catch (err) {
    console.warn("generateStaticParams failed:", (err as any)?.message ?? err);
    return [];
  }
}

// FIXED: In Next.js 15, params must be a Promise
type Params = { id?: string };
type Props = { params: Promise<Params> };

export default async function PostPage({ params }: Props) {
  // FIXED: await params before using it
  const { id } = await params;
  const documentId = id; // keep the term you use downstream
  // If you have legacy links that provide documentId as a query, handle them upstream
  const post: PostItem | null = await getPostById(documentId ?? "");

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

  const imgUrl = post.CoverImage?.url ?? null;

  // Normalize content to plain text
  const contentText = Array.isArray(post.Content)
    ? post.Content
        .map((block) =>
          Array.isArray(block.children)
            ? block.children.map((c) => c.text ?? "").join("")
            : ""
        )
        .join("\n")
    : String(post.Content ?? "");

  const STRAPI =
    process.env.NEXT_PUBLIC_STRAPI_API_URL ?? process.env.STRAPI_API_URL ?? "";

  const fullImgSrc =
    imgUrl && STRAPI
      ? `${STRAPI.replace(/\/$/, "")}${imgUrl.startsWith("/") ? imgUrl : `/${imgUrl}`}`
      : imgUrl ?? null;

  // Typeform: keep a small UI affordance to actually use it (prevents "assigned but never used")
  const TYPEFORM_ID = process.env.NEXT_PUBLIC_TYPEFORM_ID ?? null;
  let typeformUrl: string | null = null;
  if (TYPEFORM_ID && typeof TYPEFORM_ID === "string" && TYPEFORM_ID.trim() !== "") {
    typeformUrl =
      TYPEFORM_ID.startsWith("http://") || TYPEFORM_ID.startsWith("https://")
        ? TYPEFORM_ID
        : `https://form.typeform.com/to/${TYPEFORM_ID}`;
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <article className="prose lg:prose-xl">
        <h1 className="text-4xl font-bold mb-4">{post.Title}</h1>

        {fullImgSrc && (
          <div className="mb-6 rounded overflow-hidden">
            <Image
              src={fullImgSrc}
              alt={post.CoverImage?.alternativeText ?? post.Title}
              width={1200}
              height={700}
              unoptimized
            />
          </div>
        )}

        <div className="mb-6 whitespace-pre-wrap">{contentText || "No content."}</div>

        {post.tags && post.tags.length > 0 && (
          <div className="text-sm text-gray-600">
            Tags: {post.tags.map((t) => t.Name ?? t.name).filter(Boolean).join(", ")}
          </div>
        )}

        {typeformUrl && (
          <div className="mt-8">
            <a
              href={typeformUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm text-blue-600"
            >
              Give feedback
            </a>
          </div>
        )}

        <Link href="/posts" className="text-blue-600 mt-8 block">
          ← Back to posts
        </Link> 
      </article>
    </main>
  );
}