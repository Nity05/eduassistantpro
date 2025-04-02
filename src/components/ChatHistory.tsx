
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { History, Trash2 } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import ReactMarkdown from "react-markdown";

interface ChatHistoryProps {
  history: Array<{
    id: string;
    title: string;
    timestamp: Date;
  }>;
  onSelectChat: (id: string) => void;
  onDeleteChat: (id: string) => void;
  currentChatId: string | null;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({
  history,
  onSelectChat,
  onDeleteChat,
  currentChatId,
}) => {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="flex items-center justify-between border-b p-3 bg-muted/30">
        <div className="flex items-center gap-2">
          <History className="h-4 w-4" />
          <h3 className="font-medium">Chat History</h3>
        </div>
      </div>
      <ScrollArea className="h-[300px]">
        <div className="p-2">
          {history.length === 0 ? (
            <div className="text-center p-4 text-muted-foreground">
              No previous chats
            </div>
          ) : (
            <div className="space-y-1">
              {history.map((chat) => (
                <div
                  key={chat.id}
                  className={`p-2 rounded-md flex items-center justify-between cursor-pointer group ${
                    currentChatId === chat.id
                      ? "bg-primary/10 border border-primary/20"
                      : "hover:bg-secondary"
                  }`}
                  onClick={() => onSelectChat(chat.id)}
                >
                  <div className="overflow-hidden">
                    <div className="font-medium truncate">{chat.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(chat.timestamp), { addSuffix: true })}
                    </div>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteChat(chat.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete chat</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delete chat</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChatHistory;
