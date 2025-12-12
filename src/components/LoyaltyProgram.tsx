import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Gift, Percent, Sparkles, QrCode, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface LoyaltyPass {
  id: string;
  name: string;
  email: string;
  phone: string;
  pass_code: string;
  discount_percentage: number;
  is_active: boolean;
  created_at: string;
}

const generatePassCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = 'LIVE-';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

export const LoyaltyProgram = () => {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isViewPassOpen, setIsViewPassOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [lookupData, setLookupData] = useState({ email: '', passCode: '' });
  const [currentPass, setCurrentPass] = useState<LoyaltyPass | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const passCode = generatePassCode();
      const { data, error } = await supabase
        .from('loyalty_passes')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          pass_code: passCode,
        })
        .select()
        .single();

      if (error) {
        if (error.code === '23505') {
          toast({ title: 'Email already registered', description: 'You already have a loyalty pass!', variant: 'destructive' });
        } else {
          throw error;
        }
        return;
      }

      setCurrentPass(data);
      setIsSignupOpen(false);
      setIsViewPassOpen(true);
      setFormData({ name: '', email: '', phone: '' });
      toast({ title: 'Welcome to LIVE Loyalty!', description: 'Your digital pass is ready.' });
    } catch (error) {
      console.error('Signup error:', error);
      toast({ title: 'Error', description: 'Failed to create loyalty pass.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const identifier = lookupData.email || lookupData.passCode;
      const { data, error } = await supabase
        .rpc('lookup_loyalty_pass', { identifier });

      if (error) throw error;

      if (data && data.length > 0) {
        setCurrentPass(data[0] as LoyaltyPass);
        setLookupData({ email: '', passCode: '' });
      } else {
        toast({ title: 'Pass not found', description: 'No loyalty pass found with that email or code.', variant: 'destructive' });
      }
    } catch (error) {
      console.error('Lookup error:', error);
      toast({ title: 'Error', description: 'Failed to find loyalty pass.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    { icon: Percent, text: '5% extra discount on all offers' },
    { icon: Gift, text: 'Exclusive member-only promotions' },
    { icon: Sparkles, text: 'Priority reservations' },
  ];

  return (
    <section id="loyalty" className="py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <CreditCard className="w-8 h-8 text-primary" />
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              LIVE Loyalty Pass
            </h2>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join our exclusive loyalty program and enjoy 5% additional discount on all existing offers
          </p>
        </motion.div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="p-3 rounded-full bg-gradient-to-br from-primary to-accent">
                    <benefit.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <span className="text-foreground font-medium">{benefit.text}</span>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          {/* Signup Dialog */}
          <Dialog open={isSignupOpen} onOpenChange={setIsSignupOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg px-8">
                <Gift className="w-5 h-5 mr-2" />
                Join Now - It's Free!
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-primary/20">
              <DialogHeader>
                <DialogTitle className="text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Join LIVE Loyalty
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSignup} className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-background/50"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-background/50"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="bg-background/50"
                  />
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent" disabled={isLoading}>
                  {isLoading ? 'Creating Pass...' : 'Get My Digital Pass'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          {/* View Pass Dialog */}
          <Dialog open={isViewPassOpen} onOpenChange={setIsViewPassOpen}>
            <DialogTrigger asChild>
              <Button size="lg" variant="outline" className="border-primary/50 hover:bg-primary/10 text-lg px-8">
                <QrCode className="w-5 h-5 mr-2" />
                View My Pass
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-primary/20 max-w-md">
              <DialogHeader>
                <DialogTitle className="text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {currentPass ? 'Your Digital Pass' : 'Find Your Pass'}
                </DialogTitle>
              </DialogHeader>

              {!currentPass ? (
                <form onSubmit={handleLookup} className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="lookup-email">Email or Pass Code</Label>
                    <Input
                      id="lookup-email"
                      value={lookupData.email || lookupData.passCode}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value.includes('@')) {
                          setLookupData({ email: value, passCode: '' });
                        } else {
                          setLookupData({ email: '', passCode: value });
                        }
                      }}
                      placeholder="Enter email or pass code"
                      required
                      className="bg-background/50"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent" disabled={isLoading}>
                    {isLoading ? 'Searching...' : 'Find My Pass'}
                  </Button>
                </form>
              ) : (
                <div className="mt-4">
                  <Card className="bg-gradient-to-br from-primary/20 via-card to-accent/20 border-primary/30 overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary to-accent" />
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl text-primary">LIVE Loyalty</CardTitle>
                        {currentPass.is_active ? (
                          <span className="flex items-center gap-1 text-sm text-green-500">
                            <Check className="w-4 h-4" /> Active
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-sm text-destructive">
                            <X className="w-4 h-4" /> Inactive
                          </span>
                        )}
                      </div>
                      <CardDescription>Digital Membership Pass</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Member</p>
                        <p className="text-lg font-semibold text-foreground">{currentPass.name}</p>
                      </div>
                      <div className="flex items-center justify-center py-4">
                        <div className="bg-background/80 p-4 rounded-lg border border-primary/30">
                          <p className="text-3xl font-mono font-bold tracking-wider text-primary">
                            {currentPass.pass_code}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg">
                        <Percent className="w-5 h-5 text-primary" />
                        <span className="text-lg font-semibold text-foreground">
                          {currentPass.discount_percentage}% Extra Discount
                        </span>
                      </div>
                      <p className="text-xs text-center text-muted-foreground">
                        Show this pass at checkout to avail your discount
                      </p>
                    </CardContent>
                  </Card>
                  <Button
                    variant="ghost"
                    className="w-full mt-4"
                    onClick={() => setCurrentPass(null)}
                  >
                    Look up another pass
                  </Button>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </motion.div>
      </div>
    </section>
  );
};

export default LoyaltyProgram;
