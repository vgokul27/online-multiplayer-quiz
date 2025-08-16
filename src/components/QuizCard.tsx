import { Clock, Users, Trophy, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface QuizCardProps {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'easy' | 'medium' | 'hard';
  duration?: number;
  players?: number;
  category: string;
  isAI?: boolean;
  onJoin?: () => void;
}

const QuizCard = ({
  id,
  title,
  description,
  difficulty,
  duration = 15,
  players = 0,
  category,
  isAI = false,
  onJoin
}: QuizCardProps) => {
  const navigate = useNavigate();
  const getDifficultyColor = (level: string) => {
    const normalizedLevel = level.toLowerCase();
    switch (normalizedLevel) {
      case 'easy': return 'text-green-400 bg-green-400/20';
      case 'medium': return 'text-yellow-400 bg-yellow-400/20';
      case 'hard': return 'text-red-400 bg-red-400/20';
      default: return 'text-primary bg-primary/20';
    }
  };

  return (
    <div className="quiz-card group relative animate-scale-in">
      <div className="quiz-card-glow" />
      
      {/* AI Badge */}
      {isAI && (
        <div className="absolute -top-2 -right-2 bg-gradient-primary text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
          <Brain className="h-3 w-3 mr-1" />
          AI Powered
        </div>
      )}

      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-primary">{category}</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(difficulty)}`}>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1).toLowerCase()}
          </span>
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {description}
        </p>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between mb-6 text-sm text-muted-foreground">
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          {duration} min
        </div>
        <div className="flex items-center">
          <Users className="h-4 w-4 mr-1" />
          {players} players
        </div>
        <div className="flex items-center">
          <Trophy className="h-4 w-4 mr-1" />
          Ranked
        </div>
      </div>

      {/* Join Button */}
      <Button 
        className="w-full btn-gradient group-hover:scale-105 transition-transform duration-300"
        onClick={onJoin || (() => navigate(`/play/${id}`))}
      >
        Join Quiz
      </Button>
    </div>
  );
};

export default QuizCard;