
import React, { Suspense } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Background3D from "../components/Background3D";
import { ClerkLoaded, ClerkLoading } from "@clerk/clerk-react";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Background3D />
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
    </div>
  );
};

export default MainLayout;
