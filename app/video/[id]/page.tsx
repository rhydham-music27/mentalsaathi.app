"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  ArrowLeft,
  Clock,
  Heart,
  BookOpen,
  Share,
  Download,
  SkipBack,
  SkipForward,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Mock video data - in real app this would come from an API
const videoData = {
  "1": {
    id: "1",
    title: "5-Minute Breathing Exercise for Anxiety",
    duration: "5:23",
    category: "Anxiety",
    videoUrl: "/placeholder-video.mp4", // In real app, this would be actual video URL
    thumbnail: "/placeholder.svg?height=400&width=600",
    description:
      "Learn a simple yet powerful breathing technique that can help calm your mind and reduce anxiety in just 5 minutes. This exercise is perfect for students dealing with exam stress or overwhelming situations.",
    instructor: "Dr. Priya Sharma",
    views: "2.3k",
    likes: "156",
    transcript: [
      {
        time: "0:00",
        text: "Welcome to this 5-minute breathing exercise designed specifically for managing anxiety.",
      },
      {
        time: "0:15",
        text: "Find a comfortable position, either sitting or lying down.",
      },
      {
        time: "0:30",
        text: "Close your eyes gently and begin to notice your natural breath.",
      },
      {
        time: "1:00",
        text: "Now we'll begin the 4-7-8 breathing technique...",
      },
    ],
    relatedVideos: [
      {
        id: "2",
        title: "Progressive Muscle Relaxation",
        duration: "12:45",
        thumbnail: "/placeholder.svg?height=120&width=200",
      },
      {
        id: "3",
        title: "Managing Academic Stress",
        duration: "8:30",
        thumbnail: "/placeholder.svg?height=120&width=200",
      },
      {
        id: "4",
        title: "Building Daily Motivation",
        duration: "6:15",
        thumbnail: "/placeholder.svg?height=120&width=200",
      },
    ],
  },
  "2": {
    id: "2",
    title: "Progressive Muscle Relaxation",
    duration: "12:45",
    category: "Sleep",
    videoUrl: "/placeholder-video.mp4",
    thumbnail: "/placeholder.svg?height=400&width=600",
    description:
      "A comprehensive guide to progressive muscle relaxation that will help you release tension from your entire body and prepare for restful sleep.",
    instructor: "Dr. Arjun Patel",
    views: "1.8k",
    likes: "98",
    transcript: [
      {
        time: "0:00",
        text: "Welcome to progressive muscle relaxation, a technique that helps release physical tension.",
      },
      {
        time: "0:20",
        text: "We'll work through each muscle group systematically...",
      },
    ],
    relatedVideos: [
      {
        id: "1",
        title: "5-Minute Breathing Exercise",
        duration: "5:23",
        thumbnail: "/placeholder.svg?height=120&width=200",
      },
      {
        id: "6",
        title: "Evening Wind-Down Routine",
        duration: "7:45",
        thumbnail: "/placeholder.svg?height=120&width=200",
      },
    ],
  },
  // Add more video data as needed
};

