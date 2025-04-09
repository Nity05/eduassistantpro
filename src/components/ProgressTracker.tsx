
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Bot, Globe, Atom, FileCode, Award, Calendar, Target, Clock, Flame } from "lucide-react";

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
  const userName = "Alex";
  const lastLogin = "Yesterday";
  const streak = 7;
  const nextMilestone = "Python Expert";
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
        <div>
          <h3 className="text-xl font-medium text-blue-500">Hi, {userName}!</h3>
          <p className="text-sm text-muted-foreground">Last login: {lastLogin}</p>
        </div>
        <div className="text-right">
          <span className="text-xl font-bold text-blue-500">{overallProgress}%</span>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Target size={12} />
            <span>Next: {nextMilestone}</span>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <Progress value={overallProgress} className="h-3" />
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white/5 p-3 rounded-lg backdrop-blur-sm text-center">
          <div className="flex justify-center mb-1">
            <Flame size={18} className="text-orange-400" />
          </div>
          <p className="text-xs text-muted-foreground">Streak</p>
          <p className="font-bold">{streak} days</p>
        </div>
        <div className="bg-white/5 p-3 rounded-lg backdrop-blur-sm text-center">
          <div className="flex justify-center mb-1">
            <Clock size={18} className="text-blue-400" />
          </div>
          <p className="text-xs text-muted-foreground">Study Time</p>
          <p className="font-bold">14 hrs</p>
        </div>
        <div className="bg-white/5 p-3 rounded-lg backdrop-blur-sm text-center">
          <div className="flex justify-center mb-1">
            <Award size={18} className="text-yellow-400" />
          </div>
          <p className="text-xs text-muted-foreground">Certifications</p>
          <p className="font-bold">2</p>
        </div>
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-sm text-muted-foreground">YOUR TRACKS</h4>
          <span className="text-xs text-blue-400 cursor-pointer hover:underline">View All</span>
        </div>
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
      
      <motion.div 
        className="mt-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <span className="text-xs text-muted-foreground">
          Your next recommended course: <span className="text-blue-400">Introduction to Neural Networks</span>
        </span>
      </motion.div>
    </motion.div>
  );
};

export default ProgressTracker;
