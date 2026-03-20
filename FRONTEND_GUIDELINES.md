# Frontend Guidelines — Photography Assistant (Experience UI)

## App Context
- **Style:** Minimal + Premium + Soft Gradient
- **Inspiration:** AI product configurators (not conventional chat apps)
- **Theme:** Photography assistant (camera, settings, composition)
- **Experience Type:**
  - 💬 **Chat** drives input (Left Panel)
  - 🖼️ **Right panel** shows visual output (Recommendations)

---

## 1. Design Principles

### 1. Experience over Interface
- Chat is not the product; the Output panel is the product.

### 2. Contextual UI
- Responses shouldn't just stay in chat.
- Move structured results to the right panel.

### 3. Soft Visual Hierarchy
- No harsh contrast.
- Use gradients, blur effects, and subtle shadows.

### 4. Guided Interaction
- No empty states.
- Always show: prompts, suggestions, examples.

### 5. Calm & Focused Design
- Reduce visual noise.
- Prioritize typography and readability.

---

## 2. Design Tokens

### 🎨 Color System (Soft Purple Accent)
#### Primary
```css
--color-primary-50: #f5f3ff;
--color-primary-100: #ede9fe;
--color-primary-200: #ddd6fe;
--color-primary-300: #c4b5fd;
--color-primary-400: #a78bfa;
--color-primary-500: #8b5cf6; /* MAIN ACCENT */
--color-primary-600: #7c3aed;
--color-primary-700: #6d28d9;
--color-primary-800: #5b21b6;
--color-primary-900: #4c1d95;
```

#### Neutral (Soft Background System)
```css
--color-bg-main: #f7f7fb;
--color-bg-glass: rgba(255, 255, 255, 0.6);
--color-bg-panel: #ffffff;
--color-border-soft: #e5e7eb;
--color-text-primary: #111827;
--color-text-secondary: #6b7280;
```

#### Gradient & Semantic
```css
--gradient-main: linear-gradient(135deg, #ede9fe 0%, #f5f3ff 100%);

/* Semantic Colors */
--color-success: #10b981;
--color-error: #ef4444;
```

### 🔤 Typography 

#### Fonts
```css
--font-primary: 'Sora', 'Inter', sans-serif;
```

#### Scale
```css
--text-display: 2.25rem;   /* Hero */
--text-heading: 1.5rem;
--text-subheading: 1.125rem;
--text-body: 1rem;
--text-small: 0.875rem;
```

#### Usage
- **Hero:** "Good to see you!"
- **Subheading:** "Let’s capture better photos"
- **Chat:** Body text
- **Labels:** Small

### 📏 Spacing & Radius
#### Spacing
```css
--space-2: 8px;
--space-4: 16px;
--space-6: 24px;
--space-8: 32px;
--space-12: 48px;
```

#### Border Radius
```css
--radius-lg: 16px;
--radius-xl: 20px;
--radius-full: 9999px;
```

### 🌫 Shadows
```css
--shadow-soft: 0 8px 30px rgba(0,0,0,0.05);
--shadow-card: 0 10px 40px rgba(0,0,0,0.08);
```

---

## 3. Layout System (CRITICAL)

### Main Layout (Core Idea)
```jsx
<div className="h-screen flex bg-[var(--color-bg-main)]">
  
  {/* LEFT - Chat */}
  <div className="w-[60%] flex flex-col">
    {chatSection}
  </div>

  {/* RIGHT - Output */}
  <div className="w-[40%] p-6">
    {outputPanel}
  </div>

</div>
```

### Mobile Behavior
Stack vertically:
1. Chat → Top
2. Output → Bottom

---

## 4. Component System

### 🧠 Hero Section (Top Left)
```jsx
<div className="px-8 pt-10">
  <h1 className="text-display font-semibold text-primary-600">
    Good to see you!
  </h1>
  <p className="text-subheading text-gray-500 mt-2">
    Let’s capture stunning photos effortlessly.
  </p>
</div>
```

### 💬 Suggested Prompts
```jsx
<div className="flex gap-3 mt-6 px-8">
  <button className="px-4 py-2 bg-black text-white rounded-full text-sm">
    Portrait settings
  </button>
  <button className="px-4 py-2 bg-gray-100 rounded-full text-sm">
    Night photography
  </button>
</div>
```

### 💬 Chat Input (Bottom Bar — Important)
```jsx
<div className="p-4 bg-white rounded-xl shadow-soft flex items-center gap-3">
  <input
    className="flex-1 outline-none bg-transparent"
    placeholder="Ask about photography..."
  />
  <button className="bg-primary-500 text-white p-2 rounded-full">
    →
  </button>
</div>
```

### 💬 Chat Bubble
```jsx
<div className="bg-white px-4 py-3 rounded-xl shadow-soft max-w-md">
  Use ISO 100–200 for daylight portraits.
</div>
```

---

## 5. Right Panel (MOST IMPORTANT PART)
> **Note:** This is what makes the app non-generic.

### Empty State
```jsx
<div className="h-full flex items-center justify-center text-center">
  <p className="text-gray-500">
    Your photography recommendations will appear here.
  </p>
</div>
```

### Recommendation Card (Photography)
```jsx
<div className="bg-white rounded-xl shadow-card p-5">
  <img 
    src="/images/portrait.jpg" 
    className="rounded-lg mb-4"
    alt="Portrait Example"
  />
  <h3 className="font-semibold text-lg">Portrait Setup</h3>
  <div className="mt-3 text-sm text-gray-600 space-y-1">
    <p><b>ISO:</b> 100</p>
    <p><b>Aperture:</b> f/1.8</p>
    <p><b>Shutter:</b> 1/200</p>
  </div>
</div>
```

### 🎯 Photography Image Section
Use images like:
- Portrait shots
- Night city
- Landscape

These reinforce: **"This is a photography tool"** (not a chatbot).

---

## 6. Interaction States

### Loading
```jsx
<div className="animate-pulse text-gray-400">
  Generating settings...
</div>
```

### Error
```jsx
<div className="text-red-500 text-sm">
  Failed to generate suggestion. Retry.
</div>
```

### Typing
- Show animated dots.
- Delay 300–800ms for realism.

---

## 7. Animation Rules

### Transitions
- **Duration:** 200–300ms
- **Properties:** `opacity`, `translateY`

### Message Entry
```css
animation: fadeUp 0.25s ease;
```

### Panel Update
- Fade + slight scale transition.

---

## 8. Icon System
- **Library:** Lucide React

```jsx
import { Send } from "lucide-react";

<Send className="w-5 h-5 text-white" />
```

---

## 9. UX Differentiators (IMPORTANT)

❌ **Don’t do this:**
- Plain text chatbot.
- Endless message list taking over the whole screen.

✅ **Do this:**
- **Chat** = Input layer.
- **Right panel** = Output layer.

### Example Flow
1. **User:** *"Best portrait settings"*
2. **Chat:** Responds with brief confirmation.
3. **Right Panel Updates with:**
   - Visual Image Example
   - Exact Settings Configuration
   - Pro Tips