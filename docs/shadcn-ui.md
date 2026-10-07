# shadcn UI Standards

## Scope
Use this guide for any user-facing UI work in this app.

## Rules
- Build all UI with shadcn/ui components.
- Do not create custom UI components when a shadcn component can serve the need.
- Prefer composing and extending existing shadcn components over inventing new patterns.
- If a needed primitive is missing, add the matching shadcn component to `components/ui` instead of building a bespoke replacement.
- Keep styling aligned with the existing shadcn theme tokens and variants.

## Default Expectation
Buttons, inputs, dialogs, cards, menus, forms, and layout pieces should come from shadcn/ui or be assembled directly from shadcn primitives.