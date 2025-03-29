import React, { useState } from "react";
import TextInput from "./TextInput";
import HighlightedText from "./HighlightedText";
import { Button } from "../ui/button";
import { BookOpen, Save, Share } from "lucide-react";

interface WordDefinitionPanelProps {
  word: string;
  definition: string;
  examples: string[];
  synonyms: string[];
  level: string;
  onSaveWord: () => void;
}

const WordDefinitionPanel = ({
  word = "",
  definition = "",
  examples = [],
  synonyms = [],
  level = "",
  onSaveWord = () => {},
}: WordDefinitionPanelProps) => {
  return (
    <div className="bg-slate-900 p-4 rounded-lg h-full">
      {word ? (
        <>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-blue-400">{word}</h3>
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
              {level}
            </span>
          </div>
          <div className="mb-4">
            <h4 className="text-sm text-gray-400 mb-1">Definition</h4>
            <p className="text-white">{definition}</p>
          </div>
          {examples.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm text-gray-400 mb-1">Examples</h4>
              <ul className="list-disc list-inside text-gray-200">
                {examples.map((example, index) => (
                  <li key={index} className="mb-1">
                    {example}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {synonyms.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm text-gray-400 mb-1">Synonyms</h4>
              <div className="flex flex-wrap gap-2">
                {synonyms.map((synonym, index) => (
                  <span
                    key={index}
                    className="bg-slate-800 text-gray-200 px-2 py-1 rounded-md text-sm"
                  >
                    {synonym}
                  </span>
                ))}
              </div>
            </div>
          )}
          <Button
            onClick={onSaveWord}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
          >
            <Save className="mr-2 h-4 w-4" /> Save Word
          </Button>
        </>
      ) : (
        <div className="h-full flex items-center justify-center text-gray-400">
          <p>Select a highlighted word to view its definition</p>
        </div>
      )}
    </div>
  );
};

interface ReadingAssistantProps {
  className?: string;
}

const ReadingAssistant = ({ className = "" }: ReadingAssistantProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzedText, setAnalyzedText] = useState<string>("");
  const [selectedWord, setSelectedWord] = useState<string>("");
  const [highlightedWords, setHighlightedWords] = useState<
    {
      word: string;
      definition: string;
      startIndex: number;
      endIndex: number;
    }[]
  >([
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
  ]);

  const [wordDetails, setWordDetails] = useState<{
    word: string;
    definition: string;
    examples: string[];
    synonyms: string[];
    level: string;
  }>({
    word: "",
    definition: "",
    examples: [],
    synonyms: [],
    level: "",
  });

  const handleTextSubmit = (text: string, source: "file" | "paste" | "url") => {
    setIsAnalyzing(true);

    // Simulate API call to analyze text
    setTimeout(() => {
      setAnalyzedText(text);
      // In a real implementation, the API would return highlighted words
      // with their definitions, examples, etc.
      setIsAnalyzing(false);
    }, 1500);
  };

  const handleWordClick = (word: string) => {
    setSelectedWord(word);

    // Find the word in highlightedWords
    const wordInfo = highlightedWords.find((item) => item.word === word);

    if (wordInfo) {
      // Simulate fetching detailed information about the word
      setWordDetails({
        word,
        definition: wordInfo.definition,
        examples: [
          "The technology has become ubiquitous in modern society.",
          "Smartphones are now ubiquitous in everyday life.",
        ],
        synonyms: ["omnipresent", "universal", "widespread", "pervasive"],
        level: "C1",
      });
    }
  };

  const handleSaveWord = () => {
    // Implement save word functionality
    console.log(`Saved word: ${selectedWord}`);
  };

  return (
    <div
      className={`w-full h-full bg-slate-950 text-white p-6 rounded-lg ${className}`}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-blue-400 flex items-center">
          <BookOpen className="mr-2" /> Reading Assistant
        </h2>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="text-blue-400 border-blue-400"
          >
            <Share className="mr-2 h-4 w-4" /> Share
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-blue-400 border-blue-400"
          >
            <Save className="mr-2 h-4 w-4" /> Save Session
          </Button>
        </div>
      </div>

      {!analyzedText ? (
        <div className="mb-6">
          <TextInput
            onTextSubmit={handleTextSubmit}
            placeholder="Enter or paste text you want to analyze..."
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <HighlightedText
              text={analyzedText}
              highlightedWords={highlightedWords}
              onWordClick={handleWordClick}
            />
          </div>
          <div className="lg:col-span-1">
            <WordDefinitionPanel
              word={wordDetails.word}
              definition={wordDetails.definition}
              examples={wordDetails.examples}
              synonyms={wordDetails.synonyms}
              level={wordDetails.level}
              onSaveWord={handleSaveWord}
            />
          </div>
        </div>
      )}

      {isAnalyzing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-slate-800 p-6 rounded-lg shadow-lg text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-lg">Analyzing text...</p>
            <p className="text-sm text-gray-400 mt-2">
              Identifying complex vocabulary and preparing definitions
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadingAssistant;
