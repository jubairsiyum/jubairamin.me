import Link from "next/link";
import PageHeading from "@/app/components/shared/PageHeading";
import { HiLightBulb } from "react-icons/hi";

export default function TILNotFound() {
  return (
    <main className="relative w-full min-h-screen">
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-zinc-950"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 -mt-16 pt-36 lg:pt-48 pb-12 lg:pb-20">
        <PageHeading
          title="TIL Not Found"
          description="This learning doesn't exist or has been removed."
        />
        <div className="mt-12 p-12 text-center border-2 border-dashed border-zinc-300 dark:border-zinc-800 rounded-2xl">
          <HiLightBulb className="w-16 h-16 mx-auto mb-4 text-zinc-400 dark:text-zinc-600" />
          <Link
            href="/til"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            View all learnings
          </Link>
        </div>
      </div>
    </main>
  );
}
