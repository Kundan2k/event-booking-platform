import Header from "./components/Header";
import Hero from "./components/Hero";
import EventCategories from "./components/EventCategories";
import FeaturedPackages from "./components/FeaturedPackages";
import WhyChooseUs from "./components/WhyChooseUs";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Header />

      <main>
        <Hero />
        <EventCategories />
        <FeaturedPackages />
        <WhyChooseUs />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}

export default App;