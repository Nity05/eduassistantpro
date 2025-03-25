
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ATSEmailTemplateProps {
  emailContent: string;
}

const ATSEmailTemplate = ({ emailContent }: ATSEmailTemplateProps) => {
  const [copied, setCopied] = useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(emailContent);
    setCopied(true);
    toast.success("Email copied to clipboard");
    
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Job Application Email</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={copyToClipboard}
          className="flex items-center gap-1"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy Email
            </>
          )}
        </Button>
      </div>
      
      <div className="bg-secondary/20 p-6 rounded-xl whitespace-pre-wrap text-sm">
        {emailContent}
      </div>
    </div>
  );
};

export default ATSEmailTemplate;
