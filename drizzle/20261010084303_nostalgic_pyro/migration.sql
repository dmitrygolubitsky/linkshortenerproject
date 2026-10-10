CREATE TABLE "links" (
	"id" serial PRIMARY KEY,
	"short_code" text NOT NULL UNIQUE,
	"original_url" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
