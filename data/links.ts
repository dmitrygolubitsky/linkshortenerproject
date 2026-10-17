import { and, desc, eq, ne } from "drizzle-orm";
import { db } from "@/db";
import { links } from "@/db/schema";

export function getLinks() {
  return db.select().from(links).orderBy(desc(links.createdAt));
}

export async function shortCodeExists(shortCode: string, excludeId?: number) {
  const [row] = await db
    .select({ id: links.id })
    .from(links)
    .where(
      and(
        eq(links.shortCode, shortCode),
        excludeId === undefined ? undefined : ne(links.id, excludeId)
      )
    )
    .limit(1);
  return row !== undefined;
}

export async function updateLink(
  id: number,
  data: { shortCode: string; originalUrl: string }
) {
  const [link] = await db.update(links).set(data).where(eq(links.id, id)).returning();
  return link;
}

export async function deleteLink(id: number) {
  const [link] = await db.delete(links).where(eq(links.id, id)).returning();
  return link;
}

export async function insertLink(data: { shortCode: string; originalUrl: string }) {
  const [link] = await db.insert(links).values(data).returning();
  return link;
}

export async function getLinkByShortCode(shortCode: string) {
  const [link] = await db
    .select()
    .from(links)
    .where(eq(links.shortCode, shortCode))
    .limit(1);
  return link;
}
