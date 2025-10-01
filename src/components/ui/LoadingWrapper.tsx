"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function LoadingWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  // Show loader on route change
  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/90 z-[9999]">
          <div className="dots-spinner flex space-x-2">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      )}
      {children}
      <style jsx>{`
        .dots-spinner {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .dot {
          width: 16px;
          height: 16px;
          background-color: #137C7A; /* brand color */
          border-radius: 50%;
          animation: bounce 0.6s infinite alternate;
        }

        .dot:nth-child(2) {
          animation-delay: 0.2s;
        }

        .dot:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes bounce {
          0% { transform: translateY(0); opacity: 0.3; }
          50% { transform: translateY(-12px); opacity: 1; }
          100% { transform: translateY(0); opacity: 0.3; }
        }
      `}</style>
    </>
  );
}
