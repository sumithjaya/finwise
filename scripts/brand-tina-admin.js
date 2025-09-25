// scripts/brand-tina-admin.js
import fs from "node:fs";
import path from "node:path";

const adminDir = path.join(process.cwd(), "public", "admin");
const indexPath = path.join(adminDir, "index.html");
if (!fs.existsSync(indexPath)) {
  console.error("No public/admin/index.html found. Build Tina first.");
  process.exit(1);
}

let html = fs.readFileSync(indexPath, "utf8");
if (!html.includes("brand.css")) {
  html = html.replace("</head>", `  <link rel="stylesheet" href="brand.css"></head>`);
}
if (!html.includes("custom-welcome")) {
  html = html.replace(
    "<body>",
    `<body>
<div id="custom-welcome">
  <h2>Welcome to your Finwise CMS</h2>
  <p>Get started: <a href="/admin/index.html#/collections/blog">Blog</a> · <a href="/admin/index.html#/collections/testimonial">Testimonials</a></p>
</div>`
  );
}
fs.writeFileSync(indexPath, html, "utf8");
console.log("Injected brand.css and custom welcome.");
