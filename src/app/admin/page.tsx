"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { defaultContent } from "@/lib/defaultContent";
import { ArrowRight, Save, CheckCircle, AlertCircle } from "lucide-react";

export default function AdminPanel() {
  const [content, setContent] = useState<any>(defaultContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error", text: string } | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from("page_content")
        .select("content")
        .eq("section_name", "home")
        .single();
        
      if (data && data.content) {
        setContent(data.content);
      }
    } catch (e) {
      console.log("No custom content found, using default.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const { error } = await supabase
        .from("page_content")
        .upsert({ 
          section_name: "home", 
          content: content 
        }, { onConflict: 'section_name' });

      if (error) throw error;
      setMessage({ type: "success", text: "Content successfully saved and published!" });
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "Failed to save content. Ensure you ran the SQL table creation script." });
    } finally {
      setSaving(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      setIsAuthenticated(true);
    } else {
      alert("Invalid password");
    }
  };

  const handleChange = (section: string, field: string, value: string) => {
    setContent((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-lg border border-black/5 w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-serif text-black mb-2">UESC Admin</h1>
            <p className="text-sm text-black/60">Enter password to manage website content</p>
          </div>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password (admin123)"
            className="w-full px-5 py-3 border border-black/10 rounded-xl outline-none focus:border-blue-600"
          />
          <button type="submit" className="w-full bg-black text-white rounded-xl py-3 font-semibold hover:bg-blue-600 transition-colors">
            Login to Admin
          </button>
        </form>
      </div>
    );
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading content...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8 sm:p-12 lg:p-16">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-serif text-black mb-2">Content Manager</h1>
            <p className="text-black/60">Update the text content of your website in real-time.</p>
          </div>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Publish Changes"}
          </button>
        </div>

        {message && (
          <div className={`p-4 rounded-xl flex items-center gap-3 ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            {message.text}
          </div>
        )}

        {/* Hero Section */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-black/5 space-y-5">
          <h2 className="text-2xl font-serif border-b pb-2">Hero Section</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-black/70 mb-1">Main Title</label>
              <input value={content.hero.title} onChange={(e) => handleChange('hero', 'title', e.target.value)} className="w-full border p-3 rounded-lg outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black/70 mb-1">Subtitle</label>
              <textarea rows={3} value={content.hero.subtitle} onChange={(e) => handleChange('hero', 'subtitle', e.target.value)} className="w-full border p-3 rounded-lg outline-none focus:border-blue-500" />
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-black/5 space-y-5">
          <h2 className="text-2xl font-serif border-b pb-2">About Section</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-black/70 mb-1">Badge Text</label>
              <input value={content.about.badge} onChange={(e) => handleChange('about', 'badge', e.target.value)} className="w-full border p-3 rounded-lg outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black/70 mb-1">Title</label>
              <input value={content.about.title} onChange={(e) => handleChange('about', 'title', e.target.value)} className="w-full border p-3 rounded-lg outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black/70 mb-1">Description</label>
              <textarea rows={4} value={content.about.description} onChange={(e) => handleChange('about', 'description', e.target.value)} className="w-full border p-3 rounded-lg outline-none focus:border-blue-500" />
            </div>
          </div>
        </div>

        {/* Why Choose UESC Section */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-black/5 space-y-5">
          <h2 className="text-2xl font-serif border-b pb-2">Why Choose UESC</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-black/70 mb-1">Title</label>
              <input value={content.whyChoose.title} onChange={(e) => handleChange('whyChoose', 'title', e.target.value)} className="w-full border p-3 rounded-lg outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black/70 mb-1">Description</label>
              <textarea rows={4} value={content.whyChoose.description} onChange={(e) => handleChange('whyChoose', 'description', e.target.value)} className="w-full border p-3 rounded-lg outline-none focus:border-blue-500" />
            </div>
          </div>
        </div>

        {/* Academic Programs Section */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-black/5 space-y-5">
          <h2 className="text-2xl font-serif border-b pb-2">Academic Programs</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-black/70 mb-1">Title</label>
              <input value={content.academicPrograms?.title || ""} onChange={(e) => handleChange('academicPrograms', 'title', e.target.value)} className="w-full border p-3 rounded-lg outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black/70 mb-1">Description</label>
              <textarea rows={4} value={content.academicPrograms?.description || ""} onChange={(e) => handleChange('academicPrograms', 'description', e.target.value)} className="w-full border p-3 rounded-lg outline-none focus:border-blue-500" />
            </div>
          </div>
        </div>

        {/* Career Development Section */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-black/5 space-y-5">
          <h2 className="text-2xl font-serif border-b pb-2">Career Development</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-black/70 mb-1">Badge Text</label>
              <input value={content.careerDevelopment?.badge || ""} onChange={(e) => handleChange('careerDevelopment', 'badge', e.target.value)} className="w-full border p-3 rounded-lg outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black/70 mb-1">Title</label>
              <input value={content.careerDevelopment?.title || ""} onChange={(e) => handleChange('careerDevelopment', 'title', e.target.value)} className="w-full border p-3 rounded-lg outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black/70 mb-1">Description</label>
              <textarea rows={4} value={content.careerDevelopment?.description || ""} onChange={(e) => handleChange('careerDevelopment', 'description', e.target.value)} className="w-full border p-3 rounded-lg outline-none focus:border-blue-500" />
            </div>
          </div>
        </div>

        {/* Testimonials (Student Voices) Section */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-black/5 space-y-5">
          <h2 className="text-2xl font-serif border-b pb-2">Student Voices (Testimonials)</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-black/70 mb-1">Badge Text</label>
              <input value={content.testimonials?.badge || ""} onChange={(e) => handleChange('testimonials', 'badge', e.target.value)} className="w-full border p-3 rounded-lg outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black/70 mb-1">Title</label>
              <input value={content.testimonials?.title || ""} onChange={(e) => handleChange('testimonials', 'title', e.target.value)} className="w-full border p-3 rounded-lg outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black/70 mb-1">Description</label>
              <textarea rows={4} value={content.testimonials?.description || ""} onChange={(e) => handleChange('testimonials', 'description', e.target.value)} className="w-full border p-3 rounded-lg outline-none focus:border-blue-500" />
            </div>
          </div>
        </div>

        {/* News & Events Section */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-black/5 space-y-5">
          <h2 className="text-2xl font-serif border-b pb-2">News & Events</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-black/70 mb-1">Badge Text</label>
              <input value={content.newsAndEvents?.badge || ""} onChange={(e) => handleChange('newsAndEvents', 'badge', e.target.value)} className="w-full border p-3 rounded-lg outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black/70 mb-1">Title</label>
              <input value={content.newsAndEvents?.title || ""} onChange={(e) => handleChange('newsAndEvents', 'title', e.target.value)} className="w-full border p-3 rounded-lg outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black/70 mb-1">Description</label>
              <textarea rows={4} value={content.newsAndEvents?.description || ""} onChange={(e) => handleChange('newsAndEvents', 'description', e.target.value)} className="w-full border p-3 rounded-lg outline-none focus:border-blue-500" />
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-black/5 space-y-5">
          <h2 className="text-2xl font-serif border-b pb-2">FAQ</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-black/70 mb-1">Badge Text</label>
              <input value={content.faq?.badge || ""} onChange={(e) => handleChange('faq', 'badge', e.target.value)} className="w-full border p-3 rounded-lg outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black/70 mb-1">Title</label>
              <input value={content.faq?.title || ""} onChange={(e) => handleChange('faq', 'title', e.target.value)} className="w-full border p-3 rounded-lg outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black/70 mb-1">Description</label>
              <textarea rows={4} value={content.faq?.description || ""} onChange={(e) => handleChange('faq', 'description', e.target.value)} className="w-full border p-3 rounded-lg outline-none focus:border-blue-500" />
            </div>
          </div>
        </div>

        {/* Find Us Section */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-black/5 space-y-5">
          <h2 className="text-2xl font-serif border-b pb-2">Find Us (Footer)</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-black/70 mb-1">Title</label>
              <input value={content.findUs?.title || ""} onChange={(e) => handleChange('findUs', 'title', e.target.value)} className="w-full border p-3 rounded-lg outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black/70 mb-1">Address</label>
              <textarea rows={2} value={content.findUs?.address || ""} onChange={(e) => handleChange('findUs', 'address', e.target.value)} className="w-full border p-3 rounded-lg outline-none focus:border-blue-500" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-black/70 mb-1">Phone 1</label>
                <input value={content.findUs?.phone1 || ""} onChange={(e) => handleChange('findUs', 'phone1', e.target.value)} className="w-full border p-3 rounded-lg outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-black/70 mb-1">Phone 2</label>
                <input value={content.findUs?.phone2 || ""} onChange={(e) => handleChange('findUs', 'phone2', e.target.value)} className="w-full border p-3 rounded-lg outline-none focus:border-blue-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t">
          <button 
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-bold shadow-xl hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            <Save className="w-5 h-5" />
            {saving ? "Saving..." : "Publish Changes to Live Site"}
          </button>
        </div>
      </div>
    </div>
  );
}
