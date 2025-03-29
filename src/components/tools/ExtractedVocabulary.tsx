import React, { useState } from "react";
import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { BookmarkIcon, InfoIcon, PlusIcon, XIcon } from "lucide-react";
import { Separator } from "../ui/separator";

interface Word {
  id: string;
  word: string;
  definition: string;
  timestamp: string;
  examples: string[];
  saved: boolean;
}

interface ExtractedVocabularyProps {
  words?: Word[];
  onSaveWord?: (wordId: string) => void;
  onRemoveWord?: (wordId: string) => void;
  onSelectWord?: (wordId: string) => void;
  selectedWordId?: string;
}

const ExtractedVocabulary = ({
  words = [
    {
      id: "1",
      word: "ubiquitous",
      definition: "Present, appearing, or found everywhere.",
      timestamp: "01:24",
      examples: [
        "Mobile phones are now ubiquitous in modern society.",
        "The ubiquitous nature of plastic pollution is concerning environmentalists.",
      ],
      saved: false,
    },
    {
      id: "2",
      word: "paradigm",
      definition: "A typical example or pattern of something; a model.",
      timestamp: "02:15",
      examples: [
        "The discovery led to a new paradigm in scientific thinking.",
        "We need a paradigm shift in how we approach environmental issues.",
      ],
      saved: true,
    },
    {
      id: "3",
      word: "ephemeral",
      definition: "Lasting for a very short time.",
      timestamp: "03:42",
      examples: [
        "The ephemeral nature of fashion trends makes them difficult to follow.",
        "Social media posts are often ephemeral, quickly forgotten as new content appears.",
      ],
      saved: false,
    },
    {
      id: "4",
      word: "pragmatic",
      definition:
        "Dealing with things sensibly and realistically in a way that is based on practical considerations.",
      timestamp: "05:17",
      examples: [
        "We need a pragmatic approach to solving this problem.",
        "She's known for her pragmatic leadership style.",
      ],
      saved: false,
    },
    {
      id: "5",
      word: "juxtaposition",
      definition:
        "The fact of two things being seen or placed close together with contrasting effect.",
      timestamp: "07:33",
      examples: [
        "The juxtaposition of the old and new buildings created an interesting visual effect.",
        "His speech contained a clever juxtaposition of humor and serious content.",
      ],
      saved: false,
    },
  ],
  onSaveWord = () => {},
  onRemoveWord = () => {},
  onSelectWord = () => {},
  selectedWordId = "1",
}: ExtractedVocabularyProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredWords = words.filter((word) =>
    word.word.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Card className="flex flex-col h-full w-full bg-gray-950 border-gray-800 text-white overflow-hidden">
      <div className="p-4 border-b border-gray-800">
        <h3 className="text-xl font-semibold mb-2">Extracted Vocabulary</h3>
        <p className="text-gray-400 text-sm mb-3">
          Words extracted based on your proficiency level
        </p>
        <div className="relative">
          <input
            type="text"
            placeholder="Search words..."
            className="w-full p-2 bg-gray-900 border border-gray-700 rounded-md text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <ScrollArea className="flex-grow">
        <div className="p-2">
          {filteredWords.length > 0 ? (
            filteredWords.map((word) => (
              <div
                key={word.id}
                className={`p-3 mb-2 rounded-md cursor-pointer transition-colors ${word.id === selectedWordId ? "bg-blue-900/50 border border-blue-700" : "bg-gray-900 border border-gray-800 hover:bg-gray-800"}`}
                onClick={() => onSelectWord(word.id)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-lg">{word.word}</span>
                      {word.saved && (
                        <Badge
                          variant="outline"
                          className="bg-blue-900/30 text-blue-400 border-blue-700 text-xs"
                        >
                          Saved
                        </Badge>
                      )}
                    </div>
                    <div className="text-gray-400 text-sm mt-1 line-clamp-2">
                      {word.definition}
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-transparent border-gray-700 text-gray-400"
                  >
                    {word.timestamp}
                  </Badge>
                </div>
                <div className="flex gap-2 mt-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className={`h-8 w-8 ${word.saved ? "bg-blue-900/30 text-blue-400 border-blue-700" : "bg-gray-800 text-gray-400 border-gray-700"}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            word.saved
                              ? onRemoveWord(word.id)
                              : onSaveWord(word.id);
                          }}
                        >
                          {word.saved ? (
                            <XIcon className="h-4 w-4" />
                          ) : (
                            <PlusIcon className="h-4 w-4" />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          {word.saved
                            ? "Remove from saved words"
                            : "Add to saved words"}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-gray-800 text-gray-400 border-gray-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectWord(word.id);
                          }}
                        >
                          <InfoIcon className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View details</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              No words found matching your search
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-gray-800">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">
            {filteredWords.length} words extracted
          </span>
          <Button
            variant="outline"
            size="sm"
            className="bg-blue-900/30 text-blue-400 border-blue-700 hover:bg-blue-800/40"
          >
            <BookmarkIcon className="h-4 w-4 mr-2" />
            View Saved Words
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ExtractedVocabulary;
