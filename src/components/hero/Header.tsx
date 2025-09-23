"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

type NavItem =
  | { label: string; href: string }
  | {
      label: string;
      items: { label: string; href: string; description?: string }[];
    };

const NAV: NavItem[] = [
  //   { label: "Home", href: "/" },
  { label: "How It Works", href: "/howitworks" },
  { label: "For Advisers", href: "/adviser-profile" },
  { label: "Resources", href: "/blog" },
];

function classNames(...xs: (string | false | undefined)[]) {
  return xs.filter(Boolean).join(" ");
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(href + "/");

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close drawer when the route changes
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full  border-b border-black/10    p-4" style={{backgroundColor:'transparent'}}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6  bg-white " style={{borderRadius:'20px'}}>
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2  "
          aria-label="Go to homepage"
        >
          <div className="relative h-15 w-[130px] p-2">
            <div
              style={{ color: "#137C7A", fontWeight: 800, fontSize: "28px" }}
            >
              FinWise
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav
          aria-label="Main"
          className=" hidden items-center gap-1 md:flex"
        >
          {NAV.map((item) =>
            "href" in item ? (
              <Link
                key={item.href}
                href={item.href}
                className={classNames(
                  "rounded-xl px-3 py-2 text-base   transition",
                  isActive(item.href)
                    ? "text-brand text-base text-bold"
                    : "text-foreground/80  "
                )}
              >
                {item.label}
              </Link>
            ) : (
              <details key={item.label} className="group relative">
                <summary className="list-none cursor-pointer rounded-xl px-3 py-2 text-sm font-medium text-foreground/80 transition hover:bg-foreground/10 hover:text-foreground">
                  <span className="inline-flex items-center gap-1">
                    {item.label}
                    <svg
                      className="h-4 w-4 transition group-open:rotate-180"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" />
                    </svg>
                  </span>
                </summary>
                <div className="absolute left-0 mt-2 w-[320px] rounded-2xl border border-black/10 bg-background p-2 shadow-xl ring-1 ring-black/5">
                  {item.items.map((it) => (
                    <Link
                      key={it.href}
                      href={it.href}
                      className="block rounded-xl px-3 py-2 transition hover:bg-brand-blue01"
                    >
                      <div className="text-sm font-medium text-foreground">
                        {it.label}
                      </div>
                      {it.description && (
                        <div className="text-xs text-foreground/70">
                          {it.description}
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
              </details>
            )
          )}
          {/* CTA then divider */}
          
          <div className="mx-1 h-5 w-px bg-foreground/10" />
        </nav>
<div className="  flex flex-row items-center gap-1 text-foreground/70">
            <Link
              href="/get-started"
              className="ml-1 rounded-xl border border-brand px-3 py-2 text-brand font-semibold text-background shadow-sm transition hover:opacity-90"
            >
              Sign in
            </Link>
            <Link
              href="/join-in"
              className="ml-1 rounded-xl bg-brand px-3 py-2 text-base font-semibold text-background shadow-sm transition hover:opacity-90"
            >
              Join In
            </Link>
          </div>
        {/* Mobile toggle */}
        <button
          className="ml-auto inline-flex items-center justify-center rounded-xl p-2 ring-1 ring-black/10 transition hover:bg-black/5 md:hidden"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
            <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
          </svg>
        </button>

        {/* Mobile Drawer */}
        {open && (
          <div
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm md:hidden"
            onClick={() => setOpen(false)}
            aria-hidden
          >
            <div
              ref={drawerRef}
              onClick={(e) => e.stopPropagation()}
              className="ml-auto h-full w-80 max-w-[85%] overflow-y-auto border-l border-black/10 bg-background p-4 shadow-2xl flex items-center"
            >
              <div className="  flex items-center justify-between">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2"
                >
                  <div className="relative ">
                    <Image
                      src="/images/logo.png"
                      alt="Thero"
                      fill
                      className="object-contain"
                      width={500}
                    />
                  </div>
                </Link>
                <button
                  aria-label="Close menu"
                  className="rounded-xl p-2 ring-1 ring-black/10 transition hover:bg-black/5"
                  onClick={() => setOpen(false)}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="currentColor"
                  >
                    <path d="M6.4 4.98L4.98 6.4 10.59 12l-5.6 5.6 1.41 1.41L12 13.41l5.6 5.6 1.41-1.41L13.41 12l5.6-5.6-1.41-1.41L12 10.59z" />
                  </svg>
                </button>
              </div>

              <div className="space-y-1">
                {NAV.map((item) =>
                  "href" in item ? (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={classNames(
                        "block rounded-xl px-3 py-3 text-sm font-medium",
                        isActive(item.href)
                          ? "bg-foreground/10 text-foreground"
                          : "text-foreground/80 hover:bg-foreground/10 hover:text-foreground"
                      )}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <details
                      key={item.label}
                      className="rounded-xl border border-foreground/10 p-2 open:bg-foreground/5"
                    >
                      <summary className="cursor-pointer px-1 py-1 text-sm font-semibold text-foreground/80">
                        {item.label}
                      </summary>
                      <div className="mt-1 space-y-1">
                        {item.items.map((it) => (
                          <Link
                            key={it.href}
                            href={it.href}
                            onClick={() => setOpen(false)}
                            className="block rounded-lg px-3 py-2 text-sm text-foreground/80 hover:bg-foreground/10 hover:text-foreground"
                          >
                            <div className="font-medium">{it.label}</div>
                            {it.description && (
                              <div className="text-xs text-foreground/70">
                                {it.description}
                              </div>
                            )}
                          </Link>
                        ))}
                      </div>
                    </details>
                  )
                )}
              </div>

              <div className="mt-3">
                <Link
                  href="/get-started"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full items-center justify-center rounded-xl bg-foreground px-3 py-2 text-sm font-semibold text-background shadow-sm transition hover:opacity-90"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
