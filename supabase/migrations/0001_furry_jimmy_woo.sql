ALTER TABLE "prompts" DROP CONSTRAINT "prompts_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "prompts" ADD COLUMN "title" text NOT NULL;