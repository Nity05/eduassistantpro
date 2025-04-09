
import MainLayout from "../layout/MainLayout";
import HeroSection from "../components/HeroSection";
import FeatureSection from "../components/FeatureSection";
import BlogSection from "../components/BlogSection";
import TestimonialsSection from "../components/TestimonialsSection";

const Index = () => {
  return (
    <MainLayout>
      <HeroSection />
      <FeatureSection />
      <BlogSection />
      <TestimonialsSection />
    </MainLayout>
  );
};

export default Index;
