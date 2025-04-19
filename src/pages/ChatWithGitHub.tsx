import React, { useState, useRef, useEffect } from "react";
import MainLayout from "@/layout/MainLayout";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { SendHorizontal, Loader2, Github, Plus } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "@/hooks/use-toast";
import ChatHistory from "@/components/ChatHistory";
import { useChatStorage, ChatSession } from "@/hooks/useChatStorage";
import ReactMarkdown from "react-markdown";

interface Message {
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

const ChatWithGitHub = () => {
  const [repoUrl, setRepoUrl] = useState("");
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionId, setSessionId] = useState(uuidv4());
  const [isLoading, setIsLoading] = useState(false);
  const [isIngestLoading, setIsIngestLoading] = useState(false);
  const [isIngested, setIsIngested] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const {
    chatHistory,
    currentChatId,
    setCurrentChatId,
    saveChat,
    deleteChat,
    getChat
  } = useChatStorage("github-chat-history");
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  useEffect(() => {
    if (messages.length > 0 && isIngested) {
      const title = repoUrl
        ? `${repoUrl.replace(/https:\/\/github\.com\/|\.git/g, "").substring(0, 30)}`
        : `Chat ${new Date().toLocaleString()}`;
        
      saveChat(sessionId, title, messages);
    }
  }, [messages, isIngested]);
  
  useEffect(() => {
    if (currentChatId) {
      const chat = getChat(currentChatId);
      if (chat) {
        setSessionId(chat.id);
        setMessages(chat.messages);
        setIsIngested(true);
        
        const firstAssistantMsg = chat.messages.find(msg => msg.role === "assistant");
        if (firstAssistantMsg) {
          const repoMatch = firstAssistantMsg.content.match(/Repository\s+(.+?)\s+has been/);
          if (repoMatch && repoMatch[1]) {
            setRepoUrl(repoMatch[1]);
          }
        }
      }
    }
  }, [currentChatId]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    // Only scroll on new messages sent by the user, not on loading history
    if (messages.length > 0 && !currentChatId) {
      setTimeout(scrollToBottom, 100);
    }
  }, [messages, currentChatId]);

  const startNewChat = () => {
    setSessionId(uuidv4());
    setRepoUrl("");
    setMessages([]);
    setQuestion("");
    setIsIngested(false);
    setCurrentChatId(null);
  };

  const ingestRepo = async () => {
    if (!repoUrl) {
      toast({
        title: "Missing repository URL",
        description: "Please enter a GitHub repository URL",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsIngestLoading(true);
      const response = await fetch("https://github-fkfe.onrender.com/ingest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          repo_url: repoUrl,
          session_id: sessionId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to ingest repository");
      }

      const result = await response.json();
      
      toast({
        title: "Repository ingested successfully",
        description: "You can now ask questions about this repository",
      });
      
      setIsIngested(true);
      setMessages([
        {
          content: `Repository ${repoUrl} has been analyzed. You can now ask questions about the code, structure, or functionality.`,
          role: "assistant",
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error("Error ingesting repository:", error);
      toast({
        title: "Error ingesting repository",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsIngestLoading(false);
    }
  };

  const sendQuestion = async () => {
    if (!question.trim()) return;
    
    if (!isIngested) {
      toast({
        title: "No repository ingested",
        description: "Please ingest a repository first before asking questions",
        variant: "destructive",
      });
      return;
    }
    
    const userMessage: Message = {
      content: question,
      role: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setQuestion("");
    setIsLoading(true);
    
    try {
      const response = await fetch("https://github-fkfe.onrender.com/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session_id: sessionId,
          question: userMessage.content,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to get response");
      }
      
      const result = await response.json();
      
      const assistantMessage: Message = {
        content: result.response,
        role: "assistant",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending question:", error);
      toast({
        title: "Error getting response",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
      
      setMessages((prev) => [
        ...prev,
        {
          content: "Sorry, I encountered an error while processing your question. Please try again.",
          role: "assistant",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendQuestion();
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Chat with GitHub Repository</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Analyze and understand GitHub repositories with AI. Enter a repository URL to get started.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Previous Repositories</h2>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={startNewChat} 
                className="flex items-center gap-1"
              >
                <Plus className="h-4 w-4" /> New Chat
              </Button>
            </div>
            
            <ChatHistory 
              history={chatHistory}
              currentChatId={currentChatId}
              onSelectChat={(id) => setCurrentChatId(id)}
              onDeleteChat={deleteChat}
            />
          </div>
          
          <div className="md:col-span-2">
            {!isIngested ? (
              <div className="mb-8 p-6 border rounded-lg bg-card">
                <h2 className="text-xl font-semibold mb-4">Step 1: Ingest a GitHub Repository</h2>
                <div className="flex flex-col md:flex-row gap-4">
                  <Input
                    placeholder="Enter GitHub repository URL (e.g., https://github.com/username/repo)"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    onClick={ingestRepo} 
                    disabled={isIngestLoading || !repoUrl}
                    className="whitespace-nowrap"
                  >
                    {isIngestLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Github className="mr-2 h-4 w-4" />
                        Analyze Repository
                      </>
                    )}
                  </Button>
                </div>
                
                <div className="mt-4">
                  <Alert>
                    <Github className="h-4 w-4" />
                    <AlertTitle>Repository Analysis</AlertTitle>
                    <AlertDescription>
                      This tool analyzes GitHub repositories to understand their structure, code, and functionality.
                      Please note that analysis may take a few moments for larger repositories.
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            ) : (
              <div className="mb-4">
                <Alert>
                  <Github className="h-4 w-4" />
                  <AlertTitle>Repository Ingested</AlertTitle>
                  <AlertDescription>
                    Repository: {repoUrl}
                  </AlertDescription>
                </Alert>
              </div>
            )}

            <div className="flex flex-col h-[500px] border rounded-lg">
              <div className="flex-1 p-4 overflow-y-auto bg-muted/20">
                {messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                    <Github size={48} className="mb-4 opacity-20" />
                    <p>No messages yet. Start by ingesting a repository.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          message.role === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-4 ${
                            message.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          {message.role === "assistant" ? (
                            <div className="prose prose-sm dark:prose-invert max-w-none">
                              <ReactMarkdown 
                                components={{
                                  pre: ({ children }) => <pre className="bg-secondary/50 p-2 rounded-md overflow-x-auto">{children}</pre>,
                                  code: ({ children }) => <code className="bg-secondary/50 px-1 py-0.5 rounded text-sm">{children}</code>,
                                }}
                              >
                                {message.content}
                              </ReactMarkdown>
                            </div>
                          ) : (
                            <div className="whitespace-pre-wrap">{message.content}</div>
                          )}
                          <div
                            className={`text-xs mt-2 ${
                              message.role === "user"
                                ? "text-primary-foreground/70"
                                : "text-muted-foreground"
                            }`}
                          >
                            {message.timestamp.toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>
              
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Ask a question about the repository..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="min-h-[60px] resize-none"
                    disabled={!isIngested || isLoading}
                  />
                  <Button
                    size="icon"
                    onClick={sendQuestion}
                    disabled={!isIngested || isLoading || !question.trim()}
                  >
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <SendHorizontal className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ChatWithGitHub;