export default function VideoPlayerPage() {
  const params = useParams();
  const videoId = params.id as string;
  const video = videoData[videoId as keyof typeof videoData];

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", updateDuration);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", updateDuration);
    };
  }, []);

  if (!video) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Video Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The video you're looking for doesn't exist.
          </p>
          <Link href="/journal">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full">
              Back to Therapy Tools
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const togglePlay = () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (isPlaying) {
      videoElement.pause();
    } else {
      videoElement.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const newTime = (Number.parseFloat(e.target.value) / 100) * duration;
    videoElement.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(e.target.value) / 100;
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!isFullscreen) {
      containerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  const skipTime = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/journal">
            <Button
              variant="ghost"
              className="text-purple-600 hover:text-purple-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Therapy Tools
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Player Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <Card className="border-gray-200 shadow-xl overflow-hidden">
              <div
                ref={containerRef}
                className="relative bg-black aspect-video"
                onMouseEnter={() => setShowControls(true)}
                onMouseLeave={() => setShowControls(false)}
              >
                <video
                  ref={videoRef}
                  className="w-full h-full"
                  poster={video.thumbnail}
                  onClick={togglePlay}
                >
                  <source src={video.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Video Controls Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
                    showControls ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {/* Play/Pause Button Center */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button
                      onClick={togglePlay}
                      className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30"
                    >
                      {isPlaying ? (
                        <Pause className="w-8 h-8 text-white" />
                      ) : (
                        <Play className="w-8 h-8 text-white ml-1" />
                      )}
                    </Button>
                  </div>

                  {/* Bottom Controls */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
                    {/* Progress Bar */}
                    <div className="w-full">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={progressPercentage}
                        onChange={handleSeek}
                        className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>

                    {/* Control Buttons */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Button
                          onClick={togglePlay}
                          variant="ghost"
                          size="sm"
                          className="text-white hover:bg-white/20"
                        >
                          {isPlaying ? (
                            <Pause className="w-5 h-5" />
                          ) : (
                            <Play className="w-5 h-5" />
                          )}
                        </Button>

                        <Button
                          onClick={() => skipTime(-10)}
                          variant="ghost"
                          size="sm"
                          className="text-white hover:bg-white/20"
                        >
                          <SkipBack className="w-5 h-5" />
                        </Button>

                        <Button
                          onClick={() => skipTime(10)}
                          variant="ghost"
                          size="sm"
                          className="text-white hover:bg-white/20"
                        >
                          <SkipForward className="w-5 h-5" />
                        </Button>

                        <div className="flex items-center gap-2">
                          <Button
                            onClick={toggleMute}
                            variant="ghost"
                            size="sm"
                            className="text-white hover:bg-white/20"
                          >
                            {isMuted ? (
                              <VolumeX className="w-5 h-5" />
                            ) : (
                              <Volume2 className="w-5 h-5" />
                            )}
                          </Button>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={isMuted ? 0 : volume * 100}
                            onChange={handleVolumeChange}
                            className="w-20 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>

                        <span className="text-white text-sm font-medium">
                          {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          onClick={toggleFullscreen}
                          variant="ghost"
                          size="sm"
                          className="text-white hover:bg-white/20"
                        >
                          <Maximize className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Video Info */}
            <Card className="border-purple-100 shadow-lg">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                      {video.title}
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {video.duration}
                      </span>
                      <span>{video.views} views</span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                        {video.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button variant="outline" className="rounded-full">
                        <Heart className="w-4 h-4 mr-2" />
                        {video.likes}
                      </Button>
                      <Button variant="outline" className="rounded-full">
                        <Share className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                      <Button variant="outline" className="rounded-full">
                        <Download className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-semibold">
                        {video.instructor
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {video.instructor}
                        </p>
                        <p className="text-sm text-gray-600">
                          Mental Health Professional
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {video.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Transcript */}
            <Card className="border-blue-100 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-500" />
                    Transcript
                  </h3>
                  <Button
                    onClick={() => setShowTranscript(!showTranscript)}
                    variant="outline"
                    size="sm"
                    className="rounded-full"
                  >
                    {showTranscript ? "Hide" : "Show"} Transcript
                  </Button>
                </div>

                {showTranscript && (
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {video.transcript.map((item, index) => (
                      <div
                        key={index}
                        className="flex gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        <span className="text-sm font-medium text-blue-600 min-w-[50px]">
                          {item.time}
                        </span>
                        <p className="text-sm text-gray-700">{item.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Related Videos */}
            <Card className="border-green-100 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Related Videos
                </h3>
                <div className="space-y-4">
                  {video.relatedVideos.map((relatedVideo) => (
                    <Link
                      key={relatedVideo.id}
                      href={`/video/${relatedVideo.id}`}
                    >
                      <div className="flex gap-3 p-3 rounded-lg hover:bg-green-50 transition-colors cursor-pointer">
                        <div className="relative flex-shrink-0">
                          <img
                            src={relatedVideo.thumbnail || "/placeholder.svg"}
                            alt={relatedVideo.title}
                            className="w-24 h-16 object-cover rounded-lg"
                          />
                          <div className="absolute bottom-1 right-1 bg-black/70 text-white px-1 py-0.5 rounded text-xs">
                            {relatedVideo.duration}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 text-sm leading-tight mb-1 line-clamp-2">
                            {relatedVideo.title}
                          </h4>
                          <p className="text-xs text-gray-600">
                            {relatedVideo.duration}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Practice Notes */}
            <Card className="border-yellow-100 shadow-lg bg-yellow-50/50">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-yellow-600" />
                  Practice Notes
                </h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <p>• Find a quiet, comfortable space</p>
                  <p>• Practice regularly for best results</p>
                  <p>• Don't worry if your mind wanders</p>
                  <p>• Be patient and kind with yourself</p>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Support */}
            <Card className="border-red-100 shadow-lg bg-red-50/50">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  Need Immediate Support?
                </h3>
                <p className="text-sm text-gray-700 mb-3">
                  If you're experiencing a mental health crisis, please reach
                  out for help immediately.
                </p>
                <div className="space-y-2 text-sm">
                  <p className="font-medium">Crisis Helplines:</p>
                  <p>• National: 9152987821</p>
                  <p>• NIMHANS: 080-46110007</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
