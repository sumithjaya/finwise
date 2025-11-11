"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/hero/Header";
import Footer from "./Footer";
import GradientSection from "./ui/GradientSection";

export default function HeaderFooterWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideHeaderFooter = pathname === "/join-in";

  return (
    <div className="flex flex-col min-h-screen">
      {!hideHeaderFooter && (
        <>
          {/* Gradient background for Header + Hero */}
          <GradientSection>
            <Header />
            {/* Hero will appear right after header inside this gradient section */}
            {children}
          </GradientSection>

          {/* Footer */}
          <Footer />
        </>
      )}
      {hideHeaderFooter && <main>{children}</main>}
    </div>
  );
}
