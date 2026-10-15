import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { links } from "@/db/schema";

export function getLinks() {
  return db.select().from(links).orderBy(desc(links.createdAt));
}

export async function shortCodeExists(shortCode: string) {
  const [row] = await db
    .select({ id: links.id })
    .from(links)
    .where(eq(links.shortCode, shortCode))
    .limit(1);
  return row !== undefined;
}

export async function insertLink(data: { shortCode: string; originalUrl: string }) {
  const [link] = await db.insert(links).values(data).returning();
  return link;
}