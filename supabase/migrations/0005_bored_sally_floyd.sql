ALTER TABLE "schadules" ADD COLUMN "scheduled_date" text NOT NULL;--> statement-breakpoint
ALTER TABLE "schadules" DROP COLUMN "scheduled_at";