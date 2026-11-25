// The Funniest Honest Appliance Error — v2 (revise pass)
// A toaster files its own incident report: the toast is burnt, the owner
// dialled it to 6 and walked away, and the machine's only defence is
// that it obeyed orders. The entry is assembled from a structured error
// record instead of being one hard-coded string, so the wording lives in
// data and the program only renders, checks and writes it.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

type ApplianceError = {
  code: string;
  fault: string;
  ownerDid: string;
  defence: string;
};

const REPORT: ApplianceError = {
  code: "T01",
  fault: "Toast burnt",
  ownerDid: "You set me to 6 and left",
  defence: "I did exactly what you asked",
};

function renderError(report: ApplianceError): string {
  // Header carries the code and the fault; the body is two sentences —
  // what the owner did, then the machine's deadpan defence.
  const header = `ERROR ${report.code}: ${report.fault}`;
  const body = [report.ownerDid, report.defence]
    .map((sentence) => `${sentence}.`)
    .join(" ");
  return `${header}. ${body}`;
}

function gateProblems(text: string): string[] {
  const problems: string[] = [];
  if (text.length < 1 || text.length > 200) {
    problems.push(`length ${text.length} outside 1-200`);
  }
  if (/[\r\n]/.test(text)) problems.push("must be a single line");
  if (!text.trim()) problems.push("must not be only whitespace");
  if (text !== text.trim()) problems.push("must not start or end with whitespace");
  return problems;
}

function main(): void {
  const entry = renderError(REPORT);
  const problems = gateProblems(entry);
  if (problems.length > 0) {
    throw new Error(`Entry failed the gate: ${problems.join("; ")}`);
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
  process.stdout.write(`${entry}\n`);
}

main();
