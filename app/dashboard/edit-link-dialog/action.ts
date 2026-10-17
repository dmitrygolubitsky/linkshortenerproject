"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { shortCodeExists, updateLink } from "@/data/links";

const schema = z.object({
  id: z.number().int().positive(),
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
    ),
});

type EditLinkInput = z.infer<typeof schema>;

type EditLinkResult = { success: true } | { error: string };

export async function editLink(input: EditLinkInput): Promise<EditLinkResult> {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const { id, url, shortCode } = parsed.data;

  try {
    if (await shortCodeExists(shortCode, id)) {
      return { error: "That short code is already taken" };
    }
    const link = await updateLink(id, { shortCode, originalUrl: url });
    if (!link) return { error: "Link not found" };
    revalidatePath("/dashboard");
    return { success: true };
  } catch {
    return { error: "Could not update the link. Please try again." };
  }
}
