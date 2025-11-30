import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowLeft, Save } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type SiteContent = Tables<"site_content">;

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
