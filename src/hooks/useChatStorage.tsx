
import { useState, useEffect } from "react";

export interface ChatSession {
  id: string;
  title: string;
  timestamp: Date;
  messages: Array<{
    content: string;
    role: "user" | "assistant";
    timestamp: Date;
  }>;
}

export function useChatStorage(storageKey: string) {
  const [chatHistory, setChatHistory] = useState<ChatSession[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  
  // Load chat history from localStorage on component mount
  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem(storageKey);
      if (storedHistory) {
        const parsedHistory = JSON.parse(storedHistory).map((chat: any) => ({
          ...chat,
          timestamp: new Date(chat.timestamp),
          messages: chat.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }))
        }));
        setChatHistory(parsedHistory);
      }
    } catch (error) {
      console.error("Error loading chat history:", error);
    }
  }, [storageKey]);
  
  // Save chat history to localStorage whenever it changes
  useEffect(() => {
    if (chatHistory.length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(chatHistory));
    }
  }, [chatHistory, storageKey]);
  
  const saveChat = (id: string, title: string, messages: Array<{content: string, role: "user" | "assistant", timestamp: Date}>) => {
    setChatHistory(prevHistory => {
      // Check if this chat already exists
      const existingChatIndex = prevHistory.findIndex(chat => chat.id === id);
      
      if (existingChatIndex !== -1) {
        // Update existing chat
        const updatedHistory = [...prevHistory];
        updatedHistory[existingChatIndex] = {
          id,
          title,
          timestamp: new Date(),
          messages
        };
        return updatedHistory;
      } else {
        // Add new chat
        return [
          ...prevHistory,
          {
            id,
            title,
            timestamp: new Date(),
            messages
          }
        ];
      }
    });
    setCurrentChatId(id);
  };
  
  const deleteChat = (id: string) => {
    setChatHistory(prevHistory => prevHistory.filter(chat => chat.id !== id));
    if (currentChatId === id) {
      setCurrentChatId(null);
    }
  };
  
  const getChat = (id: string) => {
    return chatHistory.find(chat => chat.id === id) || null;
  };
  
  return {
    chatHistory,
    currentChatId,
    setCurrentChatId,
    saveChat,
    deleteChat,
    getChat
  };
}
