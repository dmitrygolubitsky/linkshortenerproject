import { desc } from "drizzle-orm";
import { db } from "@/db";
import { links } from "@/db/schema";

export function getLinks() {
  return db.select().from(links).orderBy(desc(links.createdAt));
}