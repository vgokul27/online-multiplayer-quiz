import { useState, useEffect } from 'react';
import { Brain, Sparkles, Zap, RefreshCw, Save, X, Key, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { getAIQuizService, QuizQuestion } from '@/services/aiQuizService';
import { useToast } from '@/hooks/use-toast';

interface AIGenerateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIGenerateModal = ({ isOpen, onClose }: AIGenerateModalProps) => {
  const [topic, setTopic] = useState('');
  const [subject, setSubject] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [questionCount, setQuestionCount] = useState('10');
  const [additionalInstructions, setAdditionalInstructions] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState<QuizQuestion[]>([]);
  const [error, setError] = useState('');
  const { toast } = useToast();

  const subjects = [
    'Science', 'History', 'Geography', 'Literature', 'Math', 
    'Sports', 'Movies', 'Music', 'Technology', 'General Knowledge'
  ];

  const handleGenerate = async () => {
    if (!apiKey.trim()) {
      setError('Please enter your OpenAI API key');
      return;
    }

    if (!topic.trim()) {
      setError('Please enter a topic');
      return;
    }

    if (!difficulty) {
      setError('Please select a difficulty level');
      return;
    }

    setIsGenerating(true);
    setError('');
    
    try {
      const aiService = getAIQuizService(apiKey);
      const questions = await aiService.generateQuiz({
        topic,
        subject,
        difficulty: difficulty as 'easy' | 'medium' | 'hard',
        questionCount: parseInt(questionCount),
        additionalInstructions
      });
      
      setGeneratedQuestions(questions);
      
      // Store API key in localStorage for convenience
      localStorage.setItem('openai_api_key', apiKey);
      
      toast({
        title: "Quiz Generated!",
        description: `Successfully generated ${questions.length} questions about ${topic}`,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate quiz';
      setError(errorMessage);
      toast({
        title: "Generation Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = () => {
    if (generatedQuestions.length === 0) {
      toast({
        title: "No Questions",
        description: "Please generate questions before saving",
        variant: "destructive",
      });
      return;
    }

    // Save quiz to localStorage or handle as needed
    const quiz = {
      title: `${topic} Quiz`,
      description: `AI-generated quiz about ${topic}`,
      subject,
      difficulty,
      questions: generatedQuestions,
      createdAt: new Date().toISOString()
    };
    
    // Store in localStorage for now
    const savedQuizzes = JSON.parse(localStorage.getItem('saved_quizzes') || '[]');
    savedQuizzes.push(quiz);
    localStorage.setItem('saved_quizzes', JSON.stringify(savedQuizzes));
    
    toast({
      title: "Quiz Saved!",
      description: `Your ${topic} quiz has been saved successfully`,
    });
    
    onClose();
  };

  // Load API key from localStorage on component mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem('openai_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto glass-card border-primary/20">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl font-bold">
            <Brain className="h-6 w-6 mr-2 text-primary animate-glow" />
            AI Quiz Generator
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Configuration Panel */}
          <div className="space-y-6">
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-primary" />
                Quiz Configuration
              </h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="apiKey" className="flex items-center">
                    <Key className="h-4 w-4 mr-2" />
                    OpenAI API Key
                  </Label>
                  <Input
                    id="apiKey"
                    type="password"
                    placeholder="sk-..."
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Your API key is stored locally and never sent to our servers
                  </p>
                </div>

                <div>
                  <Label htmlFor="topic">Topic/Subject</Label>
                  <Input
                    id="topic"
                    placeholder="e.g., Ancient History, Quantum Physics..."
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="subject">Subject Category</Label>
                  <Select value={subject} onValueChange={setSubject}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subjectItem) => (
                        <SelectItem key={subjectItem} value={subjectItem.toLowerCase()}>
                          {subjectItem}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <Select value={difficulty} onValueChange={setDifficulty}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="count">Question Count</Label>
                    <Select value={questionCount} onValueChange={setQuestionCount}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 Questions</SelectItem>
                        <SelectItem value="10">10 Questions</SelectItem>
                        <SelectItem value="15">15 Questions</SelectItem>
                        <SelectItem value="20">20 Questions</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Additional Instructions</Label>
                  <Textarea
                    id="description"
                    placeholder="Any specific requirements or focus areas..."
                    value={additionalInstructions}
                    onChange={(e) => setAdditionalInstructions(e.target.value)}
                    className="mt-1"
                    rows={3}
                  />
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button 
                  onClick={handleGenerate}
                  disabled={!topic || !difficulty || !apiKey || isGenerating}
                  className="w-full btn-gradient"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Generating Questions...
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      Generate Quiz
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Generated Questions Preview */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-primary" />
              Generated Questions Preview
            </h3>

            {isGenerating ? (
              <div className="glass-card p-8 text-center">
                <Brain className="h-12 w-12 mx-auto text-primary animate-glow mb-4" />
                <p className="text-muted-foreground">AI is crafting your questions...</p>
              </div>
            ) : generatedQuestions.length > 0 ? (
              <div className="space-y-4">
                {generatedQuestions.map((question, index) => (
                  <div key={question.id} className="glass-card p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm text-primary">Question {index + 1}</h4>
                      <span className="text-xs text-muted-foreground capitalize">{question.difficulty}</span>
                    </div>
                    <p className="font-medium mb-3">{question.question}</p>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      {question.options.map((option: string, optIndex: number) => (
                        <div 
                          key={optIndex}
                          className={`p-2 rounded text-sm ${
                            optIndex === question.correct 
                              ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                              : 'bg-muted/50 text-muted-foreground'
                          }`}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                    {question.explanation && (
                      <div className="text-xs text-muted-foreground bg-muted/30 p-2 rounded">
                        <strong>Explanation:</strong> {question.explanation}
                      </div>
                    )}
                  </div>
                ))}

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleGenerate}
                    variant="outline"
                    className="flex-1 btn-glass"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Regenerate
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="flex-1 btn-gradient"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Quiz
                  </Button>
                </div>
              </div>
            ) : (
              <div className="glass-card p-8 text-center">
                <Brain className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Configure your quiz settings and click generate to see AI-powered questions</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIGenerateModal;