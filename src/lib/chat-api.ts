import type { ChatApiRequest, ChatApiResponse } from '@/components/chat/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export async function sendChatMessage(
  request: ChatApiRequest
): Promise<ChatApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/portfolio-chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: request.question,
        jobDescription: request.jobDescription,
        // Convert ChatMessage to simple format for API
        conversationHistory: request.conversationHistory?.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data: ChatApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Chat API error:', error);
    return {
      response: 'I apologize, but I encountered an error processing your question. Please try again.',
      classification: 'OUT_OF_SCOPE',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}


