# **Technical Specification: Personal Website Redesign (v2026)**

## **1. Overview**

**Goal:** Refactor the existing multi-page, split-screen website into a **single-page, vertical scroll layout**. The new design emphasizes a modern, "punchy" aesthetic using a card-based UI, high-contrast accents, and distinct typography.

**Key Features:**

* **Consolidated Content:** Merge now.html content directly into the homepage.
* **Interactive Hero:** "Hover-to-swap" image functionality (extended to support "Click" for mobile/accessibility).
* **Design System:** New typography (Space Grotesk + Inter) and a "Highlighter" marker visual motif.
* **Tech Stack:** HTML5, CSS3 (Variables + Flexbox/Grid), Vanilla JavaScript.

## **2. File Structure & Cleanup**

### **Action Items**

1. **Refactor** index.html: This becomes the single source of truth.
2. **Refactor** main.css: Update with new variables and layout rules.
3. **Refactor** code.js: Embed logic into index.html or update external file to support new event listeners.
4. **Delete** now.html: Content is moving to index.html.
5. **Delete** work.html: Link removed from navigation.

## **3. Design System (CSS Variables)**

The design relies on a specific set of CSS variables to ensure consistency.

### **Typography**

* **Headings:** 'Space Grotesk', sans-serif (Weights: 500, 700)
  * *Vibe:* Technical, geometric, playful.
* **Body:** 'Inter', sans-serif (Weights: 400, 500, 600)
  * *Vibe:* Clean, highly legible.
* **Import:**
  `<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">`

### **Color Palette**

* **Background:** #FAFAFA (Warm Grey)
* **Text Main:** #1F2937 (Charcoal)
* **Text Muted:** #6B7280 (Medium Grey)
* **Brand Accent:** #4F46E5 (Indigo - used for links/buttons)
* **Highlight Accent:** #FDE047 (Neon Yellow - used for the "Marker" effect)

### **Layout Tokens**

* **Max Width:** 900px (Container)
* **Card Radius:** 12px

## **4. Component Specifications**

### **4.1. Global Header (Sticky)**

* **Position:** Sticky at top (position: sticky; top: 0; z-index: 100).
* **Background:** Semi-transparent white with blur (backdrop-filter: blur(8px)).
* **Layout:** Flexbox (justify-content: space-between).
* **Elements:**
  * Left: Name ("Collin Vine") in *Space Grotesk*, Bold.
  * Right: Social Icons (Twitter, GitHub, LinkedIn, Medium, Email).
  * *Interaction:* Social icons opacity 0.6 -> 1.0 on hover + slight scale up.

### **4.2. Hero Section**

* **Layout:** CSS Grid.
  * **Desktop:** 2 Columns (Text Left [1.1fr], Image Right [0.9fr]).
  * **Mobile:** 1 Column (Image Top, Text Bottom).
* **Image Component:**
  * Container requires a pseudo-element border (::before) offset by 15px to create a "loose photo" effect.
  * On Hover: The border should move slightly (transform: translate) for depth.
  * Aspect Ratio: 4/5 (Vertical Portrait).
* **Text Component:**
  * Headline: 3rem (Desktop), *Space Grotesk*.
  * Intro text: *Inter*.
  * **Interactive Paragraph:** Contains <span> elements with class .trigger.

### **4.3. The "Highlighter" Interaction (Critical)**

The .trigger class (used for "me", "handstand", "sourdough", etc.) replaces standard underlines with a custom marker effect.

* **CSS Logic:**
  * position: relative; z-index: 1;
  * ::after pseudo-element acts as the highlighter ink.
  * **Default State:** height: 30% (looks like a thick underline), background: var(--highlight).
  * **Hover/Active State:** height: 100% (covers the whole word behind the text).
  * **Transition:** Smooth ease on height changes.

### **4.4. "Now" Section (Card Layout)**

* **Label:** Small "pill" shaped label ("WHAT I'M DOING NOW") above the cards.
* **Cards** (.update-card):
  * Background: White.
  * Border: 1px solid #E5E7EB.
  * Shadow: Subtle (box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02)).
  * Hover: Lift up (translateY(-2px)) and increase shadow.
* **Content Migration:**
  * Extract date and body text from the old now.html.
  * Format dates in *Space Grotesk*, Uppercase.

## **5. JavaScript Logic (Behavior)**

**File:** code.js or inline <script>

### **Requirements**

1. **State Management:** Track the currently active trigger to manage CSS classes (for the highlighter effect).
2. **Event Listeners:** Apply to all IDs (#meTrigger, #handstandTrigger, #familyTrigger, #sourdoughTrigger).
   * mouseover: Swap main image src and alt. Add .active class to trigger.
   * mouseout: Revert to original image. Remove .active class.
   * **click**: Same behavior as mouseover (critical for mobile support). Prevent default jump behavior if necessary.
   * focus / blur: For keyboard accessibility (Tab key navigation).

### **Data Structure**

```javascript
const imageMap = {
  meTrigger: { src: 'img/me.jpg', alt: "..." },
  handstandTrigger: { src: 'img/handstand.jpg', alt: "..." },
  familyTrigger: { src: 'img/family.jpg', alt: "..." },
  sourdoughTrigger: { src: 'img/sourdough.jpg', alt: "..." }
};
```

## **6. Responsive Behavior**

* **Breakpoint:** 768px.
* **Mobile Changes:**
  * Reduce H1 font size.
  * Stack Hero Grid (Image first, Text second).
  * Reduce Hero margin/padding.
  * Reduce Header padding.
