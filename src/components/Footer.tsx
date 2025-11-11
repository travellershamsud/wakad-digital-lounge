export const Footer = () => {
  return (
    <footer className="py-8 px-4 border-t border-border bg-card">
      <div className="container mx-auto">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">
            <span className="font-mono text-primary">&lt;</span>
            <span className="font-bold" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              LIVE - EAT. DRINK. CODE. REPEAT.
            </span>
            <span className="font-mono text-secondary">&gt;</span>
          </p>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} LIVE Bar & Restaurant. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Wakad-Hinjewadi, Pune | For the love of code and cuisine
          </p>
        </div>
      </div>
    </footer>
  );
};
