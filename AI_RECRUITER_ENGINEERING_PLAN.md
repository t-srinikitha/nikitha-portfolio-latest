# AI Recruiter Feature - Engineering Plan

## Executive Summary

This document outlines the complete engineering plan for building a conversational AI assistant that helps recruiters evaluate Sri Nikitha's fit for roles. The assistant will be scoped strictly to professional experience, achievements, projects, and role-fit analysis, with robust guardrails to prevent out-of-scope responses.

---

## 1. Architecture Overview

### 1.1 System Architecture (Text Diagram)

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React/Vite)                    │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Chat Widget Component (Bottom Fixed)                │   │
│  │  - Collapsed: "Ask a question..." button             │   │
│  │  - Expanded: Chat interface with message history     │   │
│  │  - Quick question buttons (optional)                 │   │
│  └──────────────────────────────────────────────────────┘   │
│                          │                                   │
│                          │ HTTP POST                         │
│                          ▼                                   │
└─────────────────────────────────────────────────────────────┘
                          │
                          │
┌─────────────────────────────────────────────────────────────┐
│              Vercel Serverless Function                      │
│              /api/portfolio-chat                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  1. Request Validation & Guardrail Check             │   │
│  │     - Check if question is in-scope                  │   │
│  │     - Block personal/irrelevant questions             │   │
│  └──────────────────────────────────────────────────────┘   │
│                          │                                   │
│                          ▼                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  2. RAG Pipeline                                      │   │
│  │     - Convert question to embedding (OpenAI)         │   │
│  │     - Vector similarity search (local/hosted)        │   │
│  │     - Retrieve top-k relevant chunks                 │   │
│  └──────────────────────────────────────────────────────┘   │
│                          │                                   │
│                          ▼                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  3. LLM Generation                                    │   │
│  │     - Combine system prompt + retrieved context      │   │
│  │     - Generate response (OpenAI GPT-4)                │   │
│  │     - Post-process for tone/format                    │   │
│  └──────────────────────────────────────────────────────┘   │
│                          │                                   │
│                          ▼                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  4. Response Validation                               │   │
│  │     - Ensure no hallucinations                        │   │
│  │     - Verify response stays in-scope                 │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                          │
                          │ JSON Response
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                    Vector Store                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Option A: Local (ChromaDB/FAISS)                    │   │
│  │  Option B: Hosted (Pinecone/Weaviate/Qdrant)        │   │
│  │                                                       │   │
│  │  Contains:                                           │   │
│  │  - Experience embeddings                             │   │
│  │  - Project descriptions                              │   │
│  │  - Achievement summaries                             │   │
│  │  - Skills/strengths                                  │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Technology Stack

**Frontend:**
- React 18.3+ (existing)
- TypeScript (existing)
- shadcn/ui components (existing)
- React Query (existing) - for API calls

**Backend:**
- Vercel Serverless Functions (TypeScript)
- OpenAI API (GPT-4 for chat, text-embedding-3-small for embeddings)

**Vector Store Options:**
- **Recommended (Local):** ChromaDB (lightweight, no external dependency)
- **Alternative (Hosted):** Pinecone (managed, pay-per-use)
- **Alternative (Local):** FAISS (Facebook AI Similarity Search)

**Embeddings:**
- OpenAI `text-embedding-3-small` (1536 dimensions, cost-effective)

---

## 2. Data Model & Schema

### 2.1 Source Data Structure (JSON)

