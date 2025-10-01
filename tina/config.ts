import { defineConfig, LocalAuthProvider } from "tinacms";

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

// Lazy import authjs provider only in Cloud mode
let authProvider: any;
if (isLocal) {
  authProvider = new LocalAuthProvider();
} else {
  // require dynamically so it doesn't get bundled in local mode
  const {
    UsernamePasswordAuthJSProvider,
  } = require("tinacms-authjs/dist/tinacms");
  authProvider = new UsernamePasswordAuthJSProvider();
}

export default defineConfig({
  branch,
  ...(isLocal ? {} : clientId && token ? { clientId, token } : {}),

  authProvider,

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
          {
            type: "string",
            name: "frontmatter_tags",
            label: "Tags",
            description: "Tags for this post",
            list: true,
            ui: {
              component: "tags",
            },
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
          name: "Anonymous", // for testimonials
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
