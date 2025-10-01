"use client";
import { useEffect, useRef, useState, ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "fade";
  duration?: number;
}

export default function Reveal({
  children,
  delay = 0,
  direction = "up",
  duration = 0.6,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  const getTransform = () => {
    if (isVisible) return "translate(0, 0)";
    
    switch (direction) {
      case "up":
        return "translate(0, 40px)";
      case "down":
        return "translate(0, -40px)";
      case "left":
        return "translate(40px, 0)";
      case "right":
        return "translate(-40px, 0)";
      case "fade":
        return "translate(0, 0)";
      default:
        return "translate(0, 40px)";
    }
  };

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity ${duration}s ease ${delay}s, transform ${duration}s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// Alternative component for staggered children animations
interface RevealStaggerProps {
  children: ReactNode | ReactNode[];
  stagger?: number;
  direction?: "up" | "down" | "left" | "right" | "fade";
}

export function RevealStagger({
  children,
  stagger = 150,
  direction = "up",
}: RevealStaggerProps) {
  const items = Array.isArray(children) ? children : [children];
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleIndexes, setVisibleIndexes] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            items.forEach((_, i) => {
              setTimeout(() => {
                setVisibleIndexes((prev) => {
                  if (!prev.includes(i)) return [...prev, i];
                  return prev;
                });
              }, i * stagger);
            });
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [items, stagger]);

  const getTransform = (index: number) => {
    if (visibleIndexes.includes(index)) return "translate(0, 0)";
    
    switch (direction) {
      case "up":
        return "translate(0, 30px)";
      case "down":
        return "translate(0, -30px)";
      case "left":
        return "translate(30px, 0)";
      case "right":
        return "translate(-30px, 0)";
      case "fade":
        return "translate(0, 0)";
      default:
        return "translate(0, 30px)";
    }
  };

  return (
    <div ref={containerRef}>
      {items.map((child, i) => (
        <div
          key={i}
          style={{
            opacity: visibleIndexes.includes(i) ? 1 : 0,
            transform: getTransform(i),
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}