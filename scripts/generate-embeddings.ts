import { GoogleGenerativeAI } from '@google/generative-ai';
import { Pinecone } from '@pinecone-database/pinecone';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env.local
const envPath = path.join(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      const value = valueParts.join('=').trim();
      if (!process.env[key.trim()]) {
        process.env[key.trim()] = value;
      }
    }
  });
}

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Load portfolio data
const dataPath = path.join(__dirname, '../data/portfolio-data.json');
if (!fs.existsSync(dataPath)) {
  console.error(`Error: Portfolio data file not found at ${dataPath}`);
  process.exit(1);
}
const portfolioData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

interface Chunk {
  id: string;
  content: string;
  metadata: {
    type: 'experience' | 'project' | 'achievement' | 'strength' | 'profile';
    sourceId: string;
    company?: string;
    role?: string;
    name?: string;
    tags: string[];
  };
}

// Generate embedding for text using Gemini
async function generateEmbedding(text: string): Promise<number[]> {
  const model = genAI.getGenerativeModel({ model: 'text-embedding-004' });
  const result = await model.embedContent(text);
  return result.embedding.values;
}

// Create chunks from portfolio data
function createChunks(): Chunk[] {
  const chunks: Chunk[] = [];

  // Profile summary chunk
  chunks.push({
    id: 'profile-summary',
    content: `Sri Nikitha T is a ${portfolioData.profile.summary}. Based in ${portfolioData.profile.location}. Education: ${portfolioData.profile.education.map((e: any) => `${e.degree} from ${e.institution}`).join(', ')}.`,
    metadata: {
      type: 'profile',
      sourceId: 'profile',
      tags: ['profile', 'summary', 'education'],
    },
  });

  // Experience chunks
  portfolioData.experiences.forEach((exp: any) => {
    const content = `${exp.role} at ${exp.company} (${exp.startDate} - ${exp.endDate}). ${exp.description}\n\nResponsibilities: ${exp.responsibilities.join(', ')}\n\nAchievements: ${exp.achievements.join(', ')}\n\nTechnologies: ${exp.technologies.join(', ')}\n\nImpact: ${exp.impact.map((i: any) => `${i.metric}: ${i.value}`).join(', ')}`;
    
    chunks.push({
      id: `exp-${exp.id}`,
      content,
      metadata: {
        type: 'experience',
        sourceId: exp.id,
        company: exp.company,
        role: exp.role,
        tags: ['experience', exp.type, ...exp.technologies],
      },
    });
  });

  // Project chunks
  portfolioData.projects.forEach((proj: any) => {
    const content = `${proj.name} (${proj.status}). ${proj.description}\n\nTechnologies: ${proj.technologies.join(', ')}\n\nRole: ${proj.role}`;
    
    chunks.push({
      id: `proj-${proj.id}`,
      content,
      metadata: {
        type: 'project',
        sourceId: proj.id,
        name: proj.name,
        tags: ['project', proj.type, proj.status, ...proj.technologies],
      },
    });
  });

  // Achievement chunks
  portfolioData.achievements.forEach((ach: any) => {
    const content = `${ach.title}: ${ach.description}\n\nMetrics: ${Object.entries(ach.metrics).map(([k, v]) => `${k}: ${v}`).join(', ')}`;
    
    chunks.push({
      id: `ach-${ach.id}`,
      content,
      metadata: {
        type: 'achievement',
        sourceId: ach.id,
        tags: ['achievement', ach.type],
      },
    });
  });

  // Strength chunks (grouped by category)
  portfolioData.strengths.forEach((strength: any) => {
    const content = `${strength.category}: ${strength.items.join(', ')}`;
    
    chunks.push({
      id: `strength-${strength.category.toLowerCase().replace(/\s+/g, '-')}`,
      content,
      metadata: {
        type: 'strength',
        sourceId: strength.category,
        tags: ['strength', strength.category.toLowerCase()],
      },
    });
  });

  return chunks;
}

// Main function to generate and store embeddings
async function main() {
  console.log('🚀 Starting embedding generation...\n');

  if (!process.env.GEMINI_API_KEY) {
    console.error('❌ Error: GEMINI_API_KEY environment variable is required');
    console.error('   Set it in your .env.local file or export it in your shell');
    process.exit(1);
  }

  if (!process.env.PINECONE_API_KEY) {
    console.error('❌ Error: PINECONE_API_KEY environment variable is required');
    console.error('   Set it in your .env.local file or export it in your shell');
    process.exit(1);
  }

  console.log('Creating chunks from portfolio data...');
  const chunks = createChunks();
  console.log(`Created ${chunks.length} chunks`);

  // Initialize Pinecone
  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
  });

  const indexName = process.env.PINECONE_INDEX_NAME || 'portfolio-chunks';

  // Get index (index must exist - create it in Pinecone console first)
  const index = pinecone.index(indexName);
  
  // Verify index exists by checking stats
  try {
    const stats = await index.describeIndexStats();
    console.log(`Using index: ${indexName}`);
    console.log(`Index stats: ${stats.totalRecordCount || 0} vectors currently stored`);
  } catch (error) {
    console.error(`\n❌ Error: Index "${indexName}" does not exist or is not accessible.`);
    console.error('Please create the index in Pinecone console first:');
    console.error(`  - Name: ${indexName}`);
    console.error('  - Dimensions: 768 (for Gemini text-embedding-004)');
    console.error('  - Metric: cosine');
    console.error('  - Vector Type: dense');
    console.error('\nOr check your PINECONE_API_KEY and PINECONE_INDEX_NAME environment variables.');
    process.exit(1);
  }

  // Generate embeddings and store in batches
  console.log('Generating embeddings...');
  const batchSize = 100; // Pinecone batch limit

  for (let i = 0; i < chunks.length; i += batchSize) {
    const batch = chunks.slice(i, i + batchSize);
    console.log(`Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(chunks.length / batchSize)}`);

    const vectors: Array<{
      id: string;
      values: number[];
      metadata: any;
    }> = [];

    for (const chunk of batch) {
      try {
        const embedding = await generateEmbedding(chunk.content);
        vectors.push({
          id: chunk.id,
          values: embedding,
          metadata: {
            ...chunk.metadata,
            content: chunk.content,
          },
        });

        // Small delay to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 50));
      } catch (error) {
        console.error(`Error processing chunk ${chunk.id}:`, error);
      }
    }

    // Upsert to Pinecone
    if (vectors.length > 0) {
      try {
        await index.upsert(vectors);
        console.log(`✅ Stored ${vectors.length} vectors in Pinecone`);
      } catch (error: any) {
        console.error(`❌ Error storing vectors:`, error.message || error);
        if (error.message?.includes('index')) {
          console.error('Hint: Make sure the index exists and has the correct dimensions (768 for Gemini)');
        }
        throw error; // Re-throw to stop execution
      }
    }
  }

  console.log(`\n✅ Successfully stored ${chunks.length} embeddings in Pinecone`);
  console.log('🎉 Done! Your vector store is ready to use.');
}

// Run the script
main().catch(console.error);

