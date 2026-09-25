/**
 * Hostinger / `next start` often ships `.next` without the app `public/` folder.
 * Copy public assets into `.next/static` so `/images/*` can be served from the
 * build output via the matching rewrite in next.config.ts.
 */
import { cpSync, existsSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const from = join(root, "public");
const to = join(root, ".next", "static");

if (!existsSync(from)) {
  console.error("[copy-public] public/ is missing — website images will 404.");
  process.exit(1);
}

if (!existsSync(join(root, ".next"))) {
  console.error("[copy-public] .next/ is missing — run next build first.");
  process.exit(1);
}

cpSync(from, to, { recursive: true });

const files = [];
const walk = (dir) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else files.push(full.slice(to.length + 1));
  }
};
walk(to);

console.log(
  `[copy-public] Copied ${files.length} file(s) from public/ into .next/static/`
);
