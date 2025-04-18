'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Mic, 
  Video, 
  VideoOff,
  Phone, 
  MessageSquare, 
  Users, 
  MoreVertical, 
  X,
  Clock,
  MicOff,
  Check,
  Send
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import { Interview_Chat } from "@/utils/api";
import { useAuth } from '@/context/AuthContext'; 

// Helper function to format timestamp
const formatMessageTime = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
};

// Helper function to get name from role
const getSenderName = (role: string) => {
  return role === "interviewer" ? "AI inMentor" : "You";
};

interface Message {
  role: string;
  chat_session_id?: string;
  content: string;
  created_at: string;
}

interface MeetingInterfaceProps {
  onComplete: () => void;
  processData: any;
}

const MeetingInterface = ({ onComplete, processData }: MeetingInterfaceProps) => {
  // States for media controls
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [message, setMessage] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isInterviewComplete, setIsInterviewComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Get token from auth context
  const { getToken } = useAuth();  
  // State for messages
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const processId = processData?.id || "";

  // Initial message on component mount
  useEffect(() => {
    // If we have a process ID, send initial greeting to start the interview
    if (processId && messages.length === 0) {
      handleSystemMessage();
    }
  }, [processId]); // Remove session dependency

  const handleSystemMessage = async () => {
    const token = await getToken();
    if (!token || !processId) return;
    
    setIsLoading(true);
    try {
      const response = await Interview_Chat(
        token,
        processId,
        "candidate", 
        "Start Interview"
      );
      
      if (response && response.content) {
        // Add the response message to our messages array
        const newMessage = {
          role: "interviewer",
          content: response.content,
          created_at: new Date().toISOString()
        };
        
        setMessages(prev => [...prev, newMessage]);
      }
    } catch (err) {
      console.error("Error getting initial message:", err);
      setError("Failed to start interview. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Hàm để mở camera
  const startCamera = useCallback(async () => {
    try {
      setError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: isMicOn
      });
      
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      
      setIsCameraOn(true);
    } catch (error: any) {
      console.error("Không thể truy cập camera:", error);
      setError(error.message || "Không thể truy cập camera");
      setIsCameraOn(false);
    }
  }, [isMicOn]);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => {
        if (track.kind === 'video') {
          track.stop();
        }
      });
      
      // Cập nhật srcObject của video element
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      
      setIsCameraOn(false);
    }
  }, [stream]);

  // Toggle camera function
  const toggleCamera = useCallback(() => {
    if (isCameraOn) {
      stopCamera();
    } else {
      startCamera();
    }
  }, [isCameraOn, startCamera, stopCamera]);

  // Toggle microphone function
  const toggleMic = useCallback(() => {
    if (stream) {
      const audioTracks = stream.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = !isMicOn;
      });
    }
    setIsMicOn(!isMicOn);
  }, [isMicOn, stream]);

  // Xử lý khi component unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  // Add an effect to handle video stream correctly
  useEffect(() => {
    if (isCameraOn && videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [isCameraOn, stream]);

  // Xử lý gửi tin nhắn
  const handleSendMessage = async () => {
    const token = await getToken();
    if (message.trim() && token && processId && !isLoading) {
      setIsLoading(true);
      
      // First add user message to UI
      const userMessage = {
        role: "candidate",
        content: message.trim(),
        created_at: new Date().toISOString()
      };
      
      setMessages(prevMessages => [...prevMessages, userMessage]);
      
      setMessage("");
      
      try {
        // Send message to API
        const response = await Interview_Chat(
          token,
          processId,
          "candidate",
          message.trim()
        );
        
        // Add system response to messages
        if (response && response.content) {
          const newMessage = {
            role: "interviewer",
            content: response.content,
            created_at: new Date().toISOString()
          };
          
          setMessages(prev => [...prev, newMessage]);
        }
      } catch (error) {
        console.error("Failed to send message:", error);
        setError("Failed to send message. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Xử lý phím Enter để gửi tin nhắn
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Function to end the interview and proceed to assessment
  const handleEndInterview = () => {
    // Clean up media streams
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    
    // Show completion dialog
    setIsInterviewComplete(true);
  };

  // Function to complete interview and proceed to assessment
  const handleCompleteInterview = () => {
    onComplete();
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-slate-900 text-white overflow-hidden">
      {/* Main Video Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Header with meeting info */}
        <div className="bg-slate-800 p-3 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-green-700/30 text-green-300 border-green-600">
              <Clock className="h-3 w-3 mr-1" />
              9:21 PM
            </Badge>
            <h2 className="font-medium">Developer Intern Interview</h2>
          </div>
          {error && (
            <Badge variant="destructive" className="ml-2">
              {error}
            </Badge>
          )}
        </div>
        
        {/* Main Video Content */}
        <div className="flex-1 relative overflow-hidden">
          {/* Main Video */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full flex items-center justify-center p-2">
              <div className="relative w-full h-full">
                <div className="w-full h-full bg-slate-700 rounded-lg overflow-hidden flex items-center justify-center">
                  {/* Main participant's video or camera off state */}
                  {isCameraOn ? (
                    <video 
                      ref={videoRef}
                      autoPlay={true}
                      playsInline={true}
                      muted={true}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Avatar className="h-24 w-24 border-2 border-blue-400">
                            <div className="bg-slate-600 h-full w-full flex items-center justify-center">
                              <span className="text-lg font-medium text-white">A</span>
                            </div>
                          </Avatar>
                      <div className="text-slate-300 text-sm mt-2">Camera is off</div>
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-md text-sm flex items-center">
                    <div className={`w-2 h-2 ${isMicOn ? 'bg-green-500' : 'bg-red-500'} rounded-full mr-2`}></div>
                    Aaron Wang {!isMicOn && <MicOff className="h-3 w-3 ml-1.5 text-red-400" />}
                  </div>
                  
                  {/* Participant Thumbnail inside main video */}
                    <div className="absolute bottom-4 right-4 z-10">
                    <Card className="w-64 h-48 bg-slate-700 rounded-lg overflow-hidden border border-slate-600 shadow-xl">
                      <div className="relative w-full h-full">
                        <div className="absolute inset-0 bg-slate-900/70"></div>
                        <div className="absolute top-2 left-2 flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          <span className="text-sm font-medium text-white">AI inMentor</span>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative h-24 w-24 border-2 border-blue-400 rounded-full overflow-hidden bg-white">
                            <Image 
                              src={Logo}
                              alt="InMentor Logo" 
                              fill
                              className="object-contain p-0.5"
                            />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Controls */}
        <div className="p-4 pb-5 flex justify-center bg-gradient-to-t from-slate-900 via-slate-900/95 to-transparent z-10">
          <div className="bg-slate-800 rounded-full px-3 py-3 flex items-center space-x-3 shadow-xl">
            <Button 
              variant={isMicOn ? "ghost" : "destructive"} 
              size="icon" 
              className="rounded-full hover:bg-slate-700 transition-colors"
              onClick={toggleMic}
            >
              {isMicOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
            </Button>
            
            <Button 
              variant="destructive" 
              size="icon" 
              className="rounded-full bg-red-600 hover:bg-red-700 transition-colors"
              onClick={handleEndInterview}
            >
              <Phone className="h-5 w-5" />
            </Button>
            <Button 
              variant={isCameraOn ? "ghost" : "destructive"} 
              size="icon" 
              className="rounded-full hover:bg-slate-700 transition-colors"
              onClick={toggleCamera}
            >
              {isCameraOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Live Transcript Panel */}
      <div className="w-full md:w-96 bg-white text-black border-l border-slate-300 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <h3 className="font-medium flex items-center text-center">
            <MessageSquare className="h-4 w-4 mr-2 text-blue-500" />
            Live Transcript
          </h3>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-6">
            {messages.length === 0 && !isLoading ? (
              <div className="text-center p-4 text-slate-400">
                Starting interview...
              </div>
            ) : (
              messages.map(message => {
                const isInterviewer = message.role === "interviewer";
                const formattedTime = formatMessageTime(message.created_at);
                const senderName = getSenderName(message.role);
                
                return (
                  <div key={message.id} className="space-y-1">
                    <div className={`text-sm text-slate-500 mb-1 flex items-center ${!isInterviewer ? "justify-end" : ""}`}>
                      <span className="font-medium text-slate-700">{senderName}</span>
                      <span className="ml-2 text-xs">{formattedTime}</span>
                    </div>
                    <div className={`text-sm ${
                      isInterviewer 
                        ? "bg-slate-100 rounded-lg rounded-tl-none p-3" 
                        : "bg-blue-100 rounded-lg rounded-tr-none p-3 ml-auto max-w-[90%]"
                    }`}>
                      {message.content}
                    </div>
                  </div>
                );
              })
            )}
            {isLoading && (
              <div className="flex space-x-2 p-3 justify-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        {/* Message input area */}
        <div className="p-3 border-t border-slate-200">
          <div className="flex items-center bg-slate-100 rounded-lg px-3 py-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="bg-transparent flex-1 focus:outline-none text-sm"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <Button 
              size="sm" 
              variant="ghost" 
              className={`rounded-full h-8 w-8 ${isLoading ? 'text-slate-400' : 'text-blue-500'}`}
              onClick={handleSendMessage}
              disabled={isLoading || !message.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Interview Complete Dialog */}
      {isInterviewComplete && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <Card className="w-full max-w-md bg-white p-6 rounded-lg">
            <div className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Interview Complete</h2>
              <p className="text-slate-600">
                Thank you for participating in this interview. Your responses have been recorded.
              </p>
              <div className="pt-4">
                <Button 
                  onClick={handleCompleteInterview}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Continue to Assessment
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MeetingInterface;
