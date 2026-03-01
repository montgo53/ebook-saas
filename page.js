import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Download, Plus, Trash, CreditCard, Image } from "lucide-react";

export default function EbookCreatorSaaS() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [coverColor, setCoverColor] = useState("#111827");
  const [chapters, setChapters] = useState([{ heading: "", content: "" }]);
  const [previewMode, setPreviewMode] = useState(false);

  const addChapter = () => {
    setChapters([...chapters, { heading: "", content: "" }]);
  };

  const removeChapter = (index) => {
    const updated = chapters.filter((_, i) => i !== index);
    setChapters(updated);
  };

  const updateChapter = (index, field, value) => {
    const updated = [...chapters];
    updated[index][field] = value;
    setChapters(updated);
  };

  const generatePDF = () => {
    const content = `Title: ${title}\nAuthor: ${author}\n\n${chapters
      .map((c, i) => `Chapter ${i + 1}: ${c.heading}\n${c.content}`)
      .join("\n\n")}`;

    const blob = new Blob([content], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${title || "ebook"}.pdf`;
    link.click();
  };

  const handleStripeCheckout = async () => {
    alert("Connect Stripe API here to enable real payments.");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto"
      >
        <Card className="rounded-2xl shadow-xl p-6">
          <CardContent className="space-y-6">
            <h1 className="text-4xl font-bold">Ebook Creator SaaS Platform</h1>

            {/* Book Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input placeholder="Ebook Title" value={title} onChange={(e) => setTitle(e.target.value)} />
              <Input placeholder="Author Name" value={author} onChange={(e) => setAuthor(e.target.value)} />
              <Input placeholder="Price ($)" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>

            {/* Cover Designer */}
            <Card className="p-4 rounded-2xl shadow">
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Image size={18} />
                  <h2 className="text-xl font-semibold">Cover Designer</h2>
                </div>
                <Input type="color" value={coverColor} onChange={(e) => setCoverColor(e.target.value)} />
                <div
                  className="h-40 rounded-2xl flex items-center justify-center text-white text-2xl font-bold"
                  style={{ backgroundColor: coverColor }}
                >
                  {title || "Your Book Title"}
                </div>
              </CardContent>
            </Card>

            {/* Chapters */}
            <div className="space-y-4">
              {chapters.map((chapter, index) => (
                <Card key={index} className="p-4 rounded-2xl shadow">
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-semibold">Chapter {index + 1}</h2>
                      {chapters.length > 1 && (
                        <Button variant="destructive" size="sm" onClick={() => removeChapter(index)}>
                          <Trash size={16} />
                        </Button>
                      )}
                    </div>
                    <Input
                      placeholder="Chapter Heading"
                      value={chapter.heading}
                      onChange={(e) => updateChapter(index, "heading", e.target.value)}
                    />
                    <Textarea
                      placeholder="Chapter Content"
                      className="min-h-[120px]"
                      value={chapter.content}
                      onChange={(e) => updateChapter(index, "content", e.target.value)}
                    />
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Button onClick={addChapter} className="rounded-2xl">
                <Plus className="mr-2" size={16} /> Add Chapter
              </Button>
              <Button onClick={generatePDF} className="rounded-2xl">
                <Download className="mr-2" size={16} /> Download PDF
              </Button>
              <Button onClick={() => setPreviewMode(!previewMode)} className="rounded-2xl">
                Preview
              </Button>
            </div>

            {/* SaaS Monetization Section */}
            <div className="pt-6 border-t space-y-3">
              <h3 className="text-lg font-semibold">Monetize This Platform</h3>
              <p className="text-sm text-gray-600">
                Turn this into a monthly subscription SaaS. Charge creators $19–$49/month to build and export ebooks.
              </p>
              <Button onClick={handleStripeCheckout} className="rounded-2xl">
                <CreditCard className="mr-2" size={16} /> Connect Stripe Payments
              </Button>
            </div>

            {/* Live Preview */}
            {previewMode && (
              <Card className="p-4 rounded-2xl shadow bg-white">
                <CardContent>
                  <h2 className="text-2xl font-bold mb-2">{title}</h2>
                  <p className="italic mb-4">by {author}</p>
                  {chapters.map((c, i) => (
                    <div key={i} className="mb-4">
                      <h3 className="font-semibold">{c.heading}</h3>
                      <p className="text-sm text-gray-700">{c.content}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
