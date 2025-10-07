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

async function getPosts(): Promise<PostItem[]> {
  const STRAPI = process.env.STRAPI_API_URL || "http://localhost:1337";
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
}

export default async function PostsPage() {
  const posts = await getPosts();

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
              <h2 className="text-2xl font-semibold mb-2">{Title}</h2>

              {imgUrl && (
                <Image
                  src={`http://localhost:1337${imgUrl}`}
                  width={600}
                  height={400}
                  alt={postImage?.alternativeText || Title}
                  className="rounded mb-4"
                />
              )}

              <p className="mb-2">{contentText || "No content."}</p>
              <Link
                href={`/posts/${post.id}`}
                className="text-2xl font-semibold mb-2 block"
              >
                {post.Title}
              </Link>
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
