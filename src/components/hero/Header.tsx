"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";
import { PopupButton } from "@typeform/embed-react";

type NavItem =
  | { label: string; href: string }
  | {
      label: string;
      items: { label: string; href: string; description?: string }[];
    };

const NAV: NavItem[] = [
  { label: "For Advisers", href: "/adviser-profile" },
  { label: "Resources", href: "/posts" },
];

const cx = (...parts: Array<string | false | null | undefined>) =>
  parts.filter(Boolean).join(" ");

function useActive() {
  const pathname = usePathname() ?? "/";
  const normalize = (p: string | null | undefined) => {
    if (!p) return "/";
    const n = p.replace(/\/+$/, "");
    return n.length ? n : "/";
  };
  const current = normalize(pathname);
  const isSection = (href: string) =>
    current === normalize(href) || current.startsWith(normalize(href) + "/");
  return { isSection };
}

export default function Header() {
  const { isSection } = useActive();
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const typeformId = process.env.NEXT_PUBLIC_TYPEFORM_ID ?? "";
  const lastScrollRef = useRef(0);
  const tickingRef = useRef(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : original;
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    if (typeof window === "undefined") return;

    const onScroll = () => {
      const current = window.pageYOffset || document.documentElement.scrollTop;

      if (!tickingRef.current) {
        window.requestAnimationFrame(() => {
          const diff = current - lastScrollRef.current;
          // ignore tiny scrolls
          if (Math.abs(diff) < 8) {
            tickingRef.current = false;
            return;
          }

          // if scrolling down and scrolled past top offset -> hide
          if (current > lastScrollRef.current && current > 80) {
            setHidden(true);
          } else if (current < lastScrollRef.current) {
            // scrolling up -> show
            setHidden(false);
          }

          lastScrollRef.current = Math.max(0, current);
          tickingRef.current = false;
        });

        tickingRef.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={cx(
        styles.header,
        scrolled && styles.headerScrolled,
        hidden && styles.headerHidden
      )}
    >
      <div className={styles.headerContainer}>
        <Link href="/" className={styles.logo}>
          WEALFY
        </Link>

        <nav className={styles.nav} aria-label="Main navigation">
          {NAV.map((item) =>
            "href" in item ? (
              <Link
                key={item.href}
                href={item.href}
                className={cx(
                  styles.navLink,
                  isSection(item.href) && styles.navLinkActive
                )}
                aria-current={isSection(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ) : null
          )}
          <div className="hidden md:flex items-center gap-2">
            <PopupButton
              id={typeformId}
              className={styles.navLinkCTA}
              aria-label="Join via Typeform"
            >
              Join In
            </PopupButton>
          </div>
        </nav>

        <button
          className={styles.mobileToggle}
          aria-label="Open menu"
          aria-haspopup="dialog"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <svg
            viewBox="0 0 28 28"
            className="h-8 w-8"
            fill="#33383877"
            aria-hidden
          >
            <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
          </svg>
        </button>

        {open && (
          <div className={styles.drawerOverlay} onClick={() => setOpen(false)}>
            <div
              ref={drawerRef}
              className={styles.drawer}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
            >
              <div className={styles.drawerHeader}>
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className={styles.drawerLogo}
                >
                  WEALFY
                </Link>
                <button onClick={() => setOpen(false)} aria-label="Close menu">
                  ✕
                </button>
              </div>

              <div className={styles.drawerLinks}>
                {NAV.map((item) =>
                  "href" in item ? (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cx(
                        styles.drawerLink,
                        isSection(item.href) && styles.drawerLinkActive
                      )}
                      aria-current={isSection(item.href) ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  ) : null
                )}
              </div>

              <div className={styles.navLinks_mobile}>
                <Link
                  href="/join-in"
                  className={styles.navLinkCTA_mobile}
                  onClick={() => setOpen(false)}
                >
                  Join In
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
