import { Code2, Music2, Users, Sparkles } from "lucide-react";

export const About = () => {
  const features = [
    {
      icon: Code2,
      title: "Tech Haven",
      description: "A space designed for developers, engineers, and tech enthusiasts to unwind and connect",
      color: "text-primary"
    },
    {
      icon: Music2,
      title: "Live Entertainment",
      description: "Electrifying live music performances and DJ nights that keep the energy high",
      color: "text-secondary"
    },
    {
      icon: Users,
      title: "Dance Floor",
      description: "A vibrant dance floor where code meets groove and techies let loose",
      color: "text-accent"
    },
    {
      icon: Sparkles,
      title: "Premium Experience",
      description: "Exceptional food, curated drinks, and an atmosphere that celebrates innovation",
      color: "text-primary"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-dark relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 neon-text" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            Where Code Meets Cuisine
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            LIVE is Pune's first tech-themed bar and restaurant, creating a unique fusion of 
            innovation, entertainment, and exceptional hospitality
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-300 hover:scale-105"
            >
              <div className={`${feature.color} mb-4`}>
                <feature.icon className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-card border border-border rounded-lg p-8">
            <p className="text-lg mb-4 text-foreground">
              <span className="font-mono text-primary">&lt;</span>
              <span className="font-bold" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                EAT. DRINK. CODE. REPEAT.
              </span>
              <span className="font-mono text-secondary">&gt;</span>
            </p>
            <p className="text-muted-foreground">
              Whether you're debugging after work or celebrating a product launch, 
              LIVE is your perfect destination
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
