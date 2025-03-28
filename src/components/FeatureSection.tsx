
import { FileQuestion, FileText, FileSearch, Github } from "lucide-react";
import FeatureCard from "./FeatureCard";
import { Link } from "react-router-dom";

const FeatureSection = () => {
  const features = [
    {
      icon: <FileQuestion size={24} />,
      title: "AI Quiz Generator",
      description: "Creates customized quizzes from GATE PYQs, tailored to your learning needs with adaptive difficulty levels.",
      link: "/quiz"
    },
    {
      icon: <FileText size={24} />,
      title: "ChatWithPDF",
      description: "Interact with research papers naturally. Ask questions, get summaries, and extract key insights with ease.",
      link: "/chat-with-pdf"
    },
    {
      icon: <FileSearch size={24} />,
      title: "ATS Resume Analyzer",
      description: "Get detailed feedback on your resume's ATS compatibility, with specific suggestions to improve visibility to employers.",
      link: "/ats-resume"
    },
    {
      icon: <Github size={24} />,
      title: "Chat with GitHub Repo",
      description: "Understand complex codebases by asking questions directly about the repository structure, functions, and more.",
      link: "/chat-with-github"
    }
  ];

  return (
    <section id="features" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#4481eb22,transparent_40%)]"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary mb-4">
            AI-Powered Features
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 tracking-tight [text-wrap:balance]">
            Cutting-edge tools to accelerate your <span className="text-gradient">learning journey</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto [text-wrap:balance]">
            Our suite of AI-powered tools is specifically designed to help college students excel in both academics and career preparation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <Link to={feature.link} key={index} className="block">
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                index={index}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
