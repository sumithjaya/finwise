"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

type NavItem =
  | { label: string; href: string }
  | { label: string; items: { label: string; href: string; description?: string }[] };

const NAV: NavItem[] = [
  { label: "For Advisers", href: "/adviser-profile" },
  { label: "Resources", href: "/posts" },
];

export default function Header() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  const isActive = (href: string) => {
    if (!pathname) return false;
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  };

  // Close drawer on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Lock scroll when drawer is open
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : original;
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  // Close drawer on route change
  useEffect(() => setOpen(false), [pathname]);

  // Detect scroll for header shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}>
      <div className={styles.headerContainer}>
        <Link href="/" className={styles.logo}>
          WEALFY
        </Link>

        <nav className="hidden md:flex items-center gap-4">
          {NAV.map((item) =>
            "href" in item ? (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${isActive(item.href) ? styles.active : ""}`}
              >
                {item.label}
              </Link>
            ) : null
          )}
        </nav>

        <div className="hidden md:flex items-center gap-2">
         
          <Link href="/join-in" className={styles.navLink2}>
            Join In
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          className={styles.mobileToggle}
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
            <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
          </svg>
        </button>

        {/* Mobile drawer */}
        {open && (
          <div
            className={styles.drawerOverlay}
            onClick={() => setOpen(false)}
            role="presentation"
          >
            <div
              ref={drawerRef}
              className={styles.drawer}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.drawerHeader}>
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className={styles.drawerLogo}
                >
                  FINWISE
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
                      className={`${styles.drawerLink} ${
                        isActive(item.href) ? styles.active : ""
                      }`}
                    >
                      {item.label}
                    </Link>
                  ) : null
                )}
              </div>

              <div className={styles.navLinks_mobile}>
           
                <Link
                  href="/join-in"
                  className={styles.navLink2_mobile}
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
