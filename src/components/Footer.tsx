import { useEffect, useState } from "react";
import { Phone, Mail, Globe } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface FooterInfo {
  address: string;
  phone: string;
  email: string;
  website: string;
  hours: string;
}

export const Footer = () => {
  const [info, setInfo] = useState<FooterInfo>({
    address: "Wakad-Hinjewadi Road\nPune, Maharashtra 411057",
    phone: "9881241411",
    email: "info@thelive.bar",
    website: "https://www.thelive.bar",
    hours: "Monday - Thursday: 5 PM - 11 PM\nFriday - Saturday: 5 PM - 1 AM\nSunday: 12 PM - 11 PM"
  });

  useEffect(() => {
    fetchFooterInfo();
  }, []);

  const fetchFooterInfo = async () => {
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
        website?: string;
        hours?: string;
      } || {};

      setInfo(prev => ({
        address: metadata.address || prev.address,
        phone: metadata.phone || prev.phone,
        email: metadata.email || prev.email,
        website: metadata.website || prev.website,
        hours: metadata.hours || prev.hours
      }));
    }
  };

  return (
    <footer className="py-12 px-4 border-t border-border bg-card">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <p className="text-lg font-bold mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              <span className="bg-gradient-neon bg-clip-text text-transparent">LIVE</span>
            </p>
            <p className="text-sm text-muted-foreground">
              EAT. DRINK. CODE. REPEAT.
            </p>
            <p className="text-xs text-muted-foreground mt-2 whitespace-pre-line">
              {info.address}
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-3">Contact</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>{info.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>{info.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <a href={info.website} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  {info.website.replace('https://', '').replace('http://', '')}
                </a>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-bold mb-3">Hours</h3>
            <div className="text-sm text-muted-foreground whitespace-pre-line">
              {info.hours}
            </div>
          </div>
        </div>

        <div className="text-center pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} LIVE Bar & Restaurant. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};