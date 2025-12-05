import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Gallery } from "@/components/Gallery";
import { HappyHour } from "@/components/HappyHour";
import { Menu } from "@/components/Menu";
import { Events } from "@/components/Events";
import { LoyaltyProgram } from "@/components/LoyaltyProgram";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { CinematicIntro } from "@/components/CinematicIntro";

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className="min-h-screen">
      {showIntro && (
        <CinematicIntro onComplete={() => setShowIntro(false)} />
      )}
      <Navigation />
      <Hero />
      <About />
      <Gallery />
      <HappyHour />
      <Menu />
      <Events />
      <LoyaltyProgram />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
