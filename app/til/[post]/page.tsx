import { Metadata } from "next";
import { Slide } from "../../animation/Slide";
import { TILType } from "@/types";
import { sanityFetch } from "@/lib/sanity.client";
import { singleTilQuery, tilsQuery } from "@/lib/sanity.query";
import { PortableText } from "@portabletext/react";
import { CustomPortableText } from "@/app/components/shared/CustomPortableText";
import Image from "next/image";
import Link from "next/link";
import { BiArrowBack, BiCalendar, BiTag, BiLink } from "react-icons/bi";
import { HiLightBulb } from "react-icons/hi";
import { notFound } from "next/navigation";

type Props = {
  params: {
    post: string;
  };
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

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.post;
  const til: TILType = await sanityFetch({
    query: singleTilQuery,
    tags: [`til:${slug}`],
    qParams: { slug },
  });

  if (!til) {
    return {
      title: "TIL Not Found",
    };
  }

  return {
    title: `${til.title} | TIL`,
    metadataBase: new URL(`https://jubairamin.me/til/${til.slug}`),
    description: til.summary,
    openGraph: {
      title: `${til.title} | TIL`,
      url: `https://jubairamin.me/til/${til.slug}`,
      description: til.summary,
      images: `https://jubairamin.me/api/og?title=${encodeURIComponent(til.title)}`,
    },
  };
}

// Generate static paths for all TILs
export async function generateStaticParams() {
  const tils: TILType[] = await sanityFetch({
    query: tilsQuery,
    tags: ["til"],
  });

  return tils.map((til) => ({
    post: til.slug,
  }));
}

export default async function TILDetail({ params }: Props) {
  const slug = params.post;
  const til: TILType = await sanityFetch({
    query: singleTilQuery,
    tags: [`til:${slug}`],
    qParams: { slug },
  });

  if (!til) {
    notFound();
  }

  return (
    <main className="relative w-full min-h-screen">
      {/* Grid pattern background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-zinc-950"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-8 lg:px-12 -mt-16 pt-36 lg:pt-48 pb-12 lg:pb-20">
        {/* Back Button */}
        <Slide delay={0.05}>
          <Link
            href="/til"
            className="inline-flex items-center gap-2 text-sm font-mono text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors mb-8 group"
          >
            <BiArrowBack className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to all learnings
          </Link>
        </Slide>

        {/* Header Card */}
        <Slide delay={0.1}>
          <div className={`p-8 rounded-2xl border-2 bg-gradient-to-br ${categoryColors[til.category] || categoryColors.other} backdrop-blur-sm mb-8`}>
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 text-sm font-mono font-semibold rounded-full bg-white/50 dark:bg-zinc-900/50 border border-zinc-300/50 dark:border-zinc-700/50">
                <BiTag className="w-4 h-4" />
                {categoryLabels[til.category] || til.category}
              </span>
              <span className={`inline-flex items-center px-3 py-1 text-sm font-mono font-semibold rounded-md border ${difficultyBadges[til.difficulty].color}`}>
                {difficultyBadges[til.difficulty].label}
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1 text-sm font-mono text-zinc-600 dark:text-zinc-400 bg-white/50 dark:bg-zinc-900/50 border border-zinc-300/50 dark:border-zinc-700/50 rounded-full">
                <BiCalendar className="w-4 h-4" />
                {new Date(til.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            {/* Title & Summary */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl max-w-3xl font-bold text-zinc-900 dark:text-white mb-4">
              {til.title}
            </h1>
            <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {til.summary}
            </p>

            {/* Tags */}
            {til.tags && til.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-zinc-300/50 dark:border-zinc-700/50">
                {til.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-sm font-mono bg-white/60 dark:bg-zinc-900/60 border border-zinc-300/50 dark:border-zinc-700/50 rounded-md text-zinc-700 dark:text-zinc-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </Slide>

        {/* Main Code Example */}
        {til.codeExample && (
          <Slide delay={0.15}>
            <div className="mb-8">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                <HiLightBulb className="w-6 h-6 text-yellow-500" />
                Code Example
              </h2>
              <div className="rounded-xl overflow-hidden border-2 border-zinc-300 dark:border-zinc-800 bg-zinc-900">
                <pre className="p-6 overflow-x-auto">
                  <code className="text-sm text-zinc-100">{til.codeExample.code}</code>
                </pre>
              </div>
            </div>
          </Slide>
        )}

        {/* Detailed Explanation */}
        <Slide delay={0.2}>
          <article className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-zinc-900 dark:prose-headings:text-white prose-p:text-zinc-700 dark:prose-p:text-zinc-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-strong:text-zinc-900 dark:prose-strong:text-white prose-code:text-pink-600 dark:prose-code:text-pink-400 prose-code:bg-zinc-100 dark:prose-code:bg-zinc-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-[''] prose-code:after:content-['']">
            <PortableText value={til.body} components={CustomPortableText} />
          </article>
        </Slide>

        {/* Resources */}
        {til.resources && til.resources.length > 0 && (
          <Slide delay={0.25}>
            <div className="mt-8 p-6 rounded-2xl border-2 border-zinc-300 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                <BiLink className="w-6 h-6 text-blue-500" />
                Useful Resources
              </h2>
              <ul className="space-y-3">
                {til.resources.map((resource, i) => (
                  <li key={i}>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-medium"
                    >
                      <BiLink className="w-4 h-4" />
                      {resource.title}
                      <span className="text-xs text-zinc-500">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Slide>
        )}

        {/* Related Blog Post */}
        {til.relatedTo && (
          <Slide delay={0.3}>
            <div className="mt-8 p-6 rounded-2xl border-2 border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
                📚 Related Blog Post
              </h3>
              <Link
                href={`/blog/${til.relatedTo.slug}`}
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                {til.relatedTo.title} →
              </Link>
            </div>
          </Slide>
        )}

        {/* Author */}
        {til.author && (
          <Slide delay={0.35}>
            <div className="mt-12 pt-8 border-t-2 border-zinc-300 dark:border-zinc-800">
              <div className="flex items-center gap-4">
                {til.author.photo && (
                  <Image
                    src={til.author.photo.image}
                    alt={til.author.photo.alt || til.author.name}
                    width={56}
                    height={56}
                    className="rounded-full ring-2 ring-zinc-300 dark:ring-zinc-700"
                  />
                )}
                <div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Learned by
                  </p>
                  <p className="font-bold text-zinc-900 dark:text-white">
                    {til.author.name}
                  </p>
                </div>
              </div>
            </div>
          </Slide>
        )}
      </div>
    </main>
  );
}
