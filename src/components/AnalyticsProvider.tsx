"use client";

import { pageview } from "@/libs/ga";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AnalyticsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      pageview(pathname);
    }
  }, [pathname]);

  return <>{children}</>;
}
