import { useEffect, useState, useCallback } from 'react';
import socketService from '../services/socketService';
import { useAuth } from '../contexts/AuthContext';

export interface UseSocketReturn {
  isConnected: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  joinRoom: (roomId: string) => void;
  leaveRoom: (roomId: string) => void;
  sendAnswer: (roomId: string, answer: number, questionId: number) => void;
  startQuiz: (roomId: string) => void;
  nextQuestion: (roomId: string) => void;
}

export const useSocket = (): UseSocketReturn => {
  const [isConnected, setIsConnected] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    // Update connection status when socket connects/disconnects
    const checkConnection = () => {
      setIsConnected(socketService.isSocketConnected());
    };

    const interval = setInterval(checkConnection, 1000);
    checkConnection(); // Initial check

    return () => {
      clearInterval(interval);
    };
  }, []);

  const connect = useCallback(async (): Promise<void> => {
    try {
      await socketService.connect();
      setIsConnected(true);
    } catch (error) {
      console.error('Failed to connect to socket:', error);
      setIsConnected(false);
      throw error;
    }
  }, []);

  const disconnect = useCallback((): void => {
    socketService.disconnect();
    setIsConnected(false);
  }, []);

  const joinRoom = useCallback((roomId: string): void => {
    if (!user) {
      throw new Error('User must be authenticated to join a room');
    }
    socketService.joinRoom(roomId, user.username);
  }, [user]);

  const leaveRoom = useCallback((roomId: string): void => {
    if (!user) {
      throw new Error('User must be authenticated to leave a room');
    }
    socketService.leaveRoom(roomId, user.username);
  }, [user]);

  const sendAnswer = useCallback((roomId: string, answer: number, questionId: number): void => {
    if (!user) {
      throw new Error('User must be authenticated to send an answer');
    }
    socketService.sendAnswer(roomId, user.username, answer, questionId);
  }, [user]);

  const startQuiz = useCallback((roomId: string): void => {
    socketService.startQuiz(roomId);
  }, []);

  const nextQuestion = useCallback((roomId: string): void => {
    socketService.nextQuestion(roomId);
  }, []);

  return {
    isConnected,
    connect,
    disconnect,
    joinRoom,
    leaveRoom,
    sendAnswer,
    startQuiz,
    nextQuestion,
  };
};

// Hook for listening to socket events
export const useSocketEvents = () => {
  const [participants, setParticipants] = useState<string[]>([]);
  const [roomStatus, setRoomStatus] = useState<'waiting' | 'playing' | 'finished'>('waiting');
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [answers, setAnswers] = useState<Array<{ username: string; answer: number; questionId: number }>>([]);

  useEffect(() => {
    // User joined event
    const handleUserJoined = (data: { username: string }) => {
      setParticipants(prev => [...prev, data.username]);
    };

    // User left event
    const handleUserLeft = (data: { username: string }) => {
      setParticipants(prev => prev.filter(username => username !== data.username));
    };

    // Answer received event
    const handleReceiveAnswer = (data: { username: string; answer: number; questionId: number }) => {
      setAnswers(prev => [...prev, data]);
    };

    // Quiz started event
    const handleQuizStarted = (data: { quiz: any }) => {
      setRoomStatus('playing');
      setCurrentQuestion(data.quiz.questions?.[0] || null);
    };

    // Question changed event
    const handleQuestionChanged = (data: { questionIndex: number; question: any }) => {
      setCurrentQuestion(data.question);
      setAnswers([]); // Clear answers for new question
    };

    // Quiz ended event
    const handleQuizEnded = (data: { results: any }) => {
      setRoomStatus('finished');
      setCurrentQuestion(null);
    };

    // Room update event
    const handleRoomUpdate = (data: { participants: string[]; status: string }) => {
      setParticipants(data.participants);
      setRoomStatus(data.status as 'waiting' | 'playing' | 'finished');
    };

    // Register event listeners
    socketService.onUserJoined(handleUserJoined);
    socketService.onUserLeft(handleUserLeft);
    socketService.onReceiveAnswer(handleReceiveAnswer);
    socketService.onQuizStarted(handleQuizStarted);
    socketService.onQuestionChanged(handleQuestionChanged);
    socketService.onQuizEnded(handleQuizEnded);
    socketService.onRoomUpdate(handleRoomUpdate);

    // Cleanup function
    return () => {
      socketService.off('userJoined', handleUserJoined);
      socketService.off('userLeft', handleUserLeft);
      socketService.off('receiveAnswer', handleReceiveAnswer);
      socketService.off('quizStarted', handleQuizStarted);
      socketService.off('questionChanged', handleQuestionChanged);
      socketService.off('quizEnded', handleQuizEnded);
      socketService.off('roomUpdate', handleRoomUpdate);
    };
  }, []);

  return {
    participants,
    roomStatus,
    currentQuestion,
    answers,
    setParticipants,
    setRoomStatus,
    setCurrentQuestion,
    setAnswers,
  };
};

export default useSocket;
