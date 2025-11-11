import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from "lucide-react";
import qrCode from "@/assets/qr-code.png";

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
                    +91 XXX XXX XXXX
                  </p>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">hello@livepune.com</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card border-border">
              <h3 className="font-bold text-lg mb-3">Follow Us</h3>
              <div className="flex gap-4">
                <Button variant="outline" size="icon" className="border-primary text-primary hover:bg-primary/10">
                  <Instagram className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon" className="border-secondary text-secondary hover:bg-secondary/10">
                  <Facebook className="w-5 h-5" />
                </Button>
              </div>
            </Card>
          </div>

          {/* QR Code */}
          <div className="flex flex-col items-center justify-center">
            <Card className="p-8 bg-card border-border text-center">
              <h3 className="text-2xl font-bold mb-4">Quick Access</h3>
              <p className="text-muted-foreground mb-6">
                Scan to view our full menu and make reservations
              </p>
              <div className="inline-block p-4 bg-background rounded-lg neon-border">
                <img 
                  src={qrCode} 
                  alt="LIVE QR Code" 
                  className="w-64 h-64 mx-auto"
                />
              </div>
              <p className="text-sm text-muted-foreground mt-6">
                Scan with your phone camera
              </p>
            </Card>
          </div>
        </div>

        {/* Reservation CTA */}
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="bg-gradient-neon text-background font-bold text-lg px-12 hover:scale-105 transition-transform"
          >
            Reserve Your Table Now
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Walk-ins welcome, but reservations recommended for weekends
          </p>
        </div>
      </div>
    </section>
  );
};
