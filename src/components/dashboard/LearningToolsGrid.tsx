import React from "react";
import ToolCard from "./ToolCard";
import { Book, Headphones, FileText, PenTool, Sparkles } from "lucide-react";

interface LearningToolsGridProps {
  onToolSelect?: (toolName: string) => void;
  tools?: Array<{
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    buttonText?: string;
  }>;
}

const LearningToolsGrid = ({
  onToolSelect = (toolName: string) =>
    console.log(`Selected tool: ${toolName}`),
  tools = [
    {
      id: "vocabulary",
      title: "Vocabulary Assistant",
      description:
        "Build your vocabulary with 20 daily words from Oxford 3000/5000 lists. View definitions, synonyms, and examples.",
      icon: <Book className="text-blue-400" size={24} />,
      buttonText: "Explore Words",
    },
    {
      id: "listening",
      title: "Listening Helper",
      description:
        "Improve your listening skills with YouTube videos. Extract difficult vocabulary based on your proficiency level.",
      icon: <Headphones className="text-blue-400" size={24} />,
      buttonText: "Watch & Learn",
    },
    {
      id: "reading",
      title: "Reading Assistant",
      description:
        "Enhance your reading comprehension by analyzing texts. Highlight and define complex words as you read.",
      icon: <FileText className="text-blue-400" size={24} />,
      buttonText: "Start Reading",
    },
    {
      id: "writing",
      title: "Writing Assistant",
      description:
        "Improve your writing with AI-powered grammar correction and style improvement suggestions.",
      icon: <PenTool className="text-blue-400" size={24} />,
      buttonText: "Write Now",
    },
    {
      id: "achievements",
      title: "Achievements Tracker",
      description:
        "Track your progress and celebrate your learning milestones across all language skills.",
      icon: <Sparkles className="text-blue-400" size={24} />,
      buttonText: "View Progress",
    },
  ],
}: LearningToolsGridProps) => {
  return (
    <div className="w-full max-w-[1200px] mx-auto bg-slate-950 p-6 rounded-xl">
      <h2 className="text-2xl font-bold text-white mb-8">Learning Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {tools.map((tool) => (
          <ToolCard
            key={tool.id}
            title={tool.title}
            description={tool.description}
            icon={tool.icon}
            buttonText={tool.buttonText}
            onClick={() => onToolSelect(tool.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default LearningToolsGrid;
