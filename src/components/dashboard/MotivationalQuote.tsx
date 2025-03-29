import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

interface MotivationalQuoteProps {
  quote?: string;
  author?: string;
  isLoading?: boolean;
}

const MotivationalQuote = ({
  quote = "The limits of my language mean the limits of my world.",
  author = "Ludwig Wittgenstein",
  isLoading = false,
}: MotivationalQuoteProps) => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    // Add fade-in effect when component mounts
    const timer = setTimeout(() => setFadeIn(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className="w-full max-w-[1200px] mx-auto bg-gradient-to-r from-blue-950 to-slate-900 border-blue-800 shadow-lg overflow-hidden">
      <CardContent className="p-8">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4 bg-blue-800/30" />
            <Skeleton className="h-4 w-1/3 bg-blue-800/30" />
          </div>
        ) : (
          <div
            className={`transition-opacity duration-700 ${fadeIn ? "opacity-100" : "opacity-0"}`}
          >
            <blockquote className="text-2xl md:text-3xl font-serif text-blue-100 italic mb-4">
              &ldquo;{quote}&rdquo;
            </blockquote>
            <footer className="text-right text-blue-300">
              <cite className="not-italic font-medium">— {author}</cite>
            </footer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MotivationalQuote;
