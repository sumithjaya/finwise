"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Reveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: "-10% 0px", once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ y: 24, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
