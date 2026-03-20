# App Flow — Photography Assistant Chatbot

## Context
A web-based AI-powered photography assistant chatbot that helps users quickly get camera settings, composition tips, and editing suggestions through a guided, interactive chat experience. Focus is on frontend UX and structured responses, not generic chat.

---

## 1. Entry Points

### Direct Access
- User visits deployed URL (Vercel link).
- Lands on **Home / Chat Screen**.

### Deep Links
- Shared link with pre-filled prompt (optional enhancement).
- Example: `/chat?prompt=night+photography`

### Search Engines
- User searches: *"camera settings night photography"*
- Lands on homepage.

### Marketing / Portfolio Links
- GitHub README
- Portfolio website
- Loom demo

### OAuth / Login
- ❌ Not applicable (out of scope).

---

## 2. Core User Flows

### FLOW 1: User Onboarding (First Visit Experience)

#### ✅ Happy Path
- **Screen:** Home (Empty State)
- **UI Elements:**
  - Title: "Photography Assistant"
  - Subtitle: "Ask anything about photography"
  - Suggested prompts (cards/buttons)
  - Input box (disabled until interaction - optional)
- **User Actions:**
  1. User lands on page.
  2. Views suggested prompts.
  3. Clicks a prompt OR types a query.
- **System Responses:**
  - If prompt clicked: → Autofill input + auto-send.
  - If typed: → Validate input → send request.
- **Validation Rules:**
  - Input must not be empty.
  - Max length: 500 characters.
- **Next State:**
  - → Chat Active State (messages visible).
- **Success Criteria:**
  - User sends first message within 10 seconds.

#### ❌ Error States
- **Empty input:** Message: *"Please enter a question about photography"*
- **API failure:** Message: *"Something went wrong. Try again."*
- **Slow response (>3s):** Show loading animation continuously.

#### ⚠️ Edge Cases
- User refreshes page → chat resets.
- User clicks multiple prompts quickly → only latest request processed.
- User navigates away mid-request → request canceled.

---

### FLOW 2: Main Feature (Chat Interaction)

#### ✅ Happy Path
- **Screen:** Chat Screen
- **UI Elements:**
  - Chat message list
  - User message bubble
  - Bot message bubble
  - Loading indicator (typing dots)
  - Input box + send button
- **Step-by-Step:**
  1. User enters query: *"Best settings for portrait photography"*
  2. Clicks **Send**.
- **System:**
  1. Validates input.
  2. Disables input temporarily.
  3. Shows loading/typing indicator.
  4. API Request sent.
  5. Response received.
- **System Displays (Structured response):**
  - ISO
  - Aperture
  - Shutter speed (card format)
  - Input re-enabled
- **Validation Rules:**
  - No empty input.
  - No duplicate rapid submissions.
  - Trim whitespace.
- **Next State:**
  - → Await next user message.
- **Success Criteria:**
  - Response rendered correctly within 3 seconds.
  - No UI break.

#### ❌ Error States
- **API failure:** Show inline error bubble: *"Couldn't fetch response. Retry?"*. Retry button triggers same request.
- **Network offline:** Message: *"You're offline. Check connection."*

#### ⚠️ Edge Cases
- User sends multiple messages rapidly: → Queue or ignore duplicates.
- User scrolls during response: → Auto-scroll disabled if user manually scrolls up.
- Very long response: → Collapse + "Show more".

---

### FLOW 3: Error Recovery Flow

#### ✅ Happy Path
1. Error occurs (API fail).
2. Error message shown.
3. User clicks **Retry**.
4. Request resent.
5. Successful response displayed.

#### ❌ Error States
- **Retry fails again:** Message: *"Still not working. Try again later."*

#### ⚠️ Edge Cases
- User edits query before retry.
- User refreshes → error lost.

---

### FLOW 4: Account Management
- ❌ Not applicable (out of scope).

---

## 3. Navigation Map

```text
App Root (/)
│
├── Home / Chat Screen (/)
│   ├── Empty State (no messages)
│   ├── Active Chat State
│   └── Error State
│
└── (Optional Future)
    ├── History (/history)
    └── Settings (/settings)
```

**Notes:**
- Single-page app (SPA-like behavior).
- No authentication required.

---

## 4. Screen Inventory

### 1. Home / Chat Screen
- **Route:** `/`
- **Access:** Public
- **Purpose:** Main interaction interface
- **UI Elements:**
  - Header (App name)
  - Suggested prompts
  - Chat container
  - Input box
  - Send button
- **Actions:**
  | Action | Result |
  |---|---|
  | Click prompt | Sends query |
  | Type + send | Adds message |
  | Retry error | Resends request |
- **States:**
  - Empty state
  - Loading state
  - Chat active state
  - Error state

### 2. Error State (Inline)
- **Route:** `/` (same screen)
- **Access:** Public
- **UI Elements:**
  - Error message
  - Retry button

---

## 5. Decision Points

- **IF** input is empty **THEN** block submission **AND** show *"Please enter a question about photography"*
- **IF** API response success **THEN** render response **ELSE** show error message
- **IF** network offline **THEN** block API call **AND** show offline message
- **IF** user sends multiple requests quickly **THEN** disable input until response completes
- **IF** no messages exist **THEN** show empty state UI **ELSE** show chat history
- **IF** response is long (>300 words) **THEN** collapse with *"Show more"*

---

## 6. Error Handling

- **404 (Not applicable):** SPA → redirect to `/`
- **500 / API Failure:** 
  - Display: *"Something went wrong. Try again."*
  - Actions: Retry button, Edit query
- **Network Offline:**
  - Display: *"You are offline. Check your internet connection."*
  - Actions: Retry after reconnect
- **Permission Denied:** ❌ Not applicable
- **Validation Errors (Empty input):** *"Enter a valid photography question"*

---

## 7. Responsive Behavior

### Mobile
- Full-width chat
- Sticky input at bottom
- Tap-friendly buttons
- Simplified spacing

### Tablet
- Centered chat layout
- Larger message bubbles

### Desktop
- Max-width container
- Better spacing
- Hover effects

---

## 8. Animations & Transitions

- **Page Load:** Fade-in (300ms ease-in)
- **Chat Messages:** Slide-up + fade (200ms)
- **Loading State:** Typing dots animation (loop)
- **Error Message:** Fade-in with slight shake
- **Button Interactions:** Hover scale (1.05), Click shrink (0.95)
- **Scroll Behavior:** 
  - Auto-scroll to latest message
  - Disabled if user manually scrolls up

---

> ⚠️ **Final Note:** This flow is intentionally single-page focused, interaction-heavy, and state-driven because the assignment is evaluating UX clarity, edge case handling, and thoughtfulness in interaction design.