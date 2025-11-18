import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.png";
import Theme from "./Theme";
import UnmountStudio from "./Unmount";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
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

  return (
    <UnmountStudio>
      <div className="fixed top-0 left-0 right-0 z-[100] flex justify-center pt-4 px-4">
        <header className="w-full max-w-7xl backdrop-blur-xl bg-white/70 dark:bg-zinc-900/70 border-2 border-zinc-300/50 dark:border-zinc-700/50 rounded-2xl shadow-lg shadow-zinc-200/50 dark:shadow-zinc-950/50">
          <div className="px-6 md:px-8 lg:px-12 py-3">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-300"></div>
                  <Image 
                    src={Logo} 
                    width={36} 
                    height={36} 
                    alt="logo" 
                    className="relative rounded-full ring-2 ring-zinc-300/50 dark:ring-zinc-600/50 group-hover:ring-blue-500 dark:group-hover:ring-blue-400 transition-all duration-300 group-hover:scale-110"
                  />
                </div>
                <span className="font-mono text-sm font-bold dark:text-white text-zinc-900 hidden sm:block bg-gradient-to-r from-zinc-900 to-zinc-700 dark:from-white dark:to-zinc-300 bg-clip-text group-hover:text-transparent transition-all">jubairamin.me</span>
              </Link>

              <nav className="md:block hidden">
                <ul className="flex items-center gap-x-1">
                  {data.map((link, id) => (
                    <li key={id}>
                      <Link
                        href={link.href}
                        className="relative px-4 py-2 font-mono text-sm font-medium dark:text-zinc-300 text-zinc-700 hover:dark:text-white hover:text-zinc-900 transition-all duration-200 group"
                      >
                        <span className="relative z-10">{link.title}</span>
                        <span className="absolute inset-0 bg-zinc-200/50 dark:bg-zinc-800/50 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-200 origin-center"></span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="flex items-center gap-x-3">
                <Theme />
                <MobileMenu />
              </div>
            </div>
          </div>
        </header>
      </div>
      {/* Spacer to prevent content from going under the floating navbar */}
      <div className="h-20"></div>
    </UnmountStudio>
  );
}
