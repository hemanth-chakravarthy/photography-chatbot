# Product Requirements Document (PRD) — Photography Assistant Chatbot

## 1. Problem Statement
Beginner and intermediate photographers struggle to quickly decide camera settings, composition techniques, and editing approaches in real-world scenarios. Existing tools are either:
- **Too generic:** Chatbots with no context.
- **Too complex:** Technical tutorials, long guides.

There is no fast, interactive, context-aware assistant that helps photographers make decisions instantly while shooting or editing.

## 2. Goals & Objectives
- **Reduce decision time:** Users should get actionable suggestions within 3 seconds of query submission.
- **Improve usability of chatbot interfaces:** Achieve 80%+ task completion without confusion in user testing.
- **Increase engagement:** Average session length ≥ 3 interactions per session.
- **Deliver a non-generic experience:** At least 70% of responses include structured UI elements (cards/buttons).

## 3. Success Metrics
- Average response time **< 3 seconds**.
- **≥ 75%** users interact with suggested prompts.
- **≥ 60%** sessions include more than 2 messages.
- Error rate (failed responses) **< 5%**.
- Bounce rate **< 30%**.

## 4. Target Personas

### Persona 1: Beginner Photographer (Student)
- **Age:** 18–22
- **Background:** College student, owns entry-level DSLR/mobile camera.
- **Pain Points:** 
  - Doesn’t understand ISO, aperture, shutter speed.
  - Overwhelmed by tutorials.
- **Goals:** 
  - Get quick settings for situations (e.g., night photography).
  - Improve Instagram photos.
- **Technical Level:** Medium (comfortable with apps).

### Persona 2: Hobbyist Creator
- **Age:** 22–30
- **Background:** Content creator / freelancer.
- **Pain Points:** 
  - Needs quick composition/editing ideas.
  - Wants a faster workflow.
- **Goals:** 
  - Improve shot quality.
  - Get creative suggestions instantly.
- **Technical Level:** High.

## 5. Features & Requirements

### 🔴 P0 — MUST HAVE (MVP)

#### 1. Chat Interface
- **Description:** Core interface for user interaction with chatbot.
- **User Story:** As a user, I want to chat with the assistant so that I can get photography help instantly.
- **Acceptance Criteria:**
  - Input box + send button present.
  - Messages displayed in chat format (user vs. bot).
  - Scrollable conversation.
  - Supports multiline input.
  - Mobile responsive.
- **Success Metric:** ≥ 95% messages successfully rendered.

#### 2. AI Response Integration
- **Description:** Generate responses using AI API.
- **User Story:** As a user, I want relevant answers so that I can apply them immediately.
- **Acceptance Criteria:**
  - Response received within 3 seconds.
  - Response is topic-constrained (photography only).
  - Handles empty input gracefully.
  - Handles API failure with fallback message.
  - No broken responses shown.
- **Success Metric:** < 5% failed responses.

#### 3. Suggested Prompts (Guided Start)
- **Description:** Predefined prompts shown before user interaction.
- **User Story:** As a user, I want suggestions so that I know what to ask.
- **Acceptance Criteria:**
  - At least 4 suggested prompts visible initially.
  - Clicking a prompt sends it instantly.
  - Prompts disappear or minimize after first message.
  - Prompts are photography-specific.
- **Success Metric:** ≥ 70% users click at least one suggestion.

#### 4. Loading & Typing State
- **Description:** Visual feedback while AI is generating response.
- **User Story:** As a user, I want feedback so I know the system is working.
- **Acceptance Criteria:**
  - Loading indicator visible within 0.5s.
  - Typing animation shown.
  - Disabled input during request.
  - Smooth transition to response.
- **Success Metric:** Perceived wait frustration < 10% (qualitative).

#### 5. Error Handling State
- **Description:** Handle API/network failures.
- **User Story:** As a user, I want clear errors so I can retry.
- **Acceptance Criteria:**
  - Clear error message displayed.
  - Retry option available.
  - No UI break.
  - Input preserved after failure.
- **Success Metric:** 100% graceful error recovery.

### 🟡 P1 — SHOULD HAVE

#### 6. Structured Responses (UI Cards)
- **Description:** Display responses in visual format (not just text).
- **User Story:** As a user, I want structured advice so it's easier to understand.
- **Acceptance Criteria:**
  - Camera settings shown in card format.
  - Bullet points for steps.
  - Highlight key values (ISO, shutter speed).
  - Visual separation from plain text.
- **Success Metric:** ≥ 50% responses structured.

#### 7. Context Awareness
- **Description:** Maintain conversation context.
- **User Story:** As a user, I want follow-up answers to make sense.
- **Acceptance Criteria:**
  - Previous messages included in prompt.
  - Follow-up questions handled correctly.
  - No random unrelated responses.
- **Success Metric:** ≥ 80% relevant follow-ups.

#### 8. Empty State UI
- **Description:** Initial screen before interaction.
- **User Story:** As a user, I want a clear starting point.
- **Acceptance Criteria:**
  - Intro message shown.
  - Suggested prompts visible.
  - Themed UI (photography style).
  - No blank screen.
- **Success Metric:** Bounce rate < 30%.

### 🟢 P2 — NICE TO HAVE
- **9. Image-Based Suggestions:** Show sample images for compositions.
- **10. Save Chat / History**
- **11. Dark Mode Toggle**
- **12. Quick Action Buttons:** e.g., "Low Light", "Portrait Mode".

## 6. Explicitly Out of Scope
- Training custom ML models.
- User authentication system.
- Payment integration.
- Real-time collaboration.
- Image upload + analysis (for MVP).
- Multi-language support.
- Voice input/output.
- Backend database storage.
- Complex personalization algorithms.
- Native mobile app.

## 7. User Scenarios

### Scenario 1: Beginner needs night photography settings
- **Context:** User opens app for first time.
- **Flow:**
  1. User sees suggested prompts.
  2. Clicks "Best settings for night photography".
  3. Loading state shown.
  4. Bot responds with: ISO range, Shutter speed, Tripod suggestion (card UI).
- **Outcome:** User gets actionable setup within seconds.
- **Edge Case:** API fails → error message + retry.

### Scenario 2: Follow-up conversation
- **Context:** User already asked about portraits.
- **Flow:**
  1. User asks: "What about lighting?"
  2. System uses previous context.
  3. Responds with lighting tips.
- **Outcome:** Context-aware answer.

### Scenario 3: User sends empty message
- **Flow:**
  1. User clicks send without input.
  2. System blocks submission.
  3. Shows hint: "Ask something about photography".
- **Outcome:** No broken interaction.

## 8. Non-Functional Requirements
- **Performance:**
  - Response time < 3 seconds.
  - UI render time < 1 second.
- **Reliability:**
  - 95% uptime.
  - Graceful API failure handling.
- **Accessibility:**
  - Keyboard navigable.
  - Readable contrast ratios.
- **Responsiveness:**
  - Fully usable on mobile devices.

## 9. Dependencies & Constraints
- **Dependencies:**
  - AI API (OpenAI / Gemini).
  - Vercel deployment.
  - Internet connectivity.
- **Constraints:**
  - Time limit: 4–8 hours.
  - No heavy backend.
  - Must be deployed.