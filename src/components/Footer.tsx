import { Brain, Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background/80 backdrop-blur-lg border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 group">
              <Brain className="h-8 w-8 text-primary group-hover:animate-pulse transition-all duration-300" />
              <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                QUIZ.com
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Challenge your mind with AI-powered quizzes. Learn, compete, and grow with thousands of users worldwide.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-muted/20 hover:bg-primary/20 text-muted-foreground hover:text-primary transition-all duration-300"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-muted/20 hover:bg-primary/20 text-muted-foreground hover:text-primary transition-all duration-300"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-muted/20 hover:bg-primary/20 text-muted-foreground hover:text-primary transition-all duration-300"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:contact@quiz.com"
                className="p-2 rounded-lg bg-muted/20 hover:bg-primary/20 text-muted-foreground hover:text-primary transition-all duration-300"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
            <div className="space-y-2">
              <Link
                to="/"
                className="block text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                Home
              </Link>
              <Link
                to="/join"
                className="block text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                Join Quiz
              </Link>
              <Link
                to="/create"
                className="block text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                Create Quiz
              </Link>
              <Link
                to="/leaderboard"
                className="block text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                Leaderboard
              </Link>
              <Link
                to="/profile"
                className="block text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                Profile
              </Link>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Features</h3>
            <div className="space-y-2">
              <span className="block text-muted-foreground">AI-Generated Quizzes</span>
              <span className="block text-muted-foreground">Real-time Multiplayer</span>
              <span className="block text-muted-foreground">Custom Categories</span>
              <span className="block text-muted-foreground">Performance Analytics</span>
              <span className="block text-muted-foreground">Achievement System</span>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Support</h3>
            <div className="space-y-2">
              <Link
                to="/help"
                className="block text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                Help Center
              </Link>
              <Link
                to="/privacy"
                className="block text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="block text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                Terms of Service
              </Link>
              <Link
                to="/contact"
                className="block text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                Contact Us
              </Link>
              <Link
                to="/feedback"
                className="block text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                Send Feedback
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-muted-foreground text-sm">
              © {currentYear} QUIZ.com. All rights reserved.
            </div>
            <div className="flex items-center text-muted-foreground text-sm">
              Made with{' '}
              <Heart className="h-4 w-4 text-red-500 mx-1 animate-pulse" />
              for quiz enthusiasts
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;