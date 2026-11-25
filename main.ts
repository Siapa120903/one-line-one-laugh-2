// One Line, One Laugh — improved entry, round 2.
// A single funny line, at most 200 characters, written to
// $MAKEFUN_OUTPUT_DIR/entry.txt. Deterministic and offline: both
// grading runs produce identical bytes.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I told my smart speaker I was lonely. It said, 'I know. You've " +
  "told me 47 times today.'";

// The gate rejects anything outside 1..200 characters or anything that is
// only whitespace, so validate the line before writing it and fail loudly
// instead of shipping a line the judge would never see.
function checkedLine(text: string): string {
  const line = text.trim();
  if (line.length < 1 || line.length > 200) {
    throw new Error(`line must be 1-200 characters, got ${line.length}`);
  }
  if (line.includes("\n")) {
    throw new Error("line must be a single line");
  }
  return line;
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), checkedLine(LINE) + "\n", "utf8");
