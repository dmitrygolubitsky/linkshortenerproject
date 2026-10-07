ALWAYS read the relevant .md file first BEFORE making code changes. This is mandatory and takes priority over everything else:

It is incredibly important to ALWAYS read the relevant individual instruction files in the [docs/](./docs) directory BEFORE generating ANY code.

Auth rules: read [docs/clerk-auth.md](./docs/clerk-auth.md) before changing anything related to authentication, protected routes, or sign-in/sign-up UX.
UI rules: read [docs/shadcn-ui.md](./docs/shadcn-ui.md) before changing any user-facing UI. All UI elements in this app must use shadcn/ui components; do not introduce custom UI components.


<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
