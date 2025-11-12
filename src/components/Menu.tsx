import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wine, Coffee, UtensilsCrossed } from "lucide-react";

export const Menu = () => {
  const drinks = [
    { name: "Binary Blast", desc: "Vodka, Blue Curacao, Lime, Sprite", price: "₹450" },
    { name: "Code Breaker", desc: "Rum, Passion Fruit, Mint, Soda", price: "₹420" },
    { name: "Syntax Error", desc: "Tequila, Triple Sec, Lime, Salt", price: "₹480" },
    { name: "Debug Draft", desc: "Premium Craft Beer Selection", price: "₹350" },
    { name: "API Response", desc: "Gin, Elderflower, Cucumber, Tonic", price: "₹490" },
    { name: "Stack Overflow", desc: "Whiskey, Ginger, Honey, Bitters", price: "₹520" },
  ];

  const food = [
    { name: "Firewall Wings", desc: "Spicy chicken wings with ghost pepper glaze", price: "₹380" },
    { name: "Boolean Burgers", desc: "Gourmet beef burger with caramelized onions", price: "₹450" },
    { name: "RAM Ramen", desc: "Japanese style ramen with pork belly", price: "₹420" },
    { name: "Pixel Pizza", desc: "Artisan thin crust with exotic toppings", price: "₹550" },
    { name: "Loop Nachos", desc: "Loaded nachos with cheese and jalapeños", price: "₹340" },
    { name: "Array Appetizers", desc: "Mixed platter of global bites", price: "₹650" },
  ];

  const mocktails = [
    { name: "Zero Bug", desc: "Virgin mojito with fresh mint", price: "₹250" },
    { name: "Compile Time", desc: "Mixed fruit punch with fizz", price: "₹230" },
    { name: "Clean Code", desc: "Fresh lime soda with herbs", price: "₹200" },
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

        <Tabs defaultValue="drinks" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="drinks" className="flex items-center gap-2">
              <Wine className="w-4 h-4" />
              <span>Drinks</span>
            </TabsTrigger>
            <TabsTrigger value="food" className="flex items-center gap-2">
              <UtensilsCrossed className="w-4 h-4" />
              <span>Food</span>
            </TabsTrigger>
            <TabsTrigger value="mocktails" className="flex items-center gap-2">
              <Coffee className="w-4 h-4" />
              <span>Mocktails</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="drinks" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {drinks.map((item, index) => (
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

          <TabsContent value="food" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {food.map((item, index) => (
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

          <TabsContent value="mocktails" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {mocktails.map((item, index) => (
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
