# Responsive Site and Simpler Notifications

## Direction
Keep the current British Heritage visual identity while making shared navigation, page containers, controls, and notification surfaces dependable from small phones through wide desktops.

## Changes
- Audit shared page structure and representative high-use screens at phone, tablet, laptop, and desktop widths; fix horizontal overflow, clipped content, crowded controls, unsafe fixed elements, and undersized touch targets.
- Refine the top navigation, mobile menu, bottom navigation, dialogs, and common content wrappers so they remain readable and easy to operate at every breakpoint.
- Simplify the notification panel and full notification page for mobile use, with clearer actions and layouts that do not depend on hover.
- Treat opening the notification panel or notification page as viewing the notifications: immediately mark currently displayed unread items as read and remove the red unread badge/dots.
- Keep optional manual unread controls only where useful, without asking users to mark something read after they have already seen it.

## Technical details
- Preserve existing routes, authentication, roles, realtime delivery, notification preferences, and notification links.
- Reuse semantic design tokens and shared controls; avoid page-specific hardcoded colors.
- Apply safe-area spacing and stable viewport constraints to fixed mobile controls and overlays.
- Validate representative signed-out and signed-in flows at multiple viewport sizes, then confirm runtime diagnostics and the production build are clean.
