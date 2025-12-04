import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter, Linkedin, Youtube, Music2, Globe } from "lucide-react";
import menuQrCode from "@/assets/menu-qr-code.png";
import addressQrCode from "@/assets/address-qr-code.png";
import { ReservationForm } from "./ReservationForm";
import { supabase } from "@/integrations/supabase/client";

export const Contact = () => {
  const [contactInfo, setContactInfo] = useState({
    address: "Wakad-Hinjewadi Road, Pune, Maharashtra 411057, India",
    phone: "9881241411",
    email: "info@thelive.bar",
    hours: "Mon-Sun: 6:00 PM - 2:00 AM",
    website: "https://www.thelive.bar",
    instagram: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    youtube: "",
    spotify: ""
  });

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    const { data, error } = await supabase
      .from("site_content")
      .select("*")
      .eq("section_key", "contact_info")
      .maybeSingle();

    if (data && !error) {
      const metadata = data.metadata as {
        address?: string;
        phone?: string;
        email?: string;
        hours?: string;
        website?: string;
        instagram?: string;
        facebook?: string;
        twitter?: string;
        linkedin?: string;
        youtube?: string;
        spotify?: string;
      } || {};
      
      setContactInfo(prev => ({
        address: metadata.address || prev.address,
        phone: metadata.phone || prev.phone,
        email: metadata.email || prev.email,
        hours: metadata.hours || prev.hours,
        website: metadata.website || prev.website,
        instagram: metadata.instagram || "",
        facebook: metadata.facebook || "",
        twitter: metadata.twitter || "",
        linkedin: metadata.linkedin || "",
        youtube: metadata.youtube || "",
        spotify: metadata.spotify || ""
      }));
    }
  };

  return (
    <section id="contact" className="py-20 px-4 bg-background">
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
                  <p className="text-muted-foreground whitespace-pre-line">
                    {contactInfo.address}
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
                  <p className="text-muted-foreground whitespace-pre-line">
                    {contactInfo.hours}
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
                    {contactInfo.phone}
                  </p>
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{contactInfo.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Globe className="w-4 h-4" />
                    <a href={contactInfo.website} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-primary transition-colors">
                      {contactInfo.website.replace('https://', '')}
                    </a>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card border-border">
              <h3 className="font-bold text-lg mb-3">Follow Us</h3>
              <div className="grid grid-cols-3 gap-3">
                {contactInfo.instagram && (
                  <a href={contactInfo.instagram} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="icon" className="w-full border-primary text-primary hover:bg-primary/10">
                      <Instagram className="w-5 h-5" />
                    </Button>
                  </a>
                )}
                {contactInfo.facebook && (
                  <a href={contactInfo.facebook} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="icon" className="w-full border-secondary text-secondary hover:bg-secondary/10">
                      <Facebook className="w-5 h-5" />
                    </Button>
                  </a>
                )}
                {contactInfo.twitter && (
                  <a href={contactInfo.twitter} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="icon" className="w-full border-accent text-accent hover:bg-accent/10">
                      <Twitter className="w-5 h-5" />
                    </Button>
                  </a>
                )}
                {contactInfo.linkedin && (
                  <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="icon" className="w-full border-primary text-primary hover:bg-primary/10">
                      <Linkedin className="w-5 h-5" />
                    </Button>
                  </a>
                )}
                {contactInfo.youtube && (
                  <a href={contactInfo.youtube} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="icon" className="w-full border-secondary text-secondary hover:bg-secondary/10">
                      <Youtube className="w-5 h-5" />
                    </Button>
                  </a>
                )}
                {contactInfo.spotify && (
                  <a href={contactInfo.spotify} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="icon" className="w-full border-accent text-accent hover:bg-accent/10">
                      <Music2 className="w-5 h-5" />
                    </Button>
                  </a>
                )}
                {/* Show placeholder icons if no social links are set */}
                {!contactInfo.instagram && !contactInfo.facebook && !contactInfo.twitter && 
                 !contactInfo.linkedin && !contactInfo.youtube && !contactInfo.spotify && (
                  <>
                    <Button variant="outline" size="icon" className="border-primary text-primary hover:bg-primary/10" disabled>
                      <Instagram className="w-5 h-5" />
                    </Button>
                    <Button variant="outline" size="icon" className="border-secondary text-secondary hover:bg-secondary/10" disabled>
                      <Facebook className="w-5 h-5" />
                    </Button>
                    <Button variant="outline" size="icon" className="border-accent text-accent hover:bg-accent/10" disabled>
                      <Twitter className="w-5 h-5" />
                    </Button>
                  </>
                )}
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

        {/* Google Maps */}
        <div className="mt-16">
          <Card className="p-6 bg-card border-border">
            <h3 className="text-2xl font-bold mb-4 text-center">Find Us Here</h3>
            <div className="w-full h-[400px] rounded-lg overflow-hidden neon-border">
              <iframe
                src={`https://maps.google.com/maps?q=${encodeURIComponent(contactInfo.address)}&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="LIVE Restaurant Location"
              />
            </div>
          </Card>
        </div>

        {/* Reservation Form */}
        <div className="mt-16">
          <ReservationForm />
        </div>
      </div>
    </section>
  );
};
