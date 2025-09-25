import { AbstractAuthProvider, defineConfig  } from "tinacms";

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

 

const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

const clientId =
  process.env.NEXT_PUBLIC_TINA_CLIENT_ID || process.env.TINA_CLIENT_ID || "";

const token =
  process.env.TINA_TOKEN || process.env.NEXT_PUBLIC_TINA_TOKEN || "";

const searchIndexerToken =
  process.env.TINA_INDEXER_TOKEN ||
  process.env.NEXT_PUBLIC_TINA_SEARCH_TOKEN ||
  "";

  
class LocalAuthProvider extends AbstractAuthProvider {
  private STORAGE_KEY = "tina-local-user";

  private saveUser(u: any) {
    try { window.sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(u)); } catch {}
  }
  private readUser(): any | null {
    try {
      const raw = window.sessionStorage.getItem(this.STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  }
  private clearUser() {
    try { window.sessionStorage.removeItem(this.STORAGE_KEY); } catch {}
  }

  // REQUIRED by Tina
  async authenticate(props?: { username: string; password: string }) {
    const { username, password } = props ?? ({} as any);
    const valid = [
      { username: "admin", password: "admin123" },
      { username: "editor", password: "editor123" },
    ];
    const hit = valid.find(v => v.username === username && v.password === password);
    if (!hit) throw new Error("Invalid credentials");

    const user = { id: hit.username, name: hit.username, email: `${hit.username}@local.dev` };
    this.saveUser(user);
    return user;
  }

  async getUser() {
    return this.readUser();
  }

  async getToken() {
    // Return something the backend will accept in dev; not validated in pure local mode.
    return { id_token: "local-dev-token" };
  }

  async logout() {
    this.clearUser();
    return true;
  }

  // OPTIONAL in docs, but some versions/types expect these:
  async authorize() { return true; }
  async isAuthenticated() { return !!this.readUser(); }
  async isAuthorized() { return true; }

  // Some Tina builds/types also expect this helper. Safe to provide.
  async fetchWithToken(input: RequestInfo | URL, init?: RequestInit) {
    const { id_token } = await this.getToken();
    const headers = new Headers(init?.headers || {});
    headers.set("Authorization", `Bearer ${id_token}`);
    return fetch(input, { ...init, headers });
  }
}
export default defineConfig({
  branch,
  ...(isLocal ? {} : clientId && token ? { clientId, token } : {}),
  
  // NOTE: no AuthProvider import. Narrow cast to hush version skew.
  ...(isLocal ? { authProvider: new LocalAuthProvider() as unknown as { } } : {}),

  build: {
    publicFolder: "public",
    outputFolder: "admin",
  },

  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },

  ...(searchIndexerToken
    ? {
        search: {
          tina: {
            indexerToken: searchIndexerToken,
            stopwordLanguages: ["eng"],
          },
          indexBatchSize: 100,
          maxSearchIndexFieldLength: 100,
        },
      }
    : {}),

  schema: {
    collections: [
      {
        label: "Blog",
        name: "blog",
        path: "content/blog",
        format: "md",
        defaultItem: () => ({
          published: true,
          date: new Date().toISOString(),
          author: "Sumith",
          title: "Untitled",
        }),
        ui: {
          filename: {
            slugify: (values: any) => {
              const title = String(values?.title ?? "untitled");
              const slug = title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");
              const d = values?.date ? new Date(values.date) : new Date();
              const y = d.getFullYear();
              const m = String(d.getMonth() + 1).padStart(2, "0");
              const day = String(d.getDate()).padStart(2, "0");
              return `${y}-${m}-${day}-${slug}`;
            },
          },
          // Remove itemProps to avoid TypeScript error
        },
        fields: [
          { type: "string", name: "title", label: "Title", required: true },
          { type: "datetime", name: "date", label: "Date" },
          {
            type: "boolean",
            name: "published",
            label: "Published",
            ui: { defaultValue: true },
          },
          {
            type: "string",
            name: "subtitle",
            label: "Subtitle / Summary",
            ui: { component: "textarea" },
          },
          { type: "image", name: "image", label: "Card Image" },
          { type: "string", name: "author", label: "Author" },
          { type: "rich-text", name: "body", label: "Body" },
          {
            type: "object",
            name: "seo",
            label: "SEO",
            fields: [
              { type: "string", name: "metaTitle", label: "Meta Title" },
              {
                type: "string",
                name: "metaDescription",
                label: "Meta Description",
                ui: { component: "textarea" },
              },
              {
                type: "image",
                name: "openGraphImage",
                label: "Open Graph Image",
              },
            ],
          },
        ],
      },
      {
        label: "Testimonials",
        name: "testimonial",
        path: "content/testimonials",
        format: "json",
        defaultItem: () => ({
          published: true,
          rating: 5,
          date: new Date().toISOString(),
        }),
        ui: {
          filename: {
            slugify: (values: any) => {
              const name = String(values?.name ?? "anon")
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");
              const company = String(values?.company ?? "")
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");
              return company ? `${name}-${company}` : name;
            },
          },
          // Remove itemProps to avoid TypeScript error
        },
        fields: [
          { type: "string", name: "name", label: "Name", required: true },
          { type: "string", name: "role", label: "Role/Title" },
          { type: "string", name: "company", label: "Company" },
          { type: "image", name: "avatar", label: "Avatar" },
          { type: "number", name: "rating", label: "Rating (1–5)" },
          {
            type: "string",
            name: "quote",
            label: "Quote",
            ui: { component: "textarea" },
            required: true,
          },
          { type: "string", name: "url", label: "Link (optional)" },
          { type: "boolean", name: "featured", label: "Featured" },
          { type: "boolean", name: "published", label: "Published" },
          { type: "number", name: "order", label: "Order (lower first)" },
          { type: "datetime", name: "date", label: "Date" },
        ],
      },
    ],
  },
});