```json
{
  "profile": {
    "name": "Sri Nikitha T",
    "location": "Bangalore, India",
    "education": [
      {
        "institution": "IIT Kharagpur",
        "degree": "B.Tech",
        "field": "Materials Engineering"
      },
      {
        "institution": "Ashoka University",
        "degree": "Liberal Arts"
      }
    ],
    "summary": "Problem solver with 8+ years of experience in building products from ground up to scale across government, manufacturing, and developer tools."
  },
  "experiences": [
    {
      "id": "exp-1",
      "company": "DrDroid (YC-backed)",
      "role": "Product Manager (Consultant)",
      "type": "consulting",
      "startDate": "2024",
      "endDate": "present",
      "description": "Consulting for DrDroid, an AI SRE agent for automatic debugging and resolution of issues.",
      "responsibilities": [
        "Product strategy for AI-powered SRE automation",
        "User research and requirement gathering",
        "Cross-functional collaboration with engineering teams"
      ],
      "achievements": [
        "Led product development for AI agent capabilities"
      ],
      "technologies": ["AI/ML", "SRE", "DevOps", "Cloud"],
      "impact": []
    },
    {
      "id": "exp-2",
      "company": "Facets.cloud",
      "role": "Founding Product Manager",
      "type": "full-time",
      "startDate": "2022",
      "endDate": "2024",
      "description": "Led product strategy and execution as the founding Product Manager at Facets, a cloud infrastructure platform.",
      "responsibilities": [
        "Product strategy and roadmap definition",
        "User-centric development and feature prioritization",
        "Cross-functional collaboration",
        "Product-market fit discovery"
      ],
      "achievements": [
        "Grew revenue from $0 to $410K ARR",
        "Acquired 15 enterprise customers",
        "Established product-market fit"
      ],
      "technologies": ["Cloud Infrastructure", "B2B SaaS", "Enterprise Software"],
      "impact": [
        {
          "metric": "ARR",
          "value": "$410K",
          "description": "Revenue growth from zero to $410K ARR"
        },
        {
          "metric": "Enterprise Customers",
          "value": 15,
          "description": "Number of enterprise customers acquired"
        }
      ]
    },
    {
      "id": "exp-3",
      "company": "Government of Telangana",
      "role": "Innovation Fellow",
      "type": "government",
      "startDate": "2019",
      "endDate": "2021",
      "description": "Led the design and implementation of Telangana's first Grassroots Innovation Policy.",
      "responsibilities": [
        "Policy design and framework development",
        "Program conceptualization and implementation",
        "Stakeholder management across 31 districts",
        "Innovation hub establishment"
      ],
      "achievements": [
        "Designed and implemented first Grassroots Innovation Policy in Telangana",
        "Established entrepreneurship programs across 31 districts",
        "Built framework for identifying and supporting grassroots innovators",
        "Programs still running across all districts"
      ],
      "technologies": ["Policy Design", "Public Administration", "Innovation Management"],
      "impact": [
        {
          "metric": "Districts Covered",
          "value": 31,
          "description": "All districts in Telangana state"
        },
        {
          "metric": "Policy Status",
          "value": "Active",
          "description": "Only state with dedicated Grassroots Innovation Policy"
        },
        {
          "metric": "Media Coverage",
          "value": "Netflix Documentary",
          "description": "Featured in Netflix documentary"
        }
      ]
    },
    {
      "id": "exp-4",
      "company": "French Startup (Five Elements)",
      "role": "Project Manager",
      "type": "consulting",
      "startDate": "2018",
      "endDate": "2019",
      "description": "Executed end-to-end project management for a French startup's sustainable housing initiative.",
      "responsibilities": [
        "Market research on FRP manufacturing in India",
        "Supplier network establishment",
        "Custom die manufacturing coordination",
        "International client management"
      ],
      "achievements": [
        "Delivered ₹1Cr project within 3 months",
        "Established supplier networks in India",
        "Successfully managed international client relationship"
      ],
      "technologies": ["Manufacturing", "Materials Engineering", "FRP", "Supply Chain"],
      "impact": [
        {
          "metric": "Project Value",
          "value": "₹1Cr",
          "description": "Total project value"
        },
        {
          "metric": "Delivery Time",
          "value": "3 months",
          "description": "End-to-end project delivery"
        }
      ]
    }
  ],
  "projects": [
    {
      "id": "proj-1",
      "name": "DrDroid - AI SRE Agent",
      "type": "current",
      "description": "An AI-powered Site Reliability Engineering (SRE) agent designed to automate incident response, root cause analysis, and proactive system health monitoring for complex cloud infrastructures.",
      "technologies": ["AI/ML", "SRE", "DevOps", "Cloud", "Product Management"],
      "role": "Product Manager",
      "achievements": [],
      "link": "#"
    },
    {
      "id": "proj-2",
      "name": "Wedsmart",
      "type": "side-project",
      "status": "completed",
      "description": "Calculator for calculating emissions from weddings in India, helping couples make environmentally conscious decisions.",
      "technologies": ["React", "TypeScript", "Tailwind CSS", "Vercel"],
      "role": "Builder",
      "achievements": [],
      "link": "#"
    },
    {
      "id": "proj-3",
      "name": "Tailor CRM",
      "type": "side-project",
      "status": "completed",
      "description": "Order taking and tracking tool for tailors to manage customer orders, measurements, and delivery schedules.",
      "technologies": ["Next.js", "Prisma", "PostgreSQL", "Stripe"],
      "role": "Builder",
      "achievements": [],
      "link": "#"
    },
    {
      "id": "proj-4",
      "name": "Weekly Meal Planner",
      "type": "side-project",
      "status": "completed",
      "description": "Creates weekly meal plans for families based on dietary requirements, preferences, and available ingredients.",
      "technologies": ["React", "Node.js", "MongoDB", "Express"],
      "role": "Builder",
      "achievements": [],
      "link": "#"
    },
    {
      "id": "proj-5",
      "name": "Waste Management Platform",
      "type": "side-project",
      "status": "completed",
      "description": "A comprehensive platform for industrial waste management, optimizing collection, processing, and disposal workflows while ensuring regulatory compliance and promoting circular economy principles.",
      "technologies": ["Sustainability", "IoT", "Logistics", "B2B SaaS", "Product Management"],
      "role": "Product Manager",
      "achievements": [],
      "link": "#"
    }
  ],
  "strengths": [
    {
      "category": "Product Management",
      "items": [
        "Product strategy and roadmap definition",
        "User-centric development and empathy",
        "Cross-functional collaboration",
        "Product-market fit discovery",
        "B2B SaaS experience",
        "Enterprise software experience"
      ]
    },
    {
      "category": "Technical Domain",
      "items": [
        "Developer tools and infrastructure",
        "Cloud platforms and infrastructure",
        "AI/ML product development",
        "SRE and DevOps",
        "Platform engineering"
      ]
    },
    {
      "category": "Leadership & Execution",
      "items": [
        "Building products from zero to scale",
        "Policy design and implementation",
        "Stakeholder management",
        "International project delivery",
        "Program conceptualization"
      ]
    },
    {
      "category": "Industry Experience",
      "items": [
        "Government and public sector",
        "Manufacturing and materials engineering",
        "B2B SaaS",
        "Developer tools",
        "Sustainability and impact"
      ]
    }
  ],
  "achievements": [
    {
      "id": "ach-1",
      "title": "Scaling Facets to $410K ARR",
      "type": "revenue",
      "description": "Led product strategy that grew Facets from zero revenue to $410K ARR with 15 enterprise customers",
      "metrics": {
        "revenue": "$410K ARR",
        "customers": 15
      },
      "relatedExperience": "exp-2"
    },
    {
      "id": "ach-2",
      "title": "Grassroots Innovation Policy",
      "type": "policy",
      "description": "Designed and implemented Telangana's first Grassroots Innovation Policy, establishing programs across 31 districts",
      "metrics": {
        "districts": 31,
        "status": "Active (only state with this policy)"
      },
      "relatedExperience": "exp-3"
    },
    {
      "id": "ach-3",
      "title": "International Project Delivery",
      "type": "project",
      "description": "Delivered ₹1Cr international manufacturing project within 3 months",
      "metrics": {
        "value": "₹1Cr",
        "timeline": "3 months"
      },
      "relatedExperience": "exp-4"
    }
  ]
}
```

