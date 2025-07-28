import { useState } from 'react';
import { Brain, Zap, Users, Trophy, Play, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered',
      description: 'Smart question generation'
    },
    {
      icon: Users,
      title: 'Multiplayer',
      description: 'Challenge friends online'
    },
    {
      icon: Zap,
      title: 'Real-time',
      description: 'Instant results & feedback'
    },
    {
      icon: Trophy,
      title: 'Leaderboards',
      description: 'Compete globally'
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-hero overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="text-center animate-fade-in">
          {/* Main Headline */}
          <div className="mb-8">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="h-8 w-8 text-primary mr-3 animate-glow" />
              <span className="text-primary font-semibold text-lg">The Future of Quizzing</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Challenge Your Friends.
              </span>
              <br />
              <span className="text-foreground">
                Test Your Knowledge.
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Experience the most engaging quiz platform with AI-powered questions, 
              real-time multiplayer battles, and intelligent performance analytics.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button 
              size="lg"
              className="btn-gradient text-lg px-8 py-4 h-auto group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Play className={`mr-2 h-6 w-6 transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`} />
              Start Quiz Now
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="btn-glass text-lg px-8 py-4 h-auto"
            >
              <Brain className="mr-2 h-6 w-6" />
              Try AI Quiz
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-scale-in" style={{ animationDelay: '0.3s' }}>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={feature.title}
                  className="quiz-card relative group"
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  <div className="quiz-card-glow" />
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stats Section */}
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">10K+</div>
              <div className="text-muted-foreground">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">50K+</div>
              <div className="text-muted-foreground">Quizzes Created</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">1M+</div>
              <div className="text-muted-foreground">Questions Answered</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;