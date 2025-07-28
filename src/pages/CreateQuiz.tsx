import { useState } from 'react';
import { Brain, Plus, Settings, Save, Eye, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AIGenerateModal from '@/components/AIGenerateModal';

const CreateQuiz = () => {
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: '',
      options: ['', '', '', ''],
      correct: 0,
      timeLimit: 30
    }
  ]);

  const addQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      question: '',
      options: ['', '', '', ''],
      correct: 0,
      timeLimit: 30
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (id: number, field: string, value: any) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  const updateOption = (questionId: number, optionIndex: number, value: string) => {
    setQuestions(questions.map(q => 
      q.id === questionId 
        ? { ...q, options: q.options.map((opt, idx) => idx === optionIndex ? value : opt) }
        : q
    ));
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-hero">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">Create Quiz</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Build engaging quizzes manually or let our AI generate questions for you
          </p>
        </div>

        <Tabs defaultValue="manual" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 glass-card">
            <TabsTrigger value="manual" className="flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              Manual Creation
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center">
              <Brain className="h-4 w-4 mr-2" />
              AI-Powered
            </TabsTrigger>
          </TabsList>

          {/* Manual Creation Tab */}
          <TabsContent value="manual" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Quiz Settings */}
              <div className="lg:col-span-1">
                <Card className="glass-card border-primary/20 sticky top-24">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Settings className="h-5 w-5 mr-2 text-primary" />
                      Quiz Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="title">Quiz Title</Label>
                      <Input
                        id="title"
                        placeholder="Enter quiz title..."
                        value={quizTitle}
                        onChange={(e) => setQuizTitle(e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your quiz..."
                        value={quizDescription}
                        onChange={(e) => setQuizDescription(e.target.value)}
                        className="mt-1"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="science">Science</SelectItem>
                          <SelectItem value="history">History</SelectItem>
                          <SelectItem value="geography">Geography</SelectItem>
                          <SelectItem value="literature">Literature</SelectItem>
                          <SelectItem value="sports">Sports</SelectItem>
                          <SelectItem value="entertainment">Entertainment</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="difficulty">Difficulty</Label>
                      <Select>
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

                    <div className="flex gap-2 pt-4">
                      <Button variant="outline" className="flex-1 btn-glass">
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                      <Button className="flex-1 btn-gradient">
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Questions */}
              <div className="lg:col-span-2 space-y-6">
                {questions.map((question, index) => (
                  <Card key={question.id} className="glass-card border-primary/20 animate-scale-in">
                    <CardHeader>
                      <CardTitle className="text-lg">Question {index + 1}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor={`question-${question.id}`}>Question</Label>
                        <Textarea
                          id={`question-${question.id}`}
                          placeholder="Enter your question..."
                          value={question.question}
                          onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
                          className="mt-1"
                          rows={2}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {question.options.map((option, optIndex) => (
                          <div key={optIndex}>
                            <Label htmlFor={`option-${question.id}-${optIndex}`}>
                              Option {optIndex + 1}
                              {question.correct === optIndex && (
                                <span className="ml-2 text-green-400 text-xs">(Correct)</span>
                              )}
                            </Label>
                            <Input
                              id={`option-${question.id}-${optIndex}`}
                              placeholder={`Option ${optIndex + 1}...`}
                              value={option}
                              onChange={(e) => updateOption(question.id, optIndex, e.target.value)}
                              className={`mt-1 ${question.correct === optIndex ? 'border-green-400' : ''}`}
                            />
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor={`correct-${question.id}`}>Correct Answer</Label>
                          <Select
                            value={question.correct.toString()}
                            onValueChange={(value) => updateQuestion(question.id, 'correct', parseInt(value))}
                          >
                            <SelectTrigger className="w-32 mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">Option 1</SelectItem>
                              <SelectItem value="1">Option 2</SelectItem>
                              <SelectItem value="2">Option 3</SelectItem>
                              <SelectItem value="3">Option 4</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor={`time-${question.id}`}>Time Limit (seconds)</Label>
                          <Select
                            value={question.timeLimit.toString()}
                            onValueChange={(value) => updateQuestion(question.id, 'timeLimit', parseInt(value))}
                          >
                            <SelectTrigger className="w-32 mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="15">15s</SelectItem>
                              <SelectItem value="30">30s</SelectItem>
                              <SelectItem value="45">45s</SelectItem>
                              <SelectItem value="60">60s</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Button 
                  onClick={addQuestion}
                  variant="outline"
                  className="w-full btn-glass py-8 text-lg"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Another Question
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* AI Creation Tab */}
          <TabsContent value="ai" className="space-y-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="glass-card p-12 animate-scale-in">
                <Brain className="h-16 w-16 mx-auto text-primary animate-glow mb-6" />
                <h2 className="text-3xl font-bold mb-4">
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    AI Quiz Generator
                  </span>
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Let our advanced AI create engaging, contextual questions tailored to your topic and difficulty preferences.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <Sparkles className="h-8 w-8 mx-auto text-primary mb-2" />
                    <h3 className="font-semibold mb-1">Smart Generation</h3>
                    <p className="text-sm text-muted-foreground">Contextually relevant questions</p>
                  </div>
                  <div className="text-center">
                    <Settings className="h-8 w-8 mx-auto text-primary mb-2" />
                    <h3 className="font-semibold mb-1">Customizable</h3>
                    <p className="text-sm text-muted-foreground">Choose topic, difficulty & count</p>
                  </div>
                  <div className="text-center">
                    <Eye className="h-8 w-8 mx-auto text-primary mb-2" />
                    <h3 className="font-semibold mb-1">Preview & Edit</h3>
                    <p className="text-sm text-muted-foreground">Review before saving</p>
                  </div>
                </div>

                <Button 
                  onClick={() => setIsAIModalOpen(true)}
                  className="btn-gradient text-lg px-8 py-4"
                >
                  <Brain className="h-5 w-5 mr-2" />
                  Generate AI Quiz
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <AIGenerateModal 
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
      />
    </div>
  );
};

export default CreateQuiz;