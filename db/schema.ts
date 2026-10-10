import { pgTable, integer, text, timestamp } from 'drizzle-orm/pg-core';

export const links = pgTable('links', {
	id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
	shortCode: text('short_code').notNull().unique(),
	originalUrl: text('original_url').notNull(),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});
