import { AuthResponse, User, Quiz, QuizQuestion } from './aiQuizService';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Types for API requests
export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  username: string;
  email: string;
  password: string;
}

export interface CreateQuizRequest {
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questions: QuizQuestion[];
  isPublic?: boolean;
}

export interface GenerateQuizRequest {
  topic: string;
  subject?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questionCount: number;
  additionalInstructions?: string;
}

// API Error class
export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message);
    this.name = 'APIError';
  }
}

// Helper function to get auth token
const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

// Helper function to make authenticated requests
const makeRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = getAuthToken();
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new APIError(
        errorData.message || `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        errorData
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError('Network error or server unavailable', 0);
  }
};

// Authentication API
export const authAPI = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await makeRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    // Store token in localStorage
    localStorage.setItem('authToken', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    
    return response;
  },

  async signup(userData: SignupRequest): Promise<AuthResponse> {
    const response = await makeRequest<AuthResponse>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    // Store token in localStorage
    localStorage.setItem('authToken', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    
    return response;
  },

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated(): boolean {
    return !!getAuthToken();
  },
};

// Quiz API
export const quizAPI = {
  async createQuiz(quizData: CreateQuizRequest): Promise<Quiz> {
    return makeRequest<Quiz>('/quizzes', {
      method: 'POST',
      body: JSON.stringify(quizData),
    });
  },

  async getQuizzes(): Promise<{ quizzes: Quiz[]; totalPages: number; currentPage: number; total: number }> {
    return makeRequest<{ quizzes: Quiz[]; totalPages: number; currentPage: number; total: number }>('/quizzes');
  },

  async getQuizById(id: string): Promise<Quiz> {
    return makeRequest<Quiz>(`/quizzes/${id}`);
  },

  async updateQuiz(id: string, quizData: Partial<CreateQuizRequest>): Promise<Quiz> {
    return makeRequest<Quiz>(`/quizzes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(quizData),
    });
  },

  async deleteQuiz(id: string): Promise<void> {
    return makeRequest<void>(`/quizzes/${id}`, {
      method: 'DELETE',
    });
  },

  async generateQuiz(params: GenerateQuizRequest): Promise<{ quiz: string }> {
    return makeRequest<{ quiz: string }>('/quizzes/generate', {
      method: 'POST',
      body: JSON.stringify({ topic: params.topic }),
    });
  },

  async joinQuiz(quizId: string): Promise<Quiz> {
    return makeRequest<Quiz>(`/quizzes/${quizId}/join`, {
      method: 'POST',
    });
  },

  async submitAnswer(quizId: string, questionId: number, answer: number): Promise<{ correct: boolean; score: number }> {
    return makeRequest<{ correct: boolean; score: number }>(`/quizzes/${quizId}/answer`, {
      method: 'POST',
      body: JSON.stringify({ questionId, answer }),
    });
  },
};

// User API
export const userAPI = {
  async getProfile(): Promise<User> {
    return makeRequest<User>('/users/profile');
  },

  async updateProfile(userData: Partial<User>): Promise<User> {
    return makeRequest<User>('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },

  async getLeaderboard(): Promise<Array<{ user: User; score: number; rank: number }>> {
    return makeRequest<Array<{ user: User; score: number; rank: number }>>('/users/leaderboard');
  },
};

// Export all APIs
export const api = {
  auth: authAPI,
  quiz: quizAPI,
  user: userAPI,
};

export default api;