### 2.2 Vector Store Chunking Strategy

Each document will be chunked into semantic units:

**Chunk Types:**
1. **Experience Chunks**: One chunk per experience with full context
2. **Project Chunks**: One chunk per project
3. **Achievement Chunks**: One chunk per achievement
4. **Strength Chunks**: Grouped by category
5. **Profile Summary Chunk**: Overall profile summary

**Chunk Metadata:**
```typescript
interface ChunkMetadata {
  id: string;
  type: 'experience' | 'project' | 'achievement' | 'strength' | 'profile';
  sourceId: string; // Reference to original data ID
  company?: string; // For experiences
  role?: string; // For experiences
  tags: string[]; // For filtering
  timestamp: string; // For recency
}
```

---

## 3. Prompting Architecture

### 3.1 System Prompt

```
You are a professional AI assistant helping recruiters evaluate Sri Nikitha T's fit for product management and technical roles. Your role is to provide accurate, concise, and relevant information based ONLY on the provided context documents.

CRITICAL RULES:
1. You MUST ONLY answer questions about:
   - Sri Nikitha's work experience and roles
   - Her achievements and impact metrics
   - Her responsibilities and contributions
   - Her projects (past and current)
   - Her strengths as a product manager
   - Her relevance to job descriptions (when provided)
   - Her technical domain expertise (devtools, infra, AI/ML)

2. You MUST REFUSE to answer:
   - Questions about any other individual
   - Personal life questions (family, health, personal circumstances)
   - Salary or compensation specifics (say: "Compensation is discussed later in the interview process")
   - Opinions on politics, current events, or unrelated topics
   - Questions about other companies or people
   - Questions outside the scope of professional experience

3. Response Guidelines:
   - Be professional, concise, and neutral in tone
   - Use specific metrics and achievements when available
   - Distinguish between what Sri Nikitha did vs. what the team did
   - If information is not in the provided context, say "I don't have information about that in the provided context"
   - Never hallucinate or make up information
   - Keep responses focused and recruiter-friendly

4. When analyzing job fit:
   - Compare requirements with relevant experience
   - Highlight specific achievements and metrics
   - Be honest about gaps if they exist
   - Focus on transferable skills

5. Format:
   - Use bullet points for lists
   - Use specific numbers and metrics
   - Keep paragraphs short (2-3 sentences max)
   - Use professional language

Remember: You are representing Sri Nikitha professionally. Accuracy and honesty are paramount.
```

