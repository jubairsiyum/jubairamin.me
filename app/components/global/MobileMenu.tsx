"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { HiOutlineX } from "react-icons/hi";

export default function MobileMenu() {
  const [navShow, setNavShow] = useState(false);
  const data = [
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Projects",
      href: "/projects",
    },
    {
      title: "Blog",
      href: "/blog",
    },
    {
      title: "T.I.L",
      href: "/til",
    },
    {
      title: "Contact",
      href: "/contact",
    },
  ];

  const onToggleNav = () => {
    setNavShow((status) => !status);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && navShow) {
        onToggleNav();
      }
    };

    if (navShow) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [navShow]);

  return (
    <>
      <button
        aria-label="Toggle Menu"
        onClick={onToggleNav}
        className="md:hidden relative p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
      >
        {navShow ? (
          <HiOutlineX className="text-xl text-zinc-700 dark:text-zinc-300" />
        ) : (
          <RxHamburgerMenu className="text-xl text-zinc-700 dark:text-zinc-300" />
        )}
      </button>

      {/* Backdrop */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-zinc-900/20 dark:bg-zinc-950/40 backdrop-blur-sm transition-opacity duration-300 ${
          navShow ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onToggleNav}
      />

      {/* Mobile Menu Dropdown */}
      <nav
        className={`md:hidden fixed left-4 right-4 top-[4.5rem] z-50 backdrop-blur-xl bg-white/95 dark:bg-zinc-900/95 border-2 border-zinc-300/50 dark:border-zinc-700/50 rounded-xl shadow-2xl shadow-zinc-200/50 dark:shadow-zinc-950/80 overflow-hidden transition-all duration-300 origin-top ${
          navShow ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-4 pointer-events-none"
        }`}
      >
        {/* Terminal-style header */}
        <div className="px-4 py-2.5 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-950/50">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-400 dark:bg-zinc-700"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-400 dark:bg-zinc-700"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-400 dark:bg-zinc-700"></div>
            </div>
            <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-600 ml-1">
              ~/navigation
            </span>
          </div>
        </div>

        <div className="p-3 space-y-1.5">
          {data.map((link, index) => (
            <Link
              key={link.title}
              href={link.href}
              onClick={onToggleNav}
              className="group relative flex items-center gap-3 px-3.5 py-3 rounded-lg font-mono text-sm font-medium transition-all duration-200 active:scale-[0.98]"
              style={{ 
                transitionDelay: navShow ? `${index * 30}ms` : '0ms' 
              }}
            >
              {/* Background */}
              <span className="absolute inset-0 bg-zinc-100 dark:bg-zinc-800/50 rounded-lg opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-200"></span>
              
              {/* Left border accent */}
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-blue-500 dark:bg-blue-400 rounded-r-full group-hover:h-8 transition-all duration-200"></span>
              
              {/* Content */}
              <span className="relative z-10 flex items-center gap-3 w-full">
                <span className="text-blue-500 dark:text-blue-400 text-xs">$</span>
                <span className="text-zinc-600 dark:text-zinc-500 text-xs">cd</span>
                <span className="flex-1 dark:text-zinc-200 text-zinc-800 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  ./{link.href.slice(1) || 'home'}
                </span>
                <span className="text-zinc-400 dark:text-zinc-600 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>

        {/* Terminal-style footer */}
        <div className="px-4 py-2.5 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-950/50">
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="text-zinc-500 dark:text-zinc-600">
              <span className="text-green-500 dark:text-green-400">●</span> {data.length} routes
            </span>
            <span className="text-zinc-400 dark:text-zinc-700">
              tap outside to close
            </span>
          </div>
        </div>
      </nav>
    </>
  );
}
