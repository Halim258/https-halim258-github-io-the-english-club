# Improve the Site UX

## Direction
Use the selected British Heritage palette, Libre Baskerville headings, IBM Plex Sans body text, and a magazine-style structure. Keep the existing academic identity and real content.

## Changes
- Simplify the top navigation so primary actions are easier to find and secondary tools are grouped clearly.
- Improve the homepage’s first screen, action hierarchy, learning-resume strip, and content scanning without replacing its content.
- Standardize touch targets, focus states, menus, spacing, and visual feedback across desktop and mobile navigation.
- Refine mobile navigation and safe-area behavior so key destinations remain easy to reach without covering content.
- Reduce unnecessary visual noise and animation while preserving meaningful progress and page transitions.

## Technical details
- Reuse existing semantic design tokens and shared button components.
- Preserve authentication, role-based destinations, learning progress, and current routes.
- Validate the homepage and navigation at desktop and mobile sizes, then check runtime and build diagnostics.
