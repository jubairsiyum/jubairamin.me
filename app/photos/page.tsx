import { Slide } from "../animation/Slide";
import Image from "next/image";
import { Metadata } from "next";
import PageHeading from "@/app/components/shared/PageHeading";

const images = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1585618256754-241cfe4e8113?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=100",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1585619203238-70e7631cc672?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8OXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1585619443911-c2bb23fb2a49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
  },
];

export const metadata: Metadata = {
  title: "Photos | Jubair Amin",
  metadataBase: new URL("https://jubairamin.me/photos"),
  description: "Explore photos taken by Jubair Amin",
  openGraph: {
    title: "Photos | Jubair Amin",
    url: "https://jubairamin.me/photos",
    description: "Explore photos taken by Jubair Amin",
    images:
      "https://res.cloudinary.com/victoreke/image/upload/v1692635149/victoreke/photos.png",
  },
};

export default function Photos() {
  return (
    <main className="relative w-full min-h-screen">
      {/* Grid pattern background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-zinc-950"></div>
        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-orange-500/20 to-transparent"></div>
        <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-red-500/20 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 -mt-16 pt-36 lg:pt-48 pb-12 lg:pb-20">
        <PageHeading
          title="Photos"
          description="This page is still under construction..."
        />
        <figure className="my-6">
          <Slide delay={0.12} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image) => (
              <div key={image.id} className="relative overflow-hidden rounded-lg border-2 border-zinc-300 dark:border-zinc-800 hover:border-zinc-900 dark:hover:border-white transition-all duration-200 hover:scale-[1.02] hover:shadow-xl">
                <Image
                  src={image.src}
                  alt="playing guitar"
                  width={400}
                  height={600}
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </Slide>
        </figure>
      </div>
    </main>
  );
}
