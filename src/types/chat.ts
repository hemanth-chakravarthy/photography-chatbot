export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface ChatResponse {
  success: boolean;
  data?: {
    reply: string;
  };
  error?: {
    code: string;
    message: string;
  };
}
