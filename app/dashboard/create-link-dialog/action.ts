"use server";

import { randomBytes } from "node:crypto";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { insertLink, shortCodeExists } from "@/data/links";

const schema = z.object({
  url: z
    .string()
    .trim()
    .max(2048)
    .refine((value) => {
      try {
        const { protocol } = new URL(value);
        return protocol === "http:" || protocol === "https:";
      } catch {
        return false;
      }
    }, "Enter a valid http(s) URL"),
  shortCode: z
    .string()
    .trim()
    .regex(
      /^[A-Za-z0-9_-]{3,32}$/,
      "Short code must be 3-32 characters: letters, numbers, - or _"
    )
    .optional(),
});

type CreateLinkInput = z.infer<typeof schema>;

type CreateLinkResult = { success: true } | { error: string };

const MAX_ATTEMPTS = 5;

function generateShortCode() {
  return randomBytes(6).toString("base64url").slice(0, 7);
}

export async function createLink(input: CreateLinkInput): Promise<CreateLinkResult> {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const { url, shortCode } = parsed.data;

  if (shortCode) {
    try {
      if (await shortCodeExists(shortCode)) {
        return { error: "That short code is already taken" };
      }
      await insertLink({ shortCode, originalUrl: url });
      revalidatePath("/dashboard");
      return { success: true };
    } catch {
      return { error: "Could not create the link. Please try again." };
    }
  }

  // Retry on the unlikely short code collision (unique constraint).
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    try {
      await insertLink({ shortCode: generateShortCode(), originalUrl: url });
      revalidatePath("/dashboard");
      return { success: true };
    } catch {
      if (attempt === MAX_ATTEMPTS - 1) {
        return { error: "Could not create the link. Please try again." };
      }
    }
  }

  return { error: "Could not create the link. Please try again." };
}
