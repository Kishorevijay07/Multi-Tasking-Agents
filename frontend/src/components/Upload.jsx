import { uploadFile } from "../api/api";
import { Paperclip, Loader2 } from "lucide-react";
import { useState, useRef } from "react";

export default function Upload() {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const res = await uploadFile(file);
      alert(res.message || "File uploaded successfully!");
    } catch (err) {
      alert("Failed to upload file.");
    } finally {
      setIsUploading(false);
      // Reset input so the same file can be uploaded again if needed
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex items-center">
      <input 
        type="file" 
        onChange={handleUpload} 
        className="hidden" 
        id="file-upload"
        ref={fileInputRef}
      />
      <label 
        htmlFor="file-upload" 
        className="flex items-center gap-2 cursor-pointer bg-surface hover:bg-surface/80 border border-white/10 transition-all text-text-light px-4 py-2 rounded-full text-sm font-medium hover:border-primary/50"
      >
        {isUploading ? (
          <Loader2 className="w-4 h-4 animate-spin text-primary" />
        ) : (
          <Paperclip className="w-4 h-4 text-primary" />
        )}
        {isUploading ? "Uploading..." : "Attach Document"}
      </label>
    </div>
  );
}