import Image from "next/image";
import { FadeIn } from "@/app/animation/FadeIn";
import stackData from "@/app/about/stack.json";

export default function TechStack() {
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

      <div className="space-y-12">
        {stackData.map((category, idx) => (
          <FadeIn key={category.category} delay={0.1 + idx * 0.05}>
            <div className="group">
              <h3 className="font-mono text-xl font-bold tracking-tight border-l-4 border-blue-500 dark:border-blue-400 pl-6 py-2 bg-zinc-50 dark:bg-zinc-900/50 rounded-r-lg mb-6">
                {category.category}
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex flex-col items-center gap-3 p-4 bg-white dark:bg-zinc-900 border-2 border-zinc-300 dark:border-zinc-800 hover:border-blue-500 dark:hover:border-blue-400 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg group/item"
                  >
                    <div className="relative w-12 h-12 flex items-center justify-center">
                      <Image
                        src={skill.logo}
                        alt={`${skill.name} logo`}
                        width={48}
                        height={48}
                        className="object-contain group-hover/item:scale-110 transition-transform duration-200"
                      />
                    </div>
                    <span className="text-sm font-mono font-semibold text-center dark:text-zinc-300 text-zinc-700">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
