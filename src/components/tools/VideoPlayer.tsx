import React, { useState, useEffect, useRef } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { ScrollArea } from "../ui/scroll-area";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  SkipForward,
  SkipBack,
  Maximize,
  Minimize,
} from "lucide-react";

interface VideoPlayerProps {
  videoId?: string;
  subtitles?: Array<{
    startTime: number;
    endTime: number;
    text: string;
  }>;
  onTimeUpdate?: (currentTime: number) => void;
}

const VideoPlayer = ({
  videoId = "jNQXAC9IVRw", // Default to YouTube's first video as placeholder
  subtitles = [
    {
      startTime: 0,
      endTime: 3,
      text: "Hello and welcome to this English learning video.",
    },
    {
      startTime: 3,
      endTime: 6,
      text: "Today we will explore some advanced vocabulary.",
    },
    {
      startTime: 6,
      endTime: 10,
      text: "These words are commonly used in academic and professional settings.",
    },
    {
      startTime: 10,
      endTime: 15,
      text: 'Let\'s begin with our first word: "meticulous" - showing great attention to detail.',
    },
    {
      startTime: 15,
      endTime: 20,
      text: 'Next, we have "ubiquitous" - present, appearing, or found everywhere.',
    },
  ],
  onTimeUpdate = () => {},
}: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentSubtitle, setCurrentSubtitle] = useState("");

  const videoRef = useRef<HTMLIFrameElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  // Mock function to simulate video playback for the UI
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prevTime) => {
          const newTime = prevTime + 0.1;
          if (newTime >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return newTime;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  // Set a mock duration when component mounts
  useEffect(() => {
    setDuration(120); // 2 minutes mock duration
  }, []);

  // Update current subtitle based on current time
  useEffect(() => {
    const currentSub = subtitles.find(
      (sub) => currentTime >= sub.startTime && currentTime <= sub.endTime,
    );
    setCurrentSubtitle(currentSub?.text || "");
    onTimeUpdate(currentTime);
  }, [currentTime, subtitles, onTimeUpdate]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    if (value[0] === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const handleSeek = (value: number[]) => {
    setCurrentTime(value[0]);
  };

  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;

    if (!isFullscreen) {
      if (playerContainerRef.current.requestFullscreen) {
        playerContainerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const skipForward = () => {
    setCurrentTime((prevTime) => Math.min(prevTime + 10, duration));
  };

  const skipBackward = () => {
    setCurrentTime((prevTime) => Math.max(prevTime - 10, 0));
  };

  return (
    <Card className="bg-gray-900 w-full max-w-4xl overflow-hidden rounded-lg shadow-xl">
      <div ref={playerContainerRef} className="relative">
        {/* Video Player */}
        <div className="aspect-w-16 aspect-h-9 bg-black">
          <iframe
            ref={videoRef}
            src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&controls=0&disablekb=1&rel=0`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>

        {/* Subtitles */}
        <div className="absolute bottom-16 left-0 right-0 text-center px-4">
          <div className="bg-black bg-opacity-70 text-white p-2 rounded-md inline-block max-w-full">
            <p className="text-lg font-medium">{currentSubtitle}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          {/* Progress bar */}
          <div className="mb-2">
            <Slider
              value={[currentTime]}
              min={0}
              max={duration}
              step={0.1}
              onValueChange={handleSeek}
              className="cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={togglePlay}
                className="text-white hover:bg-white/20"
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={skipBackward}
                className="text-white hover:bg-white/20"
              >
                <SkipBack className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={skipForward}
                className="text-white hover:bg-white/20"
              >
                <SkipForward className="h-5 w-5" />
              </Button>

              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMute}
                  className="text-white hover:bg-white/20"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="h-5 w-5" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                </Button>

                <div className="w-24">
                  <Slider
                    value={[isMuted ? 0 : volume]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={handleVolumeChange}
                    className="cursor-pointer"
                  />
                </div>
              </div>

              <span className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleFullscreen}
                      className="text-white hover:bg-white/20"
                    >
                      {isFullscreen ? (
                        <Minimize className="h-5 w-5" />
                      ) : (
                        <Maximize className="h-5 w-5" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </div>

      {/* Word List Section */}
      <div className="p-4 bg-gray-800">
        <h3 className="text-white text-lg font-semibold mb-2">
          Extracted Vocabulary
        </h3>
        <ScrollArea className="h-32">
          <div className="space-y-2">
            <div className="p-2 bg-gray-700 rounded-md">
              <p className="text-white font-medium">meticulous</p>
              <p className="text-gray-300 text-sm">
                showing great attention to detail
              </p>
            </div>
            <div className="p-2 bg-gray-700 rounded-md">
              <p className="text-white font-medium">ubiquitous</p>
              <p className="text-gray-300 text-sm">
                present, appearing, or found everywhere
              </p>
            </div>
            <div className="p-2 bg-gray-700 rounded-md">
              <p className="text-white font-medium">eloquent</p>
              <p className="text-gray-300 text-sm">
                fluent or persuasive in speaking or writing
              </p>
            </div>
          </div>
        </ScrollArea>
      </div>
    </Card>
  );
};

export default VideoPlayer;
