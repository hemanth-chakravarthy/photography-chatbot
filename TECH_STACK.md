# Tech Stack — Photography Assistant Chatbot

## 1. Stack Overview

- **Last Updated:** March 2026
- **Version:** 1.0

### Architecture Pattern
- **Type:** Serverless (Frontend-first)
- **Pattern:** JAMstack
- **Deployment:** Cloud (Vercel)

### Philosophy
- Minimize backend complexity.
- Maximize frontend experience and responsiveness.
- Use AI APIs instead of building ML systems.

---

## 2. Frontend Stack

### Core Framework
- **Framework:** Next.js
- **Version:** 14.x (App Router)
- **Reason:** Built-in routing, Server/Edge functions for API calls, Seamless Vercel deployment.

### UI Library
- **Library:** React
- **Version:** 18.x
- **Reason:** Component-based design, Ideal for interactive chat UI.

### Styling
- **Framework:** Tailwind CSS
- **Version:** 3.x
- **Reason:** Fast UI development, Consistent spacing and design system, Perfect for polished frontend (important for this assignment).

### State Management
- **Library:** React State (`useState` + `useReducer`)
- **Reason:** Chat state is simple (messages array), External state libraries are unnecessary overhead.

### Animations
- **Library:** Framer Motion (Optional but recommended)
- **Reason:** Smooth chat transitions, Typing indicators, Enhances perceived quality.

### Type Safety
- **Language:** TypeScript
- **Reason:** Prevent runtime bugs, Cleaner code structure.

### HTTP Client
- **Method:** Fetch API (built-in)
- **Reason:** No need for Axios, Simpler and sufficient.

---

## 3. Backend Stack (Minimal / Optional)

### Approach
- **Type:** Serverless API Routes (Next.js)

### Runtime
- **Platform:** Node.js (via Next.js)

### API Layer
- **Implementation:** Next.js Route Handlers (`/api/chat`)
- **Reason:** Secure API keys (not exposed to frontend), Simple proxy to AI API.

### AI Integration
- **Provider Options:** OpenAI API, Google Gemini API
- **Recommended:** OpenAI / Gemini (whichever you’re comfortable with)
- **Reason:** No model training required, Fast integration, Reliable responses.

### Database
- ❌ **Not used (MVP)**
- **Reason:** No persistence required, Chat history can be in-memory (state).

### Authentication
- ❌ **Not implemented**

### Caching
- ❌ **Not required**

---

## 4. DevOps & Infrastructure

### Version Control
- **System:** Git
- **Platform:** GitHub

### Hosting
- **Frontend + API:** Vercel
- **Reason:** Zero-config deployment, Optimized for Next.js, Required by assignment.

### CI/CD
- **Platform:** Vercel Auto Deploy
- **Trigger:** Push to `main` branch

### Monitoring
- ❌ **Not required** (Optional: Vercel Analytics)

### Testing
- ❌ **Not required for assignment** 
  *(Note: You can mention manual testing in your Loom video)*

---

## 5. Development Tools

### IDE
- **Editor:** VS Code

### AI Development Tools (Important for Evaluation)
- Cursor / GitHub Copilot / Claude
- **Usage:** Generate UI components, Debug API integration, Refactor code.

### Code Quality
- **Formatter:** Prettier
- **Linter:** ESLint (Next.js default)

---

## 6. Environment Variables

```env
# AI API
OPENAI_API_KEY="your_api_key"
# OR
GEMINI_API_KEY="your_api_key"

# App
NEXT_PUBLIC_APP_NAME="Photography Assistant"
NODE_ENV="development"
```

---

## 7. Key Technical Decisions

1. **No Heavy Backend**
   - **Reason:** Assignment focuses on frontend UX, not infrastructure.
2. **No Database**
   - **Reason:** No persistence required for MVP.
3. **Serverless API Instead of Direct API Calls**
   - **Reason:** Protect API keys, Cleaner architecture.
4. **Tailwind Over Component Libraries**
   - **Reason:** Full control over UI (important for “frontend thinking”), Avoid generic-looking design.

---

## 8. Alternatives Considered (and Rejected)

| Option | Reason Rejected |
|---|---|
| Express Backend | Unnecessary complexity |
| MongoDB/PostgreSQL | No data persistence needed |
| Redux/Zustand | Overkill for simple chat state |
| Axios | Native fetch is sufficient |
| Firebase | Too heavy for assignment scope |

---

> ⚠️ **Final Take (What This Signals to Interviewers)**
> 
> This stack shows:
> - You understand scope
> - You avoid overengineering
> - You prioritize UX over unnecessary infra
> - You can ship fast with AI tools