// src/app/posts/[id]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { getPostById } from "@/libs/posts";
// types.ts (or paste at top of src/lib/posts.ts)

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
  // `documentId` is optional but when present it's a string (normalized)
  documentId?: string;
};


export const revalidate = 60; // ISR: revalidate every 60 seconds

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
      console.warn(
        "generateStaticParams: fetch returned !ok",
        res.status,
        res.statusText
      );
      return [];
    }
    const json = await res.json();
    const data = Array.isArray(json.data) ? json.data : [];
    // NOTE: return documentId to match your page param name
    return data.map((p: any) => ({
      documentId: String(p.id ?? p?.attributes?.id ?? p),
    }));
  } catch (err) {
    console.warn("generateStaticParams failed:", (err as any)?.message ?? err);
    return [];
  }
}
type Props = {
  params: { id?: string; documentId?: string } | Promise<{ id?: string; documentId?: string }>;
};


export default async function PostPage({ params }: Props) {
  // Await params to satisfy Next.js runtime (covers both Promise and plain object)
  
  const p = (await params) as { id?: string; documentId?: string };
  const documentId = p.documentId ?? p.id ?? null;
  // Debugging logs (server-side only)
  console.log("=== Strapi Fetch Debug ===");
  console.log("Document ID:", documentId);
  console.log("Params:", params);

  // const post: PostItem | null = await getPostById(documentId);
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

  const imgUrl = 
    post.CoverImage?.url ||
    null;
console.log("imgUrl", imgUrl);
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
      : imgUrl ?? null; // if STRAPI not set, allow absolute imgUrl if provided

  // Typeform: if user passes a full URL in env, keep it; otherwise build a common Typeform path
  const TYPEFORM_ID = process.env.NEXT_PUBLIC_TYPEFORM_ID ?? null;
  let typeformUrl: string | null = null;
  if (
    TYPEFORM_ID &&
    typeof TYPEFORM_ID === "string" &&
    TYPEFORM_ID.trim() !== ""
  ) {
    // allow either a full URL or a raw ID
    if (
      TYPEFORM_ID.startsWith("http://") ||
      TYPEFORM_ID.startsWith("https://")
    ) {
      typeformUrl = TYPEFORM_ID;
    } else {
      // standard Typeform embed URL pattern
      typeformUrl = `https://form.typeform.com/to/${TYPEFORM_ID}`;
    }
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
              // If the image host isn't in next.config.js domains you can either:
              // - set unoptimized (not recommended for prod), or
              // - add the domain to next.config.js images.domains
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
              .map((t) => t.Name ?? t.name)
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
