# 📸 Photography Assistant Chatbot

> Your AI-powered personal photography advisor. Built with Next.js, Tailwind CSS, and the Groq API (Llama 3.3).

![Project Preview](./public/preview-placeholder.png) <!-- Note: Add an actual screenshot to your public/ folder -->

## ✨ Features

- **Context-Aware AI Guidance:** Get tailored camera settings (ISO, Aperture, Shutter Speed), composition ideas, and lens recommendations based on any scene or scenario you throw at it.
- **Cinematic Responsive UI:**
  - **Desktop:** A stunning 2-pane "Experience UI" with a dedicated chat interface on the left and a dynamic visual recommendation card on the right.
  - **Mobile:** Full-screen immersive chat flow with contextual quick-reply chips and inline product cards.
- **Smart Visual Output:** The Right Panel dynamically displays 1 of 22 curated photography images based on keyword matching (e.g., "portrait", "golden hour", "bokeh") from your conversation.
- **Live Stats Parsing:** Automatically extracts settings (ISO, f-stop, shutter speed) straight from the AI's response and renders them cleanly in a stats bar.
- **Markdown Rendering:** Beautifully formatted AI responses including bolding, bullet points, and headers, fully styled with Tailwind Typography.
- **Custom Animations:** Cinematic initial page load (shutter aperture spinning) and smooth fade-in transitions.

## 🛠 Tech Stack

- **Framework:** Next.js (App Router, Serverless API Routes)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Custom dark/light variants, glassmorphism)
- **LLM/API:** Groq API leveraging the `llama-3.3-70b-versatile` model
- **Components/Icons:** Lucide React, React Markdown

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- `pnpm` (or `npm`/`yarn`)
- A [Groq API Key](https://console.groq.com/keys)

### Installation

1. Clone the repository and install dependencies:
   ```bash
   git clone <your-repo-url>
   cd photography-chatbot
   pnpm install
   ```

2. Set up your environment variables:
   Create a `.env.local` file in the root directory and add your Groq API key:
   ```env
   GROQ_API_KEY=your_actual_groq_api_key_here
   ```

3. Run the development server:
   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

- `/src/components/chat`: Contains the modular UI pieces:
  - `ChatContainer.tsx`: The heart of the app — manages state, layout breaks, and API calls.
  - `RightPanel.tsx`: The intelligent image/stats renderer on desktop.
  - `ChatInput.tsx`: The branded message bar.
  - `MessageBubble.tsx`: Renders user vs AI messages via Markdown.
- `/src/app/api/chat/route.ts`: Secure backend route communicating with the Groq API.
- `/src/types/chat.ts`: Centralized TypeScript definitions.

## ☁️ Deployment (Vercel)

This project is optimized for deployment on Vercel:
1. Push this repository to GitHub.
2. Import the project in your Vercel dashboard.
3. Crucial: Add `GROQ_API_KEY` to your Vercel **Environment Variables**.
4. Deploy!

---
*Developed as an AI-powered MVP for photographers.*
