import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Link, FileText } from "lucide-react";

interface TextInputProps {
  onTextSubmit?: (text: string, source: "file" | "paste" | "url") => void;
  placeholder?: string;
  className?: string;
}

const TextInput = ({
  onTextSubmit = () => {},
  placeholder = "Enter or paste text here...",
  className = "",
}: TextInputProps) => {
  const [inputMethod, setInputMethod] = useState<"file" | "paste" | "url">(
    "paste",
  );
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileContent, setFileContent] = useState("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setFileContent(content);
    };
    reader.readAsText(file);
  };

  const handleSubmit = () => {
    if (inputMethod === "file" && fileContent) {
      onTextSubmit(fileContent, "file");
    } else if (inputMethod === "paste" && text) {
      onTextSubmit(text, "paste");
    } else if (inputMethod === "url" && url) {
      onTextSubmit(url, "url");
    }
  };

  return (
    <div
      className={`w-full bg-slate-900 p-6 rounded-lg shadow-lg ${className}`}
    >
      <div className="flex space-x-4 mb-6">
        <Button
          variant={inputMethod === "paste" ? "default" : "outline"}
          onClick={() => setInputMethod("paste")}
          className="flex items-center gap-2"
        >
          <FileText size={18} />
          Paste Text
        </Button>
        <Button
          variant={inputMethod === "file" ? "default" : "outline"}
          onClick={() => setInputMethod("file")}
          className="flex items-center gap-2"
        >
          <Upload size={18} />
          Upload File
        </Button>
        <Button
          variant={inputMethod === "url" ? "default" : "outline"}
          onClick={() => setInputMethod("url")}
          className="flex items-center gap-2"
        >
          <Link size={18} />
          Enter URL
        </Button>
      </div>

      {inputMethod === "paste" && (
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder}
          className="min-h-[120px] mb-4 bg-slate-800 text-white"
        />
      )}

      {inputMethod === "file" && (
        <div className="mb-4">
          <div className="border-2 border-dashed border-slate-700 rounded-lg p-8 text-center bg-slate-800">
            <input
              type="file"
              id="file-upload"
              accept=".txt,.doc,.docx,.pdf,.rtf"
              onChange={handleFileUpload}
              className="hidden"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center justify-center"
            >
              <Upload className="h-12 w-12 text-blue-500 mb-2" />
              <p className="text-lg font-medium mb-1">
                {fileName ? fileName : "Click to upload a file"}
              </p>
              <p className="text-sm text-slate-400">
                Supported formats: TXT, DOC, DOCX, PDF, RTF
              </p>
            </label>
          </div>
          {fileContent && (
            <div className="mt-4 p-3 bg-slate-800 rounded border border-slate-700 max-h-[200px] overflow-y-auto">
              <p className="text-sm text-slate-300">
                {fileContent.substring(0, 500)}...
              </p>
            </div>
          )}
        </div>
      )}

      {inputMethod === "url" && (
        <div className="mb-4">
          <Input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL of the article or document"
            className="bg-slate-800 text-white"
          />
          <p className="text-xs text-slate-400 mt-2">
            Enter the URL of an article or document you want to analyze
          </p>
        </div>
      )}

      <Button
        onClick={handleSubmit}
        className="w-full mt-2"
        disabled={
          (inputMethod === "file" && !fileContent) ||
          (inputMethod === "paste" && !text) ||
          (inputMethod === "url" && !url)
        }
      >
        Analyze Text
      </Button>
    </div>
  );
};

export default TextInput;
