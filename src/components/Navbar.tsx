import { useState } from 'react';
import { Menu, X, Brain, Trophy, Users, PlusCircle, Home, User, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Join Quiz', href: '/join', icon: Users },
    { name: 'Create Quiz', href: '/create', icon: PlusCircle },
    { name: 'Leaderboard', href: '/leaderboard', icon: Trophy },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <Brain className="h-8 w-8 text-primary group-hover:animate-glow transition-all duration-300" />
              <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                QUIZ.com
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`nav-link ${isActive(link.href) ? 'text-primary' : ''}`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex items-center space-x-4 ml-4">
                {isAuthenticated ? (
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-muted-foreground">
                      Welcome, {user?.username || 'User'}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="btn-glass"
                      onClick={() => navigate('/profile')}
                    >
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-400 border-red-400/20 hover:bg-red-400/10"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      className="btn-glass"
                      onClick={() => navigate('/login')}
                    >
                      Login
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="btn-glass"
                      onClick={() => navigate('/profile')}
                    >
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Hamburger Menu */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2"
              >
                {isSidebarOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-80 z-50 bg-background/95 backdrop-blur-lg border-r border-border
        transform transition-transform duration-300 ease-out md:hidden
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between mb-8">
            <Link to="/" className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                QUIZ.com
              </span>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSidebarOpen(false)}
              className="p-2"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Sidebar Navigation */}
          <div className="space-y-4 mb-8">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`
                    flex items-center space-x-3 p-3 rounded-lg transition-all duration-300
                    hover:bg-primary/10 hover:text-primary
                    ${isActive(link.href) ? 'bg-primary/20 text-primary' : 'text-foreground/80'}
                  `}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Sidebar Auth Buttons */}
          <div className="space-y-3">
            {isAuthenticated ? (
              <>
                <div className="text-center text-sm text-muted-foreground mb-4">
                  Welcome, {user?.username || 'User'}
                </div>
                <Button
                  variant="outline"
                  className="w-full btn-glass"
                  onClick={() => {
                    navigate('/profile');
                    setIsSidebarOpen(false);
                  }}
                >
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
                <Button
                  variant="outline"
                  className="w-full text-red-400 border-red-400/20 hover:bg-red-400/10"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  className="w-full btn-glass"
                  onClick={() => {
                    navigate('/login');
                    setIsSidebarOpen(false);
                  }}
                >
                  Login
                </Button>
                <Button
                  variant="outline"
                  className="w-full btn-glass"
                  onClick={() => {
                    navigate('/profile');
                    setIsSidebarOpen(false);
                  }}
                >
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;