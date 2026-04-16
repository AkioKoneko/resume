# Claude-Inspired Design Reference (Adapted)

This repository uses this document as a **visual reference** for incremental UI polish.

Source page: https://getdesign.md/claude/design-md

> Notes from source: “warm terracotta accent” + “clean editorial layout.”
> This is adapted guidance for this resume where structure/content must stay intact.

## Intent
- Keep the resume recognizable and content-first.
- Apply changes selectively: typography, spacing, hierarchy, surfaces, controls.
- Preserve current information architecture, section order, navigation behavior, and PDF export workflow stability.

## Visual Direction
### 1) Warm editorial contrast
- Dark, soft background layers (not pure black).
- Warm terracotta used as primary accent for links, highlights, and interactive focus.
- Accent should guide attention, not dominate large areas.

### 2) Clean editorial rhythm
- Slightly looser vertical spacing between blocks.
- Strong heading hierarchy with tighter tracking on large headings.
- Comfortable line length and readable paragraph color contrast.
- Typography direction:
  - **Body/UI**: modern neutral sans-serif for clarity and dense reading.
  - **Headings**: restrained editorial serif for hierarchy and tone.
- Keep decorative styling minimal; rely on spacing, weight, and rhythm.

### 3) Refined surfaces
- Cards/utility blocks use subtle elevation and soft borders.
- Rounded corners should feel deliberate but restrained.
- Hover states should be low-motion and understated.

### 4) Calm interactions
- Buttons and links feel tactile through border + background transitions.
- Avoid flashy gradients/animations; prefer short easing and clear affordances.
- Keep interactions consistent across desktop/mobile.

## Suggested Tokens (Claude-inspired, adapted)
```css
:root {
  --accent: #c97850; /* warm terracotta */
  --accent-secondary: #e3a98a;/* softer terracotta */
  --bg-primary: #141211;
  --bg-secondary: #1d1a18;
  --bg-tertiary: #26221f;
  --text-primary: #f2ede8;
  --text-secondary: #b8aaa0;
  --border: #3a312c;
}
```

## Component Guidance
- **Navbar**: subtle translucent surface with blur when scrolled.
- **Cards/Callouts**: soft border + very light shadow.
- **Links**: warm accent color; underline mainly on hover/focus.
- **Mobile menu button**: keep behavior, align styling with accent and surface tokens.
- **Theme controls**: preserve persistent localStorage + system fallback behavior across desktop/mobile controls.

## Anti-goals
- Do **not** convert this resume into a chat-app UI.
- Do **not** mimic a generic AI landing page aesthetic.
- Do **not** rewrite resume content, dates, or links.
- Do **not** break PDF generation workflow.
