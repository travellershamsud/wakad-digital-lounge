import { Clock, Beer, Wine, Music, Percent, Sparkles, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Special {
  id: string;
  title: string;
  time: string;
  days: string;
  offers: string[];
  color: string;
  badge: string | null;
  icon_name: string;
  display_order: number;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Beer,
  Wine,
  Music,
};

export const HappyHour = () => {
  const [specials, setSpecials] = useState<Special[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpecials = async () => {
      const { data, error } = await supabase
        .from('specials')
        .select('*')
        .eq('is_active', true)
        .order('display_order');

      if (error) {
        console.error('Error fetching specials:', error);
      } else {
        setSpecials(data || []);
      }
      setLoading(false);
    };

    fetchSpecials();
  }, []);

  const getIcon = (iconName: string) => {
    return iconMap[iconName] || Beer;
  };

  if (loading) {
    return (
      <section id="specials" className="py-20 px-4 bg-gradient-dark">
        <div className="container mx-auto flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  if (specials.length === 0) {
    return null;
  }

  return (
    <section id="specials" className="py-20 px-4 bg-gradient-dark relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-primary animate-pulse" />
            <span className="text-primary font-mono text-sm tracking-wider">SPECIAL OFFERS</span>
            <Sparkles className="w-6 h-6 text-secondary animate-pulse" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 neon-text" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            Happy Hour & Specials
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Unwind with our unbeatable deals – because great times shouldn't break the bank
          </p>
        </div>

        {/* Specials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {specials.map((special) => {
            const IconComponent = getIcon(special.icon_name);
            return (
              <div
                key={special.id}
                className="relative bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 group overflow-hidden"
              >
                {/* Gradient top border */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${special.color}`} />
                
                {/* Badge */}
                {special.badge && (
                  <Badge className="absolute top-4 right-4 bg-primary/20 text-primary border-primary/30">
                    {special.badge}
                  </Badge>
                )}

                {/* Icon */}
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${special.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-8 h-8 text-background" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  {special.title}
                </h3>

                {/* Time info */}
                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <Clock className="w-4 h-4" />
                  <span>{special.time}</span>
                  <span className="text-primary">•</span>
                  <span>{special.days}</span>
                </div>

                {/* Offers */}
                <ul className="space-y-3">
                  {special.offers.map((offer, offerIndex) => (
                    <li key={offerIndex} className="flex items-start gap-2">
                      <Percent className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground">{offer}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-card border border-primary/30 rounded-lg p-6">
            <p className="text-lg font-semibold mb-2">
              <span className="text-primary">*</span> Terms & conditions apply
            </p>
            <p className="text-muted-foreground text-sm">
              Offers valid for dine-in only. Cannot be combined with other promotions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
