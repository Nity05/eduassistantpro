
import { motion } from "framer-motion";
import { MessageSquare, Star, Quote } from "lucide-react";
import { Card } from "@/components/ui/card";

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  rating: number;
  delay: number;
}

const Testimonial = ({ quote, author, role, rating, delay }: TestimonialProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="w-full"
    >
      <Card className="h-full p-6 glass-card hover-scale">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 rounded-full bg-primary/10">
            <Quote size={20} className="text-primary" />
          </div>
          <div className="flex">
            {Array.from({ length: rating }).map((_, i) => (
              <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
            ))}
          </div>
        </div>
        
        <p className="text-foreground/90 mb-6 leading-relaxed">"{quote}"</p>
        
        <div className="mt-auto">
          <p className="font-semibold">{author}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </Card>
    </motion.div>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "CareerTrack helped me organize my learning path and land an internship at a top tech company. The AI-powered resume builder was a game-changer!",
      author: "Emma Rodriguez",
      role: "Computer Science Student",
      rating: 5,
      delay: 0.1
    },
    {
      quote: "The personalized learning tracks kept me motivated. I improved my coding skills and earned two certifications in just 3 months.",
      author: "James Wilson",
      role: "Data Science Major",
      rating: 5,
      delay: 0.2
    },
    {
      quote: "The interview prep feature helped me feel confident and prepared. I received offers from multiple companies after graduation!",
      author: "Sophia Chen",
      role: "Recent Graduate",
      rating: 4,
      delay: 0.3
    }
  ];

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our <span className="text-primary">Users</span> Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of students who have accelerated their careers with our platform.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Testimonial 
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              rating={testimonial.rating}
              delay={testimonial.delay}
            />
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 text-primary">
            <MessageSquare size={18} />
            <span className="font-medium">Join 5,000+ students already on CareerTrack</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
