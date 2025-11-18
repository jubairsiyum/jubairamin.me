"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import {
  HiBeaker,
  HiBookmarkAlt,
  HiCamera,
  HiOutlineX,
  HiUser,
} from "react-icons/hi";
import Logo from "../../../public/logo.png";

export default function MobileMenu() {
  const [navShow, setNavShow] = useState(false);
  const data = [
    {
      title: "About",
      href: "/about",
      icon: HiUser,
    },
    {
      title: "Projects",
      href: "/projects",
      icon: HiBeaker,
    },
    {
      title: "Blog",
      href: "/blog",
      icon: HiBookmarkAlt,
    },
    {
      title: "Photos",
      href: "/photos",
      icon: HiCamera,
    },
  ];

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = "auto";
      } else {
        document.body.style.overflow = "hidden";
      }
      return !status;
    });
  };

  return (
    <>
      <button
        aria-label="Toggle Menu"
        onClick={onToggleNav}
        className="md:hidden p-2 border-2 border-zinc-300 dark:border-zinc-800 hover:border-zinc-900 dark:hover:border-white rounded-lg transition-all duration-200 hover:scale-105"
      >
        <RxHamburgerMenu className="text-xl" />
      </button>
      <div
        className={`md:hidden fixed left-0 top-0 z-50 h-full w-full transform duration-500 ease-in-out backdrop-blur-md bg-white/95 dark:bg-zinc-900/95 ${
          navShow ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Grid pattern background */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>

        <div className="flex items-center justify-between px-6 py-6 border-b-2 border-zinc-300 dark:border-zinc-800">
          <Link href="/" onClick={onToggleNav} className="flex items-center gap-3">
            <Image src={Logo} width={40} height={40} alt="logo" className="rounded-full ring-2 ring-zinc-300 dark:ring-zinc-700" />
            <span className="font-mono text-sm font-semibold">jubairamin.me</span>
          </Link>

          <button
            aria-label="Toggle Menu"
            onClick={onToggleNav}
            className="p-2 border-2 border-zinc-300 dark:border-zinc-800 hover:border-zinc-900 dark:hover:border-white rounded-lg transition-all duration-200"
          >
            <HiOutlineX className="text-xl" />
          </button>
        </div>
        
        <nav className="flex flex-col p-6 gap-2">
          {data.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="group flex items-center gap-4 p-4 bg-white dark:bg-zinc-900 border-2 border-zinc-300 dark:border-zinc-800 hover:border-zinc-900 dark:hover:border-white rounded-lg transition-all duration-200 hover:scale-[1.02]"
              onClick={onToggleNav}
            >
              <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg border border-zinc-300 dark:border-zinc-700 group-hover:border-zinc-900 dark:group-hover:border-white transition-colors">
                <link.icon
                  className="text-xl dark:text-zinc-400 text-zinc-600 group-hover:dark:text-white group-hover:text-zinc-900 transition-colors"
                  aria-hidden="true"
                />
              </div>
              <span className="font-mono font-semibold text-lg">{link.title}</span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
