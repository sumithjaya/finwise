import AdviserHero from "@/components/hero/AdviserHero";
import Testimonials from "@/components/home/Testimonials";

export default function RootLayout(  ) {
    return (
       <div>
         <AdviserHero/>
         <Testimonials/>
       </div>
    );
}