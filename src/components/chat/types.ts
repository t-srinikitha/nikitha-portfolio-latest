export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatApiRequest {
  question: string;
  jobDescription?: string;
  conversationHistory?: ChatMessage[];
}

export interface ChatApiResponse {
  response: string;
  classification: 'ALLOWED' | 'PERSONAL' | 'SALARY' | 'OUT_OF_SCOPE' | 'JOB_FIT';
  sources?: string[];
  error?: string;
}


