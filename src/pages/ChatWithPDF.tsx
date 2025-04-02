import { useState, useRef, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, FileText, Send, Upload, Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator"; 
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from "uuid";
import ChatHistory from "@/components/ChatHistory";
import { useChatStorage } from "@/hooks/useChatStorage";
import ReactMarkdown from "react-markdown";

const ChatWithPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string, timestamp: Date }[]>([]);
  const [isAskingQuestion, setIsAskingQuestion] = useState(false);
  const [sessionId, setSessionId] = useState<string>(uuidv4());
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const {
    chatHistory,
    currentChatId,
    setCurrentChatId,
    saveChat,
    deleteChat,
    getChat
  } = useChatStorage("pdf-chat-history");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(scrollToBottom, 100);
    }
  }, [messages]);
  
  useEffect(() => {
    if (messages.length > 0 && isProcessed) {
      const title = file 
        ? file.name.substring(0, 30) 
        : `Chat ${new Date().toLocaleString()}`;
        
      saveChat(sessionId, title, messages);
    }
  }, [messages, isProcessed]);
  
  useEffect(() => {
    if (currentChatId) {
      const chat = getChat(currentChatId);
      if (chat) {
        setSessionId(chat.id);
        setMessages(chat.messages);
        setIsProcessed(true);
      }
    }
  }, [currentChatId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== "application/pdf") {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please upload a PDF file only.",
        });
        return;
      }
      setFile(selectedFile);
    }
  };

  const uploadFile = async () => {
    if (!file) {
      toast({
        variant: "destructive",
        title: "No file selected",
        description: "Please select a PDF file to upload.",
      });
      return;
    }

    const newSessionId = uuidv4();
    setSessionId(newSessionId);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`https://chatwithpdf-vj5q.onrender.com/upload/${newSessionId}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Error uploading file");
      }

      const data = await response.json();
      setIsProcessed(true);
      
      setMessages([
        { 
          role: 'assistant', 
          content: "PDF processed successfully! I'm ready to answer questions about this research paper. What would you like to know?",
          timestamp: new Date()
        }
      ]);
      
      toast({
        title: "PDF Uploaded Successfully",
        description: "Your research paper has been processed and is ready for questions.",
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Failed to upload PDF file.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const askQuestion = async () => {
    if (!question.trim()) {
      toast({
        variant: "destructive",
        title: "Empty question",
        description: "Please enter a question to ask.",
      });
      return;
    }

    if (!isProcessed || !sessionId) {
      toast({
        variant: "destructive",
        title: "No PDF processed",
        description: "Please upload and process a PDF file first.",
      });
      return;
    }

    const userQuestion = question.trim();
    const timestamp = new Date();
    setMessages(prev => [...prev, { role: 'user', content: userQuestion, timestamp }]);
    setQuestion("");
    setIsAskingQuestion(true);

    try {
      const response = await fetch(`https://chatwithpdf-vj5q.onrender.com/ask/${sessionId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: userQuestion }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Error getting response");
      }

      const data = await response.json();
      const timestamp = new Date();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response, timestamp }]);
    } catch (error) {
      console.error("Error asking question:", error);
      toast({
        variant: "destructive",
        title: "Failed to get answer",
        description: error instanceof Error ? error.message : "Failed to get a response from the AI.",
      });
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm sorry, I encountered an error while processing your question. Please try again.",
        timestamp: new Date()
      }]);
    } finally {
      setIsAskingQuestion(false);
      setTimeout(scrollToBottom, 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      askQuestion();
    }
  };

  const resetChat = () => {
    setFile(null);
    setIsProcessed(false);
    setSessionId(uuidv4());
    setMessages([]);
    setCurrentChatId(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  
  const startNewChat = () => {
    resetChat();
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4 tracking-tight">
              Chat with Research <span className="text-gradient">Papers</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Upload a research paper and ask questions to get insights, summaries, and explanations in natural language.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Previous Research Papers</h2>
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
              {!isProcessed ? (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Upload Research Paper
                    </CardTitle>
                    <CardDescription>
                      Upload a PDF file to start chatting with its content
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid w-full max-w-sm items-center gap-1.5 mx-auto">
                      <Input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        disabled={isUploading || isProcessed}
                        className="cursor-pointer"
                      />
                      {file && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Selected: {file.name}
                        </p>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-center gap-2">
                    <Button 
                      onClick={uploadFile} 
                      disabled={!file || isUploading || isProcessed}
                      className="w-full max-w-xs"
                    >
                      {isUploading ? (
                        <>
                          <span className="animate-spin mr-2">
                            <Upload className="h-4 w-4" />
                          </span>
                          Processing...
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          Upload & Process PDF
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                <div className="mb-4">
                  <Alert>
                    <FileText className="h-4 w-4" />
                    <AlertTitle>PDF Processed</AlertTitle>
                    <AlertDescription>
                      {file ? `File: ${file.name}` : "Ready to answer questions"}
                    </AlertDescription>
                  </Alert>
                  <div className="mt-4 text-right">
                    <Button 
                      variant="outline" 
                      onClick={resetChat}
                      size="sm"
                    >
                      Reset & Upload New PDF
                    </Button>
                  </div>
                </div>
              )}

              {!isProcessed && messages.length === 0 && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Getting Started</AlertTitle>
                  <AlertDescription>
                    Upload a research paper PDF to begin the conversation. You'll be able to ask 
                    questions about the paper's content after processing.
                  </AlertDescription>
                </Alert>
              )}

              {messages.length > 0 && (
                <div className="mb-4 border rounded-lg overflow-hidden">
                  <div className="p-4 bg-muted/50">
                    <h3 className="font-medium">Conversation</h3>
                  </div>
                  <Separator />
                  <div className="p-4 max-h-[400px] overflow-y-auto">
                    {messages.map((message, index) => (
                      <div 
                        key={index} 
                        className={`mb-4 ${
                          message.role === 'user' 
                            ? 'ml-auto text-right' 
                            : ''
                        }`}
                      >
                        <div 
                          className={`inline-block max-w-[80%] rounded-lg p-3 ${
                            message.role === 'user' 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted'
                          }`}
                        >
                          {message.role === 'assistant' ? (
                            <div className="text-sm prose prose-sm dark:prose-invert max-w-none">
                              <ReactMarkdown>{message.content}</ReactMarkdown>
                            </div>
                          ) : (
                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          )}
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                  <Separator />
                  <div className="p-4">
                    <div className="flex gap-2">
                      <Textarea
                        placeholder="Ask a question about the research paper..."
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={!isProcessed || isAskingQuestion}
                        className="min-h-[60px] resize-none"
                      />
                      <Button 
                        onClick={askQuestion} 
                        disabled={!isProcessed || isAskingQuestion || !question.trim()}
                        className="shrink-0"
                      >
                        {isAskingQuestion ? (
                          <span className="animate-spin">
                            <Send className="h-4 w-4" />
                          </span>
                        ) : (
                          <Send className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ChatWithPDF;
