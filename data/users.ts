import { db } from "@/db";
import { users } from "@/db/schema";

export async function ensureUser(data: { id: string; email: string }) {
  await db.insert(users).values(data).onConflictDoNothing();
}
