import { build } from "esbuild";

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
}).catch(() => process.exit(1));
