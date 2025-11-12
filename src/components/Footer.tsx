import { Phone, Mail, Globe } from "lucide-react";

export const Footer = () => {
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
            <p className="text-xs text-muted-foreground mt-2">
              Wakad-Hinjewadi Road<br />
              Pune, Maharashtra 411057
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-3">Contact</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>9881241411</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>info@thelive.bar</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <a href="https://www.thelive.bar" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  www.thelive.bar
                </a>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-bold mb-3">Hours</h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Monday - Thursday: 5 PM - 11 PM</p>
              <p>Friday - Saturday: 5 PM - 1 AM</p>
              <p>Sunday: 12 PM - 11 PM</p>
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
