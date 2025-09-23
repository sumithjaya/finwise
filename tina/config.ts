import { defineConfig } from "tinacms";

export default defineConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!,
  token: process.env.TINA_TOKEN!,
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH!,
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
  search: {
    tina: {
      indexerToken: "<Your Search Token>",
      stopwordLanguages: ["eng"],
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100,
  },

  schema: {
    collections: [
      {
        label: "Blog",
        name: "blog",
        path: "content/blog",
        format: "md",
        ui: {
          filename: {
            slugify: (values) => {
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

          // NEW: summary/subtitle used by your cards
          {
            type: "string",
            name: "subtitle",
            label: "Subtitle / Summary",
            ui: { component: "textarea" },
          },

          // NEW: main image used by cards/hero
          { type: "image", name: "image", label: "Card Image" },

          // NEW: author (keep as string for now; can upgrade to a reference collection later)
          { type: "string", name: "author", label: "Author" },

          // Optional extras (uncomment if you want them)
          // { type: "string",  name: "category",  label: "Category" },
          // { type: "string",  name: "tags",      label: "Tags", list: true },

          // Body content (rich-text)
          { type: "rich-text", name: "body", label: "Body" },

          // Optional SEO group
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
            // ui: { collapsed: true }
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
            // e.g. "sumith-acme"
            slugify: (values) => {
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
