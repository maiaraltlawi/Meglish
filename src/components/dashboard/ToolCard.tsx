import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick?: () => void;
  buttonText?: string;
}

const ToolCard = ({
  title = "Tool Title",
  description = "This is a description of the learning tool. It helps users improve their English skills in a specific area.",
  icon = (
    <div className="w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center text-white text-xl">
      T
    </div>
  ),
  onClick = () => console.log("Tool card clicked"),
  buttonText = "Open Tool",
}: ToolCardProps) => {
  return (
    <Card className="w-full max-w-[550px] h-[320px] flex flex-col bg-slate-900 border-slate-800 hover:border-blue-600 transition-all duration-300 shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-4">
          {icon}
          <CardTitle className="text-xl text-white">{title}</CardTitle>
        </div>
        <CardDescription className="text-slate-400 mt-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {/* Content area can be used for additional information or features */}
        <div className="h-full flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
          <div className="w-16 h-16 rounded-full bg-blue-900/30 flex items-center justify-center">
            {icon}
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button
          onClick={onClick}
          className="w-full bg-blue-700 hover:bg-blue-600 text-white flex items-center justify-between"
        >
          <span>{buttonText}</span>
          <ArrowRight size={18} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ToolCard;
