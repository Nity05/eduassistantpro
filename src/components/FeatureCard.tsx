
import { useState } from "react";
import { motion } from "framer-motion";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const FeatureCard = ({ icon, title, description, index }: FeatureCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="glass-card p-6 md:p-8 hover-scale"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        animationDelay: `${index * 0.1}s`,
      }}
    >
      <div className="bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center text-primary mb-6 relative overflow-hidden group">
        <div className={`transition-all duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}>
          {icon}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-full"></div>
      </div>
      <h3 className="text-xl md:text-2xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default FeatureCard;
