
import { GraduationCap, Zap, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#4481eb22,transparent_40%)]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[60vh] w-[80vw] rounded-full bg-primary/5 blur-[120px]"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center mb-16">
          <div className="mb-6 animate-fade-in">
            <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary mb-4">
              <Sparkles size={16} className="mr-1" /> For College Students
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 animate-fade-in tracking-tight [text-wrap:balance]">
            Accelerate Your Career With <span className="text-gradient">AI-Powered</span> Learning
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in [text-wrap:balance]">
            CareerTrack helps college students reduce workload and master competitive skills using cutting-edge AI tools.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in">
            <button className="bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25 w-full sm:w-auto">
              Get Started — Free
            </button>
            <button className="px-6 py-3 rounded-full font-medium border border-border hover:bg-secondary transition-all w-full sm:w-auto">
              Explore Features
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
          <StatCard 
            icon={<GraduationCap size={24} />}
            title="92%"
            description="Students improved grades with AI tools"
            delay={0.1}
          />
          <StatCard 
            icon={<Zap size={24} />}
            title="75%"
            description="Reduction in study preparation time"
            delay={0.2}
          />
          <StatCard 
            icon={<Sparkles size={24} />}
            title="4.5x"
            description="Increase in resume success rate"
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ 
  icon, 
  title, 
  description,
  delay
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  delay: number;
}) => {
  return (
    <div className="glass-card p-6 animate-fade-in" style={{ animationDelay: `${delay}s` }}>
      <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default HeroSection;
