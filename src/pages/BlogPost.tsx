
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogPost {
  id: string;
  image: string;
  title: string;
  content: string;
  slug: string;
  category: string;
  date: string;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch blog post data
    // In a real application, this would be an API call
    setTimeout(() => {
      const blogPosts: BlogPost[] = [
        {
          id: "1",
          image: "/lovable-uploads/95945800-41f2-4569-94c2-19bffc74e7e8.png",
          title: "How to Search for a Job on LinkedIn in 2025",
          content: `<p>In today's competitive job market, LinkedIn has become an essential platform for job seekers. This comprehensive guide will walk you through the most effective strategies for using LinkedIn to find your dream job in 2025.</p>
          
          <h2>Optimize Your LinkedIn Profile</h2>
          <p>Before you start searching for jobs, make sure your profile is optimized to attract recruiters:</p>
          <ul>
            <li>Use a professional profile picture</li>
            <li>Write a compelling headline that includes your target job title</li>
            <li>Create a detailed About section that highlights your unique value proposition</li>
            <li>List relevant skills and get endorsements</li>
            <li>Request recommendations from colleagues and managers</li>
          </ul>
          
          <h2>Leverage LinkedIn's Advanced Search Features</h2>
          <p>LinkedIn's search capabilities have evolved significantly. Use these advanced techniques to find the right opportunities:</p>
          <ul>
            <li>Use Boolean operators (AND, OR, NOT) in your searches</li>
            <li>Filter by location, industry, and company size</li>
            <li>Save your searches and set up job alerts</li>
            <li>Follow companies you're interested in to see their job postings</li>
          </ul>
          
          <h2>Network Strategically</h2>
          <p>Networking remains one of the most effective ways to find job opportunities:</p>
          <ul>
            <li>Connect with professionals in your target companies</li>
            <li>Join relevant industry groups and participate in discussions</li>
            <li>Attend virtual networking events</li>
            <li>Share valuable content to increase your visibility</li>
          </ul>`,
          slug: "how-to-search-for-a-job-on-linkedin",
          category: "Job Search",
          date: "June 12, 2025"
        },
        {
          id: "2",
          image: "/lovable-uploads/95945800-41f2-4569-94c2-19bffc74e7e8.png",
          title: "How to Get a Data Analyst Job in 2025",
          content: `<p>The data analyst role continues to be in high demand as companies increasingly rely on data to drive decision-making. This guide will help you navigate the job search process and land a data analyst position in 2025.</p>
          
          <h2>Master the Essential Skills</h2>
          <p>To stand out in the competitive data analyst job market, ensure you're proficient in:</p>
          <ul>
            <li>SQL for database querying</li>
            <li>Python or R for data analysis</li>
            <li>Data visualization tools (Tableau, Power BI)</li>
            <li>Statistical analysis</li>
            <li>Excel advanced functions</li>
            <li>Business intelligence concepts</li>
          </ul>
          
          <h2>Build a Compelling Portfolio</h2>
          <p>Demonstrate your skills through practical projects:</p>
          <ul>
            <li>Create data analysis projects using public datasets</li>
            <li>Participate in Kaggle competitions</li>
            <li>Contribute to open-source data projects</li>
            <li>Create a GitHub repository to showcase your code</li>
          </ul>
          
          <h2>Tailor Your Resume and LinkedIn Profile</h2>
          <p>Highlight your relevant experience and skills:</p>
          <ul>
            <li>Quantify your achievements with metrics when possible</li>
            <li>Include relevant keywords for ATS optimization</li>
            <li>Showcase projects with clear business impact</li>
            <li>Highlight relevant certifications</li>
          </ul>`,
          slug: "how-to-get-a-data-analyst-job",
          category: "Career",
          date: "June 10, 2025"
        },
        {
          id: "3",
          image: "/lovable-uploads/95945800-41f2-4569-94c2-19bffc74e7e8.png",
          title: "Tips to Write Impactful Resume Summaries (With Examples)",
          content: `<p>Your resume summary is the first thing hiring managers see, and it needs to capture their attention in seconds. Learn how to craft a powerful summary that makes them want to read more.</p>
          
          <h2>Why Your Resume Summary Matters</h2>
          <p>In today's fast-paced hiring environment:</p>
          <ul>
            <li>Recruiters spend an average of just 6-7 seconds scanning a resume</li>
            <li>A compelling summary increases the chances your resume will be read thoroughly</li>
            <li>It's your opportunity to immediately demonstrate your value proposition</li>
          </ul>
          
          <h2>Key Elements of an Effective Summary</h2>
          <p>Include these components for maximum impact:</p>
          <ul>
            <li>Your professional title and years of experience</li>
            <li>2-3 key accomplishments with quantifiable results</li>
            <li>Relevant skills and expertise for the target role</li>
            <li>What makes you unique as a candidate</li>
          </ul>
          
          <h2>Before and After Examples</h2>
          <p><strong>Before:</strong> "Experienced marketing professional seeking new opportunities in a growing company where I can apply my skills."</p>
          <p><strong>After:</strong> "Results-driven Digital Marketing Manager with 7+ years of experience growing B2B SaaS brands. Increased organic traffic by 250% and reduced customer acquisition costs by 30% through data-driven campaign optimization. Expertise in SEO, content strategy, and marketing automation."</p>
          
          <p><strong>Before:</strong> "Hard-working software developer with knowledge of multiple programming languages looking for a challenging position."</p>
          <p><strong>After:</strong> "Full-Stack Developer with 5 years of experience building scalable web applications using React, Node.js, and AWS. Contributed to 3 products with 100K+ users and reduced page load time by 40%. Passionate about clean code and UI/UX optimization."</p>`,
          slug: "tips-to-write-impactful-resume-summaries",
          category: "Resume",
          date: "June 8, 2025"
        },
      ];

      const foundPost = blogPosts.find(p => p.slug === slug);
      setPost(foundPost || null);
      setLoading(false);
    }, 500);
  }, [slug]);

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-muted/50 rounded w-3/4"></div>
              <div className="h-4 bg-muted/50 rounded w-1/4"></div>
              <div className="h-64 bg-muted/50 rounded"></div>
              <div className="space-y-2">
                <div className="h-4 bg-muted/50 rounded"></div>
                <div className="h-4 bg-muted/50 rounded w-5/6"></div>
                <div className="h-4 bg-muted/50 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!post) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate("/blog")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Button variant="outline" onClick={() => navigate("/blog")} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
          
          <div className="mb-6">
            <div className="flex items-center gap-4 text-sm mb-4">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">
                {post.category}
              </span>
              <span className="text-muted-foreground">{post.date}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-6">{post.title}</h1>
          </div>
          
          <div className="rounded-lg overflow-hidden mb-8">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-auto object-cover"
            />
          </div>
          
          <div 
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default BlogPost;
