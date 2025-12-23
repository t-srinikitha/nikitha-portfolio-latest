import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Pinecone } from '@pinecone-database/pinecone';
import fs from 'fs';
import path from 'path';

// Load portfolio data
const portfolioDataPath = path.join(process.cwd(), 'data', 'portfolio-data.json');
const portfolioData = JSON.parse(fs.readFileSync(portfolioDataPath, 'utf-8'));

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Initialize Pinecone client
let pinecone: Pinecone | null = null;
let pineconeIndex: any = null;

// Initialize Pinecone
async function initializeVectorStore() {
  if (pineconeIndex) {
    return pineconeIndex;
  }

  try {
    if (!process.env.PINECONE_API_KEY) {
      console.log('Pinecone API key not found, using keyword search fallback');
      return null;
    }

    pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY,
    });

    const indexName = process.env.PINECONE_INDEX_NAME || 'portfolio-chunks';
    pineconeIndex = pinecone.index(indexName);

    return pineconeIndex;
  } catch (error) {
    console.error('Pinecone initialization error:', error);
    return null;
  }
}

// Question classification types
type QuestionClassification = 
  | 'ALLOWED' 
  | 'PERSONAL' 
  | 'SALARY' 
  | 'OUT_OF_SCOPE' 
  | 'JOB_FIT';

// Classify question to determine if it's in scope
async function classifyQuestion(question: string): Promise<QuestionClassification> {
  const classificationPrompt = `Classify the following question into one of these categories:
- "ALLOWED": Question is about Sri Nikitha's professional experience, projects, achievements, or role fit
- "PERSONAL": Question is about personal life, family, health, or private matters
- "SALARY": Question is about compensation, salary, or financial details
- "OUT_OF_SCOPE": Question is about other people, unrelated topics, opinions, or general knowledge
- "JOB_FIT": Question includes a job description and asks for fit analysis

Question: ${question}

Respond with ONLY the category name.`;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(classificationPrompt);
    const response = await result.response;
    const text = response.text();
    
    const classification = text.trim().toUpperCase() as QuestionClassification;
    return classification || 'OUT_OF_SCOPE';
  } catch (error) {
    console.error('Classification error:', error);
    // Default to checking if question contains job description keywords
    if (question.toLowerCase().includes('job description') || question.toLowerCase().includes('job fit')) {
      return 'JOB_FIT';
    }
    return 'ALLOWED'; // Default to allowed if classification fails
  }
}

// Generate embedding for a text
async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const model = genAI.getGenerativeModel({ model: 'text-embedding-004' });
    const result = await model.embedContent(text);
    const embedding = result.embedding;
    return embedding.values;
  } catch (error) {
    console.error('Embedding generation error:', error);
    throw error;
  }
}

// Retrieve relevant chunks from vector store
async function retrieveRelevantChunks(
  queryEmbedding: number[],
  queryText: string,
  topK: number = 5
): Promise<Array<{ content: string; metadata: any; score: number }>> {
  try {
    const index = await initializeVectorStore();
    
    if (!index) {
      // Fallback to keyword-based search
      return performKeywordSearch(queryText, topK);
    }

    // Query Pinecone
    const queryResponse = await index.query({
      vector: queryEmbedding,
      topK,
      includeMetadata: true,
    });

    const chunks: Array<{ content: string; metadata: any; score: number }> = [];
    
    if (queryResponse.matches) {
      queryResponse.matches.forEach((match: any) => {
        chunks.push({
          content: match.metadata?.content || match.metadata?.text || '',
          metadata: match.metadata || {},
          score: match.score || 0,
        });
      });
    }

    // If no results from Pinecone, fallback to keyword search
    if (chunks.length === 0) {
      return performKeywordSearch(queryText, topK);
    }

    return chunks;
  } catch (error) {
    console.error('Retrieval error:', error);
    // Fallback to keyword search
    return performKeywordSearch(queryText, topK);
  }
}

