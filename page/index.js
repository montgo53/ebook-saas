import React, { useState } from "react";
import { motion } from "framer-motion";

export default function EbookCreator() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [chapters, setChapters] = useState([{ heading: "", content: "" }]);

  const addChapter = () => setChapters([...chapters, { heading: "", content: "" }]);
  const removeChapter = (index) =>
    setChapters(chapters.filter((_, i) => i !== index));
  const updateChapter = (index, field, value) => {
    const newChapters = [...chapters];
    newChapters[index][field] = value;
    setChapters(newChapters);
  };

  const downloadText = () => {
    const content = `Title: ${title}\nAuthor: ${author}\n\n${chapters
      .map((c, i) => `Chapter ${i + 1}: ${c.heading}\n${c.content}`)
      .join("\n\n")}`;
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${title || "ebook"}.txt`;
    link.click();
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", maxWidth: "800px", margin: "0 auto" }}>
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        Ebook Creator
      </motion.h1>

      <input
        placeholder="Ebook Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
      />
      <input
        placeholder="Author Name"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
      />

      {chapters.map((c, i) => (
        <div key={i} style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
          <input
            placeholder={`Chapter ${i + 1} Heading`}
            value={c.heading}
            onChange={(e) => updateChapter(i, "heading", e.target.value)}
            style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
          />
          <textarea
            placeholder="Chapter Content"
            value={c.content}
            onChange={(e) => updateChapter(i, "content", e.target.value)}
            style={{ width: "100%", padding: "0.5rem", minHeight: "100px" }}
          />
          {chapters.length > 1 && (
            <button onClick={() => removeChapter(i)} style={{ marginTop: "0.5rem", backgroundColor: "#f00", color: "#fff", border: "none", padding: "0.5rem 1rem" }}>
              Remove Chapter
            </button>
          )}
        </div>
      ))}

      <button onClick={addChapter} style={{ marginRight: "1rem", padding: "0.5rem 1rem" }}>
        Add Chapter
      </button>
      <button onClick={downloadText} style={{ padding: "0.5rem 1rem" }}>
        Download Ebook
      </button>
    </div>
  );
}
