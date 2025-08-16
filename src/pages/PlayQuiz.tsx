import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, CheckCircle, XCircle, Brain, Trophy, ArrowRight, Home, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { api, APIError } from '@/services/apiService';
import { Quiz, QuizQuestion } from '@/services/aiQuizService';
import { useSocket, useSocketEvents } from '@/hooks/useSocket';
import LoadingSpinner from '@/components/LoadingSpinner';

const PlayQuiz = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();

  // Socket hooks
  const { isConnected, connect, joinRoom, leaveRoom, sendAnswer } = useSocket();
  const { participants, roomStatus, currentQuestion: socketCurrentQuestion, answers: socketAnswers } = useSocketEvents();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isMultiplayer, setIsMultiplayer] = useState(false);

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  // Load quiz data
  useEffect(() => {
    const loadQuiz = async () => {
      if (!quizId) {
        navigate('/join');
        return;
      }

      setIsLoading(true);
      try {
        const quizData = await api.quiz.getQuizById(quizId);
        setQuiz(quizData);

        // Check if this should be a multiplayer session
        const urlParams = new URLSearchParams(window.location.search);
        const multiplayer = urlParams.get('multiplayer') === 'true';
        setIsMultiplayer(multiplayer);

        if (multiplayer) {
          // Connect to socket and join room
          await connect();
          joinRoom(quizId);
        }
      } catch (error) {
        console.error('Failed to load quiz:', error);
        toast({
          title: "Error",
          description: "Failed to load quiz. Please try again.",
          variant: "destructive",
        });
        navigate('/join');
      } finally {
        setIsLoading(false);
      }
    };

    loadQuiz();
  }, [quizId]);

  // Cleanup socket connection on unmount
  useEffect(() => {
    return () => {
      if (isMultiplayer && quizId) {
        leaveRoom(quizId);
      }
    };
  }, [isMultiplayer, quizId]);

  // Timer effect
  useEffect(() => {
    if (!quiz || quizCompleted || showExplanation) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleNextQuestion();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quiz, quizCompleted, showExplanation, currentQuestionIndex]);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null && timeLeft > 0) return;

    const currentAnswer = selectedAnswer ?? -1;
    const newAnswers = [...answers, currentAnswer];
    setAnswers(newAnswers);

    if (showExplanation) {
      setShowExplanation(false);
      setSelectedAnswer(null);
      
      if (currentQuestionIndex < quiz!.questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setTimeLeft(30);
      } else {
        // Quiz completed
        const finalScore = newAnswers.reduce((score, answer, index) => {
          return score + (answer === quiz!.questions[index].correct ? 1 : 0);
        }, 0);
        setScore(finalScore);
        setQuizCompleted(true);
      }
    } else {
      setShowExplanation(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setTimeLeft(30);
    setQuizCompleted(false);
    setScore(0);
    setShowExplanation(false);
  };

  if (isLoading || !quiz) {
    return (
      <div className="min-h-screen pt-20 bg-gradient-hero flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading quiz..." />
      </div>
    );
  }

  if (quizCompleted) {
    const percentage = Math.round((score / quiz.questions.length) * 100);
    
    return (
      <div className="min-h-screen pt-20 bg-gradient-hero">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="glass-card border-primary/20 text-center">
            <CardHeader>
              <Trophy className="h-16 w-16 mx-auto text-primary mb-4" />
              <CardTitle className="text-3xl">Quiz Completed!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-6xl font-bold text-primary">{percentage}%</div>
              <p className="text-xl text-muted-foreground">
                You scored {score} out of {quiz.questions.length} questions correctly
              </p>
              
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                <div className="glass-card p-4">
                  <div className="text-2xl font-bold text-green-400">{score}</div>
                  <div className="text-sm text-muted-foreground">Correct</div>
                </div>
                <div className="glass-card p-4">
                  <div className="text-2xl font-bold text-red-400">{quiz.questions.length - score}</div>
                  <div className="text-sm text-muted-foreground">Incorrect</div>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <Button onClick={restartQuiz} className="btn-gradient">
                  Try Again
                </Button>
                <Button onClick={() => navigate('/join')} variant="outline" className="btn-glass">
                  <Home className="h-4 w-4 mr-2" />
                  Back to Quizzes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  return (
    <div className="min-h-screen pt-20 bg-gradient-hero">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quiz Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">{quiz.title}</h1>
          <div className="flex items-center justify-center gap-4 text-muted-foreground">
            <span>Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
            <span>•</span>
            <span className="capitalize">{quiz.difficulty}</span>
          </div>
          <Progress value={progress} className="mt-4 max-w-md mx-auto" />
        </div>

        {/* Question Card */}
        <Card className="glass-card border-primary/20 mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
              <div className="flex items-center text-primary">
                <Clock className="h-5 w-5 mr-2" />
                <span className="text-2xl font-bold">{timeLeft}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              {currentQuestion.options.map((option, index) => {
                let buttonClass = "p-4 text-left border-2 rounded-lg transition-all duration-200 ";
                
                if (showExplanation) {
                  if (index === currentQuestion.correct) {
                    buttonClass += "border-green-500 bg-green-500/20 text-green-400";
                  } else if (index === selectedAnswer && index !== currentQuestion.correct) {
                    buttonClass += "border-red-500 bg-red-500/20 text-red-400";
                  } else {
                    buttonClass += "border-muted bg-muted/20 text-muted-foreground";
                  }
                } else {
                  if (selectedAnswer === index) {
                    buttonClass += "border-primary bg-primary/20 text-primary";
                  } else {
                    buttonClass += "border-muted hover:border-primary/50 bg-background hover:bg-primary/10";
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => !showExplanation && handleAnswerSelect(index)}
                    disabled={showExplanation}
                    className={buttonClass}
                  >
                    <div className="flex items-center">
                      <span className="font-semibold mr-3">{String.fromCharCode(65 + index)}.</span>
                      {option}
                      {showExplanation && index === currentQuestion.correct && (
                        <CheckCircle className="h-5 w-5 ml-auto text-green-400" />
                      )}
                      {showExplanation && index === selectedAnswer && index !== currentQuestion.correct && (
                        <XCircle className="h-5 w-5 ml-auto text-red-400" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {showExplanation && currentQuestion.explanation && (
              <div className="mt-6 p-4 bg-muted/20 rounded-lg border border-primary/20">
                <h4 className="font-semibold text-primary mb-2">Explanation:</h4>
                <p className="text-muted-foreground">{currentQuestion.explanation}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Next Button */}
        <div className="text-center">
          <Button
            onClick={handleNextQuestion}
            disabled={!showExplanation && selectedAnswer === null}
            className="btn-gradient px-8 py-3"
          >
            {showExplanation ? (
              currentQuestionIndex < quiz.questions.length - 1 ? (
                <>Next Question <ArrowRight className="h-4 w-4 ml-2" /></>
              ) : (
                <>View Results <Trophy className="h-4 w-4 ml-2" /></>
              )
            ) : (
              "Submit Answer"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlayQuiz;