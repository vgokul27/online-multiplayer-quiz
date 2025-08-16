import { io, Socket } from 'socket.io-client';

// Socket.IO configuration
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

// Types for socket events
export interface SocketEvents {
  // Client to server events
  joinRoom: (data: { roomId: string; username: string }) => void;
  leaveRoom: (data: { roomId: string; username: string }) => void;
  sendAnswer: (data: { roomId: string; username: string; answer: number; questionId: number }) => void;
  startQuiz: (data: { roomId: string }) => void;
  nextQuestion: (data: { roomId: string }) => void;
  
  // Server to client events
  userJoined: (data: { username: string }) => void;
  userLeft: (data: { username: string }) => void;
  receiveAnswer: (data: { username: string; answer: number; questionId: number }) => void;
  quizStarted: (data: { quiz: any }) => void;
  questionChanged: (data: { questionIndex: number; question: any }) => void;
  quizEnded: (data: { results: any }) => void;
  roomUpdate: (data: { participants: string[]; status: string }) => void;
}

export interface QuizRoom {
  id: string;
  participants: string[];
  status: 'waiting' | 'playing' | 'finished';
  currentQuestion?: number;
  quiz?: any;
}

class SocketService {
  private socket: Socket | null = null;
  private isConnected = false;

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.socket?.connected) {
        resolve();
        return;
      }

      this.socket = io(SOCKET_URL, {
        transports: ['websocket', 'polling'],
        timeout: 5000,
      });

      this.socket.on('connect', () => {
        console.log('🟢 Connected to server:', this.socket?.id);
        this.isConnected = true;
        resolve();
      });

      this.socket.on('disconnect', () => {
        console.log('🔴 Disconnected from server');
        this.isConnected = false;
      });

      this.socket.on('connect_error', (error) => {
        console.error('❌ Connection error:', error);
        this.isConnected = false;
        reject(error);
      });
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  // Room management
  joinRoom(roomId: string, username: string): void {
    if (!this.socket) throw new Error('Socket not connected');
    this.socket.emit('joinRoom', { roomId, username });
  }

  leaveRoom(roomId: string, username: string): void {
    if (!this.socket) throw new Error('Socket not connected');
    this.socket.emit('leaveRoom', { roomId, username });
  }

  // Quiz interactions
  sendAnswer(roomId: string, username: string, answer: number, questionId: number): void {
    if (!this.socket) throw new Error('Socket not connected');
    this.socket.emit('sendAnswer', { roomId, username, answer, questionId });
  }

  startQuiz(roomId: string): void {
    if (!this.socket) throw new Error('Socket not connected');
    this.socket.emit('startQuiz', { roomId });
  }

  nextQuestion(roomId: string): void {
    if (!this.socket) throw new Error('Socket not connected');
    this.socket.emit('nextQuestion', { roomId });
  }

  // Event listeners
  onUserJoined(callback: (data: { username: string }) => void): void {
    if (!this.socket) throw new Error('Socket not connected');
    this.socket.on('userJoined', callback);
  }

  onUserLeft(callback: (data: { username: string }) => void): void {
    if (!this.socket) throw new Error('Socket not connected');
    this.socket.on('userLeft', callback);
  }

  onReceiveAnswer(callback: (data: { username: string; answer: number; questionId: number }) => void): void {
    if (!this.socket) throw new Error('Socket not connected');
    this.socket.on('receiveAnswer', callback);
  }

  onQuizStarted(callback: (data: { quiz: any }) => void): void {
    if (!this.socket) throw new Error('Socket not connected');
    this.socket.on('quizStarted', callback);
  }

  onQuestionChanged(callback: (data: { questionIndex: number; question: any }) => void): void {
    if (!this.socket) throw new Error('Socket not connected');
    this.socket.on('questionChanged', callback);
  }

  onQuizEnded(callback: (data: { results: any }) => void): void {
    if (!this.socket) throw new Error('Socket not connected');
    this.socket.on('quizEnded', callback);
  }

  onRoomUpdate(callback: (data: { participants: string[]; status: string }) => void): void {
    if (!this.socket) throw new Error('Socket not connected');
    this.socket.on('roomUpdate', callback);
  }

  // Remove event listeners
  off(event: string, callback?: Function): void {
    if (!this.socket) return;
    this.socket.off(event, callback);
  }

  // Utility methods
  isSocketConnected(): boolean {
    return this.isConnected && this.socket?.connected === true;
  }

  getSocketId(): string | undefined {
    return this.socket?.id;
  }
}

// Create singleton instance
const socketService = new SocketService();

export default socketService;
