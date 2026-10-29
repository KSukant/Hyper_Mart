import fs from "node:fs";
import path from "node:path";

const [,, url, outName] = process.argv;
if (!url || !outName) {
  console.log("Usage: node download-temp.mjs <url> <outName>");
  process.exit(1);
}

const outDir = path.join(process.cwd(), "scratch");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
const target = path.join(outDir, outName);

async function download() {
  const res = await fetch(url, { headers: { "User-Agent": "HyperMart-Audit/1.0" } });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(target, buf);
  console.log(`Saved ${buf.length} bytes to ${target}`);
}

download().catch(console.error);
