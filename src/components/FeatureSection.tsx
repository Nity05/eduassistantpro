
import { FileQuestion, FileText, FileSearch, Github } from "lucide-react";
import FeatureCard from "./FeatureCard";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const FeatureSection = () => {
  const features = [
    {
      icon: <FileQuestion size={28} />,
      title: "AI Quiz Generator",
      description: "Creates customized quizzes from GATE PYQs, tailored to your learning needs with adaptive difficulty levels.",
      link: "/quiz"
    },
    {
      icon: <FileText size={28} />,
      title: "ChatWithPDF",
      description: "Interact with research papers naturally. Ask questions, get summaries, and extract key insights with ease.",
      link: "/chat-with-pdf"
    },
    {
      icon: <FileSearch size={28} />,
      title: "ATS Resume Analyzer",
      description: "Get detailed feedback on your resume's ATS compatibility, with specific suggestions to improve visibility to employers.",
      link: "/ats-resume"
    },
    {
      icon: <Github size={28} />,
      title: "Chat with GitHub Repo",
      description: "Understand complex codebases by asking questions directly about the repository structure, functions, and more.",
      link: "/chat-with-github"
    }
  ];

  return (
    <section id="features" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary mb-4">
            AI-Powered Features
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 tracking-tight [text-wrap:balance]">
            Cutting-edge tools to accelerate your <span className="text-gradient">learning journey</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto [text-wrap:balance]">
            Our suite of AI-powered tools is specifically designed to help college students excel in both academics and career preparation.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <Link to={feature.link} key={index} className="block h-full">
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
