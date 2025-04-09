
import React, { Suspense } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Background3D from "../components/Background3D";
import MentorGuard from "../components/MentorGuard";
import { ClerkLoaded, ClerkLoading } from "@clerk/clerk-react";

interface MainLayoutProps {
  children: React.ReactNode;
}

// Simple error boundary for 3D components
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return null; // Return null to hide the component on error
    }

    return this.props.children;
  }
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <ErrorBoundary>
        <Suspense fallback={null}>
          <Background3D />
        </Suspense>
      </ErrorBoundary>
      
      <ClerkLoading>
        <div className="fixed top-0 left-0 w-full z-50 py-4 px-6 glass-panel">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-display font-bold">
              <span className="text-primary">Career</span>
              <span>Track</span>
            </div>
            <div className="animate-pulse w-8 h-8 rounded-full bg-primary/20"></div>
          </div>
        </div>
      </ClerkLoading>
      
      <ClerkLoaded>
        <Navbar />
      </ClerkLoaded>
      
      <main className="flex-1">{children}</main>
      <Footer />
      
      {/* Add the MentorGuard chatbot component */}
      <MentorGuard />
    </div>
  );
};

export default MainLayout;
