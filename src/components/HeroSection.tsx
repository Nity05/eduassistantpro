
import { GraduationCap, Zap, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ProgressTracker from "./ProgressTracker";

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Additional Background Effects, but more subtle to complement the 3D background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.1),transparent_30%)]"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="max-w-3xl lg:max-w-none">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary mb-4 backdrop-blur-sm">
                <Sparkles size={16} className="mr-1" /> For College Students
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 tracking-tight [text-wrap:balance]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Accelerate Your Career With <span className="text-gradient">AI-Powered</span> Learning
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground max-w-2xl lg:max-w-none mb-8 [text-wrap:balance]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              CareerTrack helps college students reduce workload and master competitive skills using cutting-edge AI tools.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-start gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link to="/sign-up" className="w-full sm:w-auto">
                <motion.button 
                  className="bg-gradient-to-r from-primary to-blue-500 text-white px-8 py-3.5 rounded-full font-medium transition-all shadow-lg hover:shadow-primary/25 hover:scale-105 w-full sm:w-auto backdrop-blur-sm"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  Get Started — Free
                </motion.button>
              </Link>
              <Link to="#features" className="w-full sm:w-auto">
                <motion.button 
                  className="px-8 py-3.5 rounded-full font-medium border border-border bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all w-full sm:w-auto"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  Explore Features
                </motion.button>
              </Link>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
              <StatCard 
                icon={<GraduationCap size={28} />}
                title="92%"
                description="Students improved grades with AI tools"
                delay={0.4}
              />
              <StatCard 
                icon={<Zap size={28} />}
                title="75%"
                description="Reduction in study preparation time"
                delay={0.5}
              />
              <StatCard 
                icon={<Sparkles size={28} />}
                title="4.5x"
                description="Increase in resume success rate"
                delay={0.6}
              />
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hidden lg:block"
          >
            <ProgressTracker />
          </motion.div>
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
    <motion.div 
      className="relative overflow-hidden rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 p-6 h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ 
        y: -5,
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)"
      }}
    >
      <div className="bg-primary/10 p-4 rounded-xl w-14 h-14 flex items-center justify-center text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-2xl md:text-3xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
};

export default HeroSection;
