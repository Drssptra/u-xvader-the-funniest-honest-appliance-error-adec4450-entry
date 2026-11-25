// The Funniest Honest Appliance Error — a washing machine reporting its
// own failure. The drum cannot spin because the load has bunched to one
// side, so the machine states that plain fault in its flat, put-upon voice,
// and the joke is the fault itself: the duvet will not let go of the spin.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "ERROR E12: Drum unbalanced. Your duvet formed a gang and is holding the spin cycle hostage.";

// The gate allows 1 to 200 characters, a single line, not only whitespace.
// entry.txt is written with no trailing newline; stdout adds one.
if (ENTRY.length < 1 || ENTRY.length > 200 || /[\r\n]/.test(ENTRY) || !ENTRY.trim()) {
  throw new Error(`Entry must be a single line of 1-200 characters, got ${ENTRY.length}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
process.stdout.write(ENTRY + "\n");
