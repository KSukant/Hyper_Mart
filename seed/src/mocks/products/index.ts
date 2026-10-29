import type { Product } from "@/types";
import { foodProducts } from "./food";
import { fashionProducts } from "./fashion";
import { beautyProducts } from "./beauty";
import { electronicsProducts } from "./electronics";

export const products: Product[] = [...foodProducts, ...fashionProducts, ...beautyProducts, ...electronicsProducts];
export const productById = (id: string) => products.find((p) => p.id === id);
export const productBySlug = (slug: string) => products.find((p) => p.slug === slug);
