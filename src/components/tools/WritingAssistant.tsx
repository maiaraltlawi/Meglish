import React, { useState } from "react";
import WritingEditor from "./WritingEditor";
import SuggestionPanel from "./SuggestionPanel";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Sparkles,
  BookOpen,
  CheckCircle2,
  PenTool,
  Lightbulb,
} from "lucide-react";

interface WritingAssistantProps {
  initialContent?: string;
  proficiencyLevel?: "B1" | "B2" | "C1" | "C2";
}

const WritingAssistant = ({
  initialContent = "",
  proficiencyLevel = "B2",
}: WritingAssistantProps) => {
  const [content, setContent] = useState(initialContent);
  const [level, setLevel] = useState(proficiencyLevel);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState("write");
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  // Mock writing topics based on proficiency level
  const writingTopics = {
    B1: [
      "Describe your favorite holiday destination",
      "Write about a memorable day in your life",
      "What are the advantages and disadvantages of social media?",
    ],
    B2: [
      "Should education be free for everyone? Why or why not?",
      "How has technology changed the way we communicate?",
      "Discuss the impact of climate change on future generations",
    ],
    C1: [
      "Analyze the role of artificial intelligence in modern healthcare",
      "Evaluate the effectiveness of international aid in developing countries",
      "To what extent should governments regulate free speech online?",
    ],
    C2: [
      "Critically assess the philosophical implications of consciousness in artificial intelligence",
      "Examine the interplay between globalization, cultural identity, and linguistic diversity",
      "Evaluate the ethical considerations in genetic engineering and its potential societal impact",
    ],
  };

  // Mock grammar suggestions
  const grammarSuggestions = [
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
  ];

  // Mock style suggestions
  const styleSuggestions = [
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
  ];

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    // Reset analysis state when content changes
    if (hasAnalyzed) setHasAnalyzed(false);
  };

  const handleLevelChange = (newLevel: "B1" | "B2" | "C1" | "C2") => {
    setLevel(newLevel);
  };

  const handleAnalyzeText = () => {
    if (!content.trim()) return;

    setIsAnalyzing(true);

    // Simulate API call delay
    setTimeout(() => {
      setIsAnalyzing(false);
      setHasAnalyzed(true);
      setActiveTab("suggestions");
    }, 1500);
  };

  const handleAcceptSuggestion = (id: string) => {
    // In a real app, this would modify the content with the accepted suggestion
    console.log(`Accepted suggestion: ${id}`);
  };

  const handleRejectSuggestion = (id: string) => {
    // In a real app, this would remove the suggestion from the list
    console.log(`Rejected suggestion: ${id}`);
  };

  return (
    <div className="w-full h-full min-h-[800px] bg-slate-950 p-6 rounded-xl">
      <div className="flex flex-col h-full">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white flex items-center">
            <PenTool className="mr-2 h-6 w-6 text-blue-400" />
            Writing Assistant
          </h1>
          <p className="text-slate-400 mt-1">
            Improve your writing skills with AI-powered grammar and style
            suggestions
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 flex-grow">
          {/* Left Panel - Writing Area */}
          <div className="flex-1">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="h-full flex flex-col"
            >
              <div className="flex justify-between items-center mb-4">
                <TabsList className="bg-slate-800">
                  <TabsTrigger
                    value="write"
                    className="data-[state=active]:bg-blue-600"
                  >
                    Write
                  </TabsTrigger>
                  <TabsTrigger
                    value="suggestions"
                    className="data-[state=active]:bg-blue-600"
                  >
                    Suggestions
                  </TabsTrigger>
                  <TabsTrigger
                    value="topics"
                    className="data-[state=active]:bg-blue-600"
                  >
                    Topics
                  </TabsTrigger>
                </TabsList>

                <div className="flex items-center">
                  <span className="text-sm text-slate-400 mr-2">Level:</span>
                  <Select value={level} onValueChange={handleLevelChange}>
                    <SelectTrigger className="w-[80px] bg-slate-800 border-slate-700">
                      <SelectValue placeholder="B2" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="B1">B1</SelectItem>
                      <SelectItem value="B2">B2</SelectItem>
                      <SelectItem value="C1">C1</SelectItem>
                      <SelectItem value="C2">C2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex-grow">
                <TabsContent value="write" className="h-full mt-0">
                  <div className="flex flex-col h-full">
                    <WritingEditor
                      initialContent={content}
                      onContentChange={handleContentChange}
                    />

                    <div className="mt-4 flex justify-end">
                      <Button
                        onClick={handleAnalyzeText}
                        disabled={isAnalyzing || !content.trim()}
                        className="bg-blue-600 hover:bg-blue-700 flex items-center"
                      >
                        {isAnalyzing ? (
                          <>
                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Sparkles className="mr-2 h-4 w-4" />
                            Analyze Text
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="suggestions" className="h-full mt-0">
                  {hasAnalyzed ? (
                    <SuggestionPanel
                      grammarSuggestions={grammarSuggestions}
                      styleSuggestions={styleSuggestions}
                      onAcceptGrammar={handleAcceptSuggestion}
                      onRejectGrammar={handleRejectSuggestion}
                      onAcceptStyle={handleAcceptSuggestion}
                      onRejectStyle={handleRejectSuggestion}
                    />
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6 bg-slate-900 rounded-lg border border-slate-800">
                      <Lightbulb className="h-12 w-12 text-yellow-500 mb-4" />
                      <h3 className="text-lg font-medium text-slate-200 mb-2">
                        No Analysis Yet
                      </h3>
                      <p className="text-sm text-slate-400 mb-4">
                        Write some text and click "Analyze Text" to get
                        suggestions
                      </p>
                      <Button
                        onClick={() => setActiveTab("write")}
                        variant="outline"
                        className="bg-slate-800 border-slate-700 hover:bg-slate-700"
                      >
                        Go to Editor
                      </Button>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="topics" className="h-full mt-0">
                  <div className="grid grid-cols-1 gap-4 h-full overflow-y-auto bg-slate-900 p-4 rounded-lg border border-slate-800">
                    <div className="mb-4">
                      <h3 className="text-lg font-medium text-slate-200 flex items-center">
                        <BookOpen className="mr-2 h-5 w-5 text-blue-400" />
                        Writing Topics for {level} Level
                      </h3>
                      <p className="text-sm text-slate-400 mt-1">
                        Select a topic to get started with your writing practice
                      </p>
                    </div>

                    {writingTopics[level].map((topic, index) => (
                      <Card
                        key={index}
                        className="bg-slate-800 border-slate-700 hover:border-blue-500 cursor-pointer transition-all"
                      >
                        <CardHeader className="pb-2">
                          <CardTitle className="text-md font-medium text-slate-200">
                            Topic {index + 1}
                          </CardTitle>
                          <CardDescription className="text-slate-400 text-xs">
                            {level} Level • Essay
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-slate-300">{topic}</p>
                          <div className="flex justify-end mt-4">
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-slate-700 border-slate-600 hover:bg-slate-600 text-xs"
                              onClick={() => {
                                setContent(`Topic: ${topic}\n\n`);
                                setActiveTab("write");
                              }}
                            >
                              <CheckCircle2 className="mr-1 h-3 w-3" />
                              Use This Topic
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritingAssistant;
