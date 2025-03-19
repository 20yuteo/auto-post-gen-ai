import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const medias = pgTable("medias", {
	id: uuid("id").primaryKey().defaultRandom(),
  extId: text("ext_id").notNull(),
  url: text("url"),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
	deletedAt: timestamp("deleted_at"),
});