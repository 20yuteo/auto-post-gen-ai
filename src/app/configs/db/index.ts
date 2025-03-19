import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export const settings =
  process.env.ENV === "development"
    ? {
        host: "localhost",
        port: 5432,
        database: process.env.POSTGRES_DATABASE ?? "", // ?? "" で空文字列をデフォルト値に
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

const connection = postgres(process.env.DATABASE_URL ?? "", {
  ...settings,
});

export const dbClient = drizzle(connection);
