# Specification

## Summary
**Goal:** Remove the white background from floating leaf particles on the landing page canvas so they blend transparently over the page content.

**Planned changes:**
- In the `LoadingLandingPage` component, remove any white fill, white CSS background, or solid background color from the canvas element used to render floating leaf particles.
- Ensure the canvas and all leaf particle elements use a transparent background so leaves float naturally over underlying body text.

**User-visible outcome:** The floating leaf particles on the landing page no longer display a white rectangle/box around them and blend seamlessly over the body text beneath.
