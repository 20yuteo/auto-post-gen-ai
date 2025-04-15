import { build } from "esbuild";
import * as dotenv from "dotenv";

dotenv.config({ path: "./.env.production", override: true });

const defineEnv = Object.entries(process.env).reduce((acc, [key, value]) => {
  acc[`process.env.${key}`] = JSON.stringify(value ?? "");
  return acc;
}, {} as Record<string, string>);

const outdir = "./infra/lambda";

build({
  entryPoints: ["./index.ts"],
  bundle: true,
  platform: "node",
  target: ["node18"],
  outdir,
  sourcemap: true,
  alias: {
    "@": "./src",
  },
  define: defineEnv,
}).catch(() => process.exit(1));
