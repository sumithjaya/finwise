// src/app/posts/page.tsx
import Image from "next/legacy/image";
import Link from "next/link";

type Tag = {
  id: number;
  Name: string;
  slug: string;
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
  Image?: Media;
  tags?: Tag[];
}; 

// Get the Strapi URL with fallback
function getStrapiUrl(): string {
  return process.env.NEXT_PUBLIC_STRAPI_API_URL || 
         process.env.STRAPI_API_URL || 
         "http://localhost:1337";
}

async function getPosts(): Promise<PostItem[]> {
  try {
    const STRAPI = getStrapiUrl();
    const res = await fetch(`${STRAPI}/api/posts?populate=*`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error("Strapi fetch failed:", res.status, await res.text());
      return [];
    }

    const json = await res.json();
    console.log("Raw items:", json.data);

    return Array.isArray(json.data) ? json.data : [];
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

// Make this page dynamic to avoid build-time failures
export const dynamic = 'force-dynamic';

export default async function PostsPage() {
  const posts = await getPosts();
  const strapiUrl = getStrapiUrl();

  if (!posts.length) {
    return (
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
        <p>No posts found.</p>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>

      <div className="space-y-6">
        {posts.map((post) => {
          const { id, Title, Content = [], tags = [], Image: postImage } = post;

          // Pick image URL (medium > small > default)
          const imgUrl =
            postImage?.formats?.medium?.url ||
            postImage?.formats?.small?.url ||
            postImage?.url ||
            null;

          // Convert rich text blocks to plain text
          const contentText = Content.map((block) =>
            block.children.map((c) => c.text).join("")
          ).join("\n");

          return (
            <article key={id} className="border p-4 rounded-lg shadow">
              <Link
                href={`/posts/${id}`}
                className="text-2xl font-semibold mb-2 block hover:text-blue-600"
              >
                {Title}
              </Link>

              {imgUrl && (
                <div className="relative w-full h-64 mb-4">
                  <Image
                    src={`${strapiUrl}${imgUrl}`}
                    layout="fill"
                    objectFit="cover"
                    alt={postImage?.alternativeText || Title}
                    className="rounded"
                  />
                </div>
              )}

              <p className="mb-2 line-clamp-3">{contentText || "No content."}</p>

              {tags.length > 0 && (
                <div className="text-sm text-gray-600">
                  Tags: {tags.map((t) => t.Name).join(", ")}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </main>
  );
}