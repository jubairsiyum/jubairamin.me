"use client";
import { motion, useInView, useAnimation } from "framer-motion";
import { useRef, useEffect, RefObject } from "react";

interface ScaleInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const ScaleIn = ({ children, className, delay = 0 }: ScaleInProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInview = useInView(ref as RefObject<Element>, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInview) {
      controls.start("visible");
    }
  }, [controls, isInview]);

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { 
          opacity: 0,
          scale: 0.8,
        },
        visible: { 
          opacity: 1,
          scale: 1,
        },
      }}
      transition={{
        duration: 0.5,
        delay: delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      animate={controls}
      initial="hidden"
    >
      <div className={className}>{children}</div>
    </motion.div>
  );
};
