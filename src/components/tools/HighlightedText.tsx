import React, { useState } from "react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

interface HighlightedTextProps {
  text?: string;
  highlightedWords?: {
    word: string;
    definition: string;
    startIndex: number;
    endIndex: number;
  }[];
  onWordClick?: (word: string) => void;
}

const HighlightedText = ({
  text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vocabulary is essential for effective communication. Advanced words like 'ubiquitous', 'ephemeral', and 'paradigm' can enhance your writing. Learning English requires consistent practice and dedication.",
  highlightedWords = [
    {
      word: "ubiquitous",
      definition: "present, appearing, or found everywhere",
      startIndex: 115,
      endIndex: 125,
    },
    {
      word: "ephemeral",
      definition: "lasting for a very short time",
      startIndex: 127,
      endIndex: 136,
    },
    {
      word: "paradigm",
      definition: "a typical example or pattern of something",
      startIndex: 143,
      endIndex: 151,
    },
  ],
  onWordClick = (word) => console.log(`Word clicked: ${word}`),
}: HighlightedTextProps) => {
  const [fontSize, setFontSize] = useState<string>("text-base");

  // Function to render text with highlighted words
  const renderHighlightedText = () => {
    if (!text) return null;

    // Sort highlighted words by startIndex in descending order to avoid index shifting
    const sortedHighlights = [...highlightedWords].sort(
      (a, b) => b.startIndex - a.startIndex,
    );

    let result = text;
    let jsxElements: JSX.Element[] = [];

    // Replace each highlighted word with a span
    sortedHighlights.forEach((highlight) => {
      const { word, definition, startIndex, endIndex } = highlight;

      // Split the text at the highlighted word
      const before = result.substring(0, startIndex);
      const highlightedWord = result.substring(startIndex, endIndex);
      const after = result.substring(endIndex);

      // Update the result for the next iteration
      result = before;

      // Create JSX elements
      jsxElements = [
        <React.Fragment key={`${word}-${startIndex}`}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span
                  className="bg-blue-500/20 text-blue-300 px-1 py-0.5 rounded cursor-pointer hover:bg-blue-500/30 transition-colors"
                  onClick={() => onWordClick(word)}
                >
                  {highlightedWord}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>{definition}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {after}
          {jsxElements}
        </React.Fragment>,
      ];
    });

    return (
      <>
        {result}
        {jsxElements}
      </>
    );
  };

  const handleFontSizeChange = (size: string) => {
    setFontSize(size);
  };

  return (
    <div className="w-full h-full bg-gray-900 text-gray-100 p-6 rounded-lg overflow-auto">
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-xl font-semibold text-blue-300">Reading Text</h3>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleFontSizeChange("text-sm")}
            className={`${fontSize === "text-sm" ? "bg-blue-800" : ""}`}
          >
            A-
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleFontSizeChange("text-base")}
            className={`${fontSize === "text-base" ? "bg-blue-800" : ""}`}
          >
            A
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleFontSizeChange("text-lg")}
            className={`${fontSize === "text-lg" ? "bg-blue-800" : ""}`}
          >
            A+
          </Button>
        </div>
      </div>

      <div className={`${fontSize} leading-relaxed bg-gray-800 p-4 rounded-md`}>
        {renderHighlightedText()}
      </div>

      <div className="mt-4 text-sm text-gray-400">
        <p>
          Click on highlighted words to view more details and add them to your
          vocabulary list.
        </p>
      </div>
    </div>
  );
};

export default HighlightedText;
