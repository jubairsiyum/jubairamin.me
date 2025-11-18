"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function PageLoader() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  // Get page name from pathname
  const getPageName = () => {
    if (pathname === "/") return "home";
    const segments = pathname.split("/").filter(Boolean);
    return segments[0] || "page";
  };

  useEffect(() => {
    // Show loader immediately on route change
    setLoading(true);

    // Hide loader after a short delay
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timeout);
  }, [pathname]);

  // Also listen to link clicks for immediate feedback
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");
      
      if (link && link.href && !link.target && !link.download) {
        const url = new URL(link.href);
        const currentUrl = new URL(window.location.href);
        
        // Only show loader for same-origin navigation
        if (url.origin === currentUrl.origin && url.pathname !== currentUrl.pathname) {
          setLoading(true);
        }
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-zinc-950 transition-opacity duration-300">
      {/* Grid pattern background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      {/* Terminal-Style Loader */}
      <div className="relative max-w-md w-full mx-4">
        {/* Terminal Window */}
        <div className="border-2 border-zinc-300 dark:border-zinc-800 rounded-xl overflow-hidden shadow-2xl bg-white dark:bg-zinc-950">
          {/* Terminal Header */}
          <div className="bg-zinc-100 dark:bg-zinc-900 px-4 py-3 flex items-center justify-between border-b-2 border-zinc-300 dark:border-zinc-800">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <span className="text-xs font-mono dark:text-zinc-500 text-zinc-500">terminal</span>
            </div>
            <div className="w-16"></div>
          </div>
          
          {/* Terminal Content */}
          <div className="p-6 font-mono text-sm space-y-2 min-h-[200px]">
            <div className="flex items-center gap-2">
              <span className="text-green-500 dark:text-green-400">$</span>
              <span className="dark:text-zinc-400 text-zinc-600">npm run load:{getPageName()}</span>
            </div>
            
            <div className="pl-4 space-y-1 mt-3">
              <div className="flex items-center gap-2 animate-pulse">
                <span className="text-blue-500 dark:text-blue-400">→</span>
                <span className="dark:text-zinc-500 text-zinc-600">Initializing route...</span>
              </div>
              
              <div className="flex items-center gap-2 animate-pulse" style={{ animationDelay: "150ms" }}>
                <span className="text-purple-500 dark:text-purple-400">→</span>
                <span className="dark:text-zinc-500 text-zinc-600">Compiling components...</span>
              </div>
              
              <div className="flex items-center gap-2 animate-pulse" style={{ animationDelay: "300ms" }}>
                <span className="text-orange-500 dark:text-orange-400">→</span>
                <span className="dark:text-zinc-500 text-zinc-600">Loading data...</span>
              </div>
              
              <div className="flex items-center gap-2 mt-4">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "150ms" }}></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "300ms" }}></span>
                </div>
                <span className="dark:text-zinc-600 text-zinc-400 text-xs">Please wait</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6 pt-4">
              <div className="h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full animate-progress"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          0% {
            width: 0%;
            transform: translateX(0);
          }
          50% {
            width: 70%;
          }
          100% {
            width: 100%;
            transform: translateX(0);
          }
        }
        .animate-progress {
          animation: progress 0.8s ease-in-out;
        }
      `}</style>
    </div>
  );
}
