"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/hero/Header"; 
import Footer from "./Footer";

export default function HeaderFooterWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideHeaderFooter = pathname === "/join-in";

  return (
    <div className="flex flex-col">
      {!hideHeaderFooter && <Header />}
      <main className="  ">{children}</main>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}
