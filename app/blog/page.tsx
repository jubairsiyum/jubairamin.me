import { Metadata } from "next";
import { BiDetail } from "react-icons/bi";
import Posts from "../components/pages/Posts";
import Social from "../components/shared/Social";
import { Slide } from "../animation/Slide";
import PageHeading from "@/app/components/shared/PageHeading";

export const metadata: Metadata = {
  title: "Blog | Jubair Amin",
  metadataBase: new URL("https://jubairamin.me/blog"),
  description: "Read latest stories from Jubair Amin's Blog",
  openGraph: {
    title: "Blog | Jubair Amin",
    url: "https://jubairamin.me/blog",
    description: "Read latest stories from Jubair Amin's Blog",
    images:
      "https://res.cloudinary.com/victoreke/image/upload/v1692636087/victoreke/blog.png",
  },
};

export default async function Blog() {
  return (
    <main className="relative w-full min-h-screen">
      {/* Grid pattern background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-zinc-950"></div>
        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-green-500/20 to-transparent"></div>
        <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-teal-500/20 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 -mt-16 pt-36 lg:pt-48 pb-12 lg:pb-20">
        <PageHeading
          title="Blog"
          description="Welcome to my blog domain where I share personal stories about things I've learned, projects I'm hacking on and just general findings. I also write for other publications."
        >
          <Social type="publication" />
        </PageHeading>

        <Slide delay={0.1}>
          <div className="flex items-center gap-4 mb-10">
            <div className="h-1 w-12 bg-gradient-to-r from-green-500 to-teal-500"></div>
            <div className="inline-flex items-center gap-3 px-4 py-2 border-2 border-zinc-300 dark:border-zinc-800 rounded-md bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
              <BiDetail />
              <h2 className="text-sm font-mono font-semibold dark:text-zinc-300 text-zinc-700">{'<'} Explore All {'/>'}</h2>
            </div>
            <div className="h-1 flex-1 bg-gradient-to-r from-teal-500 to-transparent"></div>
          </div>
          <Posts />
        </Slide>
      </div>
    </main>
  );
}
