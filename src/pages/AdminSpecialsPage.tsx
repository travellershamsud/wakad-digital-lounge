import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Plus, Trash2, Save, Loader2, GripVertical } from "lucide-react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Special {
  id: string;
  title: string;
  time: string;
  days: string;
  offers: string[];
  color: string;
  badge: string | null;
  icon_name: string;
  display_order: number;
  is_active: boolean;
}

const colorOptions = [
  { value: "from-primary to-cyan-400", label: "Cyan" },
  { value: "from-secondary to-pink-400", label: "Pink" },
  { value: "from-purple-500 to-primary", label: "Purple" },
  { value: "from-accent to-purple-400", label: "Accent Purple" },
  { value: "from-green-500 to-emerald-400", label: "Green" },
  { value: "from-orange-500 to-amber-400", label: "Orange" },
];

const iconOptions = [
  { value: "Beer", label: "Beer" },
  { value: "Wine", label: "Wine" },
  { value: "Music", label: "Music" },
];

export default function AdminSpecialsPage() {
  const navigate = useNavigate();
  const [specials, setSpecials] = useState<Special[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    checkAdminAccess();
    fetchSpecials();
  }, []);

  const checkAdminAccess = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/admin');
      return;
    }

    const { data: isAdmin } = await supabase.rpc('is_admin', { user_id: session.user.id });
    if (!isAdmin) {
      navigate('/admin');
    }
  };

  const fetchSpecials = async () => {
    const { data, error } = await supabase
      .from('specials')
      .select('*')
      .order('display_order');

    if (error) {
      toast.error('Failed to load specials');
      console.error(error);
    } else {
      setSpecials(data || []);
    }
    setLoading(false);
  };

  const updateSpecial = async (special: Special) => {
    setSaving(special.id);
    const { error } = await supabase
      .from('specials')
      .update({
        title: special.title,
        time: special.time,
        days: special.days,
        offers: special.offers,
        color: special.color,
        badge: special.badge,
        icon_name: special.icon_name,
        display_order: special.display_order,
        is_active: special.is_active,
      })
      .eq('id', special.id);

    if (error) {
      toast.error('Failed to update special');
      console.error(error);
    } else {
      toast.success('Special updated successfully');
    }
    setSaving(null);
  };

  const addSpecial = async () => {
    const maxOrder = Math.max(...specials.map(s => s.display_order), 0);
    const { data, error } = await supabase
      .from('specials')
      .insert({
        title: 'New Special',
        time: '6 PM - 10 PM',
        days: 'Mon - Fri',
        offers: ['Special offer'],
        color: 'from-primary to-cyan-400',
        badge: 'New',
        icon_name: 'Beer',
        display_order: maxOrder + 1,
        is_active: true,
      })
      .select()
      .single();

    if (error) {
      toast.error('Failed to add special');
      console.error(error);
    } else if (data) {
      setSpecials([...specials, data]);
      toast.success('New special added');
    }
  };

  const deleteSpecial = async (id: string) => {
    if (!confirm('Are you sure you want to delete this special?')) return;

    const { error } = await supabase
      .from('specials')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Failed to delete special');
      console.error(error);
    } else {
      setSpecials(specials.filter(s => s.id !== id));
      toast.success('Special deleted');
    }
  };

  const handleFieldChange = (id: string, field: keyof Special, value: any) => {
    setSpecials(specials.map(s => 
      s.id === id ? { ...s, [field]: value } : s
    ));
  };

  const handleOfferChange = (id: string, index: number, value: string) => {
    setSpecials(specials.map(s => {
      if (s.id !== id) return s;
      const newOffers = [...s.offers];
      newOffers[index] = value;
      return { ...s, offers: newOffers };
    }));
  };

  const addOffer = (id: string) => {
    setSpecials(specials.map(s => {
      if (s.id !== id) return s;
      return { ...s, offers: [...s.offers, ''] };
    }));
  };

  const removeOffer = (id: string, index: number) => {
    setSpecials(specials.map(s => {
      if (s.id !== id) return s;
      const newOffers = s.offers.filter((_, i) => i !== index);
      return { ...s, offers: newOffers };
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/admin/dashboard')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold">Manage Specials</h1>
          </div>
          <Button onClick={addSpecial}>
            <Plus className="w-4 h-4 mr-2" />
            Add Special
          </Button>
        </div>

        <div className="space-y-6">
          {specials.map((special) => (
            <Card key={special.id} className="relative">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-4">
                  <GripVertical className="w-5 h-5 text-muted-foreground" />
                  <CardTitle className="text-lg">{special.title}</CardTitle>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`active-${special.id}`}>Active</Label>
                    <Switch
                      id={`active-${special.id}`}
                      checked={special.is_active}
                      onCheckedChange={(checked) => handleFieldChange(special.id, 'is_active', checked)}
                    />
                  </div>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => deleteSpecial(special.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={special.title}
                      onChange={(e) => handleFieldChange(special.id, 'title', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Badge</Label>
                    <Input
                      value={special.badge || ''}
                      onChange={(e) => handleFieldChange(special.id, 'badge', e.target.value)}
                      placeholder="e.g., Most Popular"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Time</Label>
                    <Input
                      value={special.time}
                      onChange={(e) => handleFieldChange(special.id, 'time', e.target.value)}
                      placeholder="e.g., 5 PM - 8 PM"
                    />
                  </div>
                  <div>
                    <Label>Days</Label>
                    <Input
                      value={special.days}
                      onChange={(e) => handleFieldChange(special.id, 'days', e.target.value)}
                      placeholder="e.g., Mon - Thu"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Icon</Label>
                    <Select
                      value={special.icon_name}
                      onValueChange={(value) => handleFieldChange(special.id, 'icon_name', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {iconOptions.map((icon) => (
                          <SelectItem key={icon.value} value={icon.value}>
                            {icon.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Color Theme</Label>
                    <Select
                      value={special.color}
                      onValueChange={(value) => handleFieldChange(special.id, 'color', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {colorOptions.map((color) => (
                          <SelectItem key={color.value} value={color.value}>
                            {color.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Display Order</Label>
                    <Input
                      type="number"
                      value={special.display_order}
                      onChange={(e) => handleFieldChange(special.id, 'display_order', parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Offers</Label>
                    <Button variant="outline" size="sm" onClick={() => addOffer(special.id)}>
                      <Plus className="w-3 h-3 mr-1" />
                      Add Offer
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {special.offers.map((offer, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={offer}
                          onChange={(e) => handleOfferChange(special.id, index, e.target.value)}
                          placeholder="Enter offer text"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeOffer(special.id, index)}
                          disabled={special.offers.length <= 1}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={() => updateSpecial(special)}
                  disabled={saving === special.id}
                  className="w-full"
                >
                  {saving === special.id ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
