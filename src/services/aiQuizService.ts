import OpenAI from 'openai';

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  difficulty: string;
  explanation?: string;
}

export interface QuizGenerationParams {
  topic: string;
  subject?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questionCount: number;
  additionalInstructions?: string;
}

export class AIQuizService {
  private openai: OpenAI | null = null;

  constructor(apiKey?: string) {
    if (apiKey) {
      this.openai = new OpenAI({
        apiKey,
        dangerouslyAllowBrowser: true
      });
    }
  }

  setApiKey(apiKey: string) {
    this.openai = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true
    });
  }

  async generateQuiz(params: QuizGenerationParams): Promise<QuizQuestion[]> {
    if (!this.openai) {
      throw new Error('OpenAI API key not provided');
    }

    const prompt = this.buildPrompt(params);

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          {
            role: 'system',
            content: 'You are an expert quiz creator. Generate high-quality multiple-choice questions based on the given parameters. Always return valid JSON format.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 3000
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No response content received');
      }

      // Parse the JSON response
      const parsed = JSON.parse(content);
      return this.formatQuestions(parsed.questions || parsed);
    } catch (error) {
      console.error('Error generating quiz:', error);
      throw new Error('Failed to generate quiz. Please try again.');
    }
  }

  private buildPrompt(params: QuizGenerationParams): string {
    return `Generate ${params.questionCount} multiple-choice quiz questions about "${params.topic}"${params.subject ? ` in the ${params.subject} category` : ''}.

Requirements:
- Difficulty level: ${params.difficulty}
- Each question should have exactly 4 options (A, B, C, D)
- Questions should be challenging but fair for ${params.difficulty} level
- Include varied question types (factual, conceptual, analytical)
- Make distractors plausible but clearly wrong
${params.additionalInstructions ? `- Additional requirements: ${params.additionalInstructions}` : ''}

Return the response in this exact JSON format:
{
  "questions": [
    {
      "question": "Question text here?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correct": 0,
      "explanation": "Brief explanation of why this is correct"
    }
  ]
}

Make sure:
- "correct" is the index (0-3) of the correct answer
- Questions are engaging and educational
- Options are roughly the same length
- No duplicates or overly obvious answers`;
  }

  private formatQuestions(rawQuestions: any[]): QuizQuestion[] {
    return rawQuestions.map((q, index) => ({
      id: index + 1,
      question: q.question,
      options: q.options,
      correct: q.correct,
      difficulty: q.difficulty || 'medium',
      explanation: q.explanation
    }));
  }
}

// Singleton instance
let aiQuizService: AIQuizService | null = null;

export const getAIQuizService = (apiKey?: string): AIQuizService => {
  if (!aiQuizService) {
    aiQuizService = new AIQuizService(apiKey);
  } else if (apiKey) {
    aiQuizService.setApiKey(apiKey);
  }
  return aiQuizService;
};

export default AIQuizService;