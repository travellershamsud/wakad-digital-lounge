import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wine, Beer, UtensilsCrossed, GlassWater } from "lucide-react";

export const Menu = () => {
  // Appetizers from the actual menu
  const appetizers = [
    { name: "Cheese Pakoda", desc: "Melting cheese encased in crispy golden batter", price: "₹159", badge: "Best Seller" },
    { name: "Paneer Pakoda", desc: "Cottage cheese cubes in spiced gram flour coating", price: "₹170" },
    { name: "Kaju Masala Fry", desc: "Premium cashews tossed in aromatic spices", price: "₹310", badge: "Chef's Special" },
    { name: "French Fries", desc: "Hand-cut potatoes, twice-fried for extra crispiness", price: "₹129" },
    { name: "Cheese Balls", desc: "Creamy cheese spheres with a crunchy breadcrumb shell", price: "₹159" },
    { name: "Onion Rings", desc: "Crispy golden onion rings", price: "₹180" },
  ];

  // Main courses from the menu
  const mains = [
    { name: "Paneer Patiala Royal", desc: "Creamy cottage cheese in rich cashew-tomato gravy", price: "₹399" },
    { name: "Paneer Butter Masala", desc: "Silky makhani gravy with farm-fresh paneer", price: "₹399" },
    { name: "Chicken Kolhapuri Firepot", desc: "Spicy Kolhapuri style chicken preparation", price: "₹399" },
    { name: "Slow-Cooked Butter Chicken Handi", desc: "Creamy butter chicken in earthen pot", price: "₹599" },
    { name: "Mutton Ukkad Handi", desc: "Traditional slow-cooked mutton specialty", price: "₹699" },
    { name: "Luxe Veg Thali", desc: "Complete vegetarian thali experience", price: "₹299" },
  ];

  // Beers from the menu
  const beers = [
    { name: "Kingfisher Premium", desc: "Large (650ml) - Classic Indian lager", price: "₹290" },
    { name: "Budweiser Magnum Strong", desc: "Large (650ml) - Strong premium beer", price: "₹350" },
    { name: "Corona Extra", desc: "330ml - Premium Mexican import", price: "₹350" },
    { name: "Hoegaarden", desc: "330ml - Belgian wheat beer", price: "₹400" },
    { name: "Heineken", desc: "Large (650ml) - Dutch premium lager", price: "₹330" },
    { name: "Tuborg Strong", desc: "Large (650ml) - Danish strong beer", price: "₹280" },
  ];

  // Spirits from the menu
  const spirits = [
    { name: "Grey Goose Vodka", desc: "French premium vodka - 30ml", price: "₹650", badge: "Top Shelf" },
    { name: "Old Monk Rum", desc: "Legendary 7-year aged dark rum - 30ml", price: "₹70", badge: "Best Seller" },
    { name: "Jack Daniel's", desc: "Tennessee whiskey - 30ml", price: "₹500", badge: "Best Seller" },
    { name: "Jameson Irish Whiskey", desc: "Smooth Irish whiskey - 30ml", price: "₹220", badge: "Best Seller" },
    { name: "Johnnie Walker Black Label", desc: "Premium blended Scotch - 30ml", price: "₹540", badge: "Top Shelf" },
    { name: "Absolut Vodka", desc: "Swedish winter wheat vodka - 30ml", price: "₹220" },
  ];

  // Refreshments/Mocktails
  const refreshments = [
    { name: "Fresh Lime Soda", desc: "Sweet or salted - refreshing citrus drink", price: "₹120" },
    { name: "Iced Tea", desc: "Lemon or Peach flavored", price: "₹150" },
    { name: "Red Bull", desc: "250ml energy drink", price: "₹200" },
    { name: "Fratelli Shiraz", desc: "Glass - Nashik Valley red wine with blackberry & spice", price: "₹450" },
    { name: "Fratelli Chenin Blanc", desc: "Glass - Crisp white with tropical fruit", price: "₹450" },
  ];

  return (
    <section id="menu" className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-neon bg-clip-text text-transparent" 
              style={{ fontFamily: 'Orbitron, sans-serif' }}>
            Our Menu
          </h2>
          <p className="text-xl text-muted-foreground">
            Fuel your body and mind with our tech-inspired cuisine
          </p>
        </div>

        <Tabs defaultValue="appetizers" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="appetizers" className="flex items-center gap-2">
              <UtensilsCrossed className="w-4 h-4" />
              <span className="hidden sm:inline">Starters</span>
            </TabsTrigger>
            <TabsTrigger value="mains" className="flex items-center gap-2">
              <UtensilsCrossed className="w-4 h-4" />
              <span className="hidden sm:inline">Mains</span>
            </TabsTrigger>
            <TabsTrigger value="beers" className="flex items-center gap-2">
              <Beer className="w-4 h-4" />
              <span className="hidden sm:inline">Beers</span>
            </TabsTrigger>
            <TabsTrigger value="spirits" className="flex items-center gap-2">
              <Wine className="w-4 h-4" />
              <span className="hidden sm:inline">Spirits</span>
            </TabsTrigger>
            <TabsTrigger value="refreshments" className="flex items-center gap-2">
              <GlassWater className="w-4 h-4" />
              <span className="hidden sm:inline">Drinks</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="appetizers" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {appetizers.map((item, index) => (
                <Card key={index} className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-primary">{item.name}</h3>
                      {item.badge && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-secondary/20 text-secondary">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-lg font-bold text-secondary">{item.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="mains" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {mains.map((item, index) => (
                <Card key={index} className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-primary">{item.name}</h3>
                    <span className="text-lg font-bold text-secondary">{item.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="beers" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {beers.map((item, index) => (
                <Card key={index} className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-primary">{item.name}</h3>
                    <span className="text-lg font-bold text-secondary">{item.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="spirits" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {spirits.map((item, index) => (
                <Card key={index} className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-primary">{item.name}</h3>
                      {item.badge && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-secondary/20 text-secondary">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-lg font-bold text-secondary">{item.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="refreshments" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {refreshments.map((item, index) => (
                <Card key={index} className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-primary">{item.name}</h3>
                    <span className="text-lg font-bold text-secondary">{item.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            * Menu items and prices are subject to change. Please ask our staff for today's specials.
          </p>
        </div>
      </div>
    </section>
  );
};
