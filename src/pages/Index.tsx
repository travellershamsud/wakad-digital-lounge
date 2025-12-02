import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Gallery } from "@/components/Gallery";
import { HappyHour } from "@/components/HappyHour";
import { Menu } from "@/components/Menu";
import { Events } from "@/components/Events";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Gallery />
      <HappyHour />
      <Menu />
      <Events />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
