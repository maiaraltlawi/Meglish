import React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Check, X, AlertCircle, Lightbulb, Sparkles } from "lucide-react";

interface SuggestionPanelProps {
  grammarSuggestions?: GrammarSuggestion[];
  styleSuggestions?: StyleSuggestion[];
  onAcceptGrammar?: (id: string) => void;
  onRejectGrammar?: (id: string) => void;
  onAcceptStyle?: (id: string) => void;
  onRejectStyle?: (id: string) => void;
}

interface GrammarSuggestion {
  id: string;
  original: string;
  suggestion: string;
  type: "spelling" | "grammar" | "punctuation";
  explanation: string;
}

interface StyleSuggestion {
  id: string;
  original: string;
  suggestion: string;
  type: "clarity" | "conciseness" | "formality" | "vocabulary";
  explanation: string;
}

const SuggestionPanel = ({
  grammarSuggestions = [
    {
      id: "g1",
      original: "I have went to the store",
      suggestion: "I have gone to the store",
      type: "grammar",
      explanation: "The past participle of 'go' is 'gone', not 'went'.",
    },
    {
      id: "g2",
      original: "She dont like coffee",
      suggestion: "She doesn't like coffee",
      type: "grammar",
      explanation:
        "Third person singular requires 'doesn't' instead of 'dont'.",
    },
    {
      id: "g3",
      original: "Their going to the park",
      suggestion: "They're going to the park",
      type: "spelling",
      explanation:
        "'Their' is possessive. 'They're' is the contraction of 'they are'.",
    },
  ],
  styleSuggestions = [
    {
      id: "s1",
      original: "The meeting was very good",
      suggestion: "The meeting was productive",
      type: "vocabulary",
      explanation:
        "'Productive' is more specific and descriptive than 'very good'.",
    },
    {
      id: "s2",
      original: "In my opinion, I think that",
      suggestion: "I think that",
      type: "conciseness",
      explanation: "'In my opinion' and 'I think' are redundant together.",
    },
    {
      id: "s3",
      original: "Due to the fact that",
      suggestion: "Because",
      type: "conciseness",
      explanation: "'Because' is more concise than 'due to the fact that'.",
    },
  ],
  onAcceptGrammar = () => {},
  onRejectGrammar = () => {},
  onAcceptStyle = () => {},
  onRejectStyle = () => {},
}: SuggestionPanelProps) => {
  return (
    <div className="w-full h-full flex flex-col bg-gray-900 text-white rounded-lg overflow-hidden border border-gray-700">
      <div className="p-4 border-b border-gray-700 bg-gray-800">
        <h2 className="text-xl font-semibold flex items-center">
          <Sparkles className="mr-2 h-5 w-5 text-blue-400" />
          Suggestions
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          AI-powered recommendations to improve your writing
        </p>
      </div>

      <Tabs defaultValue="grammar" className="flex-1 flex flex-col">
        <div className="px-4 pt-4">
          <TabsList className="w-full bg-gray-800">
            <TabsTrigger value="grammar" className="flex-1">
              Grammar
              <Badge variant="secondary" className="ml-2 bg-blue-600">
                {grammarSuggestions.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="style" className="flex-1">
              Style
              <Badge variant="secondary" className="ml-2 bg-purple-600">
                {styleSuggestions.length}
              </Badge>
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <TabsContent value="grammar" className="h-full mt-0">
            {grammarSuggestions.length > 0 ? (
              <div className="space-y-4">
                {grammarSuggestions.map((suggestion) => (
                  <SuggestionCard
                    key={suggestion.id}
                    suggestion={suggestion}
                    type="grammar"
                    onAccept={() => onAcceptGrammar(suggestion.id)}
                    onReject={() => onRejectGrammar(suggestion.id)}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={<Check className="h-12 w-12 text-green-500" />}
                title="No grammar issues found"
                description="Your text appears to be grammatically correct."
              />
            )}
          </TabsContent>

          <TabsContent value="style" className="h-full mt-0">
            {styleSuggestions.length > 0 ? (
              <div className="space-y-4">
                {styleSuggestions.map((suggestion) => (
                  <SuggestionCard
                    key={suggestion.id}
                    suggestion={suggestion}
                    type="style"
                    onAccept={() => onAcceptStyle(suggestion.id)}
                    onReject={() => onRejectStyle(suggestion.id)}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={<Lightbulb className="h-12 w-12 text-yellow-500" />}
                title="No style suggestions"
                description="Your writing style looks good."
              />
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

interface SuggestionCardProps {
  suggestion: GrammarSuggestion | StyleSuggestion;
  type: "grammar" | "style";
  onAccept: () => void;
  onReject: () => void;
}

const SuggestionCard = ({
  suggestion,
  type,
  onAccept,
  onReject,
}: SuggestionCardProps) => {
  const getBadgeColor = () => {
    if (type === "grammar") {
      switch (suggestion.type) {
        case "spelling":
          return "bg-red-600";
        case "grammar":
          return "bg-blue-600";
        case "punctuation":
          return "bg-yellow-600";
        default:
          return "bg-blue-600";
      }
    } else {
      switch (suggestion.type) {
        case "clarity":
          return "bg-green-600";
        case "conciseness":
          return "bg-purple-600";
        case "formality":
          return "bg-indigo-600";
        case "vocabulary":
          return "bg-pink-600";
        default:
          return "bg-purple-600";
      }
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <div className="flex justify-between items-start mb-2">
        <Badge className={`${getBadgeColor()} capitalize`}>
          {suggestion.type}
        </Badge>
        <div className="flex space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-green-500 hover:text-green-400 hover:bg-gray-700"
                  onClick={onAccept}
                >
                  <Check className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Accept suggestion</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-red-500 hover:text-red-400 hover:bg-gray-700"
                  onClick={onReject}
                >
                  <X className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Reject suggestion</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="mt-3">
        <div className="text-sm text-gray-400 mb-1">Original:</div>
        <div className="bg-gray-900 p-2 rounded text-gray-300 line-through">
          {suggestion.original}
        </div>
      </div>

      <div className="mt-3">
        <div className="text-sm text-gray-400 mb-1">Suggestion:</div>
        <div className="bg-gray-900 p-2 rounded text-blue-300">
          {suggestion.suggestion}
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-700">
        <div className="flex items-start">
          <AlertCircle className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
          <div className="text-sm text-gray-300">{suggestion.explanation}</div>
        </div>
      </div>
    </div>
  );
};

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const EmptyState = ({ icon, title, description }: EmptyStateProps) => {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-6">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-medium text-gray-200 mb-2">{title}</h3>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
};

export default SuggestionPanel;
