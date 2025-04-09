
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export interface ChatMessage {
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export const useChatbot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const apiUrl = "https://chatbot-im5p.onrender.com/chat";

  const sendMessage = async (messageContent: string) => {
    if (!messageContent.trim()) return;

    // Add user message to the chat
    const userMessage: ChatMessage = {
      content: messageContent,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: messageContent }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Add bot response to the chat
      const botMessage: ChatMessage = {
        content: data.response || "Sorry, I couldn't process your request at the moment.",
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      
      toast({
        title: "Connection Error",
        description: "Could not connect to Mentor Guard. Please try again later.",
        variant: "destructive",
      });

      // Add error message
      const errorMessage: ChatMessage = {
        content: "I'm having trouble connecting right now. Please try again later.",
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([]);
  };

  return {
    messages,
    isLoading,
    sendMessage,
    resetChat,
  };
};
