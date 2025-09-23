// lib/adminAuth.ts
export const ADMIN_TOKEN_KEY = "finwise_admin_token";

function setCookie(name: string, value: string, days = 7) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; Expires=${expires}; Path=/; SameSite=Lax`;
}
function deleteCookie(name: string) {
  document.cookie = `${name}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/; SameSite=Lax`;
}

export function isAuthed(): boolean {
  if (typeof document === "undefined") return false;
  // Prefer cookie (works with middleware), localStorage is secondary for client UX
  const hasCookie = document.cookie.split("; ").some((c) => c.startsWith(`${ADMIN_TOKEN_KEY}=`));
  if (hasCookie) return true;
  const t = typeof localStorage !== "undefined" ? localStorage.getItem(ADMIN_TOKEN_KEY) : null;
  return !!t;
}

export function loginWithPassword(pw: string) {
  const ok = pw === process.env.NEXT_PUBLIC_TINA_ADMIN_PASSWORD;
  if (ok) {
    setCookie(ADMIN_TOKEN_KEY, "ok", 7);
    try { localStorage.setItem(ADMIN_TOKEN_KEY, "ok"); } catch {}
  }
  return ok;
}

export function logout() {
  deleteCookie(ADMIN_TOKEN_KEY);
  try { localStorage.removeItem(ADMIN_TOKEN_KEY); } catch {}
}
