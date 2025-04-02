
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
    <motion.div 
      className="relative overflow-hidden rounded-2xl backdrop-blur-md border border-white/20 dark:border-white/10 shadow-lg transition-all duration-300 h-full"
      style={{ 
        background: isHovered ? 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.07))' : 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        y: -5,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="p-6 md:p-8">
        <div className="relative z-10">
          <div 
            className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-500 ${isHovered ? 'bg-primary/25' : 'bg-primary/15'} backdrop-blur-sm`}
          >
            <div className={`text-primary transition-all duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}>
              {icon}
            </div>
          </div>
          
          <h3 className="text-xl md:text-2xl font-bold mb-3">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
      
      {isHovered && (
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
};

export default FeatureCard;
