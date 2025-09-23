"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/hero/Header";
import Footer from "@/components/Footer";

export default function HeaderFooterWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideHeaderFooter = pathname === "/join-in";

  return (
    <>
      {!hideHeaderFooter && <Header />}
      {children}
      {/* {!hideHeaderFooter && <Footer />} */}
    </>
  );
}
