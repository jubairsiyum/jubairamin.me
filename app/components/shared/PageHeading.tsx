import { Slide } from "@/app/animation/Slide";
import { FadeIn } from "@/app/animation/FadeIn";

type HeadingType = {
  title: string;
  description?: string;
  children?: React.ReactNode;
};

export default function PageHeading({
  title,
  description,
  children,
}: HeadingType) {
  return (
    <header className="mb-16">
      <FadeIn>
        <div className="flex items-center gap-4 mb-8">
          <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-500"></div>
          <div className="inline-flex items-center gap-3 px-4 py-2 border-2 border-zinc-300 dark:border-zinc-800 rounded-md bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
            <span className="text-sm font-mono font-semibold dark:text-zinc-300 text-zinc-700">
              {'<'} {title} {'/>'}
            </span>
          </div>
          <div className="h-1 flex-1 bg-gradient-to-r from-purple-500 to-transparent"></div>
        </div>
        <h1 className="max-w-3xl font-incognito font-bold tracking-tight text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl mb-8 leading-tight dark:text-white text-zinc-900">
          {title}
        </h1>
        <p className="max-w-3xl text-lg dark:text-zinc-400 text-zinc-600 leading-relaxed font-mono">
          <span className="dark:text-zinc-600 text-zinc-400">&#47;&#47;</span> {description}
        </p>
        {children}
      </FadeIn>
    </header>
  );
}
