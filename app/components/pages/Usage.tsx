import { PortableText } from "@portabletext/react";
import { profileQuery } from "@/lib/sanity.query";
import type { ProfileType } from "@/types";
import { CustomPortableTextFavicon } from "../shared/CustomPortableTextFavicon";
import { sanityFetch } from "@/lib/sanity.client";

export default async function Usage() {
  const profile: ProfileType = await sanityFetch({
    query: profileQuery,
    tags: ["profile"],
  });

  return (
    <section className="w-full">
      <div className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-500"></div>
          <div className="inline-flex items-center gap-3 px-4 py-2 border-2 border-zinc-300 dark:border-zinc-800 rounded-md bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
            <span className="text-sm font-mono font-semibold dark:text-zinc-300 text-zinc-700">
              {'<'} Tech Stack {'/>'} 
            </span>
          </div>
          <div className="h-1 flex-1 bg-gradient-to-r from-purple-500 to-transparent"></div>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl mb-6 font-bold tracking-tight dark:text-white text-zinc-900">
          Development Arsenal
        </h2>
        <p className="dark:text-zinc-500 text-zinc-600 text-lg font-mono max-w-3xl">
          <span className="dark:text-zinc-600 text-zinc-400">&#47;&#47;</span> Technologies, frameworks, and tools powering my daily workflow
        </p>
      </div>
      <div className="prose prose-xl dark:prose-invert prose-zinc max-w-none 
        [&_h3]:font-mono [&_h3]:text-xl [&_h3]:font-bold [&_h3]:tracking-tight 
        [&_h3]:border-l-4 [&_h3]:border-blue-500 [&_h3]:dark:border-blue-400 
        [&_h3]:pl-6 [&_h3]:py-2 [&_h3]:bg-zinc-50 [&_h3]:dark:bg-zinc-900/50 
        [&_h3]:rounded-r-lg [&_h3]:mb-6 [&_h3]:mt-12
        [&_ul]:space-y-3 [&_ul]:ml-6
        [&_li]:font-mono [&_li]:text-base [&_li]:pl-2
        [&_li]:border-l-2 [&_li]:border-zinc-300 [&_li]:dark:border-zinc-800
        [&_li:hover]:border-blue-500 [&_li:hover]:dark:border-blue-400
        [&_li]:transition-colors">
        <PortableText
          value={profile?.usage}
          components={CustomPortableTextFavicon}
        />
      </div>
    </section>
  );
}
