This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
# 📚 AI PDF Chat - Scalable RAG System

A full-stack AI application built with Next.js, Node.js, and LangChain that enables users to "chat" with their PDF documents. The system uses a scalable architecture with background workers and vector databases to handle document ingestion efficiently.

---

## 🚀 Features

- **Secure Authentication:** Integrated with Clerk for user management.
- **Asynchronous Processing:** Uses a queue system (BullMQ + Redis) to process large PDFs without blocking the main thread.
- **Vector Search:** Utilizes Qdrant DB for high-speed semantic search.
- **Context-Aware AI:** Powered by OpenAI's GPT models to provide accurate answers based on uploaded documents.
- **Modern UI:** Clean, split-screen interface built with Tailwind CSS and Shadcn UI.

---

## 🛠️ Tech Stack

**Frontend**
- Framework: Next.js (App Router)
- Styling: Tailwind CSS, Shadcn UI
- Auth: Clerk
- Icons: Lucide React

**Backend**
- Server: Node.js / Express
- Orchestration: LangChain (for PDF loading, splitting, and vectorizing)
- Queueing: BullMQ (Redis/Valkey)
- Database: Qdrant (Vector DB)
- AI: OpenAI (Embeddings & Chat Completions)

---


## 🏗️ System Architecture

<img width="2083" height="1031" alt="png" src="https://github.com/user-attachments/assets/0a442467-f1f4-4135-a447-77cf54d09587" />

### Ingestion Phase
1. User uploads a PDF via the Next.js frontend.
2. Express server receives the file and triggers a job in BullMQ.
3. Worker picks up the job, splits the PDF into chunks, and generates Embeddings.
4. Chunks are stored in Qdrant DB.

### Retrieval Phase
1. User sends a message/query.
2. Query is vectorized and a Similarity Search is performed in Qdrant.
3. Relevant chunks (context) and the user query are sent to GPT-4.
4. The model returns a response based on the document's context.

---

## ⚙️ Setup & Installation

### 1. Prerequisites
- Node.js (v18+)
- Docker (to run Qdrant and Redis)
- OpenAI API Key
- Clerk API Keys

### 2. Environment Variables
Create a `.env` file in the client and server folders:

**Server .env**
```
OPENAI_API_KEY=your_openai_key
REDIS_HOST=localhost
REDIS_PORT=6379
QDRANT_URL=http://localhost:6333
```

**Client .env**
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
```

### 3. Run Services with Docker
```
docker-compose up -d
```

### 4. Run Application
```
# Start Server
cd server && npm run dev

# Start Worker
cd server && npm run dev:worker

# Start Frontend
cd client && npm run dev
```

---

## 📖 How to Use

1. Register or log in via the frontend (Clerk authentication).
2. Upload a PDF document.
3. Wait for the document to be processed (background worker).
4. Start chatting with your document—ask questions and get context-aware answers.

---

## 🧩 Troubleshooting

- **Docker containers not starting:** Ensure Docker is running and ports 6379 (Redis) and 6333 (Qdrant) are available.
- **Environment variables missing:** Double-check your `.env` files in both client and server folders.
- **OpenAI/Clerk errors:** Verify your API keys are correct and active.
- **PDF not processing:** Check worker logs for errors and ensure Redis/Qdrant are running.

---

## License

ISC
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
