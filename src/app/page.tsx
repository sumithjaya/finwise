import Featured from "@/components/hero/Featured";
import Hero from "@/components/hero/Hero";
import ReadyToFind from "@/components/home/ReadyToFind";
import Testimonials from "@/components/home/Testimonials";
import Whyfinwise from "@/components/home/Whyfinwise";

export default function Home() {
  return (
    <div className="font-sans grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <Hero />
      <Featured />
      <Whyfinwise />
      <Testimonials />
    </div>
  );
}
