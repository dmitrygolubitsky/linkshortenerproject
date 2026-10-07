# Clerk Auth Rules

Use Clerk for all authentication in this app. Do not add or reintroduce any other auth provider, session system, or custom login flow.

The `/dashboard` route is protected and must only be accessible to signed-in users. If a visitor is not authenticated, redirect them away from `/dashboard` to Clerk sign-in.

The homepage `/` should redirect signed-in users to `/dashboard` instead of showing the public landing page.

All sign-in and sign-up entry points should open Clerk in modal mode. Keep the `/sign-in` and `/sign-up` routes aligned with Clerk pages, but prefer modal launch behavior in the UI.

Keep auth changes small, Clerk-native, and consistent with the app-wide `ClerkProvider` and middleware setup.