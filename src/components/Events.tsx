import { Card } from "@/components/ui/card";
import { Calendar, Clock, Music, Disc3 } from "lucide-react";

export const Events = () => {
  const events = [
    {
      day: "Monday - Thursday",
      title: "Code & Chill",
      time: "5 PM - 11 PM",
      description: "Relaxed evenings with ambient music, perfect for unwinding after work",
      icon: Music,
    },
    {
      day: "Friday",
      title: "TechGroove Night",
      time: "8 PM - 1 AM",
      description: "Live DJ sets with electronic and house music to kickstart your weekend",
      icon: Disc3,
    },
    {
      day: "Saturday",
      title: "Live Band Performance",
      time: "9 PM - 1 AM",
      description: "Electric live performances featuring local and touring bands",
      icon: Music,
    },
    {
      day: "Sunday",
      title: "Brunch & Beats",
      time: "12 PM - 6 PM",
      description: "Special brunch menu with acoustic sessions and chill vibes",
      icon: Music,
    },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-dark relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            <span className="bg-gradient-neon bg-clip-text text-transparent">Events & Entertainment</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Every day brings a new reason to celebrate
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {events.map((event, index) => (
            <Card 
              key={index}
              className="p-6 bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <event.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    {event.day}
                  </p>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-2 text-primary">{event.title}</h3>
              
              <div className="flex items-center gap-2 mb-3 text-secondary">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">{event.time}</span>
              </div>
              
              <p className="text-sm text-muted-foreground">{event.description}</p>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Card className="inline-block p-8 bg-card/50 backdrop-blur border-border">
            <Calendar className="w-12 h-12 text-accent mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Special Events</h3>
            <p className="text-muted-foreground mb-4">
              Private parties • Corporate events • Product launches
            </p>
            <p className="text-sm text-primary font-medium">
              Contact us for bookings and custom packages
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};
