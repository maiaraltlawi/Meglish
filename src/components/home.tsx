import React, { useState } from "react";
import MotivationalQuote from "./dashboard/MotivationalQuote";
import LearningToolsGrid from "./dashboard/LearningToolsGrid";
import ListeningHelper from "./tools/ListeningHelper";
import ReadingAssistant from "./tools/ReadingAssistant";
import WritingAssistant from "./tools/WritingAssistant";

// Create a simple VocabularyAssistant component since we can't import it
const VocabularyAssistant = () => {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Mock data for vocabulary words
  const dailyWords = [
    { id: 1, word: "Ameliorate", level: "C1" },
    { id: 2, word: "Benevolent", level: "C1" },
    { id: 3, word: "Cacophony", level: "C2" },
    { id: 4, word: "Diligent", level: "B2" },
    { id: 5, word: "Ephemeral", level: "C1" },
    { id: 6, word: "Fastidious", level: "C2" },
    { id: 7, word: "Garrulous", level: "C2" },
    { id: 8, word: "Harbinger", level: "C2" },
    { id: 9, word: "Insidious", level: "C1" },
    { id: 10, word: "Juxtapose", level: "C1" },
    { id: 11, word: "Kinetic", level: "B2" },
    { id: 12, word: "Lethargic", level: "B2" },
    { id: 13, word: "Mellifluous", level: "C2" },
    { id: 14, word: "Nefarious", level: "C2" },
    { id: 15, word: "Obfuscate", level: "C2" },
    { id: 16, word: "Pernicious", level: "C1" },
    { id: 17, word: "Quintessential", level: "C1" },
    { id: 18, word: "Resilient", level: "B2" },
    { id: 19, word: "Sycophant", level: "C2" },
    { id: 20, word: "Taciturn", level: "C1" },
  ];

  // Sort words by level
  const sortedWords = [...dailyWords].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.level.localeCompare(b.level);
    } else {
      return b.level.localeCompare(a.level);
    }
  });

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Word details for the selected word
  const wordDetails = {
    word: selectedWord || "Ameliorate",
    phonetic: selectedWord ? "/əˈmiːlɪəreɪt/" : "/əˈmiːlɪəreɪt/",
    partOfSpeech: "verb",
    definition: selectedWord
      ? "To make something better or more tolerable"
      : "To make something better or more tolerable",
    synonyms: ["improve", "enhance", "upgrade", "better", "refine"],
    examples: [
      "The medicine ameliorated his symptoms.",
      "They hoped the new policy would ameliorate the situation.",
      "Various measures were taken to ameliorate the effects of poverty.",
    ],
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto">
      <h2 className="text-3xl font-bold text-blue-300 mb-6">
        Vocabulary Assistant
      </h2>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Word List */}
        <div className="w-full md:w-1/3 bg-slate-900 rounded-xl p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-blue-200">Daily Words</h3>
            <button
              onClick={toggleSortOrder}
              className="px-3 py-1 bg-blue-700 hover:bg-blue-600 rounded text-white text-sm flex items-center gap-1 transition-colors"
            >
              Sort by Level {sortOrder === "asc" ? "↑" : "↓"}
            </button>
          </div>
          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
            {sortedWords.map((wordItem) => (
              <div
                key={wordItem.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedWord === wordItem.word
                    ? "bg-blue-800 text-white"
                    : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                }`}
                onClick={() => setSelectedWord(wordItem.word)}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{wordItem.word}</span>
                  <span className="text-xs px-2 py-1 rounded bg-slate-700 text-blue-300">
                    {wordItem.level}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Word Details */}
        <div className="w-full md:w-2/3 bg-slate-900 rounded-xl p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold text-white">
                {wordDetails.word}
              </h2>
              <p className="text-slate-400">{wordDetails.phonetic}</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white transition-colors">
              Save Word
            </button>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-blue-300 mb-2">
              Definition
            </h3>
            <p className="text-slate-300">
              <span className="text-blue-200 italic">
                {wordDetails.partOfSpeech}
              </span>{" "}
              - {wordDetails.definition}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-blue-300 mb-2">
              Synonyms
            </h3>
            <div className="flex flex-wrap gap-2">
              {wordDetails.synonyms.map((synonym, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-slate-800 rounded-full text-slate-300"
                >
                  {synonym}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-blue-300 mb-2">
              Examples
            </h3>
            <ul className="space-y-2 text-slate-300">
              {wordDetails.examples.map((example, index) => (
                <li key={index} className="pl-4 border-l-2 border-blue-700">
                  {example}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const handleToolSelect = (toolName: string) => {
    setSelectedTool(toolName);
    // Scroll to the tool section
    setTimeout(() => {
      const toolElement = document.getElementById(toolName);
      if (toolElement) {
        toolElement.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleBackToDashboard = () => {
    setSelectedTool(null);
    // Scroll back to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="w-full h-20 bg-slate-900 border-b border-blue-900 flex items-center justify-between px-6 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
            <span className="text-xl font-bold">E</span>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
            English Learning Suite
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center cursor-pointer hover:bg-slate-700 transition-colors">
            <span className="text-xl">👤</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4 space-y-8">
        {/* Motivational Quote */}
        <section className="mb-12">
          <MotivationalQuote />
        </section>

        {/* Learning Tools Grid */}
        <section className="mb-16">
          <LearningToolsGrid onToolSelect={handleToolSelect} />
        </section>

        {/* Tool Sections */}
        {selectedTool && (
          <section className="mt-16 pt-8 border-t border-blue-900">
            <button
              onClick={handleBackToDashboard}
              className="mb-8 px-4 py-2 bg-blue-800 hover:bg-blue-700 rounded-md flex items-center gap-2 transition-colors"
            >
              <span>↩</span> Back to Dashboard
            </button>

            {selectedTool === "vocabulary" && (
              <div id="vocabulary">
                <VocabularyAssistant />
              </div>
            )}

            {selectedTool === "listening" && (
              <div id="listening">
                <ListeningHelper />
              </div>
            )}

            {selectedTool === "reading" && (
              <div id="reading">
                <ReadingAssistant />
              </div>
            )}

            {selectedTool === "writing" && (
              <div id="writing">
                <WritingAssistant />
              </div>
            )}

            {selectedTool === "achievements" && (
              <div
                id="achievements"
                className="w-full max-w-[1200px] mx-auto bg-slate-900 p-8 rounded-xl"
              >
                <h2 className="text-3xl font-bold text-blue-300 mb-6">
                  Achievements Tracker
                </h2>
                <p className="text-slate-300 mb-8">
                  Track your progress and celebrate your learning milestones.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {[
                    "Vocabulary",
                    "Listening",
                    "Reading",
                    "Writing",
                    "Speaking",
                  ].map((skill) => (
                    <div key={skill} className="bg-slate-800 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-blue-200 mb-2">
                        {skill}
                      </h3>
                      <div className="h-2 bg-slate-700 rounded-full mb-2">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{
                            width: `${Math.floor(Math.random() * 100)}%`,
                          }}
                        ></div>
                      </div>
                      <p className="text-sm text-slate-400">
                        Daily streak: {Math.floor(Math.random() * 30)} days
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-12">
                  <h3 className="text-xl font-bold text-blue-300 mb-4">
                    Weekly Progress
                  </h3>
                  <div className="bg-slate-800 p-6 rounded-lg">
                    <div className="flex justify-between mb-2">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                        (day) => (
                          <div key={day} className="text-center">
                            <div className="text-sm text-slate-400">{day}</div>
                            <div className="w-8 h-20 bg-slate-700 mt-2 rounded relative">
                              <div
                                className="absolute bottom-0 w-full bg-blue-500 rounded-b"
                                style={{
                                  height: `${Math.floor(Math.random() * 100)}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-blue-900 py-6 px-4 mt-16">
        <div className="container mx-auto text-center text-slate-400">
          <p>© 2023 English Learning Suite. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Powered by AI to enhance your language learning journey.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
