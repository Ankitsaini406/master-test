import Brands from "../components/home/brands";
import GoleMentors from "../components/home/gole";
import Hero from "../components/home/hero";
import MiddSection from "../components/home/middsection";

export default function Home() {
  return (
      <>
        <Hero />
        <MiddSection />
        <Brands />
        <GoleMentors />
      </>
  );
}