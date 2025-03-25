
import { useState } from "react";
import MainLayout from "../layout/MainLayout";
import { FileText, Upload, Check, X, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import ATSResultCard from "@/components/ATSResultCard";
import ATSEmailTemplate from "@/components/ATSEmailTemplate";
import ATSMissingKeywords from "@/components/ATSMissingKeywords";
import ATSCertifications from "@/components/ATSCertifications";

interface AnalysisData {
  match_percentage: number;
  match_reasons: {
    strengths: string[];
    gaps: string[];
    alignment: string[];
  };
  missing_keywords: string[];
  improvement_suggestions: string[];
  recommended_certifications: {
    name: string;
    platform: string;
    link: string;
  }[];
}

interface AnalysisResponse {
  analysis: AnalysisData;
  email_content: string;
}

const ATSResume = () => {
  const [file, setFile] = useState<File | null>(null);
  const [jobLink, setJobLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(null);
  const [activeTab, setActiveTab] = useState<"analysis" | "email">("analysis");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else if (selectedFile) {
      toast.error("Please upload a PDF file");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast.error("Please upload your resume");
      return;
    }
    
    if (!jobLink) {
      toast.error("Please enter a job posting URL");
      return;
    }
    
    // Validate URL
    try {
      new URL(jobLink);
    } catch (error) {
      toast.error("Please enter a valid URL");
      return;
    }
    
    setIsLoading(true);
    
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("job_link", jobLink);
    
    try {
      toast.info("Analyzing your resume...", {
        description: "This may take a minute or two to complete.",
        duration: 10000,
      });
      
      const response = await fetch("https://atsresume.onrender.com/analyze", {
        method: "POST",
        body: formData,
        // Ensure no CORS issues
        mode: "cors",
        headers: {
          // Do not set Content-Type as it's set automatically with boundary for FormData
        },
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      setAnalysisResult(data);
      toast.success("Analysis complete!");
    } catch (error) {
      console.error("Error analyzing resume:", error);
      toast.error("Failed to analyze resume. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <FileText className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">ATS Resume Analyzer</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload your resume and provide a job posting URL to get detailed feedback on ATS compatibility and generate a customized job application email.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="glass-panel p-6 md:p-8 rounded-2xl mb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <Label htmlFor="resume">Upload Resume (PDF only)</Label>
                <div 
                  className={`border-2 border-dashed rounded-lg p-6 text-center hover:bg-secondary/10 transition-colors cursor-pointer ${
                    file ? "border-primary/50" : "border-border"
                  }`}
                  onClick={() => document.getElementById("resume")?.click()}
                >
                  <Input 
                    id="resume" 
                    type="file" 
                    accept=".pdf" 
                    onChange={handleFileChange} 
                    className="hidden" 
                  />
                  
                  {file ? (
                    <div className="flex items-center justify-center gap-2">
                      <FileCheck className="w-5 h-5 text-primary" />
                      <span className="text-sm">{file.name}</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Drag and drop your resume here or click to browse
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        PDF files only, max 5MB
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="jobLink">Job Posting URL</Label>
                <Input 
                  id="jobLink" 
                  type="url" 
                  placeholder="https://example.com/job-posting" 
                  value={jobLink}
                  onChange={(e) => setJobLink(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Enter the full URL of the job posting you want to analyze your resume against
                </p>
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading || !file || !jobLink}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                    Analyzing...
                  </>
                ) : (
                  <>Analyze Resume</>
                )}
              </Button>
            </form>
          </div>
          
          {isLoading && (
            <div className="glass-panel p-6 rounded-2xl mb-8">
              <h2 className="text-xl font-semibold mb-4">Analysis in Progress</h2>
              <Progress value={isLoading ? 75 : 0} className="mb-4" />
              <p className="text-sm text-muted-foreground">
                Our AI is analyzing your resume against the job description. This can take up to 2-3 minutes due to the complexity of analysis.
              </p>
            </div>
          )}
          
          {analysisResult && (
            <div className="glass-panel p-6 md:p-8 rounded-2xl">
              <div className="flex border-b mb-6">
                <button
                  className={`pb-2 px-4 text-sm font-medium ${
                    activeTab === "analysis"
                      ? "border-b-2 border-primary text-primary"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => setActiveTab("analysis")}
                >
                  Analysis Results
                </button>
                <button
                  className={`pb-2 px-4 text-sm font-medium ${
                    activeTab === "email"
                      ? "border-b-2 border-primary text-primary"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => setActiveTab("email")}
                >
                  Application Email
                </button>
              </div>
              
              {activeTab === "analysis" ? (
                <div className="space-y-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Resume Analysis</h2>
                    <div className="flex items-center">
                      <span className="text-sm mr-2">Match Score:</span>
                      <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-primary text-primary-foreground font-bold">
                        {analysisResult.analysis.match_percentage}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ATSResultCard 
                      title="Strengths" 
                      items={analysisResult.analysis.match_reasons.strengths}
                      icon={<Check className="w-5 h-5 text-green-500" />}
                    />
                    
                    <ATSResultCard 
                      title="Gaps" 
                      items={analysisResult.analysis.match_reasons.gaps}
                      icon={<X className="w-5 h-5 text-red-500" />}
                    />
                  </div>
                  
                  <ATSResultCard 
                    title="Alignment with Job Requirements" 
                    items={analysisResult.analysis.match_reasons.alignment}
                    icon={<Check className="w-5 h-5 text-primary" />}
                  />
                  
                  <ATSMissingKeywords 
                    keywords={analysisResult.analysis.missing_keywords}
                    suggestions={analysisResult.analysis.improvement_suggestions}
                  />
                  
                  <ATSCertifications 
                    certifications={analysisResult.analysis.recommended_certifications} 
                  />
                </div>
              ) : (
                <ATSEmailTemplate emailContent={analysisResult.email_content} />
              )}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default ATSResume;
