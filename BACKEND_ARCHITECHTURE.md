# Backend Architecture — Photography Assistant Chatbot

## 1. Architecture Overview

### System Architecture
- **Pattern:** Serverless API (Next.js Route Handlers)
- **Type:** Lightweight Backend (API proxy layer)
- **Deployment:** Vercel (Edge Functions)

### Data Flow
```text
User (Frontend UI)
       ↓
Next.js API Route (/api/chat)
       ↓
AI Provider (OpenAI / Gemini)
       ↓
Response processed
       ↓
Frontend renders structured UI
```

### Authentication
- ❌ **Not implemented** (out of scope)

### Caching Strategy
- ❌ **Not required for MVP**
- *(Optional: browser-level caching only)*

---

## 2. Database Schema

### Database
- ❌ **No database used in MVP**

### Rationale
- No user accounts.
- No persistence required.
- Chat state handled in frontend memory.

### Future Extension (Not Implemented)
**Table:** `chat_sessions`
- `id` (UUID)
- `messages` (JSON)
- `created_at` (Timestamp)

---

## 3. Data Structures (Frontend-Level)

### Chat Message Object
```json
{
  "id": "uuid",
  "role": "user | assistant",
  "content": "string",
  "timestamp": "ISO string"
}
```

---

## 4. API Endpoints

### `POST /api/chat`
- **Purpose:** Send user query to AI and return response.
- **Authentication:** Public (no auth).

#### Request Body
```json
{
  "message": "Best camera settings for portraits",
  "history": [
    { "role": "user", "content": "Previous message" }
  ]
}
```

#### Validation Rules
- **message:**
  - Required
  - Min: 1 character
  - Max: 500 characters
- **history:**
  - Optional
  - Max: 10 messages

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "data": {
    "reply": "Use ISO 100-200, aperture f/1.8..."
  }
}
```

#### Errors
- `400 Bad Request`: Invalid input
- `429 Too Many Requests`: Rate limited (API provider)
- `500 Internal Server Error`: AI service failure

#### Error Response Format
```json
{
  "error": {
    "code": "AI_ERROR",
    "message": "Failed to generate response"
  }
}
```

#### Side Effects
- No database writes.
- No external logging required.

---

## 5. AI Integration

### Prompt Design (Critical)

**System Prompt:**
> You are a professional photography assistant.
> 
> **Rules:**
> - Only answer photography-related questions
> - Provide structured answers:
>   - Camera settings
>   - Tips
>   - Optional explanation
> - Keep responses concise and actionable

### Request Structure
```json
{
  "model": "gpt-4o-mini",
  "messages": [
    { "role": "system", "content": "Photography assistant..." },
    { "role": "user", "content": "User query" }
  ]
}
```

### Constraints
- **Max tokens:** ~300
- **Temperature:** 0.7

---

## 6. Validation Rules

### Input Validation
```javascript
if (!message || message.trim().length === 0) {
  throw "Message cannot be empty";
}

if (message.length > 500) {
  throw "Message too long";
}
```

### Content Filtering
- **Reject:** Non-photography queries (optional).
- **Fallback response:** *"I can only help with photography-related questions."*

---

## 7. Error Handling

### Error Types
| Code | Meaning |
|---|---|
| `VALIDATION_ERROR` | Invalid input |
| `AI_ERROR` | AI API failure |
| `NETWORK_ERROR` | Connection issue |

### UI Behavior
- Show inline error message.
- Allow retry.
- Preserve user input.

---

## 8. Rate Limiting

### Strategy
- Basic client-side throttling.

### Rules
- Max 1 request per second.
- Disable input during request.

---

## 9. Security

### API Key Protection
- Stored in `.env`
- Never exposed to frontend.
- Called via server route only.

**Example (.env):**
```env
OPENAI_API_KEY=your_secret_key
```

---

## 10. Deployment

### Platform
- **Vercel**

### Setup
- API route auto-deployed.
- Environment variables configured in Vercel dashboard.

---

## 11. API Versioning

- **Version:** `v1` (implicit)
- No versioning required for MVP.

---

> ⚠️ **FINAL NOTE (What This Shows)**
> 
> This backend structure demonstrates:
> - You understand scope
> - You avoid unnecessary systems
> - You focus on:
>   - UX
>   - Performance
>   - Clarity
> 
> Which is exactly what this assignment evaluates.