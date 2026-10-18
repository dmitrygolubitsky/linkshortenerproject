CREATE TABLE "users" (
	"id" text PRIMARY KEY,
	"email" text NOT NULL UNIQUE,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
INSERT INTO "users" ("id", "email") VALUES ('user_3KDXbmf07bo13MKtg7SWrWtlAPt', 'regawq@gmail.com');
--> statement-breakpoint
ALTER TABLE "links" ADD COLUMN "user_id" text;
--> statement-breakpoint
UPDATE "links" SET "user_id" = 'user_3KDXbmf07bo13MKtg7SWrWtlAPt';
--> statement-breakpoint
ALTER TABLE "links" ALTER COLUMN "user_id" SET NOT NULL;
--> statement-breakpoint
ALTER TABLE "links" ADD CONSTRAINT "links_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;
