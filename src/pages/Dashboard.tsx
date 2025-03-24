
import { useUser } from "@clerk/clerk-react";
import MainLayout from "../layout/MainLayout";

const Dashboard = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 flex items-center justify-center">
          <div className="animate-pulse w-8 h-8 rounded-full bg-primary/20"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="glass-panel p-8 rounded-2xl">
          <h1 className="text-3xl font-bold mb-6">Welcome, {user?.firstName || "User"}!</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="glass-card p-6 hover-scale">
              <h2 className="text-xl font-semibold mb-2">Quick Access</h2>
              <ul className="space-y-2">
                <li className="text-muted-foreground hover:text-foreground transition-colors">
                  <a href="#ai-quiz">AI Quiz Generator</a>
                </li>
                <li className="text-muted-foreground hover:text-foreground transition-colors">
                  <a href="#chat-pdf">Chat with PDF</a>
                </li>
                <li className="text-muted-foreground hover:text-foreground transition-colors">
                  <a href="#resume">ATS Resume Analyzer</a>
                </li>
                <li className="text-muted-foreground hover:text-foreground transition-colors">
                  <a href="#github">Chat with GitHub Repo</a>
                </li>
              </ul>
            </div>
            
            <div className="glass-card p-6 hover-scale">
              <h2 className="text-xl font-semibold mb-2">Your Progress</h2>
              <p className="text-muted-foreground">Track your learning journey</p>
              <div className="mt-4 bg-secondary/30 rounded-full h-2 overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{width: "25%"}}></div>
              </div>
              <p className="text-sm mt-2">25% Complete</p>
            </div>
          </div>
          
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <p className="text-muted-foreground">No recent activity yet. Start using our tools to see your activity here!</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