### 3.2 Guardrail Prompt (Pre-filter)

Before RAG retrieval, classify the question:

```
Classify the following question into one of these categories:
- "ALLOWED": Question is about Sri Nikitha's professional experience, projects, achievements, or role fit
- "PERSONAL": Question is about personal life, family, health, or private matters
- "SALARY": Question is about compensation, salary, or financial details
- "OUT_OF_SCOPE": Question is about other people, unrelated topics, opinions, or general knowledge
- "JOB_FIT": Question includes a job description and asks for fit analysis

Question: {user_question}

Respond with ONLY the category name.
```

### 3.3 Response Format Template

```
[If job fit analysis]
Based on the job description and Sri Nikitha's experience:

**Relevant Experience:**
- [Specific experience with metrics]

**Key Strengths:**
- [Matching strengths]

**Notable Achievements:**
- [Relevant achievements]

[If general question]
[Direct answer with specific details from context]

[If information not available]
I don't have information about that in the provided context. Would you like to know about [suggested alternative topic]?
```

### 3.4 Fallback Responses

**Out-of-scope questions:**
```
"I can only answer questions about Sri Nikitha's professional experience, projects, achievements, and role fit. Could you ask something about her work experience or projects instead?"
```

**Personal questions:**
```
"I focus on professional experience and achievements. For personal questions, please reach out directly via email at t.srinikitha@gmail.com."
```

**Salary questions:**
```
"Compensation details are discussed later in the interview process. I can help you understand Sri Nikitha's experience and achievements that demonstrate her value."
```

**Information not available:**
```
"I don't have that information in the provided context. However, I can tell you about [relevant alternative topic]. Would that be helpful?"
```