// Fallback keyword-based search
function performKeywordSearch(query: string, topK: number = 5): Array<{ content: string; metadata: any; score: number }> {
  // Simple keyword matching fallback
  const queryLower = query.toLowerCase();
  const chunks: Array<{ content: string; metadata: any; score: number }> = [];

  // Search in experiences
  portfolioData.experiences.forEach((exp) => {
    const content = `${exp.role} at ${exp.company}. ${exp.description}`;
    const score = calculateKeywordScore(content, queryLower);
    if (score > 0) {
      chunks.push({
        content,
        metadata: { type: 'experience', id: exp.id, company: exp.company, role: exp.role },
        score,
      });
    }
  });

  // Search in projects
  portfolioData.projects.forEach((proj) => {
    const content = `${proj.name}. ${proj.description}`;
    const score = calculateKeywordScore(content, queryLower);
    if (score > 0) {
      chunks.push({
        content,
        metadata: { type: 'project', id: proj.id, name: proj.name },
        score,
      });
    }
  });

  // Search in achievements
  portfolioData.achievements.forEach((ach) => {
    const content = `${ach.title}: ${ach.description}`;
    const score = calculateKeywordScore(content, queryLower);
    if (score > 0) {
      chunks.push({
        content,
        metadata: { type: 'achievement', id: ach.id, title: ach.title },
        score,
      });
    }
  });

  // Search in strengths
  portfolioData.strengths.forEach((strength) => {
    const content = `${strength.category}: ${strength.items.join(', ')}`;
    const score = calculateKeywordScore(content, queryLower);
    if (score > 0) {
      chunks.push({
        content,
        metadata: { type: 'strength', id: strength.category, category: strength.category },
        score,
      });
    }
  });

  // Search in profile summary
  const profileContent = `${portfolioData.profile.summary}`;
  const profileScore = calculateKeywordScore(profileContent, queryLower);
  if (profileScore > 0) {
    chunks.push({
      content: profileContent,
      metadata: { type: 'profile', id: 'profile' },
      score: profileScore,
    });
  }

  // Sort by score and return top K
  return chunks.sort((a, b) => b.score - a.score).slice(0, topK);
}

function calculateKeywordScore(text: string, query: string): number {
  const textLower = text.toLowerCase();
  const queryWords = query.split(/\s+/).filter(w => w.length > 2);
  let score = 0;
  
  queryWords.forEach((word) => {
    if (textLower.includes(word)) {
      score += 1;
    }
  });
  
  return score / queryWords.length;
}

// Get fallback response based on classification
function getFallbackResponse(classification: QuestionClassification): string {
  switch (classification) {
    case 'PERSONAL':
      return "I focus on professional experience and achievements. For personal questions, please reach out directly via email at t.srinikitha@gmail.com.";
    case 'SALARY':
      return "Compensation details are discussed later in the interview process. I can help you understand Sri Nikitha's experience and achievements that demonstrate her value.";
    case 'OUT_OF_SCOPE':
      return "I can only answer questions about Sri Nikitha's professional experience, projects, achievements, and role fit. Could you ask something about her work experience or projects instead?";
    default:
      return "I don't have that information in the provided context. However, I can tell you about Sri Nikitha's professional experience and projects. Would that be helpful?";
  }
}

