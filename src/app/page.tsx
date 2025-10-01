import Featured from "@/components/hero/Featured";
import Hero from "@/components/hero/Hero";
import ReadyToFind from "@/components/home/ReadyToFind";
import Testimonials from "@/components/home/Testimonials";
import Whyfinwise from "@/components/home/Whyfinwise";
import HowItWorks from "@/components/HowItWorks";
import Reveal from "@/components/ui/Reveal";

export default function Home() {
  return (
    <div
      className="font-sans items-center justify-items-center  "
      style={{ marginBottom: 0, paddingBottom: 0 }}
    >
      <Reveal delay={1} direction="up">
        <Hero />
      </Reveal>
      <Reveal delay={1} direction="up">
        <HowItWorks />
      </Reveal>
      <Reveal delay={1} direction="up">
        <Featured />
      </Reveal>
      <Reveal delay={0} direction="up">
        <Whyfinwise />
      </Reveal>
      <Reveal delay={0} direction="up">
        <Testimonials />
      </Reveal>
      <Reveal delay={0} direction="up">
        <ReadyToFind />
      </Reveal>
    </div>
  );
}
