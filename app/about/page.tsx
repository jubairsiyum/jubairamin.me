import Image from "next/image";
import { Metadata } from "next";
import { profileQuery } from "@/lib/sanity.query";
import type { ProfileType } from "@/types";
import { PortableText } from "@portabletext/react";
import { BiEnvelope, BiLinkExternal, BiSolidDownload } from "react-icons/bi";
import { CustomPortableText } from "../components/shared/CustomPortableText";
import TechStack from "../components/pages/TechStack";
import { Slide } from "../animation/Slide";
import { FadeIn } from "../animation/FadeIn";
import { ScaleIn } from "../animation/ScaleIn";
import { sanityFetch } from "@/lib/sanity.client";
import RefLink from "../components/shared/RefLink";

export const metadata: Metadata = {
  title: "About | Jubair Amin",
  metadataBase: new URL("https://jubairamin.me/about"),
  description:
    "Learn more about my skills, experience and technical background",
  openGraph: {
    title: "About | Jubair Amin",
    url: "https://jubairamin.me/about",
    description:
      "Learn more about my skills, experience and technical background",
    images:
      "https://jubairamin.me/api/og?title=About Jubair Amin - Backend Developer | Building Scalable Systems",
  },
};

export default async function About() {
  const profile: ProfileType = await sanityFetch({
    query: profileQuery,
    tags: ["profile"],
  });

  return (
    <main className="relative w-full min-h-screen">
      {/* Grid pattern background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-zinc-950"></div>
        {/* Code-style accent lines */}
        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent"></div>
        <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-purple-500/20 to-transparent"></div>
      </div>

      <div key={profile?._id} className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 -mt-16 pt-36 lg:pt-48 pb-12 lg:pb-20">
        {/* Hero Section - Full Width */}
        <section className="relative grid lg:grid-cols-12 grid-cols-1 gap-8 lg:gap-12 items-start mb-24 lg:mb-32">
          {/* Content Side - Takes more space */}
          <div className="order-2 lg:order-1 lg:col-span-7 space-y-8">
            <FadeIn delay={0.1}>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-xs font-mono font-semibold tracking-wider uppercase dark:text-zinc-500 text-zinc-400">
                    Available for work
                  </span>
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-zinc-300 dark:from-zinc-700 to-transparent"></div>
              </div>
              <div className="inline-flex items-center gap-3 px-4 py-2 border border-zinc-300 dark:border-zinc-800 rounded-md bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
                <span className="text-sm font-mono font-semibold dark:text-zinc-300 text-zinc-700">
                  &lt;BackendDeveloper /&gt;
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.2} direction="up">
              <h1 className="font-incognito font-bold tracking-tight text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl leading-tight dark:text-white text-zinc-900 max-w-3xl">
                {profile?.fullName ?? "John Doe"}
              </h1>
              <div className="mt-8 space-y-3 p-6 border-l-4 border-blue-500 dark:border-blue-400 bg-zinc-50 dark:bg-zinc-900/50 rounded-r-lg">
                <p className="text-base sm:text-lg font-mono dark:text-zinc-400 text-zinc-600">
                  <span className="dark:text-zinc-600 text-zinc-400">const</span>{' '}
                  <span className="dark:text-blue-400 text-blue-600">developer</span> = {'{'}<br/>
                  <span className="ml-4 dark:text-zinc-500 text-zinc-500">name:</span>{' '}
                  <span className="dark:text-green-400 text-green-600">&quot;{profile?.fullName ?? 'John Doe'}&quot;</span>,<br/>
                  <span className="ml-4 dark:text-zinc-500 text-zinc-500">location:</span>{' '}
                  <span className="dark:text-green-400 text-green-600">&quot;{profile?.location ?? 'X'}&quot;</span>,<br/>
                  <span className="ml-4 dark:text-zinc-500 text-zinc-500">role:</span>{' '}
                  <span className="dark:text-green-400 text-green-600">&quot;Backend Developer&quot;</span><br/>
                  {'}'};
                </p>
                <p className="text-sm dark:text-zinc-600 text-zinc-400 font-mono italic">
                  &#47;&#47; Architecting scalable systems &amp; robust APIs
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.3} direction="up">
              <div className="mt-10 space-y-6">
                <div className="prose prose-lg dark:prose-invert prose-zinc max-w-none dark:text-zinc-400 text-zinc-600 leading-relaxed [&_p]:mb-4">
                  {profile?.fullBio ? (
                    <PortableText
                      value={profile?.fullBio}
                      components={CustomPortableText}
                    />
                  ) : (
                    "Your bio information will show up here"
                  )}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.4} direction="up">
              <div className="flex flex-wrap gap-3 pt-6">
                <div className="group px-5 py-2.5 bg-white dark:bg-zinc-900 border-2 border-zinc-300 dark:border-zinc-700 hover:border-blue-500 dark:hover:border-blue-500 rounded-md transition-all duration-200">
                  <span className="text-sm font-mono dark:text-zinc-300 text-zinc-700 group-hover:text-blue-500 dark:group-hover:text-blue-400">{'<'} API Development {'/>'}</span>
                </div>
                <div className="group px-5 py-2.5 bg-white dark:bg-zinc-900 border-2 border-zinc-300 dark:border-zinc-700 hover:border-purple-500 dark:hover:border-purple-500 rounded-md transition-all duration-200">
                  <span className="text-sm font-mono dark:text-zinc-300 text-zinc-700 group-hover:text-purple-500 dark:group-hover:text-purple-400">{'<'} Database Design {'/>'}</span>
                </div>
                <div className="group px-5 py-2.5 bg-white dark:bg-zinc-900 border-2 border-zinc-300 dark:border-zinc-700 hover:border-green-500 dark:hover:border-green-500 rounded-md transition-all duration-200">
                  <span className="text-sm font-mono dark:text-zinc-300 text-zinc-700 group-hover:text-green-500 dark:group-hover:text-green-400">{'<'} System Architecture {'/>'}</span>
                </div>
                <div className="group px-5 py-2.5 bg-white dark:bg-zinc-900 border-2 border-zinc-300 dark:border-zinc-700 hover:border-orange-500 dark:hover:border-orange-500 rounded-md transition-all duration-200">
                  <span className="text-sm font-mono dark:text-zinc-300 text-zinc-700 group-hover:text-orange-500 dark:group-hover:text-orange-400">{'<'} Microservices {'/>'}</span>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Image Side - Compact */}
          <aside className="order-1 lg:order-2 lg:col-span-5 lg:sticky lg:top-24">
            <ScaleIn delay={0.15}>
              <div className="relative">
                {/* Terminal-style frame */}
                <div className="border-2 border-zinc-300 dark:border-zinc-800 rounded-xl overflow-hidden shadow-2xl bg-white dark:bg-zinc-950 hover:shadow-blue-500/10 dark:hover:shadow-blue-500/20 transition-shadow duration-300">
                  {/* Terminal header */}
                  <div className="bg-zinc-100 dark:bg-zinc-900 px-4 py-3 flex items-center justify-between border-b-2 border-zinc-300 dark:border-zinc-800">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors cursor-pointer"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors cursor-pointer"></div>
                    </div>
                    <div className="flex-1 flex items-center justify-center gap-2">
                      <span className="text-xs font-mono dark:text-zinc-500 text-zinc-500">~/portfolio</span>
                      <span className="text-xs dark:text-zinc-600 text-zinc-400">/</span>
                      <span className="text-xs font-mono dark:text-zinc-400 text-zinc-600">profile.tsx</span>
                    </div>
                    <div className="w-16"></div>
                  </div>
                  
                  {/* Image */}
                  <div className="p-3 bg-zinc-50 dark:bg-zinc-950">
                    {profile?.profileImage.image ? (
                      <Image
                        className="rounded-lg object-cover w-full aspect-square ring-1 ring-zinc-200 dark:ring-zinc-800"
                        src={profile?.profileImage.image}
                        width={600}
                        height={600}
                        quality={100}
                        alt={profile?.profileImage.alt}
                        placeholder="blur"
                        blurDataURL={profile?.profileImage.lqip}
                        priority
                      />
                    ) : (
                      <div className="aspect-square w-full bg-zinc-200 dark:bg-zinc-800 rounded-lg"></div>
                    )}
                  </div>

                  {/* Terminal footer */}
                  <div className="bg-zinc-100 dark:bg-zinc-900 px-4 py-2 border-t-2 border-zinc-300 dark:border-zinc-800">
                    <p className="text-xs font-mono dark:text-zinc-600 text-zinc-400">
                      <span className="dark:text-green-400 text-green-600">●</span> Image loaded successfully
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="mt-8 space-y-3">
                <RefLink
                  href="https://www.craft.me/s/WQpQF3jrPIodXp"
                  className="group flex items-center justify-between px-6 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg font-medium transition-all duration-300 hover:bg-zinc-800 dark:hover:bg-zinc-100 border-2 border-zinc-900 dark:border-white hover:scale-[1.02] shadow-lg hover:shadow-xl"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm">$</span>
                    <span className="font-mono text-sm">cat resume.pdf</span>
                  </div>
                  <BiLinkExternal className="text-lg group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </RefLink>
                
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={`${profile?.resumeURL}?dl=${profile?.fullName}-resume.pdf`}
                    className="flex flex-col items-center justify-center gap-1 px-4 py-4 bg-white dark:bg-zinc-900 border-2 border-zinc-300 dark:border-zinc-700 hover:border-zinc-900 dark:hover:border-white rounded-lg transition-all duration-200 hover:scale-[1.02] group"
                    title="Download Resume"
                  >
                    <BiSolidDownload className="text-2xl group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-mono dark:text-zinc-400 text-zinc-600">Download</span>
                  </a>
                  
                  <a
                    href={`mailto:${profile?.email}`}
                    className="flex flex-col items-center justify-center gap-1 px-4 py-4 bg-white dark:bg-zinc-900 border-2 border-zinc-300 dark:border-zinc-700 hover:border-zinc-900 dark:hover:border-white rounded-lg transition-all duration-200 hover:scale-[1.02] group"
                    title="Send Email"
                  >
                    <BiEnvelope className="text-2xl group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-mono dark:text-zinc-400 text-zinc-600">Email Me</span>
                  </a>
                </div>

                <div className="p-5 bg-zinc-50 dark:bg-zinc-900 border-2 border-zinc-300 dark:border-zinc-800 rounded-lg hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-px flex-1 bg-zinc-300 dark:bg-zinc-700"></div>
                    <p className="text-xs font-mono dark:text-zinc-600 text-zinc-400 uppercase tracking-wider">Contact Info</p>
                    <div className="h-px flex-1 bg-zinc-300 dark:bg-zinc-700"></div>
                  </div>
                  <p className="text-sm font-mono dark:text-zinc-400 text-zinc-600 break-all text-center">{profile?.email ?? "contact@example.com"}</p>
                </div>
              </div>
            </ScaleIn>
          </aside>
        </section>

        {/* Tech Stack Section - Full Width */}
        <FadeIn delay={0.5}>
          <div className="border-t-2 border-zinc-300 dark:border-zinc-800 pt-20">
            <TechStack />
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
