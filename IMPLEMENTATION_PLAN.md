# Implementation Plan — Photography Assistant Chatbot

## Overview
- **Project Name:** Photography Assistant Chatbot
- **MVP Target:** Within 6–8 hours
- **Approach:** Rapid iterative development

### Build Philosophy
- Build UI-first, not backend-first.
- Focus on experience before features.
- Test each interaction immediately.
- Avoid unnecessary abstractions.

---

## PHASE 1: Project Setup & Foundation

### Step 1.1: Initialize Project
- **Duration:** 45 minutes
- **Goal:** Working Next.js app with Tailwind

#### Tasks
```bash
npx create-next-app@latest photo-chatbot --typescript --tailwind --app
cd photo-chatbot
pnpm install
pnpm dev
```

#### Success Criteria
- App runs on `localhost:3000`.
- No errors in console.
- Tailwind working.

### Step 1.2: Environment Setup
- **Duration:** 20 minutes
- **Goal:** AI API ready

#### Tasks
- Create `.env.local`:
```env
OPENAI_API_KEY=your_api_key
```

#### Success Criteria
- Env variables accessible in app.
- No API key exposed in frontend.

---

## PHASE 2: Design System Implementation

### Step 2.1: Configure Tailwind Tokens
- **Duration:** 1 hour

#### Tasks
- Add colors from `FRONTEND_GUIDELINES.md`.
- Add spacing + typography.

#### Success Criteria
- Custom classes usable.
- UI matches design tokens.

### Step 2.2: Build Core Components
- **Duration:** 2–3 hours

#### Components (in order)
1. Chat Layout
2. Chat Bubble (user + bot)
3. Input Box
4. Send Button
5. Suggested Prompt Cards
6. Loading Indicator
7. Error Message

#### Example Structure
```text
/components
  /chat
    ChatContainer.tsx
    MessageBubble.tsx
    ChatInput.tsx
    SuggestedPrompts.tsx
```

#### Success Criteria
- All components reusable.
- No visual inconsistencies.
- Mobile responsive.

---

## PHASE 3: Core Feature (Chatbot)

### Step 3.1: API Route (AI Integration)
- **Duration:** 1 hour

#### Tasks
- Create `/app/api/chat/route.ts`
- **Logic:**
  1. Receive user message
  2. Send to OpenAI
  3. Return response

#### Success Criteria
- API returns valid response.
- Handles errors properly.

### Step 3.2: Connect Frontend to API
- **Duration:** 1.5 hours

#### Tasks
- Manage messages state.
- Call API on send.
- Display response.

#### Flow
`User input` → `API call` → `loading` → `response` → `render`

#### Success Criteria
- Chat works end-to-end.
- No UI freeze.
- Input disabled during request.

---

## PHASE 4: UX Enhancements (THIS IS WHERE YOU WIN)

### Step 4.1: Suggested Prompts
- **Duration:** 30 minutes

#### Tasks
- Add 4–6 prompt buttons:
  - *"Best settings for portraits"*
  - *"Night photography tips"*
  - *"Composition rules"*

#### Success Criteria
- Click → auto send.
- Improves onboarding.

### Step 4.2: Loading + Typing State
- **Duration:** 30 minutes

#### Tasks
- Add typing animation.
- Disable input while loading.

#### Success Criteria
- No “dead UI” feeling.
- Clear feedback.

### Step 4.3: Error Handling
- **Duration:** 30 minutes

#### Tasks
- Handle API failure.
- Add retry button.

#### Success Criteria
- No crashes.
- Clear error message.

### Step 4.4: Structured Responses (High Impact)
- **Duration:** 1 hour

#### Tasks
- Parse AI response.
- Display:
  - Camera settings (card)
  - Tips (list)

#### Success Criteria
- Not plain text.
- Visually structured.

---

## PHASE 5: Polish & Finalization

### Step 5.1: UI Polish
- **Duration:** 45 minutes

#### Tasks
- Fix spacing.
- Improve typography.
- Add hover states.

#### Success Criteria
- Clean, consistent UI.
- No rough edges.

### Step 5.2: Responsive Design
- **Duration:** 30 minutes

#### Tasks
- Test mobile view.
- Fix layout issues.

#### Success Criteria
- Works smoothly on phone.

### Step 5.3: Deployment
- **Duration:** 30 minutes

#### Tasks
```bash
git init
git add .
git commit -m "Initial commit"
git push
```
- Deploy on Vercel.

#### Success Criteria
- Live URL works.
- No runtime errors.

---

## FINAL CHECKLIST (CRITICAL)

### Functional
- [ ] Chat works end-to-end.
- [ ] Suggested prompts working.
- [ ] Loading + error states handled.

### UX
- [ ] No blank screen.
- [ ] Smooth interaction.
- [ ] Clear feedback.

### Code
- [ ] Clean structure.
- [ ] No unused code.
- [ ] No console errors.

### Submission Requirements
- [ ] Vercel link working.
- [ ] GitHub repo public.
- [ ] README included.
- [ ] Loom video explaining:
  - How you built it.
  - How you used AI tools.
