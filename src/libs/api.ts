// lib/api.ts
export async function fetchAPI(path: string, opts: RequestInit = {}) {
  const base = process.env.API_URL ?? "http://127.0.0.1:1337"; // local dev fallback
  const url = `${base.replace(/\/$/, "")}${path.startsWith("/") ? path : "/" + path}`;

  try {
    const res = await fetch(url, {
      ...opts,
      // If you want ISR behavior during builds / runtime
      // next: { revalidate: 60 } // uncomment if using next-specific fetch caching
    });
    if (!res.ok) throw new Error(`API ${res.status} ${res.statusText}`);
    return await res.json();
  } catch (err) {
    // Log so you can inspect build logs; do NOT rethrow when you want to avoid failing the build.
    console.error(`[fetchAPI] failed to fetch ${url}`, err);
    return null; // return null so callers can handle gracefully
  }
}