// System prompt for the assistant
const SYSTEM_PROMPT = `You are a professional AI assistant helping recruiters evaluate Sri Nikitha T's fit for product management and technical roles. Your role is to provide accurate, concise, and relevant information based ONLY on the provided context documents.
'Role: You are a professional Talent Advocate and AI Assistant representing Sri Nikitha T to recruiters and hiring managers. Your goal is to demonstrate why her unique journey—from IIT engineer to Liberal Arts scholar to Founding Product Manager—makes her an exceptional hire for high-stakes PM and technical roles.
SRI NIKITHA’S PROFESSIONAL BIOGRAPHY & CONTEXT:
• Core DNA (The "Grit" Factor): Sri Nikitha comes from a lower-middle-class background and attended schools with minimal infrastructure. She developed an extraordinary work ethic early on (often doing assignments twice to perfect them). She cracked the IIT-JEE through sheer self-study and determination when specialized coaching was unaffordable.
• The "Systems Thinker" Pivot: After studying Metallurgical Engineering at IIT Kharagpur, she realized engineers often view problems as binary. She attended Ashoka University (Liberal Arts & Leadership) to master systems thinking, critical writing, and political economy. She views product management through this lens: how a feature affects the entire ecosystem.
• Career Milestones:
    ◦ Founding PM @ Facets.cloud: Built the product from $0$ to scale. Expert in DevTools and Cloud Infrastructure.
    ◦ Growth PM @ Mason: Led GTM strategies and new product initiatives.
    ◦ Innovation Fellow @ Gov. of Telangana: Selected from thousands to lead grassroots innovation. Laid the foundation for the state’s Rural Innovation Policy (the first of its kind in India).
    ◦ Industrial Impact: At NRB Bearings, she optimized sustainable processes and root-cause waste analysis in manufacturing.
• Technical Domain Expertise: Cloud Infrastructure, DevTools, AI/ML, No-code, and Frugal Science.
OPERATIONAL RULES:
1. Translating the Personal to Professional: * If asked about her background or strengths, use her "Origin Story" (the school with no benches, the IIT dream) as evidence of her resilience, high ownership, and problem-solving mindset.
    ◦ If asked about NRB Bearings (Harassment context): Frame her departure as a move toward professional environments that align with her values of meritocracy and respect. Focus on her impact there (waste reduction) before the move.
    ◦ If asked about Recent Gaps/Short Tenures (Augur/DrDroid): Be transparent but brief. Augur AI faced funding issues; DrDroid had a vision misalignment regarding customer centricity. Highlight that she is currently building her own projects while balancing early motherhood—a testament to her time management and drive.
2. Response Guidelines:
    ◦ Tone: Professional, insightful, and "human-like." Do not sound like a robot.
    ◦ Focus: Emphasize "Founding PM" skills—taking ambiguity and turning it into a scalable product.
    ◦ Data-Driven: Use metrics where available (e.g., "1 of 6 selected from thousands," "first rural innovation policy").
3. Strict Limitations:
    ◦ Salary: Say, "Compensation is best discussed directly with Sri Nikitha during the interview phase."
    ◦ Out of Scope: Refuse questions about other candidates, politics, or unrelated personal medical data.
    ◦ Hallucination: If a specific metric or tech stack isn't mentioned in her history, say: "I don't have that specific detail in the context provided, but her background in [Related Field] suggests she would pick it up quickly."
Remember: You are representing Sri Nikitha professionally. Accuracy and honesty are paramount.`;

// Generate response using RAG
async function generateResponse(
  question: string,
  classification: QuestionClassification,
  retrievedChunks: Array<{ content: string; metadata: any; score: number }>,
  jobDescription?: string
): Promise<string> {
  // If out of scope, return fallback
  if (classification === 'PERSONAL' || classification === 'SALARY' || classification === 'OUT_OF_SCOPE') {
    return getFallbackResponse(classification);
  }

  // Build context from retrieved chunks
  const context = retrievedChunks
    .map((chunk, idx) => `[Context ${idx + 1}]\n${chunk.content}\n`)
    .join('\n\n');

  let userPrompt = `Question: ${question}\n\nContext:\n${context}`;

  if (jobDescription && classification === 'JOB_FIT') {
    userPrompt += `\n\nJob Description:\n${jobDescription}\n\nPlease analyze how Sri Nikitha's experience matches this job description.`;
  }

  try {
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-pro',
      systemInstruction: SYSTEM_PROMPT,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000,
      }
    });
    
    const result = await model.generateContent(userPrompt);
    const response = await result.response;
    const text = response.text();
    
    return text || 'I apologize, but I encountered an error generating a response.';
  } catch (error) {
    console.error('Response generation error:', error);
    return 'I apologize, but I encountered an error processing your question. Please try again.';
  }
}

// Main handler
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { question, jobDescription } = req.body;

    if (!question || typeof question !== 'string') {
      return res.status(400).json({ error: 'Question is required' });
    }

    // Step 1: Classify question
    const classification = await classifyQuestion(question);

    // Step 2: If out of scope, return immediately
    if (classification === 'PERSONAL' || classification === 'SALARY' || classification === 'OUT_OF_SCOPE') {
      return res.status(200).json({
        response: getFallbackResponse(classification),
        classification,
      });
    }

    // Step 3: Generate embedding for the question
    const queryEmbedding = await generateEmbedding(question);

    // Step 4: Retrieve relevant chunks
    const retrievedChunks = await retrieveRelevantChunks(queryEmbedding, question, 5);

    // Step 5: Generate response
    const response = await generateResponse(
      question,
      classification,
      retrievedChunks,
      jobDescription
    );

    // Step 6: Return response
    return res.status(200).json({
      response,
      classification,
      sources: retrievedChunks.map((c) => c.metadata.id || c.metadata.name).filter(Boolean),
    });
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

