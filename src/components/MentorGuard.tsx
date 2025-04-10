
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X, ChevronDown, Bot, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useChatbot } from "@/hooks/useChatbot";
import ReactMarkdown from "react-markdown";

const MentorGuard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const { 
    messages, 
    isLoading, 
    sendMessage,
    resetChat
  } = useChatbot();

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!inputMessage.trim()) return;
    
    sendMessage(inputMessage);
    setInputMessage("");
  };

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  return (
    <>
      {/* Chatbot button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-4 right-4 z-50"
          >
            <Button
              onClick={toggleChat}
              size="lg"
              className="rounded-full h-14 w-14 shadow-md shadow-primary/30 bg-primary"
            >
              <Bot className="h-6 w-6 text-primary-foreground" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="fixed bottom-4 right-4 z-50 w-80 sm:w-96"
          >
            <Card className="rounded-2xl shadow-xl overflow-hidden border-primary/20 backdrop-blur-sm">
              {/* Chat header */}
              <div className="bg-primary/90 text-primary-foreground p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Bot className="h-6 w-6" />
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Mentor Guard</h3>
                    <p className="text-xs opacity-80">Your career assistant</p>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-full hover:bg-white/10 text-primary-foreground"
                    onClick={toggleChat}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-full hover:bg-white/10 text-primary-foreground"
                    onClick={toggleChat}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Chat messages */}
              <ScrollArea ref={scrollAreaRef} className="h-80 p-4">
                <div className="flex flex-col gap-3">
                  {messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6">
                      <div className="bg-primary/10 p-3 rounded-full mb-3">
                        <Sparkles className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-medium mb-1">Mentor Guard</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Ask me about career advice, learning strategies, or how to stay motivated!
                      </p>
                      <div className="grid grid-cols-2 gap-2 w-full">
                        {["Resume tips", "Study advice", "Career paths", "Stay motivated"].map(
                          (suggestion) => (
                            <Button
                              key={suggestion}
                              variant="outline"
                              size="sm"
                              className="text-xs"
                              onClick={() => {
                                setInputMessage(suggestion);
                                sendMessage(suggestion);
                              }}
                            >
                              {suggestion}
                            </Button>
                          )
                        )}
                      </div>
                    </div>
                  ) : (
                    messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          message.isUser ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                            message.isUser
                              ? "bg-primary text-white rounded-tr-none"
                              : "bg-muted rounded-tl-none"
                          }`}
                        >
                          {message.isUser ? (
                            message.content
                          ) : (
                            <ReactMarkdown 
                              className="prose prose-sm dark:prose-invert prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-headings:my-1 prose-li:my-0.5 max-w-none"
                            >
                              {message.content}
                            </ReactMarkdown>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] rounded-2xl px-4 py-2 bg-muted rounded-tl-none">
                        <div className="flex gap-1 items-center h-5">
                          <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                          <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                          <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              {/* Input area */}
              <form onSubmit={handleSendMessage} className="border-t p-3 flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask Mentor Guard..."
                  className="flex-1 bg-muted/50 border-0 rounded-full text-sm px-4 py-2 focus:ring-1 focus:ring-primary focus-visible:outline-none"
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  disabled={isLoading || !inputMessage.trim()} 
                  className="rounded-full h-8 w-8 bg-primary hover:bg-primary/90"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MentorGuard;
