import { TinaMarkdown } from "tinacms/dist/rich-text";
import client from "../../../../tina/__generated__/client";

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;

  // Try .md then .mdx for safety
  let data = await client.queries.blog({ relativePath: `${slug}.md` }).catch(() => null);
  if (!data?.data?.blog) {
    data = await client.queries.blog({ relativePath: `${slug}.mdx` }).catch(() => null);
  }
  if (!data?.data?.blog) {
    return <div style={{ padding: 32 }}>Post not found.</div>;
  }

  const post = data.data.blog;

  return (
    <article style={{ maxWidth: 860, margin: "60px auto", padding: "0 16px" }}>
      <h1 style={{ marginBottom: 8 }}>{post.title}</h1>
      <p style={{ color: "#666", marginTop: 0 }}>
        {post.date ? new Date(post.date).toLocaleDateString() : ""}
        {post.author ? ` • ${post.author}` : ""}
      </p>
      <TinaMarkdown content={post.body} />
    </article>
  );
}

// Optional: prebuild known slugs (not required for dev)
export async function generateStaticParams() {
  const res = await client.queries.blogConnection({ first: 500 });
  const edges = res.data.blogConnection?.edges ?? [];
  return edges.map((e: any) => ({ slug: e?.node?._sys?.filename }));
}
