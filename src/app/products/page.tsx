// src/app/products/page.tsx

import React from "react";
import Container from "@/components/atoms/Container";
import { allProducts } from "@/data/productsData";
import ProductCard from "@/components/sections/collection/ProductCard";

export default function ProductsIndexPage() {
  return (
    <div className="bg-gray-50">
      <Container className="py-10">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-900">All Products</h1>
          <p className="text-sm text-slate-600">Browse the full catalogue.</p>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {allProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </Container>
    </div>
  );
}
