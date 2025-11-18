export default function Loading() {
  return (
    <main className="relative w-full min-h-screen">
      {/* Grid pattern background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-zinc-950"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-8 lg:px-12 -mt-16 pt-36 lg:pt-48 pb-12 lg:pb-20">
        {/* Back Button Skeleton */}
        <div className="h-6 w-32 bg-zinc-200 dark:bg-zinc-800 rounded mb-8 animate-pulse"></div>

        {/* Header Card Skeleton */}
        <div className="p-8 rounded-2xl border-2 border-zinc-300 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 mb-8">
          {/* Meta badges */}
          <div className="flex gap-3 mb-6">
            <div className="h-7 w-32 bg-zinc-200 dark:bg-zinc-800 rounded-full animate-pulse"></div>
            <div className="h-7 w-24 bg-zinc-200 dark:bg-zinc-800 rounded-md animate-pulse"></div>
            <div className="h-7 w-28 bg-zinc-200 dark:bg-zinc-800 rounded-full animate-pulse"></div>
          </div>

          {/* Title */}
          <div className="space-y-3 mb-4">
            <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse"></div>
            <div className="h-10 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse"></div>
          </div>

          {/* Summary */}
          <div className="space-y-2 mb-6">
            <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse"></div>
            <div className="h-6 w-5/6 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse"></div>
          </div>

          {/* Tags */}
          <div className="flex gap-2 pt-6 border-t border-zinc-300 dark:border-zinc-700">
            <div className="h-7 w-16 bg-zinc-200 dark:bg-zinc-800 rounded-md animate-pulse"></div>
            <div className="h-7 w-20 bg-zinc-200 dark:bg-zinc-800 rounded-md animate-pulse"></div>
            <div className="h-7 w-16 bg-zinc-200 dark:bg-zinc-800 rounded-md animate-pulse"></div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="space-y-4">
          <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse"></div>
          <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse"></div>
          <div className="h-4 w-4/5 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse"></div>
          <div className="h-32 bg-zinc-200 dark:bg-zinc-800 rounded-lg animate-pulse mt-6"></div>
          <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse"></div>
          <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse"></div>
          <div className="h-4 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse"></div>
        </div>
      </div>
    </main>
  );
}
