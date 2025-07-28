import { useState } from 'react';
import { Trophy, Medal, Crown, Star, TrendingUp, Users, Clock, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Leaderboard = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [timeframe, setTimeframe] = useState('weekly');

  const globalLeaders = [
    {
      rank: 1,
      name: 'Alex Chen',
      avatar: '👨‍💻',
      score: 15420,
      accuracy: 94.5,
      quizzesCompleted: 156,
      streak: 12,
      badge: 'Quiz Master'
    },
    {
      rank: 2,
      name: 'Sarah Johnson',
      avatar: '👩‍🔬',
      score: 14890,
      accuracy: 91.2,
      quizzesCompleted: 142,
      streak: 8,
      badge: 'Science Expert'
    },
    {
      rank: 3,
      name: 'Miguel Rodriguez',
      avatar: '👨‍🎓',
      score: 14350,
      accuracy: 89.8,
      quizzesCompleted: 138,
      streak: 15,
      badge: 'History Buff'
    },
    {
      rank: 4,
      name: 'Emily Wang',
      avatar: '👩‍🏫',
      score: 13920,
      accuracy: 92.1,
      quizzesCompleted: 129,
      streak: 6,
      badge: 'Math Whiz'
    },
    {
      rank: 5,
      name: 'David Kim',
      avatar: '👨‍🎨',
      score: 13580,
      accuracy: 88.7,
      quizzesCompleted: 134,
      streak: 9,
      badge: 'Art Connoisseur'
    }
  ];

  const topQuizzes = [
    {
      title: 'Ultimate Science Challenge',
      creator: 'Dr. Smith',
      plays: 2847,
      avgScore: 78.5,
      difficulty: 'Hard',
      rating: 4.8
    },
    {
      title: 'World History Marathon',
      creator: 'HistoryTeacher',
      plays: 2156,
      avgScore: 72.3,
      difficulty: 'Medium',
      rating: 4.7
    },
    {
      title: 'Pop Culture Lightning',
      creator: 'QuizMaster99',
      plays: 3421,
      avgScore: 85.2,
      difficulty: 'Easy',
      rating: 4.6
    }
  ];

  const achievements = [
    {
      icon: Crown,
      title: 'Quiz Royalty',
      description: 'Win 50 consecutive quizzes',
      rarity: 'Legendary',
      holders: 12
    },
    {
      icon: Target,
      title: 'Perfect Accuracy',
      description: '100% accuracy in 10 quizzes',
      rarity: 'Epic',
      holders: 45
    },
    {
      icon: TrendingUp,
      title: 'Rising Star',
      description: 'Climb 100 ranks in a week',
      rarity: 'Rare',
      holders: 156
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-6 w-6 text-yellow-400" />;
      case 2: return <Medal className="h-6 w-6 text-gray-400" />;
      case 3: return <Medal className="h-6 w-6 text-amber-600" />;
      default: return <span className="text-2xl font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Legendary': return 'text-yellow-400 bg-yellow-400/20';
      case 'Epic': return 'text-purple-400 bg-purple-400/20';
      case 'Rare': return 'text-blue-400 bg-blue-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-hero">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <Trophy className="h-12 w-12 text-primary animate-glow mr-4" />
            <h1 className="text-4xl font-bold">
              <span className="bg-gradient-primary bg-clip-text text-transparent">Leaderboard</span>
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Compete with quiz masters from around the world and climb the ranks
          </p>
        </div>

        <Tabs defaultValue="global" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 glass-card">
            <TabsTrigger value="global" className="flex items-center">
              <Trophy className="h-4 w-4 mr-2" />
              Global Rankings
            </TabsTrigger>
            <TabsTrigger value="quizzes" className="flex items-center">
              <Star className="h-4 w-4 mr-2" />
              Top Quizzes
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center">
              <Medal className="h-4 w-4 mr-2" />
              Achievements
            </TabsTrigger>
          </TabsList>

          {/* Global Rankings */}
          <TabsContent value="global" className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              <div className="flex gap-4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48 glass-card">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="history">History</SelectItem>
                    <SelectItem value="geography">Geography</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={timeframe} onValueChange={setTimeframe}>
                  <SelectTrigger className="w-32 glass-card">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="alltime">All Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Top 3 Podium */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {globalLeaders.slice(0, 3).map((leader, index) => (
                <Card 
                  key={leader.rank}
                  className={`glass-card text-center animate-scale-in ${
                    leader.rank === 1 ? 'border-yellow-400/50 scale-105' : 'border-primary/20'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-center mb-2">
                      {getRankIcon(leader.rank)}
                    </div>
                    <div className="text-4xl mb-2">{leader.avatar}</div>
                    <CardTitle className="text-xl">{leader.name}</CardTitle>
                    <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getRarityColor('Epic')}`}>
                      {leader.badge}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-2xl font-bold text-primary">{leader.score.toLocaleString()}</div>
                        <div className="text-muted-foreground">Score</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-400">{leader.accuracy}%</div>
                        <div className="text-muted-foreground">Accuracy</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold">{leader.quizzesCompleted}</div>
                        <div className="text-muted-foreground">Quizzes</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-orange-400">{leader.streak}</div>
                        <div className="text-muted-foreground">Streak</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Rest of Rankings */}
            <Card className="glass-card border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-primary" />
                  Full Rankings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {globalLeaders.slice(3).map((leader, index) => (
                    <div 
                      key={leader.rank}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors duration-300"
                    >
                      <div className="flex items-center space-x-4">
                        <span className="text-2xl font-bold text-muted-foreground w-8">#{leader.rank}</span>
                        <span className="text-2xl">{leader.avatar}</span>
                        <div>
                          <div className="font-semibold">{leader.name}</div>
                          <div className="text-sm text-muted-foreground">{leader.badge}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6 text-sm">
                        <div className="text-center">
                          <div className="font-bold text-primary">{leader.score.toLocaleString()}</div>
                          <div className="text-muted-foreground">Score</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-green-400">{leader.accuracy}%</div>
                          <div className="text-muted-foreground">Accuracy</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold">{leader.quizzesCompleted}</div>
                          <div className="text-muted-foreground">Quizzes</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Top Quizzes */}
          <TabsContent value="quizzes" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {topQuizzes.map((quiz, index) => (
                <Card 
                  key={quiz.title}
                  className="glass-card border-primary/20 hover:scale-105 transition-transform duration-300 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <CardTitle className="text-lg">{quiz.title}</CardTitle>
                    <div className="text-sm text-muted-foreground">by {quiz.creator}</div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="font-bold text-primary">{quiz.plays.toLocaleString()}</div>
                        <div className="text-muted-foreground">Plays</div>
                      </div>
                      <div>
                        <div className="font-bold text-green-400">{quiz.avgScore}%</div>
                        <div className="text-muted-foreground">Avg Score</div>
                      </div>
                      <div>
                        <div className={`font-bold ${
                          quiz.difficulty === 'Hard' ? 'text-red-400' :
                          quiz.difficulty === 'Medium' ? 'text-yellow-400' : 'text-green-400'
                        }`}>
                          {quiz.difficulty}
                        </div>
                        <div className="text-muted-foreground">Difficulty</div>
                      </div>
                      <div>
                        <div className="font-bold text-yellow-400">⭐ {quiz.rating}</div>
                        <div className="text-muted-foreground">Rating</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Achievements */}
          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <Card 
                    key={achievement.title}
                    className="glass-card border-primary/20 text-center animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardHeader>
                      <div className="flex justify-center mb-4">
                        <div className="p-4 rounded-full bg-gradient-primary">
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      <CardTitle className="text-xl">{achievement.title}</CardTitle>
                      <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getRarityColor(achievement.rarity)}`}>
                        {achievement.rarity}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{achievement.description}</p>
                      <div className="text-sm">
                        <span className="font-bold text-primary">{achievement.holders}</span>
                        <span className="text-muted-foreground"> players have this achievement</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Leaderboard;