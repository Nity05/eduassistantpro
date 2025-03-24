
import { Link } from "react-router-dom";
import { Heart, Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 md:py-16 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-10">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 text-2xl font-display font-bold mb-4">
              <span className="text-primary">Career</span>
              <span>Track</span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Empowering college students with AI tools to excel in academics and prepare for successful careers.
            </p>
            <div className="flex items-center gap-4">
              <SocialLink href="#" icon={<Github size={20} />} />
              <SocialLink href="#" icon={<Twitter size={20} />} />
              <SocialLink href="#" icon={<Linkedin size={20} />} />
            </div>
          </div>
          
          <FooterColumn 
            title="Product"
            links={[
              { name: "Features", href: "/#features" },
              { name: "Pricing", href: "#" },
              { name: "FAQ", href: "#" },
              { name: "Changelog", href: "#" },
            ]}
          />
          
          <FooterColumn 
            title="Company"
            links={[
              { name: "About", href: "#" },
              { name: "Careers", href: "#" },
              { name: "Blog", href: "#" },
              { name: "Contact", href: "#" },
            ]}
          />
          
          <FooterColumn 
            title="Legal"
            links={[
              { name: "Terms of Service", href: "#" },
              { name: "Privacy Policy", href: "#" },
              { name: "Cookie Policy", href: "#" },
            ]}
          />
        </div>
        
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} CareerTrack. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center">
            Made with <Heart size={14} className="text-destructive mx-1" /> for students
          </p>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ href, icon }: { href: string; icon: React.ReactNode }) => {
  return (
    <a 
      href={href} 
      className="w-10 h-10 flex items-center justify-center rounded-full border border-border text-foreground hover:bg-secondary transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon}
    </a>
  );
};

const FooterColumn = ({ 
  title, 
  links 
}: { 
  title: string; 
  links: Array<{ name: string; href: string }> 
}) => {
  return (
    <div>
      <h3 className="font-medium text-foreground mb-4">{title}</h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.name}>
            <a 
              href={link.href} 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Footer;
