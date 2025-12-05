import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CreditCard, Search, Users, Percent, Trash2 } from 'lucide-react';
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

export const AdminLoyalty = () => {
  const [passes, setPasses] = useState<LoyaltyPass[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPasses();
  }, []);

  const fetchPasses = async () => {
    try {
      const { data, error } = await supabase
        .from('loyalty_passes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPasses(data || []);
    } catch (error) {
      console.error('Error fetching passes:', error);
      toast({ title: 'Error', description: 'Failed to load loyalty passes.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePassStatus = async (passId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('loyalty_passes')
        .update({ is_active: !currentStatus })
        .eq('id', passId);

      if (error) throw error;

      setPasses(passes.map(p => p.id === passId ? { ...p, is_active: !currentStatus } : p));
      toast({ title: 'Updated', description: `Pass ${!currentStatus ? 'activated' : 'deactivated'}.` });
    } catch (error) {
      console.error('Error updating pass:', error);
      toast({ title: 'Error', description: 'Failed to update pass.', variant: 'destructive' });
    }
  };

  const deletePass = async (passId: string) => {
    if (!confirm('Are you sure you want to delete this pass?')) return;

    try {
      const { error } = await supabase
        .from('loyalty_passes')
        .delete()
        .eq('id', passId);

      if (error) throw error;

      setPasses(passes.filter(p => p.id !== passId));
      toast({ title: 'Deleted', description: 'Loyalty pass deleted.' });
    } catch (error) {
      console.error('Error deleting pass:', error);
      toast({ title: 'Error', description: 'Failed to delete pass.', variant: 'destructive' });
    }
  };

  const updateDiscount = async (passId: string, discount: number) => {
    try {
      const { error } = await supabase
        .from('loyalty_passes')
        .update({ discount_percentage: discount })
        .eq('id', passId);

      if (error) throw error;

      setPasses(passes.map(p => p.id === passId ? { ...p, discount_percentage: discount } : p));
      toast({ title: 'Updated', description: 'Discount percentage updated.' });
    } catch (error) {
      console.error('Error updating discount:', error);
      toast({ title: 'Error', description: 'Failed to update discount.', variant: 'destructive' });
    }
  };

  const filteredPasses = passes.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.pass_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.phone.includes(searchTerm)
  );

  const activeCount = passes.filter(p => p.is_active).length;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card/50 border-primary/20">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-full bg-primary/20">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Members</p>
              <p className="text-2xl font-bold text-foreground">{passes.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-primary/20">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-full bg-green-500/20">
              <CreditCard className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Passes</p>
              <p className="text-2xl font-bold text-foreground">{activeCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-primary/20">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-full bg-accent/20">
              <Percent className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Default Discount</p>
              <p className="text-2xl font-bold text-foreground">5%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="bg-card/50 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            Loyalty Pass Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, phone, or pass code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-background/50"
            />
          </div>

          {isLoading ? (
            <p className="text-center text-muted-foreground py-8">Loading...</p>
          ) : filteredPasses.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No loyalty passes found.</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Pass Code</TableHead>
                    <TableHead>Discount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPasses.map((pass) => (
                    <TableRow key={pass.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-foreground">{pass.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(pass.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm text-foreground">{pass.email}</p>
                          <p className="text-xs text-muted-foreground">{pass.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <code className="px-2 py-1 bg-primary/10 rounded text-primary text-sm">
                          {pass.pass_code}
                        </code>
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min="1"
                          max="100"
                          value={pass.discount_percentage}
                          onChange={(e) => updateDiscount(pass.id, parseInt(e.target.value) || 5)}
                          className="w-20 bg-background/50"
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={pass.is_active}
                            onCheckedChange={() => togglePassStatus(pass.id, pass.is_active)}
                          />
                          <Badge variant={pass.is_active ? 'default' : 'secondary'}>
                            {pass.is_active ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deletePass(pass.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLoyalty;
