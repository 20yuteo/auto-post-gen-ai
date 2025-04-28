import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const schadules = pgTable("schadules", {
  id: uuid("id").primaryKey().defaultRandom(),
  promptId: text("prompt_id").notNull(),
  scheduledDate: text("scheduled_date").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  deletedAt: timestamp("deleted_at"),
});
