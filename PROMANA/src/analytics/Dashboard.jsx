import { useMemo, useState } from "react";

import AnalyticsCards from "./AnalyticsCards";
import AnalyticsChart from "./AnalyticsChart";
import { useProducts } from "../products/context/ProdContext";

export default function Dashboard() {
  const { products = [], loading, error } = useProducts();
  const [filter, setFilter] = useState("");

  const filteredProducts = useMemo(() => {
    if (!filter) {
      return products;
    }

    return products.filter((product) =>
      product.title.toLowerCase().includes(filter.toLowerCase()),
    );
  }, [products, filter]);

  const analytics = useMemo(() => {
    const totalProducts = filteredProducts.length;

    const averageRating =
      totalProducts > 0
        ? filteredProducts.reduce(
            (total, product) => total + product.rating,
            0,
          ) / totalProducts
        : 0;

    const totalInventoryValue = filteredProducts.reduce(
      (total, product) => total + product.price * product.stock,
      0,
    );

    return {
      totalProducts,
      averageRating,
      totalInventoryValue,
    };
  }, [filteredProducts]);

  const categoryData = useMemo(() => {
  const distribution = products.reduce(
    (categories, product) => {
      categories[product.category] =
        (categories[product.category] || 0) + 1;

      return categories;
    },
    {}
  );

  const data = Object.entries(distribution).map(
    ([category, count]) => ({
      category,
      count,
    })
  );

  const selectedCategory =
    filteredProducts.length > 0 && filter
      ? filteredProducts[0].category
      : null;

  if (selectedCategory) {
    data.sort((a, b) => {
      if (a.category === selectedCategory) return -1;
      if (b.category === selectedCategory) return 1;

      return b.count - a.count;
    });
  }

  return data;
}, [products, filteredProducts, filter]);

  if (loading) {
    return <h1>Loading analytics...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  if (products.length === 0) {
    return (
      <h1 className="flex justify-center text-xl">
        SORRY! There is no Product in Storage
      </h1>
    );
  }

  const { totalProducts, averageRating, totalInventoryValue } = analytics;

  return (
   <div className="px-4 py-6 sm:px-6 lg:px-16">
  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between mb-2">
    <div>
      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
        Dashboard Overview
      </h1>

      <p className="mt-2 text-sm text-slate-500 sm:text-base">
        Monitor products and inventory performance
      </p>
    </div>

    <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto shadow-md p-4 mb-4">
      <input
        type="text"
        value={filter}
        placeholder="Search products..."
        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 sm:min-w-[240px]"
        onChange={(e) => setFilter(e.target.value)}
      />

      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none sm:w-[220px]"
      >
        <option value="">All Products</option>

        {products.map((product) => (
          <option key={product.id} value={product.title}>
            {product.title}
          </option>
        ))}
      </select>
    </div>
  </div>

  <AnalyticsCards
    totalProducts={totalProducts}
    totalInventoryValue={totalInventoryValue}
    averageRating={averageRating}
  />

  <AnalyticsChart data={categoryData} />
</div>
  );
}
