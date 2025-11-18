"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function PageLoader() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timeout);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-zinc-950 transition-opacity duration-300">
      {/* Grid pattern background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      {/* Loader */}
      <div className="relative flex flex-col items-center gap-6">
        {/* Spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-zinc-200 dark:border-zinc-800 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 dark:border-t-blue-400 rounded-full animate-spin"></div>
        </div>

        {/* Text */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm font-semibold dark:text-zinc-400 text-zinc-600">
            Loading
          </span>
          <span className="flex gap-1">
            <span className="w-1 h-1 rounded-full bg-blue-500 dark:bg-blue-400 animate-pulse" style={{ animationDelay: "0ms" }}></span>
            <span className="w-1 h-1 rounded-full bg-blue-500 dark:bg-blue-400 animate-pulse" style={{ animationDelay: "150ms" }}></span>
            <span className="w-1 h-1 rounded-full bg-blue-500 dark:bg-blue-400 animate-pulse" style={{ animationDelay: "300ms" }}></span>
          </span>
        </div>
      </div>
    </div>
  );
}
