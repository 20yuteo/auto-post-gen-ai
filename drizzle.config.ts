import type { Config } from "drizzle-kit";
import { settings } from "@/app/configs/db";

export default {
  schema: "./src/schema/*",
  out: "./supabase/migrations",
  dialect: "postgresql",
  dbCredentials: {
    ...settings,
    ssl: process.env.DATABASE_SSL === "true",
  },
} satisfies Config;
