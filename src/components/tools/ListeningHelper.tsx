import React, { useState } from "react";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { Search, Youtube, History, BookmarkPlus } from "lucide-react";
import VideoPlayer from "./VideoPlayer";
import ExtractedVocabulary from "./ExtractedVocabulary";

interface Word {
  id: string;
  word: string;
  definition: string;
  timestamp: string;
  examples: string[];
  saved: boolean;
}

interface ListeningHelperProps {
  initialVideoId?: string;
  userLevel?: "B1" | "B2" | "C1" | "C2";
  savedWords?: Word[];
}

const ListeningHelper = ({
  initialVideoId = "",
  userLevel = "B2",
  savedWords = [],
}: ListeningHelperProps) => {
  const [videoUrl, setVideoUrl] = useState("");
  const [currentVideoId, setCurrentVideoId] = useState(initialVideoId);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedWordId, setSelectedWordId] = useState<string>("");
  const [extractedWords, setExtractedWords] = useState<Word[]>([
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
      word: "eloquent",
      definition: "Fluent or persuasive in speaking or writing.",
      timestamp: "04:15",
      examples: [
        "She gave an eloquent speech that moved the audience.",
        "His eloquent writing style makes complex topics easy to understand.",
      ],
      saved: false,
    },
    {
      id: "5",
      word: "meticulous",
      definition:
        "Showing great attention to detail; very careful and precise.",
      timestamp: "05:03",
      examples: [
        "He is meticulous in his research methodology.",
        "The artist's meticulous attention to detail is evident in her work.",
      ],
      saved: false,
    },
    {
      id: "6",
      word: "pragmatic",
      definition:
        "Dealing with things sensibly and realistically in a way that is based on practical considerations.",
      timestamp: "05:47",
      examples: [
        "We need a pragmatic approach to solving this problem.",
        "She's known for her pragmatic leadership style.",
      ],
      saved: false,
    },
  ]);

  const [recentVideos] = useState([
    { id: "jNQXAC9IVRw", title: "Me at the zoo", timestamp: "2 days ago" },
    {
      id: "dQw4w9WgXcQ",
      title: "Rick Astley - Never Gonna Give You Up",
      timestamp: "1 week ago",
    },
    {
      id: "9bZkp7q19f0",
      title: "PSY - GANGNAM STYLE",
      timestamp: "2 weeks ago",
    },
  ]);

  const extractVideoId = (url: string): string => {
    // Extract YouTube video ID from various URL formats
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const videoId = extractVideoId(videoUrl);
    if (videoId) {
      setIsLoading(true);
      // Simulate API call to extract vocabulary
      setTimeout(() => {
        setCurrentVideoId(videoId);
        // Generate a large number of words
        const generatedWords: Word[] = [];

        // Base words to start with
        const baseWords = [
          {
            word: "innovative",
            definition: "Featuring new methods; advanced and original.",
            examples: [
              "The company is known for its innovative approach to design.",
              "They developed an innovative solution to the problem.",
            ],
          },
          {
            word: "comprehensive",
            definition: "Complete and including everything that is necessary.",
            examples: [
              "The book provides a comprehensive guide to learning English.",
              "They conducted a comprehensive review of the system.",
            ],
          },
          {
            word: "substantial",
            definition: "Of considerable importance, size, or worth.",
            examples: [
              "The project required a substantial investment of time.",
              "There is a substantial difference between the two versions.",
            ],
          },
          {
            word: "intricate",
            definition: "Very complicated or detailed.",
            examples: [
              "The watch has an intricate mechanism.",
              "She explained the intricate details of the plan.",
            ],
          },
          {
            word: "versatile",
            definition:
              "Able to adapt or be adapted to many different functions or situations.",
            examples: [
              "She's a versatile actress who performs in both comedy and drama.",
              "This versatile tool can be used for many different tasks.",
            ],
          },
          {
            word: "meticulous",
            definition:
              "Showing great attention to detail; very careful and precise.",
            examples: [
              "He was meticulous in his research.",
              "The work requires meticulous attention to detail.",
            ],
          },
          {
            word: "eloquent",
            definition: "Fluent or persuasive in speaking or writing.",
            examples: [
              "She gave an eloquent speech that moved the audience.",
              "His eloquent writing style makes complex topics easy to understand.",
            ],
          },
          {
            word: "pragmatic",
            definition:
              "Dealing with things sensibly and realistically in a way that is based on practical considerations.",
            examples: [
              "We need a pragmatic approach to solving this problem.",
              "She's known for her pragmatic leadership style.",
            ],
          },
          {
            word: "ambiguous",
            definition:
              "Open to more than one interpretation; having a double meaning.",
            examples: [
              "The message was ambiguous and could be interpreted in different ways.",
              "She gave an ambiguous answer to the question.",
            ],
          },
          {
            word: "arbitrary",
            definition:
              "Based on random choice or personal whim, rather than any reason or system.",
            examples: [
              "The decision to choose these specific colors seemed arbitrary.",
              "The rules appeared to be arbitrary and inconsistent.",
            ],
          },
        ];

        // Additional words to create variations
        const additionalWords = [
          "profound",
          "eloquent",
          "meticulous",
          "diligent",
          "resilient",
          "tenacious",
          "articulate",
          "coherent",
          "concise",
          "lucid",
          "succinct",
          "verbose",
          "analytical",
          "critical",
          "logical",
          "rational",
          "reasonable",
          "methodical",
          "systematic",
          "thorough",
          "rigorous",
          "precise",
          "accurate",
          "exact",
          "ambiguous",
          "vague",
          "obscure",
          "cryptic",
          "enigmatic",
          "perplexing",
          "complex",
          "complicated",
          "intricate",
          "sophisticated",
          "nuanced",
          "subtle",
          "abstract",
          "theoretical",
          "conceptual",
          "hypothetical",
          "speculative",
          "conjectural",
          "empirical",
          "factual",
          "objective",
          "verifiable",
          "demonstrable",
          "provable",
          "controversial",
          "debatable",
          "disputable",
          "contentious",
          "polemical",
          "divisive",
          "conventional",
          "traditional",
          "orthodox",
          "established",
          "accepted",
          "standard",
        ];

        // Generate a large number of words by combining base words and creating variations
        for (let i = 0; i < 50; i++) {
          // Use base words for the first 10 entries
          if (i < baseWords.length) {
            generatedWords.push({
              id: `v${i + 1}`,
              word: baseWords[i].word,
              definition: baseWords[i].definition,
              timestamp: `${String(Math.floor(i / 2)).padStart(2, "0")}:${String((i % 2) * 30).padStart(2, "0")}`,
              examples: baseWords[i].examples,
              saved: i % 7 === 0, // Randomly mark some as saved
            });
          } else {
            // For additional words, create variations
            const wordIndex = i % additionalWords.length;
            const minutes = Math.floor(i / 2);
            const seconds = (i % 2) * 30;

            generatedWords.push({
              id: `v${i + 1}`,
              word: additionalWords[wordIndex],
              definition: `Advanced vocabulary word meaning ${additionalWords[wordIndex].toLowerCase()}.`,
              timestamp: `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`,
              examples: [
                `The ${additionalWords[wordIndex]} approach was highly effective.`,
                `Her ${additionalWords[wordIndex]} style impressed everyone in the room.`,
              ],
              saved: i % 11 === 0, // Randomly mark some as saved
            });
          }
        }

        setExtractedWords(generatedWords);
        setIsLoading(false);
      }, 1500);
    }
  };

  const handleSaveWord = (wordId: string) => {
    setExtractedWords((words) =>
      words.map((word) =>
        word.id === wordId ? { ...word, saved: true } : word,
      ),
    );
  };

  const handleRemoveWord = (wordId: string) => {
    setExtractedWords((words) =>
      words.map((word) =>
        word.id === wordId ? { ...word, saved: false } : word,
      ),
    );
  };

  const handleSelectWord = (wordId: string) => {
    setSelectedWordId(wordId);
  };

  const handleTimeUpdate = (currentTime: number) => {
    // This would be used to highlight words as they appear in the video
    console.log("Current time:", currentTime);
  };

  const handleVideoSelect = (videoId: string) => {
    setCurrentVideoId(videoId);
    setVideoUrl(`https://www.youtube.com/watch?v=${videoId}`);

    // Reset extracted words when selecting from history
    setIsLoading(true);
    setTimeout(() => {
      // Generate a large number of words based on the video ID
      const generatedWords: Word[] = [];

      // Different word sets based on video ID
      let baseWords: Array<{
        word: string;
        definition: string;
        examples: string[];
      }> = [];

      if (videoId === "dQw4w9WgXcQ") {
        // Rick Astley - Never Gonna Give You Up
        baseWords = [
          {
            word: "perseverance",
            definition:
              "Persistence in doing something despite difficulty or delay in achieving success.",
            examples: [
              "His perseverance was rewarded when he finally succeeded.",
              "Through perseverance, she overcame all obstacles.",
            ],
          },
          {
            word: "commitment",
            definition:
              "The state or quality of being dedicated to a cause, activity, etc.",
            examples: [
              "He showed his commitment by never giving up.",
              "Their commitment to quality is evident in their work.",
            ],
          },
          {
            word: "resilience",
            definition:
              "The capacity to recover quickly from difficulties; toughness.",
            examples: [
              "Her resilience helped her bounce back from failure.",
              "The team showed great resilience in the face of adversity.",
            ],
          },
          {
            word: "determination",
            definition: "Firmness of purpose; resoluteness.",
            examples: [
              "She pursued her goals with determination.",
              "His determination to succeed was inspiring.",
            ],
          },
          {
            word: "devotion",
            definition:
              "Love, loyalty, or enthusiasm for a person, activity, or cause.",
            examples: [
              "Her devotion to her family was admirable.",
              "The fans showed their devotion by waiting hours in the rain.",
            ],
          },
          {
            word: "steadfast",
            definition: "Resolutely or dutifully firm and unwavering.",
            examples: [
              "He remained steadfast in his beliefs despite criticism.",
              "Their steadfast support never wavered during difficult times.",
            ],
          },
          {
            word: "loyalty",
            definition:
              "The quality of being loyal; a strong feeling of support or allegiance.",
            examples: [
              "His loyalty to his friends was unquestionable.",
              "The company rewards customer loyalty with special discounts.",
            ],
          },
          {
            word: "endurance",
            definition:
              "The ability to endure an unpleasant or difficult process or situation without giving way.",
            examples: [
              "The marathon tested her endurance to the limit.",
              "The team showed remarkable endurance throughout the tournament.",
            ],
          },
          {
            word: "unwavering",
            definition: "Not wavering; steady or resolute.",
            examples: [
              "She showed unwavering support for her colleague.",
              "His unwavering determination helped him overcome all obstacles.",
            ],
          },
          {
            word: "fidelity",
            definition:
              "Faithfulness to a person, cause, or belief, demonstrated by continuing loyalty and support.",
            examples: [
              "The song is about fidelity in relationships.",
              "His fidelity to the principles of democracy never faltered.",
            ],
          },
        ];
      } else if (videoId === "9bZkp7q19f0") {
        // PSY - GANGNAM STYLE
        baseWords = [
          {
            word: "phenomenon",
            definition:
              "A fact or situation that is observed to exist or happen, especially one whose cause is in question.",
            examples: [
              "The video became a global phenomenon overnight.",
              "Scientists studied the phenomenon for years.",
            ],
          },
          {
            word: "influential",
            definition: "Having great influence on someone or something.",
            examples: [
              "He was one of the most influential artists of his generation.",
              "The influential paper changed how people thought about the topic.",
            ],
          },
          {
            word: "iconic",
            definition:
              "Widely recognized and well-established; relating to or of the nature of an icon.",
            examples: [
              "The song has become iconic in pop culture.",
              "The iconic dance moves were imitated worldwide.",
            ],
          },
          {
            word: "viral",
            definition:
              "Relating to or involving an image, video, piece of information, etc., that is circulated rapidly and widely from one internet user to another.",
            examples: [
              "The video went viral within days of being uploaded.",
              "Their marketing campaign was designed to go viral.",
            ],
          },
          {
            word: "catchy",
            definition:
              "(Of a tune or phrase) instantly appealing and memorable.",
            examples: [
              "The song has a catchy chorus that everyone remembers.",
              "Advertisers try to create catchy slogans for their products.",
            ],
          },
          {
            word: "trendsetting",
            definition: "Setting or influencing a trend.",
            examples: [
              "The trendsetting video influenced dance styles worldwide.",
              "She's known as a trendsetting fashion designer.",
            ],
          },
          {
            word: "sensation",
            definition: "A widespread reaction of interest and excitement.",
            examples: [
              "The song caused a sensation when it was first released.",
              "The new dance became an overnight sensation.",
            ],
          },
          {
            word: "unprecedented",
            definition: "Never done or known before.",
            examples: [
              "The video achieved unprecedented success on YouTube.",
              "The song's popularity was unprecedented in the history of K-pop.",
            ],
          },
          {
            word: "mainstream",
            definition:
              "The ideas, attitudes, or activities that are shared by most people and regarded as normal or conventional.",
            examples: [
              "K-pop has now entered the mainstream of Western music.",
              "The song helped bring Korean culture into the mainstream.",
            ],
          },
          {
            word: "cultural",
            definition:
              "Relating to the ideas, customs, and social behavior of a society.",
            examples: [
              "The song had a significant cultural impact worldwide.",
              "The video crossed cultural boundaries with its universal appeal.",
            ],
          },
        ];
      } else {
        // Default or other videos
        baseWords = [
          {
            word: "pioneering",
            definition:
              "Introducing new and better methods or ideas for the first time.",
            examples: [
              "The pioneering work changed the entire field.",
              "She was a pioneering researcher in artificial intelligence.",
            ],
          },
          {
            word: "fundamental",
            definition:
              "Forming a necessary base or core; of central importance.",
            examples: [
              "Understanding grammar is fundamental to learning a language.",
              "They disagreed on the fundamental principles.",
            ],
          },
          {
            word: "perspective",
            definition:
              "A particular attitude toward or way of regarding something; a point of view.",
            examples: [
              "The book offers a new perspective on the historical events.",
              "Try to see it from my perspective.",
            ],
          },
          {
            word: "innovative",
            definition: "Featuring new methods; advanced and original.",
            examples: [
              "The company is known for its innovative approach to design.",
              "They developed an innovative solution to the problem.",
            ],
          },
          {
            word: "significant",
            definition:
              "Sufficiently great or important to be worthy of attention; noteworthy.",
            examples: [
              "The discovery was significant for the entire scientific community.",
              "There has been a significant improvement in her condition.",
            ],
          },
          {
            word: "authentic",
            definition: "Of undisputed origin and not a copy; genuine.",
            examples: [
              "The museum contains authentic artifacts from ancient Egypt.",
              "She has an authentic approach to teaching that students appreciate.",
            ],
          },
          {
            word: "comprehensive",
            definition: "Complete and including everything that is necessary.",
            examples: [
              "The book provides a comprehensive guide to learning English.",
              "They conducted a comprehensive review of the system.",
            ],
          },
          {
            word: "substantial",
            definition: "Of considerable importance, size, or worth.",
            examples: [
              "The project required a substantial investment of time.",
              "There is a substantial difference between the two versions.",
            ],
          },
          {
            word: "intricate",
            definition: "Very complicated or detailed.",
            examples: [
              "The watch has an intricate mechanism.",
              "She explained the intricate details of the plan.",
            ],
          },
          {
            word: "versatile",
            definition:
              "Able to adapt or be adapted to many different functions or situations.",
            examples: [
              "She's a versatile actress who performs in both comedy and drama.",
              "This versatile tool can be used for many different tasks.",
            ],
          },
        ];
      }

      // Additional words to create variations
      const additionalWords = [
        "profound",
        "eloquent",
        "meticulous",
        "diligent",
        "resilient",
        "tenacious",
        "articulate",
        "coherent",
        "concise",
        "lucid",
        "succinct",
        "verbose",
        "analytical",
        "critical",
        "logical",
        "rational",
        "reasonable",
        "methodical",
        "systematic",
        "thorough",
        "rigorous",
        "precise",
        "accurate",
        "exact",
        "ambiguous",
        "vague",
        "obscure",
        "cryptic",
        "enigmatic",
        "perplexing",
        "complex",
        "complicated",
        "intricate",
        "sophisticated",
        "nuanced",
        "subtle",
        "abstract",
        "theoretical",
        "conceptual",
        "hypothetical",
        "speculative",
        "conjectural",
        "empirical",
        "factual",
        "objective",
        "verifiable",
        "demonstrable",
        "provable",
        "controversial",
        "debatable",
        "disputable",
        "contentious",
        "polemical",
        "divisive",
        "conventional",
        "traditional",
        "orthodox",
        "established",
        "accepted",
        "standard",
      ];

      // Generate a large number of words by combining base words and creating variations
      for (let i = 0; i < 50; i++) {
        // Use base words for the first entries
        if (i < baseWords.length) {
          generatedWords.push({
            id: `${videoId.substring(0, 1)}${i + 1}`,
            word: baseWords[i].word,
            definition: baseWords[i].definition,
            timestamp: `${String(Math.floor(i / 2)).padStart(2, "0")}:${String((i % 2) * 30).padStart(2, "0")}`,
            examples: baseWords[i].examples,
            saved: i % 7 === 0, // Randomly mark some as saved
          });
        } else {
          // For additional words, create variations
          const wordIndex = i % additionalWords.length;
          const minutes = Math.floor(i / 2);
          const seconds = (i % 2) * 30;

          generatedWords.push({
            id: `${videoId.substring(0, 1)}${i + 1}`,
            word: additionalWords[wordIndex],
            definition: `Advanced vocabulary word meaning ${additionalWords[wordIndex].toLowerCase()}.`,
            timestamp: `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`,
            examples: [
              `The ${additionalWords[wordIndex]} approach was highly effective.`,
              `Her ${additionalWords[wordIndex]} style impressed everyone in the room.`,
            ],
            saved: i % 11 === 0, // Randomly mark some as saved
          });
        }
      }

      setExtractedWords(generatedWords);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col w-full h-full bg-gray-950 text-white p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Listening Helper
        </h1>
        <p className="text-gray-400">
          Improve your listening skills with AI-extracted vocabulary from
          YouTube videos
        </p>
      </div>

      <Tabs defaultValue="search" className="w-full">
        <TabsList className="bg-gray-900 border border-gray-800">
          <TabsTrigger
            value="search"
            className="data-[state=active]:bg-blue-900/50"
          >
            <Search className="h-4 w-4 mr-2" />
            Search Video
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="data-[state=active]:bg-blue-900/50"
          >
            <History className="h-4 w-4 mr-2" />
            Recent Videos
          </TabsTrigger>
          <TabsTrigger
            value="saved"
            className="data-[state=active]:bg-blue-900/50"
          >
            <BookmarkPlus className="h-4 w-4 mr-2" />
            Saved Words
          </TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="mt-4">
          <Card className="bg-gray-900 border-gray-800 p-4">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <div>
                <label
                  htmlFor="video-url"
                  className="block text-sm font-medium mb-1"
                >
                  YouTube Video URL
                </label>
                <div className="flex">
                  <Input
                    id="video-url"
                    type="text"
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="flex-grow bg-gray-800 border-gray-700 text-white"
                  />
                  <Button
                    type="submit"
                    className="ml-2 bg-blue-700 hover:bg-blue-600"
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Extract Vocabulary"}
                  </Button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="proficiency-level"
                  className="block text-sm font-medium mb-1"
                >
                  Your Proficiency Level
                </label>
                <div className="flex space-x-2">
                  {["B1", "B2", "C1", "C2"].map((level) => (
                    <Badge
                      key={level}
                      variant={userLevel === level ? "default" : "outline"}
                      className={`cursor-pointer ${userLevel === level ? "bg-blue-700" : "bg-gray-800 hover:bg-gray-700"}`}
                    >
                      {level}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Words above your level will be extracted from the video
                </p>
              </div>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="mt-4">
          <Card className="bg-gray-900 border-gray-800 p-4">
            <h3 className="text-lg font-medium mb-3">
              Recently Watched Videos
            </h3>
            <ScrollArea className="h-[200px]">
              <div className="space-y-2">
                {recentVideos.map((video) => (
                  <div
                    key={video.id}
                    className="flex items-center p-2 rounded-md hover:bg-gray-800 cursor-pointer"
                    onClick={() => handleVideoSelect(video.id)}
                  >
                    <div className="h-12 w-20 bg-gray-800 rounded overflow-hidden mr-3">
                      <img
                        src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium line-clamp-1">{video.title}</p>
                      <p className="text-xs text-gray-400">{video.timestamp}</p>
                    </div>
                    <Youtube className="h-5 w-5 text-red-500 ml-2" />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </TabsContent>

        <TabsContent value="saved" className="mt-4">
          <Card className="bg-gray-900 border-gray-800 p-4">
            <h3 className="text-lg font-medium mb-3">Your Saved Words</h3>
            <ScrollArea className="h-[200px]">
              {savedWords.length > 0 ? (
                <div className="space-y-2">
                  {savedWords.map((word) => (
                    <div key={word.id} className="p-3 bg-gray-800 rounded-md">
                      <div className="flex justify-between">
                        <span className="font-medium">{word.word}</span>
                        <Badge
                          variant="outline"
                          className="bg-blue-900/30 text-blue-400 border-blue-700"
                        >
                          Saved
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">
                        {word.definition}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <BookmarkPlus className="h-10 w-10 mx-auto mb-2 opacity-50" />
                  <p>No saved words yet</p>
                  <p className="text-sm">Words you save will appear here</p>
                </div>
              )}
            </ScrollArea>
          </Card>
        </TabsContent>
      </Tabs>

      {currentVideoId && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
          <div className="lg:col-span-2">
            <VideoPlayer
              videoId={currentVideoId}
              onTimeUpdate={handleTimeUpdate}
            />
          </div>
          <div className="lg:col-span-1">
            <ExtractedVocabulary
              words={extractedWords}
              onSaveWord={handleSaveWord}
              onRemoveWord={handleRemoveWord}
              onSelectWord={handleSelectWord}
              selectedWordId={selectedWordId}
            />
          </div>
        </div>
      )}

      {!currentVideoId && (
        <div className="flex flex-col items-center justify-center py-16 text-gray-500">
          <Youtube className="h-16 w-16 mb-4 opacity-30" />
          <h3 className="text-xl font-medium mb-2">No Video Selected</h3>
          <p className="text-center max-w-md">
            Enter a YouTube URL above or select a recent video to start learning
            with AI-extracted vocabulary
          </p>
        </div>
      )}
    </div>
  );
};

export default ListeningHelper;
