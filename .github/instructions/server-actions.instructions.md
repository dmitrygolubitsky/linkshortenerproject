---
description: Read this before creating or modifying data mutations, server actions, or any code that writes to the database in this project.
---
# Server Actions Instructions

ALL data mutations MUST be done via server actions.

## 1. Location and Naming
- Server action files MUST be named `action.ts`.
- Colocate `action.ts` in the same directory as the client component that calls it.
- Server actions MUST be called from client components.

## 2. Typing
- ALL data passed to server actions MUST have explicit TypeScript types.
- NEVER use the `FormData` type as a parameter.

## 3. Validation
- ALL input MUST be validated with `zod` inside the server action before use.

## 4. Authentication
- Every server action MUST check for a logged-in user FIRST, before validation side effects or any database operation. Return an error object if unauthenticated. (See clerk-auth instructions.)

## 5. Database Access
- Database operations MUST go through helper functions in the `/data` directory that wrap Drizzle queries.
- NEVER use Drizzle queries directly inside server actions.

## 6. Return Values
- Server actions MUST NOT throw errors.
- Always return an object with either an `error` property (string) on failure or a `success` property (`true`) on success.
- Wrap database calls in `try/catch` and return `{ error }` on failure.

## Example

```ts
// app/dashboard/create-link-form/action.ts
"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { insertLink } from "@/data/links";

const schema = z.object({ url: z.string().url() });

type CreateLinkInput = z.infer<typeof schema>;

export async function createLink(input: CreateLinkInput) {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  const parsed = schema.safeParse(input);
  if (!parsed.success) return { error: "Invalid input" };

  await insertLink({ ...parsed.data, userId });
  return { success: true };
}
```