---

## 4. Edge Cases & Error Handling

### 4.1 Question Classification Edge Cases

| Scenario | Handling |
|----------|----------|
| Ambiguous question (could be personal or professional) | Ask for clarification: "Could you clarify if you're asking about professional experience or personal life?" |
| Question about team vs. individual contribution | Emphasize: "Based on the context, Sri Nikitha's specific contributions were..." |
| Vague question ("Tell me about her") | Ask: "What specific aspect would you like to know about? Experience, projects, or achievements?" |
| Multi-part question | Answer allowed parts, skip disallowed parts with explanation |

### 4.2 RAG Edge Cases

| Scenario | Handling |
|----------|----------|
| No relevant chunks found | Return: "I don't have specific information about that. Here's what I can tell you about [related topic]..." |
| Low similarity scores (< 0.7) | Use broader context or ask for clarification |
| Conflicting information | Use most recent/relevant source, note if uncertain |
| Job description too long | Summarize key requirements first, then analyze |

### 4.3 API Error Handling

| Error Type | Response |
|------------|----------|
| OpenAI API timeout | Retry once, then return: "I'm having trouble processing that. Could you rephrase?" |
| Vector store unavailable | Fallback to keyword matching in source JSON |
| Invalid question format | Return: "Could you rephrase your question?" |
| Rate limiting | Queue request, return: "Processing your question, please wait..." |

### 4.4 Hallucination Prevention

1. **Strict context enforcement**: Only use retrieved chunks
2. **Citation requirement**: If uncertain, say "Based on the available information..."
3. **Confidence scoring**: If similarity < 0.7, add disclaimer
4. **Post-generation validation**: Check response against source chunks

---

## 5. Phased Development Plan

### Phase 1: Foundation & Data Preparation (Week 1)

**Tasks:**
1. Create structured JSON data file (`data/portfolio-data.json`)
2. Set up Vercel serverless function structure
3. Install dependencies:
   - `openai` (OpenAI SDK)
   - `chromadb` or `@pinecone-database/pinecone` (vector store)
   - `zod` (validation - already installed)

**Deliverables:**
- Complete portfolio data JSON
- Basic API route structure (`/api/portfolio-chat`)
- Environment variables setup

**Success Criteria:**
- Data file validated and complete
- API route returns 200 status
- Environment variables configured

---

### Phase 2: Embeddings & Vector Store (Week 1-2)

**Tasks:**
1. Create embedding generation script
2. Chunk data into semantic units
3. Generate embeddings for all chunks
4. Load into vector store (ChromaDB or Pinecone)
5. Create retrieval function

**Deliverables:**
- Embedding generation script
- Vector store populated with all chunks
- Retrieval function that returns top-k chunks

**Success Criteria:**
- All chunks have embeddings
- Vector store search returns relevant results
- Retrieval function tested with sample queries

---

### Phase 3: Guardrails & Question Classification (Week 2)

**Tasks:**
1. Implement question classification using GPT-4
2. Create guardrail logic to block out-of-scope questions
3. Test with edge cases
4. Implement fallback responses

**Deliverables:**
- Question classifier function
- Guardrail middleware
- Test suite for edge cases

**Success Criteria:**
- Correctly classifies 95%+ of test questions
- Blocks all personal/salary/out-of-scope questions
- Returns appropriate fallback messages

---

### Phase 4: RAG Pipeline Integration (Week 2-3)

**Tasks:**
1. Integrate retrieval with LLM generation
2. Implement system prompt injection
3. Create response formatting logic
4. Add post-generation validation

**Deliverables:**
- Complete RAG pipeline
- System prompt integrated
- Response formatter

**Success Criteria:**
- Responses are accurate and relevant
- No hallucinations in test cases
- Responses stay within scope

---

### Phase 5: Frontend Chat Widget (Week 3)

**Tasks:**
1. Create chat widget component (collapsed state)
2. Implement expand/collapse animation
3. Build chat message UI
4. Integrate with API endpoint
5. Add loading states and error handling
6. Implement message history (session-only, no persistence)

