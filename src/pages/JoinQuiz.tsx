import { useState } from 'react';
import { Search, Filter, Users, Clock, Trophy, Brain, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import QuizCard from '@/components/QuizCard';

const JoinQuiz = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const quizzes = [
    {
      id: '1',
      title: 'AI vs Human Challenge',
      description: 'Test your wits against our advanced AI in this epic battle of knowledge across multiple subjects.',
      difficulty: 'Medium' as const,
      duration: 15,
      players: 1,
      category: 'AI Battle',
      isAI: true
    },
    {
      id: '2',
      title: 'Quick Science Facts',
      description: 'Fast-paced quiz covering basic scientific principles, discoveries, and modern innovations.',
      difficulty: 'Easy' as const,
      duration: 10,
      players: 247,
      category: 'Science'
    },
    {
      id: '3',
      title: 'World Geography Expert',
      description: 'Challenging questions about countries, capitals, landmarks, and geographical features worldwide.',
      difficulty: 'Hard' as const,
      duration: 25,
      players: 89,
      category: 'Geography'
    },
    {
      id: '4',
      title: 'Movie Trivia Night',
      description: 'Test your knowledge of Hollywood classics, recent blockbusters, and cinema history.',
      difficulty: 'Medium' as const,
      duration: 20,
      players: 156,
      category: 'Entertainment'
    },
    {
      id: '5',
      title: 'Math Mastery',
      description: 'Prove your mathematical skills with problems ranging from basic arithmetic to advanced calculus.',
      difficulty: 'Hard' as const,
      duration: 30,
      players: 34,
      category: 'Mathematics'
    },
    {
      id: '6',
      title: 'Sports Legends Quiz',
      description: 'Everything about sports history, famous athletes, records, and memorable moments.',
      difficulty: 'Medium' as const,
      duration: 18,
      players: 112,
      category: 'Sports'
    }
  ];

  const categories = [
    'All Categories', 'AI Battle', 'Science', 'History', 'Geography', 
    'Mathematics', 'Entertainment', 'Sports', 'Literature', 'Technology'
  ];

  const difficulties = ['All Difficulties', 'Easy', 'Medium', 'Hard'];

  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quiz.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || quiz.category.toLowerCase() === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || quiz.difficulty.toLowerCase() === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <div className="min-h-screen pt-20 bg-gradient-hero">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">Join a Quiz</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover and join exciting quizzes from our community or challenge our AI
          </p>
        </div>

        {/* AI Battle Highlight */}
        <div className="glass-card p-8 mb-12 text-center animate-scale-in border-primary/30">
          <div className="flex items-center justify-center mb-4">
            <Brain className="h-12 w-12 text-primary animate-glow mr-4" />
            <div>
              <h2 className="text-2xl font-bold text-foreground">Challenge Our AI</h2>
              <p className="text-muted-foreground">Experience the future of quizzing</p>
            </div>
          </div>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our advanced AI adapts to your skill level, providing personalized questions 
            that challenge you just enough to keep learning fun and engaging.
          </p>
          <Button 
            onClick={() => window.location.href = '/play/1'}
            className="btn-gradient text-lg px-8 py-4"
          >
            <Zap className="h-5 w-5 mr-2" />
            Start AI Battle
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="glass-card p-6 mb-8 animate-scale-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search quizzes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="md:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem 
                    key={category} 
                    value={category === 'All Categories' ? 'all' : category.toLowerCase()}
                  >
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Difficulty Filter */}
            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger className="md:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {difficulties.map((difficulty) => (
                  <SelectItem 
                    key={difficulty} 
                    value={difficulty === 'All Difficulties' ? 'all' : difficulty.toLowerCase()}
                  >
                    {difficulty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" className="btn-glass">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Quiz Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredQuizzes.map((quiz, index) => (
            <div 
              key={quiz.id}
              className="animate-scale-in"
              style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
            >
              <QuizCard {...quiz} />
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredQuizzes.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <Search className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-2xl font-semibold mb-2 text-foreground">No quizzes found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search terms or filters to find more quizzes.
            </p>
            <Button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedDifficulty('all');
              }}
              variant="outline"
              className="btn-glass"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Load More */}
        {filteredQuizzes.length > 0 && (
          <div className="text-center animate-fade-in">
            <Button variant="outline" className="btn-glass px-8 py-3">
              Load More Quizzes
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JoinQuiz;