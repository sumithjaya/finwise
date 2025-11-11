// src/lib/posts.ts
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

// ----------------- STRAPI CONFIG -----------------

const STRAPI =
  process.env.NEXT_PUBLIC_STRAPI_API_URL ??
  process.env.NEXT_PUBLIC_STRAPI_URL ??
  process.env.STRAPI_API_URL ??
  "http://localhost:1337";

const STRAPI_API_TOKEN =
  process.env.STRAPI_API_TOKEN ??
  process.env.NEXT_PUBLIC_STRAPI_API_TOKEN ??
  null;

// ----------------- FETCH UTILS -----------------

async function safeFetch(
  input: RequestInfo,
  init?: RequestInit,
  timeoutMs = 7000
) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(input, {
      ...(init || {}),
      signal: controller.signal,
    });
    clearTimeout(timeout);
    return res;
  } catch (err: any) {
    clearTimeout(timeout);
    if (err?.name === "AbortError") {
      const e = new Error(`Request aborted after ${timeoutMs}ms`);
      (e as any).code = "ETIMEDOUT";
      throw e;
    }
    throw err;
  }
}

// ----------------- MAIN FUNCTION -----------------

export async function getPostById(
  documentId: string | number
): Promise<PostItem | null> {
  const idStr = String(documentId);
  const base = STRAPI.replace(/\/$/, "");
  const url = `${base}/api/wealfy-blog-posts/${encodeURIComponent(idStr)}?populate=*`;
  console.log("Strapi url:", url);
  const headers: Record<string, string> = {
    Accept: "application/json",
  };
  if (STRAPI_API_TOKEN) {
    headers["Authorization"] = `Bearer ${STRAPI_API_TOKEN}`;
  }

  try {
    const res = await fetch(url, { headers, next: { revalidate: 60 } });

    console.log("Strapi res:", res);
    if (!res.ok) {
      let bodyText = "<no body>";
      try {
        bodyText = await res.text();
      } catch {}
      console.warn(
        "Strapi fetch failed:",
        res.status,
        res.statusText,
        "url:",
        url,
        "body:",
        bodyText
      );
      return null;
    }

    const json = await res.json();
    const raw = Array.isArray(json.data) ? json.data[0] : (json.data ?? json);
    if (!raw) return null;

    const attrs = raw.attributes ?? raw;

    const Title = attrs.Title ?? attrs.title ?? attrs.name ?? "Untitled";
    const Content = attrs.Content ?? attrs.content ?? null;

    // --- Tags normalization ---
    let tags: Tag[] = [];
    if (attrs.tags) {
      if (Array.isArray(attrs.tags)) {
        tags = attrs.tags.map((t: any) =>
          t?.attributes
            ? { id: t.id, Name: t.attributes.Name ?? t.attributes.name }
            : { id: t.id ?? undefined, Name: t.Name ?? t.name }
        );
      } else if (attrs.tags.data && Array.isArray(attrs.tags.data)) {
        tags = attrs.tags.data.map((t: any) => {
          const tAttrs = t.attributes ?? {};
          return { id: t.id, Name: tAttrs.Name ?? tAttrs.name ?? "" };
        });
      } else if (typeof attrs.tags === "object") {
        const maybeAttrs = attrs.tags.attributes ?? attrs.tags;
        tags = [
          {
            id: maybeAttrs.id ?? undefined,
            Name: maybeAttrs.Name ?? maybeAttrs.name ?? "",
          },
        ];
      }
    }

    // --- Image normalization ---
    let CoverImage: Media | null = null;
    if (attrs.CoverImage) {
      const imageData =
        attrs.CoverImage?.data?.attributes ??
        attrs.CoverImage?.attributes ??
        attrs.CoverImage?.data ??
        attrs.CoverImage;

      if (imageData) {
        const urlCandidate =
          imageData.url ??
          imageData.formats?.medium?.url ??
          imageData.formats?.small?.url ??
          null;

        const absoluteUrl =
          urlCandidate &&
          typeof urlCandidate === "string" &&
          urlCandidate.startsWith("/")
            ? `${base}${urlCandidate}`
            : urlCandidate;

        CoverImage = {
          url: absoluteUrl ?? null,
          alternativeText:
            imageData.alternativeText ??
            imageData.alternative_text ??
            imageData.alt ??
            null,
          formats: imageData.formats ?? undefined,
        };
      }
    }

    return {
      id: raw.id ?? idStr,
      Title,
      Content,
      CoverImage,
      tags,
      documentId: idStr,
    };
  } catch (err: any) {
    if (err?.code === "ETIMEDOUT" || err?.name === "AbortError") {
      console.warn("getPostById aborted (timeout). url:", url);
    } else {
      console.warn("getPostById error:", err?.message ?? err);
    }
    return null;
  }
}
