import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export const settings =
  process.env.ENV === "development"
    ? {
        host: "localhost",
        port: 5432,
        database: process.env.POSTGRES_DATABASE ?? "",
        user: process.env.POSTGRES_PASSWORD ?? "",
        password: process.env.POSTGRES_PASSWORD ?? "",
      }
    : {
        host: process.env.SUPABASE_HOST ?? "",
        port: 5432,
        database: process.env.SUPABASE_DATABASE ?? "",
        user: process.env.SUPABASE_USER ?? "",
        password: process.env.SUPABASE_PASSWORD ?? "",
      };

const connectionString = process.env.DB_URL || "";

const connection =
  process.env.ENV === "development"
    ? postgres({
        ...settings,
      })
    : postgres(connectionString, { prepare: false });

export const dbClient = drizzle(connection);
