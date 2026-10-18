import { pgTable, integer, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	// Clerk user id
	id: text('id').primaryKey(),
	email: text('email').notNull().unique(),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const links = pgTable('links', {
	id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
	userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
	shortCode: text('short_code').notNull().unique(),
	originalUrl: text('original_url').notNull(),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});
