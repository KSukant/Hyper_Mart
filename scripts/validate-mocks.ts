// Run: npx tsx scripts/validate-mocks.ts  — checks the mock data is internally consistent.
import { products, brands, categories, returnPolicies, offers, stock, warehouses, pincodes, codRules, demoOrders, reviews, cities } from "../src/mocks";
const errs: string[] = [];
const ids = new Set<string>();
for (const p of products) {
  if (ids.has(p.id)) errs.push(`duplicate id ${p.id}`); ids.add(p.id);
  if (!brands.find((b) => b.id === p.brandId)) errs.push(`${p.id}: unknown brand ${p.brandId}`);
  const cat = categories.find((c) => c.id === p.categoryId);
  if (!cat) errs.push(`${p.id}: unknown category`); else if (cat.department !== p.department) errs.push(`${p.id}: category department mismatch`);
  if (!returnPolicies.find((r) => r.id === p.returnPolicyId)) errs.push(`${p.id}: unknown return policy`);
  if (p.attrs.department !== p.department) errs.push(`${p.id}: attrs department mismatch`);
  if (p.price > p.mrp) errs.push(`${p.id}: price above MRP`);
  if (p.memberPrice !== undefined && p.memberPrice >= p.price) errs.push(`${p.id}: memberPrice not below price`);
  if (!Number.isInteger(p.price) || !Number.isInteger(p.mrp)) errs.push(`${p.id}: non-integer price`);
  if (p.soldBy !== "HyperMart") errs.push(`${p.id}: soldBy must be HyperMart`);
  if (codRules.blockedProductIds.includes(p.id) && p.codAllowed) errs.push(`${p.id}: COD blocked list but codAllowed true`);
  if (!codRules.blockedProductIds.includes(p.id) && !p.codAllowed) errs.push(`${p.id}: codAllowed false but not in blocked list`);
  if (p.price > codRules.prepaidOnlyAbovePerItem && p.codAllowed) errs.push(`${p.id}: above prepaid-only limit but COD allowed`);
}
for (const o of offers) {
  const p = products.find((x) => x.id === o.productId);
  if (!p) { errs.push(`${o.id}: unknown product`); continue; }
  if (o.type === "near_expiry" && !["food", "beauty"].includes(p.department)) errs.push(`${o.id}: near-expiry on ${p.department}`);
  if (o.type === "clearance" && p.department !== "fashion") errs.push(`${o.id}: clearance on ${p.department}`);
  for (const c of o.cityIds) if (!cities.find((x) => x.id === c)) errs.push(`${o.id}: unknown city ${c}`);
}
for (const s of stock) if (!warehouses.find((w) => w.id === s.warehouseId)) errs.push(`stock: unknown warehouse ${s.warehouseId}`);
for (const pc of pincodes) if (!/^\d{6}$/.test(pc.pincode)) errs.push(`bad pincode ${pc.pincode}`);
for (const o of demoOrders) {
  const sum = o.lines.reduce((a, l) => a + l.unitPrice * l.qty, 0);
  if (sum !== o.charges.itemsTotal) errs.push(`${o.id}: itemsTotal ${o.charges.itemsTotal} ≠ ${sum}`);
  const c = o.charges; const tot = c.itemsTotal + c.delivery + c.coldChain + c.heavy + c.cod - c.discount;
  if (tot !== c.total) errs.push(`${o.id}: total ${c.total} ≠ ${tot}`);
}
for (const r of reviews) if (!products.find((p) => p.id === r.productId)) errs.push(`${r.id}: unknown product`);
console.log(`products ${products.length}, offers ${offers.length}, stock rows ${stock.length}, pincodes ${pincodes.length}`);
console.log(errs.length ? errs.join("\n") : "All checks passed");
process.exit(errs.length ? 1 : 0);
