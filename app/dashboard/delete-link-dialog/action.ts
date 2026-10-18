"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { deleteLink as removeLink } from "@/data/links";

const schema = z.object({ id: z.number().int().positive() });

type DeleteLinkInput = z.infer<typeof schema>;

type DeleteLinkResult = { success: true } | { error: string };

export async function deleteLink(input: DeleteLinkInput): Promise<DeleteLinkResult> {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  const parsed = schema.safeParse(input);
  if (!parsed.success) return { error: "Invalid input" };

  try {
    const link = await removeLink(parsed.data.id, userId);
    if (!link) return { error: "Link not found" };
    revalidatePath("/dashboard");
    return { success: true };
  } catch {
    return { error: "Could not delete the link. Please try again." };
  }
}
