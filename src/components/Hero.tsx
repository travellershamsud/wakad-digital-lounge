import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Music, Utensils, Code2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import liveNeonLogo from "@/assets/live-neon-logo.jpg";

export const Hero = () => {
  const [content, setContent] = useState({
    title: "Experience the Ultimate Nightlife",
    subtitle: "Live Music • Delicious Food • Vibrant Atmosphere",
    content: "Join us for an unforgettable evening of great food, drinks, and entertainment",
    ctaText: "Reserve Your Table",
    ctaLink: "#reservations"
  });

  useEffect(() => {
    fetchHeroContent();
  }, []);

  const fetchHeroContent = async () => {
    const { data, error } = await supabase
      .from("site_content")
      .select("*")
      .eq("section_key", "hero")
      .single();

    if (data && !error) {
      const metadata = data.metadata as { cta_text?: string; cta_link?: string } || {};
      setContent({
        title: data.title || content.title,
        subtitle: data.subtitle || content.subtitle,
        content: data.content || content.content,
        ctaText: metadata.cta_text || content.ctaText,
        ctaLink: metadata.cta_link || content.ctaLink
      });
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Rain effect background */}
      <div className="absolute inset-0 bg-background overflow-hidden">
        {/* Animated rain drops */}
        <div className="rain-container absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="rain-drop absolute w-[1px] bg-gradient-to-b from-transparent via-primary/20 to-transparent"
              style={{
                left: `${Math.random() * 100}%`,
                height: `${30 + Math.random() * 70}px`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${0.8 + Math.random() * 0.4}s`,
              }}
            />
          ))}
        </div>
        
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `
            linear-gradient(hsl(189 100% 50% / 0.1) 1px, transparent 1px),
            linear-gradient(90deg, hsl(189 100% 50% / 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

      <div className="container relative z-10 px-4 py-20 mx-auto text-center">
        {/* Neon Logo */}
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="relative inline-block">
            {/* Glow effect */}
            <div 
              className="absolute inset-0 blur-2xl opacity-60"
              style={{
                background: "radial-gradient(circle, hsl(189 100% 50% / 0.5) 0%, hsl(300 100% 50% / 0.5) 100%)",
              }}
            />
            <img 
              src={liveNeonLogo} 
              alt="LIVE - Eat. Drink. Code. Repeat" 
              className="relative max-w-full w-full md:w-[500px] lg:w-[600px] mx-auto neon-border rounded-lg"
            />
          </div>
        </div>

        {/* Tagline */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-200" 
           style={{ fontFamily: 'Orbitron, sans-serif' }}>
          Pune's Ultimate Tech-Themed Bar & Restaurant
        </p>

        {/* Features */}
        <div className="flex flex-wrap justify-center gap-6 mb-12 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
          <div className="flex items-center gap-2 text-primary">
            <Utensils className="w-5 h-5" />
            <span className="text-lg font-medium">Great Food</span>
          </div>
          <div className="flex items-center gap-2 text-secondary">
            <Music className="w-5 h-5" />
            <span className="text-lg font-medium">Live Music</span>
          </div>
          <div className="flex items-center gap-2 text-accent">
            <Code2 className="w-5 h-5" />
            <span className="text-lg font-medium">Techie Vibes</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-7 duration-1000 delay-500">
          <Button 
            size="lg" 
            className="bg-gradient-neon text-background font-bold text-lg px-8 hover:scale-105 transition-transform"
            onClick={() => scrollToSection("contact")}
          >
            Reserve Table <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-2 border-primary text-primary hover:bg-primary/10 font-bold text-lg px-8"
            onClick={() => scrollToSection("menu")}
          >
            View Menu
          </Button>
        </div>

        {/* Location Badge */}
        <p className="mt-12 text-sm text-muted-foreground animate-in fade-in duration-1000 delay-700">
          📍 Wakad-Hinjewadi, Pune | Open Daily 5 PM - 1 AM
        </p>
      </div>
    </section>
  );
};
