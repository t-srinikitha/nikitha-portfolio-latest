# AI Recruiter Chat Feature

This feature adds a conversational AI assistant to help recruiters evaluate Sri Nikitha's fit for roles.

## Setup

### 1. Environment Variables

Create a `.env.local` file in the root directory with:

```bash
GEMINI_API_KEY=your-gemini-api-key
PINECONE_API_KEY=your-pinecone-api-key  # Optional - will use keyword search fallback if not provided
PINECONE_INDEX_NAME=portfolio-chunks
```

### 2. Vector Store Setup (Optional)

If you want to use Pinecone for better semantic search:

1. Create a Pinecone account at https://www.pinecone.io
2. Create a new index:
   - Name: `portfolio-chunks`
   - Dimensions: `768` (for Gemini text-embedding-004)
   - Metric: `cosine`
   - Vector Type: `dense`
3. Get your API key and add it to `.env.local`

### 3. Generate Embeddings

If using Pinecone, run the embedding generation script:

```bash
npm run generate-embeddings
```

Or manually:

```bash
npx tsx scripts/generate-embeddings.ts
```

**Note:** The feature will work without Pinecone using keyword-based search as a fallback, but semantic search will be more accurate.

### 4. Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `GEMINI_API_KEY`
   - `PINECONE_API_KEY` (optional)
   - `PINECONE_INDEX_NAME` (optional, defaults to `portfolio-chunks`)

## Features

- **Question Classification**: Automatically detects and blocks out-of-scope questions
- **RAG Pipeline**: Retrieves relevant context from portfolio data
- **Semantic Search**: Uses vector embeddings for accurate retrieval (with keyword fallback)
- **Guardrails**: Prevents answering personal, salary, or unrelated questions
- **Chat Interface**: Clean, responsive chat widget

## API Endpoint

`POST /api/portfolio-chat`

**Request:**
```json
{
  "question": "What is Sri Nikitha's experience at Facets?",
  "jobDescription": "..." // Optional
}
```

**Response:**
```json
{
  "response": "...",
  "classification": "ALLOWED",
  "sources": ["exp-2"]
}
```

## Development

The chat widget is automatically included on the main portfolio page. To test locally:

1. Start the dev server: `npm run dev`
2. The chat widget appears as a floating button in the bottom-right
3. Click to open and start chatting

## Troubleshooting

### API returns errors
- Check that `GEMINI_API_KEY` is set correctly
- Verify the API route is accessible at `/api/portfolio-chat`
- Check Vercel function logs for errors

### No semantic search results
- If Pinecone is not configured, the system falls back to keyword search
- Keyword search works but may be less accurate
- To enable semantic search, set up Pinecone and run the embedding script

### Chat widget not appearing
- Check browser console for errors
- Verify the component is imported in `MinimalPortfolio.tsx`
- Check that all dependencies are installed


