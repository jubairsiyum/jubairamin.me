"use client";
import { motion, useInView, useAnimation } from "framer-motion";
import { useRef, useEffect, RefObject } from "react";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}

export const FadeIn = ({ 
  children, 
  className, 
  delay = 0,
  direction = "up" 
}: FadeInProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInview = useInView(ref as RefObject<Element>, { once: true, margin: "-100px" });
  const controls = useAnimation();

  const directionOffset = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 },
  };

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
          ...directionOffset[direction]
        },
        visible: { 
          opacity: 1,
          y: 0,
          x: 0
        },
      }}
      transition={{
        duration: 0.6,
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
