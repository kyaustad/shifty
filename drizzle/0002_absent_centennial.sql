CREATE TYPE "public"."role" AS ENUM('admin', 'manager', 'user');--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "role" "role" DEFAULT 'user' NOT NULL;