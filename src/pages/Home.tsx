import HeroSection from '@/components/HeroSection';
import QuizCard from '@/components/QuizCard';
import { Brain, Trophy, Zap, Users, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const featuredQuizzes = [
    {
      id: '1',
      title: 'AI Science Challenge',
      description: 'Test your knowledge of artificial intelligence, machine learning, and computer science fundamentals.',
      difficulty: 'Medium' as const,
      duration: 15,
      players: 1247,
      category: 'Technology',
      isAI: true
    },
    {
      id: '2',
      title: 'World History Masters',
      description: 'Journey through ancient civilizations, world wars, and historical milestones.',
      difficulty: 'Hard' as const,
      duration: 20,
      players: 892,
      category: 'History'
    },
    {
      id: '3',
      title: 'Pop Culture Lightning',
      description: 'Quick-fire questions about movies, music, celebrities, and trending topics.',
      difficulty: 'Easy' as const,
      duration: 10,
      players: 2156,
      category: 'Entertainment'
    },
    {
      id: '4',
      title: 'Math Olympiad',
      description: 'Challenge your mathematical prowess with problems ranging from algebra to calculus.',
      difficulty: 'Hard' as const,
      duration: 25,
      players: 567,
      category: 'Mathematics'
    }
  ];

  const aiFeatures = [
    {
      icon: Brain,
      title: 'Smart Question Generation',
      description: 'Our AI creates unique, contextual questions tailored to your knowledge level and interests.'
    },
    {
      icon: Users,
      title: '1-on-1 AI Battles',
      description: 'Challenge our advanced AI opponent that adapts to your skill level for the perfect match.'
    },
    {
      icon: TrendingUp,
      title: 'Performance Analytics',
      description: 'Deep insights into your strengths, weaknesses, and learning patterns with visual progress tracking.'
    },
    {
      icon: Zap,
      title: 'Anti-Cheat System',
      description: 'Advanced AI monitoring ensures fair play and authentic quiz experiences for everyone.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Quizzes Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-primary bg-clip-text text-transparent">Featured Quizzes</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover popular quizzes created by our community and powered by AI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {featuredQuizzes.map((quiz, index) => (
              <div 
                key={quiz.id}
                className="animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <QuizCard {...quiz} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <button 
              onClick={() => navigate('/join')}
              className="btn-glass px-8 py-3 font-medium hover:scale-105 transition-transform duration-300"
            >
              <Trophy className="mr-2 h-5 w-5" />
              View All Quizzes
            </button>
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <div className="flex items-center justify-center mb-4">
              <Brain className="h-8 w-8 text-primary mr-3 animate-glow" />
              <span className="text-primary font-semibold text-lg">AI-Powered Intelligence</span>
            </div>
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Next-Generation Quiz Experience
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the future of online quizzing with our advanced AI features designed to enhance learning and engagement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {aiFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={feature.title}
                  className="text-center animate-scale-in"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="glass-card p-6 group hover:scale-105 transition-all duration-300">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-4 group-hover:animate-glow">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3 text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">
              Ready to <span className="bg-gradient-primary bg-clip-text text-transparent">Challenge Yourself</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of quiz enthusiasts and start your journey to becoming a trivia master today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/join')}
                className="btn-gradient text-lg px-8 py-4"
              >
                <Users className="mr-2 h-5 w-5" />
                Join a Quiz
              </button>
              <button 
                onClick={() => navigate('/create')}
                className="btn-glass text-lg px-8 py-4"
              >
                <Brain className="mr-2 h-5 w-5" />
                Create AI Quiz
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;