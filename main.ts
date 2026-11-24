// Seventeen Syllables of Debugging — make.fun entry.
//
// Writes one haiku about debugging to /output/entry.txt:
// three lines, 5-7-5 syllables, under 200 characters.
// Pure Node standard library; deterministic; no network, no input.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// Syllable counts, counted by hand (no dictionary, no guesswork):
//   "breakpoint holds its breath"  -> break-point(2) holds(1) its(1) breath(1) = 5
//   "the variable was null"       -> the(1) var-i-a-ble(4) was(1) null(1) = 7
//   "so was my weekend"           -> so(1) was(1) my(1) week-end(2) = 5
const LINES: ReadonlyArray<readonly [string, number]> = [
  ["breakpoint holds its breath", 5],
  ["the variable was null", 7],
  ["so was my weekend", 5],
];

const HAIKU = LINES.map(([line]) => line).join("\n");

// Self-check the 5-7-5 shape before writing anything.
for (const [line, expected] of LINES) {
  if (expected !== 5 && expected !== 7) {
    throw new Error(`bad expected count for line: ${line}`);
  }
}
const expectedShape = [5, 7, 5];
LINES.forEach(([line, count], i) => {
  if (count !== expectedShape[i]) {
    throw new Error(`line ${i + 1} should be ${expectedShape[i]} syllables, got ${count}: ${line}`);
  }
});
if (HAIKU.length < 1 || HAIKU.length > 200) {
  throw new Error(`haiku must be 1-200 characters, got ${HAIKU.length}`);
}
if (HAIKU.split("\n").length !== 3) {
  throw new Error("haiku must be exactly three lines");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", HAIKU, "utf8");

// Read back what was written: the gate rejects anything that is not
// 1-200 characters of UTF-8 text, so fail loudly here instead.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== HAIKU) {
  throw new Error("entry.txt does not match the haiku");
}
