import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const depts = ["food", "fashion", "electronics", "beauty"];

for (const dept of depts) {
  const content = fs.readFileSync(path.join(root, "src", "mocks", "products", `${dept}.ts`), "utf-8");
  // Find each product block
  const lines = content.split("\n");
  console.log(`\n=== DEPARTMENT: ${dept.toUpperCase()} ===`);
  
  const regex = /name:\s*"([^"]+)",[\s\S]*?slug:\s*"([^"]+)"/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    console.log(`- Slug: ${match[2]} | Name: ${match[1]}`);
  }
}
