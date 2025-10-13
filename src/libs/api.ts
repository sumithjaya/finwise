// lib/api.ts
export async function fetchAPI<T = any>(
  path: string,
  opts: RequestInit = {},
  baseURL?: string
): Promise<T | null> {
  // Default to public Strapi URL; allow override with env or param
  const base =
    baseURL ??
    process.env.NEXT_PUBLIC_STRAPI_API_URL ??
    process.env.STRAPI_API_URL ??
    "http://ec2-52-201-227-20.compute-1.amazonaws.com:1337";

  const url = `${base.replace(/\/$/, "")}${path.startsWith("/") ? path : "/" + path}`;

  try {
    const res = await fetch(url, {
      ...opts,
    });

    if (!res.ok) {
      console.error(`[fetchAPI] Failed: ${res.status} ${res.statusText} for ${url}`);
      return null;
    }

    return (await res.json()) as T;
  } catch (err) {
    console.error(`[fetchAPI] Network error fetching ${url}:`, err);
    return null;
  }
}
