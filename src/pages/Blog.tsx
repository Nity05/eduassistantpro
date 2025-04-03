
import { useState } from "react";
import MainLayout from "../layout/MainLayout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";

interface BlogPost {
  id: string;
  image: string;
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  date: string;
}

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const blogPosts: BlogPost[] = [
    {
      id: "1",
      image: "/lovable-uploads/95945800-41f2-4569-94c2-19bffc74e7e8.png",
      title: "How to Search for a Job on LinkedIn in 2025",
      excerpt: "This guide isn't just another LinkedIn job search tutorial. We're diving deep into the strategies that will give you a competitive edge in 2025. Whether you're a seasoned LinkedIn user or just starting your job hunt, these actionable tips will help you!",
      slug: "how-to-search-for-a-job-on-linkedin",
      category: "Job Search",
      date: "June 12, 2025"
    },
    {
      id: "2",
      image: "/lovable-uploads/95945800-41f2-4569-94c2-19bffc74e7e8.png",
      title: "How to Get a Data Analyst Job in 2025",
      excerpt: "Landing a data analyst job in 2025's competitive market requires a strategic approach. This guide will provide you with the essential steps and resources you need to navigate the job search process successfully.",
      slug: "how-to-get-a-data-analyst-job",
      category: "Career",
      date: "June 10, 2025"
    },
    {
      id: "3",
      image: "/lovable-uploads/95945800-41f2-4569-94c2-19bffc74e7e8.png",
      title: "Tips to Write Impactful Resume Summaries (With Examples)",
      excerpt: 'In the blink of an eye—literally, under six seconds—a hiring manager decides whether your resume lands in the "yes" or "no" pile. In today\'s competitive job market, your resume needs to grab a hiring manager\'s attention in seconds. Let\'s look at how you can improve yours today!',
      slug: "tips-to-write-impactful-resume-summaries",
      category: "Resume",
      date: "June 8, 2025"
    },
    {
      id: "4",
      image: "/lovable-uploads/95945800-41f2-4569-94c2-19bffc74e7e8.png",
      title: "5 AI Tools That Will Transform Your Job Search in 2025",
      excerpt: "Artificial Intelligence is revolutionizing how we search for jobs. These 5 AI tools will give you an edge in the competitive job market by helping you optimize your resume, prepare for interviews, and find the perfect job matches.",
      slug: "ai-tools-transform-job-search",
      category: "Technology",
      date: "June 5, 2025"
    },
    {
      id: "5",
      image: "/lovable-uploads/95945800-41f2-4569-94c2-19bffc74e7e8.png",
      title: "The Future of Remote Work: Trends for 2025 and Beyond",
      excerpt: "Remote work is here to stay. Discover the emerging trends that will shape how we work remotely in 2025 and beyond, from virtual reality meetings to the four-day work week.",
      slug: "future-remote-work-trends",
      category: "Workplace",
      date: "June 1, 2025"
    },
    {
      id: "6",
      image: "/lovable-uploads/95945800-41f2-4569-94c2-19bffc74e7e8.png",
      title: "Mastering the Virtual Interview: Tips from Hiring Managers",
      excerpt: "Virtual interviews present unique challenges and opportunities. We've gathered insights from top hiring managers to help you ace your next virtual interview and stand out from the competition.",
      slug: "mastering-virtual-interviews",
      category: "Interviews",
      date: "May 29, 2025"
    }
  ];

  // Filter posts based on search query
  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 tracking-tight">
              Career <span className="text-gradient">Resources</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Insights, guides, and expert advice to accelerate your career growth
            </p>
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto mb-10">
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Blog Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  className="bg-background rounded-lg overflow-hidden shadow-md border transition-all hover:shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="h-48 overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-3 text-sm">
                      <span className="text-primary font-medium">{post.category}</span>
                      <span className="text-muted-foreground">{post.date}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 line-clamp-2">{post.title}</h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                    <Link to={`/blog/${post.slug}`} className="inline-flex items-center text-primary font-medium">
                      Read More <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <h3 className="text-xl font-medium mb-2">No articles found</h3>
                <p className="text-muted-foreground">Try searching with different keywords</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Blog;
