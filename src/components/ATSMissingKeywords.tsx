
import { AlertCircle } from "lucide-react";

interface ATSMissingKeywordsProps {
  keywords: string[];
  suggestions: string[];
}

const ATSMissingKeywords = ({ keywords, suggestions }: ATSMissingKeywordsProps) => {
  return (
    <div className="space-y-6">
      <div className="glass-card p-6 rounded-xl">
        <h3 className="text-lg font-semibold mb-4">Missing Keywords</h3>
        <div className="flex flex-wrap gap-2">
          {keywords.map((keyword, index) => (
            <span 
              key={index} 
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>
      
      <div className="glass-card p-6 rounded-xl">
        <div className="flex items-start gap-2 mb-4">
          <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <h3 className="text-lg font-semibold">Improvement Suggestions</h3>
        </div>
        <ul className="space-y-2">
          {suggestions.map((suggestion, index) => (
            <li key={index} className="text-sm pl-7 relative before:content-['•'] before:absolute before:left-2 before:top-0">
              {suggestion}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ATSMissingKeywords;
