
import MainLayout from "../layout/MainLayout";
import HeroSection from "../components/HeroSection";
import FeatureSection from "../components/FeatureSection";
import BlogSection from "../components/BlogSection";

const Index = () => {
  return (
    <MainLayout>
      <HeroSection />
      <FeatureSection />
      <BlogSection />
    </MainLayout>
  );
};

export default Index;
