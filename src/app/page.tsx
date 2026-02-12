import Brands from "../components/home/brands";
import GoleMentors from "../components/home/gole";
import Hero from "../components/home/hero";
import MiddSection from "../components/home/middsection";
import MentorShip from "../components/home/mentorship";
import FAQ from "../components/home/faq";

export default async function Home() {
  return (
      <>
        <Hero />
        <MiddSection />
        <Brands />
        <GoleMentors />
        <MentorShip />
        <FAQ />
      </>
  );
}