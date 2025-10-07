// src/lib/posts.ts 

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
 