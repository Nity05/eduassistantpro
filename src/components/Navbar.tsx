import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setTheme, theme } = useTheme();
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 glass-panel"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-display font-bold"
          >
            <span className="text-primary">Career</span>
            <span>Track</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="hidden md:flex items-center space-x-6">
              <NavLink href="/#features">Features</NavLink>
              <NavLink href="/#about">About</NavLink>
              <NavLink href="/#testimonials">Testimonials</NavLink>
              <NavLink href="/#contact">Contact</NavLink>
              {isSignedIn && (
                <NavLink href="/dashboard">Dashboard</NavLink>
              )}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-secondary transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              {isSignedIn ? (
                <UserButton afterSignOutUrl="/" />
              ) : (
                <div className="flex items-center gap-2">
                  <SignInButton mode="modal">
                    <Button variant="ghost">Sign In</Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button>Sign Up</Button>
                  </SignUpButton>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Navigation Icon */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-secondary transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            {isSignedIn && (
              <UserButton afterSignOutUrl="/" />
            )}
            <button
              onClick={toggleMenu}
              className="p-2 rounded-full hover:bg-secondary transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`fixed inset-x-0 top-[var(--navbar-height)] h-[calc(100vh-var(--navbar-height))] glass-panel transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ "--navbar-height": isScrolled ? "56px" : "72px" } as any}
      >
        <div className="flex flex-col items-center gap-6 p-8 text-lg">
          <MobileNavLink href="/#features" onClick={() => setIsMenuOpen(false)}>
            Features
          </MobileNavLink>
          <MobileNavLink href="/#about" onClick={() => setIsMenuOpen(false)}>
            About
          </MobileNavLink>
          <MobileNavLink href="/#testimonials" onClick={() => setIsMenuOpen(false)}>
            Testimonials
          </MobileNavLink>
          <MobileNavLink href="/#contact" onClick={() => setIsMenuOpen(false)}>
            Contact
          </MobileNavLink>
          {isSignedIn && (
            <MobileNavLink href="/dashboard" onClick={() => setIsMenuOpen(false)}>
              Dashboard
            </MobileNavLink>
          )}
          {!isSignedIn ? (
            <>
              <SignInButton mode="modal">
                <Button variant="ghost" className="w-full">Sign In</Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button className="w-full">Sign Up</Button>
              </SignUpButton>
            </>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <a
      href={href}
      className="text-foreground/80 hover:text-foreground transition-colors font-medium relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
    >
      {children}
    </a>
  );
};

const MobileNavLink = ({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className="w-full text-center py-2 text-foreground/80 hover:text-foreground transition-colors font-medium"
    >
      {children}
    </a>
  );
};

export default Navbar;
