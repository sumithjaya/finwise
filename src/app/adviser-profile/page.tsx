import CTA from "@/components/Adviser/CTA";
import Profile from "@/components/Adviser/Profile";
import QuestionsForm from "@/components/Adviser/QuestionsForm";
import Specialty from "@/components/Adviser/Specialty";
import AdviserHero from "@/components/hero/AdviserHero";
import Testimonials from "@/components/home/Testimonials";

export default function RootLayout(  ) {
    return (
       <div>
         <AdviserHero/>
         <Profile/>
         <Specialty/>
         <CTA/>
         <Testimonials/>
         <QuestionsForm/>
       </div>
    );
}