import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowLeft, Save, Phone, Mail, MapPin, Clock, Globe, Instagram, Facebook, Twitter, Linkedin, Youtube, Music2 } from "lucide-react";
import type { Tables, Json } from "@/integrations/supabase/types";

type SiteContent = Tables<"site_content">;

interface ContactMetadata {
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
}

export default function AdminContent() {
  const [contents, setContents] = useState<SiteContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminAccess();
    fetchContents();
  }, []);

  const checkAdminAccess = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/admin/login");
      return;
    }

    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "admin")
      .eq("is_active", true)
      .maybeSingle();

    if (!roleData) {
      toast.error("Access denied");
      navigate("/admin/login");
    }
  };

  const fetchContents = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("site_content")
      .select("*")
      .order("section_key", { ascending: true });

    if (error) {
      toast.error("Failed to fetch content");
      console.error(error);
    } else {
      setContents(data || []);
    }
    setLoading(false);
  };

  const updateContent = async (id: string, updates: Partial<SiteContent>) => {
    setSaving(id);
    const { error } = await supabase
      .from("site_content")
      .update(updates)
      .eq("id", id);

    if (error) {
      toast.error("Failed to update content");
      console.error(error);
    } else {
      toast.success("Content updated successfully");
      fetchContents();
    }
    setSaving(null);
  };

  const handleFieldChange = (id: string, field: keyof SiteContent, value: string) => {
    setContents(contents.map(content => 
      content.id === id ? { ...content, [field]: value } : content
    ));
  };

  const handleMetadataChange = (id: string, field: keyof ContactMetadata, value: string) => {
    setContents(contents.map(content => {
      if (content.id === id) {
        const currentMetadata = (content.metadata as ContactMetadata) || {};
        return {
          ...content,
          metadata: { ...currentMetadata, [field]: value } as Json
        };
      }
      return content;
    }));
  };

  const getMetadataValue = (content: SiteContent, field: keyof ContactMetadata): string => {
    const metadata = content.metadata as ContactMetadata;
    return metadata?.[field] || "";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/admin/dashboard")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Content Management</h1>
              <p className="text-sm text-muted-foreground">Edit website content</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {contents.map((content) => (
            <Card key={content.id}>
              <CardHeader>
                <CardTitle className="capitalize">{content.section_key.replace('_', ' ')}</CardTitle>
                <CardDescription>
                  Update the content for the {content.section_key} section
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {content.title !== null && (
                  <div className="space-y-2">
                    <Label htmlFor={`title-${content.id}`}>Title</Label>
                    <Input
                      id={`title-${content.id}`}
                      value={content.title || ""}
                      onChange={(e) => handleFieldChange(content.id, "title", e.target.value)}
                    />
                  </div>
                )}
                
                {content.subtitle !== null && (
                  <div className="space-y-2">
                    <Label htmlFor={`subtitle-${content.id}`}>Subtitle</Label>
                    <Input
                      id={`subtitle-${content.id}`}
                      value={content.subtitle || ""}
                      onChange={(e) => handleFieldChange(content.id, "subtitle", e.target.value)}
                    />
                  </div>
                )}
                
                {content.content !== null && (
                  <div className="space-y-2">
                    <Label htmlFor={`content-${content.id}`}>Content</Label>
                    <Textarea
                      id={`content-${content.id}`}
                      value={content.content || ""}
                      onChange={(e) => handleFieldChange(content.id, "content", e.target.value)}
                      rows={4}
                    />
                  </div>
                )}
                
                {content.image_url !== null && (
                  <div className="space-y-2">
                    <Label htmlFor={`image-${content.id}`}>Image URL</Label>
                    <Input
                      id={`image-${content.id}`}
                      value={content.image_url || ""}
                      onChange={(e) => handleFieldChange(content.id, "image_url", e.target.value)}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                )}

                {/* Contact Info Metadata Fields */}
                {content.section_key === "contact_info" && (
                  <div className="space-y-4 pt-4 border-t">
                    <h4 className="font-semibold text-lg">Contact Details</h4>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`phone-${content.id}`} className="flex items-center gap-2">
                          <Phone className="w-4 h-4" /> Phone Number
                        </Label>
                        <Input
                          id={`phone-${content.id}`}
                          value={getMetadataValue(content, "phone")}
                          onChange={(e) => handleMetadataChange(content.id, "phone", e.target.value)}
                          placeholder="9881241411"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`email-${content.id}`} className="flex items-center gap-2">
                          <Mail className="w-4 h-4" /> Email Address
                        </Label>
                        <Input
                          id={`email-${content.id}`}
                          type="email"
                          value={getMetadataValue(content, "email")}
                          onChange={(e) => handleMetadataChange(content.id, "email", e.target.value)}
                          placeholder="info@thelive.bar"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`address-${content.id}`} className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" /> Address
                      </Label>
                      <Textarea
                        id={`address-${content.id}`}
                        value={getMetadataValue(content, "address")}
                        onChange={(e) => handleMetadataChange(content.id, "address", e.target.value)}
                        placeholder="Wakad-Hinjewadi Road, Pune, Maharashtra 411057, India"
                        rows={2}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`hours-${content.id}`} className="flex items-center gap-2">
                          <Clock className="w-4 h-4" /> Operating Hours
                        </Label>
                        <Input
                          id={`hours-${content.id}`}
                          value={getMetadataValue(content, "hours")}
                          onChange={(e) => handleMetadataChange(content.id, "hours", e.target.value)}
                          placeholder="Mon-Sun: 6:00 PM - 2:00 AM"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`website-${content.id}`} className="flex items-center gap-2">
                          <Globe className="w-4 h-4" /> Website
                        </Label>
                        <Input
                          id={`website-${content.id}`}
                          value={getMetadataValue(content, "website")}
                          onChange={(e) => handleMetadataChange(content.id, "website", e.target.value)}
                          placeholder="https://www.thelive.bar"
                        />
                      </div>
                    </div>

                    <h4 className="font-semibold text-lg pt-4">Social Media Links</h4>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`instagram-${content.id}`} className="flex items-center gap-2">
                          <Instagram className="w-4 h-4" /> Instagram URL
                        </Label>
                        <Input
                          id={`instagram-${content.id}`}
                          value={getMetadataValue(content, "instagram")}
                          onChange={(e) => handleMetadataChange(content.id, "instagram", e.target.value)}
                          placeholder="https://instagram.com/thelive.bar"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`facebook-${content.id}`} className="flex items-center gap-2">
                          <Facebook className="w-4 h-4" /> Facebook URL
                        </Label>
                        <Input
                          id={`facebook-${content.id}`}
                          value={getMetadataValue(content, "facebook")}
                          onChange={(e) => handleMetadataChange(content.id, "facebook", e.target.value)}
                          placeholder="https://facebook.com/thelive.bar"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`twitter-${content.id}`} className="flex items-center gap-2">
                          <Twitter className="w-4 h-4" /> Twitter URL
                        </Label>
                        <Input
                          id={`twitter-${content.id}`}
                          value={getMetadataValue(content, "twitter")}
                          onChange={(e) => handleMetadataChange(content.id, "twitter", e.target.value)}
                          placeholder="https://twitter.com/thelive_bar"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`linkedin-${content.id}`} className="flex items-center gap-2">
                          <Linkedin className="w-4 h-4" /> LinkedIn URL
                        </Label>
                        <Input
                          id={`linkedin-${content.id}`}
                          value={getMetadataValue(content, "linkedin")}
                          onChange={(e) => handleMetadataChange(content.id, "linkedin", e.target.value)}
                          placeholder="https://linkedin.com/company/thelive-bar"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`youtube-${content.id}`} className="flex items-center gap-2">
                          <Youtube className="w-4 h-4" /> YouTube URL
                        </Label>
                        <Input
                          id={`youtube-${content.id}`}
                          value={getMetadataValue(content, "youtube")}
                          onChange={(e) => handleMetadataChange(content.id, "youtube", e.target.value)}
                          placeholder="https://youtube.com/@thelive.bar"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`spotify-${content.id}`} className="flex items-center gap-2">
                          <Music2 className="w-4 h-4" /> Spotify URL
                        </Label>
                        <Input
                          id={`spotify-${content.id}`}
                          value={getMetadataValue(content, "spotify")}
                          onChange={(e) => handleMetadataChange(content.id, "spotify", e.target.value)}
                          placeholder="https://open.spotify.com/..."
                        />
                      </div>
                    </div>
                  </div>
                )}

                <Button
                  onClick={() => {
                    const { id, created_at, updated_at, ...updates } = content;
                    updateContent(content.id, updates);
                  }}
                  disabled={saving === content.id}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {saving === content.id ? "Saving..." : "Save Changes"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
