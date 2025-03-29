import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BookOpen, Star, StarOff } from "lucide-react";

interface Word {
  id: string;
  word: string;
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  isSaved?: boolean;
}

interface WordListProps {
  words?: Word[];
  selectedWordId?: string;
  onSelectWord?: (wordId: string) => void;
}

const WordList = ({
  words = [
    { id: "1", word: "abandon", level: "B2" },
    { id: "2", word: "ability", level: "A2" },
    { id: "3", word: "abroad", level: "B1" },
    { id: "4", word: "absence", level: "C1" },
    { id: "5", word: "absolute", level: "B2" },
    { id: "6", word: "absolutely", level: "B1" },
    { id: "7", word: "academic", level: "B2" },
    { id: "8", word: "accept", level: "A2" },
    { id: "9", word: "access", level: "B1" },
    { id: "10", word: "accident", level: "A2" },
    { id: "11", word: "accommodation", level: "B2" },
    { id: "12", word: "accompany", level: "C1" },
    { id: "13", word: "according", level: "B1" },
    { id: "14", word: "account", level: "B1" },
    { id: "15", word: "accurate", level: "B2" },
    { id: "16", word: "achieve", level: "B1" },
    { id: "17", word: "achievement", level: "B2" },
    { id: "18", word: "acknowledge", level: "C1" },
    { id: "19", word: "acquire", level: "C1" },
    { id: "20", word: "across", level: "A2" },
  ],
  selectedWordId = "",
  onSelectWord = () => {},
}: WordListProps) => {
  const [savedWords, setSavedWords] = useState<string[]>([]);

  const toggleSaveWord = (wordId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedWords((prev) =>
      prev.includes(wordId)
        ? prev.filter((id) => id !== wordId)
        : [...prev, wordId],
    );
  };

  const getLevelColor = (level: Word["level"]) => {
    switch (level) {
      case "A1":
        return "bg-green-500";
      case "A2":
        return "bg-green-400";
      case "B1":
        return "bg-blue-400";
      case "B2":
        return "bg-blue-500";
      case "C1":
        return "bg-purple-500";
      case "C2":
        return "bg-purple-600";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-slate-900 rounded-lg border border-slate-700 overflow-hidden">
      <div className="p-4 border-b border-slate-700 bg-slate-800">
        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Daily Words
        </h3>
        <p className="text-slate-400 text-sm mt-1">
          Oxford 3000/5000 vocabulary list
        </p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {words.map((word) => (
            <div
              key={word.id}
              onClick={() => onSelectWord(word.id)}
              className={`flex items-center justify-between p-3 mb-2 rounded-md cursor-pointer transition-colors ${selectedWordId === word.id ? "bg-slate-700" : "bg-slate-800 hover:bg-slate-700"}`}
            >
              <div className="flex items-center gap-3">
                <Badge className={`${getLevelColor(word.level)} text-white`}>
                  {word.level}
                </Badge>
                <span className="text-white font-medium">{word.word}</span>
              </div>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => toggleSaveWord(word.id, e)}
                      className="text-slate-400 hover:text-yellow-400 hover:bg-slate-700"
                    >
                      {savedWords.includes(word.id) ? (
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ) : (
                        <StarOff className="h-5 w-5" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {savedWords.includes(word.id)
                      ? "Remove from saved words"
                      : "Save word"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default WordList;
