"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Bot,
  MessageCircle,
  Mic,
  MicOff,
  Send,
  Sparkles,
  User,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  audioUrl?: string;
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "Hello! I'm your AI real estate assistant. I can help you with property valuations, market insights, document preparation, and answer any questions about buying or selling properties. How can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState<"en" | "hi" | "ur" | "bn">("en");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: aiResponse,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes("valuation") || lowerInput.includes("price")) {
      return "I can help you get an instant AI property valuation! To provide an accurate estimate, I'll need some details: property location, size (sq ft), type (apartment/villa/commercial), number of bedrooms, and any special amenities. Would you like to start the valuation process?";
    }

    if (lowerInput.includes("document") || lowerInput.includes("paperwork")) {
      return "I can assist with document preparation! Depending on your location, I can help generate: \n\n🇺🇸 USA: Purchase Agreement, Deed, Disclosure Forms\n🇦🇪 UAE: Sale Agreement, NOC, Title Deed\n🇬🇧 UK: Contract of Sale, Transfer Deed\n🇸🇦 Saudi: Sale Contract, Ownership Transfer\n\nWhich country and document type do you need?";
    }

    if (lowerInput.includes("market") || lowerInput.includes("trend")) {
      return "Current market insights for international markets:\n\n📈 New York: +8% growth this quarter\n📊 Dubai: Stable with high demand in Marina\n🏗️ London: Tech sector driving 12% appreciation\n💰 Toronto: Emerging opportunities in downtown\n\nWould you like detailed analysis for a specific city or property type?";
    }

    if (lowerInput.includes("buy") || lowerInput.includes("purchase")) {
      return "Great! I can guide you through the buying process. Here's what I need to find perfect matches:\n\n1. Budget range (in USD)\n2. Preferred locations\n3. Property type (apartment/villa/commercial)\n4. Number of bedrooms\n5. Must-have amenities\n\nShall we start with your budget range?";
    }

    if (lowerInput.includes("sell") || lowerInput.includes("selling")) {
      return "I'll help you sell your property effectively! Let me assist with:\n\n✅ AI property valuation\n📸 Listing optimization\n📋 Document preparation\n🎯 Lead matching\n📊 Market positioning\n\nWould you like to start with a free AI valuation of your property?";
    }

    return "I understand you're asking about real estate. I can help with property valuations, market analysis, document preparation, buying/selling guidance, and lead matching. Could you be more specific about what you'd like assistance with?";
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        // Here you would send to speech-to-text service
        handleVoiceInput(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleVoiceInput = async (audioBlob: Blob) => {
    // Simulate speech-to-text conversion
    const transcribedText =
      "I want to know the current market price for a 3-bedroom apartment in Manhattan";
    setInputMessage(transcribedText);
  };

  const speakMessage = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang =
        language === "hi"
          ? "hi-IN"
          : language === "ur"
          ? "ur-PK"
          : language === "bn"
          ? "bn-BD"
          : "en-US";
      speechSynthesis.speak(utterance);
      setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
    }
  };

  const quickActions = [
    {
      label: "Get Property Valuation",
      action: () => setInputMessage("I need a property valuation"),
    },
    {
      label: "Market Trends",
      action: () => setInputMessage("Show me current market trends"),
    },
    {
      label: "Document Help",
      action: () => setInputMessage("I need help with property documents"),
    },
    {
      label: "Find Properties",
      action: () => setInputMessage("Help me find properties to buy"),
    },
  ];

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-black text-white hover:bg-gray-800 shadow-lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96  h-[600px]  flex flex-col">
      <Card className="flex-1 flex flex-col shadow-2xl border-2">
        <CardHeader className="bg-black text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-white rounded-full">
                <Bot className="h-4 w-4 text-black" />
              </div>
              <div>
                <CardTitle className="text-sm">AI Assistant</CardTitle>
                <div className="flex items-center space-x-1 text-xs">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Online</span>
                  <Sparkles className="h-3 w-3 ml-1" />
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="text-xs bg-gray-800 text-white rounded px-2 py-1"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="ur">اردو</option>
                <option value="bn">বাংলা</option>
              </select>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-gray-800"
              >
                ×
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-4">
          {/* Messages */}
          <ScrollArea className=" h-[330px] overflow-hidden  overflow-y-scroll">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex items-start space-x-2 max-w-[80%] ${
                      message.type === "user"
                        ? "flex-row-reverse space-x-reverse"
                        : ""
                    }`}
                  >
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarFallback
                        className={
                          message.type === "user"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-black text-white"
                        }
                      >
                        {message.type === "user" ? (
                          <User className="h-4 w-4" />
                        ) : (
                          <Bot className="h-4 w-4" />
                        )}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`rounded-lg p-3 ${
                        message.type === "user"
                          ? "bg-black text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line break-words overflow-wrap-anywhere">
                        {message.content}
                      </p>
                      {message.type === "assistant" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => speakMessage(message.content)}
                          className="mt-2 h-6 px-2 text-xs"
                        >
                          {isPlaying ? (
                            <VolumeX className="h-3 w-3" />
                          ) : (
                            <Volume2 className="h-3 w-3" />
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-black text-white">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-gray-100 rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Quick Actions */}
          <div className="p-3 border-t bg-gray-50">
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={action.action}
                  className="text-xs h-8"
                >
                  {action.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex items-center space-x-2">
              <div className="flex-1 flex items-center space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask me anything about real estate..."
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={isRecording ? stopRecording : startRecording}
                  className={isRecording ? "bg-red-100 text-red-600" : ""}
                >
                  {isRecording ? (
                    <MicOff className="h-4 w-4" />
                  ) : (
                    <Mic className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="bg-black text-white hover:bg-gray-800"
                size="sm"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
