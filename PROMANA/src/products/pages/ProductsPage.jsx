import Table from "../components/Table";
import { useProducts } from "../context/ProdContext";
import { useMemo, useState } from "react";
import Filters from "../components/Filters";

export default function ProductsPage() {
    const { products = [], loading, error } = useProducts();
  return (
         <div className="px-4 py-6 lg:py-2 sm:px-6 lg:px-16">
            <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
              Products
            </h1>
            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Manage and monitor your product inventory
            </p>
          </div>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between mb-2">
          <div className="lg:w-[90vw] lg:px-8">
      <Filters products={products}/>
          </div>
        </div>     
      </div>
  )
}
