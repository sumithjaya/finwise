import Featured from "@/components/hero/Featured";
import Hero from "@/components/hero/Hero";
import ReadyToFind from "@/components/home/ReadyToFind";
import Testimonials from "@/components/home/Testimonials";
import Whyfinwise from "@/components/home/Whyfinwise";
import HowItWorks from "@/components/HowItWorks"; 

export default function Home() {
  return (
    <div
      className="font-sans items-center justify-items-center  "
      style={{ marginBottom: 0, paddingBottom: 0 }}
    > 
        <Hero /> 

      <HowItWorks />

      {/* <Reveal delay={1} direction="up">
        <Featured />
      </Reveal> */}

      <Whyfinwise />

      <Testimonials />

      <ReadyToFind />
    </div>
  );
}
