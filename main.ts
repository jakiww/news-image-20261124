// The World in One Day — news-image-20261124.
//
// The finished front page lives in this repository as entry.png. This
// program only moves it into the grader's output directory, so both runs
// write exactly the same bytes.
import { copyFileSync, mkdirSync, existsSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? join(here, "out");

if (!existsSync(source)) {
  throw new Error("entry.png is missing next to main.ts");
}

mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.png");
copyFileSync(source, target);

// A truncated copy must never pass silently: the output has to hold
// exactly the bytes the repository ships.
if (statSync(target).size !== statSync(source).size) {
  throw new Error("entry.png copy is incomplete");
}
