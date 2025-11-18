import UnmountStudio from "./Unmount";

export default function Footer() {
  return (
    <UnmountStudio>
      <footer className="relative mt-32 border-t-2 dark:border-zinc-800 border-zinc-300">
        {/* Grid pattern background */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none opacity-30">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 xl:px-32 2xl:px-40 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left Section - Brand */}
            <div className="flex flex-col items-center md:items-start gap-3">
              <div className="font-mono text-lg font-bold dark:text-white text-zinc-900">
                jubairamin.me
              </div>
              <p className="font-mono text-sm dark:text-zinc-500 text-zinc-500 text-center md:text-left">
                <span className="dark:text-zinc-600 text-zinc-400">&#47;&#47;</span> Backend Developer &amp; System Architect
              </p>
            </div>

            {/* Center Section - Links */}
            <div className="flex items-center gap-4">
              <a
                href="/about"
                className="font-mono text-sm dark:text-zinc-400 text-zinc-600 hover:dark:text-white hover:text-zinc-900 transition-colors"
              >
                About
              </a>
              <span className="dark:text-zinc-700 text-zinc-300">|</span>
              <a
                href="/projects"
                className="font-mono text-sm dark:text-zinc-400 text-zinc-600 hover:dark:text-white hover:text-zinc-900 transition-colors"
              >
                Projects
              </a>
              <span className="dark:text-zinc-700 text-zinc-300">|</span>
              <a
                href="/blog"
                className="font-mono text-sm dark:text-zinc-400 text-zinc-600 hover:dark:text-white hover:text-zinc-900 transition-colors"
              >
                Blog
              </a>
            </div>

            {/* Right Section - Copyright */}
            <div className="text-center md:text-right">
              <p className="font-mono text-sm dark:text-zinc-500 text-zinc-500">
                &copy; {new Date().getFullYear()} Jubair Amin
              </p>
              <p className="font-mono text-xs dark:text-zinc-600 text-zinc-400 mt-1">
                All rights reserved
              </p>
            </div>
          </div>
        </div>
      </footer>
    </UnmountStudio>
  );
}