**Deliverables:**
- Chat widget component
- API integration
- Smooth animations
- Error handling UI

**Success Criteria:**
- Widget appears at bottom of page
- Smooth expand/collapse
- Messages display correctly
- Error states handled gracefully

---

### Phase 6: UI Polish & Quick Questions (Week 3-4)

**Tasks:**
1. Add quick question buttons (optional)
2. Improve chat UI styling
3. Add typing indicators
4. Implement smooth scrolling
5. Mobile responsiveness
6. Accessibility improvements

**Deliverables:**
- Polished chat UI
- Quick question feature (if implemented)
- Mobile-optimized layout
- Accessible components

**Success Criteria:**
- UI matches portfolio design aesthetic
- Works seamlessly on mobile
- Accessible to screen readers
- Smooth user experience

---

### Phase 7: Testing & Refinement (Week 4)

**Tasks:**
1. Create test case suite:
   - Allowed questions (various types)
   - Blocked questions (personal, salary, out-of-scope)
   - Edge cases
   - Job fit analysis
2. Test with real recruiter scenarios
3. Refine prompts based on test results
4. Optimize retrieval parameters
5. Performance testing

**Deliverables:**
- Test case document
- Refined prompts
- Performance optimizations
- Bug fixes

**Success Criteria:**
- 95%+ accuracy on test cases
- All edge cases handled
- Response time < 3 seconds
- No hallucinations

---

### Phase 8: Deployment & Monitoring (Week 4)

**Tasks:**
1. Deploy to Vercel
2. Set up error monitoring (Sentry or similar)
3. Add analytics (optional)
4. Create documentation
5. Final QA

**Deliverables:**
- Live deployment
- Monitoring setup
- Documentation
- Production-ready feature

**Success Criteria:**
- Feature live on srinikitha.com
- Errors logged and monitored
- Documentation complete
- Ready for production use

---

## 6. File Structure

```
nikitha-portfolio-latest/
├── api/
│   └── portfolio-chat.ts          # Vercel serverless function
├── scripts/
│   └── generate-embeddings.ts     # Script to generate and store embeddings
├── data/
│   └── portfolio-data.json        # Source data
├── src/
│   ├── components/
│   │   └── chat/
│   │       ├── ChatWidget.tsx     # Main chat widget component
│   │       ├── ChatMessage.tsx    # Individual message component
│   │       ├── QuickQuestions.tsx  # Quick question buttons (optional)
│   │       └── types.ts            # TypeScript types
│   └── lib/
│       └── chat-api.ts             # API client functions
├── .env.local                      # Environment variables
└── AI_RECRUITER_ENGINEERING_PLAN.md
```

---

## 7. Environment Variables

```bash
# .env.local
OPENAI_API_KEY=sk-...
VECTOR_STORE_TYPE=chromadb  # or 'pinecone'
PINECONE_API_KEY=...        # if using Pinecone
PINECONE_ENVIRONMENT=...    # if using Pinecone
CHROMA_DB_PATH=./chroma_db # if using ChromaDB
```

---

## 8. API Specification

### Endpoint: `POST /api/portfolio-chat`

**Request:**
```typescript
{
  question: string;
  conversationHistory?: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
  jobDescription?: string; // Optional, for fit analysis
}
```

**Response:**
```typescript
{
  response: string;
  classification: 'ALLOWED' | 'PERSONAL' | 'SALARY' | 'OUT_OF_SCOPE' | 'JOB_FIT';
  sources?: string[]; // Optional: chunk IDs used
  error?: string; // If error occurred
}
```

**Error Responses:**
- `400`: Invalid request format
- `429`: Rate limit exceeded
- `500`: Internal server error
- `503`: Service unavailable (vector store down)

---

## 9. Testing Strategy

### 9.1 Test Cases

