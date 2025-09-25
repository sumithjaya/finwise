// app/content/page.tsx  (App Router)
export default function ContentDashboard() {
  const cards = [
    { title: "Blog", href: "/admin/index.html#/collections/blog", desc: "Write and publish posts" },
    { title: "Testimonials", href: "/admin/index.html#/collections/testimonial", desc: "Manage quotes" },
  ];
  return (
    <main className="mx-auto max-w-5xl p-8">
      <h1 className="text-3xl font-semibold">Content Dashboard</h1>
      <p className="text-neutral-500 mt-2">Create and manage content.</p>
      <div className="grid sm:grid-cols-2 gap-4 mt-6">
        {cards.map(c => (
          <a key={c.title} href={c.href} className="block rounded-2xl border p-5 hover:shadow">
            <div className="text-xl font-medium">{c.title}</div>
            <div className="text-neutral-500 mt-1">{c.desc}</div>
          </a>
        ))}
      </div>
    </main>
  );
}
