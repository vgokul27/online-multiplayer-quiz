import { useState } from 'react';
import { User, Trophy, Target, TrendingUp, Clock, Brain, Star, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const userStats = {
    name: 'Alex Chen',
    avatar: '👨‍💻',
    rank: 1,
    score: 15420,
    accuracy: 94.5,
    quizzesCompleted: 156,
    streak: 12,
    badge: 'Quiz Master',
    joinDate: 'March 2024',
    totalTimeSpent: '47h 32m'
  };

  const performanceData = [
    { subject: 'Science', accuracy: 96, quizzes: 45, avgTime: '2m 15s' },
    { subject: 'History', accuracy: 94, quizzes: 32, avgTime: '2m 45s' },
    { subject: 'Geography', accuracy: 92, quizzes: 28, avgTime: '2m 30s' },
    { subject: 'Mathematics', accuracy: 89, quizzes: 25, avgTime: '3m 10s' },
    { subject: 'Literature', accuracy: 91, quizzes: 15, avgTime: '2m 50s' },
    { subject: 'Sports', accuracy: 87, quizzes: 11, avgTime: '1m 55s' }
  ];

  const recentQuizzes = [
    {
      title: 'Advanced Physics',
      score: 95,
      rank: 1,
      participants: 234,
      date: '2 hours ago',
      difficulty: 'Hard'
    },
    {
      title: 'World Geography',
      score: 88,
      rank: 5,
      participants: 156,
      date: '1 day ago',
      difficulty: 'Medium'
    },
    {
      title: 'Movie Classics',
      score: 92,
      rank: 3,
      participants: 89,
      date: '2 days ago',
      difficulty: 'Easy'
    }
  ];

  const achievements = [
    { name: 'Perfect Score', description: '100% accuracy in 5 quizzes', icon: Target, unlocked: true },
    { name: 'Speed Demon', description: 'Complete 10 quizzes under 30 seconds', icon: Clock, unlocked: true },
    { name: 'Quiz Master', description: 'Reach #1 on leaderboard', icon: Trophy, unlocked: true },
    { name: 'Streak Legend', description: '30-day winning streak', icon: Star, unlocked: false },
    { name: 'AI Challenger', description: 'Defeat AI in 10 battles', icon: Brain, unlocked: false },
    { name: 'Knowledge King', description: 'Master all categories', icon: Award, unlocked: false }
  ];

  const getSubjectColor = (accuracy: number) => {
    if (accuracy >= 90) return 'text-green-400';
    if (accuracy >= 80) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400 bg-green-400/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/20';
      case 'Hard': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-hero">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Profile Header */}
        <div className="glass-card p-8 mb-8 animate-fade-in">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar and Basic Info */}
            <div className="text-center md:text-left">
              <div className="text-6xl mb-4">{userStats.avatar}</div>
              <h1 className="text-3xl font-bold mb-2">{userStats.name}</h1>
              <div className="flex items-center justify-center md:justify-start mb-2">
                <Trophy className="h-5 w-5 text-yellow-400 mr-2" />
                <span className="text-primary font-semibold">#{userStats.rank} Global Rank</span>
              </div>
              <div className="inline-block px-3 py-1 rounded-full text-sm font-medium text-purple-400 bg-purple-400/20">
                {userStats.badge}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">{userStats.score.toLocaleString()}</div>
                <div className="text-muted-foreground text-sm">Total Score</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-1">{userStats.accuracy}%</div>
                <div className="text-muted-foreground text-sm">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-1">{userStats.quizzesCompleted}</div>
                <div className="text-muted-foreground text-sm">Quizzes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400 mb-1">{userStats.streak}</div>
                <div className="text-muted-foreground text-sm">Win Streak</div>
              </div>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 glass-card">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Quick Stats */}
              <Card className="glass-card border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                    Quick Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Member Since</span>
                    <span className="font-medium">{userStats.joinDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time Spent</span>
                    <span className="font-medium">{userStats.totalTimeSpent}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Avg. Quiz Time</span>
                    <span className="font-medium">2m 35s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Best Streak</span>
                    <span className="font-medium text-orange-400">18 wins</span>
                  </div>
                </CardContent>
              </Card>

              {/* Subject Strengths */}
              <Card className="glass-card border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="h-5 w-5 mr-2 text-primary" />
                    Subject Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {performanceData.slice(0, 4).map((subject, index) => (
                      <div key={subject.subject} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">{subject.subject}</span>
                          <span className={`font-bold ${getSubjectColor(subject.accuracy)}`}>
                            {subject.accuracy}%
                          </span>
                        </div>
                        <Progress value={subject.accuracy} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <Card className="glass-card border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2 text-primary" />
                  Detailed Performance Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {performanceData.map((subject, index) => (
                    <div 
                      key={subject.subject}
                      className="p-4 rounded-lg bg-muted/20 animate-scale-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold">{subject.subject}</h3>
                        <span className={`text-xl font-bold ${getSubjectColor(subject.accuracy)}`}>
                          {subject.accuracy}%
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Quizzes Taken</div>
                          <div className="font-bold">{subject.quizzes}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Avg. Time</div>
                          <div className="font-bold">{subject.avgTime}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Accuracy</div>
                          <div className={`font-bold ${getSubjectColor(subject.accuracy)}`}>
                            {subject.accuracy}%
                          </div>
                        </div>
                      </div>
                      <Progress value={subject.accuracy} className="h-2 mt-3" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <Card className="glass-card border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-primary" />
                  Recent Quiz History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentQuizzes.map((quiz, index) => (
                    <div 
                      key={quiz.title}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors duration-300 animate-scale-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{quiz.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{quiz.date}</span>
                          <span className={`px-2 py-1 rounded-full ${getDifficultyColor(quiz.difficulty)}`}>
                            {quiz.difficulty}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-primary">{quiz.score}%</div>
                        <div className="text-sm text-muted-foreground">
                          #{quiz.rank} of {quiz.participants}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <Card 
                    key={achievement.name}
                    className={`glass-card text-center animate-scale-in ${
                      achievement.unlocked 
                        ? 'border-primary/20' 
                        : 'border-muted/20 opacity-60'
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardHeader>
                      <div className="flex justify-center mb-4">
                        <div className={`p-4 rounded-full ${
                          achievement.unlocked 
                            ? 'bg-gradient-primary' 
                            : 'bg-muted/20'
                        }`}>
                          <Icon className={`h-8 w-8 ${
                            achievement.unlocked ? 'text-white' : 'text-muted-foreground'
                          }`} />
                        </div>
                      </div>
                      <CardTitle className={`text-xl ${
                        achievement.unlocked ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {achievement.name}
                      </CardTitle>
                      {achievement.unlocked && (
                        <div className="text-green-400 text-sm font-medium">✓ Unlocked</div>
                      )}
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{achievement.description}</p>
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

export default Profile;