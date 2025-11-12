import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter, Linkedin, Youtube, Music2, Globe } from "lucide-react";
import menuQrCode from "@/assets/menu-qr-code.png";
import addressQrCode from "@/assets/address-qr-code.png";
import { ReservationForm } from "./ReservationForm";

export const Contact = () => {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-neon bg-clip-text text-transparent" 
              style={{ fontFamily: 'Orbitron, sans-serif' }}>
            Visit Us
          </h2>
          <p className="text-xl text-muted-foreground">
            Experience the vibe yourself at LIVE
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="p-6 bg-card border-border">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Location</h3>
                  <p className="text-muted-foreground">
                    Wakad-Hinjewadi Road<br />
                    Pune, Maharashtra 411057
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card border-border">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-secondary/10 rounded-lg">
                  <Clock className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Hours</h3>
                  <p className="text-muted-foreground">
                    Monday - Thursday: 5 PM - 11 PM<br />
                    Friday - Saturday: 5 PM - 1 AM<br />
                    Sunday: 12 PM - 11 PM
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card border-border">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <Phone className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Contact</h3>
                  <p className="text-muted-foreground mb-2">
                    9881241411
                  </p>
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">info@thelive.bar</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Globe className="w-4 h-4" />
                    <a href="https://www.thelive.bar" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-primary transition-colors">
                      www.thelive.bar
                    </a>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card border-border">
              <h3 className="font-bold text-lg mb-3">Follow Us</h3>
              <div className="grid grid-cols-3 gap-3">
                <Button variant="outline" size="icon" className="border-primary text-primary hover:bg-primary/10">
                  <Instagram className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon" className="border-secondary text-secondary hover:bg-secondary/10">
                  <Facebook className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon" className="border-accent text-accent hover:bg-accent/10">
                  <Twitter className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon" className="border-primary text-primary hover:bg-primary/10">
                  <Linkedin className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon" className="border-secondary text-secondary hover:bg-secondary/10">
                  <Youtube className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon" className="border-accent text-accent hover:bg-accent/10">
                  <Music2 className="w-5 h-5" />
                </Button>
              </div>
            </Card>
          </div>

          {/* QR Codes */}
          <div className="flex flex-col gap-6">
            <Card className="p-6 bg-card border-border text-center">
              <h3 className="text-xl font-bold mb-3">View Our Menu</h3>
              <p className="text-muted-foreground mb-4 text-sm">
                Scan to access our full menu
              </p>
              <div className="inline-block p-3 bg-background rounded-lg neon-border">
                <img 
                  src={menuQrCode} 
                  alt="Menu QR Code" 
                  className="w-48 h-48 mx-auto"
                />
              </div>
            </Card>

            <Card className="p-6 bg-card border-border text-center">
              <h3 className="text-xl font-bold mb-3">Get Directions</h3>
              <p className="text-muted-foreground mb-4 text-sm">
                Scan to navigate to LIVE
              </p>
              <div className="inline-block p-3 bg-background rounded-lg neon-border">
                <img 
                  src={addressQrCode} 
                  alt="Address QR Code" 
                  className="w-48 h-48 mx-auto"
                />
              </div>
            </Card>
          </div>
        </div>

        {/* Reservation Form */}
        <div className="mt-16">
          <ReservationForm />
        </div>
      </div>
    </section>
  );
};
