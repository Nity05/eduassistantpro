
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Bot, Globe, Atom, FileCode } from "lucide-react";

interface ProgressItemProps {
  icon: React.ReactNode;
  title: string;
  percentage: number;
  delay: number;
}

const ProgressItem = ({ icon, title, percentage, delay }: ProgressItemProps) => {
  return (
    <motion.div 
      className="mb-4 last:mb-0"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Card className="p-4 bg-white/5 backdrop-blur-sm border-white/10">
        <div className="flex items-center gap-4">
          <div className="bg-white/10 p-3 rounded-lg">
            {icon}
          </div>
          <div className="flex-1">
            <div className="flex justify-between mb-1.5">
              <span className="font-medium text-sm">{title}</span>
              <span className="text-sm font-medium text-primary">{percentage}%</span>
            </div>
            <Progress value={percentage} className="h-2" />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

const ProgressTracker = () => {
  // Sample data - this would be fetched from an API in a real app
  const overallProgress = 72;
  const progressItems = [
    { icon: <FileCode size={20} className="text-green-400" />, title: "Python Fundamentals", percentage: 100, delay: 0.2 },
    { icon: <Atom size={20} className="text-yellow-400" />, title: "Data Structures", percentage: 85, delay: 0.3 },
    { icon: <Globe size={20} className="text-blue-400" />, title: "Web Development", percentage: 42, delay: 0.4 },
    { icon: <Bot size={20} className="text-red-400" />, title: "Machine Learning Basics", percentage: 12, delay: 0.5 }
  ];

  return (
    <motion.div 
      className="p-5 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-medium text-blue-500">Your Progress</h3>
        <span className="text-xl font-bold text-blue-500">{overallProgress}%</span>
      </div>
      
      <div className="mb-6">
        <Progress value={overallProgress} className="h-3" />
      </div>
      
      <div>
        {progressItems.map((item, index) => (
          <ProgressItem 
            key={index}
            icon={item.icon}
            title={item.title}
            percentage={item.percentage}
            delay={item.delay}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ProgressTracker;
