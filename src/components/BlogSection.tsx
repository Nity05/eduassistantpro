
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface BlogPost {
  id: string;
  image: string;
  title: string;
  excerpt: string;
  slug: string;
}

const BlogSection = () => {
  const blogPosts: BlogPost[] = [
    {
      id: "1",
      image: "/lovable-uploads/95945800-41f2-4569-94c2-19bffc74e7e8.png",
      title: "How to Search for a Job on LinkedIn in 2025",
      excerpt: "This guide isn't just another LinkedIn job search tutorial. We're diving deep into the strategies that will give you a competitive edge in 2025. Whether you're a seasoned LinkedIn user or just starting your job hunt, these actionable tips will help you!",
      slug: "how-to-search-for-a-job-on-linkedin"
    },
    {
      id: "2",
      image: "/lovable-uploads/95945800-41f2-4569-94c2-19bffc74e7e8.png",
      title: "How to Get a Data Analyst Job in 2025",
      excerpt: "Landing a data analyst job in 2025's competitive market requires a strategic approach. This guide will provide you with the essential steps and resources you need to navigate the job search process successfully.",
      slug: "how-to-get-a-data-analyst-job"
    },
    {
      id: "3",
      image: "/lovable-uploads/95945800-41f2-4569-94c2-19bffc74e7e8.png",
      title: "Tips to Write Impactful Resume Summaries (With Examples)",
      excerpt: 'In the blink of an eye—literally, under six seconds—a hiring manager decides whether your resume lands in the "yes" or "no" pile. In today\'s competitive job market, your resume needs to grab a hiring manager\'s attention in seconds. Let\'s look at how you can improve yours today!',
      slug: "tips-to-write-impactful-resume-summaries"
    }
  ];

  return (
    <section id="blog" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Insightful <span className="text-primary">Resources</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Here are some of the frequently asked questions from our customers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <motion.div
              key={post.id}
              className="bg-background rounded-lg overflow-hidden shadow-md border transition-all hover:shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: parseInt(post.id) * 0.1 }}
            >
              <div className="h-48 overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">{post.title}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                <Link to={`/blog/${post.slug}`} className="inline-flex items-center text-primary font-medium">
                  Read More <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg">
            <Link to="/blog">VIEW MORE</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