**Allowed Questions:**
1. "What is Sri Nikitha's experience at Facets?"
2. "Tell me about her achievements"
3. "What projects has she worked on?"
4. "How does her experience match this job description: [JD]"
5. "What are her strengths as a PM?"
6. "Explain her devtools experience"

**Blocked Questions:**
1. "What is her salary?"
2. "Tell me about her family"
3. "What does she think about [politics/current events]?"
4. "Who else worked at Facets?"
5. "What's her personal life like?"

**Edge Cases:**
1. Empty question
2. Very long question (>1000 chars)
3. Question with job description (>5000 chars)
4. Multi-part question (some allowed, some not)
5. Ambiguous question

### 9.2 Validation Metrics

- **Accuracy**: Responses match source data (no hallucinations)
- **Relevance**: Retrieved chunks are relevant (similarity > 0.7)
- **Scope Compliance**: 100% of blocked questions are refused
- **Response Time**: < 3 seconds for 95% of requests
- **Error Rate**: < 1% of requests fail

---

## 10. Security Considerations

1. **API Key Security**: Store in Vercel environment variables, never in code
2. **Rate Limiting**: Implement per-IP rate limiting (e.g., 10 requests/minute)
3. **Input Validation**: Sanitize all user inputs
4. **CORS**: Configure CORS for srinikitha.com only
5. **Error Messages**: Don't expose internal errors to users

---

## 11. Cost Estimation

**OpenAI API Costs (Monthly, estimated 1000 queries):**
- Embeddings (text-embedding-3-small): ~$0.02 per 1K queries = $0.02
- GPT-4 (chat): ~$0.03 per query = $30
- **Total OpenAI: ~$30/month**

**Vector Store (if hosted):**
- Pinecone: Free tier (1 index, 100K vectors) or ~$70/month for production
- ChromaDB: Free (self-hosted)

**Vercel:**
- Serverless functions: Free tier covers most usage

**Total Estimated Cost: $30-100/month** (depending on usage and vector store choice)

---

## 12. Future Enhancements (Post-MVP)

1. **Analytics Dashboard**: Track common questions, blocked questions
2. **Feedback Loop**: "Was this helpful?" button
3. **Export Conversation**: Allow recruiters to export chat history
4. **Multi-language Support**: Support for other languages
5. **Voice Input**: Speech-to-text for questions
6. **Resume Generation**: Generate tailored resume based on job description

---

## 13. Success Metrics

**Technical:**
- Response accuracy > 95%
- Average response time < 3 seconds
- Uptime > 99.5%
- Zero data leaks or security incidents

**User Experience:**
- Positive feedback from recruiters
- High engagement (questions per session > 3)
- Low bounce rate (< 20%)
- Clear value demonstration

---

## 14. Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Hallucinations | Strict context enforcement, post-validation |
| Out-of-scope responses | Multi-layer guardrails, classification |
| High API costs | Rate limiting, caching common questions |
| Vector store downtime | Fallback to keyword search |
| Poor retrieval quality | Fine-tune chunking strategy, test extensively |

---

## 15. Final Build Steps Summary

1. **Setup**
   - Create data JSON file
   - Set up Vercel serverless function
   - Configure environment variables

2. **Backend**
   - Generate embeddings
   - Populate vector store
   - Implement guardrails
   - Build RAG pipeline

3. **Frontend**
   - Create chat widget
   - Integrate API
   - Polish UI

4. **Testing**
   - Run test suite
   - Refine prompts
   - Fix edge cases

5. **Deploy**
   - Deploy to Vercel
   - Monitor errors
   - Gather feedback

---

## Appendix: Quick Reference

**Key Files to Create:**
- `api/portfolio-chat.ts`
- `data/portfolio-data.json`
- `scripts/generate-embeddings.ts`
- `src/components/chat/ChatWidget.tsx`

**Key Dependencies to Add:**
- `openai`
- `chromadb` (or `@pinecone-database/pinecone`)

**Key Environment Variables:**
- `OPENAI_API_KEY`
- `VECTOR_STORE_TYPE`

---

**End of Engineering Plan**


