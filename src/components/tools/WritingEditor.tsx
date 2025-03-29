import React, { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Save, RefreshCw, CheckCircle, AlertCircle } from "lucide-react";

interface WritingEditorProps {
  onContentChange?: (content: string) => void;
  initialContent?: string;
  placeholder?: string;
  readOnly?: boolean;
  showToolbar?: boolean;
}

const WritingEditor = ({
  onContentChange = () => {},
  initialContent = "",
  placeholder = "Start writing or paste your text here...",
  readOnly = false,
  showToolbar = true,
}: WritingEditorProps) => {
  const [content, setContent] = useState(initialContent);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    onContentChange(newContent);

    // Update word and character counts
    setCharCount(newContent.length);
    setWordCount(
      newContent.trim() === "" ? 0 : newContent.trim().split(/\s+/).length,
    );

    // Reset saved state when content changes
    if (isSaved) setIsSaved(false);
  };

  const handleSave = () => {
    // Simulate saving
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleClear = () => {
    setContent("");
    setWordCount(0);
    setCharCount(0);
    onContentChange("");
  };

  return (
    <div className="flex flex-col w-full h-full bg-slate-900 rounded-lg p-4 border border-slate-700">
      <div className="flex flex-col flex-grow">
        <Textarea
          value={content}
          onChange={handleContentChange}
          placeholder={placeholder}
          readOnly={readOnly}
          className="flex-grow min-h-[400px] p-4 text-base bg-slate-800 border-slate-700 focus:border-blue-500 resize-none mb-4"
        />

        <div className="flex justify-between items-center text-sm text-slate-400 mb-2">
          <div>
            <span>{wordCount} words</span>
            <span className="mx-2">|</span>
            <span>{charCount} characters</span>
          </div>

          {isSaved && (
            <div className="flex items-center text-green-500">
              <CheckCircle size={16} className="mr-1" />
              <span>Saved</span>
            </div>
          )}
        </div>

        {showToolbar && (
          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={handleClear}
              className="bg-slate-800 border-slate-700 hover:bg-slate-700"
            >
              <RefreshCw size={16} className="mr-2" />
              Clear
            </Button>
            <Button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Save size={16} className="mr-2" />
              Save Draft
            </Button>
          </div>
        )}
      </div>

      {/* Placeholder for future features like formatting toolbar */}
      <div className="hidden">
        <div className="flex gap-2 mt-4 p-2 bg-slate-800 rounded border border-slate-700">
          <Button variant="ghost" size="sm" className="text-slate-300">
            Bold
          </Button>
          <Button variant="ghost" size="sm" className="text-slate-300">
            Italic
          </Button>
          <Button variant="ghost" size="sm" className="text-slate-300">
            Underline
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WritingEditor;
