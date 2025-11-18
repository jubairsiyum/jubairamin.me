import { Metadata } from "next";
import { Slide } from "../animation/Slide";
import PageHeading from "@/app/components/shared/PageHeading";
import { TILType } from "@/types";
import { sanityFetch } from "@/lib/sanity.client";
import { tilsQuery } from "@/lib/sanity.query";
import Link from "next/link";
import { BiCalendar, BiTag } from "react-icons/bi";
import { HiLightBulb } from "react-icons/hi";

export const metadata: Metadata = {
  title: "Today I Learned | Jubair Amin",
  metadataBase: new URL("https://jubairamin.me/til"),
  description:
    "Quick learnings and insights from daily backend development exploration. Bite-sized knowledge from building with PHP, Laravel, MySQL, and more.",
  openGraph: {
    title: "Today I Learned | Jubair Amin",
    url: "https://jubairamin.me/til",
    description:
      "Quick learnings and insights from daily backend development exploration. Bite-sized knowledge from building with PHP, Laravel, MySQL, and more.",
    images: "https://jubairamin.me/api/og?title=Today I Learned",
  },
};

const categoryColors: Record<string, string> = {
  backend: "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
  frontend: "from-purple-500/20 to-pink-500/20 border-purple-500/30",
  database: "from-green-500/20 to-emerald-500/20 border-green-500/30",
  devops: "from-orange-500/20 to-red-500/20 border-orange-500/30",
  architecture: "from-indigo-500/20 to-blue-500/20 border-indigo-500/30",
  security: "from-red-500/20 to-rose-500/20 border-red-500/30",
  performance: "from-yellow-500/20 to-orange-500/20 border-yellow-500/30",
  testing: "from-teal-500/20 to-cyan-500/20 border-teal-500/30",
  tools: "from-gray-500/20 to-slate-500/20 border-gray-500/30",
  "best-practices": "from-violet-500/20 to-purple-500/20 border-violet-500/30",
  api: "from-sky-500/20 to-blue-500/20 border-sky-500/30",
  "php-laravel": "from-indigo-500/20 to-violet-500/20 border-indigo-500/30",
  javascript: "from-amber-500/20 to-yellow-500/20 border-amber-500/30",
  other: "from-zinc-500/20 to-gray-500/20 border-zinc-500/30",
};

const categoryLabels: Record<string, string> = {
  backend: "Backend Development",
  frontend: "Frontend Development",
  database: "Database",
  devops: "DevOps & Cloud",
  architecture: "Architecture & Design",
  security: "Security",
  performance: "Performance",
  testing: "Testing",
  tools: "Tools & CLI",
  "best-practices": "Best Practices",
  api: "API Development",
  "php-laravel": "PHP & Laravel",
  javascript: "JavaScript & Node.js",
  other: "Other",
};

const difficultyBadges: Record<string, { color: string; label: string }> = {
  beginner: { color: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30", label: "Beginner" },
  intermediate: { color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/30", label: "Intermediate" },
  advanced: { color: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30", label: "Advanced" },
};

export default async function TIL() {
  const tils: TILType[] = await sanityFetch({
    query: tilsQuery,
    tags: ["til"],
  });

  return (
    <main className="relative w-full min-h-screen">
      {/* Grid pattern background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-zinc-950"></div>
        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent"></div>
        <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-purple-500/20 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 -mt-16 pt-36 lg:pt-48 pb-12 lg:pb-20">
        <PageHeading
          title="Today I Learned"
          description="Quick learnings and insights from daily development exploration. Small discoveries that make a big difference."
        />

        {tils.length === 0 ? (
          <Slide delay={0.1}>
            <div className="mt-12 p-12 text-center border-2 border-dashed border-zinc-300 dark:border-zinc-800 rounded-2xl">
              <HiLightBulb className="w-16 h-16 mx-auto mb-4 text-zinc-400 dark:text-zinc-600" />
              <p className="text-zinc-600 dark:text-zinc-400 text-lg">
                No learnings shared yet. Check back soon!
              </p>
            </div>
          </Slide>
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tils.map((til, index) => (
              <Slide key={til._id} delay={0.1 + index * 0.05}>
                <Link href={`/til/${til.slug}`}>
                  <article className={`group h-full p-6 rounded-2xl border-2 bg-gradient-to-br ${categoryColors[til.category] || categoryColors.other} backdrop-blur-sm hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl hover:shadow-zinc-900/10 dark:hover:shadow-black/50`}>
                    {/* Category Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono font-semibold rounded-full bg-white/50 dark:bg-zinc-900/50 border border-zinc-300/50 dark:border-zinc-700/50">
                        <BiTag className="w-3 h-3" />
                        {categoryLabels[til.category] || til.category}
                      </span>
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-mono font-semibold rounded-md border ${difficultyBadges[til.difficulty].color}`}>
                        {difficultyBadges[til.difficulty].label}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-3 text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {til.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-3">
                      {til.summary}
                    </p>

                    {/* Tags */}
                    {til.tags && til.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {til.tags.slice(0, 3).map((tag, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 text-xs font-mono bg-white/60 dark:bg-zinc-900/60 border border-zinc-300/50 dark:border-zinc-700/50 rounded-md text-zinc-700 dark:text-zinc-300"
                          >
                            #{tag}
                          </span>
                        ))}
                        {til.tags.length > 3 && (
                          <span className="px-2 py-1 text-xs font-mono text-zinc-500 dark:text-zinc-500">
                            +{til.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* Date */}
                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-500 pt-4 border-t border-zinc-300/50 dark:border-zinc-700/50">
                      <BiCalendar className="w-4 h-4" />
                      {new Date(til.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </article>
                </Link>
              </Slide>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
