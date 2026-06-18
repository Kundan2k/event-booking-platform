import Header from "../components/Header";
import Hero from "../components/Hero";
import EventCategories from "../components/EventCategories";
import FeaturedPackages from "../components/FeaturedPackages";
import WhyChooseUs from "../components/WhyChooseUs";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import FAQ from "../components/FAQ";
import Gallery from "../components/Gallery";

export default function Home() {
  return (
    <div className="bg-[#0d0118]">
      <Header />

      <Hero />
      <EventCategories />
      <FeaturedPackages />
      <WhyChooseUs />
      <Testimonials />
      <Gallery />
    </div>
  );
}