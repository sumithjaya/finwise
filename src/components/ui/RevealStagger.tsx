"use client";
import { useEffect, useRef, useState, ReactNode } from "react";

export default function RevealStagger({
  children,
  stagger = 200,
}: {
  children: ReactNode | ReactNode[];
  stagger?: number;
}) {
  const items = Array.isArray(children) ? children : [children];
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleIndexes, setVisibleIndexes] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate in
            items.forEach((_, i) => {
              setTimeout(() => {
                setVisibleIndexes((prev) => {
                  if (!prev.includes(i)) return [...prev, i];
                  return prev;
                });
              }, i * stagger);
            });
          } else {
            // Reset when leaving viewport
            setVisibleIndexes([]);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [items, stagger]);

  return (
    <div ref={containerRef}>
      {items.map((child, i) => (
        <div
          key={i}
          style={{
            opacity: visibleIndexes.includes(i) ? 1 : 0,
            transform: visibleIndexes.includes(i)
              ? "translateY(0px)"
              : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
